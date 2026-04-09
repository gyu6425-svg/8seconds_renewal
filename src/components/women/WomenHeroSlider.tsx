import useHorizontalDragScroll from './useHorizontalDragScroll';
import { womenHeroSliderCards } from '../../data/women';

export default function WomenHeroSlider() {
    const { scrollRef, isDragging, dragHandlers } = useHorizontalDragScroll();

    return (
        <section className="w-full bg-white pt-20 pb-20 ">
            <div
                ref={scrollRef}
                className={`overflow-x-auto scrollbar-hide px-4 md:px-10 select-none ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                {...dragHandlers}
            >
                <div className="flex gap-4 md:gap-0 min-w-max pb-20">
                    {womenHeroSliderCards.map((card) => (
                        <div
                            key={card.id}
                            className="group relative w-[559px] md:w-[559px] transition-all duration-500 ease-in-out hover:bg-[#111111]"
                        >
                            <div className="p-8 md:p-12 mb-4">
                                <span className="block font-['Alexandria'] text-5xl md:text-7xl font-bold transition-colors duration-500 group-hover:text-white">
                                    {card.id}
                                </span>
                                <span className="mt-4 block font-['Pretendard'] text-sm md:text-lg font-semibold text-gray-400 uppercase tracking-wider">
                                    {card.category}
                                </span>
                            </div>

                            <div className="relative mx-auto w-[85%] overflow-hidden transition-all duration-500 ease-in-out h-[400px] md:h-[550px] group-hover:h-[450px] md:group-hover:h-[620px]">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    draggable={false}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h2 className="font-['Alexandria'] text-2xl md:text-4xl font-bold text-white leading-tight">
                                        {card.title}
                                    </h2>
                                    <p className="mt-2 font-['Pretendard'] text-sm md:text-base text-gray-200">
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
