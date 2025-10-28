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
  title: "charts/Bar Chart",
  component: BarChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Gráfico de barras responsivo usando Recharts — mostra casos de uso comuns: detecção automática, mapeamento manual de séries (yAxis), e labelMap para rótulos legíveis.",
      },
      // Exemplo de uso mostrado no painel 'Show code' (visão do consumidor)
      source: {
        code: `import React from 'react';
import BarChart from '@mlw-packages/react-components';

const sampleQuarterData = [
  { trimestre: 'Q1', receita: 4000, despesas: 2400, lucro: 1600 },
  { trimestre: 'Q2', receita: 5200, despesas: 3100, lucro: 2100 },
];

export default function Example() {
  return (
    <BarChart
      data={sampleQuarterData}
      xAxis="trimestre"
      yAxis={["receita", "despesas"]}
      labelMap={{ receita: 'Receita', despesas: 'Despesas' }}
      height={360}
    />
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
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import BarChart from '@mlw-packages/react-components';

export default function AutoDetect() {
  const data = [
    { trimestre: 'Q1', receita: 4000, despesas: 2400, lucro: 1600 },
    { trimestre: 'Q2', receita: 5200, despesas: 3100, lucro: 2100 },
  ];

  return <BarChart data={data} xAxis="trimestre" height={360} autoDetect />;
}
`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    within(canvasElement);

    await waitFor(() => {
      const chartContainer = canvasElement.querySelector(".recharts-wrapper");
      expect(chartContainer).toBeInTheDocument();
    });

    const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
    expect(bars.length).toBeGreaterThan(0);
  },
};

export const YAxisConfigs: Story = {
  name: "Configurações yAxis",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Manual yAxis (array)
        </h3>
        <BarChart
          data={sampleQuarterData}
          xAxis="trimestre"
          yAxis={["receita", "despesas", "lucro"]}
          labelMap={{
            receita: "Receita",
            despesas: "Despesas",
            lucro: "Lucro",
          }}
          height={420}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Manual yAxis (object com cores)
        </h3>
        <BarChart
          data={sampleSalesData}
          xAxis="name"
          yAxis={{
            vendas: { label: "Vendas", color: "#ef4444" },
            meta: { label: "Meta", color: "#10b981" },
            crescimento: { label: "Crescimento", color: "#f59e0b" },
          }}
          height={420}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import BarChart from '@mlw-packages/react-components';

const sampleQuarterData = [
  { trimestre: 'Q1', receita: 4000, despesas: 2400, lucro: 1600, vendas: 3200 },
  { trimestre: 'Q2', receita: 5200, despesas: 3100, lucro: 2100, vendas: 4100 },
];

export default function YAxisConfigs() {
  return (
    <div>
      <BarChart data={sampleQuarterData} xAxis="trimestre" yAxis={["receita","despesas","lucro"]} labelMap={{ receita: 'Receita', despesas: 'Despesas', lucro: 'Lucro' }} height={420} />
      <BarChart data={sampleQuarterData} xAxis="trimestre" yAxis={{ vendas: { label: 'Vendas', color: '#ef4444' } }} height={420} />
    </div>
  );
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar ambos os gráficos renderizados", async () => {
      await waitFor(() => {
        const chartContainers =
          canvasElement.querySelectorAll(".recharts-wrapper");
        expect(chartContainers.length).toBe(2);
      });
    });

    await step("Verificar barras renderizadas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      expect(bars.length).toBeGreaterThan(0);
    });
  },
};

export const CustomStyles: Story = {
  name: "Estilos Customizados",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          LabelMap Override
        </h3>
        <BarChart
          data={sampleQuarterData}
          xAxis="trimestre"
          yAxis={["vendas", "lucro"]}
          labelMap={{ vendas: "Vendas Totais", lucro: "Lucro Líquido" }}
          colors={["#6366f1", "#06b6d4"]}
          height={380}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Cores e Grid Customizados
        </h3>
        <BarChart
          data={sampleSalesData}
          xAxis="name"
          yAxis={["vendas", "meta"]}
          colors={["#4ecdc4", "#45b7d1"]}
          gridColor="#e6e6fa"
          height={340}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Sem Grid
        </h3>
        <BarChart
          data={sampleSalesData}
          xAxis="name"
          yAxis={["vendas"]}
          height={300}
          showGrid={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import BarChart from '@mlw-packages/react-components';

const sampleQuarterData = [
  { trimestre: 'Q1', vendas: 3200, lucro: 1600 },
  { trimestre: 'Q2', vendas: 4100, lucro: 2100 },
];

export default function CustomStyles() {
  return (
    <div>
      <BarChart data={sampleQuarterData} xAxis="trimestre" yAxis={["vendas","lucro"]} labelMap={{ vendas: 'Vendas Totais', lucro: 'Lucro Líquido' }} colors={["#6366f1", "#06b6d4"]} height={380} />
      <BarChart data={sampleQuarterData} xAxis="trimestre" yAxis={["vendas","meta"]} colors={["#4ecdc4", "#45b7d1"]} gridColor="#e6e6fa" height={340} />
      <BarChart data={sampleQuarterData} xAxis="trimestre" yAxis={["vendas"]} height={300} showGrid={false} />
    </div>
  );
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar todos os gráficos renderizados", async () => {
      await waitFor(() => {
        const chartContainers =
          canvasElement.querySelectorAll(".recharts-wrapper");
        expect(chartContainers.length).toBe(3);
      });
    });

    await step("Verificar barras e grid", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      expect(bars.length).toBeGreaterThan(0);

      const grids = canvasElement.querySelectorAll(".recharts-cartesian-grid");
      expect(grids.length).toBeGreaterThan(0);
    });
  },
};

export const CompleteExample: Story = {
  name: "Exemplo Completo",
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
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import BarChart from '@mlw-packages/react-components';

const sampleQuarterData = [
  { trimestre: 'Q1', receita: 4000, despesas: 2400, lucro: 1600, vendas: 3200 },
  { trimestre: 'Q2', receita: 5200, despesas: 3100, lucro: 2100, vendas: 4100 },
  { trimestre: 'Q3', receita: 6800, despesas: 3800, lucro: 3000, vendas: 5400 },
  { trimestre: 'Q4', receita: 7500, despesas: 4200, lucro: 3300, vendas: 6000 },
];

export default function CompleteExample() {
  return (
    <BarChart
      data={sampleQuarterData}
      xAxis="trimestre"
      yAxis={["receita","despesas","lucro","vendas"]}
      labelMap={{ receita: 'Receita Total', despesas: 'Despesas', lucro: 'Lucro', vendas: 'Vendas' }}
      colors={["#8b5cf6", "#ec4899", "#10b981", "#f59e0b"]}
      height={420}
      showGrid
      showTooltip
      showLegend
    />
  );
}
`,
      },
    },
  },
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

    await step("Verificar eixos renderizados", async () => {
      const xAxis = canvasElement.querySelector(".recharts-xAxis");
      const yAxis = canvasElement.querySelector(".recharts-yAxis");
      expect(xAxis).toBeInTheDocument();
      expect(yAxis).toBeInTheDocument();
    });
  },
};
