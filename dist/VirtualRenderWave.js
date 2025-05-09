"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState, useImperativeHandle, forwardRef, } from "react";
import { useRenderWave } from "./useRenderWave.js";
import { useVirtualScrollCore } from "./useVirtualScrollCore.js";
import { initWasm, getVisibleIndexesSafe, snapToOffsetSafe, computeScrollTargetSafe, } from "./wasmBridge.js";
function getGroupLabel(item, groupByKey) {
    if (!groupByKey)
        return undefined;
    return typeof groupByKey === "function"
        ? groupByKey(item)
        : item[groupByKey];
}
function getCurrentGroup(scrollTop, itemHeight, items, groupByKey) {
    const currentIndex = Math.floor(scrollTop / itemHeight);
    return getGroupLabel(items[currentIndex], groupByKey);
}
function VirtualRenderWaveInner({ items, itemHeight, containerHeight = 400, batchSize = 20, interval = 60, overscan = 5, startIndex = 0, className, style, renderItem, renderSkeleton, scrollToIndex, outerElement, innerElement, transition = false, snapToBatch = false, onEndReached, keyboardNavigation = false, renderStickyHeader, groupByKey, }, ref) {
    // Initialize WASM module on mount
    useEffect(() => {
        initWasm();
    }, []);
    const { outerContainerRef, innerContainerRef, scrollToOffset, scrollToItem } = useVirtualScrollCore({
        itemCount: items.length,
        itemSize: itemHeight,
        preRenderedItemCount: 0,
    });
    const revealedIndexes = useRenderWave({
        length: items.length,
        batchSize,
        interval,
        startIndex,
    });
    const [scrollTop, setScrollTop] = useState(0);
    const [containerClientHeight, setContainerClientHeight] = useState(containerHeight);
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(items.length, Math.ceil((scrollTop + containerClientHeight) / itemHeight) + overscan);
    useImperativeHandle(ref, () => ({
        scrollTo: (index) => {
            var _a;
            const offset = index * itemHeight;
            (_a = outerContainerRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ top: offset, behavior: "smooth" });
        },
        scrollToOffset: (offset) => {
            var _a;
            (_a = outerContainerRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ top: offset, behavior: "smooth" });
        },
        getVisibleIndexes: () => getVisibleIndexesSafe(start, end, revealedIndexes),
    }));
    useEffect(() => {
        const el = outerContainerRef.current;
        if (!el)
            return;
        let snapTimeout = null;
        const handleScroll = () => {
            setScrollTop(el.scrollTop);
            if (snapToBatch) {
                if (snapTimeout)
                    clearTimeout(snapTimeout);
                snapTimeout = setTimeout(() => {
                    const targetOffset = snapToOffsetSafe(el.scrollTop, itemHeight, batchSize);
                    el.scrollTo({ top: targetOffset, behavior: "smooth" });
                }, 150);
            }
            if (onEndReached) {
                const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
                if (reachedBottom) {
                    onEndReached();
                }
            }
        };
        const handleKeyDown = (e) => {
            if (!keyboardNavigation)
                return;
            const el = outerContainerRef.current;
            if (!el || !el.contains(document.activeElement))
                return;
            const maxScroll = el.scrollHeight - el.clientHeight;
            const offset = computeScrollTargetSafe(e.key, el.scrollTop, el.clientHeight, itemHeight, maxScroll);
            el.scrollTo({ top: offset, behavior: "smooth" });
        };
        const resizeObserver = new ResizeObserver(() => {
            setContainerClientHeight(el.clientHeight);
        });
        el.addEventListener("scroll", handleScroll);
        if (keyboardNavigation)
            window.addEventListener("keydown", handleKeyDown);
        resizeObserver.observe(el);
        setScrollTop(el.scrollTop);
        setContainerClientHeight(el.clientHeight);
        return () => {
            el.removeEventListener("scroll", handleScroll);
            if (keyboardNavigation)
                window.removeEventListener("keydown", handleKeyDown);
            resizeObserver.disconnect();
            if (snapTimeout)
                clearTimeout(snapTimeout);
        };
    }, [
        outerContainerRef,
        snapToBatch,
        itemHeight,
        batchSize,
        onEndReached,
        keyboardNavigation,
    ]);
    useEffect(() => {
        if (typeof scrollToIndex === "number" && outerContainerRef.current) {
            const offset = scrollToIndex * itemHeight;
            outerContainerRef.current.scrollTo({ top: offset });
        }
    }, [scrollToIndex, itemHeight]);
    const activeGroup = getCurrentGroup(scrollTop, itemHeight, items, groupByKey);
    const visibleItems = Array.from({ length: end - start }, (_, i) => {
        var _a;
        const index = start + i;
        const isRevealed = revealedIndexes.includes(index);
        return (_jsx("div", { role: "listitem", style: {
                position: "absolute",
                top: index * itemHeight,
                left: 0,
                right: 0,
                opacity: transition ? 0 : undefined,
                animation: transition && isRevealed ? "fadeIn 0.3s ease forwards" : undefined,
            }, children: isRevealed
                ? renderItem(items[index], index)
                : (_a = renderSkeleton === null || renderSkeleton === void 0 ? void 0 : renderSkeleton(index)) !== null && _a !== void 0 ? _a : null }, index));
    });
    const renderElement = (Component, props) => {
        if (typeof Component === "string") {
            return React.createElement(Component, {
                ref: props.ref,
                role: "list",
                style: props.style,
                className: props.className,
                children: props.children,
                tabIndex: keyboardNavigation ? 0 : undefined,
            });
        }
        return _jsx(Component, Object.assign({}, props));
    };
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      ` }), renderElement(outerElement || "div", {
                ref: outerContainerRef,
                className,
                style: Object.assign({ position: "relative", overflowY: "auto", height: containerHeight }, style),
                children: (_jsxs(_Fragment, { children: [renderStickyHeader && activeGroup && (_jsx("div", { style: {
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                background: "white",
                                borderBottom: "1px solid #ddd",
                            }, children: renderStickyHeader(activeGroup) })), renderElement(innerElement || "div", {
                            ref: innerContainerRef,
                            style: {
                                position: "relative",
                                height: items.length * itemHeight,
                                width: "100%",
                            },
                            children: visibleItems,
                        })] })),
            })] }));
}
const ForwardedVirtualRenderWave = forwardRef(VirtualRenderWaveInner);
export { ForwardedVirtualRenderWave as VirtualRenderWave };
