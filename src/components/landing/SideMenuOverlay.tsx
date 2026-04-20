import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

interface SideMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

type PrimaryMenuKey = 'men' | 'women' | 'bagShoes' | 'life' | 'outlet' | 'new' | 'special';

type SecondaryMenuKey =
    | 'all'
    | 'outer'
    | 'jacket'
    | 'knit'
    | 'tshirt'
    | 'pants'
    | 'accessories'
    | 'jewelryWatch'
    | 'trending';

type PreviewItem = {
    id: string;
    title: string;
    subtitle: string;
    imageSrc?: string;
};

type PrimaryMenu = {
    key: PrimaryMenuKey;
    label: string;
    path: string;
};

type SecondaryMenu = {
    key: SecondaryMenuKey;
    label: string;
};

type PreviewMap = Record<PrimaryMenuKey, Record<SecondaryMenuKey, PreviewItem[]>>;

const primaryMenus: PrimaryMenu[] = [
    { key: 'men', label: '남성', path: '/men' },
    { key: 'women', label: '여성', path: '/women' },
    { key: 'bagShoes', label: '백&슈즈', path: '/bag-shoes' },
    { key: 'life', label: 'LIFE', path: '/life' },
    { key: 'outlet', label: '아울렛', path: '/outlet' },
    { key: 'new', label: '신상품', path: '/new' },
    { key: 'special', label: '기획전', path: '/special' },
];

const secondaryMenus: SecondaryMenu[] = [
    { key: 'all', label: '전체 상품' },
    { key: 'outer', label: '아우터' },
    { key: 'jacket', label: '재킷' },
    { key: 'knit', label: '니트' },
    { key: 'tshirt', label: '티셔츠' },
    { key: 'pants', label: '팬츠' },
    { key: 'accessories', label: '패션잡화' },
    { key: 'jewelryWatch', label: '주얼리/시계' },
    { key: 'trending', label: 'Trending' },
];

const previewImageSources = {
    person: '/images/sidemenu/side_menu_image1.png',
    background: '/images/sidemenu/side_menu_image1-1.png',
    logo: '/images/sidemenu/side_menu_logo.png',
} as const;

const createPreviewSet = (
    sectionLabel: string,
    categoryLabel: string,
    categoryKey: SecondaryMenuKey
): PreviewItem[] => [
    {
        id: `${sectionLabel}-${categoryKey}-background`,
        title: `${sectionLabel} ${categoryLabel} Background`,
        subtitle: 'Background Preview',
        imageSrc: previewImageSources.background,
    },
    {
        id: `${sectionLabel}-${categoryKey}-logo`,
        title: `${sectionLabel} ${categoryLabel} Logo`,
        subtitle: 'Logo Layer',
        imageSrc: previewImageSources.logo,
    },
    {
        id: `${sectionLabel}-${categoryKey}-person`,
        title: `${sectionLabel} ${categoryLabel} Person`,
        subtitle: 'Person Cutout',
        imageSrc: previewImageSources.person,
    },
];

const createCategoryPreviewGroup = (
    sectionLabel: string
): Record<SecondaryMenuKey, PreviewItem[]> =>
    secondaryMenus.reduce(
        (acc, menu) => {
            acc[menu.key] = createPreviewSet(sectionLabel, menu.label, menu.key);
            return acc;
        },
        {} as Record<SecondaryMenuKey, PreviewItem[]>
    );

const previewMap: PreviewMap = {
    men: createCategoryPreviewGroup('MEN'),
    women: createCategoryPreviewGroup('WOMEN'),
    bagShoes: createCategoryPreviewGroup('BAG&SHOES'),
    life: createCategoryPreviewGroup('LIFE'),
    outlet: createCategoryPreviewGroup('OUTLET'),
    new: createCategoryPreviewGroup('NEW'),
    special: createCategoryPreviewGroup('SPECIAL'),
};

const OVERLAY_TRANSITION_MS = 700;

