import useHorizontalDragScroll from '../../hooks/useHorizontalDragScroll';

type SectionHeroSliderCard = {
    id: string;
    title: string;
    subTitle: string;
    image: string;
    category: string;
};

type SectionHeroSliderProps = {
    cards: readonly SectionHeroSliderCard[];
};

export default function SectionHeroSlider({ cards }: SectionHeroSliderProps) {
    const { scrollRef, isDragging, dragHandlers } = useHorizontalDragScroll();

    return (
        <section className="w-full bg-white py-20">
            <div
                ref={scrollRef}
                className={`overflow-x-auto scrollbar-hide px-4 select-none md:px-10 ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                {...dragHandlers}
            >
                <div className="flex min-w-max gap-4 pb-20 md:gap-0">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="group relative w-[min(82vw,559px)] transition-all duration-500 ease-in-out hover:bg-[#111111] md:w-[559px]"
                        >
                            <div className="mb-4 p-8 md:p-12">
                                <span className="block font-['Alexandria'] text-5xl font-bold transition-colors duration-500 group-hover:text-white md:text-7xl">
                                    {card.id}
                                </span>
                                <span className="mt-4 block font-['Pretendard'] text-sm font-semibold uppercase tracking-wider text-gray-400 md:text-lg">
                                    {card.category}
                                </span>
                            </div>

                            <div className="relative mx-auto h-[400px] w-[85%] overflow-hidden transition-all duration-500 ease-in-out group-hover:h-[450px] md:h-[550px] md:group-hover:h-[620px]">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    draggable={false}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-10">
                                    <h2 className="font-['Alexandria'] text-2xl font-bold leading-tight text-white md:text-4xl">
                                        {card.title}
                                    </h2>
                                    <p className="mt-2 font-['Pretendard'] text-sm text-gray-200 md:text-base">
                                        {card.subTitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
