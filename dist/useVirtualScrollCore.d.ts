import React from "react";
interface VirtualScrollOptions {
    itemCount: number;
    itemSize?: number;
    horizontal?: boolean;
    preRenderedItemCount?: number;
}
interface VirtualScrollReturn<O extends HTMLElement = HTMLElement, I extends HTMLElement = O> {
    outerContainerRef: React.RefObject<O | null>;
    innerContainerRef: React.RefObject<I | null>;
    scrollToOffset: (offset: number) => void;
    scrollToItem: (index: number) => void;
}
export declare function useVirtualScrollCore<O extends HTMLElement = HTMLElement, I extends HTMLElement = O>({ itemCount, itemSize, horizontal, preRenderedItemCount, }: VirtualScrollOptions): VirtualScrollReturn<O, I>;
export {};
