import VirtualizedProductGrid from '../product/VirtualizedProductGrid';
import { usePaginatedProducts } from '../../features/products/usePaginatedProducts';

export default function New() {
    const { items, loading, error, hasMore, handleLoadMore } = usePaginatedProducts('men');

    return (
        <section className="w-full bg-white py-[150px]">
            <div className="mx-auto w-full max-w-[1700px] px-4 md:px-0">
                <h2 className="mb-[80px] font-['Alexandria'] text-[80px] font-extrabold uppercase leading-none tracking-tighter text-black">
                    NEW
                </h2>

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

                <VirtualizedProductGrid items={items} onReachEnd={handleLoadMore} />

                {hasMore ? (
                    <div className="flex w-full translate-y-[80px] justify-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="flex h-[60px] w-[240px] items-center justify-center rounded-full border border-[#dddddd] bg-white font-['Pretendard'] text-[18px] font-medium text-black transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? '불러오는 중...' : '더보기'}
                        </button>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
