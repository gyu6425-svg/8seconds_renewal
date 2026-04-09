# Men / Women Component Data Summary

이 문서는 `src/components/men`, `src/components/women`, `src/pages/men`, `src/pages/women` 기준으로
현재 컴포넌트들이 어떤 데이터 상수와 상태를 사용하고 있는지 빠르게 확인하기 위한 정리입니다.

## Page Entry

### `src/pages/men/Men.tsx`
- 섹션 순서
  - `MenHeroSlider`
  - `MenClickLanking`
  - `MenCurationMoodboard`
  - `MenWeeklyRanking`
  - `New`
- men 페이지 전용 스크롤바 숨김 스타일 포함
  - `.men-page .scrollbar-hide`

### `src/pages/women/Women.tsx`
- 섹션 순서
  - `WomenHeroSlider`
  - `WomenClickLanking`
  - `WomenCurationMoodboard`
  - `WomenWeeklyRanking`
  - `WomenNew`
- women 페이지 전용 스크롤바 숨김 스타일 포함
  - `.women-page .scrollbar-hide`
- 현재 구조는 men 페이지와 동일하게 복제된 상태

## Men Components

### `src/components/men/MenHeroSlider.tsx`
- 데이터 상수
  - `cards`
- 데이터 구조
  - `id`
  - `title`
  - `subTitle`
  - `image`
  - `category`
- 현재 이미지 경로
  - `/images/men/hero_card_image1.png`
  - `/images/men/hero_card_image2.png`
  - `/images/men/hero_card_image3.png`
  - 코드에는 `hero_card_image4~6`도 참조 중이므로 실제 파일 존재 여부는 별도 확인 필요
- 기타 상태/훅
  - `useHorizontalDragScroll()`로 가로 드래그 스크롤 처리

### `src/components/men/MenClickLanking.tsx`
- 데이터 상수
  - `rankingItems`
- 데이터 구조
  - `rank`
  - `image`
- 현재 이미지 경로
  - `/images/men/click1.png`
  - `/images/men/click2.png`
  - `/images/men/click3.png`
  - 코드에는 `click4.png`, `click5.png`도 참조 중이므로 실제 파일 존재 여부는 별도 확인 필요
- 기타 상태/훅
  - `useHorizontalDragScroll()`로 가로 드래그 스크롤 처리

### `src/components/men/MenCurationMoodboard.tsx`
- 헬퍼
  - `fillImageSet(images, total = 9)`
  - 이미지 개수가 9장보다 적어도 반복해서 9칸을 채움
- 데이터 상수
  - `CHIP_SETS`
- 칩 데이터 구조
  - `id`
  - `label`
  - `images`
- 현재 칩 세트
  - `kim`
    - 라벨: `#김경준 PICK`
    - 이미지: `/images/men/celeb1~9.png`
  - `happy-jungho`
    - 라벨: `#해피가이정호 PICK`
    - 이미지: `/images/men/new1~8.png`
  - `casual`
    - 라벨: `#캐주얼 꾸안꾸`
    - 이미지: `/images/men/click1~3.png` 반복
- 상태
  - `activeChip`
  - 기본값: 첫 번째 칩(`kim`)
- 파생 데이터
  - `activeSet`
  - `imageRows`

### `src/components/men/MenWeeklyRanking.tsx`
- 타입
  - `WeeklyItem`
- 데이터 상수
  - `WEEKLY_RANKING_SETS`
- 주차 데이터 구조
  - `id`
  - `label`
  - `items`
- 상품 데이터 구조
  - `brand`
  - `name`
  - `price`
  - `image`
- 현재 주차 세트
  - `week3`
    - 라벨: `3월 3주차`
    - 이미지: `/images/men/online1.png`, `/images/men/online2.png`, `/images/men/online3.png`
  - `week2`
    - 라벨: `3월 2주차`
    - 이미지: `/images/men/new1.png`, `/images/men/new2.png`, `/images/men/new3.png`, `/images/men/new4.png`
- 상태
  - `activeWeek`
  - 기본값: `week3`
- 파생 데이터
  - `activeSet`
- 기타 상태/훅
  - `useHorizontalDragScroll()`로 가로 드래그 스크롤 처리
  - `productListRef`로 GSAP fade 대상 제어

### `src/components/men/New.tsx`
- 타입
  - `Product`
- 데이터 상수
  - `initialProducts`
  - `appendProducts`
- 상품 데이터 구조
  - `id`
  - `image`
  - `brand`
  - `name`
  - `price`
- 현재 이미지 경로
  - `/images/men/new1~8.png`
- 상태
  - `products`
  - 기본값: `initialProducts`
- 동작
  - `handleLoadMore()` 호출 시 `appendProducts` 기반으로 추가

### `src/components/men/useHorizontalDragScroll.ts`
- 목적
  - men 가로 스크롤 섹션용 마우스 드래그 스크롤 훅
- 반환값
  - `scrollRef`
  - `isDragging`
  - `dragHandlers`
- 내부 ref/state
  - `dragStateRef`
    - `isPointerDown`
    - `startX`
    - `scrollLeft`
    - `hasDragged`
  - `suppressClickRef`

