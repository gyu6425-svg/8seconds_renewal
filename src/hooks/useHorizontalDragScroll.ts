import { useEffect, useRef, useState, type MouseEvent } from 'react';

export default function useHorizontalDragScroll() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStateRef = useRef({
        isPointerDown: false,
        startX: 0,
        scrollLeft: 0,
        hasDragged: false,
    });
    const suppressClickRef = useRef(false);

    useEffect(() => {
        const handleWindowMouseUp = () => {
            dragStateRef.current.isPointerDown = false;
            setIsDragging(false);
        };

        window.addEventListener('mouseup', handleWindowMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleWindowMouseUp);
        };
    }, []);

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        const container = scrollRef.current;

        if (!container) {
            return;
        }

        dragStateRef.current.isPointerDown = true;
        dragStateRef.current.startX = event.pageX - container.offsetLeft;
        dragStateRef.current.scrollLeft = container.scrollLeft;
        dragStateRef.current.hasDragged = false;
        suppressClickRef.current = false;
        setIsDragging(true);
    };

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const container = scrollRef.current;

        if (!container || !dragStateRef.current.isPointerDown) {
            return;
        }

        const currentX = event.pageX - container.offsetLeft;
        const distance = currentX - dragStateRef.current.startX;

        if (Math.abs(distance) > 4) {
            dragStateRef.current.hasDragged = true;
            suppressClickRef.current = true;
        }

        if (dragStateRef.current.hasDragged) {
            event.preventDefault();
            container.scrollLeft = dragStateRef.current.scrollLeft - distance;
        }
    };

    const stopDragging = () => {
        if (dragStateRef.current.hasDragged) {
            window.setTimeout(() => {
                suppressClickRef.current = false;
            }, 0);
        }

        dragStateRef.current.isPointerDown = false;
        setIsDragging(false);
    };

    const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
        if (!suppressClickRef.current) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        suppressClickRef.current = false;
    };

    return {
        scrollRef,
        isDragging,
        dragHandlers: {
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: stopDragging,
            onMouseLeave: stopDragging,
            onClickCapture: handleClickCapture,
        },
    };
}
