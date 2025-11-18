import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeBase } from "../components/ui/data/BadgeBase";

type BadgeStoryProps = {
  children?: string;
  size?: "sm" | "md" | "lg";
  color?: "green" | "gray" | "red" | "yellow" | "blue" | "purple";
};

const BadgeStory = ({
  children = "Badge",
  size = "md",
  color,
}: BadgeStoryProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <BadgeBase size={size} color={color} data-testid="badge">
        {children}
      </BadgeBase>
    </div>
  );
};

const meta: Meta<typeof BadgeStory> = {
  title: "data/Badge",
  component: BadgeStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge para exibir status, categorias ou informações rápidas. Use as props `size` (sm, md, lg) e `color` (green, gray, red, yellow, purple, blue).",
      },
      source: {
        code: `import React from 'react';
import { BadgeBase } from '@mlw-packages/react-components';

export default function Example() {
  return <BadgeBase size="md">Badge</BadgeBase>;
}
`,
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
  argTypes: {
    children: {
      control: "text",
      description: "Texto exibido no badge",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do badge",
    },
    color: {
      control: "select",
      options: ["green", "gray", "red", "yellow", "purple", "blue"],
      description: "Cor do badge (aplica background e cor do texto)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeStory>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { BadgeBase } from '@mlw-packages/react-components';

export default function Default() {
  return <BadgeBase size="md">Badge</BadgeBase>;
}
`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
        flexWrap: "wrap",
      }}
    >
      <BadgeBase data-testid="badge-size-sm" size="sm">
        sm
      </BadgeBase>
      <BadgeBase data-testid="badge-size-md" size="md">
        md
      </BadgeBase>
      <BadgeBase data-testid="badge-size-lg" size="lg">
        lg
      </BadgeBase>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        <BadgeBase data-testid="badge-color-green" color="green">
          Green
        </BadgeBase>
        <BadgeBase data-testid="badge-color-gray" color="gray">
          Gray
        </BadgeBase>
        <BadgeBase data-testid="badge-color-red" color="red">
          Red
        </BadgeBase>
        <BadgeBase data-testid="badge-color-yellow" color="yellow">
          Yellow
        </BadgeBase>
        <BadgeBase data-testid="badge-color-blue" color="blue">
          Blue
        </BadgeBase>
        <BadgeBase data-testid="badge-color-blue" color="purple">
          Purple
        </BadgeBase>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { BadgeBase } from '@mlw-packages/react-components';

export default function Variants() {
  return (
    <div>
      <BadgeBase size="md">Default</BadgeBase>
      <BadgeBase size="sm">Small</BadgeBase>
      //
      <BadgeBase color="green">Green</BadgeBase>
      <BadgeBase color="gray">Green</BadgeBase>
      <BadgeBase color="red">Green</BadgeBase>
      <BadgeBase color="yellow">Green</BadgeBase>
      <BadgeBase color="blue">Green</BadgeBase>
      <BadgeBase color="purple">Green</BadgeBase>
    </div>
  );
}
`,
      },
    },
  },
};
