import CustomLineChart from "@/components/ui/charts/LineChart";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CustomLineChart> = {
  title: "charts/Line Chart",
  component: CustomLineChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Gráfico de linha responsivo usando Recharts. Props simplificadas para definir cores em hex, hsl, rgb, etc.",
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
    height: {
      control: { type: "number", min: 200, max: 600, step: 50 },
    },
    width: {
      control: { type: "number", min: 400, max: 1200, step: 50 },
    },
    colors: {
      control: "object",
      description:
        "Array de cores para as linhas [primary, secondary, tertiary]",
    },
    gridColor: { control: "color" },
    showGrid: { control: "boolean" },
    showTooltip: { control: "boolean" },
    showLegend: { control: "boolean" },
    showLabels: { control: "boolean" },
    strokeWidth: { control: { type: "number", min: 1, max: 5 } },
    showDots: { control: "boolean" },
    title: { control: "text" },
    titlePosition: {
      control: "select",
      options: ["left", "center", "right"],
    },
    className: { control: "text" },
  },
  args: {
    height: 350,
    width: 900,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    showLabels: false,
    strokeWidth: 2,
    showDots: true,
    titlePosition: "left",
  },
};

export default meta;
type Story = StoryObj<typeof CustomLineChart>;

export const Default: Story = {
  render: (args) => (
    <div>
      <CustomLineChart {...args} />
    </div>
  ),
};

// snippet consumer-facing para docs
meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import React from 'react';
import { LineChartBase } from '@mlw-packages/react-components';

export default function Example() {
  const data = [
    { name: 'Q1', vendas: 15000, meta: 12000 },
    { name: 'Q2', vendas: 18000, meta: 15000 },
    { name: 'Q3', vendas: 22000, meta: 18000 },
    { name: 'Q4', vendas: 25000, meta: 20000 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <LineChartBase data={data} colors={["#ef4444", "#10b981", "#f59e0b"]} height={350} width={900} />
    </div>
  );
}`,
    },
  },
};

Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      code: `import React from 'react';
import { LineChartBase } from '@mlw-packages/react-components';

export const Default = () => (
  <div style={{ padding: 24 }}>
    <LineChartBase />
  </div>
);`,
    },
  },
};

export const CustomColors: Story = {
  name: "Cores Customizadas",
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Hex Colors
        </h3>
        <CustomLineChart
          {...args}
          colors={["#ef4444", "#10b981", "#f59e0b"]}
          strokeWidth={3}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          HSL Colors
        </h3>
        <CustomLineChart
          {...args}
          colors={[
            "hsl(258, 88%, 66%)",
            "hsl(188, 94%, 43%)",
            "hsl(84, 81%, 44%)",
          ]}
          strokeWidth={3}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          RGB Colors
        </h3>
        <CustomLineChart
          {...args}
          colors={[
            "rgb(236, 72, 153)",
            "rgb(20, 184, 166)",
            "rgb(251, 146, 60)",
          ]}
          strokeWidth={3}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Demonstração de diferentes formatos de cores: Hex, HSL e RGB.",
      },
    },
  },
};

export const CustomData: Story = {
  render: (args) => (
    <div>
      <CustomLineChart
        {...args}
        data={[
          { name: "Q1 2024", vendas: 15000, meta: 12000, crescimento: 3000 },
          { name: "Q2 2024", vendas: 18000, meta: 15000, crescimento: 3000 },
          { name: "Q3 2024", vendas: 22000, meta: 18000, crescimento: 4000 },
          { name: "Q4 2024", vendas: 25000, meta: 20000, crescimento: 5000 },
        ]}
        colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
        strokeWidth={3}
      />
    </div>
  ),
};

export const StyleVariants: Story = {
  name: "Variantes de Estilo",
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Sem Grid
        </h3>
        <CustomLineChart
          {...args}
          showGrid={false}
          colors={["#f97316", "#059669", "#7c3aed"]}
          strokeWidth={3}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Grid Customizado
        </h3>
        <CustomLineChart
          {...args}
          gridColor="#8b5cf6"
          colors={["#ef4444", "#10b981", "#f59e0b"]}
          strokeWidth={3}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Linhas Grossas
        </h3>
        <CustomLineChart
          {...args}
          strokeWidth={5}
          colors={["#ec4899", "#10b981", "#f59e0b"]}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Sem Pontos
        </h3>
        <CustomLineChart
          {...args}
          showDots={false}
          strokeWidth={3}
          colors={["#8b5cf6", "#059669", "#f59e0b"]}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Diferentes estilos visuais: sem grid, grid customizado, linhas grossas, sem pontos.",
      },
    },
  },
};

export const LayoutOptions: Story = {
  name: "Opções de Layout",
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Altura Compacta (sem legenda)
        </h3>
        <CustomLineChart
          {...args}
          height={200}
          showLegend={false}
          colors={["#ec4899", "#10b981", "#f59e0b"]}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Com Labels
        </h3>
        <CustomLineChart
          {...args}
          showLabels={true}
          colors={["#6366f1", "#ef4444", "#10b981"]}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Com Título Centralizado
        </h3>
        <CustomLineChart
          {...args}
          title="Vendas Trimestrais 2024"
          titlePosition="center"
          colors={["#f59e0b", "#ef4444", "#8b5cf6"]}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Diferentes configurações de layout: altura compacta, labels, e títulos.",
      },
    },
  },
};
