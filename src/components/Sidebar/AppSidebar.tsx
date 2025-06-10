import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Importe os componentes do React Router
import {
  SidebarBase,
  SidebarContentBase,
  SidebarGroupBase,
  SidebarGroupContentBase,
  SidebarGroupLabelBase,
  SidebarMenuBase,
  SidebarMenuButtonBase,
  SidebarMenuItemBase,
  SidebarTriggerBase,
} from "@/components/ui/SidebarBase";
import {
  House,
  Envelope,
  Calendar,
  MagnifyingGlass,
  Gear,
} from "phosphor-react";

// Importando as páginas
import { AlertDialogPage } from "@/pages/Alert-dialog";
import { AvatarPage } from "@/pages/Avatar";
import { ButtonPage } from "@/pages/Button";
import { CalenderPage } from "@/pages/Calendar";
import { CardPage } from "@/pages/Card";
import { CheckBoxPage } from "@/pages/Checkbox";
import { CommandPage } from "@/pages/Command";
import { ComboboxPage } from "@/pages/Combobox";
import { CarouselPage } from "@/pages/Carousel";
import { MultiComboboxPage } from "@/pages/Multicombobox";
import { DialogPage } from "@/pages/Dialog";
import  DrawerPage  from "@/pages/Drawer";
import { DropDownMenuPage } from "@/pages/Dropdown-menu";
import Filter from "@/pages/Filter";
import { ProfileForm } from "@/pages/Form";
import { InputPage } from "@/pages/Input";
import InputOTPPage from "@/pages/InputOTP";
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
import Home from "@/pages/Home";
import Comparison from "@/pages/Comparasion"; 

// Menu items
const items = [
  { title: "Home", url: "/", icon: House },
  { title: "Alert Dialog", url: "/alert-dialog", icon: House },
  { title: "Avatar", url: "/avatar", icon: Envelope },
  { title: "Button", url: "/button", icon: Calendar },
  { title: "Calendar", url: "/calender", icon: Calendar },
  { title: "Card", url: "/card", icon: Calendar },
  { title: "Checkbox", url: "/checkbox", icon: MagnifyingGlass },
  { title: "Command", url: "/command", icon: Gear },
  { title: "Combobox", url: "/combobox", icon: MagnifyingGlass },
  { title: "Carousel", url: "/carousel", icon: Gear },
  // { title: "Debounce Input", url: "/debounce-input", icon: House },
  { title: "Dialog", url: "/dialog", icon: Envelope },
  { title: "Drawer", url: "/drawer", icon: Envelope },
  { title: "Dropdown Menu", url: "/dropdown-menu", icon: Calendar },
  { title: "Filter", url: "/Filter", icon: Calendar },
  { title: "Form", url: "/form", icon: Gear },
  { title: "Input", url: "/input", icon: Envelope },
  { title: "InputOTP", url: "/inputOTP", icon: Envelope },
  { title: "Label", url: "/label", icon: Calendar },
  { title: "MultiCombobox", url: "/multicombobox", icon: Gear },
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
  { title: "Comparação", url: "/comparison", icon: MagnifyingGlass },
];

export function AppSidebar() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <SidebarBase>
          <SidebarContentBase>
            <SidebarGroupBase>
              <SidebarGroupLabelBase>Components</SidebarGroupLabelBase>
              <SidebarGroupContentBase>
                <SidebarMenuBase>
                  {items.map((item) => (
                    <SidebarMenuItemBase key={item.title}>
                      <SidebarMenuButtonBase asChild>
                        <Link
                          to={item.url} // Use 'to' ao invés de 'href'
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <item.icon style={{ marginRight: "8px" }} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButtonBase>
                    </SidebarMenuItemBase>
                  ))}
                </SidebarMenuBase>
              </SidebarGroupContentBase>
            </SidebarGroupBase>
          </SidebarContentBase>
        </SidebarBase>
        <SidebarTriggerBase></SidebarTriggerBase>

        {/* Main Content */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alert-dialog" element={<AlertDialogPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/button" element={<ButtonPage />} />
          <Route path="/calender" element={<CalenderPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/checkbox" element={<CheckBoxPage />} />
          <Route path="/command" element={<CommandPage />} />
          <Route path="/combobox" element={<ComboboxPage />} />
          <Route path="/carousel" element={<CarouselPage />} />
          <Route path="/dialog" element={<DialogPage />} />
          <Route path="/drawer" element={<DrawerPage />} />
          <Route path="/dropdown-menu" element={<DropDownMenuPage />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/form" element={<ProfileForm />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/inputOTP" element={<InputOTPPage />} />
          <Route path="/label" element={<LabelPage />} />
          <Route path="/multicombobox" element={<MultiComboboxPage />} />
          <Route path="/popover" element={<PopoverPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/scrollarea" element={<ScrollareaPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/separator" element={<SeparatorPage />} />
          <Route path="/sheet" element={<SheetPage />} />
          <Route path="/skeleton" element={<SkeletonPage />} />
          <Route path="/slider" element={<SliderPage />} />
          <Route path="/switch" element={<SwitchPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/tabs" element={<TabsPage />} />
          <Route path="/textarea" element={<TextareaPage />} />
          <Route path="/sonner" element={<RootLayout />} />
          <Route path="/tooltip" element={<TooltipPage />} />
          <Route path="/comparison" element={<Comparison />} />
        </Routes>
      </div>
    </Router>
  );
}
