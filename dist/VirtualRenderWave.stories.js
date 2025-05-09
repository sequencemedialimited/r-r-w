import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { VirtualRenderWave } from "./VirtualRenderWave.js";
export default {
    title: "Components/VirtualRenderWave",
    component: VirtualRenderWave,
    argTypes: {
        itemHeight: {
            control: "number",
            description: "Height of each rendered item in pixels.",
            defaultValue: 40,
        },
        containerHeight: {
            control: "number",
            description: "Height of the scrollable container in pixels.",
            defaultValue: 400,
        },
        batchSize: {
            control: "number",
            description: "Number of items revealed per render wave.",
            defaultValue: 20,
        },
        overscan: {
            control: "number",
            description: "Extra items to render outside the visible viewport for smoother scroll.",
            defaultValue: 5,
        },
        transition: {
            control: "boolean",
            description: "Enable fade-in animation for new items.",
            defaultValue: false,
        },
        snapToBatch: {
            control: "boolean",
            description: "Snap scrolling to the nearest batch boundary.",
            defaultValue: false,
        },
        keyboardNavigation: {
            control: "boolean",
            description: "Enable keyboard scrolling support.",
            defaultValue: false,
        },
    },
};
const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
const storyStyle = {
    padding: 24,
    fontFamily: "Inter, sans-serif",
    fontSize: 16,
    lineHeight: 1.6,
};
const headingStyle = {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 16,
};
const Template = (args) => (_jsxs("div", { style: storyStyle, children: [_jsx("h3", { style: headingStyle, children: "\uD83C\uDF9B\uFE0F Playground" }), _jsx(VirtualRenderWave, Object.assign({}, args))] }));
export const Playground = Template.bind({});
Playground.args = {
    items,
    itemHeight: 40,
    containerHeight: 400,
    transition: false,
    snapToBatch: false,
    keyboardNavigation: false,
    batchSize: 20,
    overscan: 5,
    renderSkeleton: (i) => (_jsxs("div", { style: { padding: 8, opacity: 0.3 }, children: ["Loading ", i] })),
    renderItem: (item, i) => (_jsx("div", { style: { padding: 8, borderBottom: "1px solid #eee" }, children: item })),
};
export const WithSkeleton = () => (_jsxs("div", { style: storyStyle, children: [_jsx("h3", { style: headingStyle, children: "\uD83E\uDDB4 With Skeletons" }), _jsx(VirtualRenderWave, { items: items, itemHeight: 40, renderItem: (item, i) => (_jsx("div", { style: { padding: 8, borderBottom: "1px solid #eee" }, children: item })), renderSkeleton: (i) => (_jsxs("div", { style: { padding: 8, opacity: 0.3 }, children: ["Loading ", i] })) })] }));
export const WithTransition = () => (_jsxs("div", { style: storyStyle, children: [_jsx("h3", { style: headingStyle, children: "\u2728 With Fade-In Transition" }), _jsx(VirtualRenderWave, { items: items, itemHeight: 40, transition: true, renderItem: (item, i) => (_jsx("div", { style: { padding: 8, borderBottom: "1px solid #eee" }, children: item })), renderSkeleton: (i) => (_jsxs("div", { style: { padding: 8, opacity: 0.3 }, children: ["Loading ", i] })) })] }));
export const SnapToBatch = () => (_jsxs("div", { style: storyStyle, children: [_jsx("h3", { style: headingStyle, children: "\uD83E\uDDF2 Snap to Batch" }), _jsx("p", { children: "Automatically aligns scroll to the nearest batch after the user scrolls." }), _jsx(VirtualRenderWave, { items: items, itemHeight: 40, snapToBatch: true, renderItem: (item, i) => (_jsx("div", { style: { padding: 8, borderBottom: "1px solid #eee" }, children: item })) })] }));
export const KeyboardNavigation = () => (_jsxs("div", { style: storyStyle, children: [_jsx("h3", { style: headingStyle, children: "\u2328\uFE0F Keyboard Navigation" }), _jsxs("p", { children: [_jsx("strong", { children: "Use the following keys:" }), _jsx("br", {}), "\u2B06\uFE0F / \u2B07\uFE0F: scroll by 1 item", _jsx("br", {}), "\u2B06\uFE0F PageUp / PageDown \u2B07\uFE0F: scroll by 1 page", _jsx("br", {}), "\u2B05\uFE0F Home / End \u27A1\uFE0F: jump to start/end"] }), _jsx(VirtualRenderWave, { items: items, itemHeight: 40, keyboardNavigation: true, renderItem: (item, i) => (_jsx("div", { style: { padding: 8, borderBottom: "1px solid #eee" }, children: item })) })] }));
export const ScrollToIndexWithInput = () => {
    const ref = useRef(null);
    const [index, setIndex] = useState(300);
    return (_jsxs("div", { style: storyStyle, children: [_jsx("h3", { style: headingStyle, children: "\uD83C\uDFAF Scroll To Index" }), _jsxs("label", { children: ["Index:\u00A0", _jsx("input", { type: "number", value: index, onChange: (e) => setIndex(Number(e.target.value)), style: { width: 80, marginRight: 8 } })] }), _jsx("button", { onClick: () => { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.scrollTo(index); }, children: "Scroll" }), _jsx("div", { style: { marginTop: 16 }, children: _jsx(VirtualRenderWave, { ref: ref, items: items, itemHeight: 40, renderItem: (item, i) => (_jsx("div", { style: { padding: 8, borderBottom: "1px solid #eee" }, children: item })) }) })] }));
};
