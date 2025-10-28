import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Select } from "@/components/selects/NewSelect";

const meta: Meta<typeof Select> = {
  title: "selects/Select Simple",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Select simples.",
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
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  name: "Padrão",
  render: () => {
    const items = [
      { label: "Opção A", value: "a" },
      { label: "Opção B", value: "b" },
      { label: "Opção C", value: "c" },
    ];
    const [selected, setSelected] = React.useState<string | null>(null);
    return (
      <div style={{ padding: "32px 0" }}>
        <div className="flex flex-col items-center justify-center p-10">
          <Select
            label="Escolha uma opção"
            items={items}
            selected={selected}
            onChange={setSelected}
            placeholder="Selecione..."
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "Select básico sem busca." },
    },
  },

};

export const WithError: Story = {
  name: "Com erro",
  render: () => {
    const items = [
      { label: "Opção A", value: "a" },
      { label: "Opção B", value: "b" },
    ];
    const [selected, setSelected] = React.useState<string | null>(null);
    return (
      <div style={{ padding: "32px 0" }}>
        <div className="flex flex-col items-center justify-center p-10">
          <Select
            label="Escolha uma opção"
            items={items}
            selected={selected}
            onChange={setSelected}
            placeholder="Selecione..."
            error="Você deve selecionar uma opção"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "Select mostrando mensagem de erro." },
    },
  },

};
