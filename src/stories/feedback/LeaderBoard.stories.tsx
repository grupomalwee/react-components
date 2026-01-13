import { Leaderboard } from "@/components/ui/LeaderBoard";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Leaderboard> = {
  title: "feedback/LeaderBoard",
  component: Leaderboard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    order: {
      control: "radio",
      options: ["asc", "desc"],
      description: "Order of the leaderboard",
    },
  },
  args: {
    order: "desc",
    title: "Classificação",
  },
};

export default meta;
type Story = StoryObj<typeof Leaderboard>;

export const Default: Story = {};

export const AscendingOrder: Story = {
  args: {
    order: "asc",
  },
};

export const DescendingOrder: Story = {
  args: {
    order: "desc",
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Top Players",
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
