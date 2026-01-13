import { Leaderboard } from "@/components/ui/LeaderBoard";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";


const meta: Meta<typeof Leaderboard> = {
  title: "feedback/LeaderBoard",
  component: Leaderboard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          " informativo com ação e opção de fechar. Suporta persistência de fechamento via `localStorage`.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    order: { control: "radio", options: ["asc", "desc"], description: "Order of the leaderboard" },
  },
  args: {
    order: "desc",
    title: "Classificação"
  },
};

export default meta;
type Story = StoryObj<typeof Leaderboard>;

export const Default: Story = {};