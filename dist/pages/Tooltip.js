"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TooltipBase, TooltipContentBase, TooltipProviderBase, TooltipTriggerBase, } from "@/components/ui/TooltipBase";
export const TooltipPage = () => {
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm", children: _jsx(TooltipProviderBase, { children: _jsxs(TooltipBase, { children: [_jsx(TooltipTriggerBase, { children: "Hover" }), _jsx(TooltipContentBase, { children: _jsx("p", { children: "Add to library" }) })] }) }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "@/components/ui/TooltipBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<TooltipProviderBase>
  <TooltipBase>
    <TooltipTriggerBase>Hover</TooltipTriggerBase>
    <TooltipContentBase>
      <p>Add to library</p>
    </TooltipContentBase>
  </TooltipBase>
</TooltipProviderBase>` }) })] })] })] }));
};
