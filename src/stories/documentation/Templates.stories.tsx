import type { Meta, StoryObj } from "@storybook/react-vite";
import DashboardTemplate from "@/pages/DashboardTemplate";

const meta: Meta<typeof DashboardTemplate> = {
  title: "documentation/Templates",
  component: DashboardTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Templates de páginas completas prontos para usar. Copie o código e cole direto no seu projeto - funciona sem modificações.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<unknown>;

export const Dashboard: Story = {
  render: () => <DashboardTemplate />,
};
