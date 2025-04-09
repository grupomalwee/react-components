import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import { PopoverBase, PopoverContentBase, PopoverTriggerBase, } from "@/components/ui/PopoverBase";
export function PopoverPage() {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm", children: _jsxs(PopoverBase, { children: [_jsx(PopoverTriggerBase, { asChild: true, children: _jsx(ButtonBase, { variant: "outline", children: "Open popover" }) }), _jsx(PopoverContentBase, { className: "w-80", children: _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium leading-none", children: "Dimensions" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Set the dimensions for the layer." })] }), _jsxs("div", { className: "grid gap-2", children: [_jsxs("div", { className: "grid grid-cols-3 items-center gap-4", children: [_jsx(LabelBase, { htmlFor: "width", children: "Width" }), _jsx(InputBase, { id: "width", defaultValue: "100%", className: "col-span-2 h-8" })] }), _jsxs("div", { className: "grid grid-cols-3 items-center gap-4", children: [_jsx(LabelBase, { htmlFor: "maxWidth", children: "Max. width" }), _jsx(InputBase, { id: "maxWidth", defaultValue: "300px", className: "col-span-2 h-8" })] }), _jsxs("div", { className: "grid grid-cols-3 items-center gap-4", children: [_jsx(LabelBase, { htmlFor: "height", children: "Height" }), _jsx(InputBase, { id: "height", defaultValue: "25px", className: "col-span-2 h-8" })] }), _jsxs("div", { className: "grid grid-cols-3 items-center gap-4", children: [_jsx(LabelBase, { htmlFor: "maxHeight", children: "Max. height" }), _jsx(InputBase, { id: "maxHeight", defaultValue: "none", className: "col-span-2 h-8" })] })] })] }) })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import  LabelBase  from "@/components/ui/LabelBase";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "@/components/ui/PopoverBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<PopoverBase>
  <PopoverTriggerBase asChild>
    <ButtonBase variant="outline">Open popover</ButtonBase>
  </PopoverTriggerBase>
  <PopoverContentBase className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <LabelBase htmlFor="width">Width</LabelBase>
          <InputBase
            id="width"
            defaultValue="100%"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <LabelBase htmlFor="maxWidth">Max. width</LabelBase>
          <InputBase
            id="maxWidth"
            defaultValue="300px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <LabelBase htmlFor="height">Height</LabelBase>
          <InputBase
            id="height"
            defaultValue="25px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <LabelBase htmlFor="maxHeight">Max. height</LabelBase>
          <InputBase
            id="maxHeight"
            defaultValue="none"
            className="col-span-2 h-8"
          />
        </div>
      </div>
    </div>
  </PopoverContentBase>
</PopoverBase>` }) })] })] })] }));
}
