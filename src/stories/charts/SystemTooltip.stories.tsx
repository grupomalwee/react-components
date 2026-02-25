import React, { useState } from "react";
import SystemTooltip from "@/components/ui/charts/components/tooltips/SystemTooltip";
import type { SystemData } from "@/components/ui/charts/components/tooltips/utils/systemTooltipUtils";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sampleSystemData: SystemData = {
  name: "Sistema Exemplo",
  description: "Sistema usado no exemplo de SystemTooltip",
  connections: [
    {
      id: "c1",
      name: "Gateway Pagamentos",
      type: "entrada",
      integration: { Nome: "Gateway X", tipo: "API", Protocolos: "HTTPS" },
    },
    {
      id: "c2",
      name: "ERP",
      type: "saida",
      integration: { Nome: "ERP Y", Tipo: "Banco", Ambiente: "Prod" },
    },
    {
      id: "c3",
      name: "Auth Service",
      type: "entrada",
      integration: { Nome: "Auth Z", Contato: "auth@ex.com" },
    },
  ],
};

const meta: Meta<typeof SystemTooltip> = {
  title: "Charts/SystemTooltip",
  component: SystemTooltip,
  tags: ["autodocs"],
  args: {
    id: "system-1",
    data: sampleSystemData,
    position: { top: 80, left: 80 },
    title: "Conexões do Sistema",
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof SystemTooltip>;

const Template = (args: React.ComponentProps<typeof SystemTooltip>) => {
  const [visible, setVisible] = useState(true);
  const [pos, setPos] = useState(args.position || { top: 80, left: 80 });

  if (!visible) {
    return (
      <div style={{ padding: 24 }}>
        <button
          onClick={() => setVisible(true)}
          className="px-3 py-1 rounded bg-primary text-white"
        >
          Abrir SystemTooltip
        </button>
      </div>
    );
  }

  return (
    <div className="fixed" style={{ inset: 0 }}>
      <SystemTooltip
        {...args}
        position={pos}
        id={String(args.id)}
        onClose={() => setVisible(false)}
        onPositionChange={(_, newPos) => setPos(newPos)}
      />
    </div>
  );
};

export const Example: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de uso do componente `SystemTooltip`. Use o cabeçalho para arrastar, clique nas conexões para expandir detalhes e feche com o botão X.",
      },
      source: {
        code: `import React, { useState } from 'react';
import SystemTooltip from '@mlw-packages/react-components';

const systemData = {
  name: "Sistema Exemplo",
  description: "Descrição de exemplo",
  connections: [
    { id: "c1", name: "Gateway", type: "entrada", integration: { Tipo: "API" } },
    { id: "c2", name: "ERP", type: "saida", integration: { Tipo: "Banco" } },
  ],
};

export default function Example() {
  const [visible, setVisible] = useState(true);
  const [pos, setPos] = useState({ top: 80, left: 80 });

  if (!visible) return <button onClick={() => setVisible(true)}>Abrir</button>;

  return (
    <SystemTooltip
      id="sys-1"
      data={systemData}
      position={pos}
      title="Conexões do Sistema"
      onClose={() => setVisible(false)}
      onPositionChange={(_, newPos) => setPos(newPos)}
    />
  );
}
`,
      },
    },
  },
};
