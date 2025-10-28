import DraggableTooltip from "@/components/charts/components/tooltips/DraggableTooltip";
import "../style/global.css";
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

    // Definir posição inicial
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

// Story para BarChart
export const BarChartStyle: Story = {
  render: (args) => {
    const { handleMouseDown, getPosition, setPosition, isElementDragging } =
      useDrag();

    // Definir posição inicial
    useEffect(() => {
      setPosition("tooltip-bar", { top: 120, left: 150 });
    }, [setPosition]);

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}
      >
        <DraggableTooltip
          {...args}
          id="tooltip-bar"
          data={sampleData}
          position={getPosition("tooltip-bar")}
          isDragging={isElementDragging("tooltip-bar")}
          dataKeys={dataKeys}
          finalColors={sampleColors}
          onMouseDown={handleMouseDown}
          onClose={() => console.log("Tooltip BarChart fechado")}
        />
      </div>
    );
  },
  args: {
    title: "BarChart Demo",
    periodLabel: "Período Selecionado",
    dataLabel: "Dados do Período",
    showCloseAllButton: false,
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nexport default function BarChartStyle() {\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      <DraggableTooltip id='tooltip-bar' data={{ name: 'Q1', receita: 4000 }} position={{ top: 120, left: 150 }} dataKeys={['receita']} finalColors={{ receita: '#55af7d' }} onClose={() => {}} />\n    </div>\n  );\n}`,
      },
    },
  },
};

// Story para LineChart
export const LineChartStyle: Story = {
  render: (args) => {
    const { handleMouseDown, getPosition, setPosition, isElementDragging } =
      useDrag();

    // Definir posição inicial
    useEffect(() => {
      setPosition("tooltip-line", { top: 80, left: 200 });
    }, [setPosition]);

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}
      >
        <DraggableTooltip
          {...args}
          id="tooltip-line"
          data={{ ...sampleData, name: "Ponto A" }}
          position={getPosition("tooltip-line")}
          isDragging={isElementDragging("tooltip-line")}
          dataKeys={dataKeys}
          finalColors={sampleColors}
          onMouseDown={handleMouseDown}
          onClose={() => console.log("Tooltip LineChart fechado")}
        />
      </div>
    );
  },
  args: {
    title: "LineChart Demo",
    periodLabel: "Ponto Selecionado",
    dataLabel: "Dados do Ponto",
    showCloseAllButton: false,
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nexport default function LineChartStyle() {\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      <DraggableTooltip id='tooltip-line' data={{ name: 'Ponto A', receita: 3200 }} position={{ top: 80, left: 200 }} dataKeys={['receita']} finalColors={{ receita: '#2273e1' }} onClose={() => {}} />\n    </div>\n  );\n}`,
      },
    },
  },
};

// Story com botão "Fechar Todos"
export const WithCloseAllButton: Story = {
  render: (args) => {
    const [tooltips, setTooltips] = useState([
      { id: "tooltip-1" },
      { id: "tooltip-2" },
      { id: "tooltip-3" },
    ]);

    const { handleMouseDown, getPosition, setPosition, isElementDragging } =
      useDrag();

    // Definir posições iniciais
    useEffect(() => {
      setPosition("tooltip-1", { top: 100, left: 100 });
      setPosition("tooltip-2", { top: 250, left: 300 });
      setPosition("tooltip-3", { top: 150, left: 500 });
    }, [setPosition]);

    const handleClose = (id: string) => {
      setTooltips((prev) => prev.filter((tooltip) => tooltip.id !== id));
    };

    const handleCloseAll = () => {
      setTooltips([]);
    };

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}
      >
        {tooltips.map((tooltip, index) => (
          <DraggableTooltip
            key={tooltip.id}
            {...args}
            id={tooltip.id}
            data={{ ...sampleData, name: `Q${index + 1} 2024` }}
            position={getPosition(tooltip.id)}
            isDragging={isElementDragging(tooltip.id)}
            dataKeys={dataKeys}
            finalColors={sampleColors}
            onMouseDown={handleMouseDown}
            onClose={handleClose}
            showCloseAllButton={index === 0} // Só o primeiro mostra o botão
            globalTooltipCount={tooltips.length}
            onCloseAll={handleCloseAll}
          />
        ))}

        {tooltips.length === 0 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#666",
            }}
          >
            <p>Todos os tooltips foram fechados!</p>
            <button
              onClick={() => {
                setTooltips([
                  { id: "tooltip-1" },
                  { id: "tooltip-2" },
                  { id: "tooltip-3" },
                ]);
                // Resetar posições após um pequeno delay
                setTimeout(() => {
                  setPosition("tooltip-1", { top: 100, left: 100 });
                  setPosition("tooltip-2", { top: 250, left: 300 });
                  setPosition("tooltip-3", { top: 150, left: 500 });
                }, 0);
              }}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Recriar Tooltips
            </button>
          </div>
        )}
      </div>
    );
  },
  args: {
    title: "Multi Tooltips Demo",
    periodLabel: "Período Selecionado",
    dataLabel: "Dados do Período",
    closeAllButtonPosition: "top-center",
    closeAllButtonVariant: "floating",
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nexport default function WithCloseAllButton() {\n  const data = { name: 'Q1', receita: 4000 };\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      <DraggableTooltip id='tooltip-1' data={data} position={{ top: 100, left: 100 }} showCloseAllButton globalTooltipCount={3} onCloseAll={() => {}} onClose={() => {}} />\n    </div>\n  );\n}`,
      },
    },
  },
};

// Story com botão inline
export const WithInlineCloseButton: Story = {
  render: (args) => {
    const [tooltips, setTooltips] = useState([
      { id: "tooltip-1" },
      { id: "tooltip-2" },
    ]);

    const { handleMouseDown, getPosition, setPosition, isElementDragging } =
      useDrag();

    // Definir posições iniciais
    useEffect(() => {
      setPosition("tooltip-1", { top: 100, left: 100 });
      setPosition("tooltip-2", { top: 250, left: 300 });
    }, [setPosition]);

    const handleClose = (id: string) => {
      setTooltips((prev) => prev.filter((tooltip) => tooltip.id !== id));
    };

    const handleCloseAll = () => {
      setTooltips([]);
    };

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}
      >
        {tooltips.map((tooltip, index) => (
          <DraggableTooltip
            key={tooltip.id}
            {...args}
            id={tooltip.id}
            data={{ ...sampleData, name: `Item ${index + 1}` }}
            position={getPosition(tooltip.id)}
            isDragging={isElementDragging(tooltip.id)}
            dataKeys={dataKeys}
            finalColors={sampleColors}
            onMouseDown={handleMouseDown}
            onClose={handleClose}
            showCloseAllButton={index === 0}
            globalTooltipCount={tooltips.length}
            onCloseAll={handleCloseAll}
          />
        ))}
      </div>
    );
  },
  args: {
    title: "Inline Button Demo",
    periodLabel: "Item Selecionado",
    dataLabel: "Dados do Item",
    closeAllButtonPosition: "top-right",
    closeAllButtonVariant: "inline",
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nexport default function WithInlineCloseButton() {\n  const data = { name: 'Item 1', receita: 3200 };\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      <DraggableTooltip id='tooltip-1' data={data} position={{ top: 100, left: 100 }} showCloseAllButton={false} closeAllButtonVariant='inline' onClose={() => {}} />\n    </div>\n  );\n}`,
      },
    },
  },
};

