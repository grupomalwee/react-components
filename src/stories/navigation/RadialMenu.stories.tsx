import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadialMenu } from "@/components/ui/navigation/RadialMenu";
import {
  TrashIcon,
  CopyIcon,
  DownloadIcon,
  PencilIcon,
  HouseIcon,
  GearIcon,
  UserIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";

const meta: Meta<typeof RadialMenu> = {
  title: "Navigation/RadialMenu",
  component: RadialMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A circular context menu that appears on right-click or long-press (1s).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "range", min: 100, max: 500, step: 10 } },
    iconSize: { control: { type: "range", min: 12, max: 48, step: 2 } },
    bandWidth: { control: { type: "range", min: 20, max: 100, step: 5 } },
    innerGap: { control: { type: "range", min: 0, max: 50, step: 2 } },
    outerGap: { control: { type: "range", min: 0, max: 50, step: 2 } },
    outerRingWidth: { control: { type: "range", min: 0, max: 20, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof RadialMenu>;

const demoItems = [
  { id: 1, label: "Edit", icon: PencilIcon },
  { id: 2, label: "Copy", icon: CopyIcon },
  { id: 4, label: "Download", icon: DownloadIcon },
  { id: 6, label: "Delete", icon: TrashIcon },
];

const navItems = [
  { id: 1, label: "Home", icon: HouseIcon },
  { id: 2, label: "Profile", icon: UserIcon },
  { id: 3, label: "Settings", icon: GearIcon },
  { id: 4, label: "Notifications", icon: BellIcon },
  { id: 5, label: "Search", icon: MagnifyingGlassIcon },
];

export const Default: Story = {
  args: {
    menuItems: demoItems,
    size: 260,
    iconSize: 24,
    bandWidth: 60,
    innerGap: 16,
    outerGap: 12,
    outerRingWidth: 8,
    onSelect: (item) => alert(`Selected: ${item.label}`),
  },
  render: (args) => (
    <div className="flex items-center justify-center w-[600px] h-[400px] bg-muted/20 rounded-xl border border-dashed border-border">
      <RadialMenu {...args}>
        <div className="flex items-center justify-center size-64 bg-background border rounded-2xl shadow-sm text-muted-foreground font-medium select-none cursor-pointer hover:shadow-md transition-all">
          Right-click or Long-press me (1s)
        </div>
      </RadialMenu>
    </div>
  ),
};

export const MobileSimulation: Story = {
  args: {
    menuItems: navItems,
    size: 220,
    iconSize: 20,
    bandWidth: 50,
    innerGap: 10,
    outerGap: 10,
    onSelect: (item) => console.log(`Navigating to: ${item.label}`),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <div className="flex flex-col items-center justify-center w-[375px] h-[667px] bg-background border rounded-[40px] overflow-hidden shadow-2xl relative">
      {/* Fake Mobile UI */}
      <div className="absolute top-0 w-full h-8 bg-black/5 flex justify-between px-6 items-center text-[10px] font-bold text-black/40">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="size-2.5 bg-black/40 rounded-full" />
          <div className="size-2.5 bg-black/40 rounded-full" />
          <div className="w-4 h-2.5 bg-black/40 rounded-[2px]" />
        </div>
      </div>

      <RadialMenu {...args}>
        <div className="w-64 h-32 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-semibold">
          Long Press Here
        </div>
      </RadialMenu>

      <div className="absolute bottom-2 w-32 h-1 bg-black/20 rounded-full" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    menuItems: demoItems,
    size: 280,
    iconSize: 24,
    bandWidth: 65,
    onSelect: (item) => console.log(item),
  },
  render: (args) => (
    <div className="flex items-center justify-center min-h-[500px] w-full bg-grid-black/[0.02] dark:bg-grid-white/[0.02] relative">
      <RadialMenu {...args} />
    </div>
  ),
};
