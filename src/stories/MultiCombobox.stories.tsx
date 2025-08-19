import { MultiCombobox } from "@/components/selects/MultiCombobox";
import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from "react";

const meta: Meta<typeof MultiCombobox> = {
  title: "selects/MultiCombobox",
  component: MultiCombobox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiCombobox>;

export const Default: Story = {
  render: () => {
    const items = [
      { label: "tag1", value: "tag1" },
      { label: "tag2", value: "tag2" },
      { label: "tag3", value: "tag3" }
    ];
    const [selected, setSelected] = React.useState<string[]>([items[0].value]);
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <MultiCombobox
          items={items}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};
