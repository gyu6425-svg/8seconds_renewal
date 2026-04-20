import { menNewProducts } from '../../data/men';
import { womenNewProducts } from '../../data/women';
import type { ProductSubCategory } from '../../features/products/productTypes';

export type ProductQueryParams = {
  gender?: 'men' | 'women';
  subCategory?: ProductSubCategory;
  search?: string;
  page?: number;
};

export type ProductApiItem = {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  subCategory: ProductSubCategory;
};

export type ProductsResponse = {
  items: ProductApiItem[];
  hasMore: boolean;
  page: number;
};

const PAGE_SIZE = 8;

const toProductApiItems = (
  products: Array<{
    id: number;
    image: string;
    brand: string;
    name: string;
    price: string;
    subCategory: ProductSubCategory;
  }>,
): ProductApiItem[] =>
  products.map((product) => ({
    id: String(product.id),
    image: product.image,
    brand: product.brand,
    name: product.name,
    price: Number(product.price.replaceAll(',', '')),
    subCategory: product.subCategory,
  }));

export async function getProducts(
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { gender, subCategory = 'all', search = '', page = 1 } = params;

  // gender별 데이터 선택
  const rawProducts = gender === 'men'
    ? menNewProducts
    : gender === 'women'
      ? womenNewProducts
      : [];

  const allItems = toProductApiItems(rawProducts);

  // subCategory 필터링
  const byCategory = subCategory === 'all'
    ? allItems
        .filter((item, index, arr) => arr.findIndex((p) => p.id === item.id) === index)
        .map((item, index) => ({ ...item, id: String(index + 1) }))
    : allItems.filter((item) => item.subCategory === subCategory);

  const keyword = search.trim().toLowerCase();
  const filtered = keyword
    ? byCategory.filter((item) =>
        [item.brand, item.name, item.subCategory].some((value) =>
          value.toLowerCase().includes(keyword),
        ),
      )
    : byCategory;

  // 페이지네이션
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = filtered.slice(start, end);
  const hasMore = end < filtered.length;

  return { items: pageItems, hasMore, page };
}

export const fetchProducts = getProducts;
