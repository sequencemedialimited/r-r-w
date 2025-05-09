import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
export function useRenderWave({ length, batchSize = 20, interval = 50, startIndex = 0, }) {
    const [count, setCount] = useState(startIndex);
    const timerRef = useRef(null);
    const rafRef = useRef(null);
    useEffect(() => {
        let isActive = true;
        const tick = () => {
            setCount((prev) => {
                const next = Math.min(prev + batchSize, length);
                if (next < length && isActive) {
                    timerRef.current = setTimeout(() => {
                        rafRef.current = requestAnimationFrame(tick);
                    }, interval);
                }
                return next;
            });
        };
        tick();
        return () => {
            isActive = false;
            if (timerRef.current)
                clearTimeout(timerRef.current);
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
        };
    }, [length, batchSize, interval]);
    return Array.from({ length: count - startIndex }, (_, i) => i + startIndex);
}
export function RenderWave({ items, batchSize, interval, startIndex, renderItem, }) {
    const indexes = useRenderWave({
        length: items.length,
        batchSize,
        interval,
        startIndex,
    });
    return _jsx(_Fragment, { children: indexes.map((i) => renderItem(items[i], i)) });
}
