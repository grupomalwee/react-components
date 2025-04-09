import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DropDownMenuBase, DropDownMenuContentBase, DropDownMenuItemBase, DropDownMenuLabelBase, DropDownMenuSeparatorBase, DropDownMenuTriggerBase, } from "@/components/ui/DropDownMenuBase";
export const DropDownMenuPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: _jsxs(DropDownMenuBase, { children: [_jsx(DropDownMenuTriggerBase, { children: "Open" }), _jsxs(DropDownMenuContentBase, { children: [_jsx(DropDownMenuLabelBase, { children: "My Account" }), _jsx(DropDownMenuSeparatorBase, {}), _jsx(DropDownMenuItemBase, { children: "Profile" }), _jsx(DropDownMenuItemBase, { children: "Billing" }), _jsx(DropDownMenuItemBase, { children: "Team" }), _jsx(DropDownMenuItemBase, { children: "Subscription" })] })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/DropDownMenuBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<DropDownMenuBase>
  <DropDownMenuTriggerBase>Open</DropDownMenuTriggerBase>
  <DropDownMenuContentBase>
    <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
    <DropDownMenuSeparatorBase />
    <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
    <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
    <DropDownMenuItemBase>Team</DropDownMenuItemBase>
    <DropDownMenuItemBase>Subscription</DropDownMenuItemBase>
  </DropDownMenuContentBase>
</DropDownMenuBase>` }) })] })] })] }));
};
