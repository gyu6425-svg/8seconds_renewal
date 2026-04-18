'use client';

import { useState } from 'react';
function CopyableText({ text, display }: { text: string; display: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            className="relative cursor-pointer hover:underline transition-all"
            title="클릭하여 복사"
        >
            {display}
            {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    복사됨
                </span>
            )}
        </button>
    );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
    );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
        </svg>
    );
}

function XIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="w-full border-t border-black/10 bg-white">
            <div className="mx-auto w-full px-4 py-10 md:px-8 xl:px-0">
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                    {/* 좌측 정보 */}
                    <div className="flex flex-col items-start gap-2 text-left text-[13px] text-black/55 ">
                        <p className="text-[15px] font-bold text-black ">삼성물산(주) 패션부문</p>
                        <p className="text-left">
                            주소: 서울특별시 강남구 남부순환로 2806 (도곡동)
                        </p>
                        <p>사업자 등록번호: 101-85-43600 [사업자정보확인]</p>
                        <p>통신판매업 신고번호: 제 2015-서울강남-02894</p>
                        <div className="flex items-center gap-6">
                            <p className="font-bold text-black">
                                대표전화:{' '}
                                <CopyableText text="1599-0007" display="1599-0007 (전국)" />
                            </p>
                            <p>
                                이메일:{' '}
                                <CopyableText
                                    text="ssfshop@samsung.com"
                                    display="ssfshop@samsung.com"
                                />
                            </p>
                        </div>
                        <p className="mt-2">
                            Copyright (C) 2025 Samsung C&T Corporation. All rights reserved.
                        </p>
                    </div>

                    {/* 우측 브랜드 + SNS */}
                    <div className="flex flex-col items-end justify-between gap-6 self-stretch">
                        {/* 브랜드 로고 텍스트 */}
                        <div className="flex items-center gap-8 text-black/70 translate-y-[50px]">
                            <span className="text-[15px] font-semibold tracking-widest">
                                10·CORSO·COMO
                            </span>
                            <span className="text-[15px] font-semibold tracking-widest">
                                BEAKER
                            </span>
                            <span className="text-[15px] font-semibold tracking-widest">
                                ANOTHER<sup>#</sup>
                            </span>
                        </div>

                        {/* SNS 아이콘 */}
                        <div className="flex items-center gap-4 text-black/50 translate-x-[120px]">
                            <a
                                href="https://www.instagram.com/8seconds_official"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black transition-colors"
                                aria-label="8seconds Instagram"
                            >
                                <InstagramIcon size={18} />
                            </a>
                            <a
                                href="https://twitter.com/8seconds_kr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black transition-colors"
                                aria-label="8seconds Twitter/X"
                            >
                                <XIcon size={18} />
                            </a>
                            <a
                                href="https://www.youtube.com/@8seconds"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black transition-colors"
                                aria-label="8seconds YouTube"
                            >
                                <YoutubeIcon size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