const secondaryCategoryQuery: Record<SecondaryMenuKey, string | null> = {
    all: null,
    outer: 'outer',
    jacket: 'jacket',
    knit: 'knit',
    tshirt: 'tshirt',
    pants: 'pants',
    accessories: 'fashion',
    jewelryWatch: 'jewelry',
    trending: 'trending',
};

const getCategoryPath = (basePath: string, categoryKey: SecondaryMenuKey) => {
    const query = secondaryCategoryQuery[categoryKey];
    return query ? `${basePath}?category=${query}` : basePath;
};

function SearchIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="63"
            height="63"
            viewBox="0 0 63 63"
            fill="none"
            aria-hidden="true"
            className="h-[63px] w-[63px] shrink-0"
        >
            <path
                d="M28.2702 48.0374C24.3608 48.0374 20.5392 46.8781 17.2886 44.7062C14.0381 42.5342 11.5046 39.4472 10.0085 35.8354C8.51247 32.2235 8.12103 28.2492 8.88372 24.4149C9.6464 20.5807 11.529 17.0587 14.2933 14.2943C17.0577 11.5299 20.5797 9.64738 24.414 8.88469C28.2482 8.12201 32.2226 8.51345 35.8344 10.0095C39.4462 11.5056 42.5333 14.0391 44.7052 17.2896C46.8771 20.5401 48.0364 24.3617 48.0364 28.2711C48.0364 30.8669 47.5251 33.4372 46.5318 35.8354C45.5384 38.2335 44.0825 40.4125 42.247 42.248C40.4115 44.0835 38.2325 45.5394 35.8344 46.5328C33.4362 47.5261 30.8659 48.0374 28.2702 48.0374ZM28.2702 12.4686C25.1551 12.4686 22.11 13.3924 19.5199 15.123C16.9299 16.8536 14.9111 19.3134 13.7191 22.1914C12.527 25.0693 12.2151 28.2361 12.8228 31.2913C13.4305 34.3465 14.9306 37.1529 17.1332 39.3556C19.3359 41.5582 22.1423 43.0583 25.1975 43.666C28.2527 44.2737 31.4195 43.9618 34.2974 42.7697C37.1754 41.5777 39.6352 39.5589 41.3658 36.9689C43.0964 34.3788 44.0202 31.3337 44.0202 28.2186C44.0202 24.0415 42.3608 20.0354 39.4071 17.0817C36.4534 14.128 32.4473 12.4686 28.2702 12.4686Z"
                fill="black"
            />
            <path
                d="M52.4992 54.4691C52.2405 54.4704 51.9842 54.4199 51.7453 54.3207C51.5064 54.2216 51.2897 54.0757 51.1079 53.8916L40.2667 43.0504C39.9189 42.6772 39.7296 42.1836 39.7386 41.6735C39.7476 41.1635 39.9542 40.6768 40.3149 40.3161C40.6756 39.9554 41.1623 39.7488 41.6723 39.7398C42.1823 39.7308 42.676 39.9201 43.0492 40.2679L53.8904 51.1091C54.2591 51.4783 54.4662 51.9787 54.4662 52.5004C54.4662 53.0221 54.2591 53.5225 53.8904 53.8916C53.7087 54.0757 53.492 54.2216 53.2531 54.3207C53.0141 54.4199 52.7578 54.4704 52.4992 54.4691Z"
                fill="black"
            />
        </svg>
    );
}

function RedDot() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="49"
            height="49"
            viewBox="0 0 49 49"
            fill="none"
            aria-hidden="true"
            className="h-[49px] w-[49px] shrink-0"
        >
            <path
                d="M25 22C24.2044 22 23.4413 22.3161 22.8787 22.8787C22.3161 23.4413 22 24.2044 22 25C22 25.7956 22.3161 26.5587 22.8787 27.1213C23.4413 27.6839 24.2044 28 25 28C26.665 28 28 26.665 28 25C28 24.2044 27.6839 23.4413 27.1213 22.8787C26.5587 22.3161 25.7956 22 25 22Z"
                fill="#EA1014"
            />
        </svg>
    );
}

