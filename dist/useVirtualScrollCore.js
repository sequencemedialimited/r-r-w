import { useEffect, useRef, useCallback } from "react";
export function useVirtualScrollCore({ itemCount, itemSize = 45, horizontal = false, preRenderedItemCount = 0, }) {
    const outerContainerRef = useRef(null);
    const innerContainerRef = useRef(null);
    const scrollKey = horizontal ? "scrollLeft" : "scrollTop";
    useEffect(() => {
        if (innerContainerRef.current) {
            if (horizontal) {
                innerContainerRef.current.style.width = `${itemCount * itemSize}px`;
            }
            else {
                innerContainerRef.current.style.height = `${itemCount * itemSize}px`;
            }
        }
    }, [itemCount, itemSize, horizontal]);
    const scrollToOffset = useCallback((offset) => {
        if (outerContainerRef.current) {
            outerContainerRef.current[scrollKey] = offset;
        }
    }, [scrollKey]);
    const scrollToItem = useCallback((index) => {
        const offset = index * itemSize;
        scrollToOffset(offset);
    }, [itemSize, scrollToOffset]);
    return {
        outerContainerRef,
        innerContainerRef,
        scrollToOffset,
        scrollToItem,
    };
}
