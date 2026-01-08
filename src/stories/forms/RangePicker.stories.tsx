import "../../style/global.css";
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RangePicker } from "@/components/ui/picker/RangePicker";
import type { DateRange } from "react-day-picker";

const meta: Meta<typeof RangePicker> = {
  title: "forms/Range Picker",
  component: RangePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente para seleção de intervalo de datas (range) com suporte a limites mínimos e máximos.",
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
    label: { control: "text" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
  },
  args: {
    label: "Selecione um intervalo",
  },
};

export default meta;
type Story = StoryObj<typeof RangePicker>;

const Template = (args: Partial<React.ComponentProps<typeof RangePicker>>) => {
  const [range, setRange] = useState<DateRange | undefined>(
    args.value as DateRange | undefined
  );
  const props = args as Partial<React.ComponentProps<typeof RangePicker>>;
  return <RangePicker {...props} value={range} onChange={setRange} />;
};

export const Default: Story = {
  render: Template,
  args: {
    value: { from: new Date(2025, 9, 1), to: new Date(2025, 9, 10) },
  },
};

export const NoLabel: Story = {
  render: Template,
  args: {
    label: "",
    value: undefined,
  },
};
export const WithError: Story = {
  render: Template,
  args: {
    value: undefined,
    error: "Intervalo inválido",
  },
};

export const MinMax: Story = {
  render: Template,
  args: {
    label: "Período Personalizado",
    value: { from: new Date(2025, 11, 5), to: new Date(2025, 11, 10) },
    minDate: new Date(2025, 11, 1),
    maxDate: new Date(2025, 11, 31),
  },
};

export const WithOnConfirm: Story = {
  render: (args) => {
    const [range, setRange] = useState<DateRange | undefined>(
      args.value as DateRange | undefined
    );
    const [confirmed, setConfirmed] = useState<DateRange | undefined>();

    return (
      <div className="space-y-4">
        <RangePicker
          {...args}
          value={range}
          onChange={setRange}
          onConfirm={(confirmedRange) => {
            setConfirmed(confirmedRange);
            console.log("Range confirmado:", confirmedRange);
          }}
        />
        {confirmed && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm font-medium text-green-800">
              Range confirmado: {confirmed.from?.toLocaleDateString()} -{" "}
              {confirmed.to?.toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    );
  },
  args: {
    label: "Selecione e confirme o período",
    value: undefined,
  },
};
