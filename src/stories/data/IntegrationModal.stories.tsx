import type { Meta, StoryObj } from "@storybook/react-vite";
import { IntegrationModal } from "@/components/ui/"; 
import { useState } from "react";

// Mock de dados robusto
const mockData = {
  name: "Sistema de Gestão de RH (Nexus-Alpha)",
  description: "Plataforma centralizada para controle de folha e benefícios.",
  connections: [
    {
      id: "conn-1",
      name: "Gateway de Pagamentos",
      type: "entrada",
      integration: {
        Nome: "API Rest Pagamentos",
        Tipo: "Web Application",
        Protocolos: "HTTPS/TLS 1.3",
        Ambiente: "Produção",
        Setor: "Financeiro",
        Contato: "sre.fin@empresa.com",
      },
    },
    {
      id: "conn-3",
      name: "Kafka Cluster",
      type: "saida",
      integration: {
        Nome: "Log-Streamer",
        tipo: "Messaging",
        Protocolos: "Avro/TCP",
      },
    },
  ],
};

const meta: Meta<typeof IntegrationModal> = {
  title: "Data/IntegrationModal",
  component: IntegrationModal,
  tags: ["autodocs"], 
  parameters: {
    layout: "fullscreen",
  
    docs: {
      story: {
        inline: false, 
        iframeHeight: 600, 
      },
    },
  },
  decorators: [
    (Story, context) => {
      const [isOpen, setIsOpen] = useState(true);
      
      return (
        // Adicionei relative e overflow-hidden para conter o modal no preview
        <div className="relative w-full h-screen bg-slate-100 p-10 dark:bg-slate-900 overflow-hidden">
          {!isOpen && (
            <button 
              className="px-4 py-2 bg-primary text-white rounded font-medium shadow-sm hover:bg-primary/90 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              Reabrir Modal
            </button>
          )}
          {isOpen && (
            <Story
              args={{
                ...context.args,
                onClose: (id: string) => {
                  context.args.onClose?.(id);
                  setIsOpen(false);
                },
              }}
            />
          )}
        </div>
      );
    },
  ],
  argTypes: {
    onClose: { action: "closed" },
    onPositionChange: { action: "position changed" },
    onMouseDown: { action: "mouse down" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "modal-default",
    title: "Dados de Integração",
    data: mockData,
    position: { top: 50, left: 50 },
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    // No mobile view do docs, as vezes é melhor manter inline: false também
  },
  args: {
    ...Default.args,
    title: "Vista Mobile (Drawer)",
  },
};

export const LongList: Story = {
  args: {
    ...Default.args,
    title: "Fluxo de Dados Complexo",
    data: {
      ...mockData,
      connections: Array.from({ length: 12 }, (_, i) => ({
        id: `conn-${i}`,
        name: `Microserviço de Dados ${i + 1}`,
        type: i % 2 === 0 ? "entrada" : "saida",
        integration: {
          Status: "Ativo",
          Versao: `v2.${i}.4`,
          Namespace: "kubernetes-prod-01",
          Latencia: "24ms",
        },
      })),
    },
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: {
      name: "Serviço Isolado",
      description: "Este sistema não possui conexões ativas no momento.",
      connections: [],
    },
  },
};