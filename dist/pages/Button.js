import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ButtonBase } from "@/components/ui/ButtonBase";
export const ButtonPage = () => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: [_jsxs("div", { className: "flex gap-5 justify-center", children: [_jsx(ButtonBase, { children: "dad" }), _jsx(ButtonBase, { variant: "destructive", children: "dad" }), _jsx(ButtonBase, { variant: "ghost", children: "dad" }), _jsx(ButtonBase, { variant: "link", children: "dad" }), _jsx(ButtonBase, { variant: "outline", children: "dad" }), _jsx(ButtonBase, { variant: "secondary", children: "dad" })] }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { ButtonBase } from "@/components/ui/ButtonBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<ButtonBase>dad</ButtonBase>
<ButtonBase variant="destructive">dad</ButtonBase>
<ButtonBase variant="ghost">dad</ButtonBase>
<ButtonBase variant="link">dad</ButtonBase>
<ButtonBase variant="outline">dad</ButtonBase>
<ButtonBase variant="secondary">dad</ButtonBase>` }) })] })] })] }) }));
};
