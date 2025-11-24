import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../components/ui/data/Badge";

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
      <Badge size={size} color={color} data-testid="badge">
        {children}
      </Badge>
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
import { Badge } from '@mlw-packages/react-components';

export default function Example() {
  return <Badge size="md">Badge</Badge>;
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
import { Badge } from '@mlw-packages/react-components';

export default function Default() {
  return <Badge size="md">Badge</Badge>;
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
      <Badge data-testid="badge-size-sm" size="sm">
        sm
      </Badge>
      <Badge data-testid="badge-size-md" size="md">
        md
      </Badge>
      <Badge data-testid="badge-size-lg" size="lg">
        lg
      </Badge>

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
        <Badge data-testid="badge-color-green" color="green">
          Green
        </Badge>
        <Badge data-testid="badge-color-gray" color="gray">
          Gray
        </Badge>
        <Badge data-testid="badge-color-red" color="red">
          Red
        </Badge>
        <Badge data-testid="badge-color-yellow" color="yellow">
          Yellow
        </Badge>
        <Badge data-testid="badge-color-blue" color="blue">
          Blue
        </Badge>
        <Badge data-testid="badge-color-blue" color="purple">
          Purple
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Badge } from '@mlw-packages/react-components';

export default function Variants() {
  return (
    <div>
      <Badge size="md">Default</Badge>
      <Badge size="sm">Small</Badge>
      //
      <Badge color="green">Green</Badge>
      <Badge color="gray">Green</Badge>
      <Badge color="red">Green</Badge>
      <Badge color="yellow">Green</Badge>
      <Badge color="blue">Green</Badge>
      <Badge color="purple">Green</Badge>
    </div>
  );
}
`,
      },
    },
  },
};
