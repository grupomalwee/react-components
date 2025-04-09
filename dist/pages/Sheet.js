"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import { SheetBase, SheetCloseBase, SheetContentBase, SheetDescriptionBase, SheetFooterBase, SheetHeaderBase, SheetTitleBase, SheetTriggerBase, } from "@/components/ui/SheetBase";
export const SheetPage = () => {
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: _jsxs(SheetBase, { children: [_jsx(SheetTriggerBase, { asChild: true, children: _jsx(ButtonBase, { variant: "outline", children: "Open" }) }), _jsxs(SheetContentBase, { children: [_jsxs(SheetHeaderBase, { children: [_jsx(SheetTitleBase, { children: "Edit profile" }), _jsx(SheetDescriptionBase, { children: "Make changes to your profile here. Click save when you're done." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(LabelBase, { htmlFor: "name", className: "text-right", children: "Name" }), _jsx(InputBase, { id: "name", value: "Pedro Duarte", className: "col-span-3" })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(LabelBase, { htmlFor: "username", className: "text-right", children: "Username" }), _jsx(InputBase, { id: "username", value: "@peduarte", className: "col-span-3" })] })] }), _jsx(SheetFooterBase, { children: _jsx(SheetCloseBase, { asChild: true, children: _jsx(ButtonBase, { type: "submit", children: "Save changes" }) }) })] })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
  ButtonBase
} from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import  LabelBase  from "@/components/ui/LabelBase";
import {
  SheetBase,
  SheetCloseBase,
  SheetContentBase,
  SheetDescriptionBase,
  SheetFooterBase,
  SheetHeaderBase,
  SheetTitleBase,
  SheetTriggerBase,
} from "@/components/ui/SheetBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<SheetBase>
  <SheetTriggerBase asChild>
    <ButtonBase variant="outline">Open</ButtonBase>
  </SheetTriggerBase>
  <SheetContentBase>
    <SheetHeaderBase>
      <SheetTitleBase>Edit profile</SheetTitleBase>
      <SheetDescriptionBase>
        Make changes to your profile here. Click save when you're done.
      </SheetDescriptionBase>
    </SheetHeaderBase>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <LabelBase htmlFor="name" className="text-right">
          Name
        </LabelBase>
        <InputBase
          id="name"
          value="Pedro Duarte"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <LabelBase htmlFor="username" className="text-right">
          Username
        </LabelBase>
        <InputBase
          id="username"
          value="@peduarte"
          className="col-span-3"
        />
      </div>
    </div>
    <SheetFooterBase>
      <SheetCloseBase asChild>
        <ButtonBase type="submit">Save changes</ButtonBase>
      </SheetCloseBase>
    </SheetFooterBase>
  </SheetContentBase>
</SheetBase>` }) })] })] })] }));
};
