export default function PageSkeleton() {
    return (
        <div className="w-full animate-pulse">
            {/* 헤더 타이틀 영역 */}
            <div className="mb-[80px] h-[80px] w-[260px] rounded bg-[#ebebeb]" />

            {/* 4열 상품 카드 그리드 스켈레톤 */}
            <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        {/* 상품 이미지 */}
                        <div className="aspect-[416/520] w-full bg-[#f0f0f0]" />
                        {/* 브랜드명 */}
                        <div className="h-4 w-1/3 rounded bg-[#ebebeb]" />
                        {/* 상품명 */}
                        <div className="h-4 w-3/4 rounded bg-[#ebebeb]" />
                        {/* 가격 */}
                        <div className="h-4 w-1/4 rounded bg-[#ebebeb]" />
                    </div>
                ))}
            </div>
        </div>
    );
}
