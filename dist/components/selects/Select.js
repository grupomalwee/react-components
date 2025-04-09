import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SelectContentBase, SelectGroupBase, SelectItemBase, SelectLabelBase, SelectBase as SelectPrimitiveBase, SelectTriggerBase, SelectValueBase, } from "@/components/ui/SelectBase";
import { cn } from "@/lib/utils";
import { ScrollAreaBase } from "../ui/ScrollareaBase";
export function Select({ items, groupItems, placeholder, onChange, errorMessage, }) {
    return (_jsxs("div", { children: [_jsxs(SelectPrimitiveBase, { onValueChange: onChange, children: [_jsx(SelectTriggerBase, { className: cn("flex h-12 w-full content-start text-lg shadow-md", errorMessage && "border-red-500"), children: _jsx(SelectValueBase, { placeholder: placeholder }) }), _jsx(ScrollAreaBase, { children: _jsx(SelectContentBase, { children: groupItems ? (Object.keys(groupItems).map((key) => (_jsxs(SelectGroupBase, { children: [_jsx(SelectLabelBase, { children: key }), groupItems[key].map((item) => (_jsx(SelectItemBase, { value: item.value, children: item.label }, item.value)))] }, key)))) : (_jsx(SelectGroupBase, { children: items.map((item) => (_jsx(SelectItemBase, { value: item.value, children: item.label }, item.value))) })) }) })] }), errorMessage && _jsx("p", { className: "text-sm text-red-500", children: errorMessage })] }));
}
