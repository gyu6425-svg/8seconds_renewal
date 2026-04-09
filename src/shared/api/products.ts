import { menAppendProducts, menInitialProducts } from '../../data/men';
import { womenAppendProducts, womenInitialProducts } from '../../data/women';

export type ProductQueryParams = {
  category?: string;
  search?: string;
  page?: number;
};

export type ProductApiItem = {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
};

export type ProductsResponse = {
  items: ProductApiItem[];
  hasMore: boolean;
  page: number;
};

const toProductApiItems = (
  products: Array<{
    id: number;
    image: string;
    brand: string;
    name: string;
    price: string;
  }>,
): ProductApiItem[] =>
  products.map((product) => ({
    id: String(product.id),
    image: product.image,
    brand: product.brand,
    name: product.name,
    price: Number(product.price.replaceAll(',', '')),
  }));

export async function getProducts(
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const category = params.category;
  const page = params.page ?? 1;

  if (category === 'men') {
    const items = page === 1 ? menInitialProducts : page === 2 ? menAppendProducts : [];

    return {
      items: toProductApiItems(items),
      hasMore: page < 2,
      page,
    };
  }

  if (category === 'women') {
    const items = page === 1 ? womenInitialProducts : page === 2 ? womenAppendProducts : [];

    return {
      items: toProductApiItems(items),
      hasMore: page < 2,
      page,
    };
  }

  return {
    items: [],
    hasMore: false,
    page: 1,
  };
}

export const fetchProducts = getProducts;
