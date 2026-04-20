import useHorizontalDragScroll from '../../hooks/useHorizontalDragScroll';

type ClickRankingItem = {
    rank: string;
    image: string;
};

type ClickRankingSectionProps = {
    items: readonly ClickRankingItem[];
};

export default function ClickRankingSection({ items }: ClickRankingSectionProps) {
    const { scrollRef, isDragging, dragHandlers } = useHorizontalDragScroll();

    return (
        <section className="w-full bg-white py-[100px]">
            <div className="flex flex-col gap-10 xl:flex-row xl:gap-[120px]">
                <div className="relative flex min-h-[520px] w-full flex-col text-left xl:-ml-[50px] xl:h-[620px] xl:w-[425px] xl:shrink-0">
                    <h2 className="w-full text-left font-['Alexandria'] text-[56px] font-bold uppercase leading-none text-black md:text-[80px]">
                        CLICK
                        <br />
                        RANKING
                    </h2>
                    <p className="mt-[48px] w-full text-left font-['Alexandria'] text-[24px] font-normal leading-none text-black md:text-[30px]">
                        실시간 클릭랭킹
                    </p>

                    <div className="mt-[210px] xl:mt-[230px] translate-y-[120px] translate-x-[-140px]">
                        <a
                            href="#ranking"
                            className="group flex items-center gap-2 font-['Alexandria'] text-[20px] font-medium text-black transition-colors"
                        >
                            전체 랭킹보기
                            <span className="text-[22px] transition-transform group-hover:translate-x-1">
                                &rarr;
                            </span>
                        </a>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className={`min-w-0 flex-1 overflow-x-auto scrollbar-hide select-none xl:pr-[80px] ${
                        isDragging ? 'cursor-grabbing' : 'cursor-grab'
                    }`}
                    {...dragHandlers}
                >
                    <div className="flex min-w-max gap-[30px] pb-10">
                        {items.map((item) => (
                            <div key={item.rank} className="relative w-[min(72vw,480px)] shrink-0">
                                <div className="aspect-[4/5] w-full overflow-hidden bg-gray-50">
                                    <img
                                        src={item.image}
                                        alt={`Rank ${item.rank}`}
                                        draggable={false}
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                <div className="absolute -bottom-6 -right-2">
                                    <span className="font-['Alexandria'] text-[88px] font-bold leading-none text-black selection:bg-transparent md:text-[120px]">
                                        {item.rank}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
