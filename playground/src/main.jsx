import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

import "@lib/global.css";
import {
  ThemeProviderBase,
  SidebarBase,
  SidebarProviderBase,
  SidebarContentBase,
  SidebarGroupBase,
  SidebarGroupLabelBase,
  SidebarGroupContentBase,
  SidebarMenuBase,
  SidebarMenuItemBase,
  SidebarMenuButtonBase,
  ModeToggleBase,
} from "@lib";
import { House, Envelope, Calendar, MagnifyingGlass, Gear } from "phosphor-react";

import { AlertDialogPage } from "./pages/Alert-dialog";
import { AvatarPage } from "./pages/Avatar";
import { ButtonPage } from "./pages/Button";
import { CheckboxPage } from "./pages/Checkbox";
import { CommandPage } from "./pages/Command";
import Home from "./Home";

const items = [
  { title: "Alert Dialog", url: "/alert-dialog", icon: House },
  { title: "Avatar", url: "/avatar", icon: Envelope },
  { title: "Button", url: "/button", icon: Calendar },
  { title: "Calendar", url: "/calender", icon: Calendar },
  { title: "Card", url: "/card", icon: Calendar },
  { title: "Checkbox", url: "/checkbox", icon: MagnifyingGlass },
  { title: "Command", url: "/command", icon: Gear },
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
  { title: "Switch", url: "/switch", icon: Calendar },
  { title: "Table", url: "/table", icon: MagnifyingGlass },
  { title: "Tabs", url: "/tabs", icon: Gear },
  { title: "Textarea", url: "/textarea", icon: House },
  { title: "Tooltip", url: "/tooltip", icon: MagnifyingGlass },
];
// Layout com Sidebar
function LayoutWithSidebar() {
  return (
    <SidebarProviderBase>
      <div className="flex min-h-screen">
        <SidebarBase>
          <SidebarContentBase>
            <SidebarGroupBase>
              <SidebarGroupLabelBase>Componentes</SidebarGroupLabelBase>
              <SidebarGroupContentBase>
                <SidebarMenuBase>
                  {items.map((item) => (
                    <SidebarMenuItemBase key={item.url}>
                      <SidebarMenuButtonBase asChild>
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon size={18} />
                          {item.title}
                        </Link>
                      </SidebarMenuButtonBase>
                    </SidebarMenuItemBase>
                  ))}
                </SidebarMenuBase>
              </SidebarGroupContentBase>
            </SidebarGroupBase>
          </SidebarContentBase>
        </SidebarBase>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProviderBase>
  );
}

function App() {
  return (
    <ThemeProviderBase defaultTheme="light-purple" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="fixed top-4 right-4 z-50">
          <ModeToggleBase />
        </div>

        <Routes>
          <Route path="/" element={<LayoutWithSidebar />}>
            <Route index element={<Home />} />
            <Route path="/alert-dialog" element={<AlertDialogPage />} />
            <Route path="/avatar" element={<AvatarPage />} />
            <Route path="/button" element={<ButtonPage />} />
            <Route path="/checkbox" element={<CheckboxPage />} />
            <Route path="/command" element={<CommandPage />} />
            <Route path="*" element={<div className="p-10">404 - Página não encontrada</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProviderBase>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
