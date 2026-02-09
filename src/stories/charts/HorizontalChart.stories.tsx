import { HorizontalChart } from "@/components/ui/charts";
import { Meta, StoryObj } from "@storybook/react-vite/*";
import { gerarDadosCidades } from "./cidades-brasil";

const meta = {
  title: "Charts/HorizontalChart",
  component: HorizontalChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HorizontalChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const smallData = [
  { cidade: "São Paulo/SP", vendas: 15420, meta: 12000 },
  { cidade: "Rio de Janeiro/RJ", vendas: 12300, meta: 10000 },
  { cidade: "Belo Horizonte/MG", vendas: 8900, meta: 9000 },
  { cidade: "Brasília/DF", vendas: 7600, meta: 8000 },
  { cidade: "Curitiba/PR", vendas: 6800, meta: 7000 },
];

const largeData = [
  { cidade: "São Paulo/SP", vendas: 15420, meta: 12000 },
  { cidade: "Rio de Janeiro/RJ", vendas: 12300, meta: 10000 },
  { cidade: "Belo Horizonte/MG", vendas: 8900, meta: 9000 },
  { cidade: "Brasília/DF", vendas: 7600, meta: 8000 },
  { cidade: "Curitiba/PR", vendas: 6800, meta: 7000 },
  { cidade: "Fortaleza/CE", vendas: 6200, meta: 6500 },
  { cidade: "Salvador/BA", vendas: 5900, meta: 6000 },
  { cidade: "Manaus/AM", vendas: 5400, meta: 5500 },
  { cidade: "Recife/PE", vendas: 5100, meta: 5200 },
  { cidade: "Porto Alegre/RS", vendas: 4800, meta: 5000 },
  { cidade: "Goiânia/GO", vendas: 4500, meta: 4800 },
  { cidade: "Belém/PA", vendas: 4200, meta: 4500 },
  { cidade: "Guarulhos/SP", vendas: 3900, meta: 4000 },
  { cidade: "Campinas/SP", vendas: 3600, meta: 3800 },
  { cidade: "São Luís/MA", vendas: 3300, meta: 3500 },
  { cidade: "Maceió/AL", vendas: 3000, meta: 3200 },
  { cidade: "Natal/RN", vendas: 2800, meta: 3000 },
  { cidade: "Teresina/PI", vendas: 2600, meta: 2800 },
  { cidade: "João Pessoa/PB", vendas: 2400, meta: 2600 },
  { cidade: "Aracaju/SE", vendas: 2200, meta: 2400 },
];

export const Default: Story = {
  args: {
    data: smallData,
    series: { bar: ["vendas"] },
    xAxis: "cidade",
    yAxisLabel: "Vendas",
    title: "Vendas por Cidade",
    height: 400,
  },
};

export const MultipleSeriesWithScroll: Story = {
  args: {
    data: largeData,
    series: { bar: ["vendas", "meta"] },
    xAxis: "cidade",
    yAxisLabel: "Valor (R$)",
    title: "Vendas vs Meta - Top 20 Cidades",
    height: 500,
    showLegend: true,
    colors: ["#666665", "#0d1136"],

    labelMap: {
      vendas: "Vendas Realizadas",
      meta: "Meta Estabelecida",
    },
  },
};

export const WithCustomColors: Story = {
  args: {
    data: largeData,
    series: { bar: ["vendas"] },
    xAxis: "cidade",
    yAxisLabel: "Vendas (R$)",
    title: "Ranking de Vendas",
    height: 500,
    colors: ["#10b981"],
    showGrid: true,
    showLabels: true,
  },
};

export const WithHighlights: Story = {
  args: {
    data: largeData.slice(0, 15),
    series: { bar: ["vendas", "meta"] },
    xAxis: "cidade",
    yAxisLabel: "Valor (R$)",
    title: "Vendas por Cidade - Modo Interativo",
    height: 500,
    enableHighlights: true,
    enableShowOnly: true,
    showLegend: true,
  },
};

export const WithValueFormatter: Story = {
  args: {
    data: smallData,
    series: { bar: ["vendas", "meta"] },
    xAxis: "cidade",
    yAxisLabel: "Vendas",
    title: "Vendas Formatadas",
    height: 400,
    showLabels: true,
    showLegend: true,
  },
};

export const WithTooltipTotal: Story = {
  args: {
    data: largeData,
    series: { bar: ["vendas", "meta"] },
    xAxis: "cidade",
    yAxisLabel: "Valor (R$)",
    title: "Vendas com Total no Tooltip",
    height: 500,
    showTooltipTotal: true,
    showLegend: true,
    colors: ["#666665", "#0d1136"],
  },
};

export const WithCustomLegend: Story = {
  args: {
    data: smallData,
    series: { bar: ["vendas", "meta"] },
    xAxis: "cidade",
    yAxisLabel: "Valor (R$)",
    title: "Vendas com Legenda Customizada",
    height: 400,
    customLegend: true,
    showLegend: false,
    formatBR: true,
  },
};

const horizontalBarsData = gerarDadosCidades();
export const LongScroll: Story = {
  args: {
    data: horizontalBarsData,
    series: { bar: ["valorAnoAnterior", "valorReal"] },
    xAxis: "cidade",
    yAxisLabel: "Faturamento (mil R$)",
    title: "Faturamento por Estado - Todas as Regiões",
    height: 600,
    colors: ["#666665", "#0d1136"],
    orderBy: "valorReal",

    showLabels: true,
    showGrid: true,
  },
};

export const MinimalConfig: Story = {
  args: {
    data: [
      { produto: "Produto A", quantidade: 450 },
      { produto: "Produto B", quantidade: 320 },
      { produto: "Produto C", quantidade: 280 },
      { produto: "Produto D", quantidade: 195 },
    ],
    series: { bar: ["quantidade"] },
    xAxis: "produto",
    height: 300,
  },
};
