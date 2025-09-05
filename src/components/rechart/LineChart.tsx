import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { cn } from "../../lib/utils";
import DraggableTooltip from "./DraggableTooltip";

interface LineChartData {
  name: string;
  [key: string]: string | number;
}

interface CustomLineChartProps {
  data?: LineChartData[];
  className?: string;
  height?: number;
  width?: number | string;
  colors?: string[];
  gridColor?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  title?: string;
  titlePosition?: "left" | "center" | "right";
  strokeWidth?: number;
  showDots?: boolean;
  showLabels?: boolean;
}

// Dados padrão simples - apenas para fallback
const defaultData: LineChartData[] = [
  { name: "A", value: 100 },
  { name: "B", value: 200 },
  { name: "C", value: 150 },
];

const DEFAULT_COLORS = ["#55af7d", "#8e68ff", "#2273e1"];

// Função simples para gerar cores adicionais
const generateAdditionalColors = (
  baseColors: string[],
  count: number
): string[] => {
  const colors = [...baseColors];
  const variations = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#f9ca24",
    "#6c5ce7",
    "#a29bfe",
    "#fd79a8",
    "#00b894",
  ];

  while (colors.length < count) {
    colors.push(
      variations[(colors.length - baseColors.length) % variations.length]
    );
  }

  return colors;
};

