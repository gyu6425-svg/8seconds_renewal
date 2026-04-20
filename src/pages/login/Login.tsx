import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    const [guestMessageType, setGuestMessageType] = useState<'success' | 'error' | null>(null);
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
                    submitError instanceof Error ? submitError.message : '로그인에 실패했습니다.'
                )
            );
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    const handleGuestSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedOrderNumber = orderNumber.trim();
        if (trimmedOrderNumber.length < 6) {
            setGuestMessageType('error');
            setGuestMessage('주문번호를 6자리 이상 입력해주세요.');
            return;
        }

        setGuestMessageType('success');
        setGuestMessage(`${trimmedOrderNumber} 주문 내역을 확인했습니다.`);
    };

    return (
        <section className="flex min-h-[calc(100vh-260px)] items-start justify-center px-6 pb-28 pt-0 text-[#111111]">
            <div className="w-full max-w-[760px]">
                <header className="pb-[108px] text-center">
                    <h1 className="text-[40px] font-normal tracking-[-0.04em]">로그인</h1>
                </header>

                <div className="mb-[44px] w-[844px] grid grid-cols-2 border-b border-[#bdbdbd] text-center text-[20px] font-normal">
                    <button
                        type="button"
                        onClick={() => setActiveTab('member')}
                        className={`w-full  px-4 pb-[14px] transition-colors ${
                            activeTab === 'member'
                                ? 'border-b border-[#111111] text-[#111111]'
                                : 'text-[#666666]'
                        }`}
                        aria-current={activeTab === 'member' ? 'page' : undefined}
                    >
                        회원
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('guest')}
                        className={`w-full px-4 pb-[14px] transition-colors ${
                            activeTab === 'guest'
                                ? 'border-b border-[#111111] text-[#111111]'
                                : 'text-[#666666]'
                        }`}
                        aria-current={activeTab === 'guest' ? 'page' : undefined}
                    >
                        비회원
                    </button>
                </div>

                {activeTab === 'member' ? (
                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto flex w-full max-w-[503px] flex-col"
                    >
                        <label htmlFor="login-email" className="sr-only">
                            이메일
                        </label>
                        <Input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="아이디"
                            required
                            className="h-[70px] w-[558px] rounded-none border border-[#bdbdbd] px-4 text-[18px] text-[#555555] outline-none transition-colors placeholder:text-[#888888] focus-visible:border-[#111111] focus-visible:ring-0"
                        />

                        <label htmlFor="login-password" className="sr-only">
                            비밀번호
                        </label>
                        <Input
                            id="login-password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="비밀번호"
                            required
                            className="mt-3 h-[70px] w-[558px] rounded-none border border-[#bdbdbd] px-4 text-[18px] text-[#555555] outline-none transition-colors placeholder:text-[#888888] focus-visible:border-[#111111] focus-visible:ring-0"
                        />

                        <p
                            className={`min-h-[24px] pt-3 text-center text-[14px] ${
                                error ? 'text-[#d92d20]' : 'text-transparent'
                            }`}
                            aria-live="polite"
                        >
                            {error ?? 'error'}
                        </p>

                        <div className="mt-[24px] grid w-full grid-cols-2 gap-[70px]">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-[60px] w-[273px] rounded-none bg-[#ed1c24] text-[17px] font-normal text-white transition-opacity hover:bg-[#ed1c24] hover:opacity-90"
                            >
                                {loading ? '로그인 중...' : '로그인'}
                            </Button>
                            <Link
                                to="/signup"
                                className="flex h-[60px] w-[273px] items-center justify-center bg-[#f7f7f7] text-[17px] font-normal text-[#5f5f5f] transition-colors hover:bg-[#ebebeb]"
                            >
                                회원가입
                            </Link>
                        </div>

                        <div className="mt-[26px] translate-[20px] flex items-center justify-center gap-4 text-[13px] font-normal text-[#666666]">
                            <button
                                type="button"
                                className="transition-colors hover:text-[#111111]"
                            >
                                아이디 찾기
                            </button>
                            <span className="text-[#d2d2d2]">|</span>
                            <button
                                type="button"
                                className="transition-colors hover:text-[#111111]"
                            >
                                비밀번호 찾기
                            </button>
                        </div>
                    </form>
                ) : (
                    <form
                        onSubmit={handleGuestSubmit}
                        className="mx-auto flex w-[558px] max-w-[503px] flex-col"
                    >
                        <label htmlFor="guest-order-number" className="sr-only">
                            주문번호
                        </label>
                        <Input
                            id="guest-order-number"
                            type="text"
                            value={orderNumber}
                            onChange={(event) => setOrderNumber(event.target.value)}
                            placeholder="주문번호 입력"
                            required
                            className="h-[64px] w-full rounded-none border border-[#bdbdbd] px-5 text-left text-[18px] text-[#111111] outline-none transition-colors placeholder:text-[#999999] focus-visible:border-[#111111] focus-visible:ring-0"
                        />

                        <p
                            className={`min-h-[24px] pt-4 text-center text-[14px] ${
                                guestMessageType === 'error'
                                    ? 'text-[#d92d20]'
                                    : guestMessageType === 'success'
                                      ? 'text-[#111111]'
                                      : 'text-transparent'
                            }`}
                            aria-live="polite"
                        >
                            {guestMessage ?? 'guest-message'}
                        </p>

                        <Button
                            type="submit"
                            className="mt-[24px] h-[55px] w-full rounded-none bg-[#ed1c24] text-[17px] font-normal text-white transition-opacity hover:bg-[#ed1c24] hover:opacity-90"
                        >
                            조회하기
                        </Button>
                    </form>
                )}
            </div>
        </section>
    );
}
