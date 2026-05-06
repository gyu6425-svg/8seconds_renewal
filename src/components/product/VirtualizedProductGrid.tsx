import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { List, WindowScroller, type IndexRange, type ListRowProps } from 'react-virtualized';

import type { Product } from '../../features/products/productTypes';
import ProductCard from './ProductCard';

type VirtualizedProductGridProps = {
    items: Product[];
    onReachEnd?: () => void;
};

const COLUMN_GAP = 12;
const ROW_HEIGHT_RATIO = 780 / 416;

function getColumnCount(width: number): number {
    if (width < 480) return 1;
    if (width < 768) return 2;
    if (width < 1200) return 3;
    return 4;
}

function VirtualizedProductGridComponent({ items, onReachEnd }: VirtualizedProductGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // 외부 div는 항상 렌더링되므로 최초 마운트 시 ref가 유효 → ResizeObserver 정상 설정
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            setContainerWidth(Math.floor(entry.contentRect.width));
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const columnCount = useMemo(() => getColumnCount(containerWidth), [containerWidth]);

    const cardWidth = useMemo(
        () =>
            containerWidth > 0
                ? Math.floor((containerWidth - COLUMN_GAP * (columnCount - 1)) / columnCount)
                : 0,
        [containerWidth, columnCount],
    );

    const rowHeight = useMemo(() => Math.floor(cardWidth * ROW_HEIGHT_RATIO), [cardWidth]);

    const rowCount = useMemo(
        () => Math.ceil(items.length / columnCount),
        [items.length, columnCount],
    );

    const handleRowsRendered = useCallback(
        ({ stopIndex }: IndexRange) => {
            if (!onReachEnd || rowCount === 0) return;
            if (stopIndex >= Math.max(rowCount - 2, 0)) {
                onReachEnd();
            }
        },
        [onReachEnd, rowCount],
    );

    const rowRenderer = useCallback(
        ({ index, key, style }: ListRowProps) => {
            const startIndex = index * columnCount;
            const rowItems = items.slice(startIndex, startIndex + columnCount);

            return (
                <div key={key} style={style}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${columnCount}, ${cardWidth}px)`,
                            gap: COLUMN_GAP,
                        }}
                    >
                        {rowItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            );
        },
        [items, columnCount, cardWidth],
    );

    return (
        <div ref={containerRef} className="mb-[120px] w-full">
            {items.length > 0 && containerWidth > 0 && (
                <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop, registerChild }) => (
                        <div ref={registerChild}>
                            <List
                                autoHeight
                                height={height}
                                isScrolling={isScrolling}
                                onRowsRendered={handleRowsRendered}
                                onScroll={onChildScroll}
                                overscanRowCount={2}
                                rowCount={rowCount}
                                rowHeight={rowHeight}
                                rowRenderer={rowRenderer}
                                scrollTop={scrollTop}
                                width={containerWidth}
                            />
                        </div>
                    )}
                </WindowScroller>
            )}
        </div>
    );
}

const VirtualizedProductGrid = memo(VirtualizedProductGridComponent);

export default VirtualizedProductGrid;
