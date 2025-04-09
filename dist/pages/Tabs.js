"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TabsBase, TabsListBase, TabsTriggerBase, TabsContentBase, } from "@/components/ui/TabsBase";
export const TabsPage = () => {
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 p-3 rounded-sm", children: _jsxs(TabsBase, { children: [_jsxs(TabsListBase, { children: [_jsx(TabsTriggerBase, { value: "tab1", children: "Visao Geral" }), _jsx(TabsTriggerBase, { value: "tab2", children: "Adulto" }), _jsx(TabsTriggerBase, { value: "tab3", children: "Infantil" })] }), _jsxs(TabsContentBase, { value: "tab1", children: [_jsx("h2", { children: "Content for Tab 1" }), _jsx("p", { children: "This is some content for the first tab." })] }), _jsxs(TabsContentBase, { value: "tab2", children: [_jsx("h2", { children: "Content for Tab 2" }), _jsx("p", { children: "This is some content for the second tab." })] }), _jsxs(TabsContentBase, { value: "tab3", children: [_jsx("h2", { children: "Content for Tab 3" }), _jsx("p", { children: "This is some content for the third tab." })] })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { TabsBase, TabsListBase, TabsTriggerBase, TabsContentBase } from "@/components/ui/TabsBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<TabsBase>
  <TabsListBase>
    <TabsTriggerBase value="tab1">Tab 1</TabsTriggerBase>
    <TabsTriggerBase value="tab2">Tab 2</TabsTriggerBase>
    <TabsTriggerBase value="tab3">Tab 3</TabsTriggerBase>
  </TabsListBase>

  <TabsContentBase value="tab1">
    <h2>Content for Tab 1</h2>
    <p>This is some content for the first tab.</p>
  </TabsContentBase>
  <TabsContentBase value="tab2">
    <h2>Content for Tab 2</h2>
    <p>This is some content for the second tab.</p>
  </TabsContentBase>
  <TabsContentBase value="tab3">
    <h2>Content for Tab 3</h2>
    <p>This is some content for the third tab.</p>
  </TabsContentBase>
</TabsBase>` }) })] })] })] }));
};
