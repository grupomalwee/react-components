import DraggableTooltip from "@/components/rechart/DraggableTooltip";
import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from "react";
import { useDrag } from "@/hooks/use-drag";

const meta: Meta<typeof DraggableTooltip> = {
  title: "charts/DraggableTooltip",
  component: DraggableTooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "Componente de tooltip arrastável para gráficos com funcionalidades avançadas como botão 'Fechar Todos' e labels customizáveis.",
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f6f6' },
        { name: 'dark', value: '#222' }
      ]
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

const dataKeys = Object.keys(sampleData).filter(key => key !== 'name');

// Story básica
export const Default: Story = {
  render: (args) => {
    const {
      handleMouseDown,
      getPosition,
      setPosition,
      isElementDragging,
    } = useDrag();

    // Definir posição inicial
    useEffect(() => {
      setPosition("tooltip-1", { top: 100, left: 100 });
    }, [setPosition]);
    
    return (
      <div style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}>
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
};

// Story para BarChart
export const BarChartStyle: Story = {
  render: (args) => {
    const {
      handleMouseDown,
      getPosition,
      setPosition,
      isElementDragging,
    } = useDrag();

    // Definir posição inicial
    useEffect(() => {
      setPosition("tooltip-bar", { top: 120, left: 150 });
    }, [setPosition]);
    
    return (
      <div style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}>
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
};

// Story para LineChart
export const LineChartStyle: Story = {
  render: (args) => {
    const {
      handleMouseDown,
      getPosition,
      setPosition,
      isElementDragging,
    } = useDrag();

    // Definir posição inicial
    useEffect(() => {
      setPosition("tooltip-line", { top: 80, left: 200 });
    }, [setPosition]);
    
    return (
      <div style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}>
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
};

// Story com botão "Fechar Todos"
export const WithCloseAllButton: Story = {
  render: (args) => {
    const [tooltips, setTooltips] = useState([
      { id: "tooltip-1" },
      { id: "tooltip-2" },
      { id: "tooltip-3" },
    ]);

    const {
      handleMouseDown,
      getPosition,
      setPosition,
      isElementDragging,
    } = useDrag();

    // Definir posições iniciais
    useEffect(() => {
      setPosition("tooltip-1", { top: 100, left: 100 });
      setPosition("tooltip-2", { top: 250, left: 300 });
      setPosition("tooltip-3", { top: 150, left: 500 });
    }, [setPosition]);
    
    const handleClose = (id: string) => {
      setTooltips(prev => prev.filter(tooltip => tooltip.id !== id));
    };
    
    const handleCloseAll = () => {
      setTooltips([]);
    };
    
    return (
      <div style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}>
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
          <div style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#666"
          }}>
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
                cursor: "pointer"
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
};

// Story com botão inline
export const WithInlineCloseButton: Story = {
  render: (args) => {
    const [tooltips, setTooltips] = useState([
      { id: "tooltip-1" },
      { id: "tooltip-2" },
    ]);

    const {
      handleMouseDown,
      getPosition,
      setPosition,
      isElementDragging,
    } = useDrag();

    // Definir posições iniciais
    useEffect(() => {
      setPosition("tooltip-1", { top: 100, left: 100 });
      setPosition("tooltip-2", { top: 250, left: 300 });
    }, [setPosition]);
    
    const handleClose = (id: string) => {
      setTooltips(prev => prev.filter(tooltip => tooltip.id !== id));
    };
    
    const handleCloseAll = () => {
      setTooltips([]);
    };
    
    return (
      <div style={{ height: "100vh", position: "relative", background: "#f5f5f5" }}>
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
};
