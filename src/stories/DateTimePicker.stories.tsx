import "../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateTimePicker } from "../components/date-time-picker/DateTimePicker";
import { useState } from "react";

const meta: Meta<typeof DateTimePicker> = {
  title: "forms/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente para seleção de data e hora com diversas opções de configuração. Permite ocultar partes específicas do tempo e personalizar a experiência do usuário.",
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
    hideSeconds: { control: "boolean" },
    hideHour: { control: "boolean" },
    hideMinute: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    fromDate: { control: "date" },
    toDate: { control: "date" },
  },
  args: {
    label: "Selecione uma data",
    hideSeconds: false,
    hideHour: false,
    hideMinute: false,
    disabled: false,
    className: "",
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

// Template para controlar o estado
const Template = (
  args: Partial<React.ComponentProps<typeof DateTimePicker>>
) => {
  const [date, setDate] = useState<Date | undefined>(args.date);
  return <DateTimePicker {...args} date={date} onChange={setDate} />;
};

export const Default: Story = {
  render: Template,
  args: {
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};

export const WithTimePickerButton: Story = {
  render: Template,
  args: {
    label: "Data com Time Picker Button",
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};

export const HideSeconds: Story = {
  render: Template,
  args: {
    label: "Sem segundos",
    hideSeconds: true,
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};

export const DateOnly: Story = {
  render: Template,
  args: {
    label: "Apenas data",
    hideHour: true,
    hideMinute: true,
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};

export const HideMinutes: Story = {
  render: Template,
  args: {
    label: "Sem minutos",
    hideMinute: true,
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};

export const HideHour: Story = {
  render: Template,
  args: {
    label: "Apenas minutos",
    hideHour: true,
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: "Campo desabilitado",
    disabled: true,
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};

export const WithDateLimits: Story = {
  render: Template,
  args: {
    label: "Próximos 30 dias",
    fromDate: new Date(),
    toDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};

export const NoLabel: Story = {
  render: Template,
  args: {
    date: new Date(2025, 9, 9, 14, 30, 0), 
  },
};