// Função para formatar números de forma compacta (1K, 1M, etc.)
const formatCompactNumber = (value: number): string => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return value.toString();
};

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  data = defaultData,
  className,
  height = 300,
  width = "100%",
  colors = DEFAULT_COLORS,
  gridColor,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  title,
  titlePosition = "left",
  strokeWidth = 2,
  showDots = true,
  showLabels = false,
}) => {
  const [activeTooltips, setActiveTooltips] = useState<
    Array<{
      id: string;
      data: LineChartData;
      position: { top: number; left: number };
    }>
  >([]);

  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [globalTooltipCount, setGlobalTooltipCount] = useState(0);
  const [alignmentGuides, setAlignmentGuides] = useState<
    Array<{
      type: "horizontal" | "vertical";
      position: number;
      visible: boolean;
      sourceTooltip: {
        top: number;
        left: number;
        width: number;
        height: number;
      };
      targetTooltip: {
        top: number;
        left: number;
        width: number;
        height: number;
      };
    }>
  >([]);

  // Função simples para gerar cores dinâmicas
  const generateColors = (dataKeys: string[]): Record<string, string> => {
    const colorMap: Record<string, string> = {};
    const allColors = generateAdditionalColors(colors, dataKeys.length);

    dataKeys.forEach((key, index) => {
      colorMap[key] = allColors[index] || colors[index % colors.length];
    });

    return colorMap;
  };

  // Extrair as chaves dos dados para determinar quantas linhas temos
  const dataKeys =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "name") : [];
  const finalColors = generateColors(dataKeys);

  // Componente personalizado para dots clicáveis
    // Componente para pontos clicáveis
  const ClickableDot = (props: {
    cx?: number;
    cy?: number;
    payload?: LineChartData;
    dataKey?: string;
  }) => {
    const { cx, cy, payload, dataKey } = props;
    
    const handleDotClick = (e: React.MouseEvent) => {
      e.stopPropagation();// Debug
      
      if (!payload || !cx || !cy) return;
      
      const tooltipId = `${payload.name}`;
      
      // Verificar se já existe um tooltip para este ponto
      const existingIndex = activeTooltips.findIndex(
        (tooltip) => tooltip.id === tooltipId
      );

      if (existingIndex !== -1) {
        // Se já existe, remover
        setActiveTooltips((prev) =>
          prev.filter((tooltip) => tooltip.id !== tooltipId)
        );
      } else {
        // Se não existe, adicionar - usar posição do SVG
        const newTooltip = {
          id: tooltipId,
          data: payload,
          position: {
            top: cy - 50, // Posição relativa ao SVG
            left: cx - 100,
          },
        };

        setActiveTooltips((prev) => [...prev, newTooltip]);
      }
    };
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={finalColors[dataKey || ""] || colors[0]}
        stroke={finalColors[dataKey || ""] || colors[0]}
        strokeWidth={2}
        style={{ cursor: "pointer" }}
        onClick={handleDotClick}
      />
    );
  };

  // Função para lidar com o click no gráfico
  const handleChartClick = (e: {
    activePayload?: Array<{ payload: LineChartData }>;
    chartX?: number;
    chartY?: number;
  }) => {
    
    if (e && e.activePayload && e.activePayload.length > 0) {
      const clickedData = e.activePayload[0].payload;

      const tooltipId = `${clickedData.name}`;

      // Verificar se já existe um tooltip para este ponto
      const existingIndex = activeTooltips.findIndex(
        (tooltip) => tooltip.id === tooltipId
      );

      if (existingIndex !== -1) {
        // Se já existe, remover
        setActiveTooltips((prev) =>
          prev.filter((tooltip) => tooltip.id !== tooltipId)
        );
      } else {
        // Se não existe, adicionar
        const newTooltip = {
          id: tooltipId,
          data: clickedData,
          position: {
            top: (e.chartY || 100) - 10,
            left: (e.chartX || 100) - 100,
          },
        };

        setActiveTooltips((prev) => [...prev, newTooltip]);
      }
    } else {
       // Debug
    }
  };

  // Função para limpar todos os tooltips ao clicar no fundo
  const handleChartBackgroundClick = () => {
    // Remove todos os tooltips quando clicado no fundo do chart
    setActiveTooltips([]);
  };

  // Função para fechar todos os tooltips globalmente
  const handleCloseAllTooltips = useCallback(() => {
    // Buscar todos os tooltips globalmente de todos os gráficos
    window.dispatchEvent(new CustomEvent("closeAllTooltips"));
  }, []);

  // Função para detectar e mostrar guias de alinhamento durante o drag
  const updateAlignmentGuides = useCallback(
    (
      draggedTooltipId: string,
      draggedPosition: { top: number; left: number }
    ) => {
      const SNAP_THRESHOLD = 15; // Distância para mostrar guias
      const draggedTooltip = activeTooltips.find(
        (t) => t.id === draggedTooltipId
      );

      if (!draggedTooltip) return;

      // Dimensões estimadas do tooltip
      const tooltipWidth = 200;
      const tooltipHeight = 80;

      // Coletar todos os tooltips de outros gráficos
      const globalTooltips: Array<{
        top: number;
        left: number;
        width: number;
        height: number;
        id: string;
      }> = [];

      // Solicitar tooltips de outros componentes
      window.dispatchEvent(
        new CustomEvent("requestGlobalTooltips", {
          detail: { requesterId: draggedTooltipId },
        })
      );

      // Adicionar tooltips locais (exceto o que está sendo arrastado)
      activeTooltips.forEach((tooltip) => {
        if (tooltip.id !== draggedTooltipId) {
          globalTooltips.push({
            top: tooltip.position.top,
            left: tooltip.position.left,
            width: tooltipWidth,
            height: tooltipHeight,
            id: tooltip.id,
          });
        }
      });

      const newGuides: typeof alignmentGuides = [];

      globalTooltips.forEach((otherTooltip) => {
        const draggedCenter = {
          x: draggedPosition.left + tooltipWidth / 2,
          y: draggedPosition.top + tooltipHeight / 2,
        };

        const otherCenter = {
          x: otherTooltip.left + otherTooltip.width / 2,
          y: otherTooltip.top + otherTooltip.height / 2,
        };

        // Alinhamento horizontal (mesma altura)
        const horizontalDistance = Math.abs(draggedCenter.y - otherCenter.y);
        if (horizontalDistance <= SNAP_THRESHOLD) {
          newGuides.push({
            type: "horizontal",
            position: otherCenter.y,
            visible: true,
            sourceTooltip: {
              top: draggedPosition.top,
              left: draggedPosition.left,
              width: tooltipWidth,
              height: tooltipHeight,
            },
            targetTooltip: {
              top: otherTooltip.top,
              left: otherTooltip.left,
              width: otherTooltip.width,
              height: otherTooltip.height,
            },
          });
        }

        // Alinhamento vertical (mesma posição horizontal)
        const verticalDistance = Math.abs(draggedCenter.x - otherCenter.x);
        if (verticalDistance <= SNAP_THRESHOLD) {
          newGuides.push({
            type: "vertical",
            position: otherCenter.x,
            visible: true,
            sourceTooltip: {
              top: draggedPosition.top,
              left: draggedPosition.left,
              width: tooltipWidth,
              height: tooltipHeight,
            },
            targetTooltip: {
              top: otherTooltip.top,
              left: otherTooltip.left,
              width: otherTooltip.width,
              height: otherTooltip.height,
            },
          });
        }
      });

      setAlignmentGuides(newGuides);
    },
    [activeTooltips]
  );

  // Função para snap automático quando próximo das guias
  const snapToGuides = useCallback(
    (position: { top: number; left: number }) => {
      const SNAP_DISTANCE = 10;
      const snappedPosition = { ...position };

      alignmentGuides.forEach((guide) => {
        if (guide.type === "horizontal") {
          const tooltipCenter = position.top + 40; // altura/2 do tooltip
          if (Math.abs(tooltipCenter - guide.position) <= SNAP_DISTANCE) {
            snappedPosition.top = guide.position - 40;
          }
        } else if (guide.type === "vertical") {
          const tooltipCenter = position.left + 100; // largura/2 do tooltip
          if (Math.abs(tooltipCenter - guide.position) <= SNAP_DISTANCE) {
            snappedPosition.left = guide.position - 100;
          }
        }
      });

      return snappedPosition;
    },
    [alignmentGuides]
  );

  // Função para começar o drag
  const handleMouseDown = (tooltipId: string, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setIsDragging(tooltipId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // Usar eventos globais para permitir drag fora do container - versão com guias de alinhamento
  useEffect(() => {
    let rafId: number;
    let lastMousePosition = { x: 0, y: 0 };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      // Armazena a posição do mouse
      lastMousePosition = { x: e.clientX, y: e.clientY };

      // Cancela frame anterior se existir
      if (rafId) cancelAnimationFrame(rafId);

      // Usa requestAnimationFrame para suavizar o movimento
      rafId = requestAnimationFrame(() => {
        // Posição do mouse menos o offset = posição do tooltip
        const newLeft = lastMousePosition.x - dragOffset.x;
        const newTop = lastMousePosition.y - dragOffset.y;

        let finalPosition = { top: newTop, left: newLeft };

        // Aplicar snap se houver guias próximas
        finalPosition = snapToGuides(finalPosition);

        // Atualizar posição do tooltip
        setActiveTooltips((prev) =>
          prev.map((tooltip) =>
            tooltip.id === isDragging
              ? { ...tooltip, position: finalPosition }
              : tooltip
          )
        );

        // Atualizar guias de alinhamento
        updateAlignmentGuides(isDragging, finalPosition);
      });
    };

    const handleGlobalMouseUp = () => {
      if (rafId) cancelAnimationFrame(rafId);
      setIsDragging(null);
      setAlignmentGuides([]); // Limpar guias quando parar o drag
      // Resetar cursor
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isDragging) {
      // Definir cursor global
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";

      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      // Resetar estilos
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [
    isDragging,
    dragOffset,
    alignmentGuides,
    updateAlignmentGuides,
    snapToGuides,
  ]);

  // Listener para evento global de fechar todos os tooltips
  useEffect(() => {
    const handleCloseAllTooltips = () => {
      setActiveTooltips([]);
      // Resetar contagem global imediatamente
      setGlobalTooltipCount(0);
    };

    window.addEventListener("closeAllTooltips", handleCloseAllTooltips);

    return () => {
      window.removeEventListener("closeAllTooltips", handleCloseAllTooltips);
    };
  }, []);

  // Sistema global de contagem de tooltips (versão ultra otimizada)
  useEffect(() => {
    // Responde com a contagem local quando solicitado (função mais leve)
    const handleTooltipCountRequest = () => {
      window.dispatchEvent(
        new CustomEvent("tooltipCountResponse", {
          detail: { count: activeTooltips.length },
        })
      );
    };

    // Responde com todos os tooltips locais para alinhamento global
    const handleGlobalTooltipsRequest = (event: CustomEvent) => {
      const requesterId = event.detail?.requesterId;
      activeTooltips.forEach((tooltip) => {
        if (tooltip.id !== requesterId) {
          window.dispatchEvent(
            new CustomEvent("globalTooltipResponse", {
              detail: {
                tooltip: {
                  top: tooltip.position.top,
                  left: tooltip.position.left,
                  width: 200,
                  height: 80,
                  id: tooltip.id,
                },
              },
            })
          );
        }
      });
    };

    window.addEventListener("requestTooltipCount", handleTooltipCountRequest);
    window.addEventListener(
      "requestGlobalTooltips",
      handleGlobalTooltipsRequest as EventListener
    );

    return () => {
      window.removeEventListener(
        "requestTooltipCount",
        handleTooltipCountRequest
      );
      window.removeEventListener(
        "requestGlobalTooltips",
        handleGlobalTooltipsRequest as EventListener
      );
    };
  }, [activeTooltips]);

  // Atualiza contagem global de forma otimizada
  useEffect(() => {
    if (isDragging) return;

    let totalCount = 0;

    const handleCountResponse = (event: Event) => {
      const customEvent = event as CustomEvent;
      totalCount += customEvent.detail.count;
    };

    // Atualização mais direta e rápida
    window.addEventListener("tooltipCountResponse", handleCountResponse);
    window.dispatchEvent(new CustomEvent("requestTooltipCount"));

    const timeoutId = setTimeout(() => {
      window.removeEventListener("tooltipCountResponse", handleCountResponse);
      setGlobalTooltipCount(totalCount);
    }, 5);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("tooltipCountResponse", handleCountResponse);
    };
  }, [activeTooltips.length, isDragging]);

  const getTitleClass = () => {
    switch (titlePosition) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Container do gráfico */}
      <div
        className="rounded-lg bg-card p-4 relative border border-border"
        style={{ 
          width: typeof width === 'number' ? `${width + 32}px` : 'fit-content',
          maxWidth: '100%'
        }}
        onClick={handleChartBackgroundClick}
      >
        {/* Título do gráfico */}
        {title && (
          <div className={cn("mb-4", getTitleClass())}>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
        )}

        <RechartsLineChart
          data={data}
          width={typeof width === 'number' ? width : 900}
          height={height}
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
                opacity={0.3}
              />
            )}

            <XAxis
              dataKey="name"
              className="fill-muted-foreground text-xs"
              fontSize={12}
            />

            <YAxis
              className="fill-muted-foreground text-xs"
              fontSize={12}
              tickFormatter={formatCompactNumber}
            />

            {showTooltip && <Tooltip content={() => null} />}

            {showLegend && (
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  color: "hsl(var(--muted-foreground))",
                }}
              />
            )}

            {/* Renderizar linhas dinamicamente */}
            {dataKeys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={finalColors[key]}
                strokeWidth={strokeWidth}
                dot={showDots ? { r: 4, cursor: "pointer" } : false}
                activeDot={(props: {
                  cx?: number;
                  cy?: number;
                  payload?: LineChartData;
                }) => <ClickableDot {...props} dataKey={key} />}
              >
                {showLabels && (
                  <LabelList
                    dataKey={key}
                    position="top"
                    style={{
                      textAnchor: "middle",
                      fontSize: "10px",
                      fontWeight: "600",
                      fill: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => formatCompactNumber(value)}
                    offset={10}
                  />
                )}
              </Line>
            ))}
          </RechartsLineChart>

        {/* Guias de Alinhamento Visual - Conectam tooltips */}
        {alignmentGuides.map((guide, index) => {
          const isHorizontal = guide.type === "horizontal";
          const color = isHorizontal ? "#3b82f6" : "#ef4444";

          // Calcular posições para conectar os tooltips
          const startX = isHorizontal
            ? Math.min(
                guide.sourceTooltip.left + guide.sourceTooltip.width / 2,
                guide.targetTooltip.left + guide.targetTooltip.width / 2
              )
            : guide.sourceTooltip.left +
              (isHorizontal ? 0 : guide.sourceTooltip.width / 2);
          const endX = isHorizontal
            ? Math.max(
                guide.sourceTooltip.left + guide.sourceTooltip.width / 2,
                guide.targetTooltip.left + guide.targetTooltip.width / 2
              )
            : guide.targetTooltip.left +
              (isHorizontal ? 0 : guide.targetTooltip.width / 2);

          const startY = isHorizontal
            ? guide.sourceTooltip.top +
              (isHorizontal ? guide.sourceTooltip.height / 2 : 0)
            : Math.min(
                guide.sourceTooltip.top + guide.sourceTooltip.height / 2,
                guide.targetTooltip.top + guide.targetTooltip.height / 2
              );
          const endY = isHorizontal
            ? guide.targetTooltip.top +
              (isHorizontal ? guide.targetTooltip.height / 2 : 0)
            : Math.max(
                guide.sourceTooltip.top + guide.sourceTooltip.height / 2,
                guide.targetTooltip.top + guide.targetTooltip.height / 2
              );

          return (
            <div key={index}>
              {/* Linha principal conectando os tooltips */}
              <div
                className="fixed pointer-events-none z-30"
                style={{
                  left: startX,
                  top: startY,
                  width: isHorizontal ? endX - startX : "2px",
                  height: isHorizontal ? "2px" : endY - startY,
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}60`,
                  opacity: 0.9,
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: color,
                  transform: "translateZ(0)",
                }}
              />

              {/* Marcadores nos tooltips */}
              <div
                className="fixed pointer-events-none z-31"
                style={{
                  left:
                    guide.sourceTooltip.left + guide.sourceTooltip.width / 2 - 4,
                  top:
                    guide.sourceTooltip.top + guide.sourceTooltip.height / 2 - 4,
                  width: "8px",
                  height: "8px",
                  backgroundColor: color,
                  borderRadius: "50%",
                  boxShadow: `0 0 4px ${color}80`,
                  opacity: 0.8,
                }}
              />
              <div
                className="fixed pointer-events-none z-31"
                style={{
                  left:
                    guide.targetTooltip.left + guide.targetTooltip.width / 2 - 4,
                  top:
                    guide.targetTooltip.top + guide.targetTooltip.height / 2 - 4,
                  width: "8px",
                  height: "8px",
                  backgroundColor: color,
                  borderRadius: "50%",
                  boxShadow: `0 0 4px ${color}80`,
                  opacity: 0.8,
                }}
              />
            </div>
          );
        })}

        {/* Renderizar tooltips draggable */}
        {activeTooltips.map((tooltip, index) => (
          <DraggableTooltip
            key={tooltip.id}
            id={tooltip.id}
            data={tooltip.data}
            position={tooltip.position}
            isDragging={isDragging === tooltip.id}
            title={title}
            dataKeys={dataKeys}
            finalColors={finalColors}
            onMouseDown={(id, e) => handleMouseDown(id, e)}
            onClose={(id) => {
              setActiveTooltips((prev) => prev.filter((t) => t.id !== id));
            }}
            periodLabel="Ponto Selecionado"
            dataLabel="Dados do Ponto"
            showCloseAllButton={index === 0} // Só o primeiro tooltip mostra o botão
            globalTooltipCount={globalTooltipCount}
            onCloseAll={handleCloseAllTooltips}
            closeAllButtonPosition="top-center"
            closeAllButtonVariant="floating"
          />
        ))}

      </div>
    </div>
  );
};

export default CustomLineChart;
