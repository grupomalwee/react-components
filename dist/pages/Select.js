"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SelectBase, SelectContentBase, SelectGroupBase, SelectItemBase, SelectLabelBase, SelectTriggerBase, SelectValueBase, } from "@/components/ui/SelectBase";
export const SelectPage = () => {
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: _jsxs(SelectBase, { children: [_jsx(SelectTriggerBase, { className: "w-[180px]", children: _jsx(SelectValueBase, { placeholder: "Select a fruit" }) }), _jsx(SelectContentBase, { children: _jsxs(SelectGroupBase, { children: [_jsx(SelectLabelBase, { children: "Fruits" }), _jsx(SelectItemBase, { value: "apple", children: "Apple" }), _jsx(SelectItemBase, { value: "banana", children: "Banana" }), _jsx(SelectItemBase, { value: "blueberry", children: "Blueberry" }), _jsx(SelectItemBase, { value: "grapes", children: "Grapes" }), _jsx(SelectItemBase, { value: "pineapple", children: "Pineapple" })] }) })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
  SelectBase,
  SelectContentBase,
  SelectGroupBase,
  SelectItemBase,
  SelectLabelBase,
  SelectTriggerBase,
  SelectValueBase
} from "@/components/ui/SelectBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<SelectBase>
  <SelectTriggerBase className="w-[180px]">
    <SelectValueBase placeholder="Select a fruit" />
  </SelectTriggerBase>
  <SelectContentBase>
    <SelectGroupBase>
      <SelectLabelBase>Fruits</SelectLabelBase>
      <SelectItemBase value="apple">Apple</SelectItemBase>
      <SelectItemBase value="banana">Banana</SelectItemBase>
      <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
      <SelectItemBase value="grapes">Grapes</SelectItemBase>
      <SelectItemBase value="pineapple">Pineapple</SelectItemBase>
    </SelectGroupBase>
  </SelectContentBase>
</SelectBase>` }) })] })] })] }));
};
