export type WomenWeeklyItem = {
    brand: string;
    name: string;
    price: string;
    image: string;
};

export const womenWeeklyRankingSets = [
    {
        id: 'week3',
        label: '3월 3주차',
        items: [
            {
                brand: '8Seconds',
                name: '칼라넥 스트라이프 풀오버 - 네이비',
                price: '49,900',
                image: '/images/women/online1.png',
            },
            {
                brand: '8Seconds',
                name: '메탈사 뷔스티에 니트 - 그레이',
                price: '49,900',
                image: '/images/women/online2.png',
            },
            {
                brand: '8Seconds',
                name: '[플로우윤 PICK] 페이크 레더 블루종 오버핏 - 브라운',
                price: '59,900',
                image: '/images/women/online3.png',
            },
            {
                brand: '8Seconds',
                name: '스트라이프 킬라 미니원피스 - 스카이 블루',
                price: '69,900',
                image: '/images/women/online4.png',
            },
        ] satisfies WomenWeeklyItem[],
    },
    {
        id: 'week2',
        label: '3월 2주차',
        items: [
            {
                brand: '8Seconds',
                name: '체크 오버핏 반팔 셔츠 - 애쉬',
                price: '39,900',
                image: '/images/women/online2-1.png',
            },
            {
                brand: '8Seconds',
                name: '배럴핏 와이드 팬츠 - 카키',
                price: '49,900',
                image: '/images/women/online2-2.png',
            },
            {
                brand: '8Seconds',
                name: '스카시 후디 저지 카디건 - 스카이 블루',
                price: '69,900',
                image: '/images/women/online2-3.png',
            },
            {
                brand: '8Seconds',
                name: '칼라 네트 카디건 - 베이지',
                price: '54,900',
                image: '/images/women/online2-4.png',
            },
        ] satisfies WomenWeeklyItem[],
    },
] as const;
