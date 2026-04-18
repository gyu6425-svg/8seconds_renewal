import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { logout } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const mainCategories = [
    { label: 'WOMEN', to: '/women' },
    { label: 'MEN', to: '/men' },
    { label: 'BAGS & SHOES', to: '/women?category=bag-shoes' },
    { label: 'OUTLET', to: '/women?category=outlet' },
    { label: 'COLLECTIONS', to: '/women?category=collections' },
] as const;

const secondaryCategories = [
    { label: 'CART', to: '/cart' },
    { label: 'MYPAGE', to: '/mypage' },
] as const;

function SearchIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
            className="h-10 w-10"
        >
            <path
                d="M17.9493 30.4993C15.4703 30.4993 13.047 29.7641 10.9858 28.3868C8.92459 27.0095 7.31809 25.0519 6.36957 22.7616C5.42105 20.4714 5.17283 17.9513 5.65659 15.52C6.14034 13.0887 7.33383 10.8554 9.08652 9.1027C10.8392 7.35001 13.0726 6.15653 15.5039 5.67277C17.9352 5.18902 20.4552 5.43724 22.7455 6.38576C25.0358 7.33427 26.9934 8.94078 28.3707 11.002C29.748 13.0632 30.4831 15.4865 30.4831 17.9655C30.4831 21.2897 29.1626 24.4778 26.8121 26.8283C24.4617 29.1788 21.2735 30.4993 17.9493 30.4993ZM17.9493 7.24934C15.8291 7.24934 13.7566 7.87803 11.9938 9.0559C10.2311 10.2338 8.85715 11.9079 8.04573 13.8665C7.23431 15.8251 7.02193 17.9803 7.43549 20.0596C7.84905 22.139 8.86996 24.049 10.369 25.548C11.8681 27.0471 13.7781 28.068 15.8575 28.4816C17.9368 28.8951 20.092 28.6827 22.0506 27.8713C24.0092 27.0599 25.6833 25.686 26.8612 23.9232C28.039 22.1605 28.6677 20.0879 28.6677 17.9677C28.6677 15.1245 27.5383 12.3978 25.5279 10.3874C23.5175 8.37705 20.7908 7.24759 17.9476 7.24759L17.9493 7.24934Z"
                fill="black"
            />
            <path
                d="M33.6518 34.9009C33.4745 34.9018 33.2985 34.8672 33.1347 34.7993C32.9709 34.7313 32.8224 34.6313 32.6978 34.5051L25.2649 27.0722C25.0264 26.8164 24.8967 26.4782 24.9028 26.1285C24.909 25.7788 25.0506 25.4453 25.298 25.198C25.5453 24.9506 25.8788 24.809 26.2285 24.8028C26.5782 24.7967 26.9164 24.9264 27.1722 25.1649L34.6051 32.5978C34.8578 32.8509 34.9998 33.1939 34.9998 33.5515C34.9998 33.9091 34.8578 34.2521 34.6051 34.5051C34.4805 34.6313 34.332 34.7313 34.1682 34.7993C34.0044 34.8672 33.8284 34.9018 33.6518 34.9009Z"
                fill="black"
            />
        </svg>
    );
}

export default function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, userId } = useAppSelector((state) => state.auth);
    const [keyword, setKeyword] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollYRef = useRef(0);

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedKeyword = keyword.trim();
        if (!trimmedKeyword) {
            return;
        }

        navigate(`/women?search=${encodeURIComponent(trimmedKeyword)}`);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const topThreshold = 80;
        const directionThreshold = 12;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollYRef.current;

            if (currentScrollY <= topThreshold) {
                setIsVisible(true);
                lastScrollYRef.current = currentScrollY;
                return;
            }

            if (Math.abs(delta) < directionThreshold) {
                return;
            }

            if (delta > 0) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollYRef.current = currentScrollY;
        };

        lastScrollYRef.current = window.scrollY;
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full bg-[rgba(255,255,255,0.3)] transition-transform duration-300 ease-out ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="mx-auto w-[1700px] py-[24px]">
                <div className="header-inner flex gap-[920px] w-full items-start justify-between">
                    <div className="header-left flex w-[650px] items-center gap-[109px] ">
                        <Link to="/" className="shrink-0 transition-opacity hover:opacity-75">
                            <img
                                src="/images/common/main_logo.png"
                                alt="8seconds"
                                className="h-[80px] w-[137px] object-contain"
                            />
                        </Link>

                        <nav className="main-category-nav flex items-center gap-[22px] lg:gap-10 xl:gap-12">
                            {mainCategories.map((category) => (
                                <NavLink
                                    key={category.label}
                                    to={category.to}
                                    className={({ isActive }) =>
                                        [
                                            "whitespace-nowrap font-['Alexandria','Helvetica_Neue',Arial,sans-serif] text-[18px] font-medium leading-none text-[#111111] transition-opacity hover:opacity-65",
                                            isActive ? 'opacity-100' : 'opacity-90',
                                        ].join(' ')
                                    }
                                >
                                    {category.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    <div className="header-right flex h-[220px] w-[180px] flex-col items-end justify-between">
                        <form onSubmit={handleSearchSubmit} className="w-full">
                            <label htmlFor="header-search" className="sr-only">
                                Search
                            </label>
                            <div className="flex w-full items-end justify-end gap-2 border-b border-black pb-2">
                                <input
                                    id="header-search"
                                    name="search"
                                    type="search"
                                    value={keyword}
                                    onChange={(event) => setKeyword(event.target.value)}
                                    placeholder=""
                                    className="w-full bg-transparent text-right text-[18px] font-medium text-black outline-none placeholder:text-black/45"
                                />
                                <button
                                    type="submit"
                                    aria-label="Search products"
                                    className="shrink-0 transition-opacity hover:opacity-65"
                                >
                                    <SearchIcon />
                                </button>
                            </div>
                        </form>

                        <nav className="secondary-category-nav flex w-full translate-y-[-30px] flex-col items-end gap-4 text-right">
                            {isLoggedIn ? (
                                <p className="w-full truncate font-['Alexandria','Helvetica_Neue',Arial,sans-serif] text-[12px] font-medium uppercase tracking-[0.12em] text-[#666666]">
                                    {userId}
                                </p>
                            ) : null}

                            {isLoggedIn ? (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full font-['Alexandria','Helvetica_Neue',Arial,sans-serif] text-[18px] font-medium leading-none text-[#111111] transition-opacity hover:opacity-65 text-right"
                                >
                                    LOGOUT
                                </button>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="w-full font-['Alexandria','Helvetica_Neue',Arial,sans-serif] text-[18px] font-medium leading-none text-[#111111] transition-opacity hover:opacity-65"
                                >
                                    LOGIN
                                </NavLink>
                            )}

                            {secondaryCategories.map((category) =>
                                category.label === 'MYPAGE' ? (
                                    isLoggedIn ? (
                                        <NavLink
                                            key={category.label}
                                            to={category.to}
                                            className="w-full font-['Alexandria','Helvetica_Neue',Arial,sans-serif] text-[18px] font-medium leading-none text-[#111111] transition-opacity hover:opacity-65"
                                        >
                                            {category.label}
                                        </NavLink>
                                    ) : null
                                ) : (
                                    <NavLink
                                        key={category.label}
                                        to={category.to}
                                        className="w-full font-['Alexandria','Helvetica_Neue',Arial,sans-serif] text-[18px] font-medium leading-none text-[#111111] transition-opacity hover:opacity-65"
                                    >
                                        {category.label}
                                    </NavLink>
                                )
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
