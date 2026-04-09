import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { login } from '../../shared/api/auth';
import { login as loginSuccess, setAuthError, setAuthLoading } from '../../features/auth/authSlice';
import { normalizeAuthResponse } from '../../features/auth/authUtils';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function Login() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<'member' | 'guest'>('member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    try {
      const response = await login({
        email,
        password,
      });
      const authPayload = normalizeAuthResponse(response);

      if (!authPayload) {
        throw new Error('로그인 응답이 올바르지 않습니다.');
      }

      dispatch(loginSuccess(authPayload));
      navigate(from, { replace: true });
    } catch (submitError) {
      dispatch(
        setAuthError(
          submitError instanceof Error ? submitError.message : '로그인에 실패했습니다.',
        ),
      );
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const handleGuestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGuestMessage('비회원 주문조회 API 연결 전 단계입니다.');
  };

  return (
    <section className="flex min-h-[calc(100vh-360px)] items-start justify-center px-6 pb-24 pt-8 text-[#111111]">
      <div className="w-full max-w-[670px]">
        <header className="pb-16 text-center md:pb-20">
          <h1 className="text-[48px] font-semibold tracking-[-0.04em] md:text-[40px]">로그인</h1>
        </header>

        <div className="mb-12 grid grid-cols-2 border-b border-[#333333] text-center text-[24px] font-regular">
          <button
            type="button"
            onClick={() => setActiveTab('member')}
            className={`px-4 pb-4 transition-colors ${
              activeTab === 'member'
                ? 'w-[335px] border-b border-[#000000] text-[#000000]'
                : 'text-[#666666]'
            }`}
            aria-current={activeTab === 'member' ? 'page' : undefined}
          >
            회원
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guest')}
            className={`px-4 pb-4 transition-colors${
              activeTab === 'guest'
                ? 'w-[335px] border-b border-[#000000] text-[#000000]'
                : 'text-[#666666]'
            }`}
            aria-current={activeTab === 'guest' ? 'page' : undefined}
          >
            비회원
          </button>
        </div>

        {activeTab === 'member' ? (
          <form onSubmit={handleSubmit} className="flex max-w-[558px] flex-col translate-y-[49px]">
            <label htmlFor="login-email" className="sr-only">
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="아이디"
              required
              className="h-[70px] w-[558px] border border-[#999999] px-4 text-[18px] text-[#555555] outline-none transition-colors placeholder:text-[#888888] focus:border-[#111111]"
            />

            <label htmlFor="login-password" className="sr-only">
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
              required
              className="mt-3 h-[70px] w-[558px] translate-y-[12px] border border-[#999999] px-4 text-[18px] text-[#555555] outline-none transition-colors placeholder:text-[#888888] focus:border-[#111111]"
            />

            <p
              className={`min-h-[24px] pt-3 text-center text-[14px] ${
                error ? 'text-[#d92d20]' : 'text-transparent'
              }`}
              aria-live="polite"
            >
              {error ?? 'error'}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-3 translate-y-[44px]">
              <button
                type="submit"
                disabled={loading}
                className="flex h-[52px] w-[273px] items-center justify-center bg-[#df3228] text-[18px] font-regular text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>
              <Link
                to="/signup"
                className="flex h-[52px] w-[273px] items-center justify-center bg-[#F6F6F6] text-[18px] font-regular text-[#6f6f6f] transition-colors hover:bg-[#ebebeb]"
              >
                회원가입
              </Link>
            </div>

            <div className="mt-6 flex translate-x-[5px] translate-y-[60px] items-center justify-center gap-4 text-[14px] font-medium text-[#8b8b8b]">
              <button type="button" className="transition-colors hover:text-[#111111]">
                아이디 찾기
              </button>
              <span className="text-[#d2d2d2]">|</span>
              <button type="button" className="transition-colors hover:text-[#111111]">
                비밀번호 찾기
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleGuestSubmit} className="flex flex-col translate-y-[49px]">
            <label htmlFor="guest-order-number" className="sr-only">
              주문번호
            </label>
            <input
              id="guest-order-number"
              type="text"
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="주문번호 입력"
              required
              className="h-[70px] w-[558px] border border-[#999999] px-5 text-left text-[18px] text-[#111111] outline-none transition-colors placeholder:text-[#999999] focus:border-[#111111]"
            />

            <p
              className={`min-h-[24px] pt-4 text-center text-[14px] ${
                guestMessage ? 'text-[#8b8b8b]' : 'text-transparent'
              }`}
              aria-live="polite"
            >
              {guestMessage ?? 'guest-message'}
            </p>

            <button
              type="submit"
              className="mt-3 flex h-[56px] w-[558px] items-center justify-center bg-[#df3228] text-[18px] font-regular text-white transition-opacity hover:opacity-90"
            >
              조회하기
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
