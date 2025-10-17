import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBase } from "../components/ui/ProgressBase";
import * as React from "react";

const meta: Meta<typeof ProgressBase> = {
  title: "feedback/Progress",
  component: ProgressBase,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bar", "segments", "panels", "circles"],
      description: "Tipo de visualização do progresso",
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 10 },
      description: "Valor do progresso (0-100)",
    },
    segments: {
      control: { type: "number", min: 2, max: 20, step: 1 },
      description: 'Número de segmentos (usado quando variant="segments")',
    },
    currentStep: {
      control: { type: "number", min: 0, max: 10, step: 1 },
      description:
        'Índice da etapa atual (usado quando variant="panels" ou "circles")',
    },
    label: {
      control: "text",
      description: "Texto do label exibido acima do progresso",
    },
    showValue: {
      control: "boolean",
      description: "Exibe o valor em porcentagem ao lado/por dentro da barra",
    },
    valuePosition: {
      control: { type: "select" },
      options: ["left", "right", "inside"],
      description: "Posição do valor quando showValue=true",
    },
    autocolor: {
      control: { type: "object" },
      description:
        "Array com dois thresholds [t1, t2]. 0..t1 = vermelho, t1..t2 = amarelo, >t2 = verde",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente de progresso com múltiplas variações: barra, segmentos, painéis e círculos. Ideal para feedback visual de etapas, downloads e processos.",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBase>;

export const Default: Story = {
  args: {
    variant: "bar",
    value: 50,
    label: "Progresso",
  },
};

export const Bar: Story = {
  args: {
    variant: "bar",
    value: 13,
    label: "Download",
    showValue: true,
    valuePosition: "right",
  },
};


export const BarValueLeft: Story = {
  args: {
    variant: "bar",
    value: 42,
    label: "Left Value",
    showValue: true,
    valuePosition: "left",
  },
};

export const Segments: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(13);
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(60), 500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div style={{ width: "400px" }}>
        <ProgressBase
          variant="segments"
          segments={10}
          value={progress}
          label="Segmentos"
        />
      </div>
    );
  },
};

export const Panels: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    React.useEffect(() => {
      const timer = setTimeout(() => setCurrentStep(2), 500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div style={{ width: "600px" }}>
        <ProgressBase
          variant="panels"
          steps={["Briefing", "Design", "Desenvolvimento", "Deploy"]}
          currentStep={currentStep}
          label="Etapas do Projeto"
        />
      </div>
    );
  },
};

export const Circles: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    React.useEffect(() => {
      const timer = setTimeout(() => setCurrentStep(2), 500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div style={{ width: "600px" }}>
        <ProgressBase
          variant="circles"
          steps={["Login", "Endereço", "Pagamento", "Confirmação"]}
          currentStep={currentStep}
          label="Processo de Compra"
        />
      </div>
    );
  },
};

export const BarAutoColor: Story = {
  args: {
    variant: "bar",

    label: "Auto Color",
    showValue: true,
    valuePosition: "right",
    autocolor: [70, 100],
    className: "w-96",
  },
};
