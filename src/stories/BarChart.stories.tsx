import  BarChart  from "@/components/rechart/BarChart";
import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BarChart> = {
  title: 'charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Gráfico de barras responsivo usando Recharts. Props simplificadas para definir cores em hex, hsl, rgb, etc.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f6f6' },
        { name: 'dark', value: '#222' }
      ]
    },
    layout: 'centered',
  },
  argTypes: {
    height: {
      control: { type: 'number', min: 200, max: 600, step: 50 },
    },
    colors: { 
      control: 'object',
      description: 'Array de cores para as barras [primary, secondary, tertiary]'
    },
    gridColor: { control: 'color' },
    showGrid: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <BarChart {...args} />
    </div>
  ),
};

export const CustomHexColors: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <BarChart 
        {...args}
        colors={["#ef4444", "#10b981", "#f59e0b"]}
      />
    </div>
  ),
};

export const CustomHslColors: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <BarChart 
        {...args}
        colors={["hsl(258, 88%, 66%)", "hsl(188, 94%, 43%)", "hsl(84, 81%, 44%)"]}
      />
    </div>
  ),
};

export const CustomRgbColors: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <BarChart 
        {...args}
        colors={["rgb(236, 72, 153)", "rgb(20, 184, 166)", "rgb(251, 146, 60)"]}
      />
    </div>
  ),
};

export const CustomData: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <BarChart 
        {...args}
        data={[
          { name: 'Q1 2024', vendas: 15000, meta: 12000, crescimento: 3000 },
          { name: 'Q2 2024', vendas: 18000, meta: 15000, crescimento: 3000 },
          { name: 'Q3 2024', vendas: 22000, meta: 18000, crescimento: 4000 },
          { name: 'Q4 2024', vendas: 25000, meta: 20000, crescimento: 5000 },
        ]}
        colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
      />
    </div>
  ),
};

export const WithoutGrid: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <BarChart 
        {...args} 
        showGrid={false}
        colors={["#f97316", "#059669", "#7c3aed"]}
      />
    </div>
  ),
};

export const CustomGrid: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <BarChart 
        {...args} 
        gridColor="#ff6b6b"
        colors={["#4ecdc4", "#45b7d1", "#f9ca24"]}
      />
    </div>
  ),
};

export const Compact: Story = {
  render: (args) => (
    <div style={{ width: '400px', height: '250px' }}>
      <BarChart 
        {...args} 
        height={200} 
        showLegend={false}
        colors={["#ec4899", "#14b8a6", "#f59e0b"]}
      />
    </div>
  ),
};
