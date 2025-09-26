import Chart from "@/components/rechart/Chart";
import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sampleQuarterData = [
  {
    trimestre: "Q1/2024",
    receita: -4000,
    despesas: 2400,

    churn: 180,
  },
  {
    trimestre: "Q2/2024",
    receita: 5200,
    despesas: 3100,

    churn: 150,
  },
  {
    trimestre: "Q3/2024",
    receita: 6800,
    despesas: 3800,

    churn: 120,
  },
  {
    trimestre: "Q4/2024",
    receita: 7500,
    despesas: 4200,

    churn: 100,
  },

  {
    trimestre: "Q1/2025",
    receita: 8200,
    despesas: 4600,

    churn: 95,
  },
  {
    trimestre: "Q2/2025",
    receita: 9100,
    despesas: 5000,

    churn: 90,
  },
  {
    trimestre: "Q3/2025",
    receita: 10000,
    despesas: 5600,

    churn: 80,
  },
  {
    trimestre: "Q4/2025",
    receita: 11200,
    despesas: 6000,

    churn: 75,
  },
];

const meta: Meta<typeof Chart> = {
  title: "charts/Chart",
  component: Chart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composed chart que aceita a prop `series` para combinar `bar`, `line` e `area` em um único gráfico. Agora com mais métricas e datasets multi-ano para análises mais ricas.",
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
    height: { control: { type: "number", min: 200, max: 800, step: 50 } },
    series: {
      control: "object",
      description: "Defina séries: { bar: [...], line: [...], area: [...] }",
    },
    labelMap: { control: "object" },
    xAxis: { control: "text" },
    data: { control: "object" },
    colors: { control: "object" },
    showLegend: { control: "boolean" },
    showGrid: { control: "boolean" },
  },
  args: {
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    data: sampleQuarterData,
    xAxis: "trimestre",
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

// Helper template to ensure ResponsiveContainer has explicit space in Storybook
const Template = (args: React.ComponentProps<typeof Chart>) => (
  <div style={{ width: "900px", height: "420px" }}>
    <Chart {...args} />
  </div>
);

export const Default: Story = {
  name: "Default ( controls)",
  render: Template,
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão com dados trimestrais. Use os controles (painel `Controls`) para modificar `series`, `colors`, `height`, `showGrid` e outras props em tempo real.",
      },
    },
  },
};

export const BarsAndLine: Story = {
  name: "Bars + Line",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
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
          lucro: "Lucro",
          positivacao: "Positivação",
          vendas: "Vendas",
        }}
        colors={["#ef4444", "#22c55e", "#6366f1", "#06b6d4"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combina barras para `despesas`, áreas para `lucro` e `positivacao` e uma linha para `vendas`.",
      },
    },
  },
};

export const BarAndArea: Story = {
  name: "Bar + Area",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={350}
        series={{ bar: ["despesas"], area: ["receita"] }}
        labelMap={{ despesas: "Despesas", lucro: "Lucro" }}
        colors={["#f97316", "#10b981"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo simples com barras e área — útil para comparações entre categorias e tendência acumulada.",
      },
    },
  },
};

export const BarLineArea: Story = {
  name: "Bar + Line + Area",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={350}
        series={{ bar: ["despesas"], area: ["receita"], line: ["churn"] }}
        labelMap={{ despesas: "Despesas", lucro: "Lucro", vendas: "Vendas" }}
        colors={["#f43f5e", "#3b82f6", "#22c55e"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combinação típica: barras para volume, linha para indicador e área para métrica adicional.",
      },
    },
  },
};

export const MixedMultipleSeries: Story = {
  name: "Mixed: multiple bars + lines",
  render: (args) => (
    <div style={{ width: "1100px", height: "480px" }}>
      <Chart
        {...args}
        height={380}
        series={{
          bar: ["receita", "vendas"],
          line: ["positivacao", "lucro", "roi"],
          area: ["churn"],
        }}
        labelMap={{
          receita: "Receita",
          vendas: "Vendas",
          positivacao: "% Posit",
          lucro: "Lucro",
          roi: "ROI (%)",
          churn: "Churn",
        }}
        colors={[
          "#6366f1",
          "#06b6d4",
          "#f97316",
          "#22c55e",
          "#eab308",
          "#ef4444",
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com múltiplas séries (várias barras e linhas) para demonstrar mapeamento de cores e legenda automática.",
      },
    },
  },
};

// --- Novas variants de dados para demonstração ---

const zeroValuesData = sampleQuarterData.map((row, idx) => ({
  ...row,
  receita: idx % 2 === 0 ? 0 : row.receita,
  despesas: idx % 3 === 0 ? 0 : row.despesas,
}));

const negativeValuesData = sampleQuarterData.map((row, idx) => ({
  ...row,
  receita: idx === 2 ? -1200 : row.receita,
  despesas: idx === 5 ? -800 : row.despesas,
}));

// Many points: gera dados mensais ao invés de trimestrais
const manyPointsData = Array.from({ length: 36 }).map((_, i) => ({
  periodo: `M${i + 1}`,
  receita: Math.round(3000 + Math.sin(i / 3) * 1200 + i * 15),
  despesas: Math.round(1800 + Math.cos(i / 4) * 900 + i * 8),
  churn: Math.round(100 - ((i * 0.5) % 80)),
}));

const singlePointData = [
  { trimestre: "Q1/2026", receita: 5000, despesas: 2000, churn: 120 },
];

const mixedTypesData = [
  { label: "A", value: 1200 },
  { label: "B", value: 0 },
  { label: "C", value: -300 },
  { label: "D", value: 800 },
  { label: "E", value: 2400 },
];

export const ZeroValues: Story = {
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        data={zeroValuesData}
        height={360}
        series={{ bar: ["despesas"], line: ["receita"], area: ["churn"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", churn: "Churn" }}
        colors={["#3b82f6", "#f97316", "#ef4444"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dados com zeros esparsos para testar escalas e eixos.",
      },
    },
  },
};

export const NegativeValues: Story = {
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        data={negativeValuesData}
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
        story: "Dados contendo valores negativos — útil para perdas e ajustes.",
      },
    },
  },
};

export const ManyPoints: Story = {
  render: (args) => (
    <div style={{ width: "1200px", height: "480px" }}>
      <Chart
        {...args}
        data={manyPointsData}
        height={420}
        xAxis="periodo"
        series={{ line: ["receita"], area: ["despesas"], bar: ["churn"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", churn: "Churn" }}
        colors={["#6366f1", "#10b981", "#f59e0b"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Grande série de pontos (36) para testar desempenho e renderização de muitos ticks no eixo X.",
      },
    },
  },
};

export const SinglePoint: Story = {
  render: (args) => (
    <div style={{ width: "600px", height: "360px" }}>
      <Chart
        {...args}
        data={singlePointData}
        height={300}
        series={{ bar: ["despesas"], line: ["receita"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas" }}
        colors={["#06b6d4", "#ef4444"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Apenas um ponto — verifica se o componente lida com datasets minimalistas.",
      },
    },
  },
};

export const MixedTypes: Story = {
  render: (args) => (
    <div style={{ width: "700px", height: "380px" }}>
      <Chart
        {...args}
        data={mixedTypesData}
        height={340}
        xAxis="label"
        series={{ bar: ["value"] }}
        labelMap={{ value: "Valor" }}
        colors={["#8b5cf6"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dados mistos com zeros e negativos para testar tooltips e formatação.",
      },
    },
  },
};
