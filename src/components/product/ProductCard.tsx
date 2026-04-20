import { memo, useState } from 'react';

import { addToCart } from '../../features/cart/cartSlice';
import type { Product } from '../../features/products/productTypes';
import { useAppDispatch } from '../../hooks/useAppDispatch';

type ProductCardProps = {
  product: Product;
};

const formatPrice = (price: number) => new Intl.NumberFormat('ko-KR').format(price);
const PRODUCT_SIZES = ['S', 'M', 'L', 'XL'] as const;

function ProductCardComponent({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isSizePickerOpen, setIsSizePickerOpen] = useState(false);

  const handleAddToCart = (size: string) => {
    dispatch(
      addToCart({
        id: `${product.id}-${size}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
      }),
    );
    setIsSizePickerOpen(false);
  };

  return (
    <article className="group flex w-full max-w-[416px] cursor-pointer flex-col items-start gap-[8px]">
      <div className="relative w-full overflow-hidden bg-[#f5f5f5]">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[416/520] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => setIsSizePickerOpen(true)}
          className="absolute bottom-[18px] left-[8px] inline-flex h-[21px] items-center justify-center gap-[10px] bg-white px-[10px] py-[10px] font-['Pretendard'] text-[14px] font-normal leading-none text-[#111111] transition-colors hover:bg-[#111111] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          aria-label={`${product.name} 사이즈 선택 열기`}
        >
          담기
        </button>

        {isSizePickerOpen ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.60)]">
            <div className="flex items-center justify-center">
              {PRODUCT_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleAddToCart(size)}
                  className="flex h-[40px] w-[40px] items-center justify-center gap-[10px] border border-white bg-transparent p-[10px] font-['Alexandria'] text-[22px] font-medium leading-none text-white transition-colors hover:bg-white hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={`${product.name} ${size} 사이즈 담기`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative mt-2 flex w-full flex-col gap-[4px] font-['Pretendard']">
        <span className="w-full text-left font-['Pretendard'] text-[16px] font-bold uppercase text-[#ff1d1d]">
          {product.brand}
        </span>
        <h4 className="mt-1 w-full text-left font-['Pretendard'] text-[16px] font-medium tracking-tight text-[#666666]">
          {product.name}
        </h4>
        <span className="absolute right-0 bottom-[-28px] font-['Pretendard'] text-[20px] font-extrabold text-black">
          {formatPrice(product.price)}원
        </span>
      </div>
    </article>
  );
}

const ProductCard = memo(ProductCardComponent);

export default ProductCard;
