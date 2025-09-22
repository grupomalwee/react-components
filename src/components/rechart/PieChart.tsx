import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '../../lib/utils';

interface PieChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface CustomPieChartProps {
  data?: PieChartData[];
  className?: string;
  height?: number;
  width?: number | string;
  // Props de cores simples e intuitivas
  colors?: string[];              // Array de cores customizadas (hex, hsl, rgb, etc)
  // Props de configuração
  showTooltip?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  centerX?: string | number;
  centerY?: string | number;
}

const defaultData: PieChartData[] = [
  { name: 'Vendas', value: 4000 },
  { name: 'Marketing', value: 3000 },
  { name: 'Desenvolvimento', value: 2000 },
  { name: 'Suporte', value: 1000 },
  { name: 'Outros', value: 800 },
];

// Cores padrão do projeto em formato hex
const DEFAULT_COLORS = [
  '#55af7d',    // verde do projeto
  '#8e68ff',    // roxo do projeto
  '#2273e1',    // azul do projeto
  '#f59e0b',    // amarelo complementar
  '#ef4444',    // vermelho complementar
  '#8b5cf6',    // roxo claro
  '#06b6d4',    // ciano
  '#84cc16',    // verde lima
];

// Tipos para o label customizado
type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  value?: number;
  name?: string;
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0 }: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data = defaultData,
  className,
  height = 400,
  width = "100%",
  colors,
  showTooltip = true,
  showLegend = true,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 120,
  centerX = "50%",
  centerY = "50%",
}) => {
  
  // Usar as cores fornecidas ou as padrão
  const finalColors = colors || DEFAULT_COLORS;

  return (
    <div className={cn('w-full rounded-lg bg-card p-4', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx={centerX}
            cy={centerY}
            labelLine={false}
            label={showLabels ? renderCustomizedLabel : false}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${entry.name}-${index}`} 
                fill={finalColors[index % finalColors.length]} 
              />
            ))}
          </Pie>
          
          {showTooltip && (
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--popover-foreground))'
              }}
            />
          )}
          
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
