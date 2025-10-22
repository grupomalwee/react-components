import PieChart from "@/components/charts/PieChart";
import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PieChart> = {
  title: "charts/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Gráfico de pizza responsivo usando Recharts. Props simplificadas para definir cores em hex, hsl, rgb, etc.",
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
    colors: { control: "object" },
    showTooltip: { control: "boolean" },
    showLegend: { control: "boolean" },
    showLabels: { control: "boolean" },
    innerRadius: {
      control: { type: "number", min: 0, max: 100, step: 10 },
    },
    outerRadius: {
      control: { type: "number", min: 50, max: 150, step: 10 },
    },
    className: { control: "text" },
  },
  args: {
    height: 400,
    showTooltip: true,
    showLegend: true,
    showLabels: true,
    innerRadius: 0,
    outerRadius: 120,
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "600px", height: "500px" }}>
      <PieChart {...args} />
    </div>
  ),
};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import React from 'react';
import { PieChartBase } from '@mlw-packages/react-components';

export default function Example() {
  const data = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 20 },
  ];

  return (
    <div style={{ width: 600, height: 500 }}>
      <PieChartBase data={data} colors={["#3b82f6", "#ef4444", "#10b981"]} />
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
import { PieChartBase } from '@mlw-packages/react-components';

export const Default = () => (
  <div style={{ width: 600, height: 500 }}>
    <PieChartBase />
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
        <div style={{ width: "600px", height: "500px" }}>
          <PieChart
            {...args}
            colors={["#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"]}
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          HSL Colors
        </h3>
        <div style={{ width: "600px", height: "500px" }}>
          <PieChart
            {...args}
            colors={[
              "hsl(258, 88%, 66%)",
              "hsl(188, 94%, 43%)",
              "hsl(84, 81%, 44%)",
              "hsl(12, 76%, 61%)",
              "hsl(280, 100%, 70%)",
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Diferentes formatos de cores: Hex e HSL.",
      },
    },
  },
};

export const CustomData: Story = {
  render: (args) => (
    <div style={{ width: "600px", height: "500px" }}>
      <PieChart
        {...args}
        data={[
          { name: "Desktop", value: 45 },
          { name: "Mobile", value: 35 },
          { name: "Tablet", value: 20 },
        ]}
        colors={["#3b82f6", "#ef4444", "#10b981"]}
      />
    </div>
  ),
};

export const Variants: Story = {
  name: "Variantes",
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Donut Chart (innerRadius)
        </h3>
        <div style={{ width: "600px", height: "500px" }}>
          <PieChart
            {...args}
            innerRadius={60}
            outerRadius={120}
            colors={["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f0932b"]}
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Market Share - Donut Médio
        </h3>
        <div style={{ width: "600px", height: "500px" }}>
          <PieChart
            {...args}
            data={[
              { name: "Chrome", value: 65 },
              { name: "Safari", value: 18 },
              { name: "Edge", value: 8 },
              { name: "Firefox", value: 6 },
              { name: "Outros", value: 3 },
            ]}
            colors={["#4285f4", "#34c759", "#0078d4", "#ff9500", "#8e8e93"]}
            innerRadius={40}
            outerRadius={100}
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Sem Labels
        </h3>
        <div style={{ width: "600px", height: "500px" }}>
          <PieChart
            {...args}
            showLabels={false}
            colors={["#f97316", "#059669", "#7c3aed", "#dc2626", "#0891b2"]}
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Sem Legenda
        </h3>
        <div style={{ width: "600px", height: "500px" }}>
          <PieChart
            {...args}
            showLegend={false}
            colors={["#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6", "#06b6d4"]}
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Compacto (menor raio, sem legenda)
        </h3>
        <div style={{ width: "400px", height: "350px" }}>
          <PieChart
            {...args}
            height={300}
            outerRadius={80}
            showLegend={false}
            colors={["#55af7d", "#8e68ff", "#2273e1", "#f59e0b", "#ef4444"]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Diferentes variantes: donut, market share, sem labels, sem legenda, compacto.",
      },
    },
  },
};
