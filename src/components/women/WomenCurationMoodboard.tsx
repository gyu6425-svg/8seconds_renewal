import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { womenCurationChipSets } from '../../data/women';

gsap.registerPlugin(ScrollTrigger);

export default function WomenCurationMoodboard() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const typographyRef = useRef<HTMLDivElement | null>(null);
    const imageGridRef = useRef<HTMLDivElement | null>(null);
    const [activeChip, setActiveChip] = useState<(typeof womenCurationChipSets)[number]['id']>(
        womenCurationChipSets[0].id,
    );

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const typography = typographyRef.current;
        const imageGrid = imageGridRef.current;

        if (!section || !typography || !imageGrid) {
            return;
        }

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                endTrigger: imageGrid,
                pin: typography,
                start: 'top top+=120',
                end: 'bottom bottom',
                pinSpacing: false,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            });
        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    useLayoutEffect(() => {
        const imageGrid = imageGridRef.current;

        if (!imageGrid) {
            return;
        }

        const images = imageGrid.querySelectorAll('img');

        gsap.fromTo(
            images,
            { autoAlpha: 0, y: 12 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.35,
                stagger: 0.03,
                ease: 'power2.out',
                overwrite: 'auto',
            },
        );
    }, [activeChip]);

    const activeSet =
        womenCurationChipSets.find((chip) => chip.id === activeChip) ?? womenCurationChipSets[0];
    const imageRows = [
        activeSet.images.slice(0, 3),
        activeSet.images.slice(3, 6),
        activeSet.images.slice(6, 9),
    ];

    return (
        <section className="w-full bg-white py-[150px]">
            <div className="mx-auto w-full max-w-[1400px] px-4 md:px-0">
                <div className="mb-[100px] w-[741px] h-[100px] flex justify-center gap-[20px]">
                    {womenCurationChipSets.map((chip, index) => {
                        const isActive = chip.id === activeChip;
                        const widthClass = index === 0 ? 'w-[200px]' : index === 1 ? 'w-full' : '';

                        return (
                            <button
                                key={chip.id}
                                type="button"
                                onClick={() => setActiveChip(chip.id)}
                                className={`flex h-[80px] items-center justify-center rounded-full border border-[#000000] whitespace-nowrap font-['Alexandria'] text-[30px] font-light leading-none transition-all duration-300 ${
                                    index === 1 ? 'gap-[10px] p-[30px]' : 'px-[20px]'
                                } ${widthClass} ${
                                    isActive
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-black hover:text-white'
                                }`}
                            >
                                {chip.label}
                            </button>
                        );
                    })}
                </div>

                <div ref={sectionRef} className="relative">
                    <div
                        ref={typographyRef}
                        className="pointer-events-none absolute left-0 top-[480px] z-0 flex w-full items-center justify-center"
                    >
                        <div className="flex items-center gap-[32px]">
                            <span className="absolute left-0 top-[230px] font-['Alexandria'] text-[200px] font-normal leading-none text-black">
                                CELEB
                            </span>
                            <span className="absolute top-[180px] left-[50%] font-['Alexandria'] text-[200px] font-normal leading-none text-black">
                                #
                            </span>
                            <span className="absolute right-0 top-[70px] font-['Alexandria'] text-[200px] font-normal leading-none text-black">
                                PICK
                            </span>
                        </div>
                    </div>

                    <div ref={imageGridRef} className="relative z-10 flex flex-col gap-[12px]">
                        <div className="grid grid-cols-[430px_440px_506px] gap-[12px]">
                            {imageRows[0].map((image, index) => (
                                <div key={`${activeChip}-row1-${index + 1}`} className="w-full overflow-hidden">
                                    <img
                                        src={image}
                                        alt={`${activeSet.label} ${index + 1}`}
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="h-[280px]"></div>

                        <div className="grid grid-cols-[430px_440px_506px] gap-[12px]">
                            {imageRows[1].map((image, index) => (
                                <div key={`${activeChip}-row2-${index + 4}`} className="w-full overflow-hidden">
                                    <img
                                        src={image}
                                        alt={`${activeSet.label} ${index + 4}`}
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-[430px_440px_506px] gap-[12px]">
                            {imageRows[2].map((image, index) => (
                                <div key={`${activeChip}-row3-${index + 7}`} className="w-full overflow-hidden">
                                    <img
                                        src={image}
                                        alt={`${activeSet.label} ${index + 7}`}
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
