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
    dialogTitle: { control: "text" },
    enableTimePickerButton: { control: "boolean" },
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
    dialogTitle: "Selecione a data",
    enableTimePickerButton: false,
    className: "",
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

// Template para controlar o estado
const Template = (
  args: Partial<React.ComponentProps<typeof DateTimePicker>>
) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <DateTimePicker {...args} date={date} onChange={setDate} />;
};

export const Default: Story = {
  render: Template,
};

export const WithTimePickerButton: Story = {
  render: Template,
  args: {
    label: "Data com Time Picker Button",
    enableTimePickerButton: true,
    dialogTitle: "Selecione data e hora",
  },
};

export const HideSeconds: Story = {
  render: Template,
  args: {
    label: "Sem segundos",
    hideSeconds: true,
    dialogTitle: "Data sem segundos",
  },
};

export const DateOnly: Story = {
  render: Template,
  args: {
    label: "Apenas data",
    hideHour: true,
    hideMinute: true,
    dialogTitle: "Selecionar apenas data",
  },
};

export const HideMinutes: Story = {
  render: Template,
  args: {
    label: "Sem minutos",
    hideMinute: true,
    dialogTitle: "Data e hora sem minutos",
  },
};

export const HideHour: Story = {
  render: Template,
  args: {
    label: "Apenas minutos",
    hideHour: true,
    dialogTitle: "Data com apenas minutos",
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: "Campo desabilitado",
    disabled: true,
    dialogTitle: "Campo desabilitado",
  },
};

export const WithDateLimits: Story = {
  render: Template,
  args: {
    label: "Próximos 30 dias",
    fromDate: new Date(),
    toDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    dialogTitle: "Próximos 30 dias apenas",
  },
};

export const CustomStyle: Story = {
  render: Template,
  args: {
    label: "Estilo personalizado",
    className: "border-2 border-blue-500 rounded-lg p-2",
    dialogTitle: "Com estilo personalizado",
  },
};

export const NoLabel: Story = {
  render: Template,
  args: {
    dialogTitle: "Sem label",
  },
};

export const AllVariations: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        padding: "32px",
        maxWidth: "1200px",
      }}
    >
      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Básico
        </h3>
        <Template label="Data e hora" dialogTitle="Selecione data e hora" />
      </div>

      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Com Time Picker Button
        </h3>
        <Template
          label="Com popover"
          enableTimePickerButton={true}
          dialogTitle="Com time picker em popover"
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Apenas Data
        </h3>
        <Template
          label="Apenas data"
          hideHour={true}
          hideMinute={true}
          dialogTitle="Selecionar apenas data"
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Sem Segundos
        </h3>
        <Template
          label="Sem segundos"
          hideSeconds={true}
          dialogTitle="Data sem segundos"
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Sem Minutos
        </h3>
        <Template
          label="Sem minutos"
          hideMinute={true}
          dialogTitle="Sem minutos"
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
        >
          Desabilitado
        </h3>
        <Template
          label="Desabilitado"
          disabled={true}
          dialogTitle="Campo desabilitado"
        />
      </div>
    </div>
  ),
};
