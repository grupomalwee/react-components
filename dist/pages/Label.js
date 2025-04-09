import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckboxBase } from "@/components/ui/CheckBoxBase";
import LabelBase from "@/components/ui/LabelBase";
export function LabelPage() {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CheckboxBase, { id: "terms" }), _jsx(LabelBase, { htmlFor: "terms", children: "Accept terms and conditions" })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { CheckboxBase } from "@/components/ui/CheckBoxBase";
import LabelBase  from "@/components/ui/LabelBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<div className="flex items-center space-x-2">
  <CheckboxBase id="terms" />
  <LabelBase htmlFor="terms">Accept terms and conditions</LabelBase>
</div>` }) })] })] })] }));
}
