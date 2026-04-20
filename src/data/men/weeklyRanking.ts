export type MenWeeklyItem = {
    brand: string;
    name: string;
    price: string;
    image: string;
};

export const menWeeklyRankingSets = [
    {
        id: 'week3',
        label: '3월 3주차',
        items: [
            {
                brand: '8Seconds',
                name: '[해피가이정호 PICK] 스트라이프 라운드 카디건 - 애쉬',
                price: '59,900',
                image: '/images/men/online1.png',
            },
            {
                brand: '8Seconds',
                name: '그래픽 긴소매 티셔츠 - 네이비',
                price: '39,900',
                image: '/images/men/online2.png',
            },
            {
                brand: '8Seconds',
                name: '경량 바이커 데님 아우터 - 블랙',
                price: '99,900',
                image: '/images/men/online3.png',
            },
            {
                brand: '8Seconds',
                name: '코듀로이 체크 셔츠 - 애쉬',
                price: '69,900',
                image: '/images/men/online4.png',
            },
        ] satisfies MenWeeklyItem[],
    },
    {
        id: 'week2',
        label: '3월 2주차',
        items: [
            {
                brand: '8Seconds',
                name: '경량 에센셜 와이드핏 데님 팬츠 - 블루',
                price: '59,900',
                image: '/images/men/online2-1.png',
            },
            {
                brand: '8Seconds',
                name: '리넨 혼방 솔리드 라운드 카디건 - 애쉬',
                price: '69,900',
                image: '/images/men/online2-2.png',
            },
            {
                brand: '8Seconds',
                name: '내추럴 체크 윈드브레이커 - 스카이블루',
                price: '79,900',
                image: '/images/men/online2-3.png',
            },
            {
                brand: '8Seconds',
                name: '로우 엣지 레터링 반소매 티셔츠 - 브라운',
                price: '89,900',
                image: '/images/men/online2-4.png',
            },
        ] satisfies MenWeeklyItem[],
    },
] as const;
