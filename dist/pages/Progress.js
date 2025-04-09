"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ProgressBase } from "@/components/ui/ProgressBase";
export const ProgressPage = () => {
    const [progress, setProgress] = React.useState(13);
    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm", children: _jsx(ProgressBase, { value: progress, className: "w-full" }) }), _jsxs("div", { className: "mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm", children: [_jsx(ProgressBase, { value: progress, className: "w-[20%]" }), _jsx(ProgressBase, { value: progress, className: "w-[50%]" }), _jsx(ProgressBase, { value: progress, className: "w-[70%]" }), _jsx(ProgressBase, { value: progress, className: "w-[90%]" })] }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import * as React from "react";
import { ProgressBase } from "@/components/ui/ProgressBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `const [progress, setProgress] = React.useState(13);

React.useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500);
  return () => clearTimeout(timer);
}, []);

<ProgressBase value={progress} className="w-full" />
<ProgressBase value={progress} className="w-[20%]" />
<ProgressBase value={progress} className="w-[50%]" />
<ProgressBase value={progress} className="w-[70%]" />
<ProgressBase value={progress} className="w-[90%]" />` }) })] })] })] }));
};
