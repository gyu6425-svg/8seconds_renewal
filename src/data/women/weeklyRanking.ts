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
                name: '그래픽 긴소매 티셔츠 - 아이보리',
                price: '49,900',
                image: '/images/women/online1.png',
            },
            {
                brand: '8Seconds',
                name: '그래픽 긴소매 티셔츠 - 네이비',
                price: '49,900',
                image: '/images/women/online2.png',
            },
            {
                brand: '8Seconds',
                name: '스트라이프 카라 니트',
                price: '59,900',
                image: '/images/women/online3.png',
            },
            {
                brand: '8Seconds',
                name: '캐주얼 무드 데님 팬츠',
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
                name: '루즈핏 체크 셔츠',
                price: '59,900',
                image: '/images/women/online2-1.png',
            },
            {
                brand: '8Seconds',
                name: '코튼 와이드 팬츠',
                price: '69,900',
                image: '/images/women/online2-2.png',
            },
            {
                brand: '8Seconds',
                name: '데일리 집업 니트',
                price: '79,900',
                image: '/images/women/online2-3.png',
            },
            {
                brand: '8Seconds',
                name: '미니멀 레더 스니커즈',
                price: '89,900',
                image: '/images/women/online2-4.png',
            },
        ] satisfies WomenWeeklyItem[],
    },
] as const;
