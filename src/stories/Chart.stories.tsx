import React from "react";
import Chart from "@/components/rechart/Chart";
import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sampleQuarterData = [
  {
    trimestre: "Q1",
    receita: 4000,
    despesas: 2400,
    lucro: 1600,
    vendas: 3200,
    positivacao: 3002,
  },
  {
    trimestre: "Q2",
    receita: 5200,
    despesas: 3100,
    lucro: 2100,
    vendas: 4100,
    positivacao: 4500,
  },
  {
    trimestre: "Q3",
    receita: 6800,
    despesas: 3800,
    lucro: 3000,
    vendas: 5400,
    positivacao: 5200,
  },
  {
    trimestre: "Q4",
    receita: 7500,
    despesas: 4200,
    lucro: 3300,
    vendas: 6000,
    positivacao: 6000,
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
          "Composed chart que aceita a prop `series` para combinar `bar`, `line` e `area` em um único gráfico. Use o Playground para experimentar diferentes combinações de séries, cores e mapeamentos.",
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
    height: 380,
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
      data={args.data ?? sampleQuarterData}
      xAxis={args.xAxis ?? "trimestre"}
      series={{ bar: ["receita", "vendas"], line: ["positivacao"] }}
      labelMap={{
        receita: "Receita",
        vendas: "Vendas",
        positivacao: "Positivação (%)",
      }}
      height={420}
    />
  ),
};

export const BarAndArea: Story = {
  name: "Bar + Area",
  render: (args) => (
    <Chart
      {...args}
      data={args.data ?? sampleQuarterData}
      xAxis={args.xAxis ?? "trimestre"}
      series={{ bar: ["despesas"], area: ["lucro"] }}
      labelMap={{ despesas: "Despesas", lucro: "Lucro" }}
      height={420}
    />
  ),
};
export const BarLineArea: Story = {
  name: "Bar + Line + Area",
  render: (args) => (
    <Chart
      {...args}
      data={args.data ?? sampleQuarterData}
      xAxis={args.xAxis ?? "trimestre"}
      series={{ bar: ["despesas"], area: ["lucro"], line: ["vendas"] }}
      labelMap={{ despesas: "Despesas", lucro: "Lucro", vendas: "Vendas" }}
      height={420}
    />
  ),
};

export const MixedMultipleSeries: Story = {
  name: "Mixed: multiple bars + lines",
  render: (args) => (
    <Chart
      {...args}
      data={sampleQuarterData}
      xAxis="trimestre"
      series={{ bar: ["receita", "vendas"], line: ["positivacao", "lucro"] }}
      labelMap={{
        receita: "Receita",
        vendas: "Vendas",
        positivacao: "% Posit",
        lucro: "Lucro",
      }}
      colors={["#6366f1", "#06b6d4", "#f97316", "#ef4444"]}
      showLabels={true}
      height={460}
    />
  ),
};
