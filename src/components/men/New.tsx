import { useState } from 'react';

import CategoryTabs from '../product/CategoryTabs';
import VirtualizedProductGrid from '../product/VirtualizedProductGrid';
import { usePaginatedProducts } from '../../features/products/usePaginatedProducts';
import type { ProductSubCategory } from '../../features/products/productTypes';

export default function New() {
    const [subCategory, setSubCategory] = useState<ProductSubCategory>('all');
    const { items, loading, error, hasMore, handleLoadMore } = usePaginatedProducts(
        'men',
        subCategory
    );

    return (
        <section className="w-full bg-white pt-[240px] pb-[150px]">
            <div className="mx-auto w-full max-w-[1700px] px-4 md:px-0">
                <h2
                    className="font-['Alexandria'] text-[80px] font-extrabold uppercase leading-none tracking-tighter text-black"
                    style={{ marginBottom: '100px' }}
                >
                    NEW
                </h2>

                <CategoryTabs active={subCategory} onChange={setSubCategory} />

                {error ? (
                    <p className="mb-10 text-center text-[18px] font-medium text-[#d92d20]">
                        {error}
                    </p>
                ) : null}

                {loading && items.length === 0 ? (
                    <p className="mb-10 text-center text-[18px] font-medium text-[#666666]">
                        상품을 불러오는 중입니다.
                    </p>
                ) : null}

                <VirtualizedProductGrid items={items} />

                {hasMore ? (
                    <div className="flex w-full justify-center" style={{ marginTop: '80px' }}>
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="flex h-[80px] w-[200px] items-center justify-center rounded-full border border-black bg-white font-['Alexandria'] text-[30px] font-light leading-none text-black transition-all duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? '...' : '더보기'}
                        </button>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