export default function SideMenuOverlay({ isOpen, onClose }: SideMenuOverlayProps) {
    const [activePrimary, setActivePrimary] = useState<PrimaryMenuKey>('men');
    const [activeSecondary, setActiveSecondary] = useState<SecondaryMenuKey | null>(null);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timeoutId: number | undefined;
        let frameId: number | undefined;
        let visibleFrameId: number | undefined;

        if (isOpen) {
            frameId = window.requestAnimationFrame(() => {
                setShouldRender(true);
                visibleFrameId = window.requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            frameId = window.requestAnimationFrame(() => {
                setIsVisible(false);
            });
            timeoutId = window.setTimeout(() => {
                setShouldRender(false);
            }, OVERLAY_TRANSITION_MS);
        }

        return () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
            if (visibleFrameId) {
                window.cancelAnimationFrame(visibleFrameId);
            }
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const activePrimaryMenu = useMemo(
        () => primaryMenus.find((menu) => menu.key === activePrimary) ?? primaryMenus[0],
        [activePrimary]
    );

    const activePreviewItems = useMemo(() => {
        if (!activeSecondary) return [];
        return previewMap[activePrimary]?.[activeSecondary] ?? [];
    }, [activePrimary, activeSecondary]);

    const shouldShowPreview = activePrimary === 'men' && activeSecondary === 'outer';

    if (!shouldRender) return null;

    return (
        <div
            className={[
                'fixed inset-0 z-50 overflow-hidden transition-opacity duration-[450ms] ease-out',
                isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
        >
            <div className="absolute inset-0 bg-[#ffffff] transition-opacity duration-[0.5ms] ease-out" />

            <div
                className={[
                    'relative h-full w-full transform transition-all duration-[0.5ms] ease-out',
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
                ].join(' ')}
            >
                <div className="mx-auto flex min-h-screen w-full max-w-[100%] flex-col px-6 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 xl:px-0 xl:pt-5 xl:pb-5">
                    <div className="top-controls w-full max-w-[100%] px-0 pt-0">
                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={onClose}
                                className="absolute left-8 top-7 flex h-24 w-24 items-center justify-center text-black transition hover:opacity-60"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10"
                                >
                                    <path
                                        d="M5 5L19 19M19 5L5 19"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                            <Link
                                to="/login"
                                aria-label="Go to login"
                                className="pointer-events-auto absolute right-8 top-7 flex h-10 w-10 items-center justify-center text-black transition hover:opacity-70"
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
                            </Link>
                    </div>

                    <div className="content-inner flex w-full justify-between pt-[40px] xl:pt-[40px]">
                        <div className="content-row relative mx-auto mt-0 flex w-full max-w-[1320px] flex-col gap-10 pt-16 xl:top-[100px] xl:left-[-80px] xl:flex-row xl:items-start xl:justify-center xl:gap-[90px] xl:pt-0">
                            <div className=" left-[20px] top-[10px] left-main-inner left-main-group z-40 flex gap-10 flex-col items-start pt-0 xl:w-[260px] xl:min-w-[260px]">
                                <div className="search-inner w-full">
                                    <div className="absolute top-[-70px] left-[-50px] flex items-end gap-3">
                                        <SearchIcon />
                                    </div>
                                    <div className="absolute left-[-50px] mt-4 h-px w-80 bg-black/55" />
                                </div>

                                <nav className="primary-category-inner mt-6 flex flex-col gap-[6px]">
                                    {primaryMenus.map((menu) => {
                                        const isActive = activePrimary === menu.key;
                                        const isNew = menu.key === 'new';

                                        return (
                                            <Link
                                                key={menu.key}
                                                to={menu.path}
                                                onMouseEnter={() => {
                                                    setActivePrimary(menu.key);
                                                    setActiveSecondary(null);
                                                }}
                                                onFocus={() => {
                                                    setActivePrimary(menu.key);
                                                    setActiveSecondary(null);
                                                }}
                                                onClick={onClose}
                                                className="group flex w-fit items-center gap-1 self-start"
                                            >
                                                <span
                                                    className={[
                                                        "font-['Alexandria','Helvetica_Neue',Arial,sans-serif] text-[40px] font-medium leading-none tracking-[-0.04em] text-black transition-colors duration-200",
                                                        isNew ? 'text-[#EA1014]' : 'text-black',
                                                    ].join(' ')}
                                                >
                                                    {menu.label}
                                                </span>
                                                <span
                                                    className={[
                                                        'transition-opacity duration-200',
                                                        isActive
                                                            ? 'opacity-100'
                                                            : 'opacity-0 group-hover:opacity-100',
                                                    ].join(' ')}
                                                >
                                                    <RedDot />
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="sub-category-inner sub-category-group z-40 mt-0 flex h-auto w-full flex-col items-start justify-between gap-3 xl:absolute xl:left-[360px] xl:top-[40px] xl:h-[384px] xl:w-[266px] xl:min-w-[266px] xl:gap-1">
                                {secondaryMenus.map((menu) => {
                                    const isActive = activeSecondary === menu.key;

                                    return (
                                        <Link
                                            key={menu.key}
                                            to={getCategoryPath(activePrimaryMenu.path, menu.key)}
                                            onMouseEnter={() => {
                                                setActiveSecondary(menu.key);
                                            }}
                                            onFocus={() => {
                                                setActiveSecondary(menu.key);
                                            }}
                                            onClick={onClose}
                                            className="group flex items-center gap-1"
                                        >
                                            <span className="font-['Alexandria','Helvetica_Neue',Arial,sans-serif] text-[20px] font-normal leading-none text-black transition-opacity duration-200 group-hover:opacity-100">
                                                {menu.label}
                                            </span>
                                            <span
                                                className={[
                                                    'transition-opacity duration-200',
                                                    isActive
                                                        ? 'opacity-100'
                                                        : 'opacity-0 group-hover:opacity-100',
                                                ].join(' ')}
                                            >
                                                <RedDot />
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>

                            <section className="preview-inner preview-group relative mt-0 min-h-[520px] xl:min-h-0 xl:flex-1">
                                <div className="relative top-0 mx-auto h-[560px] w-full max-w-[720px] xl:left-[140px] xl:h-[760px] xl:max-w-[720px]">
                                    <div
                                        className={[
                                            'absolute left-[48px] top-[58px] z-10 h-[620px] w-[607px] overflow-visible transition-all duration-500 ease-out',
                                            shouldShowPreview
                                                ? 'translate-y-0 scale-100 opacity-100'
                                                : 'translate-y-[10px] scale-[0.985] opacity-0',
                                        ].join(' ')}
                                    >
                                        {shouldShowPreview && activePreviewItems[0]?.imageSrc ? (
                                            <img
                                                src={activePreviewItems[0].imageSrc}
                                                alt={`${activePrimaryMenu.label} background preview`}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : null}
                                    </div>

                                    <div
                                        className={[
                                            'pointer-events-none absolute left-[126px] top-[160px] z-20 h-[340px] w-[640px] overflow-visible transition-all duration-500 delay-75 ease-out',
                                            shouldShowPreview
                                                ? 'translate-y-0 scale-100 opacity-100'
                                                : 'translate-y-[10px] scale-[0.985] opacity-0',
                                        ].join(' ')}
                                    >
                                        {shouldShowPreview && activePreviewItems[1]?.imageSrc ? (
                                            <img
                                                src={activePreviewItems[1].imageSrc}
                                                alt={`${activePrimaryMenu.label} logo preview`}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : null}
                                    </div>

                                    <div
                                        className={[
                                            'absolute left-[138px] top-[90px] z-30 h-[650px] w-[420px] overflow-visible transition-all duration-500 delay-100 ease-out',
                                            shouldShowPreview
                                                ? 'translate-y-0 scale-100 opacity-100'
                                                : 'translate-y-[10px] scale-[0.985] opacity-0',
                                        ].join(' ')}
                                    >
                                        {shouldShowPreview && activePreviewItems[2]?.imageSrc ? (
                                            <img
                                                src={activePreviewItems[2].imageSrc}
                                                alt={`${activePrimaryMenu.label} person preview`}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
