import React, { useState, useEffect } from 'react';
import { BarChart as RechartsBarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';
import { ButtonBase } from '../ui/ButtonBase';
import { MouseIcon } from '@phosphor-icons/react';
import { XIcon } from '@phosphor-icons/react/dist/ssr';

interface BarChartData {
  name: string;
  [key: string]: string | number;
}

interface CustomBarChartProps {
  data?: BarChartData[];
  className?: string;
  height?: number;
  width?: number | string;
  colors?: string[];           // Array de cores para as barras
  gridColor?: string;        
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
}

const defaultData: BarChartData[] = [
  {
    name: 'Jan',
    receita: 4000,
    despesas: 2400,
    lucro: 1600,
    ty: 1600,
  },
  {
    name: 'Fev',
    receita: 3000,
    despesas: 1398,
    lucro: 1602,
    ty: 1600,
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
    ty: 1600,
  },
  {
    name: 'Mai',
    receita: 4890,
    despesas: 2800,
    lucro: 2090,
    ty: 1600,
  },
  {
    name: 'Jun',
    receita: 3390,
    despesas: 1800,
    lucro: 1590,
    ty: 1600,
  },
];

const DEFAULT_COLORS = {
  primary: '#55af7d',     
  secondary: '#8e68ff',    
  tertiary: '#2273e1',     
};

const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data = defaultData,
  className,
  height = 300,
  width = "100%",
  colors = [DEFAULT_COLORS.primary, DEFAULT_COLORS.secondary, DEFAULT_COLORS.tertiary],
  gridColor,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
}) => {
  
  const [activeTooltips, setActiveTooltips] = useState<Array<{
    id: string;
    data: BarChartData;
    position: { top: number; left: number };
  }>>([]);
  
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Usar as cores do array ou as padrão
  const finalColors = {
    primary: colors[0] || DEFAULT_COLORS.primary,
    secondary: colors[1] || DEFAULT_COLORS.secondary,
    tertiary: colors[2] || DEFAULT_COLORS.tertiary,
  };

  // Função para lidar com o click na barra
  const handleBarClick = (data: BarChartData, index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Previne que o click propague para o chart
    
    const tooltipId = `${data.name}`;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    
    // Verificar se já existe um tooltip para esta barra
    const existingIndex = activeTooltips.findIndex(tooltip => tooltip.id === tooltipId);
    
    if (existingIndex !== -1) {
      // Se já existe, remover
      setActiveTooltips(prev => prev.filter(tooltip => tooltip.id !== tooltipId));
    } else {
      // Se não existe, adicionar - usar coordenadas diretas da viewport
      const newTooltip = {
        id: tooltipId,
        data,
        position: {
          top: rect.top - 10, // Posição fixa da viewport
          left: rect.right + 10, // À direita da barra clicada
        }
      };
      setActiveTooltips(prev => [...prev, newTooltip]);
    }
  };


  // Função para limpar todos os tooltips ao clicar no fundo
  const handleChartClick = () => {
    // Remove todos os tooltips quando clicado no fundo do chart
    setActiveTooltips([]);
  };

  // Funções para drag dos tooltips - versão que acompanha perfeitamente o mouse
  const handleMouseDown = (e: React.MouseEvent, tooltipId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const tooltip = activeTooltips.find(t => t.id === tooltipId);
    if (!tooltip) return;
    
    // Calcular o offset do mouse em relação ao tooltip
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setIsDragging(tooltipId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // Usar eventos globais para permitir drag fora do container
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Posição do mouse menos o offset = posição do tooltip
      const newLeft = e.clientX - dragOffset.x;
      const newTop = e.clientY - dragOffset.y;
      
      setActiveTooltips(prev => prev.map(tooltip => {
        if (tooltip.id === isDragging) {
          return {
            ...tooltip,
            position: {
              top: Math.max(0, Math.min(newTop, window.innerHeight - 200)),
              left: Math.max(0, Math.min(newLeft, window.innerWidth - 250))
            }
          };
        }
        return tooltip;
      }));
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(null);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  // Versões vazias para manter compatibilidade
  const handleMouseMove = () => {};
  const handleMouseUp = () => {};

  // Componente personalizado para o tooltip de hover
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
    // Mostrar apenas o tooltip de hover (não os fixos)
    if (!active || !payload) return null;

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: { dataKey: string; value: number; name: string; color: string }, index: number) => (
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
        <p className="text-xs text-muted-foreground mt-1">
           Clique para fixar este tooltip
        </p>
      </div>
    );
  };

  return (
    <div 
      className={cn('w-full rounded-lg bg-card p-4 relative', className)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <ResponsiveContainer width={width} height={height}>
        <RechartsBarChart
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
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toLocaleString('pt-BR')}
          />
          {showTooltip && (
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
            />
          )}
          {showLegend && (
            <Legend 
              wrapperStyle={{ 
                color: 'hsl(var(--foreground))',
                fontSize: '14px',
              }}
            />
          )}
          <Bar 
            dataKey="receita" 
            name="Receita"
            fill={finalColors.primary}
            radius={[4, 4, 0, 0]}
            onClick={handleBarClick}
            style={{ cursor: 'pointer' }}
            activeBar={
              <Rectangle 
                fill={finalColors.primary} 
                stroke={finalColors.primary}
                strokeWidth={2}
                opacity={0.8}
              />
            }
          />
          <Bar 
            dataKey="despesas" 
            name="Despesas"
            fill={finalColors.secondary}
            radius={[4, 4, 0, 0]}
            onClick={handleBarClick}
            style={{ cursor: 'pointer' }}
            activeBar={
              <Rectangle 
                fill={finalColors.secondary} 
                stroke={finalColors.secondary}
                strokeWidth={2}
                opacity={0.8}
              />
            }
          />
          <Bar 
            dataKey="lucro" 
            name="Lucro"
            fill={finalColors.tertiary}
            radius={[4, 4, 0, 0]}
            onClick={handleBarClick}
            style={{ cursor: 'pointer' }}
            activeBar={
              <Rectangle 
                fill={finalColors.tertiary} 
                stroke={finalColors.tertiary}
                strokeWidth={2}
                opacity={0.8}
              />
            }
          />
        </RechartsBarChart>
      </ResponsiveContainer>
      
      {/* Botão para fechar todos os tooltips quando há mais de 2 - posição dinâmica */}
      {activeTooltips.length > 2 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30">
          <ButtonBase
            onClick={() => setActiveTooltips([])}
            variant="destructive"
            size="sm"
            className="shadow-2xl border border-destructive/20 animate-pulse"
          >
            Fechar Todos ({activeTooltips.length})
          </ButtonBase>
        </div>
      )}
           {/* Tooltips fixos quando clicado - agora arrastáveis */}
      {activeTooltips.map((tooltip) => (
        <div 
          key={tooltip.id}
          className="fixed bg-card border border-border rounded-lg shadow-lg z-50 min-w-56 select-none"
          style={{
            top: tooltip.position.top,
            left: tooltip.position.left,
            cursor: isDragging === tooltip.id ? 'grabbing' : 'grab',
          }}
          onMouseDown={(e) => handleMouseDown(e, tooltip.id)}
        >
          <div className="flex items-center justify-between mb-2 p-3 pb-2 border-b bg-muted/20 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="font-semibold text-foreground text-sm">{tooltip.data.name}</p>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Dados</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTooltips(prev => prev.filter(t => t.id !== tooltip.id));
              }}
              className="text-muted-foreground hover:text-destructive ml-2 text-sm hover:bg-destructive/10 rounded p-1"
              title="Fechar este tooltip"
            >
              <XIcon size={14} />
            </button>
          </div>
          
          <div className="p-3 pt-2 space-y-2">
          {tooltip.data.receita !== undefined && (
            <div className="flex items-center gap-2 text-sm mb-1">
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: finalColors.primary }}
              />
              <span className="text-muted-foreground">Receita:</span>
              <span className="text-foreground font-medium">
                {(tooltip.data.receita as number).toLocaleString('pt-BR')}
              </span>
            </div>
          )}
          
          {tooltip.data.despesas !== undefined && (
            <div className="flex items-center gap-2 text-sm mb-1">
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: finalColors.secondary }}
              />
              <span className="text-muted-foreground">Despesas:</span>
              <span className="text-foreground font-medium">
                {(tooltip.data.despesas as number).toLocaleString('pt-BR')}
              </span>
            </div>
          )}
          
          {tooltip.data.lucro !== undefined && (
            <div className="flex items-center gap-2 text-sm mb-1">
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: finalColors.tertiary }}
              />
              <span className="text-muted-foreground">Lucro:</span>
              <span className="text-foreground font-medium">
                {(tooltip.data.lucro as number).toLocaleString('pt-BR')}
              </span>
            </div>
          )}
          
          <div className="mt-3 pt-2 border-t">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span><MouseIcon /></span>
              Arraste para mover • Clique no ✕ para remover
            </p>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomBarChart;
