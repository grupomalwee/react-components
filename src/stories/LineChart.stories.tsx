import LineChart from "@/components/rechart/LineChart";
import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof LineChart> = {
  title: 'charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Gráfico de linha responsivo usando Recharts. Props simplificadas para definir cores em hex, hsl, rgb, etc.'
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
    primaryLineColor: { control: 'color' },
    secondaryLineColor: { control: 'color' },
    tertiaryLineColor: { control: 'color' },
    gridColor: { control: 'color' },
    showGrid: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    strokeWidth: { control: { type: 'number', min: 1, max: 5 } },
    showDots: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    strokeWidth: 2,
    showDots: true,
  },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart {...args} />
    </div>
  ),
};

export const CustomHexColors: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart 
        {...args}
        primaryLineColor="#ef4444"
        secondaryLineColor="#10b981"
        tertiaryLineColor="#f59e0b"
        strokeWidth={3}
      />
    </div>
  ),
};

export const CustomHslColors: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart 
        {...args}
        primaryLineColor="hsl(258, 88%, 66%)"
        secondaryLineColor="hsl(188, 94%, 43%)"
        tertiaryLineColor="hsl(84, 81%, 44%)"
        strokeWidth={3}
      />
    </div>
  ),
};

export const CustomRgbColors: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart 
        {...args}
        primaryLineColor="rgb(236, 72, 153)"
        secondaryLineColor="rgb(20, 184, 166)"
        tertiaryLineColor="rgb(251, 146, 60)"
        strokeWidth={3}
      />
    </div>
  ),
};

export const CustomData: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart 
        {...args}
        data={[
          { name: 'Q1 2024', vendas: 15000, meta: 12000, crescimento: 3000 },
          { name: 'Q2 2024', vendas: 18000, meta: 15000, crescimento: 3000 },
          { name: 'Q3 2024', vendas: 22000, meta: 18000, crescimento: 4000 },
          { name: 'Q4 2024', vendas: 25000, meta: 20000, crescimento: 5000 },
        ]}
        primaryLineColor="#ff6b6b"
        secondaryLineColor="#4ecdc4"
        tertiaryLineColor="#45b7d1"
        strokeWidth={3}
      />
    </div>
  ),
};

export const WithoutGrid: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart 
        {...args} 
        showGrid={false}
        primaryLineColor="#f97316"
        secondaryLineColor="#059669"
        tertiaryLineColor="#7c3aed"
        strokeWidth={3}
      />
    </div>
  ),
};

export const CustomGrid: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart 
        {...args} 
        gridColor="#8b5cf6"
        primaryLineColor="#ef4444"
        secondaryLineColor="#10b981"
        tertiaryLineColor="#f59e0b"
        strokeWidth={3}
      />
    </div>
  ),
};

export const ThickLines: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart 
        {...args} 
        strokeWidth={4}
        primaryLineColor="#ec4899"
        secondaryLineColor="#14b8a6"
        tertiaryLineColor="#f59e0b"
      />
    </div>
  ),
};

export const WithoutDots: Story = {
  render: (args) => (
    <div style={{ width: '600px', height: '400px' }}>
      <LineChart 
        {...args} 
        showDots={false}
        strokeWidth={3}
        primaryLineColor="#8b5cf6"
        secondaryLineColor="#06b6d4"
        tertiaryLineColor="#84cc16"
      />
    </div>
  ),
};

export const Compact: Story = {
  render: (args) => (
    <div style={{ width: '400px', height: '250px' }}>
      <LineChart 
        {...args} 
        height={200} 
        showLegend={false}
        primaryLineColor="#ec4899"
        secondaryLineColor="#14b8a6"
        tertiaryLineColor="#f59e0b"
      />
    </div>
  ),
};
