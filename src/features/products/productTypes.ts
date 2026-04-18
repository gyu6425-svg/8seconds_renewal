export type ProductCategoryKey = 'men' | 'women' | string;

export type ProductSubCategory =
  | 'all'
  | 'outer'
  | 'jacket'
  | 'knit'
  | 'tshirt'
  | 'pants'
  | 'fashion'
  | 'jewelry'
  | 'trending';

export const SUB_CATEGORY_LABELS: Record<ProductSubCategory, string> = {
  all: '전체 상품',
  outer: '아우터',
  jacket: '재킷',
  knit: '니트',
  tshirt: '티셔츠',
  pants: '팬츠',
  fashion: '패션잡화',
  jewelry: '주얼리/시계',
  trending: 'Trending',
};

export interface Product {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  subCategory: ProductSubCategory;
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
