import { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarSelect } from "@/components/selects/AvatarSelect";

const meta: Meta<typeof AvatarSelect> = {
  title: "Selects/AvatarSelect",
  component: AvatarSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof AvatarSelect>;

const userItems = [
  {
    label: "Gabriel Glatz",
    value: "1",
    avatarClassName: "bg-indigo-400/20 text-indigo-500",
  },
  {
    label: "Eduardo Ronchi",
    value: "2",
    avatarClassName: "bg-purple-400/20 text-purple-500",
  },
  {
    label: "Anne Kelley",
    value: "3",
    avatarClassName: "bg-rose-400/20 text-rose-500",
  },
];

const groupedUsers = {
  "Impersonate user": [
    {
      label: "",
      value: "1",
      avatarClassName: "bg-indigo-400/20 text-indigo-500",
    },
    {
      label: "Xavier Guerra",
      value: "2",
      avatarClassName: "bg-purple-400/20 text-purple-500",
    },
    {
      label: "Anne Kelley",
      value: "3",
      avatarClassName: "bg-rose-400/20 text-rose-500",
    },
  ],
  Administrators: [
    {
      label: "John Doe",
      value: "4",
      avatarClassName: "bg-blue-400/20 text-blue-500",
    },
    {
      label: "Sarah Smith",
      value: "5",
      avatarClassName: "bg-green-400/20 text-green-500",
    },
  ],
};

export const Default: Story = {
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    selected: "1",
  },
};

export const WithLabel: Story = {
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select framework",
    label: "Options with placeholder avatar",
  },
};

export const WithPlaceholder: Story = {
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Choose a user...",
  },
};

export const Grouped: Story = {
  args: {
    groupItems: groupedUsers,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    label: "Select User",
  },
};

export const Disabled: Story = {
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    error: "This field is required",
  },
};

export const WithoutAvatars: Story = {
  args: {
    items: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
      { label: "Option C", value: "c" },
    ],
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select option",
  },
};
