import { useMemo, useState } from 'react';

import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import EmptyState from '../../components/common/EmptyState';
import { Button } from '../../components/ui/button';
import { removeFromCart } from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const SHIPPING_TABS = ['일반배송', '빠른배송', '예약주문', '매장픽업'];

export default function Cart() {
    const dispatch = useAppDispatch();
    const { items, totalQuantity, totalPrice } = useAppSelector((state) => state.cart);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const validSelectedItemIds = useMemo(() => {
        const itemIds = items.map((item) => item.id);
        return selectedItemIds.filter((id) => itemIds.includes(id));
    }, [items, selectedItemIds]);
    const allSelected = items.length > 0 && validSelectedItemIds.length === items.length;

    const handleToggleAll = (checked: boolean) => {
        setSelectedItemIds(checked ? items.map((item) => item.id) : []);
    };

    const handleToggleItem = (id: string, checked: boolean) => {
        setSelectedItemIds((currentIds) => {
            if (checked) {
                return currentIds.includes(id) ? currentIds : [...currentIds, id];
            }

            return currentIds.filter((currentId) => currentId !== id);
        });
    };

    const handleDeleteSelected = () => {
        validSelectedItemIds.forEach((id) => dispatch(removeFromCart(id)));
        setSelectedItemIds([]);
    };

    return (
        <section className="w-full px-4 pb-24 md:px-0">
            <h1 className="py-10 text-center text-[32px] font-bold text-[#111111]">장바구니</h1>

            <div className="mb-[72px] grid w-full grid-cols-2 gap-2 md:grid-cols-4">
                {SHIPPING_TABS.map((tab, i) => (
                    <Button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(i)}
                        className={`h-[70px] w-[416px] rounded-none border text-[15px] font-semibold transition-colors ${
                            activeTab === i
                                ? 'border-[#111111] bg-[#111111] text-white hover:bg-[#111111]'
                                : 'border-[#bdbdbd] bg-white text-[#111111] hover:border-[#111111] hover:bg-white'
                        }`}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            {items.length === 0 ? (
                <EmptyState
                    title="장바구니에 담긴 상품이 없습니다."
                    description="MEN 또는 WOMEN의 NEW 상품에서 원하는 상품을 담아보세요."
                    actionLabel="상품 보러가기"
                    actionTo="/women"
                />
            ) : (
                <div className="grid gap-12 lg:grid-cols-[1fr_428px]">
                    <div>
                        <div className="grid h-[90px] grid-cols-[72px_1fr] items-center border-b border-[#111111]">
                            <div>
                                <label
                                    className="relative block h-[28px] w-[28px] cursor-pointer"
                                    aria-label="전체 선택"
                                >
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={allSelected}
                                        onChange={(event) => handleToggleAll(event.target.checked)}
                                    />
                                    <span className="flex h-[28px] w-[28px] items-center justify-center border border-[#bdbdbd] bg-white text-white peer-checked:border-[#ed1c24] peer-checked:bg-[#ed1c24]">
                                        {allSelected ? (
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
                            <div className="ml-[-28px] flex items-center gap-[30px] translate-x-[-394px]">
                                <Button
                                    type="button"
                                    onClick={() => handleToggleAll(!allSelected)}
                                    variant="ghost"
                                    className="h-auto rounded-none bg-transparent p-0 font-['Alexandria'] text-[16px] font-medium leading-normal text-[#000000] transition-opacity hover:bg-transparent hover:opacity-65"
                                >
                                    전체 선택
                                </Button>
                                <span className="h-[24px] w-px bg-[#d8d8d8]" />
                                <Button
                                    type="button"
                                    onClick={handleDeleteSelected}
                                    disabled={validSelectedItemIds.length === 0}
                                    variant="ghost"
                                    className="h-auto rounded-none bg-transparent p-0 font-['Alexandria'] text-[16px] font-medium leading-normal text-[#000000] transition-opacity hover:bg-transparent hover:opacity-65 disabled:cursor-not-allowed disabled:opacity-35"
                                >
                                    선택 삭제
                                </Button>
                            </div>
                        </div>

                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                checked={validSelectedItemIds.includes(item.id)}
                                onCheckedChange={handleToggleItem}
                            />
                        ))}

                        <div className="mt-6 flex min-h-[200px] items-center justify-center border-2 border-dashed border-[#d8d8d8]">
                            <p className="text-[18px] font-medium text-[#df3228]">
                                쿠폰,적립금 등 바로 사용 가능하게 여기에
                            </p>
                        </div>

                        <div className="mt-10">
                            <h3 className="mb-3 text-[14px] font-semibold text-[#111111]">
                                이용안내
                            </h3>
                            <ul className="flex flex-col gap-1.5 text-[13px] leading-relaxed text-[#666666]">
                                <li>
                                    • 장바구니 상품은 최대 100개까지 담을 수 있고 30일간 저장됩니다.
                                </li>
                                <li>
                                    • 자사/입점사 제품별, 주문 유형별 배송비 기준에 따라 배송비가
                                    별도로 부과됩니다.
                                </li>
                                <li>
                                    • 배송지가 일치하는 주문의 경우 출고일을 기준으로
                                    합배송됩니다.(일부 브랜드 예외)
                                </li>
                                <li>
                                    • 합배송 된 상품 수령 후 모든 주문 배송완료 시 결제한 배송비를
                                    재계산하여 익일에 마일리지로 돌려드립니다.(무료배송 쿠폰 사용
                                    시에는 대상에서 제외)
                                </li>
                            </ul>
                        </div>
                    </div>

                    <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
                </div>
            )}
        </section>
    );
}
