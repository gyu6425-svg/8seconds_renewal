import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../features/cart/cartSlice';
import type { CartItem as CartItemType } from '../../features/cart/cartTypes';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { formatPrice } from '../../utils/formatPrice';
import QuantityButton from './QuantityButton';

type CartItemProps = {
    item: CartItemType;
    checked: boolean;
    onCheckedChange: (id: string, checked: boolean) => void;
};

export default function CartItem({ item, checked, onCheckedChange }: CartItemProps) {
    const dispatch = useAppDispatch();

    return (
        <article className="relative border-b border-[#111111] py-[42px]">
            <div className="grid gap-8 lg:grid-cols-[72px_320px_minmax(420px,1fr)_170px] lg:gap-x-[58px]">
                <div className="pt-0">
                    <label className="relative block h-[28px] w-[28px] cursor-pointer">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={checked}
                            onChange={(event) => onCheckedChange(item.id, event.target.checked)}
                        />
                        <span className="flex h-[28px] w-[28px] items-center justify-center border border-[#bdbdbd] bg-white text-white peer-checked:border-[#ed1c24] peer-checked:bg-[#ed1c24]">
                            {checked ? (
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-[21px] w-[21px]"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M5 12.5L9.5 17L19 7"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="square"
                                        strokeLinejoin="miter"
                                    />
                                </svg>
                            ) : null}
                        </span>
                    </label>
                </div>

                <div className="h-[398px] w-full max-w-[320px] overflow-hidden bg-[#adadad]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>

                <div className="min-w-0 pt-4 pr-30">
                    <div>
                        <p className="text-[22px] font-extrabold leading-none text-[#ed1c24] translate-x-[-50px]">
                            8seconds
                        </p>
                        <h2 className="translate-y-[4px] text-[22px] font-semibold leading-none tracking-[-0.03em] text-[#111111] translate-x-[-50px]">
                            {item.name}
                        </h2>
                    </div>

                    <div className=" translate-y-[20px] translate-x-[-60px] flex flex-col gap-2 text-[18px] font-medium leading-none text-[#777777] ">
                        <p className="translate-x-[-38px]">color : ivory</p>
                        <p className="translate-x-[-55px]">size : {item.size}</p>
                    </div>

                    <div className="translate-y-[40px]  inline-flex h-[38px] items-center border border-[#777777]">
                        <QuantityButton
                            label="-"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            disabled={item.quantity <= 1}
                        />
                        <span className="flex h-full w-[38px] items-center justify-center border-x border-[#777777] text-[18px] font-medium text-[#111111]">
                            {item.quantity}
                        </span>
                        <QuantityButton
                            label="+"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-end justify-between pt-2">
                    <button
                        type="button"
                        className="flex h-[49px] w-[153px] items-center justify-center border border-[#8f8f8f] bg-white text-[18px] font-medium text-[#333333] transition-colors hover:border-[#111111] hover:text-[#111111]"
                    >
                        옵션 변경
                    </button>

                    <div className="flex flex-col items-end gap-5">
                        <p className="text-[34px] font-extrabold leading-none tracking-[-0.03em] text-[#111111]">
                            {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                            type="button"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-[14px] text-[#999999] underline hover:text-[#111111]"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