## Women Components

### `src/components/women/WomenHeroSlider.tsx`
- men의 `MenHeroSlider.tsx` 구조 복제
- 데이터 상수
  - `cards`
- 데이터 구조
  - `id`
  - `title`
  - `subTitle`
  - `image`
  - `category`
- 현재 임시 이미지 경로
  - `/images/men/hero_card_image1.png`
  - `/images/men/hero_card_image2.png`
  - `/images/men/hero_card_image3.png`
- 기타 상태/훅
  - `useHorizontalDragScroll()`

### `src/components/women/WomenClickLanking.tsx`
- men의 `MenClickLanking.tsx` 구조 복제
- 데이터 상수
  - `rankingItems`
- 데이터 구조
  - `rank`
  - `image`
- 현재 임시 이미지 경로
  - `/images/men/click1.png`
  - `/images/men/click2.png`
  - `/images/men/click3.png`
- 기타 상태/훅
  - `useHorizontalDragScroll()`

### `src/components/women/WomenCurationMoodboard.tsx`
- men의 `MenCurationMoodboard.tsx` 구조 복제
- 헬퍼
  - `fillImageSet(images, total = 9)`
- 데이터 상수
  - `CHIP_SETS`
- 칩 데이터 구조
  - `id`
  - `label`
  - `images`
- 상태
  - `activeChip`
  - 기본값: 첫 번째 칩(`kim`)
- 현재 임시 이미지 경로
  - `kim`: `/images/men/celeb1~9.png`
  - `happy-jungho`: `/images/men/new1~8.png`
  - `casual`: `/images/men/click1~3.png`
- 파생 데이터
  - `activeSet`
  - `imageRows`

### `src/components/women/WomenWeeklyRanking.tsx`
- men의 `MenWeeklyRanking.tsx` 구조 복제
- 타입
  - `WeeklyItem`
- 데이터 상수
  - `WEEKLY_RANKING_SETS`
- 주차 데이터 구조
  - `id`
  - `label`
  - `items`
- 상품 데이터 구조
  - `brand`
  - `name`
  - `price`
  - `image`
- 상태
  - `activeWeek`
  - 기본값: `week3`
- 현재 임시 이미지 경로
  - `week3`: `/images/men/online1.png`, `/images/men/online2.png`, `/images/men/online3.png`
  - `week2`: `/images/men/new1.png`, `/images/men/new2.png`, `/images/men/new3.png`, `/images/men/new4.png`
- 파생 데이터
  - `activeSet`
- 기타 상태/훅
  - `useHorizontalDragScroll()`
  - `productListRef`

### `src/components/women/WomenNew.tsx`
- men의 `New.tsx` 구조 복제
- 타입
  - `Product`
- 데이터 상수
  - `initialProducts`
  - `appendProducts`
- 상품 데이터 구조
  - `id`
  - `image`
  - `brand`
  - `name`
  - `price`
- 상태
  - `products`
- 현재 임시 이미지 경로
  - `/images/men/new1~8.png`

### `src/components/women/useHorizontalDragScroll.ts`
- men의 `useHorizontalDragScroll.ts` 구조 복제
- 목적
  - women 가로 스크롤 섹션용 마우스 드래그 스크롤 훅
- 반환값
  - `scrollRef`
  - `isDragging`
  - `dragHandlers`

## Women Is Currently Using Men Assets

현재 women 컴포넌트들은 여성 전용 데이터가 아니라 men 자산을 임시로 재사용 중입니다.

- hero 이미지
  - `/images/men/hero_card_image*.png`
- 클릭 랭킹 이미지
  - `/images/men/click*.png`
- 큐레이션 무드보드 이미지
  - `/images/men/celeb*.png`
  - `/images/men/new*.png`
  - `/images/men/click*.png`
- 주간 랭킹 이미지
  - `/images/men/online*.png`
  - `/images/men/new*.png`
- new 섹션 이미지
  - `/images/men/new*.png`

## Later Replacement Guide

women 전용 데이터/이미지로 바꾸려면 아래 파일의 상수만 수정하면 됩니다.

- `src/components/women/WomenHeroSlider.tsx`
  - `cards`
- `src/components/women/WomenClickLanking.tsx`
  - `rankingItems`
- `src/components/women/WomenCurationMoodboard.tsx`
  - `CHIP_SETS`
- `src/components/women/WomenWeeklyRanking.tsx`
  - `WEEKLY_RANKING_SETS`
- `src/components/women/WomenNew.tsx`
  - `initialProducts`
  - `appendProducts`

men 쪽 데이터 변경 포인트도 동일합니다.

- `src/components/men/MenHeroSlider.tsx`
  - `cards`
- `src/components/men/MenClickLanking.tsx`
  - `rankingItems`
- `src/components/men/MenCurationMoodboard.tsx`
  - `CHIP_SETS`
- `src/components/men/MenWeeklyRanking.tsx`
  - `WEEKLY_RANKING_SETS`
- `src/components/men/New.tsx`
  - `initialProducts`
  - `appendProducts`
