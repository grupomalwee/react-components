import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComboboxBase, ComboboxItem } from "../components/selects/ComboboxBase";
import React from "react";

const meta: Meta<typeof ComboboxBase> = {
  title: "Selects/ComboboxBase",
  component: ComboboxBase,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComboboxBase>;

export const Default: Story = {
  render: () => {
    const items: ComboboxItem<string>[] = [
      { value: "Item A", label: "Item A" },
      { value: "Item B", label: "Item B" },
      { value: "Item C", label: "Item C" }
    ];
    const [selected, setSelected] = React.useState<string | null>(items[0].value);

    return (
      <div className="flex flex-col items-center justify-center p-10">
        <ComboboxBase
          items={items}
          renderSelected={<span>{items.find(i => i.value === selected)?.label}</span>}
          handleSelection={value => setSelected(value)}
          checkIsSelected={value => selected === value}
        />
      </div>
    );
  },
};
