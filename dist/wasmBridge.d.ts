export declare function initWasm(): Promise<void>;
export declare function getVisibleIndexesSafe(start: number, end: number, revealed: number[]): number[];
export declare function snapToOffsetSafe(scrollTop: number, itemHeight: number, batchSize: number): number;
export declare function computeScrollTargetSafe(key: string, scrollTop: number, containerHeight: number, itemHeight: number, maxScroll: number): number;
