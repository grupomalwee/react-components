import React, { useState } from "react";
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
  Table,
  Textbox,
  Sticker,
  AppWindow,
  Minus,
  Scroll,
  Selection,
  ArrowsInLineVertical,
  CursorText,
  UserSwitch,
  ChatDots,
  Sidebar, // Importando o ícone Sidebar
} from "phosphor-react";

import { AlertDialogPage } from "./pages/Alert-dialog";
import { AvatarPage } from "./pages/Avatar";
import { ButtonPage } from "./pages/Button";
import { CheckboxPage } from "./pages/Checkbox";
import { CommandPage } from "./pages/Command";
import { ProfileForm } from "./pages/Form";
import { CalendarPage } from "./pages/Calendar";
import { CardPage } from "./pages/Card";
import { DialogPage } from "./pages/Dialog";
import { DropDownMenuPage } from "./pages/Dropdown-menu";
import { InputPage } from "./pages/Input";
import { ProgressPage } from "./pages/Progress";
import { PopoverPage } from "./pages/Popover";
import { ScrollareaPage } from "./pages/Scrollarea";
import { SelectPage } from "./pages/Select";
import { SeparatorPage } from "./pages/Separator";
import { SkeletonPage } from "./pages/Skeleton";
import { SliderPage } from "./pages/Slider";
import { SheetPage } from "./pages/Sheet";
import { SonnerPage } from "./pages/Sonner";
import { SwitchPage } from "./pages/Switch";
import { TablePage } from "./pages/Table";
import { TabsPage } from "./pages/Tabs";
import { TextareaPage } from "./pages/Textarea";
import { TooltipPage } from "./pages/Tooltip";
import Home from "./Home";

// Itens da sidebar (ordenados alfabeticamente)
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
  { title: "Input", url: "/input", icon: Textbox },
  { title: "Label", url: "/label", icon: Sticker },
  { title: "Popover", url: "/popover", icon: AppWindow },
  { title: "Progress", url: "/progress", icon: Minus },
  { title: "Scrollarea", url: "/scrollarea", icon: Scroll },
  { title: "Select", url: "/select", icon: Selection },
  { title: "Separator", url: "/separator", icon: ArrowsInLineVertical },
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

// Função para Layout com Sidebar
function LayoutWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar a sidebar

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <SidebarProviderBase>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <SidebarBase className={`transition-all ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          <div className="flex justify-end">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-800 p-2"
            >
              <Sidebar size={18} />
            </button>
          </div>

          {isSidebarOpen && (
            <SidebarContentBase className="sidebar-scroll">
              <SidebarGroupBase>
                <SidebarGroupLabelBase>
                  <div className="text-lg mb-2">Componentes</div>
                </SidebarGroupLabelBase>
                <SidebarGroupContentBase>
                  <SidebarMenuBase>
                    {items
                      .sort((a, b) => a.title.localeCompare(b.title)) // Ordena os itens alfabeticamente
                      .map((item) => (
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
          )}
        </SidebarBase>

        {/* Conteúdo principal */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProviderBase>
  );
}

// Função principal do App
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
            <Route path="/card" element={<CardPage />} />
            <Route path="/form" element={<ProfileForm />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/dialog" element={<DialogPage />} />
            <Route path="/dropdown-menu" element={<DropDownMenuPage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/scrollarea" element={<ScrollareaPage />} />
            <Route path="/select" element={<SelectPage />} />
            <Route path="/separator" element={<SeparatorPage />} />
            <Route path="/popover" element={<PopoverPage />} />
            <Route path="/skeleton" element={<SkeletonPage />} />
            <Route path="/slider" element={<SliderPage />} />
            <Route path="/sonner" element={<SonnerPage />} />
            <Route path="/switch" element={<SwitchPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/tabs" element={<TabsPage />} />
            <Route path="/textarea" element={<TextareaPage />} />
            <Route path="/tooltip" element={<TooltipPage />} />
            <Route path="/sheet" element={<SheetPage />} />
            <Route path="*" element={<div className="p-10">404 - Página não encontrada</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProviderBase>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
