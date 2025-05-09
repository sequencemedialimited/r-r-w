var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

import * as initWasmModule from "./pkg/react_render_wave_wasm_bg.wasm?url";
import * as wasm from "./pkg/react_render_wave_wasm.js";
let initialized = false;
let wasmAvailable = false;
export function initWasm() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!initialized) {
            try {
                yield wasm.default(initWasmModule);
                initialized = true;
                wasmAvailable = true;
            }
            catch (err) {
                console.warn("WASM init failed, falling back to JS:", err);
                wasmAvailable = false;
            }
        }
    });
}
export function getVisibleIndexesSafe(start, end, revealed) {
    if (wasmAvailable) {
        try {
            const typedArray = new Uint32Array(revealed);
            const result = wasm.get_visible_indexes(start, end, typedArray);
            return Array.from(result);
        }
        catch (err) {
            console.warn("WASM execution failed, fallback to JS:", err);
        }
    }
    return revealed.filter((i) => i >= start && i < end);
}
export function snapToOffsetSafe(scrollTop, itemHeight, batchSize) {
    if (wasmAvailable) {
        try {
            return wasm.snap_to_batch_offset(scrollTop, itemHeight, batchSize);
        }
        catch (err) {
            console.warn("WASM snap failed, using JS fallback");
        }
    }
    const batchPixelSize = itemHeight * batchSize;
    const targetIndex = Math.round(scrollTop / batchPixelSize) * batchSize;
    return targetIndex * itemHeight;
}
export function computeScrollTargetSafe(key, scrollTop, containerHeight, itemHeight, maxScroll) {
    if (wasmAvailable) {
        try {
            return wasm.compute_scroll_target(key, scrollTop, containerHeight, itemHeight, maxScroll);
        }
        catch (err) {
            console.warn("WASM scrollTarget failed, fallback to JS");
        }
    }
    switch (key) {
        case "PageDown":
            return Math.min(scrollTop + containerHeight, maxScroll);
        case "PageUp":
            return Math.max(scrollTop - containerHeight, 0);
        case "ArrowDown":
            return Math.min(scrollTop + itemHeight, maxScroll);
        case "ArrowUp":
            return Math.max(scrollTop - itemHeight, 0);
        case "Home":
            return 0;
        case "End":
            return maxScroll;
        default:
            return scrollTop;
    }
}
