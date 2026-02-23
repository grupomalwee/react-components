import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { NumericInput } from "@/components/ui/form/NumericInput";

type NumericInputStoryArgs = {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
  error?: string;
  isLoading?: boolean;
  disabled?: boolean;
  tooltip_on_overflow?: boolean;
  hideConfirm?: boolean;
  onChange?: (value: number) => void;
};

const meta: Meta<typeof NumericInput> = {
  title: "forms/NumericInput",
  component: NumericInput,
  tags: ["autodocs"],
  args: {
    value: 120,
    min: 0,
    max: 9999,
    label: "Quantidade",
    error: "",
    disabled: false,
    isLoading: false,
    tooltip_on_overflow: false,
    hideConfirm: false,
  },
  argTypes: {
    value: { control: { type: "number" } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    label: { control: { type: "text" } },
    error: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    isLoading: { control: { type: "boolean" } },
    tooltip_on_overflow: { control: { type: "boolean" } },
    hideConfirm: { control: { type: "boolean" } },
    onChange: { action: "change" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Input numérico com validação de min/max, confirmação e suporte a loading/disabled.",
      },
      source: {
        code: `import React from 'react';
import { NumericInput } from '@mlw-packages/react-components';

function Example() {
  const [value, setValue] = React.useState(120);

  return (
    <div style={{ width: 320 }}>
      <NumericInput
        value={value}
        onChange={setValue}
        min={0}
        max={9999}
        label='Quantidade'
      />
    </div>
  );
}

export default Example;`,
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
type Story = StoryObj<typeof NumericInput>;

const NumericInputWrapper = (args: NumericInputStoryArgs) => {
  const [value, setValue] = React.useState<number>(args.value ?? 0);

  React.useEffect(() => {
    setValue(args.value ?? 0);
  }, [args.value]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div style={{ width: 320 }}>
        <NumericInput
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            args.onChange?.(nextValue);
          }}
          min={args.min}
          max={args.max}
          label={args.label}
          className={args.className}
          error={args.error}
          isLoading={args.isLoading}
          disabled={args.disabled}
          tooltip_on_overflow={args.tooltip_on_overflow}
          hideConfirm={args.hideConfirm}
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <NumericInputWrapper {...args} />,
};

export const WithLimits: Story = {
  args: {
    value: 50,
    min: 10,
    max: 100,
    label: "Quantidade (10 a 100)",
    tooltip_on_overflow: true,
  },
  render: (args) => <NumericInputWrapper {...args} />,
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { NumericInput } from '@mlw-packages/react-components';

export default function WithLimits() {
  const [value, setValue] = React.useState(50);

  return (
    <NumericInput
      value={value}
      onChange={setValue}
      min={10}
      max={100}
      label='Quantidade (10 a 100)'
      tooltip_on_overflow
    />
  );
}
`,
      },
    },
  },
};

export const WithError: Story = {
  args: {
    value: 0,
    error: "Valor inválido.",
  },
  render: (args) => <NumericInputWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    value: 120,
    disabled: true,
  },
  render: (args) => <NumericInputWrapper {...args} />,
};

export const Loading: Story = {
  args: {
    value: 120,
    isLoading: true,
  },
  render: (args) => <NumericInputWrapper {...args} />,
};

export const HideConfirm: Story = {
  args: {
    value: 120,
    hideConfirm: true,
  },
  render: (args) => <NumericInputWrapper {...args} />,
};
export const NumericKeyboard: Story = {
  args: {
    value: 120,
    numericKeyboard: true,
  },
  render: (args) => <NumericInputWrapper {...args} />,
};
