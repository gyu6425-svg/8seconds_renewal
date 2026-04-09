const fillImageSet = (images: string[], total = 9) =>
    Array.from({ length: total }, (_, index) => images[index % images.length]);

export const womenCurationChipSets = [
    {
        id: 'kim',
        label: '#김경준 PICK',
        images: fillImageSet(Array.from({ length: 9 }, (_, index) => `/images/men/celeb${index + 1}.png`)),
    },
    {
        id: 'happy-jungho',
        label: '#해피가이정호 PICK',
        images: fillImageSet(
            Array.from({ length: 8 }, (_, index) => `/images/men/new${index + 1}.png`),
        ),
    },
    {
        id: 'casual',
        label: '#캐주얼 꾸안꾸',
        images: fillImageSet(['/images/men/click1.png', '/images/men/click2.png', '/images/men/click3.png']),
    },
] as const;
