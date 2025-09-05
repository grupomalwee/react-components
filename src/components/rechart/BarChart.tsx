import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { cn } from "../../lib/utils";
import DraggableTooltip from "./DraggableTooltip";

interface BarChartData {
  name: string;
  [key: string]: string | number;
}

interface CustomBarChartProps {
  data?: BarChartData[];
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
  showLabels?: boolean;
}

// Dados padrão simples - apenas para fallback
const defaultData: BarChartData[] = [
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

const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data = defaultData,
  className,
  height = 350,
  width = 900,
  colors = DEFAULT_COLORS,
  gridColor,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  title,
  titlePosition = "left",
  showLabels = false,
}) => {
  const [activeTooltips, setActiveTooltips] = useState<
    Array<{
      id: string;
      data: BarChartData;
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

  // Extrair as chaves dos dados para determinar quantas barras temos
  const dataKeys =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "name") : [];
  const finalColors = generateColors(dataKeys);

  // Função para lidar com o click na barra
  const handleBarClick = (
    data: BarChartData,
    index: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Previne que o click propague para o chart

    const tooltipId = `${data.name}`;
    const rect = (event.target as HTMLElement).getBoundingClientRect();

    // Verificar se já existe um tooltip para esta barra
    const existingIndex = activeTooltips.findIndex(
      (tooltip) => tooltip.id === tooltipId
    );

    if (existingIndex !== -1) {
      // Se já existe, remover
      setActiveTooltips((prev) =>
        prev.filter((tooltip) => tooltip.id !== tooltipId)
      );
    } else {
      // Se não existe, adicionar - usar coordenadas diretas da viewport
      const newTooltip = {
        id: tooltipId,
        data,
        position: {
          top: rect.top - 10, // Posição fixa da viewport
          left: rect.right + 10, // À direita da barra clicada
        },
      };
      setActiveTooltips((prev) => [...prev, newTooltip]);
    }
  };

  // Função para limpar todos os tooltips ao clicar no fundo
  const handleChartClick = () => {
    // Remove todos os tooltips quando clicado no fundo do chart
    setActiveTooltips([]);
  };

  // Funções para detecção de proximidade e alinhamento de tooltips - Sistema Ultra Preciso
  const ALIGNMENT_THRESHOLD = 25; // Distância em pixels para snap automático (aumentado para maior força)
  const GUIDE_THRESHOLD = 60; // Distância para mostrar guias (aumentado para detecção mais ampla)
  const STRONG_SNAP_THRESHOLD = 35; // Snap mais forte em distância maior
  const PRECISION_SNAP_THRESHOLD = 8; // Snap ultra preciso para alinhamento perfeito

  // Função para detectar e mostrar guias de alinhamento durante o drag
  const updateAlignmentGuides = useCallback(
    (
      draggedTooltipId: string,
      currentPosition: { top: number; left: number }
    ) => {
      if (!isDragging) return;

      // Buscar todos os tooltips globalmente de todos os gráficos
      const getAllTooltips = () => {
        const allTooltips: Array<{
          id: string;
          position: { top: number; left: number };
        }> = [];

        // Adicionar tooltips locais
        allTooltips.push(...activeTooltips);

        // Buscar tooltips de outros gráficos via eventos do window
        const globalEvent = new CustomEvent("requestGlobalTooltips", {
          detail: { requesterId: draggedTooltipId, response: allTooltips },
        });
        window.dispatchEvent(globalEvent);

        return allTooltips;
      };

      const allTooltips = getAllTooltips();
      const otherTooltips = allTooltips.filter(
        (t) => t.id !== draggedTooltipId
      );
      const guides: Array<{
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
      }> = [];

      // Dimensões padrão do tooltip (assumindo um tamanho médio)
      const tooltipDimensions = { width: 224, height: 120 }; // min-w-56 = 224px

      otherTooltips.forEach((tooltip) => {
        // Guia horizontal (alinhamento top)
        const topDiff = Math.abs(currentPosition.top - tooltip.position.top);
        if (topDiff <= GUIDE_THRESHOLD) {
          guides.push({
            type: "horizontal",
            position: tooltip.position.top,
            visible: true,
            sourceTooltip: {
              top: currentPosition.top,
              left: currentPosition.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
            targetTooltip: {
              top: tooltip.position.top,
              left: tooltip.position.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
          });
        }

        // Guia vertical (alinhamento left)
        const leftDiff = Math.abs(currentPosition.left - tooltip.position.left);
        if (leftDiff <= GUIDE_THRESHOLD) {
          guides.push({
            type: "vertical",
            position: tooltip.position.left,
            visible: true,
            sourceTooltip: {
              top: currentPosition.top,
              left: currentPosition.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
            targetTooltip: {
              top: tooltip.position.top,
              left: tooltip.position.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
          });
        }
      });

      setAlignmentGuides(guides);
    },
    [isDragging, activeTooltips]
  );

  // Função para snap automático quando próximo das guias
  const snapToGuides = useCallback(
    (position: { top: number; left: number }) => {
      const snappedPosition = { ...position };
      let hasSnapped = false;

      // Primeiro: Snap ultra preciso (prioridade máxima)
      alignmentGuides.forEach((guide) => {
        if (guide.type === "horizontal") {
          const diff = Math.abs(position.top - guide.position);
          if (diff <= PRECISION_SNAP_THRESHOLD) {
            snappedPosition.top = guide.position;
            hasSnapped = true;
          }
        } else if (guide.type === "vertical") {
          const diff = Math.abs(position.left - guide.position);
          if (diff <= PRECISION_SNAP_THRESHOLD) {
            snappedPosition.left = guide.position;
            hasSnapped = true;
          }
        }
      });

      // Segundo: Snap forte (se não houve snap preciso)
      if (!hasSnapped) {
        alignmentGuides.forEach((guide) => {
          if (guide.type === "horizontal") {
            const diff = Math.abs(position.top - guide.position);
            if (diff <= STRONG_SNAP_THRESHOLD) {
              snappedPosition.top = guide.position;
            }
          } else if (guide.type === "vertical") {
            const diff = Math.abs(position.left - guide.position);
            if (diff <= STRONG_SNAP_THRESHOLD) {
              snappedPosition.left = guide.position;
            }
          }
        });
      }

      // Terceiro: Snap normal (área mais ampla)
      alignmentGuides.forEach((guide) => {
        if (guide.type === "horizontal") {
          const diff = Math.abs(position.top - guide.position);
          if (
            diff <= ALIGNMENT_THRESHOLD &&
            snappedPosition.top === position.top
          ) {
            snappedPosition.top = guide.position;
          }
        } else if (guide.type === "vertical") {
          const diff = Math.abs(position.left - guide.position);
          if (
            diff <= ALIGNMENT_THRESHOLD &&
            snappedPosition.left === position.left
          ) {
            snappedPosition.left = guide.position;
          }
        }
      });

      return snappedPosition;
    },
    [alignmentGuides]
  );

  // Funções para drag dos tooltips - versão que acompanha perfeitamente o mouse
  const handleMouseDown = (e: React.MouseEvent, tooltipId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const tooltip = activeTooltips.find((t) => t.id === tooltipId);
    if (!tooltip) return;

    // Calcular o offset do mouse em relação ao tooltip
    const rect = e.currentTarget.getBoundingClientRect();
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

        const rawPosition = {
          top: Math.max(0, Math.min(newTop, window.innerHeight - 200)),
          left: Math.max(0, Math.min(newLeft, window.innerWidth - 250)),
        };

        // Atualizar guias de alinhamento
        updateAlignmentGuides(isDragging, rawPosition);

        // Aplicar snap automático
        const snappedPosition = snapToGuides(rawPosition);

        setActiveTooltips((prev) =>
          prev.map((tooltip) => {
            if (tooltip.id === isDragging) {
              return {
                ...tooltip,
                position: snappedPosition,
              };
            }
            return tooltip;
          })
        );
      });
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(null);
        setAlignmentGuides([]); // Limpar guias quando parar de arrastar
        if (rafId) cancelAnimationFrame(rafId);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
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
      const { detail } = event;
      if (detail && detail.response && detail.requesterId) {
        // Adicionar nossos tooltips locais à lista global
        activeTooltips.forEach((tooltip) => {
          if (
            !detail.response.find(
              (t: { id: string; position: { top: number; left: number } }) =>
                t.id === tooltip.id
            )
          ) {
            detail.response.push({
              id: tooltip.id,
              position: tooltip.position,
            });
          }
        });
      }
    };

    // Registra listeners
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

  // Componente personalizado para o tooltip de hover
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
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
        {payload.map(
          (
            entry: {
              dataKey: string;
              value: number;
              name: string;
              color: string;
            },
            index: number
          ) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="text-foreground font-medium">
                {entry.value?.toLocaleString("pt-BR")}
              </span>
            </div>
          )
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Clique para fixar este tooltip
        </p>
      </div>
    );
  };

  // Função para obter a classe CSS do título baseada na posição
  const getTitleClassName = (position: "left" | "center" | "right") => {
    const baseClasses = "text-lg font-semibold text-foreground mb-3";
    switch (position) {
      case "center":
        return `${baseClasses} text-center`;
      case "right":
        return `${baseClasses} text-right`;
      default:
        return `${baseClasses} text-left`;
    }
  };

  return (
    <div 
      className={cn("rounded-lg bg-card p-4 relative", className)}
      style={{ 
        width: typeof width === 'number' ? `${width + 32}px` : 'fit-content',
        maxWidth: '100%'
      }}
    >
      {title && <h3 className={getTitleClassName(titlePosition)}>{title}</h3>}

      <RechartsBarChart
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
            tickFormatter={(value) => value.toLocaleString("pt-BR")}
          />
          {showTooltip && (
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
            />
          )}
          {showLegend && (
            <Legend
              wrapperStyle={{
                color: "hsl(var(--foreground))",
                fontSize: "14px",
              }}
            />
          )}
          {/* Renderizar barras dinamicamente baseado nos dados */}
          {dataKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
              fill={finalColors[key]}
              radius={[4, 4, 0, 0]}
              onClick={handleBarClick}
              style={{ cursor: "pointer" }}
              activeBar={
                <Rectangle
                  fill={finalColors[key]}
                  stroke={finalColors[key]}
                  strokeWidth={2}
                  opacity={0.8}
                />
              }
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
                />
              )}
            </Bar>
          ))}
        </RechartsBarChart>

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
          onMouseDown={(id, e) => handleMouseDown(e, id)}
          onClose={(id) => {
            setActiveTooltips((prev) => prev.filter((t) => t.id !== id));
          }}
          periodLabel="Período Selecionado"
          dataLabel="Dados do Período"
          showCloseAllButton={index === 0} // Só o primeiro tooltip mostra o botão
          globalTooltipCount={globalTooltipCount}
          onCloseAll={() => {
            window.dispatchEvent(new Event("closeAllTooltips"));
          }}
          closeAllButtonPosition="top-center"
          closeAllButtonVariant="floating"
        />
      ))}
    </div>
  );
};

export default CustomBarChart;
