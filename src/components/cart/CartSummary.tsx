import { Button } from '../ui/button';
import { formatPrice } from '../../utils/formatPrice';

type CartSummaryProps = {
    totalQuantity: number;
    totalPrice: number;
};

const SHIPPING_FEE = 0;

export default function CartSummary({ totalPrice }: CartSummaryProps) {
    const payablePrice = totalPrice + SHIPPING_FEE;

    return (
        <aside className="translate-y-[88px] h-[663px] w-full border border-[#8f8f8f] px-[20px] pb-[39px] pt-[62px] md:sticky md:top-[120px]">
            <h2 className="font-['Pretendard'] text-[24px] font-bold leading-none tracking-[-0.04em] text-[#111111]">
                결제정보
            </h2>
            <div className="translate-y-[12px] h-[2px] w-full bg-[#333333]" />

            <dl className="translate-y-[28px] flex flex-col gap-[19px] font-['Pretendard']">
                <div className=" flex gap-[200px] items-center justify-between">
                    <dt className="text-[18px] font-bold leading-none text-[#8a8a8a]">상품금액</dt>
                    <dd className="text-[20px] font-bold leading-none text-[#333333]">
                        {formatPrice(totalPrice)}원
                    </dd>
                </div>
                <div className="flex items-center gap-[270px] justify-between">
                    <dt className="text-[18px] font-bold leading-none text-[#8a8a8a]">배송비</dt>
                    <dd className="text-[20px] font-bold leading-none text-[#333333]">
                        {formatPrice(SHIPPING_FEE)}원
                    </dd>
                </div>
                <div className="gap-[254px] flex items-center justify-between">
                    <dt className="text-[18px] font-bold leading-none text-[#8a8a8a]">할인금액</dt>
                    <dd className="text-[20px] font-bold leading-none text-[#333333]">0원</dd>
                </div>
            </dl>

            <div className="translate-y-[48px] border border-[#eeeeee] px-[19px] py-[20px] font-['Pretendard']">
                <div className=" gap-[60px] flex items-center justify-between">
                    <span className="text-[16px] font-bold leading-none text-[#9b9b9b]">
                        상품할인
                    </span>
                    <span className="text-[16px] font-bold leading-none text-[#9b9b9b]">0원</span>
                </div>
                <div className="translate-y-[8px] gap-[60px] flex items-center justify-between">
                    <span className="text-[16px] font-bold leading-none text-[#9b9b9b]">
                        즉시할인
                    </span>
                    <span className="text-[16px] font-bold leading-none text-[#9b9b9b]">0원</span>
                </div>
            </div>

            <div className="translate-y-[70px] h-px w-full bg-[#777777]" />

            <div className="translate-y-[90px] flex items-center justify-between font-['Pretendard']">
                <span className="text-[18px] font-extrabold leading-none text-[#555555]">
                    총 구매 금액
                </span>
                <strong className="text-[32px] font-extrabold leading-none tracking-[-0.04em] text-[#111111]">
                    {formatPrice(payablePrice)}원
                </strong>
            </div>

            <Button
                type="button"
                className="translate-y-[120px] h-[71px] w-full rounded-none bg-[#ed1c24] font-['Pretendard'] text-[16px] font-medium text-white transition-opacity hover:bg-[#ed1c24] hover:opacity-90"
            >
                바로 결제하기
            </Button>
        </aside>
    );
}
