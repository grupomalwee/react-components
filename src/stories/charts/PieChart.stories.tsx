
import React from "react";
import { PieChartComponent } from "@/components/ui/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PieChartComponent> = {
  title: "charts/PieChart",
  component: PieChartComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    docs: {
      description: {
        component:
          "Gráfico de pizza (PieChart) usando Recharts. Personalizável por cores, raio e dados.",
      },
      source: {
        code: `import { PieChartComponent } from '@mlw-packages/react-components';

const data = [
  { name: 'A', value: 400, color: '#0088FE' },
  { name: 'B', value: 300, color: '#00C49F' },
  { name: 'C', value: 300, color: '#FFBB28' },
  { name: 'D', value: 200, color: '#FF8042' },
];

<PieChartComponent data={data} />
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PieChartComponent>;

const sampleData = [
  { name: "A", value: 400, color: "#0088FE" },
  { name: "B", value: 300, color: "#00C49F" },
  { name: "C", value: 300, color: "#FFBB28" },
  { name: "D", value: 200, color: "#FF8042" },
];

const Template = (args: React.ComponentProps<typeof PieChartComponent>) => (
  <div style={{ width: 500 }}>
    <PieChartComponent
      {...args}
      showTooltip
      title="Regionais vs Vendas"
      className="border"
    />
  </div>
);

export const Default: Story = {
  name: "Padrão",
  render: Template,
  args: {
    data: sampleData,
  },
};

export const CustomRadius: Story = {
  name: "Raio Customizado",
  render: Template,
  args: {
    data: sampleData,
    innerRadius: 40,
    outerRadius: 100,
  },
};

const manyData = Array.from({ length: 40 }, (_, i) => ({
  name: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 200 + 50),
  color: `hsl(${(i * 360) / 40}, 70%, 55%)`,
}));

export const ManyData: Story = {
  name: "Muitos Dados",
  render: Template,
  args: {
    data: manyData,
    outerRadius: 120,
    innerRadius: 30,
    showLegend: false,
  },
};