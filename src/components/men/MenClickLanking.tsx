import useHorizontalDragScroll from './useHorizontalDragScroll';
import { menClickRankingItems } from '../../data/men';

export default function MenClickLanking() {
    const { scrollRef, isDragging, dragHandlers } = useHorizontalDragScroll();

    return (
        <section className="w-full bg-white py-[100px]">
            <div className="flex gap-[197px]">
                {/* Left Content Area: Fixed width 375px */}
                <div className="relative w-[375px] h-[421px] flex flex-col gap-[20px] text-left">
                    <h2 className="w-full text-left font-['Alexandria'] text-[80px] font-bold leading-[80px] text-black uppercase text-black">
                        CLICK
                        <br />
                        LANKING
                    </h2>
                    <p className="w-full text-left font-['Alexandria'] text-[30px] font-regular leading-none text-black">
                        실시간 클릭랭킹
                    </p>

                    <div className="absolute mt-[20px] bottom-0 left-[0px] ">
                        <a
                            href="#"
                            className="group flex items-center gap-2 font-['Alexandria'] text-[20px] font-medium text-black transition-colors"
                        >
                            전체 랭킹보기
                            <span className="text-[22px] transition-transform group-hover:translate-x-1">
                                &rarr;
                            </span>
                        </a>
                    </div>
                </div>

                {/* Right Content Area: Swipeable Ranking Cards */}
                {/* Gap 197px from left content */}
                <div
                    ref={scrollRef}
                    className={`flex-1 overflow-x-auto scrollbar-hide pr-[110px] select-none ${
                        isDragging ? 'cursor-grabbing' : 'cursor-grab'
                    }`}
                    {...dragHandlers}
                >
                    <div className="flex gap-[30px] min-w-max pb-10">
                        {menClickRankingItems.map((item) => (
                            <div key={item.rank} className="relative w-[480px] shrink-0">
                                {/* Product Image Container */}
                                <div className="aspect-[4/5] w-full overflow-hidden bg-gray-50">
                                    <img
                                        src={item.image}
                                        alt={`Rank ${item.rank}`}
                                        draggable={false}
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Rank Number Overlay - Positioned bottom right */}
                                <div className="absolute -bottom-6 -right-2">
                                    <span className="font-['Alexandria'] text-[120px] font-bold leading-none text-black selection:bg-transparent">
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
