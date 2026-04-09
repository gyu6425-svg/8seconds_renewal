import { useNavigate } from 'react-router-dom';

import { logout } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const myPageMenus = [
  {
    title: '주문내역',
    description: '최근 주문과 배송 상태를 확인할 수 있습니다.',
    to: '/mypage/orders',
  },
  {
    title: '장바구니',
    description: '담아둔 상품을 확인하고 바로 구매로 이어갈 수 있습니다.',
    to: '/cart',
  },
  {
    title: '회원정보',
    description: '기본 회원 정보와 계정 설정을 관리할 수 있습니다.',
    to: '/mypage/profile',
  },
] as const;

export default function MyPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <section className="w-full px-4 py-12 md:px-0 md:py-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
        <header className="border-b border-[#111111] pb-6">
          <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-[#8c8c8c]">
            Account
          </p>
          <h1 className="mt-3 font-['Alexandria'] text-[48px] font-extrabold leading-none tracking-[-0.04em] text-[#111111]">
            MYPAGE
          </h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <section className="rounded-[28px] border border-[#e7e7e7] bg-white p-8">
            <p className="text-[14px] font-medium text-[#8c8c8c]">회원 상태</p>
            <div className="mt-4 flex items-end justify-between gap-6 border-b border-[#f0f0f0] pb-6">
              <div>
                <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#111111]">
                  {isLoggedIn ? '로그인됨' : '비로그인'}
                </p>
                <p className="mt-2 text-[16px] text-[#666666]">
                  현재 계정 ID: <span className="font-semibold text-[#111111]">{userId ?? '-'}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-[48px] min-w-[120px] items-center justify-center rounded-full border border-[#111111] px-6 text-[15px] font-semibold text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
              >
                로그아웃
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f7f7f7] p-5">
                <p className="text-[13px] font-medium text-[#8c8c8c]">회원 ID</p>
                <p className="mt-2 text-[20px] font-semibold text-[#111111]">{userId ?? 'guest'}</p>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-5">
                <p className="text-[13px] font-medium text-[#8c8c8c]">계정 상태</p>
                <p className="mt-2 text-[20px] font-semibold text-[#111111]">
                  {isLoggedIn ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e7e7e7] bg-[#fafafa] p-8">
            <p className="text-[14px] font-medium text-[#8c8c8c]">Quick Menu</p>
            <div className="mt-5 space-y-4">
              {myPageMenus.map((menu) => (
                <button
                  key={menu.title}
                  type="button"
                  onClick={() => navigate(menu.to)}
                  className="flex w-full items-start justify-between rounded-2xl border border-transparent bg-white px-5 py-5 text-left transition-colors hover:border-[#111111]"
                >
                  <div>
                    <p className="text-[20px] font-semibold tracking-[-0.02em] text-[#111111]">
                      {menu.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-6 text-[#777777]">{menu.description}</p>
                  </div>
                  <span className="text-[20px] font-semibold text-[#111111]">+</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
