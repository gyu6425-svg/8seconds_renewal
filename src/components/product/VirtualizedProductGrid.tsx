import { memo, useCallback, useMemo } from 'react';
import { List, WindowScroller, type IndexRange, type ListRowProps } from 'react-virtualized';

import type { Product } from '../../features/products/productTypes';
import ProductCard from './ProductCard';

type VirtualizedProductGridProps = {
    items: Product[];
    onReachEnd?: () => void;
};

const PRODUCTS_PER_ROW = 4;
const CARD_WIDTH = 416;
const COLUMN_GAP = 12;
const CONTENT_WIDTH = CARD_WIDTH * PRODUCTS_PER_ROW + COLUMN_GAP * (PRODUCTS_PER_ROW - 1);
const ROW_HEIGHT = 780;

function VirtualizedProductGridComponent({ items, onReachEnd }: VirtualizedProductGridProps) {
    const rowCount = useMemo(() => Math.ceil(items.length / PRODUCTS_PER_ROW), [items.length]);

    const handleRowsRendered = useCallback(
        ({ stopIndex }: IndexRange) => {
            if (!onReachEnd || rowCount === 0) {
                return;
            }

            if (stopIndex >= Math.max(rowCount - 2, 0)) {
                onReachEnd();
            }
        },
        [onReachEnd, rowCount]
    );

    const rowRenderer = useCallback(
        ({ index, key, style }: ListRowProps) => {
            const startIndex = index * PRODUCTS_PER_ROW;
            const rowItems = items.slice(startIndex, startIndex + PRODUCTS_PER_ROW);

            return (
                <div key={key} style={style}>
                    <div
                        className="grid justify-center"
                        style={{
                            width: CONTENT_WIDTH,
                            gridTemplateColumns: `repeat(${PRODUCTS_PER_ROW}, ${CARD_WIDTH}px)`,
                            columnGap: `${COLUMN_GAP}px`,
                        }}
                    >
                        {rowItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            );
        },
        [items]
    );

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="mx-auto mb-[120px] w-full max-w-[1700px]">
            <WindowScroller>
                {({ height, isScrolling, onChildScroll, scrollTop, registerChild }) => (
                    <div
                        ref={registerChild}
                        className="mx-auto"
                        style={{ width: CONTENT_WIDTH, maxWidth: `${CONTENT_WIDTH}px` }}
                    >
                        <List
                            autoHeight
                            height={height}
                            isScrolling={isScrolling}
                            onRowsRendered={handleRowsRendered}
                            onScroll={onChildScroll}
                            overscanRowCount={2}
                            rowCount={rowCount}
                            rowHeight={ROW_HEIGHT}
                            rowRenderer={rowRenderer}
                            scrollTop={scrollTop}
                            width={CONTENT_WIDTH}
                        />
                    </div>
                )}
            </WindowScroller>
        </div>
    );
}

const VirtualizedProductGrid = memo(VirtualizedProductGridComponent);

export default VirtualizedProductGrid;
