import React from "react";
interface UseRenderWaveOptions {
    length: number;
    batchSize?: number;
    interval?: number;
    startIndex?: number;
}
export declare function useRenderWave({ length, batchSize, interval, startIndex, }: UseRenderWaveOptions): number[];
interface RenderWaveProps<T> {
    items: T[];
    batchSize?: number;
    interval?: number;
    startIndex?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
}
export declare function RenderWave<T>({ items, batchSize, interval, startIndex, renderItem, }: RenderWaveProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
