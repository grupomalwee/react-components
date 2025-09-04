import React, { useState, useEffect } from 'react';
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
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Usar as cores fornecidas ou as padrão
  const finalColors = {
    primary: colors[0] || DEFAULT_COLORS.primary,
    secondary: colors[1] || DEFAULT_COLORS.secondary,
    tertiary: colors[2] || DEFAULT_COLORS.tertiary,
  };

  // Calcular valores máximos para escalonamento
  const maxValue = Math.max(
    ...data.map(item => 
      Math.max(
        (item.receita as number) || 0,
        (item.despesas as number) || 0,
        (item.lucro as number) || 0
      )
    )
  );

  // Função para calcular altura da barra baseada no valor
  const getBarHeight = (value: number) => {
    const chartHeight = height - 80; // Deixar espaço para labels
    return (value / maxValue) * chartHeight;
  };

  // Função para formatar valores para o eixo Y
  const formatYAxisValue = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  // Gerar linhas de grade do eixo Y
  const generateYAxisLines = () => {
    const lines = [];
    const steps = 5;
    const stepValue = maxValue / steps;
    
    for (let i = 0; i <= steps; i++) {
      const value = stepValue * i;
      const bottom = (value / maxValue) * (height - 80);
      lines.push({
        value: Math.round(value),
        bottom: bottom,
      });
    }
    return lines;
  };

  // Função para lidar com o click na barra
  const handleBarClick = (data: BarChartData, barType: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const tooltipId = `${data.name}`;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    
    const existingIndex = activeTooltips.findIndex(tooltip => tooltip.id === tooltipId);
    
    if (existingIndex !== -1) {
      setActiveTooltips(prev => prev.filter(tooltip => tooltip.id !== tooltipId));
    } else {
      const newTooltip = {
        id: tooltipId,
        data,
        position: {
          top: rect.top - 10,
          left: rect.right + 10,
        }
      };
      setActiveTooltips(prev => [...prev, newTooltip]);
    }
  };

  // Função para limpar todos os tooltips
  const handleChartClick = () => {
    setActiveTooltips([]);
  };

  // Funções para drag dos tooltips
  const handleMouseDown = (e: React.MouseEvent, tooltipId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const tooltip = activeTooltips.find(t => t.id === tooltipId);
    if (!tooltip) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setIsDragging(tooltipId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // Eventos globais para drag
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
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

  const yAxisLines = generateYAxisLines();

  return (
    <div 
      className={cn('w-full rounded-lg bg-card p-4 relative', className)}
      onClick={handleChartClick}
      style={{ width, height: height + 40 }}
    >
      {/* Container do gráfico */}
      <div className="relative" style={{ height: height, width: '100%' }}>
        {/* Eixo Y */}
        <div className="absolute left-0 top-0 flex flex-col justify-between" style={{ height: height - 40 }}>
          {yAxisLines.reverse().map((line, index) => (
            <div key={index} className="text-xs text-muted-foreground" style={{ fontSize: '12px' }}>
              {formatYAxisValue(line.value)}
            </div>
          ))}
        </div>

        {/* Linhas de grade */}
        {showGrid && (
          <div className="absolute left-12 top-0" style={{ width: 'calc(100% - 48px)', height: height - 40 }}>
            {yAxisLines.map((line, index) => (
              <div
                key={index}
                className="absolute w-full border-t border-dashed opacity-50"
                style={{
                  bottom: line.bottom,
                  borderColor: gridColor || "hsl(var(--muted-foreground))",
                }}
              />
            ))}
          </div>
        )}

        {/* Container das barras */}
        <div 
          className="absolute left-12 bottom-10 flex items-end justify-around gap-2"
          style={{ width: 'calc(100% - 48px)', height: height - 80 }}
        >
          {data.map((item) => {
            const barWidth = `${Math.max(60, (100 / data.length) - 2)}px`;
            
            return (
              <div key={item.name} className="flex flex-col items-center gap-1">
                {/* Grupo de barras para cada mês */}
                <div className="flex items-end gap-1" style={{ width: barWidth }}>
                  {/* Barra Receita */}
                  {item.receita !== undefined && (
                    <div
                      className="rounded-t cursor-pointer transition-opacity duration-200 hover:opacity-80"
                      style={{
                        width: '30%',
                        height: getBarHeight(item.receita as number),
                        backgroundColor: finalColors.primary,
                        minHeight: '2px',
                      }}
                      onClick={(e) => handleBarClick(item, 'receita', e)}
                      onMouseEnter={() => setHoveredBar(`${item.name}-receita`)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                  )}
                  
                  {/* Barra Despesas */}
                  {item.despesas !== undefined && (
                    <div
                      className="rounded-t cursor-pointer transition-opacity duration-200 hover:opacity-80"
                      style={{
                        width: '30%',
                        height: getBarHeight(item.despesas as number),
                        backgroundColor: finalColors.secondary,
                        minHeight: '2px',
                      }}
                      onClick={(e) => handleBarClick(item, 'despesas', e)}
                      onMouseEnter={() => setHoveredBar(`${item.name}-despesas`)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                  )}
                  
                  {/* Barra Lucro */}
                  {item.lucro !== undefined && (
                    <div
                      className="rounded-t cursor-pointer transition-opacity duration-200 hover:opacity-80"
                      style={{
                        width: '30%',
                        height: getBarHeight(item.lucro as number),
                        backgroundColor: finalColors.tertiary,
                        minHeight: '2px',
                      }}
                      onClick={(e) => handleBarClick(item, 'lucro', e)}
                      onMouseEnter={() => setHoveredBar(`${item.name}-lucro`)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                  )}
                </div>
                
                {/* Label do eixo X */}
                <div 
                  className="text-xs text-muted-foreground text-center mt-2"
                  style={{ fontSize: '12px' }}
                >
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tooltip de hover */}
        {showTooltip && hoveredBar && (
          <div className="fixed bg-card border border-border rounded-lg p-3 shadow-lg z-40 pointer-events-none">
            <p className="font-medium text-foreground mb-2">Tooltip de Hover</p>
            <p className="text-xs text-muted-foreground">
              💡 Clique para fixar este tooltip
            </p>
          </div>
        )}
      </div>

      {/* Legenda */}
      {showLegend && (
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: finalColors.primary }}
            />
            <span className="text-sm text-foreground">Receita</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: finalColors.secondary }}
            />
            <span className="text-sm text-foreground">Despesas</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: finalColors.tertiary }}
            />
            <span className="text-sm text-foreground">Lucro</span>
          </div>
        </div>
      )}

      {/* Botão para fechar todos os tooltips */}
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
      
      {/* Tooltips fixos quando clicado - arrastáveis */}
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
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">📊 Dados</span>
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
