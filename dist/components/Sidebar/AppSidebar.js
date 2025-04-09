import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Importe os componentes do React Router
import { SidebarBase, SidebarContentBase, SidebarGroupBase, SidebarGroupContentBase, SidebarGroupLabelBase, SidebarMenuBase, SidebarMenuButtonBase, SidebarMenuItemBase, SidebarTriggerBase, } from "@/components/ui/SidebarBase";
import { House, Envelope, Calendar, MagnifyingGlass, Gear, } from "phosphor-react";
// Importando as páginas
import { AlertDialogPage } from "@/pages/Alert-dialog";
import { AvatarPage } from "@/pages/Avatar";
import { ButtonPage } from "@/pages/Button";
import { CalenderPage } from "@/pages/Calendar";
import { CardPage } from "@/pages/Card";
import { CheckBoxPage } from "@/pages/Checkbox";
import { CommandPage } from "@/pages/Command";
import { DialogPage } from "@/pages/Dialog";
import { DropDownMenuPage } from "@/pages/Dropdown-menu";
import Filter from "@/pages/Filter";
import { ProfileForm } from "@/pages/Form";
import { InputPage } from "@/pages/Input";
import { LabelPage } from "@/pages/Label";
import { PopoverPage } from "@/pages/Popover";
import { ProgressPage } from "@/pages/Progress";
import { ScrollareaPage } from "@/pages/Scrollarea";
import { SelectPage } from "@/pages/Select";
import { SeparatorPage } from "@/pages/Separator";
import { SheetPage } from "@/pages/Sheet";
import { SkeletonPage } from "@/pages/Skeleton";
import { SliderPage } from "@/pages/Slider";
import { SwitchPage } from "@/pages/Switch";
import { TablePage } from "@/pages/Table";
import { TabsPage } from "@/pages/Tabs";
import { TextareaPage } from "@/pages/Textarea";
import RootLayout from "@/pages/Sonner";
import { TooltipPage } from "@/pages/Tooltip";
// Menu items
const items = [
    { title: "Alert Dialog", url: "/alert-dialog", icon: House },
    { title: "Avatar", url: "/avatar", icon: Envelope },
    { title: "Button", url: "/button", icon: Calendar },
    { title: "Calendar", url: "/calender", icon: Calendar },
    { title: "Card", url: "/card", icon: Calendar },
    { title: "Checkbox", url: "/checkbox", icon: MagnifyingGlass },
    { title: "Command", url: "/command", icon: Gear },
    // { title: "Debounce Input", url: "/debounce-input", icon: House },
    { title: "Dialog", url: "/dialog", icon: Envelope },
    { title: "Dropdown Menu", url: "/dropdown-menu", icon: Calendar },
    { title: "Filter", url: "/Filter", icon: Calendar },
    { title: "Form", url: "/form", icon: Gear },
    { title: "Input", url: "/input", icon: Envelope },
    { title: "Label", url: "/label", icon: Calendar },
    { title: "Popover", url: "/popover", icon: MagnifyingGlass },
    { title: "Progress", url: "/progress", icon: Gear },
    { title: "Scrollarea", url: "/scrollarea", icon: House },
    { title: "Select", url: "/select", icon: Envelope },
    { title: "Separator", url: "/separator", icon: Calendar },
    { title: "Sheet", url: "/sheet", icon: MagnifyingGlass },
    { title: "Skeleton", url: "/skeleton", icon: Gear },
    { title: "Slider", url: "/slider", icon: House },
    { title: "Sonner", url: "/sonner", icon: Envelope },
    // { title: "Switch Input", url: "/switch-input", icon: Envelope },
    { title: "Switch", url: "/switch", icon: Calendar },
    { title: "Table", url: "/table", icon: MagnifyingGlass },
    { title: "Tabs", url: "/tabs", icon: Gear },
    { title: "Textarea", url: "/textarea", icon: House },
    { title: "Tooltip", url: "/tooltip", icon: MagnifyingGlass },
];
export function AppSidebar() {
    return (_jsx(Router, { children: _jsxs("div", { style: { display: "flex" }, children: [_jsx(SidebarBase, { children: _jsx(SidebarContentBase, { children: _jsxs(SidebarGroupBase, { children: [_jsx(SidebarGroupLabelBase, { children: "Components" }), _jsx(SidebarGroupContentBase, { children: _jsx(SidebarMenuBase, { children: items.map((item) => (_jsx(SidebarMenuItemBase, { children: _jsx(SidebarMenuButtonBase, { asChild: true, children: _jsxs(Link, { to: item.url, style: { display: "flex", alignItems: "center" }, children: [_jsx(item.icon, { style: { marginRight: "8px" } }), _jsx("span", { children: item.title })] }) }) }, item.title))) }) })] }) }) }), _jsx(SidebarTriggerBase, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/alert-dialog", element: _jsx(AlertDialogPage, {}) }), _jsx(Route, { path: "/avatar", element: _jsx(AvatarPage, {}) }), _jsx(Route, { path: "/button", element: _jsx(ButtonPage, {}) }), _jsx(Route, { path: "/calender", element: _jsx(CalenderPage, {}) }), _jsx(Route, { path: "/card", element: _jsx(CardPage, {}) }), _jsx(Route, { path: "/checkbox", element: _jsx(CheckBoxPage, {}) }), _jsx(Route, { path: "/command", element: _jsx(CommandPage, {}) }), _jsx(Route, { path: "/dialog", element: _jsx(DialogPage, {}) }), _jsx(Route, { path: "/dropdown-menu", element: _jsx(DropDownMenuPage, {}) }), _jsx(Route, { path: "/filter", element: _jsx(Filter, {}) }), _jsx(Route, { path: "/form", element: _jsx(ProfileForm, {}) }), _jsx(Route, { path: "/input", element: _jsx(InputPage, {}) }), _jsx(Route, { path: "/label", element: _jsx(LabelPage, {}) }), _jsx(Route, { path: "/popover", element: _jsx(PopoverPage, {}) }), _jsx(Route, { path: "/progress", element: _jsx(ProgressPage, {}) }), _jsx(Route, { path: "/scrollarea", element: _jsx(ScrollareaPage, {}) }), _jsx(Route, { path: "/select", element: _jsx(SelectPage, {}) }), _jsx(Route, { path: "/separator", element: _jsx(SeparatorPage, {}) }), _jsx(Route, { path: "/sheet", element: _jsx(SheetPage, {}) }), _jsx(Route, { path: "/skeleton", element: _jsx(SkeletonPage, {}) }), _jsx(Route, { path: "/slider", element: _jsx(SliderPage, {}) }), _jsx(Route, { path: "/switch", element: _jsx(SwitchPage, {}) }), _jsx(Route, { path: "/table", element: _jsx(TablePage, {}) }), _jsx(Route, { path: "/tabs", element: _jsx(TabsPage, {}) }), _jsx(Route, { path: "/textarea", element: _jsx(TextareaPage, {}) }), _jsx(Route, { path: "/sonner", element: _jsx(RootLayout, {}) }), _jsx(Route, { path: "/tooltip", element: _jsx(TooltipPage, {}) })] })] }) }));
}
