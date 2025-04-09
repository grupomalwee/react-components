import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Copy } from "phosphor-react";
import { DialogBase, DialogContentBase, DialogDescriptionBase, DialogHeaderBase, DialogTitleBase, DialogTriggerBase, DialogFooterBase, DialogCloseBase, } from "@/components/ui/DialogBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import { ButtonBase } from "@/components/ui/ButtonBase";
export const DialogPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 p-3 rounded-sm", children: _jsxs(DialogBase, { children: [_jsx(DialogTriggerBase, { asChild: true, children: _jsx(ButtonBase, { variant: "outline", children: "Share" }) }), _jsxs(DialogContentBase, { className: "sm:max-w-md", children: [_jsxs(DialogHeaderBase, { children: [_jsx(DialogTitleBase, { children: "Share link" }), _jsx(DialogDescriptionBase, { children: "Anyone who has this link will be able to view this." })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "grid flex-1 gap-2", children: [_jsx(LabelBase, { htmlFor: "link", className: "sr-only", children: "Link" }), _jsx(InputBase, { id: "link", defaultValue: "https://ui.shadcn.com/docs/installation", readOnly: true })] }), _jsxs(ButtonBase, { type: "submit", size: "sm", className: "px-3", children: [_jsx("span", { className: "sr-only", children: "Copy" }), _jsx(Copy, {})] })] }), _jsx(DialogFooterBase, { className: "sm:justify-start", children: _jsx(DialogCloseBase, { asChild: true, children: _jsx(ButtonBase, { type: "button", variant: "secondary", children: "Close" }) }) })] })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { Copy } from "lucide-react";

import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
  DialogFooterBase,
  DialogCloseBase,
} from "@/components/ui/DialogBase";
import { InputBase } from "@/components/ui/InputBase";
import  LabelBase  from "@/components/ui/LabelBase";
import { ButtonBase } from "@/components/ui/ButtonBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<DialogBase>
  <DialogTriggerBase asChild>
    <ButtonBase variant="outline">Share</ButtonBase>
  </DialogTriggerBase>
  <DialogContentBase className="sm:max-w-md">
    <DialogHeaderBase>
      <DialogTitleBase>Share link</DialogTitleBase>
      <DialogDescriptionBase>
        Anyone who has this link will be able to view this.
      </DialogDescriptionBase>
    </DialogHeaderBase>
    <div className="flex items-center space-x-2">
      <div className="grid flex-1 gap-2">
        <LabelBase htmlFor="link" className="sr-only">Link</LabelBase>
        <InputBase id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
      </div>
      <ButtonBase type="submit" size="sm" className="px-3">
        <span className="sr-only">Copy</span>
        <Copy />
      </ButtonBase>
    </div>
    <DialogFooterBase className="sm:justify-start">
      <DialogCloseBase asChild>
        <ButtonBase type="button" variant="secondary">Close</ButtonBase>
      </DialogCloseBase>
    </DialogFooterBase>
  </DialogContentBase>
</DialogBase>` }) })] })] })] }));
};
