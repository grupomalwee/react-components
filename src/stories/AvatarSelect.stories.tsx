import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AvatarSelect } from "@/components/selects/AvatarSelect";

const meta: Meta<typeof AvatarSelect> = {
  title: "selects/AvatarSelect",
  component: AvatarSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text when no item is selected",
    },
    disabled: {
      control: "boolean",
      description: "Disable the select",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    label: {
      control: "text",
      description: "Label for the select",
    },
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
  {
    label: "Michael Chen",
    value: "4",
    avatarClassName: "bg-amber-400/20 text-amber-500",
  },
  {
    label: "Sofia Martinez",
    value: "5",
    avatarClassName: "bg-emerald-400/20 text-emerald-500",
  },
];

const groupedUsers = {
  "Impersonate user": [
    {
      label: "Xavier Guerra",
      value: "1",
      avatarClassName: "bg-indigo-400/20 text-indigo-500",
    },
    {
      label: "Maria Silva",
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
  "Regular Users": [
    {
      label: "Tom Brown",
      value: "6",
      avatarClassName: "bg-orange-400/20 text-orange-500",
    },
    {
      label: "Lisa Wong",
      value: "7",
      avatarClassName: "bg-teal-400/20 text-teal-500",
    },
  ],
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>("1");

    return (
      <div className="w-[300px] space-y-4">
        <AvatarSelect
          items={userItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Select a user"
          label="User Selection"
        />
      </div>
    );
  },
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
    placeholder: "Select user",
    label: "Assign to User",
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
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="w-[300px] space-y-4">
        <AvatarSelect
          groupItems={groupedUsers}
          selected={selected}
          onChange={setSelected}
          placeholder="Select user"
          label="User by Role"
        />
        <div className="text-sm text-muted-foreground">
          Selected: <strong>{selected || "None"}</strong>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    disabled: true,
    selected: "2",
  },
};

export const DisabledWithoutSelection: Story = {
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "This field is disabled",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    error: "This field is required",
    label: "Required Field",
  },
};

export const WithCustomAvatar: Story = {
  args: {
    items: [
      {
        label: "Premium User",
        value: "1",
        avatar: "⭐",
        avatarClassName: "bg-yellow-400/20 text-yellow-600",
      },
      {
        label: "VIP User",
        value: "2",
        avatar: "👑",
        avatarClassName: "bg-purple-400/20 text-purple-600",
      },
      {
        label: "New User",
        value: "3",
        avatar: "🆕",
        avatarClassName: "bg-blue-400/20 text-blue-600",
      },
    ],
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user type",
    label: "User Type",
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
