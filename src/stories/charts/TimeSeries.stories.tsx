import React from "react";
import TimeSeries from "@/components/ui/charts/TimeSeries";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Generate sample time series data
const generateTimeSeriesData = (months: number) => {
  const data = [];
  const startDate = new Date(2023, 0, 1);

  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);

    const monthStr = date.toLocaleDateString("pt-BR", {
      month: "short",
      year: "2-digit",
    });

    data.push({
      periodo: monthStr,
      receita: Math.round(5000 + Math.random() * 5000 + i * 200),
      despesas: Math.round(3000 + Math.random() * 3000 + i * 100),
      lucro: Math.round(1000 + Math.random() * 2000 + i * 50),
      churn: Math.round(50 + Math.random() * 100),
    });
  }

  return data;
};

const timeSeriesData = generateTimeSeriesData(24);

const meta: Meta<typeof TimeSeries> = {
  title: "charts/TimeSeries",
  component: TimeSeries,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente de série temporal com controle de intervalo através de um slider interativo. Permite visualizar e navegar por grandes conjuntos de dados temporais.",
      },
      source: {
        code: `import React from 'react';
import TimeSeries from '@mlw-packages/react-components';

const data = [
  { periodo: 'jan/23', receita: 5000, despesas: 3000 },
  { periodo: 'fev/23', receita: 5500, despesas: 3200 },
  // ... more data
];

export default function Example() {
  return (
    <TimeSeries 
      data={data} 
      xAxis="periodo" 
      series={{ bar: ['receita', 'despesas'] }}
      labelMap={{ receita: 'Receita', despesas: 'Despesas' }}
      height={500}
    />
  );
}`,
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
  argTypes: {
    data: { control: "object", description: "Dados da série temporal" },
    xAxis: { control: "text", description: "Campo usado como eixo X (tempo)" },
    series: {
      control: "object",
      description: "Configuração das séries (bar, line, area)",
    },
    labelMap: {
      control: "object",
      description: "Mapeamento de labels customizados",
    },
    colors: {
      control: "object",
      description: "Array de cores para as séries",
    },
    height: {
      control: { type: "number", min: 300, max: 800, step: 50 },
      description: "Altura total do componente",
    },
    chartHeight: {
      control: { type: "number", min: 200, max: 600, step: 50 },
      description: "Altura do gráfico principal",
    },
    brushHeight: {
      control: { type: "number", min: 50, max: 150, step: 10 },
      description: "Altura do brush/slider",
    },
    defaultStartIndex: {
      control: { type: "number", min: 0 },
      description: "Índice inicial padrão",
    },
    defaultEndIndex: {
      control: { type: "number", min: 0 },
      description: "Índice final padrão",
    },
    showGrid: { control: "boolean", description: "Mostrar grade" },
    showLegend: { control: "boolean", description: "Mostrar legenda" },
    showTooltip: { control: "boolean", description: "Mostrar tooltip" },
    formatBR: {
      control: "boolean",
      description: "Formatar valores no padrão brasileiro",
    },
    yAxisLabel: { control: "text", description: "Label do eixo Y" },
    brushColor: { control: "color", description: "Cor das alças do brush" },
    brushStroke: { control: "color", description: "Cor da borda do brush" },
    miniChartOpacity: {
      control: { type: "number", min: 0, max: 1, step: 0.1 },
      description: "Opacidade do mini gráfico no brush",
    },
  },
  args: {
    data: timeSeriesData,
    xAxis: "periodo",
  },
};

export default meta;
type Story = StoryObj<typeof TimeSeries>;

export const Default: Story = {
  name: "Padrão",
  args: {
    series: { bar: ["receita", "despesas"] },
    labelMap: { receita: "Receita", despesas: "Despesas" },
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo básico com barras e controle de intervalo.",
      },
    },
  },
};

export const LineChart: Story = {
  name: "Gráfico de Linha",
  args: {
    series: { line: ["receita", "despesas", "lucro"] },
    labelMap: { receita: "Receita", despesas: "Despesas", lucro: "Lucro" },
    colors: ["#22c55e", "#ef4444", "#3b82f6"],
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story: "Série temporal com linhas para múltiplas métricas.",
      },
    },
  },
};

