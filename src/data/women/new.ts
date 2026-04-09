export interface WomenNewProduct {
    id: number;
    image: string;
    brand: string;
    name: string;
    price: string;
}

export const womenInitialProducts: WomenNewProduct[] = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    image: `/images/men/new${i + 1}.png`,
    brand: '8Seconds',
    name: '그래픽 긴소매 티셔츠 - 아이보리',
    price: '49,900',
}));

export const womenAppendProducts: WomenNewProduct[] = Array.from({ length: 4 }).map((_, i) => ({
    id: womenInitialProducts.length + i + 1,
    image: `/images/men/new${(i % 8) + 1}.png`,
    brand: '8Seconds',
    name: '그래픽 긴소매 티셔츠 - 오트밀',
    price: '49,900',
}));
