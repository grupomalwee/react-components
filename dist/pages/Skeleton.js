"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SkeletonBase } from "@/components/ui/SkeletonBase";
export const SkeletonPage = () => {
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm", children: _jsx(SkeletonBase, { className: "w-[350px] h-24 absolute left-[32%] -translate-x-1/3 rounded-2xl" }) }), _jsxs("div", { className: "my-20 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { SkeletonBase } from "@/components/ui/SkeletonBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<div className="mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm">
  <SkeletonBase className="w-[350px] h-24 absolute left-[32%] -translate-x-1/3 rounded-2xl" />
</div>` }) })] })] })] }));
};
