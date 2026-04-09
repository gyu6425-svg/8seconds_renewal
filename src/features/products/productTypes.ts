export type ProductCategoryKey = 'men' | 'women' | string;

export interface Product {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
}

export interface ProductListState {
  items: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

export interface ProductState {
  lists: Record<string, ProductListState>;
}

export interface ProductItemsPayload {
  category: ProductCategoryKey;
  items: Product[];
}

export interface ProductLoadingPayload {
  category: ProductCategoryKey;
  loading: boolean;
}

export interface ProductErrorPayload {
  category: ProductCategoryKey;
  error: string | null;
}

export interface ProductHasMorePayload {
  category: ProductCategoryKey;
  hasMore: boolean;
}

export interface ProductPagePayload {
  category: ProductCategoryKey;
  page: number;
}

export interface ClearProductsPayload {
  category: ProductCategoryKey;
}

export const createInitialProductListState = (): ProductListState => ({
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
});

export const defaultProductListState = createInitialProductListState();
