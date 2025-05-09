import React from "react";
import { VirtualRenderWaveProps, VirtualRenderWaveHandle } from "./types";
declare const _default: {
    title: string;
    component: <T>(props: VirtualRenderWaveProps<T> & {
        ref?: React.Ref<VirtualRenderWaveHandle>;
    }) => React.JSX.Element;
    argTypes: {
        itemHeight: {
            control: string;
            description: string;
            defaultValue: number;
        };
        containerHeight: {
            control: string;
            description: string;
            defaultValue: number;
        };
        batchSize: {
            control: string;
            description: string;
            defaultValue: number;
        };
        overscan: {
            control: string;
            description: string;
            defaultValue: number;
        };
        transition: {
            control: string;
            description: string;
            defaultValue: boolean;
        };
        snapToBatch: {
            control: string;
            description: string;
            defaultValue: boolean;
        };
        keyboardNavigation: {
            control: string;
            description: string;
            defaultValue: boolean;
        };
    };
};
export default _default;
export declare const Playground: any;
export declare const WithSkeleton: () => import("react/jsx-runtime").JSX.Element;
export declare const WithTransition: () => import("react/jsx-runtime").JSX.Element;
export declare const SnapToBatch: () => import("react/jsx-runtime").JSX.Element;
export declare const KeyboardNavigation: () => import("react/jsx-runtime").JSX.Element;
export declare const ScrollToIndexWithInput: () => import("react/jsx-runtime").JSX.Element;
