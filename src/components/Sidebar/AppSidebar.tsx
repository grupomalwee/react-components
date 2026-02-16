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
} from "@/components/ui/navigation/SidebarBase";

import {
  HouseIcon,
  WarningCircleIcon,
  UserCircleIcon,
  MedalIcon,
  TreeStructureIcon,
  CalendarBlankIcon,
  SquaresFourIcon,
  DotsThreeOutlineVerticalIcon,
  CheckSquareIcon,
TerminalWindowIcon,
  MagnifyingGlassIcon,
  SidebarIcon,
  SlidersHorizontalIcon,
  FunnelSimpleIcon,
  NotePencilIcon,
  TagChevronIcon,
  LinkIcon,
  KeyboardIcon,
  TextItalicIcon,
  RowsIcon,
  NavigationArrowIcon,
  DotsNineIcon,
  SpinnerGapIcon,
  RulerIcon,
  SpinnerIcon,
  ToggleRightIcon,
  TableIcon,
  ListDashesIcon,
  TextAlignLeftIcon,
  InfoIcon,
  CursorIcon,
  ImageIcon,
  ChatCenteredIcon,
} from "@phosphor-icons/react";

import { AlertDialogPage } from "@/pages/Alert-dialog";
import DestructiveDialogPage from "@/pages/DestructiveDialog";
import { AvatarPage } from "@/pages/Avatar";
import { ButtonPage } from "@/pages/Button";
// import { CalendarPage } from "@/pages/Calendar";
import { CardPage } from "@/pages/Card";
import { CheckBoxPage } from "@/pages/Checkbox";
import { CommandPage } from "@/pages/Command";
import { ComboboxPage } from "@/pages/Combobox";
import { CarouselPage } from "@/pages/Carousel";
import { CollapsiblePage } from "@/pages/Collapsible";
import { MultiComboboxPage } from "@/pages/Multicombobox";
import { DialogPage } from "@/pages/Dialog";
import DrawerPage from "@/pages/Drawer";
import { DropDownMenuPage } from "@/pages/Dropdown-menu";
import Filter from "@/pages/Filter";
// import { ProfileForm } from "@/pages/Form";
import { InputPage } from "@/pages/Input";
import InputOTPPage from "@/pages/InputOTP";
import { LabelPage } from "@/pages/Label";
import LoadingPage from "@/pages/Loading";
import { PopoverPage } from "@/pages/Popover";
import { ProgressPage } from "@/pages/Progress";
import { ScrollareaPage } from "@/pages/Scrollarea";
// import { SelectPage } from "@/pages/Select";
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
import { BarChartPage } from "@/pages/BarChart";
import { LineChartPage } from "@/pages/LineChart";
import DraggableTooltipPage from "@/pages/DraggableTooltip";
// import ChartPage from "@/pages/Chart";
import DatePickerPage from "@/pages/DatePicker";
import { FileUploaderPage } from "@/pages/FileUploader";
import { DebounceInputPage } from "@/pages/DebounceInput";
import ModalBasePage from "@/pages/Modal";
import RangePickerPage from "@/pages/RangePicker";

