import { memo } from 'react';

import type { Product } from '../../features/products/productTypes';

type ProductCardProps = {
  product: Product;
};

const formatPrice = (price: number) => new Intl.NumberFormat('ko-KR').format(price);

function ProductCardComponent({ product }: ProductCardProps) {
  return (
    <article className="group flex w-[416px] cursor-pointer flex-col items-start gap-[8px]">
      <div className="w-full overflow-hidden bg-[#f5f5f5]">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[416/520] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative mt-2 flex w-full flex-col gap-[4px] font-['Pretendard']">
        <span className="w-full text-left font-['Pretendard'] text-[16px] font-bold uppercase text-[#ff1d1d]">
          {product.brand}
        </span>
        <h4 className="mt-1 w-full text-left font-['Pretendard'] text-[16px] font-medium tracking-tight text-[#666666]">
          {product.name}
        </h4>
        <span className="absolute right-0 bottom-[-28px] font-['Pretendard'] text-[20px] font-extrabold text-black">
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
}

const ProductCard = memo(ProductCardComponent);

export default ProductCard;
