import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import LabelBase from "../components/ui/form/LabelBase";

const meta: Meta<typeof LabelBase> = {
  title: "forms/Label",
  component: LabelBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Label para campos de formulário, acessível e customizável.",
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
type Story = StoryObj<typeof LabelBase>;

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
      <LabelBase htmlFor="input">Label de exemplo</LabelBase>
    </div>
  ),
};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import React from 'react';
  import { LabelBase } from '@mlw-packages/react-components';

  export default function Example() {
    return (
      <div style={{ padding: 24 }}>
        <LabelBase htmlFor="input">Label de exemplo</LabelBase>
        <input id="input" style={{ marginTop: 8 }} />
      </div>
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
  import { LabelBase } from '@mlw-packages/react-components';

  export const Default = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
      <LabelBase htmlFor="input">Label de exemplo</LabelBase>
      <input id="input" style={{ marginLeft: 8 }} />
    </div>
  );`,
    },
  },
};
