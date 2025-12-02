import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SeparatorBase } from "@/components/ui/layout/SeparatorBase";

const meta: Meta<typeof SeparatorBase> = {
  title: "layout/Separator",
  component: SeparatorBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Separator para dividir seções, listas ou áreas visuais.",
      },
      source: {
        code: `import React from 'react';
import { SeparatorBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <div style={{ padding: 20 }}>
      <h3>Section A</h3>
      <p>Content A</p>
      <SeparatorBase className="my-4 w-full" />
      <h3>Section B</h3>
      <p>Content B</p>
    </div>
  );
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
};

export default meta;
type Story = StoryObj<typeof SeparatorBase>;

export const Default: Story = {
  name: "Múltiplas seções",
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div className="p-5">
        <h1>Section 1</h1>
        <p>This is the first section content.</p>
        <SeparatorBase className="my-5 w-full border-t-2 border-gray-300" />
        <h1>Section 2</h1>
        <p>This is the second section content.</p>
        <SeparatorBase className="my-5 w-full border-t-2 border-gray-300" />
        <h1>Section 3</h1>
        <p>This is the third section content.</p>
      </div>
    </div>
  ),
};
