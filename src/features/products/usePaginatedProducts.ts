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
import type { ProductSubCategory } from './productTypes';
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

export function usePaginatedProducts(
  gender: 'men' | 'women',
  subCategory: ProductSubCategory = 'all',
  search = '',
) {
  const dispatch = useAppDispatch();

  // gender + subCategory 조합을 Redux 키로 사용
  const normalizedSearch = search.trim();
  const categoryKey = [
    gender,
    subCategory === 'all' ? null : subCategory,
    normalizedSearch ? `search_${normalizedSearch}` : null,
  ]
    .filter(Boolean)
    .join('_');

  const productListState = useAppSelector(
    (state) => state.products.lists[categoryKey] ?? defaultProductListState,
  );
  const { items, loading, error, hasMore, page } = productListState;

  const productItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const fetchPage = useCallback(
    async (nextPage: number, mode: 'replace' | 'append') => {
      try {
        dispatch(setProductsLoading({ category: categoryKey, loading: true }));
        dispatch(setProductsError({ category: categoryKey, error: null }));

        const data = await getProducts({
          gender,
          subCategory,
          search: normalizedSearch,
          page: nextPage,
        });
        const nextItems = getProductItems(data);
        const nextHasMore = getHasMore(data, nextItems.length);
        const resolvedPage = getResolvedPage(data, nextPage);

        if (mode === 'replace') {
          dispatch(setProducts({ category: categoryKey, items: nextItems }));
        } else {
          dispatch(addProducts({ category: categoryKey, items: nextItems }));
        }

        dispatch(setPage({ category: categoryKey, page: resolvedPage }));
        dispatch(setHasMore({ category: categoryKey, hasMore: nextHasMore }));
      } catch (fetchError) {
        dispatch(
          setProductsError({
            category: categoryKey,
            error: fetchError instanceof Error ? fetchError.message : '상품을 불러오지 못했습니다.',
          }),
        );
      } finally {
        dispatch(setProductsLoading({ category: categoryKey, loading: false }));
      }
    },
    [categoryKey, gender, normalizedSearch, subCategory, dispatch],
  );

  useEffect(() => {
    void fetchPage(INITIAL_PAGE, 'replace');

    return () => {
      dispatch(clearProducts({ category: categoryKey }));
    };
  }, [categoryKey, dispatch, fetchPage]);

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
