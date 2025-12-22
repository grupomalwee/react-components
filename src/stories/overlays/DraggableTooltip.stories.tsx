import DraggableTooltip from "@/components/ui/charts/components/tooltips/DraggableTooltip";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect } from "react";
import { useDrag } from "@/hooks/use-drag";

const meta: Meta<typeof DraggableTooltip> = {
  title: "charts/Draggable Tooltip",
  component: DraggableTooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente de tooltip arrastável para gráficos com funcionalidades avançadas como botão 'Fechar Todos' e labels customizáveis.",
      },
      source: {
        code: `import React from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nconst sampleData = { name: 'Q1 2024', receita: 4000, despesas: 2400 };\nconst dataKeys = ['receita', 'despesas'];\n\nexport default function Example() {\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      <DraggableTooltip id='tooltip-1' data={sampleData} position={{ top: 100, left: 100 }} dataKeys={dataKeys} finalColors={{ receita: '#55af7d', despesas: '#8e68ff' }} onClose={() => {}} />\n    </div>\n  );\n}`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "fullscreen",
  },
  argTypes: {
    periodLabel: {
      control: "text",
      description: "Label para o período/ponto selecionado",
    },
    dataLabel: {
      control: "text",
      description: "Label para a seção de dados",
    },
    showCloseAllButton: {
      control: "boolean",
      description: "Mostrar botão 'Fechar Todos'",
    },
    closeAllButtonPosition: {
      control: "select",
      options: ["top-left", "top-right", "top-center"],
      description: "Posição do botão 'Fechar Todos'",
    },
    closeAllButtonVariant: {
      control: "select",
      options: ["floating", "inline"],
      description: "Variante do botão 'Fechar Todos'",
    },
  },
  args: {
    periodLabel: "Período Selecionado",
    dataLabel: "Dados do Período",
    showCloseAllButton: false,
    closeAllButtonPosition: "top-center",
    closeAllButtonVariant: "floating",
  },
};

export default meta;
type Story = StoryObj<typeof DraggableTooltip>;

const sampleData = {
  name: "Q1 2024",
  receita: 4000,
  despesas: 2400,
  lucro: 1600,
  vendas: 3200,
  marketing: 800,
};

const sampleColors = {
  receita: "#55af7d",
  despesas: "#8e68ff",
  lucro: "#2273e1",
  vendas: "#ff6b6b",
  marketing: "#4ecdc4",
};

const dataKeys = Object.keys(sampleData).filter((key) => key !== "name");

// Story básica
export const Default: Story = {
  render: (args) => {
    const { handleMouseDown, getPosition, setPosition, isElementDragging } =
      useDrag();

    useEffect(() => {
      setPosition("tooltip-1", { top: 100, left: 100 });
    }, [setPosition]);

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}
      >
        <DraggableTooltip
          {...args}
          id="tooltip-1"
          data={sampleData}
          position={getPosition("tooltip-1")}
          isDragging={isElementDragging("tooltip-1")}
          dataKeys={dataKeys}
          finalColors={sampleColors}
          onMouseDown={handleMouseDown}
          onClose={() => console.log("Tooltip fechado")}
        />
      </div>
    );
  },
  args: {
    title: "Receita Anual",
    periodLabel: "Período Selecionado",
    dataLabel: "Dados do Período",
    showCloseAllButton: false,
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nconst data = { name: 'Q1 2024', receita: 4000, despesas: 2400 };\nconst dataKeys = ['receita', 'despesas'];\n\nexport default function Example() {\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      <DraggableTooltip id='tooltip-1' data={data} position={{ top: 100, left: 100 }} dataKeys={dataKeys} finalColors={{ receita: '#55af7d', despesas: '#8e68ff' }} onClose={() => {}} />\n    </div>\n  );\n}`,
      },
    },
  },
};
// Mantemos apenas duas stories para reduzir a quantidade de exemplos (~80%)
// 1) Default - exemplo básico
// 2) Playground - exemplo interativo

// Story: Interactive Playground — criar/remover tooltips e alternar anchor
export const Playground: Story = {
  render: (args) => {
    const [tooltips, setTooltips] = useState<
      Array<{ id: string; top: number; left: number }>
    >([]);

    const { handleMouseDown, getPosition, setPosition, isElementDragging } =
      useDrag();

    useEffect(() => {
      // criar 2 tooltips iniciais
      setTooltips([
        { id: "play-1", top: 120, left: 140 },
        { id: "play-2", top: 240, left: 380 },
      ]);
      setTimeout(() => {
        setPosition("play-1", { top: 120, left: 140 });
        setPosition("play-2", { top: 240, left: 380 });
      }, 0);
    }, [setPosition]);

    const addTooltip = () => {
      const id = `play-${Date.now()}`;
      const top = 80 + Math.floor(Math.random() * 300);
      const left = 80 + Math.floor(Math.random() * 600);
      setTooltips((p) => [...p, { id, top, left }]);
      setTimeout(() => setPosition(id, { top, left }), 0);
    };

    return (
      <div style={{ height: "100vh", position: "relative", padding: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={addTooltip} style={{ padding: "8px 12px" }}>
            Adicionar Tooltip
          </button>
          <button
            onClick={() => setTooltips([])}
            style={{ padding: "8px 12px" }}
          >
            Remover Todos
          </button>
        </div>

        {tooltips.map((t, i) => (
          <DraggableTooltip
            key={t.id}
            {...args}
            id={t.id}
            data={{ ...sampleData, name: `Play ${i + 1}` }}
            position={getPosition(t.id)}
            isDragging={isElementDragging(t.id)}
            dataKeys={dataKeys}
            finalColors={sampleColors}
            onMouseDown={handleMouseDown}
            onClose={(id) => setTooltips((p) => p.filter((x) => x.id !== id))}
            showCloseAllButton={false}
            globalTooltipCount={tooltips.length}
          />
        ))}
      </div>
    );
  },
  args: {
    title: "Playground",
  },
};
