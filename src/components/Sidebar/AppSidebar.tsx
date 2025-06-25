import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
  WarningCircle,
  UserCircle,
  Medal,
  TreeStructure,
  CalendarBlank,
  SquaresFour,
  FileText,
  ArchiveBox,
  DotsThreeOutlineVertical,
  CheckSquare,
  TerminalWindow,
  MagnifyingGlass,
  Sidebar,
  SlidersHorizontal,
  FunnelSimple,
  NotePencil,
  TagChevron,
  Link as LinkIcon,
  Keyboard,
  TextItalic,
  Rows,
  NavigationArrow,
  DotsNine,
  SpinnerGap,
  Ruler,
  Spinner,
  SpeakerHigh,
  ToggleRight,
  Table,
  ListDashes,
  TextAlignLeft,
  Info,
  FileSearch,
  Flask,
  Cursor,
  Image,
  ChatCentered,
} from "phosphor-react";

import { AlertDialogPage } from "@/pages/Alert-dialog";
import { AvatarPage } from "@/pages/Avatar";
import { ButtonPage } from "@/pages/Button";
import { CalendarPage } from "@/pages/Calendar";
import { CardPage } from "@/pages/Card";
import { CheckBoxPage } from "@/pages/Checkbox";
import { CommandPage } from "@/pages/Command";
import { ComboboxPage } from "@/pages/Combobox";
import { CarouselPage } from "@/pages/Carousel";
import { MultiComboboxPage } from "@/pages/Multicombobox";
import { DialogPage } from "@/pages/Dialog";
import DrawerPage from "@/pages/Drawer";
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
import { BadgePage } from "@/pages/Badge";
import { BreadcrumbPage } from "@/pages/Breadcrumb";
import { ContextMenuPage } from "@/pages/ContextMenu";
import { HoverCardPage } from "@/pages/HoverCard";
import { NavigationMenuPage } from "@/pages/NavigationMenu";
import DocsTests from "@/pages/Docs-tests";

const items = [
  { title: "Home", url: "/", icon: House },
  { title: "Alert Dialog", url: "/alert-dialog", icon: WarningCircle },
  { title: "Avatar", url: "/avatar", icon: UserCircle },
  { title: "Bagde", url: "/badge", icon: Medal },
  { title: "Breadcrumb", url: "/breadcrumb", icon: TreeStructure },
  { title: "Button", url: "/button", icon: Cursor },
  { title: "Calendar", url: "/calender", icon: CalendarBlank },
  { title: "Card", url: "/card", icon: SquaresFour },
  { title: "ContextMenu", url: "/contextmenu", icon: DotsThreeOutlineVertical },
  { title: "Checkbox", url: "/checkbox", icon: CheckSquare },
  { title: "Command", url: "/command", icon: TerminalWindow },
  { title: "Combobox", url: "/combobox", icon: MagnifyingGlass },
  { title: "Carousel", url: "/carousel", icon: Image },
  { title: "Dialog", url: "/dialog", icon: ChatCentered },
  { title: "Drawer", url: "/drawer", icon: Sidebar },
  { title: "Dropdown Menu", url: "/dropdown-menu", icon: DotsNine },
  { title: "Filter", url: "/Filter", icon: FunnelSimple },
  { title: "Form", url: "/form", icon: FileText },
  { title: "HoverCard", url: "/hovercard", icon: TagChevron },
  { title: "Input", url: "/input", icon: NotePencil },
  { title: "InputOTP", url: "/inputOTP", icon: Keyboard },
  { title: "Label", url: "/label", icon: TextItalic },
  { title: "MultiCombobox", url: "/multicombobox", icon: Rows },
  { title: "Navigation", url: "/navigationmenu", icon: NavigationArrow },
  { title: "Popover", url: "/popover", icon: DotsThreeOutlineVertical },
  { title: "Progress", url: "/progress", icon: SpinnerGap },
  { title: "Scrollarea", url: "/scrollarea", icon: Ruler },
  { title: "Select", url: "/select", icon: Spinner },
  { title: "Separator", url: "/separator", icon: LinkIcon },
  { title: "Sheet", url: "/sheet", icon: ArchiveBox },
  { title: "Skeleton", url: "/skeleton", icon: SpeakerHigh },
  { title: "Slider", url: "/slider", icon: SlidersHorizontal },
  { title: "Sonner", url: "/sonner", icon: ChatCentered },
  { title: "Switch", url: "/switch", icon: ToggleRight },
  { title: "Table", url: "/table", icon: Table },
  { title: "Tabs", url: "/tabs", icon: ListDashes },
  { title: "Textarea", url: "/textarea", icon: TextAlignLeft },
  { title: "Tooltip", url: "/tooltip", icon: Info },
  { title: "Comparação", url: "/comparison", icon: FileSearch },
  { title: "Test Docs", url: "/test", icon: Flask },
];

export function AppSidebar() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <SidebarBase>
          <SidebarContentBase>
            <SidebarGroupBase>
              <SidebarGroupLabelBase>Components</SidebarGroupLabelBase>
              <SidebarGroupContentBase>
                <SidebarMenuBase>
                  {items.map((item) => (
                    <SidebarMenuItemBase key={item.title}>
                      <SidebarMenuButtonBase asChild>
                        <Link to={item.url} style={{ display: "flex", alignItems: "center" }}>
                          <item.icon size={18} style={{ marginRight: 8 }} />
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
        <SidebarTriggerBase />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alert-dialog" element={<AlertDialogPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/badge" element={<BadgePage />} />
          <Route path="/button" element={<ButtonPage />} />
          <Route path="/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="/calender" element={<CalendarPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/contextmenu" element={<ContextMenuPage />} />
          <Route path="/checkbox" element={<CheckBoxPage />} />
          <Route path="/command" element={<CommandPage />} />
          <Route path="/combobox" element={<ComboboxPage />} />
          <Route path="/carousel" element={<CarouselPage />} />
          <Route path="/dialog" element={<DialogPage />} />
          <Route path="/drawer" element={<DrawerPage />} />
          <Route path="/dropdown-menu" element={<DropDownMenuPage />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/form" element={<ProfileForm />} />
          <Route path="/hovercard" element={<HoverCardPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/inputOTP" element={<InputOTPPage />} />
          <Route path="/label" element={<LabelPage />} />
          <Route path="/multicombobox" element={<MultiComboboxPage />} />
          <Route path="/navigationmenu" element={<NavigationMenuPage />} />
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
          <Route path="/test" element={<DocsTests />} />
        </Routes>
      </div>
    </Router>
  );
}
