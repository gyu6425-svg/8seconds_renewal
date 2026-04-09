import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroSplit from '../../components/landing/HeroSplit';
import SideMenuOverlay from '../../components/landing/SideMenuOverlay';
import { useAppSelector } from '../../hooks/useAppSelector';

const menImage = '/images/landing/landingpage_men.png';
const womenImage = '/images/landing/landingpage_women.png';
const blackLogoImage = '/images/landing/logo_bk.png';

export default function Landing() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    const handleAccountClick = () => {
        if (isLoggedIn) {
            navigate('/mypage');
            return;
        }

        navigate('/login');
    };

    return (
        <div className="relative flex min-h-[1180px] items-center justify-center bg-[#ffffff]">
            <div className="pointer-events-none absolute inset-x-0 top-2 z-30 flex justify-center">
                <div className="top-controls w-full max-w-[100%] px-4 pt-4 md:px-8 md:pt-6 xl:px-0 xl:pt-5">
                    <div className="flex gap-[1726px] items-center justify-between">
                        <button
                            type="button"
                            aria-label="Open menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="landing-side-menu-overlay"
                            onClick={() => setIsMenuOpen(true)}
                            className="pointer-events-auto flex h-11 w-11 items-center justify-center text-[#111111] transition hover:opacity-70 "
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-8 w-8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 8H32M2 16H32" stroke="currentColor" strokeWidth="1.7" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={handleAccountClick}
                            aria-label={isLoggedIn ? 'Go to my page' : 'Go to login'}
                            className="pointer-events-auto flex h-10 w-10 items-center justify-center text-black transition hover:opacity-70"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                className="h-10 w-10"
                            >
                                <path
                                    d="M34 36V34.0588C34 31.9995 33.1852 30.0245 31.735 28.5683C30.2847 27.1122 28.3177 26.2941 26.2667 26.2941H12.7333C10.6823 26.2941 8.71532 27.1122 7.26504 28.5683C5.81476 30.0245 5 31.9995 5 34.0588V36M27.2333 10.7647C27.2333 12.824 26.4186 14.799 24.9683 16.2552C23.518 17.7113 21.551 18.5294 19.5 18.5294C17.449 18.5294 15.482 17.7113 14.0317 16.2552C12.5814 14.799 11.7667 12.824 11.7667 10.7647C11.7667 8.70538 12.5814 6.73039 14.0317 5.27423C15.482 3.81806 17.449 3 19.5 3C21.551 3 23.518 3.81806 24.9683 5.27423C26.4186 6.73039 27.2333 8.70538 27.2333 10.7647Z"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="square"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[1700px] items-center justify-center px-4 py-10 md:px-8 md:py-12 xl:px-0 xl:py-0">
                <HeroSplit menImage={menImage} womenImage={womenImage} />
            </div>

            <img
                src={blackLogoImage}
                alt="8seconds black logo"
                className="pointer-events-none absolute bottom-[-90px] right-[-80px] z-0 w-[290px] md:bottom-[-140px] md:right-[-140px] md:w-[560px] xl:bottom-[-200px] xl:right-[0px] xl:w-[720px]"
            />

            <SideMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}