export const AreaChart: Story = {
  name: "Gráfico de Área",
  args: {
    series: { area: ["receita", "despesas"] },
    labelMap: { receita: "Receita", despesas: "Despesas" },
    colors: ["#22c55e", "#ef4444"],
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story: "Série temporal com áreas preenchidas.",
      },
    },
  },
};

export const Combined: Story = {
  name: "Combinado",
  args: {
    series: {
      bar: ["despesas"],
      area: ["receita"],
      line: ["churn"],
    },
    labelMap: {
      receita: "Receita",
      despesas: "Despesas",
      churn: "Churn",
    },
    colors: ["#ef4444", "#22c55e", "#6366f1"],
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story: "Combina diferentes tipos de visualização em um único gráfico.",
      },
    },
  },
};

export const WithBiaxial: Story = {
  name: "Com Eixo Duplo",
  args: {
    series: {
      bar: ["receita", "despesas"],
      line: ["churn"],
    },
    labelMap: {
      receita: "Receita",
      despesas: "Despesas",
      churn: "Churn",
    },
    yAxisLabel: "Valor (R$)",
    biaxial: {
      key: ["churn"],
      label: "Churn (%)",
      percentage: true,
    },
    colors: ["#22c55e", "#ef4444", "#f59e0b"],
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story: "Série temporal com eixo Y duplo para diferentes escalas.",
      },
    },
  },
};

export const CustomRange: Story = {
  name: "Intervalo Customizado",
  args: {
    series: { line: ["receita", "despesas"] },
    labelMap: { receita: "Receita", despesas: "Despesas" },
    colors: ["#22c55e", "#ef4444"],
    defaultStartIndex: 6,
    defaultEndIndex: 18,
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story: "Série temporal com intervalo inicial customizado (meses 7-19).",
      },
    },
  },
};

export const FormatBR: Story = {
  name: "Formato pt-BR",
  args: {
    series: { bar: ["receita", "despesas"] },
    labelMap: { receita: "Receita", despesas: "Despesas" },
    formatBR: true,
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story: "Valores formatados no padrão brasileiro (12.345,67).",
      },
    },
  },
};

export const LargeDataset: Story = {
  name: "Dataset Grande",
  args: {
    data: generateTimeSeriesData(60),
    series: { line: ["receita", "despesas"] },
    labelMap: { receita: "Receita", despesas: "Despesas" },
    colors: ["#22c55e", "#ef4444"],
    defaultStartIndex: 0,
    defaultEndIndex: 11,
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Série temporal com 60 meses de dados, mostrando 12 meses por vez.",
      },
    },
  },
};

export const CustomBrushStyle: Story = {
  name: "Brush Customizado",
  args: {
    series: { area: ["receita", "despesas"] },
    labelMap: { receita: "Receita", despesas: "Despesas" },
    colors: ["#22c55e", "#ef4444"],
    brushColor: "#8b5cf6",
    brushStroke: "#8b5cf6",
    miniChartOpacity: 0.5,
    height: 500,
    chartHeight: 350,
    brushHeight: 100,
  },
  parameters: {
    docs: {
      description: {
        story: "Brush com cores e opacidade customizadas.",
      },
    },
  },
};

export const Interactive: Story = {
  name: "Interativo com Callback",
  render: (args) => {
    const [rangeInfo, setRangeInfo] = React.useState({ start: 0, end: 11 });

    return (
      <div style={{ width: "900px" }}>
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            Intervalo selecionado: {rangeInfo.start} - {rangeInfo.end}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Arraste as alças ou a área central para ajustar o intervalo
          </p>
        </div>
        <TimeSeries
          {...args}
          onRangeChange={(start, end) => setRangeInfo({ start, end })}
        />
      </div>
    );
  },
  args: {
    series: { bar: ["receita", "despesas"] },
    labelMap: { receita: "Receita", despesas: "Despesas" },
    defaultStartIndex: 0,
    defaultEndIndex: 11,
    height: 500,
    chartHeight: 350,
    brushHeight: 80,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com callback onRangeChange para capturar mudanças no intervalo.",
      },
    },
  },
};
