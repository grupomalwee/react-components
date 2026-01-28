import React from "react";
import Chart from "@/components/ui/charts/Chart";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

const sampleData = [
  { periodo: "Jan/24", receita: 4200, despesas: 2800, churn: 180 },
  { periodo: "Fev/24", receita: 5100, despesas: 3200, churn: 165 },
  { periodo: "Mar/24", receita: 6800, despesas: 3900, churn: 142 },
  { periodo: "Abr/24", receita: 7500, despesas: 4300, churn: 128 },
];

const negativeData = [
  { periodo: "Q1/24", receita: -2000, despesas: 1800, churn: 200 },
  { periodo: "Q2/24", receita: 3500, despesas: -1200, churn: 170 },
  { periodo: "Q3/24", receita: 5800, despesas: 3400, churn: 140 },
];

const meta: Meta<typeof Chart> = {
  title: "charts/Chart",
  component: Chart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Chart combinado que aceita barras, linhas e áreas em um único gráfico.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const sampleData = [
  { periodo: 'Jan/24', receita: 4200, despesas: 2800, churn: 180 },
  { periodo: 'Fev/24', receita: 5100, despesas: 3200, churn: 165 },
];

export default function Example() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={sampleData} xAxis="periodo" series={{ bar: ['despesas'] }} labelMap={{ despesas: 'Despesas' }} height={360} />
    </div>
  );
}
`,
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
    data: { control: "object", description: "Dados do gráfico" },
    series: {
      control: "object",
      description: "Configuração das séries (bar, line, area)",
    },
    className: { control: "text", description: "Classes CSS adicionais" },
    chartMargin: {
      control: "object",
      description: "Margens do gráfico (top, right, bottom, left)",
    },
    height: {
      control: { type: "number", min: 200, max: 600, step: 50 },
      description: "Altura do gráfico em pixels",
    },
    width: {
      control: "text",
      description: "Largura do gráfico (número ou string)",
    },
    colors: {
      control: "object",
      description: "Array de cores para as séries",
    },
    gridColor: { control: "color", description: "Cor da grade" },
    showGrid: { control: "boolean", description: "Mostrar grade" },
    showTooltip: { control: "boolean", description: "Mostrar tooltip" },
    showLegend: { control: "boolean", description: "Mostrar legenda" },
    title: { control: "text", description: "Título do gráfico" },
    titlePosition: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Posição do título",
    },
    showLabels: {
      control: "boolean",
      description: "Mostrar labels nos dados",
    },
    labelMap: {
      control: "object",
      description: "Mapeamento de labels customizados",
    },
    valueFormatter: {
      control: "object",
      description: "Função customizada para formatar valores",
    },
    categoryFormatter: {
      control: "object",
      description: "Função para formatar categorias",
    },
    periodLabel: {
      control: "text",
      description: "Label para o período no tooltip",
    },
    xAxisLabel: { control: "text", description: "Label do eixo X" },
    yAxisLabel: { control: "text", description: "Label do eixo Y" },
    xAxis: {
      control: "object",
      description: "Configuração do eixo X (string ou XAxisConfig)",
    },
    biaxial: {
      control: "object",
      description: "Configuração de eixo Y duplo",
    },
    enableHighlights: {
      control: "boolean",
      description: "Habilitar destaque de séries",
    },
    enableShowOnly: {
      control: "boolean",
      description: "Habilitar mostrar apenas série selecionada",
    },
    enablePeriodsDropdown: {
      control: "boolean",
      description: "Habilitar dropdown de períodos",
    },
    enableDraggableTooltips: {
      control: "boolean",
      description: "Habilitar tooltips arrastáveis",
    },
    showTooltipTotal: {
      control: "boolean",
      description: "Mostrar total no tooltip",
    },
    maxTooltips: {
      control: { type: "number", min: 1, max: 10 },
      description: "Número máximo de tooltips arrastáveis",
    },
    formatBR: {
      control: "boolean",
      description: "Formatar valores no padrão brasileiro (pt-BR)",
    },
    legendUppercase: {
      control: "boolean",
      description: "Legendas em maiúsculas",
    },
  },
  args: {
    data: sampleData,
    xAxis: "periodo",
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

const Template = (args: React.ComponentProps<typeof Chart>) => (
  <div style={{ width: "900px", height: "350px" }}>
    <Chart {...args} />
  </div>
);

export const Default: Story = {
  name: "Padrão",
  render: Template,
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const sampleData = [
  { periodo: 'Jan/24', receita: 4200, despesas: 2800, churn: 180 },
  { periodo: 'Fev/24', receita: 5100, despesas: 3200, churn: 165 },
  { periodo: 'Mar/24', receita: 6800, despesas: 3900, churn: 142 },
  { periodo: 'Abr/24', receita: 7500, despesas: 4300, churn: 128 },
];

export default function Default() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={sampleData} xAxis="periodo" height={360} />
    </div>
  );
}
`,
      },
    },
  },
};

export const Combined: Story = {
  name: "Combinado",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["despesas"],
          area: ["receita"],
          line: ["churn"],
        }}
        labelMap={{
          despesas: "Despesas",
          receita: "Receita",
          churn: "Churn",
        }}
        colors={["#ef4444", "#22c55e", "#6366f1"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Combina barras, áreas e linhas em um único gráfico.",
      },
    },
  },
};

