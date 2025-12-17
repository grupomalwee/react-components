import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import Banner from "@/components/ui/data/Banner";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { clearBannerDismissal } from "@/components/ui/data/utils/bannerStore";

const meta: Meta<typeof Banner> = {
  title: "feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Banner informativo com ação e opção de fechar. Suporta persistência de fechamento via `localStorage`.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    id: { control: "text", description: "Identificador para persistência" },
    title: { control: "text", description: "Título do banner" },
    description: { control: "text", description: "Descrição do banner" },
    actionText: { control: "text", description: "Texto do botão de ação" },
  },
  args: {
    id: "storybook-banner",
    title: "Conheça nossos novos recursos",
    description:
      "Testando a story do Banner. Clique em Fechar para persistir a ação.",
    actionText: "Experimentar",
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {};

export const WithReset: Story = {
  render: (args) => {
    const [key, setKey] = React.useState(0);

    return (
      <div>
        <Banner key={key} {...args} />

        <div style={{ marginTop: 16 }}>
          <ButtonBase
            onClick={() => {
              clearBannerDismissal(String(args.id ?? "storybook-banner"));
              setKey((k) => k + 1);
            }}
          >
            Resetar dismiss
          </ButtonBase>
        </div>
      </div>
    );
  },
};
