"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SeparatorBase } from "@/components/ui/SeparatorBase";
export const SeparatorPage = () => {
    return (_jsxs("div", { children: [_jsxs("div", { className: "p-5", children: [_jsx("h1", { children: "Section 1" }), _jsx("p", { children: "This is the first section content." }), _jsx(SeparatorBase, { className: "my-5 w-full border-t-2 border-gray-300" }), _jsx("h1", { children: "Section 2" }), _jsx("p", { children: "This is the second section content." })] }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { SeparatorBase } from "@/components/ui/SeparatorBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<div className="p-5">
  <h1>Section 1</h1>
  <p>This is the first section content.</p>
  <SeparatorBase className="my-5 w-full border-t-2 border-gray-300" />
  <h1>Section 2</h1>
  <p>This is the second section content.</p>
</div>` }) })] })] })] }));
};