export const Biaxial: Story = {
  name: "Eixo Duplo",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={360}
        xAxis="periodo"
        series={{ bar: ["receita", "despesas"], area: ["churn"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", churn: "Churn" }}
        yAxisLabel="Valor (R$)"
        biaxial={{ key: ["churn"], label: "Churn (%)", percentage: true }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo demonstrando o uso de `biaxial` para mapear `churn` ao eixo direito (com sufixo `%`).",
      },
    },
  },
};

export const NegativeValues: Story = {
  name: "Com Negativos",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        data={negativeData}
        height={360}
        series={{ bar: ["despesas"], line: ["receita"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas" }}
        colors={["#06b6d4", "#ef4444"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Exemplo com valores negativos para mostrar perdas e ajustes.",
      },
    },
  },
};

export const FormatBR: Story = {
  name: "Formato pt-BR",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={360}
        series={{ bar: ["receita", "despesas"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas" }}
        xAxis="periodo"
        formatBR
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo que ativa a prop `formatBR` para formatar valores no padrão pt-BR (ex.: 12.345,67)",
      },
    },
  },
};

export const CustomFormatter: Story = {
  name: "Formatador Custom",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["receita", "despesas"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
        }}
        showLabels={true}
        valueFormatter={(props) => `R$ ${props.formattedValue}`}
        colors={["#10b981", "#ef4444"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de como usar valueFormatter para adicionar símbolos customizados aos labels dos dados (R$, %, €, etc).",
      },
    },
  },
};

export const AllBars: Story = {
  name: "Só Barras",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["receita", "despesas", "churn"],
        }}
        labelMap={{
          receita: "Receita Total",
          despesas: "Despesas Totais",
          churn: "Churn Total",
        }}
        colors={["#0ea5e9", "#f43f5e", "#a855f7"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Todas as séries renderizadas como barras agrupadas.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar todas as barras renderizadas", async () => {
      await waitFor(() => {
        const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
        expect(bars.length).toBe(12); // 3 séries × 4 pontos
      });
    });

    await step("Verificar ausência de linhas e áreas", async () => {
      const lines = canvasElement.querySelectorAll(".recharts-line");
      const areas = canvasElement.querySelectorAll(".recharts-area");

      expect(lines.length).toBe(0);
      expect(areas.length).toBe(0);
    });
  },
};

export const AllLines: Story = {
  name: "Só Linhas",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          line: ["receita", "despesas", "churn"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
          churn: "Churn",
        }}
        colors={["#14b8a6", "#f97316", "#8b5cf6"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Todas as séries renderizadas como linhas.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar todas as linhas renderizadas", async () => {
      await waitFor(() => {
        const lines = canvasElement.querySelectorAll(".recharts-line");
        expect(lines.length).toBe(3);
      });
    });

    await step("Verificar ausência de barras e áreas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      const areas = canvasElement.querySelectorAll(".recharts-area");

      expect(bars.length).toBe(0);
      expect(areas.length).toBe(0);
    });
  },
};

export const AllAreas: Story = {
  name: "Só Áreas",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          area: ["receita", "despesas", "churn"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
          churn: "Churn",
        }}
        colors={["#06b6d4", "#f59e0b", "#ec4899"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Todas as séries renderizadas como áreas empilhadas.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar todas as áreas renderizadas", async () => {
      await waitFor(() => {
        const areas = canvasElement.querySelectorAll(".recharts-area");
        expect(areas.length).toBe(3);
      });
    });

    await step("Verificar ausência de barras e linhas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      const lines = canvasElement.querySelectorAll(".recharts-line");

      expect(bars.length).toBe(0);
      expect(lines.length).toBe(0);
    });
  },
};

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
    });
  }

  return data;
};

const timeSeriesData = generateTimeSeriesData(18);

export const TimeSeries: Story = {
  name: "Time Series",
  render: (args) => (
    <div style={{ width: "900px" }}>
      <Chart
        {...args}
        data={timeSeriesData}
        xAxis="periodo"
        series={{ bar: ["receita", "despesas"], area: ["lucro"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", lucro: "Lucro" }}
        height={350}
        timeSeries={{
          start: 0,
          end: 11,
          height: 40,
        }}
        timeSeriesLegend="LucroLucroLucroLucroLucroLucroLucroLucroLucroLucroLucroLucro"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chart com timeSeries habilitado. Use o brush para selecionar o intervalo de dados a ser exibido.",
      },
    },
  },
};

export const Empty: Story = {
  name: "Vazio",
  render: (args) => (
    <div
      style={{ width: "900px", height: "350px" }}
      data-testid="empty-chart-wrapper"
    >
      <Chart
        {...args}
        data={[]}
        height={350}
        series={{
          bar: ["receita"],
        }}
        labelMap={{
          receita: "Receita",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico sem dados para testar estado vazio.",
      },
    },
  },
};

export const Loading: Story = {
  name: "Loading Estado",
  render: (args) => (
    <div
      style={{ width: "900px", height: "350px" }}
      data-testid="loading-chart-wrapper"
    >
      <Chart
        {...args}
        data={[]}
        height={350}
        series={{
          bar: ["receita"],
        }}
        labelMap={{
          receita: "Receita",
        }}
        isLoading={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico em estado de carregamento.",
      },
    },
  },
};
