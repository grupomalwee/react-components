import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AvatarBase, AvatarFallbackBase, AvatarImageBase, } from "@/components/ui/AvatarBase";
export const AvatarPage = () => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: [_jsx("div", { className: "flex justify-center", children: _jsxs(AvatarBase, { children: [_jsx(AvatarImageBase, { src: "https://github.com/shadcn.png" }), _jsx(AvatarFallbackBase, { children: "CN" })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/AvatarBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<AvatarBase>
  <AvatarImageBase src="https://github.com/shadcn.png" />
  <AvatarFallbackBase>CN</AvatarFallbackBase>
</AvatarBase>` }) })] })] })] }) }));
};
