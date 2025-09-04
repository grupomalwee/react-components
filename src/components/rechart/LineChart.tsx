import React, { useState } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';

interface LineChartData {
  name: string;
  [key: string]: string | number;
}

interface CustomLineChartProps {
  data?: LineChartData[];
  className?: string;
  height?: number;
  width?: number | string;
  // Props de cores simples e intuitivas
  primaryLineColor?: string;     // Cor da primeira linha (hex, hsl, rgb, etc)
  secondaryLineColor?: string;   // Cor da segunda linha (hex, hsl, rgb, etc)  
  tertiaryLineColor?: string;    // Cor da terceira linha (hex, hsl, rgb, etc)
  gridColor?: string;           // Cor personalizada da grid
  // Props de configuração
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  strokeWidth?: number;
  showDots?: boolean;
}

const defaultData: LineChartData[] = [
  {
    name: 'Jan',
    receita: 4000,
    despesas: 2400,
    lucro: 1600,
  },
  {
    name: 'Fev',
    receita: 3000,
    despesas: 1398,
    lucro: 1602,
  },
  {
    name: 'Mar',
    receita: 5000,
    despesas: 2800,
    lucro: 2200,
  },
  {
    name: 'Abr',
    receita: 2780,
    despesas: 1908,
    lucro: 872,
  },
  {
    name: 'Mai',
    receita: 4890,
    despesas: 2800,
    lucro: 2090,
  },
  {
    name: 'Jun',
    receita: 3390,
    despesas: 1800,
    lucro: 1590,
  },
];

// Cores padrão do projeto em formato hex
const DEFAULT_COLORS = {
  primary: '#55af7d',      // verde do projeto
  secondary: '#8e68ff',    // roxo do projeto
  tertiary: '#2273e1',     // azul do projeto
};

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  data = defaultData,
  className,
  height = 300,
  width = "100%",
  primaryLineColor,
  secondaryLineColor,
  tertiaryLineColor,
  gridColor,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  strokeWidth = 2,
  showDots = true,
}) => {
  
  const [activeTooltip, setActiveTooltip] = useState<{
    active: boolean;
    payload?: Array<{
      dataKey: string;
      value: number;
      name: string;
      color: string;
    }>;
    label?: string;
  } | null>(null);

  // Usar as cores fornecidas ou as padrão
  const finalColors = {
    primary: primaryLineColor || DEFAULT_COLORS.primary,
    secondary: secondaryLineColor || DEFAULT_COLORS.secondary,
    tertiary: tertiaryLineColor || DEFAULT_COLORS.tertiary,
  };

  // Extrair as chaves dos dados (exceto 'name') para criar as linhas
  const dataKeys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];
  const colors = [finalColors.primary, finalColors.secondary, finalColors.tertiary];

  // Função para lidar com o click no chart
  const handleChartClick = (chartData: { activePayload?: Array<{ payload: LineChartData }> }) => {
    if (chartData && chartData.activePayload && chartData.activePayload.length > 0) {
      const data = chartData.activePayload[0].payload;
      const payload = dataKeys.map((key, index) => ({
        dataKey: key,
        value: Number(data[key]),
        name: key.charAt(0).toUpperCase() + key.slice(1),
        color: colors[index] || colors[0]
      }));
      
      setActiveTooltip({
        active: true,
        payload,
        label: data.name,
      });
    } else {
      setActiveTooltip(null);
    }
  };

  // Componente personalizado para o tooltip
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      value: number;
      name: string;
      color: string;
    }>;
    label?: string;
  }) => {
    // Mostrar tooltip do hover (não do click)
    if (!active || !payload || activeTooltip?.active) return null;

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg relative">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="text-foreground font-medium">
              {entry.value?.toLocaleString('pt-BR')}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn('w-full rounded-lg bg-card p-4 relative', className)}>
      <ResponsiveContainer width={width} height={height}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={handleChartClick}
        >
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={gridColor || "hsl(var(--muted-foreground))"}
              opacity={0.5}
            />
          )}
          
          <XAxis 
            dataKey="name" 
            className="fill-muted-foreground text-xs"
          />
          
          <YAxis 
            className="fill-muted-foreground text-xs"
          />
          
          {showTooltip && (
            <Tooltip 
              content={<CustomTooltip />}
            />
          )}
          
          {showLegend && <Legend />}
          
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index] || colors[0]}
              strokeWidth={strokeWidth}
              dot={showDots ? { r: 4, cursor: 'pointer' } : false}
              activeDot={{ r: 6, cursor: 'pointer' }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
      
      {/* Tooltip fixo quando clicado */}
      {activeTooltip?.active && (
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg z-10">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-foreground">{activeTooltip.label}</p>
            <button
              onClick={() => setActiveTooltip(null)}
              className="text-muted-foreground hover:text-foreground ml-2"
            >
              ✕
            </button>
          </div>
          {activeTooltip.payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm mb-1">
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="text-foreground font-medium">
                {entry.value?.toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-2">
            💡 Clique em um ponto para fixar este tooltip
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomLineChart;
