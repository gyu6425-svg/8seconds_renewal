import { useCallback, useEffect, useMemo } from 'react';

import {
  addProducts,
  clearProducts,
  setHasMore,
  setPage,
  setProducts,
  setProductsError,
  setProductsLoading,
} from './productSlice';
import type { ProductCategoryKey } from './productTypes';
import { defaultProductListState } from './productTypes';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getProducts } from '../../shared/api/products';

const INITIAL_PAGE = 1;

const getProductItems = (data: unknown) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === 'object') {
    if ('items' in data && Array.isArray(data.items)) {
      return data.items;
    }

    if ('data' in data) {
      const nestedData = data.data;

      if (Array.isArray(nestedData)) {
        return nestedData;
      }

      if (
        nestedData &&
        typeof nestedData === 'object' &&
        'items' in nestedData &&
        Array.isArray(nestedData.items)
      ) {
        return nestedData.items;
      }
    }

    if ('products' in data && Array.isArray(data.products)) {
      return data.products;
    }

    if (
      'result' in data &&
      data.result &&
      typeof data.result === 'object' &&
      'items' in data.result &&
      Array.isArray(data.result.items)
    ) {
      return data.result.items;
    }
  }

  return [];
};

const getHasMore = (data: unknown, itemsLength: number) => {
  if (data && typeof data === 'object') {
    if ('hasMore' in data && typeof data.hasMore === 'boolean') {
      return data.hasMore;
    }

    if (
      'data' in data &&
      data.data &&
      typeof data.data === 'object' &&
      'hasMore' in data.data &&
      typeof data.data.hasMore === 'boolean'
    ) {
      return data.data.hasMore;
    }
  }

  return itemsLength > 0;
};

const getResolvedPage = (data: unknown, fallbackPage: number) => {
  if (data && typeof data === 'object') {
    if ('page' in data && typeof data.page === 'number') {
      return data.page;
    }

    if (
      'data' in data &&
      data.data &&
      typeof data.data === 'object' &&
      'page' in data.data &&
      typeof data.data.page === 'number'
    ) {
      return data.data.page;
    }
  }

  return fallbackPage;
};

export function usePaginatedProducts(category: ProductCategoryKey) {
  const dispatch = useAppDispatch();
  const productListState = useAppSelector(
    (state) => state.products.lists[category] ?? defaultProductListState,
  );
  const { items, loading, error, hasMore, page } = productListState;

  const productItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const fetchPage = useCallback(
    async (nextPage: number, mode: 'replace' | 'append') => {
      try {
        dispatch(setProductsLoading({ category, loading: true }));
        dispatch(setProductsError({ category, error: null }));

        const data = await getProducts({
          category,
          page: nextPage,
        });
        const nextItems = getProductItems(data);
        const nextHasMore = getHasMore(data, nextItems.length);
        const resolvedPage = getResolvedPage(data, nextPage);

        if (mode === 'replace') {
          dispatch(setProducts({ category, items: nextItems }));
        } else {
          dispatch(addProducts({ category, items: nextItems }));
        }

        dispatch(setPage({ category, page: resolvedPage }));
        dispatch(setHasMore({ category, hasMore: nextHasMore }));
      } catch (fetchError) {
        dispatch(
          setProductsError({
            category,
            error: fetchError instanceof Error ? fetchError.message : '상품을 불러오지 못했습니다.',
          }),
        );
      } finally {
        dispatch(setProductsLoading({ category, loading: false }));
      }
    },
    [category, dispatch],
  );

  useEffect(() => {
    void fetchPage(INITIAL_PAGE, 'replace');

    return () => {
      dispatch(clearProducts({ category }));
    };
  }, [category, dispatch, fetchPage]);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) {
      return;
    }

    await fetchPage(page + 1, 'append');
  }, [fetchPage, hasMore, loading, page]);

  return {
    items: productItems,
    loading,
    error,
    hasMore,
    page,
    handleLoadMore,
  };
}
