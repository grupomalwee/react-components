import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProviderBase } from "@/components/theme-provider";
import "./style/global.css";
// Components
import { ModeToggleBase } from "./components/mode-toggle";
import { SidebarProviderBase } from "@/components/ui/SidebarBase";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
function App() {
    return (_jsx("div", { children: _jsx(ThemeProviderBase, { defaultTheme: "light-blue", storageKey: "vite-ui-theme", children: _jsxs("div", { className: "flex", children: [_jsxs(SidebarProviderBase, { children: [_jsx(AppSidebar, {}), _jsx("main", {})] }), _jsx("div", { className: "mt-3 mr-5 border border-solid border-[#fff] inline-block rounded-md h-10", children: _jsx(ModeToggleBase, {}) })] }) }) }));
}
export default App;
