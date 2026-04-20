import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/bag-shoes': 'BAGS & SHOES',
  '/life': 'LIFE',
  '/outlet': 'OUTLET',
  '/new': 'NEW',
  '/special': 'SPECIAL',
  '/mypage/orders': '주문내역',
  '/mypage/profile': '회원정보',
};

export default function RoutePlaceholder() {
  const location = useLocation();
  const title = location.pathname.startsWith('/products/')
    ? '상품 상세'
    : routeTitles[location.pathname] ?? '페이지';

  return (
    <section className="w-full px-4 pb-24 md:px-0">
      <header className="border-b border-[#111111] pb-8">
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-[#8c8c8c]">
          Route Ready
        </p>
        <h1 className="mt-3 font-['Alexandria'] text-[48px] font-extrabold leading-none tracking-[-0.04em] text-[#111111]">
          {title}
        </h1>
      </header>
    </section>
  );
}
