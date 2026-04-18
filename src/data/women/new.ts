import type { ProductSubCategory } from '../../features/products/productTypes';

export interface WomenNewProduct {
    id: number;
    image: string;
    brand: string;
    name: string;
    price: string;
    subCategory: ProductSubCategory;
}

export const womenNewProducts: WomenNewProduct[] = [
    // outer
    {
        id: 6,
        subCategory: 'outer',
        image: '/images/women/new6.png',
        brand: '8Seconds',
        name: '포인텔 후드 집업 - 크림',
        price: '49,900',
    },
    {
        id: 2,
        subCategory: 'outer',
        image: '/images/women/new2.png',
        brand: '8Seconds',
        name: '레이스 안감 트랙재킷 - 네이비',
        price: '89,900',
    },
    // jacket
    {
        id: 6,
        subCategory: 'jacket',
        image: '/images/women/new6.png',
        brand: '8Seconds',
        name: '포인텔 후드 집업 - 크림',
        price: '49,900',
    },
    {
        id: 2,
        subCategory: 'jacket',
        image: '/images/women/new2.png',
        brand: '8Seconds',
        name: '레이스 안감 트랙재킷 - 네이비',
        price: '89,900',
    },
    // knit
    {
        id: 10,
        subCategory: 'knit',
        image: '/images/women/new10.png',
        brand: '8Seconds',
        name: '변형 스냅 카디건 - 레드',
        price: '49,900',
    },
    // tshirt
    {
        id: 1,
        subCategory: 'tshirt',
        image: '/images/women/new1.png',
        brand: '8Seconds',
        name: '넥배색 그래픽 반소매 티셔츠 - 화이트',
        price: '49,900',
    },
    {
        id: 5,
        subCategory: 'tshirt',
        image: '/images/women/new5.png',
        brand: '8Seconds',
        name: '우븐배색 니트 풀오버 - 그레이',
        price: '49,900',
    },
    {
        id: 3,
        subCategory: 'tshirt',
        image: '/images/women/new3.png',
        brand: '8Seconds',
        name: '린넨 긴소매 셔츠 - 네이비',
        price: '49,900',
    },
    // pants
    {
        id: 4,
        subCategory: 'pants',
        image: '/images/women/new4.png',
        brand: '8Seconds',
        name: '밴딩 파라슈트 데님 팬츠 - 네이비',
        price: '49,900',
    },
    {
        id: 7,
        subCategory: 'pants',
        image: '/images/women/new7.png',
        brand: '8Seconds',
        name: '배색 지퍼 파라슈트 팬츠 - 그레이',
        price: '49,900',
    },
    {
        id: 8,
        subCategory: 'pants',
        image: '/images/women/new8.png',
        brand: '8Seconds',
        name: '조직감 와이드 캐주얼 팬츠 - 화이트',
        price: '49,900',
    },
    {
        id: 9,
        subCategory: 'pants',
        image: '/images/women/new9.png',
        brand: '8Seconds',
        name: '스키니 부츠컷 데님 - 블루',
        price: '49,900',
    },

    // fashion
    // {
    //     id: 6,
    //     subCategory: 'fashion',
    //     image: '/images/women/new6.png',
    //     brand: '8Seconds',
    //     name: '미니 버킷백 - 카멜',
    //     price: '49,900',
    // },
    // {
    //     id: 11,
    //     subCategory: 'fashion',
    //     image: '/images/women/new6.png',
    //     brand: '8Seconds',
    //     name: '스퀘어백 - 블랙',
    //     price: '49,900',
    // },
    // jewelry
    // {
    //     id: 7,
    //     subCategory: 'jewelry',
    //     image: '/images/women/new7.png',
    //     brand: '8Seconds',
    //     name: '골드 레이어드 목걸이',
    //     price: '49,900',
    // },
    // trending
    {
        id: 9,
        subCategory: 'trending',
        image: '/images/women/new9.png',
        brand: '8Seconds',
        name: '시즌 트렌드 코디 - 라벤더',
        price: '49,900',
    },
    {
        id: 10,
        subCategory: 'trending',
        image: '/images/women/new10.png',
        brand: '8Seconds',
        name: '시즌 트렌드 코디 - 라벤더',
        price: '49,900',
    },
];
