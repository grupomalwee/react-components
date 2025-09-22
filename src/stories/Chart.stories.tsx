import React from "react";
import Chart from "@/components/rechart/Chart";
import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Dataset mais robusto: 2 anos + novas métricas
const sampleQuarterData = [
  { trimestre: "Q1/2024", receita: 4000, despesas: 2400, lucro: 1600, vendas: 3200, positivacao: 3002, churn: 180, roi: 12 },
  { trimestre: "Q2/2024", receita: 5200, despesas: 3100, lucro: 2100, vendas: 4100, positivacao: 4500, churn: 150, roi: 18 },
  { trimestre: "Q3/2024", receita: 6800, despesas: 3800, lucro: 3000, vendas: 5400, positivacao: 5200, churn: 120, roi: 22 },
  { trimestre: "Q4/2024", receita: 7500, despesas: 4200, lucro: 3300, vendas: 6000, positivacao: 6000, churn: 100, roi: 25 },

  { trimestre: "Q1/2025", receita: 8200, despesas: 4600, lucro: 3600, vendas: 6600, positivacao: 6500, churn: 95, roi: 27 },
  { trimestre: "Q2/2025", receita: 9100, despesas: 5000, lucro: 4100, vendas: 7200, positivacao: 7000, churn: 90, roi: 30 },
  { trimestre: "Q3/2025", receita: 10000, despesas: 5600, lucro: 4400, vendas: 7800, positivacao: 7600, churn: 80, roi: 32 },
  { trimestre: "Q4/2025", receita: 11200, despesas: 6000, lucro: 5200, vendas: 8800, positivacao: 8200, churn: 75, roi: 35 },
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
    height: 400,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    data: sampleQuarterData,
    xAxis: "trimestre",
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const BarsAndLine: Story = {
  name: "Bars + Line",
  render: (args) => (
    <Chart
      {...args}
      series={{ bar: ["despesas"], area: ["lucro", "positivacao"], line: ["vendas"] }}
      labelMap={{
        despesas: "Despesas",
        lucro: "Lucro",
        positivacao: "Positivação",
        vendas: "Vendas",
      }}
    />
  ),
};

export const BarAndArea: Story = {
  name: "Bar + Area",
  render: (args) => (
    <Chart
      {...args}
      series={{ bar: ["despesas"], area: ["lucro"] }}
      labelMap={{ despesas: "Despesas", lucro: "Lucro" }}
      height={420}
      colors={["#f97316", "#10b981"]}
    />
  ),
};

export const BarLineArea: Story = {
  name: "Bar + Line + Area",
  render: (args) => (
    <Chart
      {...args}
      series={{ bar: ["despesas"], area: ["lucro"], line: ["vendas"] }}
      labelMap={{ despesas: "Despesas", lucro: "Lucro", vendas: "Vendas" }}
      height={420}
      colors={["#f43f5e", "#3b82f6", "#22c55e"]}
    />
  ),
};

export const MixedMultipleSeries: Story = {
  name: "Mixed: multiple bars + lines",
  render: (args) => (
    <Chart
      {...args}
      series={{ bar: ["receita", "vendas"], line: ["positivacao", "lucro", "roi"], area: ["churn"] }}
      labelMap={{
        receita: "Receita",
        vendas: "Vendas",
        positivacao: "% Posit",
        lucro: "Lucro",
        roi: "ROI (%)",
        churn: "Churn",
      }}
      colors={["#6366f1", "#06b6d4", "#f97316", "#22c55e", "#eab308", "#ef4444"]}
      height={480}
    />
  ),
};