const items = [
  { title: "Home", url: "/", icon: HouseIcon },
  // { title: "Chart", url: "/chart", icon: HouseIcon },
  { title: "File", url: "/file", icon: HouseIcon },
  { title: "range", url: "/range", icon: HouseIcon },
  { title: "Modal", url: "/modal", icon: HouseIcon },
  { title: "Debounce Input", url: "/debounce-input", icon: HouseIcon },
  { title: "Alert Dialog", url: "/alert-dialog", icon: WarningCircleIcon },
  {
    title: "Destructive Dialog",
    url: "/destructive-dialog",
    icon: WarningCircleIcon,
  },
  { title: "Avatar", url: "/avatar", icon: UserCircleIcon },
  { title: "Bagde", url: "/badge", icon: MedalIcon },
  { title: "Bar Chart", url: "/bar-chart", icon: SpinnerGapIcon },
  { title: "Line Chart", url: "/line-chart", icon: ImageIcon },
  { title: "Draggable Tooltip", url: "/draggable-tooltip", icon: ImageIcon },
  { title: "Breadcrumb", url: "/breadcrumb", icon: TreeStructureIcon },
  { title: "Button", url: "/button", icon: CursorIcon },
  { title: "Calendar", url: "/calender", icon: CalendarBlankIcon },
  { title: "Card", url: "/card", icon: SquaresFourIcon },
  {
    title: "ContextMenu",
    url: "/contextmenu",
    icon: DotsThreeOutlineVerticalIcon,
  },
  { title: "Checkbox", url: "/checkbox", icon: CheckSquareIcon },
  { title: "Collapsible", url: "/collapsible", icon: ListDashesIcon },
  { title: "Command", url: "/command", icon: TerminalWindowIcon },
  { title: "Combobox", url: "/combobox", icon: MagnifyingGlassIcon },
  { title: "Carousel", url: "/carousel", icon: ImageIcon },
  { title: "Dialog", url: "/dialog", icon: ChatCenteredIcon },
  { title: "Drawer", url: "/drawer", icon: SidebarIcon },
  { title: "Dropdown Menu", url: "/dropdown-menu", icon: DotsNineIcon },
  { title: "Date Picker", url: "/date-picker", icon: DotsNineIcon },
  { title: "Filter", url: "/filter", icon: FunnelSimpleIcon },
  { title: "HoverCard", url: "/hovercard", icon: TagChevronIcon },
  { title: "Input", url: "/input", icon: NotePencilIcon },
  { title: "InputOTP", url: "/inputotp", icon: KeyboardIcon },
  { title: "Label", url: "/label", icon: TextItalicIcon },
  { title: "MultiCombobox", url: "/multicombobox", icon: RowsIcon },
  { title: "Navigation", url: "/navigationmenu", icon: NavigationArrowIcon },
  { title: "Popover", url: "/popover", icon: DotsThreeOutlineVerticalIcon },
  { title: "Progress", url: "/progress", icon: SpinnerGapIcon },
  { title: "Scrollarea", url: "/scrollarea", icon: RulerIcon },
  { title: "Select", url: "/select", icon: SpinnerIcon },
  { title: "Separator", url: "/separator", icon: LinkIcon },
  { title: "Sheet", url: "/sheet", icon: LinkIcon },
  { title: "Skeleton", url: "/skeleton", icon: LinkIcon },
  { title: "Slider", url: "/slider", icon: SlidersHorizontalIcon },
  { title: "Sonner", url: "/sonner", icon: ChatCenteredIcon },
  { title: "Switch", url: "/switch", icon: ToggleRightIcon },
  { title: "Table", url: "/table", icon: TableIcon },
  { title: "Tabs", url: "/tabs", icon: ListDashesIcon },
  { title: "Textarea", url: "/textarea", icon: TextAlignLeftIcon },
  { title: "Tooltip", url: "/tooltip", icon: InfoIcon },
  { title: "Comparação", url: "/comparison", icon: LinkIcon },
  { title: "Test Docs", url: "/test", icon: LinkIcon },
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
                        <Link
                          to={item.url}
                          style={{ display: "flex", alignItems: "center" }}
                        >
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
          {/* <Route path="/chart" element={<ChartPage />} /> */}
          <Route path="/file" element={<FileUploaderPage />} />
          <Route path="/range" element={<RangePickerPage />} />
          <Route path="/modal" element={<ModalBasePage />} />
          <Route path="/debounce-input" element={<DebounceInputPage />} />
          <Route path="/alert-dialog" element={<AlertDialogPage />} />
          <Route
            path="/destructive-dialog"
            element={<DestructiveDialogPage />}
          />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/badge" element={<BadgePage />} />
          <Route path="/bar-chart" element={<BarChartPage />} />
          <Route path="/line-chart" element={<LineChartPage />} />
          <Route path="/draggable-tooltip" element={<DraggableTooltipPage />} />
          <Route path="/button" element={<ButtonPage />} />
          <Route path="/breadcrumb" element={<BreadcrumbPage />} />
          {/* <Route path="/calender" element={<CalendarPage />} /> */}
          <Route path="/card" element={<CardPage />} />
          <Route path="/contextmenu" element={<ContextMenuPage />} />
          <Route path="/checkbox" element={<CheckBoxPage />} />
          <Route path="/collapsible" element={<CollapsiblePage />} />
          <Route path="/command" element={<CommandPage />} />
          <Route path="/combobox" element={<ComboboxPage />} />
          <Route path="/carousel" element={<CarouselPage />} />
          <Route path="/dialog" element={<DialogPage />} />
          <Route path="/drawer" element={<DrawerPage />} />
          <Route path="/dropdown-menu" element={<DropDownMenuPage />} />
          <Route path="/date-picker" element={<DatePickerPage />} />
          <Route path="/filter" element={<Filter />} />
          {/* <Route path="/form" element={<ProfileForm />} /> */}
          <Route path="/hovercard" element={<HoverCardPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/inputOTP" element={<InputOTPPage />} />
          <Route path="/label" element={<LabelPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/multicombobox" element={<MultiComboboxPage />} />
          <Route path="/navigationmenu" element={<NavigationMenuPage />} />
          <Route path="/popover" element={<PopoverPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/scrollarea" element={<ScrollareaPage />} />
          {/* <Route path="/select" element={<SelectPage />} /> */}
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
