import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from "@/components/selects/Combobox";
import React from "react";

const meta: Meta<typeof Combobox> = {
  title: "Selects/Combobox",
  component: Combobox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: () => {
    const items = [
      { label: "Opção 1", value: "1" },
      { label: "Opção 2", value: "2" },
      { label: "Opção 3", value: "3" },
    ];
    const [selected, setSelected] = React.useState<string>(items[0].value);
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <Combobox
          items={items}
          selected={selected}
          onChange={value => {
            if (value !== null) setSelected(value);
          }}
        />
      </div>
    );
  },
};
