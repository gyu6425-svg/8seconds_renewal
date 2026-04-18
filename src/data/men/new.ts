import type { ProductSubCategory } from '../../features/products/productTypes';

export interface MenNewProduct {
    id: number;
    image: string;
    brand: string;
    name: string;
    price: string;
    subCategory: ProductSubCategory;
}

export const menNewProducts: MenNewProduct[] = [
    // outer
    {
        id: 2,
        subCategory: 'outer',
        image: '/images/men/new2.png',
        brand: '8seconds',
        name: '[김경준 PICK] 집업 초어 재킷 - 브라운',
        price: '49,900',
    },
    {
        id: 8,
        subCategory: 'outer',
        image: '/images/men/new8.png',
        brand: '8seconds',
        name: '솔리드 라운드 카디건 - 네이비',
        price: '99,900',
    },

    // jacket
    {
        id: 2,
        subCategory: 'jacket',
        image: '/images/men/new2.png',
        brand: '8seconds',
        name: '[김경준 PICK] 집업 초어 재킷 - 브라운',
        price: '49,900',
    },
    // knit
    {
        id: 8,
        subCategory: 'knit',
        image: '/images/men/new8.png',
        brand: '8seconds',
        name: '솔리드 라운드 카디건 - 네이비',
        price: '49,900',
    },
    // tshirt/shirt
    {
        id: 1,
        subCategory: 'tshirt',
        image: '/images/men/new1.png',
        brand: '8seconds',
        name: '다잉 해비코튼 바이크 반소매티 - 브라운',
        price: '39,900',
    },
    {
        id: 5,
        subCategory: 'tshirt',
        image: '/images/men/new5.png',
        brand: '8seconds',
        name: '넥배색 스트라이프 반소매티 - 블루',
        price: '49,900',
    },
    {
        id: 6,
        subCategory: 'tshirt',
        image: '/images/men/new6.png',
        brand: '8seconds',
        name: '조직감 솔리드 반소매티 - 블랙',
        price: '49,900',
    },
    // pants
    {
        id: 9,
        subCategory: 'pants',
        image: '/images/men/new9.png',
        brand: '8seconds',
        name: '[인플루언서 PICK] 리넨 블랜디드 커브드 팬츠 - 브라운',
        price: '49,900',
    },
    {
        id: 4,
        subCategory: 'pants',
        image: '/images/men/new4.png',
        brand: '8seconds',
        name: '경량 코튼 이지 팬츠 - 브라운',
        price: '49,900',
    },
    // fashion
    // {
    //     id: 6,
    //     subCategory: 'fashion',
    //     image: '/images/men/new6.png',
    //     brand: '8seconds',
    //     name: '미니 크로스백 - 베이지',
    //     price: '49,900',
    // },
    // jewelry
    // {
    //     id: 7,
    //     subCategory: 'jewelry',
    //     image: '/images/men/new7.png',
    //     brand: '8seconds',
    //     name: '실버 체인 브레이슬릿',
    //     price: '49,900',
    // },
    // trending
    {
        id: 8,
        subCategory: 'trending',
        image: '/images/men/new8.png',
        brand: '8seconds',
        name: '솔리드 라운드 카디건 - 네이비',
        price: '99,900',
    },
    {
        id: 2,
        subCategory: 'trending',
        image: '/images/men/new2.png',
        brand: '8seconds',
        name: '[김경준 PICK] 집업 초어 재킷 - 브라운',
        price: '49,900',
    },
];
