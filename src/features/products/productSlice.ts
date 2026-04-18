import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  ClearProductsPayload,
  ProductErrorPayload,
  ProductHasMorePayload,
  ProductItemsPayload,
  ProductLoadingPayload,
  ProductPagePayload,
  ProductState,
} from './productTypes';
import { createInitialProductListState } from './productTypes';

const initialState: ProductState = {
  lists: {},
};

const getProductListState = (state: ProductState, category: string) => {
  if (!state.lists[category]) {
    state.lists[category] = createInitialProductListState();
  }

  return state.lists[category];
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductItemsPayload>) {
      const listState = getProductListState(state, action.payload.category);
      listState.items = action.payload.items;
    },
    addProducts(state, action: PayloadAction<ProductItemsPayload>) {
      const listState = getProductListState(state, action.payload.category);
      listState.items = [...listState.items, ...action.payload.items];
    },
    setProductsLoading(state, action: PayloadAction<ProductLoadingPayload>) {
      const listState = getProductListState(state, action.payload.category);
      listState.loading = action.payload.loading;
    },
    setProductsError(state, action: PayloadAction<ProductErrorPayload>) {
      const listState = getProductListState(state, action.payload.category);
      listState.error = action.payload.error;
    },
    setHasMore(state, action: PayloadAction<ProductHasMorePayload>) {
      const listState = getProductListState(state, action.payload.category);
      listState.hasMore = action.payload.hasMore;
    },
    setPage(state, action: PayloadAction<ProductPagePayload>) {
      const listState = getProductListState(state, action.payload.category);
      listState.page = action.payload.page;
    },
    clearProducts(state, action: PayloadAction<ClearProductsPayload>) {
      state.lists[action.payload.category] = createInitialProductListState();
    },
  },
});

export const {
  setProducts,
  addProducts,
  setProductsLoading,
  setProductsError,
  setHasMore,
  setPage,
  clearProducts,
} = productSlice.actions;
export default productSlice.reducer;
