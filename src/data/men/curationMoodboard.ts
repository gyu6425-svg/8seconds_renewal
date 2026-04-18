const fillImageSet = (images: string[], total = 9) =>
    Array.from({ length: total }, (_, index) => images[index % images.length]);

export const menCurationChipSets = [
    {
        id: 'kim',
        label: '#김경준 PICK',
        images: fillImageSet(
            Array.from({ length: 9 }, (_, index) => `/images/men/celeb${index + 1}.png`)
        ),
    },
    {
        id: 'happy-jungho',
        label: '#해피가이정호 PICK',
        images: fillImageSet(
            Array.from({ length: 8 }, (_, index) => `/images/men/celeb2_${index + 1}.png`)
        ),
    },
    {
        id: 'casual',
        label: '#캐주얼 꾸안꾸',
        images: fillImageSet(
            Array.from({ length: 8 }, (_, index) => `/images/men/celeb3_${index + 1}.png`)
        ),
    },
] as const;
