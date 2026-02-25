import type { Meta, StoryObj } from "@storybook/react-vite";
import IntegrationTooltip from "@/components/ui/charts/components/tooltips/integration/IntegrationTooltip";
import { IntegrationData } from "@/components/ui/charts/components/tooltips/utils/integrationTooltipUtils";

const mockData: IntegrationData = {
  name: "Esse sistema tem um nome muito grande meu deus olha isso",
  description: "Sistema de Gestão de Recursos Humanos com o nome grande.",
  connections: [
    {
      id: "conn-1",
      name: "Sistema com o nome muito grande meu deus olha isso",
      type: "entrada",
      integration: {
        Nome: "Loja Principal",
        Tipo: "Web Application",
        Protocolos: "HTTPS/REST",
        Ambiente: "Produção",
        Setor: "Vendas",
        Contato: "equipe-vendas@empresa.com",
        Sustentacao: "Time de SRE",
      },
    },
    {
      id: "conn-3",
      name: "C8",
      type: "saida",
      integration: {
        Nome: "C8",
        tipo: "Messaging",
      },
    },
  ],
};

const meta: Meta<typeof IntegrationTooltip> = {
  title: "feedback/IntegrationTooltip",
  component: IntegrationTooltip,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
    onPositionChange: { action: "position changed" },
    onMouseDown: { action: "mouse down" },
  },
  decorators: [
    (Story) => (
      <div className="w-full h-screen p-10 bg-slate-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "tooltip-1",
    title: "Dados de Integração",
    data: mockData,
    position: { top: 100, left: 100 },
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: {
      name: "Sem dados!",
      description: "Nenhum dado encontrado.",
      connections: [],
    },
  },
};

export const LongList: Story = {
  args: {
    ...Default.args,
    title: "Entrada e Saída de 15 serviços",
    data: {
      ...mockData,
      connections: Array.from({ length: 15 }, (_, i) => ({
        id: `conn-${i}`,
        name: `Serviço Auxiliar ${i + 1}`,
        type: i % 2 === 0 ? "entrada" : "saida",
        integration: {
          Status: "Ativo",
          Versao: `v1.${i}.0`,
          Sustentacao: "Time Central",
        },
      })),
    },
  },
};
