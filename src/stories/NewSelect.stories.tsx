import { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@/components/selects/NewSelect";

const meta: Meta<typeof Select> = {
  title: "selects/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const simpleItems = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const groupedItems = {
  "Group One": [
    { label: "G1 - One", value: "g1-1" },
    { label: "G1 - Two", value: "g1-2" },
  ],
  "Group Two": [
    { label: "G2 - One", value: "g2-1" },
    { label: "G2 - Two", value: "g2-2" },
  ],
};

export const Default: Story = {
  args: {
    items: simpleItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select an option",
    testIds: {
      root: "select-root",
      base: "select-base",
      trigger: "select-trigger",
      value: "select-value",
      scrollarea: "select-scrollarea",
      content: "select-content",
      group: "select-group",
      label: "select-label",
      item: (v: string) => `select-item-${v}`,
    },
  },
};

export const WithPlaceholder: Story = {
  args: {
    items: simpleItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Escolha...",
  },
};

export const Grouped: Story = {
  args: {
    groupItems: groupedItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select grouped",
    testIds: {
      trigger: "select-trigger",
      value: "select-value",
      item: (v: string) => `select-item-${v}`,
    },
  },
};

export const Disabled: Story = {
  args: {
    items: simpleItems,
    onChange: (v: string) => console.log("changed", v),
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    items: simpleItems,
    onChange: (v: string) => console.log("changed", v),
    error: "This field is required",
  },
};
