import React, { JSX } from "react";
import { VirtualRenderWaveHandle, VirtualRenderWaveProps } from "./types";
declare const ForwardedVirtualRenderWave: <T>(props: VirtualRenderWaveProps<T> & {
    ref?: React.Ref<VirtualRenderWaveHandle>;
}) => JSX.Element;
export { ForwardedVirtualRenderWave as VirtualRenderWave };
