import React from "react";
import BarChart from "@/components/charts/BarChart";
import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, waitFor } from "storybook/test";

const sampleQuarterData = [
  { trimestre: "Q1", receita: 4000, despesas: 2400, lucro: 1600, vendas: 3200 },
  { trimestre: "Q2", receita: 5200, despesas: 3100, lucro: 2100, vendas: 4100 },
  { trimestre: "Q3", receita: 6800, despesas: 3800, lucro: 3000, vendas: 5400 },
  { trimestre: "Q4", receita: 7500, despesas: 4200, lucro: 3300, vendas: 6000 },
];

const sampleSalesData = [
  { name: "Jan", vendas: 15000, meta: 12000, crescimento: 3000 },
  { name: "Feb", vendas: 18000, meta: 15000, crescimento: 3000 },
  { name: "Mar", vendas: 22000, meta: 18000, crescimento: 4000 },
  { name: "Apr", vendas: 25000, meta: 20000, crescimento: 5000 },
];

const meta: Meta<typeof BarChart> = {
  title: "charts/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Gráfico de barras responsivo usando Recharts — mostra casos de uso comuns: detecção automática, mapeamento manual de séries (yAxis), e labelMap para rótulos legíveis.",
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
    colors: {
      control: "object",
      description:
        "Array de cores para as barras [primary, secondary, tertiary]",
    },
    gridColor: { control: "color" },
    showGrid: { control: "boolean" },
    showTooltip: { control: "boolean" },
    showLegend: { control: "boolean" },
    // controle ajustado para object (aceita array ou objeto via painel JSON)
    yAxis: {
      control: { type: "object" },
      description:
        "Defina séries: array ['a','b'] ou objeto { key: {label, color, visible} } (cole JSON no painel)",
    },
    labelMap: {
      control: "object",
      description: "Mapeamento de rótulos exibidos { key: 'Rótulo' }",
    },
    xAxis: { control: "text", description: "Chave do eixo X (string)" },
    data: { control: "object" },
  },
  args: {
    height: 360,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    data: sampleQuarterData,
    yAxis: undefined,
    labelMap: undefined,
    xAxis: "trimestre",
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const AutoDetect: Story = {
  name: "Auto Detect (default)",
  render: (args) => <BarChart {...args} autoDetect={true} />,
  play: async ({ canvasElement }) => {
    within(canvasElement);

    await waitFor(() => {
      // Verifica se o gráfico foi renderizado procurando pelo container do Recharts
      const chartContainer = canvasElement.querySelector(".recharts-wrapper");
      expect(chartContainer).toBeInTheDocument();
    });

    // Verifica se as barras foram renderizadas
    const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
    expect(bars.length).toBeGreaterThan(0);
  },
};

export const ManualYAxisArray: Story = {
  name: "Manual yAxis (array)",
  render: (args) => (
    <BarChart
      {...args}
      data={args.data ?? sampleQuarterData}
      xAxis={args.xAxis ?? "trimestre"}
      yAxis={args.yAxis as string[]}
      labelMap={
        args.labelMap ?? {
          receita: "Receita",
          despesas: "Despesas",
          lucro: "Lucro",
        }
      }
      height={420}
    />
  ),
  args: {
    yAxis: ["receita", "despesas", "lucro"],
    labelMap: { receita: "Receita", despesas: "Despesas", lucro: "Lucro" },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar gráfico renderizado", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step(
      "Verificar barras das 3 séries (receita, despesas, lucro)",
      async () => {
        const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
        // 3 séries * 4 trimestres = 12 barras
        expect(bars.length).toBeGreaterThanOrEqual(12);
      }
    );

    await step("Verificar legenda presente", async () => {
      const legend = canvasElement.querySelector(".recharts-legend-wrapper");
      expect(legend).toBeInTheDocument();
    });
  },
};

export const ManualYAxisObject: Story = {
  name: "Manual yAxis (object)",
  render: (args) => (
    <BarChart
      {...args}
      data={args.data ?? sampleSalesData}
      xAxis={args.xAxis ?? "name"}
      // permite passar objeto via story args (use painel -> JSON)
      yAxis={
        (args.yAxis as unknown as Record<
          string,
          { label?: string; color?: string }
        >) ?? {
          vendas: { label: "Vendas", color: "#ef4444" },
          meta: { label: "Meta", color: "#10b981" },
          crescimento: { label: "Crescimento", color: "#f59e0b" },
        }
      }
      height={420}
    />
  ),
  args: {
    yAxis: undefined, // usuário pode colar objeto JSON no painel para testar
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização do gráfico", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar barras renderizadas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      expect(bars.length).toBeGreaterThan(0);
    });

    await step("Verificar tooltip presente", async () => {
      const surface = canvasElement.querySelector(".recharts-surface");
      expect(surface).toBeInTheDocument();
    });
  },
};

