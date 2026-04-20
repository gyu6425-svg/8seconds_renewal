import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { usePaginatedProducts } from '../../features/products/usePaginatedProducts';
import type { ProductSubCategory } from '../../features/products/productTypes';
import EmptyState from '../common/EmptyState';
import CategoryTabs from './CategoryTabs';
import VirtualizedProductGrid from './VirtualizedProductGrid';

type NewProductsSectionProps = {
    gender: 'men' | 'women';
    topPaddingClassName: string;
};

const queryCategoryMap: Record<string, ProductSubCategory> = {
    outer: 'outer',
    jacket: 'jacket',
    knit: 'knit',
    tshirt: 'tshirt',
    pants: 'pants',
    fashion: 'fashion',
    'bag-shoes': 'fashion',
    jewelry: 'jewelry',
    trending: 'trending',
};

function getSubCategoryFromQuery(value: string | null): ProductSubCategory {
    if (!value) return 'all';
    return queryCategoryMap[value] ?? 'all';
}

export default function NewProductsSection({ gender, topPaddingClassName }: NewProductsSectionProps) {
    const [searchParams] = useSearchParams();
    const initialCategory = getSubCategoryFromQuery(searchParams.get('category'));
    const [subCategory, setSubCategory] = useState<ProductSubCategory>(initialCategory);
    const search = searchParams.get('search') ?? '';
    const { items, loading, error, hasMore, handleLoadMore } = usePaginatedProducts(
        gender,
        subCategory,
        search,
    );

    return (
        <section className={`w-full bg-white pb-[150px] ${topPaddingClassName}`}>
            <div className="mx-auto w-full max-w-[1700px] px-4 md:px-0">
                <h2
                    className="font-['Alexandria'] text-[64px] font-extrabold uppercase leading-none tracking-tighter text-black md:text-[80px]"
                    style={{ marginBottom: '100px' }}
                >
                    NEW
                </h2>

                <CategoryTabs active={subCategory} onChange={setSubCategory} />

                {search ? (
                    <p className="mb-10 text-[20px] font-medium text-[#666666]">
                        검색어: <span className="font-semibold text-[#111111]">{search}</span>
                    </p>
                ) : null}

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

                {!loading && items.length === 0 ? (
                    <EmptyState
                        title="조건에 맞는 상품이 없습니다."
                        description="다른 카테고리나 검색어로 다시 확인해보세요."
                    />
                ) : (
                    <VirtualizedProductGrid items={items} onReachEnd={handleLoadMore} />
                )}

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
