import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModeToggleBase } from "../components/mode-toggle";
import { ThemeProviderBase } from "../components/theme-provider";

const meta: Meta<typeof ModeToggleBase> = {
  title: "Mode Toggle",
  component: ModeToggleBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ModeToggle para alternância de temas, incluindo opções customizadas.",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ModeToggleBase>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <ThemeProviderBase>
        <ModeToggleBase
          themes={[
            "light",
            "dark",
            "system",
            "light-purple",
            "dark-purple",
            "light-blue",
            "dark-blue",
            "light-green",
            "dark-green",
          ]}
        />
      </ThemeProviderBase>
    </div>
  ),
};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import React from 'react';
import { ThemeProviderBase, ModeToggleBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <ThemeProviderBase>
      <ModeToggleBase themes={["light", "dark", "system"]} />
    </ThemeProviderBase>
  );
}`,
    },
  },
};

Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      code: `import React from 'react';
import { ThemeProviderBase, ModeToggleBase } from '@mlw-packages/react-components';

export const Default = () => (
  <ThemeProviderBase>
    <ModeToggleBase themes={["light","dark","system"]} />
  </ThemeProviderBase>
);`,
    },
  },
};