// Story: Single tooltip explicit (should not show guides)
export const SingleTooltipNoGuides: Story = {
  render: (args) => {
    const { handleMouseDown, getPosition, setPosition, isElementDragging } =
      useDrag();

    useEffect(() => {
      setPosition("single-tooltip", { top: 180, left: 240 });
    }, [setPosition]);

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}
      >
        <DraggableTooltip
          {...args}
          id="single-tooltip"
          data={{ ...sampleData, name: "Single" }}
          position={getPosition("single-tooltip")}
          isDragging={isElementDragging("single-tooltip")}
          dataKeys={dataKeys}
          finalColors={sampleColors}
          onMouseDown={handleMouseDown}
          onClose={() => console.log("Single tooltip closed")}
        />
      </div>
    );
  },
  args: {
    title: "Single Tooltip (no guides)",
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nexport default function SingleTooltipNoGuides() {\n  const data = { name: 'Single', receita: 3000 };\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      <DraggableTooltip id='single-tooltip' data={data} position={{ top: 180, left: 240 }} dataKeys={['receita']} finalColors={{ receita: '#55af7d' }} onClose={() => {}} />\n    </div>\n  );\n}`,
      },
    },
  },
};

// Story: Anchor center demo (posiciona o tooltip centralizado no ponto)
export const AnchorCenterDemo: Story = {
  render: (args) => {
    const { handleMouseDown, getPosition, setPosition, isElementDragging } =
      useDrag();

    useEffect(() => {
      // posição representa o ponto central
      setPosition("center-tooltip", { top: 260, left: 420 });
    }, [setPosition]);

    return (
      <div
        style={{ height: "100vh", position: "relative", background: "#fff8e8" }}
      >
        <div
          style={{
            position: "absolute",
            left: 420 - 4,
            top: 260 - 4,
            width: 8,
            height: 8,
            background: "#222",
            borderRadius: 4,
          }}
        />
        <DraggableTooltip
          {...args}
          id="center-tooltip"
          data={{ ...sampleData, name: "Ponto Central" }}
          position={getPosition("center-tooltip")}
          isDragging={isElementDragging("center-tooltip")}
          dataKeys={dataKeys}
          finalColors={sampleColors}
          onMouseDown={handleMouseDown}
          onClose={() => console.log("Center tooltip closed")}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nexport default function AnchorCenterDemo() {\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      <DraggableTooltip id='center-tooltip' data={{ name: 'Ponto Central', receita: 3200 }} position={{ top: 260, left: 420 }} dataKeys={['receita']} finalColors={{ receita: '#4ecdc4' }} onClose={() => {}} />\n    </div>\n  );\n}`,
      },
    },
  },
};

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
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport DraggableTooltip from '@mlw-packages/react-components';\n\nexport default function Playground() {\n  const [tooltips, setTooltips] = useState([{ id: 'play-1', top: 120, left: 140 }]);\n  return (\n    <div style={{ height: '100vh', position: 'relative' }}>\n      {tooltips.map(t => (\n        <DraggableTooltip key={t.id} id={t.id} data={{ name: t.id, receita: 1000 }} position={{ top: t.top, left: t.left }} dataKeys={['receita']} finalColors={{ receita: '#55af7d' }} onClose={() => {}} />\n      ))}\n    </div>\n  );\n}`,
      },
    },
  },
};
