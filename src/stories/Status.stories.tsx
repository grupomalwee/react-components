import "../style/global.css";
import { StatusIndicator } from "@/components/ui/data/StatusIndicator";
import { BellIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "32px 32px",
  gap: 12,
};

const meta: Meta<typeof StatusIndicator> = {
  title: "data/Status Indicator",
  component: StatusIndicator,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={centerStyle}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["green", "gray", "red", "yellow", "blue", "purple"],
    },
    size: { control: { type: "inline-radio" }, options: ["xs", "sm", "md"] },
    position: {
      control: { type: "select" },
      options: [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "inline",
      ],
    },

    show: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = {
  args: {
    color: "green",
    size: "sm",
    position: "top-right",
    show: true,
    children: (
      <div className="p-2 bg-white dark:bg-gray-900 border rounded-md shadow-sm items-center justify-center">
        <BellIcon />
      </div>
    ),
  },
};

export const Inline: Story = {
  args: {
    position: "inline",
    color: "green",
    size: "sm",
    show: true,
    children: "Online",
  },
};

export const AllPositions: Story = {
  render: (args) => {
    const positions: Array<
      "top-right" | "top-left" | "bottom-right" | "bottom-left"
    > = ["top-right", "top-left", "bottom-right", "bottom-left"];

    return (
      <div
        className="flex gap-8 items-center p-6 justify-center "
        style={centerStyle}
      >
        {positions.map((pos) => (
          <div key={pos} className="flex flex-col items-center gap-2">
            <StatusIndicator {...args} position={pos} show>
              <div className="w-20 h-20 bg-white dark:bg-gray-800 border rounded-md flex items-center justify-center">
                Box
              </div>
            </StatusIndicator>
            <span className="text-sm text-muted-foreground">{pos}</span>
          </div>
        ))}
      </div>
    );
  },
  args: {
    color: "red",
    size: "sm",
  },
};
