import {
  HoverCardBase,
  HoverCardContentBase,
  HoverCardTriggerBase,
} from "@/components/ui/form/HoverCardBase";
import "../style/global.css";
import { StatusIndicator } from "@/components/ui/data/StatusIndicator";
import { BellIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/data/AvatarBase";

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "32px",
  gap: 12,
};

const meta: Meta<typeof StatusIndicator> = {
  title: "data/Status Indicator",
  component: StatusIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Indicador de status para elementos (ex.: avatar, ícone ou texto). Suporta posições e tamanhos configuráveis.",
      },
      source: {
        code: `import React from 'react';
import { StatusIndicator } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <StatusIndicator color="green" size="sm" position="top-right" show>
      <div style={{ width: 48, height: 48, borderRadius: 8, background: '#fff' }} />
    </StatusIndicator>
  );
}
`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#111827" },
      ],
    },
    layout: "centered",
  },
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
  args: {
    color: "green",
    size: "sm",
    position: "top-right",
    show: true,
  },
};

export default meta;

type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = {
  render: (args) => (
    <StatusIndicator {...args}>
      <div className="p-2 bg-white dark:bg-gray-900 border rounded-md shadow-sm flex items-center justify-center">
        <BellIcon />
      </div>
    </StatusIndicator>
  ),
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
export const Hover: Story = {
  render: (args) => (
    <div className="flex gap-8 items-center justify-center" style={centerStyle}>
      <StatusIndicator {...args}>
        <div className="flex flex-col items-center gap-2 border rounded-md p-2">
          <HoverCardBase>
            <HoverCardTriggerBase asChild>
              <BellIcon size={16} />
            </HoverCardTriggerBase>
            <HoverCardContentBase className="w-80">
              <div className="flex justify-between gap-4">
                <AvatarBase>
                  <AvatarImageBase src="https://github.com/grupomalwee.png" />
                  <AvatarFallbackBase>VC</AvatarFallbackBase>
                </AvatarBase>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@mlw-packages</h4>
                  <p className="text-sm">
                    The React Components Library by @grupomalwee.
                  </p>
                  <div className="text-xs text-muted-foreground">2025</div>
                </div>
              </div>
            </HoverCardContentBase>
          </HoverCardBase>
        </div>
      </StatusIndicator>
    </div>
  ),
  args: {},
};
