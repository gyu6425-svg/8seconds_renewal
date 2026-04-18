import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { signup } from '../../shared/api/auth';
import { login as loginSuccess, setAuthError, setAuthLoading } from '../../features/auth/authSlice';
import { normalizeAuthResponse } from '../../features/auth/authUtils';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function Signup() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            dispatch(setAuthError('비밀번호가 일치하지 않습니다.'));
            return;
        }

        dispatch(setAuthLoading(true));
        dispatch(setAuthError(null));

        try {
            const response = await signup({
                name,
                email,
                password,
            });
            const authPayload = normalizeAuthResponse(response);

            if (!authPayload) {
                throw new Error('회원가입 응답이 올바르지 않습니다.');
            }

            dispatch(loginSuccess(authPayload));
            navigate('/', { replace: true });
        } catch (submitError) {
            let message = '회원가입에 실패했습니다. 다시 시도해주세요.';

            if (axios.isAxiosError(submitError)) {
                const status = submitError.response?.status;

                if (status === 404) {
                    message = '회원가입 요청 경로를 찾을 수 없습니다. API 주소를 확인해주세요.';
                } else if (status === 401 || status === 403) {
                    message = '회원가입 요청이 거부되었습니다.';
                } else if (status === 500) {
                    message = '서버 오류로 회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.';
                }
            } else if (submitError instanceof Error) {
                message = submitError.message;
            }

            dispatch(setAuthError(message));
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    return (
        <section className="flex min-h-[calc(100vh-360px)] items-start justify-center px-6 pb-24 pt-8 text-[#111111]">
            <div className="w-full max-w-[670px]">
                <header className="pb-16 text-center md:pb-20">
                    <h1 className="text-[48px] font-semibold tracking-[-0.04em] md:text-[40px]">
                        회원가입
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="mx-auto flex max-w-[558px] flex-col">
                    <label htmlFor="signup-name" className="sr-only">
                        이름
                    </label>
                    <Input
                        id="signup-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="이름"
                        required
                        className="h-[70px] w-full rounded-none border border-[#999999] px-4 text-[18px] text-[#555555] outline-none transition-colors placeholder:text-[#888888] focus-visible:border-[#111111] focus-visible:ring-0"
                    />

                    <label htmlFor="signup-email" className="sr-only">
                        이메일
                    </label>
                    <Input
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="이메일"
                        required
                        className="mt-3 h-[70px] w-full rounded-none border border-[#999999] px-4 text-[18px] text-[#555555] outline-none transition-colors placeholder:text-[#888888] focus-visible:border-[#111111] focus-visible:ring-0"
                    />

                    <label htmlFor="signup-password" className="sr-only">
                        비밀번호
                    </label>
                    <Input
                        id="signup-password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="비밀번호"
                        required
                        className="mt-3 h-[70px] w-full rounded-none border border-[#999999] px-4 text-[18px] text-[#555555] outline-none transition-colors placeholder:text-[#888888] focus-visible:border-[#111111] focus-visible:ring-0"
                    />

                    <label htmlFor="signup-confirm-password" className="sr-only">
                        비밀번호 확인
                    </label>
                    <Input
                        id="signup-confirm-password"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="비밀번호 확인"
                        required
                        className="mt-3 h-[70px] w-full rounded-none border border-[#999999] px-4 text-[18px] text-[#555555] outline-none transition-colors placeholder:text-[#888888] focus-visible:border-[#111111] focus-visible:ring-0"
                    />

                    <p
                        className={`min-h-[24px] pt-3 text-center text-[14px] ${
                            error ? 'text-[#d92d20]' : 'text-transparent'
                        }`}
                        aria-live="polite"
                    >
                        {error ?? 'error'}
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-[52px] w-full rounded-none bg-[#df3228] text-[18px] font-normal text-white transition-opacity hover:bg-[#df3228] hover:opacity-90"
                        >
                            {loading ? '가입 중...' : '회원가입'}
                        </Button>
                        <Link
                            to="/login"
                            className="flex h-[52px] w-full items-center justify-center bg-[#F6F6F6] text-[18px] font-normal text-[#6f6f6f] transition-colors hover:bg-[#ebebeb]"
                        >
                            로그인
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