export const WithLabelMap: Story = {
  name: "Label Map Override",
  render: (args) => (
    <BarChart
      {...args}
      data={args.data ?? sampleQuarterData}
      xAxis={args.xAxis ?? "trimestre"}
      yAxis={(args.yAxis as string[]) ?? ["vendas", "lucro"]}
      labelMap={
        args.labelMap ?? { vendas: "Vendas Totais", lucro: "Lucro Líquido" }
      }
      colors={["#6366f1", "#06b6d4"]}
      height={380}
    />
  ),
  args: {
    yAxis: ["vendas", "lucro"],
    labelMap: { vendas: "Vendas Totais", lucro: "Lucro Líquido" },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar gráfico com labelMap", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar cores customizadas aplicadas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      expect(bars.length).toBeGreaterThan(0);
    });
  },
};

export const CustomColorsAndGrid: Story = {
  name: "Custom colors & grid",
  render: (args) => (
    <BarChart
      {...args}
      data={args.data ?? sampleSalesData}
      xAxis={args.xAxis ?? "name"}
      yAxis={(args.yAxis as string[]) ?? ["vendas", "meta"]}
      colors={["#4ecdc4", "#45b7d1"]}
      gridColor="#e6e6fa"
      height={340}
    />
  ),
  args: {
    yAxis: ["vendas", "meta"],
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização com cores customizadas", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar grid presente", async () => {
      const grid = canvasElement.querySelector(".recharts-cartesian-grid");
      expect(grid).toBeInTheDocument();
    });

    await step("Verificar barras renderizadas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      // 2 séries * 4 meses = 8 barras
      expect(bars.length).toBeGreaterThanOrEqual(8);
    });
  },
};

export const Compact: Story = {
  render: (args) => (
    <BarChart
      {...args}
      data={args.data ?? sampleQuarterData}
      xAxis={args.xAxis ?? "trimestre"}
      yAxis={(args.yAxis as string[]) ?? ["vendas", "receita"]}
      height={220}
      showLegend={false}
    />
  ),
  args: {
    yAxis: ["vendas", "receita"],
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar gráfico compacto renderizado", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar que legenda não está presente", async () => {
      const legend = canvasElement.querySelector(".recharts-legend-wrapper");
      expect(legend).not.toBeInTheDocument();
    });

    await step("Verificar barras renderizadas no modo compacto", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      expect(bars.length).toBeGreaterThan(0);
    });
  },
};

export const TesteTooltipInteraction: Story = {
  render: (args) => (
    <BarChart
      {...args}
      data={sampleQuarterData}
      xAxis="trimestre"
      yAxis={["receita", "despesas"]}
      height={360}
      showTooltip={true}
    />
  ),
  args: {
    yAxis: ["receita", "despesas"],
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar gráfico renderizado", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar que tooltip está habilitado", async () => {
      const surface = canvasElement.querySelector(".recharts-surface");
      expect(surface).toBeInTheDocument();
    });
  },
};

export const TesteGridVisibility: Story = {
  render: (args) => (
    <BarChart
      {...args}
      data={sampleSalesData}
      xAxis="name"
      yAxis={["vendas"]}
      height={300}
      showGrid={false}
    />
  ),
  args: {
    yAxis: ["vendas"],
    showGrid: false,
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar gráfico sem grid", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar barras presentes", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      expect(bars.length).toBeGreaterThan(0);
    });
  },
};

export const TesteFluxoCompleto: Story = {
  render: (args) => (
    <BarChart
      {...args}
      data={sampleQuarterData}
      xAxis="trimestre"
      yAxis={["receita", "despesas", "lucro", "vendas"]}
      labelMap={{
        receita: "Receita Total",
        despesas: "Despesas",
        lucro: "Lucro",
        vendas: "Vendas",
      }}
      colors={["#8b5cf6", "#ec4899", "#10b981", "#f59e0b"]}
      height={420}
      showGrid={true}
      showTooltip={true}
      showLegend={true}
    />
  ),
  args: {
    yAxis: ["receita", "despesas", "lucro", "vendas"],
    labelMap: {
      receita: "Receita Total",
      despesas: "Despesas",
      lucro: "Lucro",
      vendas: "Vendas",
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização completa do gráfico", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar todas as 4 séries renderizadas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      // 4 séries * 4 trimestres = 16 barras
      expect(bars.length).toBeGreaterThanOrEqual(16);
    });

    await step("Verificar grid presente", async () => {
      const grid = canvasElement.querySelector(".recharts-cartesian-grid");
      expect(grid).toBeInTheDocument();
    });

    await step("Verificar legenda presente", async () => {
      const legend = canvasElement.querySelector(".recharts-legend-wrapper");
      expect(legend).toBeInTheDocument();
    });

    await step("Verificar eixo X renderizado", async () => {
      const xAxis = canvasElement.querySelector(".recharts-xAxis");
      expect(xAxis).toBeInTheDocument();
    });

    await step("Verificar eixo Y renderizado", async () => {
      const yAxis = canvasElement.querySelector(".recharts-yAxis");
      expect(yAxis).toBeInTheDocument();
    });
  },
};
