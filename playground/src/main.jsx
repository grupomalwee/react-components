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
import {
  House,
  Envelope,
  Calendar,
  MagnifyingGlass,
  Gear,
  Warning,
  User,
  RadioButton,
  Cards,
  CheckCircle,
  Command,
  Chat,
  List,
  Funnel,
  FolderMinus,
  Table,
  PictureInPicture,
  Textbox,
  Sticker,
  AppWindow,
  Barcode,
  Minus,
  Scroll,
  Selection,
  ArrowsInLineVertical,
  CursorText,
  UserSwitch,
  ChatDots,
} from "phosphor-react";

import { AlertDialogPage } from "./pages/Alert-dialog";
import { AvatarPage } from "./pages/Avatar";
import { ButtonPage } from "./pages/Button";
import { CheckboxPage } from "./pages/Checkbox";
import { CommandPage } from "./pages/Command";
import Home from "./Home";

const items = [
  { title: "Home", url: "/", icon: House },
  { title: "Alert Dialog", url: "/alert-dialog", icon: Warning },
  { title: "Avatar", url: "/avatar", icon: User },
  { title: "Button", url: "/button", icon: RadioButton },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Card", url: "/card", icon: Cards },
  { title: "Checkbox", url: "/checkbox", icon: CheckCircle },
  { title: "Command", url: "/command", icon: Command },
  { title: "Dialog", url: "/dialog", icon: Chat },
  { title: "Dropdown Menu", url: "/dropdown-menu", icon: List },
  { title: "Filter", url: "/filter", icon: Funnel },
  { title: "Form", url: "/form", icon: Table },
  { title: "Input", url: "/input", icon: Textbox},
  { title: "Label", url: "/label", icon: Sticker },
  { title: "Popover", url: "/popover", icon: AppWindow },
  { title: "Progress", url: "/progress", icon: Minus },
  { title: "Scrollarea", url: "/scrollarea", icon: Scroll },
  { title: "Select", url: "/select", icon: Selection },
  { title: "Separator", url: "/separator", icon:  ArrowsInLineVertical},
  { title: "Sheet", url: "/sheet", icon: MagnifyingGlass },
  { title: "Skeleton", url: "/skeleton", icon: CursorText },
  { title: "Slider", url: "/slider", icon: House },
  { title: "Sonner", url: "/sonner", icon: ChatDots },
  { title: "Switch", url: "/switch", icon: UserSwitch },
  { title: "Table", url: "/table", icon: Table },
  { title: "Tabs", url: "/tabs", icon: Gear },
  { title: "Textarea", url: "/textarea", icon: Textbox },
  { title: "Tooltip", url: "/tooltip", icon: MagnifyingGlass },
];

// Layout com Sidebar
function LayoutWithSidebar() {
  return (
    <SidebarProviderBase>
      <div className="flex min-h-screen">
        <SidebarBase>
          <SidebarContentBase className="sidebar-scroll"> {/* Adicionando a classe sidebar-scroll */}
            <SidebarGroupBase>
              <SidebarGroupLabelBase><div className="text-lg mb-2">Componentes</div></SidebarGroupLabelBase>
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
          <Route path="/" element={<LayoutWithSidebar />} >
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
