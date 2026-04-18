const fillImageSet = (images: string[], total = 9) =>
    Array.from({ length: total }, (_, index) => images[index % images.length]);

export const womenCurationChipSets = [
    {
        id: 'kwon',
        label: '#권연주 PICK',
        images: fillImageSet(
            Array.from({ length: 9 }, (_, index) => `/images/women/celeb${index + 1}.png`)
        ),
    },
    {
        id: 'wm',
        label: '#수박온니 PICK',
        images: fillImageSet(
            Array.from({ length: 8 }, (_, index) => `/images/women/celeb2_${index + 1}.png`)
        ),
    },
] as const;
