import type { Product } from '../../features/products/productTypes';
import EmptyState from '../common/EmptyState';
import ProductCard from './ProductCard';

type ProductGridProps = {
    items: Product[];
};

export default function ProductGrid({ items }: ProductGridProps) {
    if (items.length === 0) {
        return (
            <EmptyState
                title="조건에 맞는 상품이 없습니다."
                description="다른 카테고리나 검색어로 다시 확인해보세요."
            />
        );
    }

    return (
        <section className="grid grid-cols-1 gap-x-3 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
}
