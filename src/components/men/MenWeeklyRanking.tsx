import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useHorizontalDragScroll from './useHorizontalDragScroll';
import { menWeeklyRankingSets } from '../../data/men';

export default function MenWeeklyRanking() {
    const [activeWeek, setActiveWeek] = useState<(typeof menWeeklyRankingSets)[number]['id']>(
        menWeeklyRankingSets[0].id
    );
    const productListRef = useRef<HTMLDivElement | null>(null);
    const { scrollRef, isDragging, dragHandlers } = useHorizontalDragScroll();

    useLayoutEffect(() => {
        const productList = productListRef.current;

        if (!productList) {
            return;
        }

        const cards = productList.querySelectorAll('[data-weekly-card]');

        gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 12 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.35,
                stagger: 0.04,
                ease: 'power2.out',
                overwrite: 'auto',
            }
        );
    }, [activeWeek]);

    const activeSet =
        menWeeklyRankingSets.find((weekSet) => weekSet.id === activeWeek) ?? menWeeklyRankingSets[0];

    return (
        <section className="w-full bg-white pt-[200px]">
            <div className="w-[1700px] flex items-start gap-[154px]">
                {/* Left Promotion Card: 559x818 overflow-hidden */}
                <div className="sticky top-[280px] z-10 h-[818px] w-[559px] shrink-0 overflow-hidden">
                    <img
                        src="/images/men/online_banner.png"
                        alt="Promotion"
                        className="h-full w-full object-cover"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/40 to-transparent p-[60px]">
                        <span className="font-['Alexandria'] text-[48px] font-bold leading-none tracking-tight text-white uppercase">
                            ONLY ONLINE
                        </span>
                        <p className="mt-4 font-['Pretendard'] text-[24px] font-bold text-white">
                            오직 <span className="text-[#ff3838]">여기</span>에서만
                        </p>
                    </div>
                </div>

                {/* Right Area: Weekly Filters + Swipeable Products */}
                <div className="flex min-w-0 flex-1 flex-col items-start gap-[81px]">
                    {/* Filter Buttons (Pill style) */}
                    <div className="translate-x-[-290px] flex shrink-0 self-start gap-[12px]">
                        {menWeeklyRankingSets.map((weekSet) => {
                            const isActive = weekSet.id === activeWeek;

                            return (
                                <button
                                    key={weekSet.id}
                                    type="button"
                                    onClick={() => setActiveWeek(weekSet.id)}
                                    className={`flex h-[80px] w-[200px] items-center justify-center rounded-full border px-[20px] whitespace-nowrap font-['Alexandria'] text-[30px] font-light leading-none transition-all duration-300 ${
                                        isActive
                                            ? 'border-black bg-black text-white'
                                            : 'border-[#000000] bg-white text-black hover:border-black hover:bg-black hover:text-white'
                                    }`}
                                >
                                    {weekSet.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Swipeable Product Area */}
                    <div
                        ref={scrollRef}
                        className={`w-full overflow-x-auto scrollbar-hide touch-pan-x overscroll-x-contain select-none ${
                            isDragging ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                        {...dragHandlers}
                    >
                        <div
                            ref={productListRef}
                            className="flex min-w-max gap-[12px] snap-x snap-mandatory"
                        >
                            {activeSet.items.map((item, idx) => (
                                <div
                                    key={`${activeWeek}-${idx}`}
                                    data-weekly-card
                                    className="flex h-[673px] w-[416px] shrink-0 snap-start flex-col gap-[8px]"
                                >
                                    {/* Product Image */}
                                    <div className="aspect-[3/4] w-full overflow-hidden bg-[#f6f6f6]">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            draggable={false}
                                            className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="relative w-[416px]">
                                        <div className="flex flex-col">
                                            <span className="w-full text-left font-['Pretendard'] text-[16px] font-bold text-[#ff1d1d] uppercase">
                                                {item.brand}
                                            </span>
                                            <h4 className="mt-1 w-full text-left font-['Pretendard'] text-[16px] font-medium tracking-tight text-[#666666]">
                                                {item.name}
                                            </h4>
                                        </div>

                                        {/* Price - Bottom Right */}
                                        <div className="relative mt-4 flex justify-end">
                                            <span className="absolute right-0 font-['Pretendard'] text-[20px] font-extrabold text-black">
                                                {item.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
