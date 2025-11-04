import { cn } from "@/lib/utils";
import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { DraggableTooltip } from "./components";
import {
  Padding,
  Margins,
  resolveContainerPaddingLeft,
  detectXAxis,
  detectDataFields,
  formatFieldName,
  generateAdditionalColors,
  niceCeil,
  resolveChartMargins,
  renderPillLabel,
} from "./utils";

// Interface universal para aceitar qualquer estrutura de dados JSON
interface BarChartData {
  [key: string]: string | number | boolean | null | undefined;
}

// Interface para configuração do eixo X - agora mais inteligente
interface XAxisConfig {
  dataKey: string; // Campo que será usado como eixo X
  label?: string; // Label opcional
  valueFormatter?: (value: string | number) => string;
  autoLabel?: boolean; // Se deve gerar label automaticamente baseado no dataKey
}

// Interface para mapeamento de dados - mais flexível
interface DataMapper {
  [dataKey: string]: {
    label?: string; // Nome para exibição (se não informado, usa o dataKey formatado)
    valueFormatter?: (value: string | number) => string | number;
    color?: string; // Cor específica (se não informada, usa cores automáticas)
    type?: "number" | "string" | "auto";
    visible?: boolean; // Se deve ser exibido (padrão: true)
  };
}

interface BarChartProps {
  data: BarChartData[]; // Agora obrigatório - sem fallback confuso
  className?: string;
  padding?: Padding;
  margins?: Margins;
  containerPaddingLeft?: number;
  chartMargins?: Margins;
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
  // Mapeamento simples de rótulos exibidos: { fieldKey: 'Rótulo' }
  labelMap?: Record<string, string>;

  // Configuração do eixo X - pode ser automática
  xAxis?: XAxisConfig | string; // String = dataKey simples, objeto = configuração completa

  // Mapeamento de dados - pode ser automático
  mapper?: DataMapper | string[]; // String[] = campos simples, objeto = configuração completa
  // Aceita também prop legacy/Stories: yAxis como alias de mapper
  yAxis?: DataMapper | string[];

  // Modo automático - detecta tudo automaticamente
  autoDetect?: boolean; // Se true, ignora xAxis e mapper e detecta automaticamente
}

const DEFAULT_COLORS = ["#55af7d", "#8e68ff", "#2273e1"];

// ...using shared helpers from ./helpers.ts

// Função para formatar números de forma compacta (1K, 1M, etc.)
// compact number util moved to pillLabelRenderer

const BarChart: React.FC<BarChartProps> = ({
  data,
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
  xAxis,
  mapper,
  yAxis,
  labelMap,
  autoDetect = false,
  padding,
  margins,
  containerPaddingLeft,
  chartMargins,
}) => {
  const resolvedContainerPaddingLeft = resolveContainerPaddingLeft(
    padding,
    containerPaddingLeft,
    16
  );
  // 🧠 LÓGICA INTELIGENTE: Detectar automaticamente ou usar configurações
  const smartConfig = useMemo(() => {
    // Prefer yAxis (stories) over mapper prop when both exist
    const providedMapper = (yAxis ?? mapper) as
      | DataMapper
      | string[]
      | undefined;

    // Só usar detecção automática quando realmente não houver mapper/xAxis configurados (null/undefined)
    if (autoDetect === true || xAxis == null || providedMapper == null) {
      const detectedXAxis = detectXAxis(data);
      const detectedFields = detectDataFields(data, detectedXAxis);

      return {
        xAxisConfig: {
          dataKey: detectedXAxis,
          label: labelMap?.[detectedXAxis] ?? formatFieldName(detectedXAxis),
          autoLabel: true,
        } as XAxisConfig,
        mapperConfig: detectedFields.reduce((acc, field) => {
          acc[field] = {
            label: labelMap?.[field] ?? formatFieldName(field),
            type: "number" as const,
            visible: true,
          };
          return acc;
        }, {} as DataMapper),
      };
    }

    // Processar configurações manuais a partir de providedMapper
    const xAxisConfig: XAxisConfig =
      typeof xAxis === "string"
        ? { dataKey: xAxis, label: formatFieldName(xAxis), autoLabel: true }
        : (xAxis as XAxisConfig);

    let mapperConfig: DataMapper;
    if (Array.isArray(providedMapper)) {
      // Se mapper é array de strings, converter para DataMapper
      mapperConfig = providedMapper.reduce((acc, field) => {
        acc[field] = {
          label: labelMap?.[field] ?? formatFieldName(field),
          type: "auto" as const,
          visible: true,
        };
        return acc;
      }, {} as DataMapper);
    } else {
      // Processar DataMapper completo, adicionando labels automáticos se necessário
      mapperConfig = Object.keys(providedMapper as DataMapper).reduce(
        (acc, key) => {
          acc[key] = {
            label:
              (providedMapper as DataMapper)[key]?.label ??
              labelMap?.[key] ??
              formatFieldName(key),
            type: "auto" as const,
            visible: true,
            ...(providedMapper as DataMapper)[key], // Sobrescreve com configurações do usuário
          };
          return acc;
        },
        {} as DataMapper
      );
    }

    return { xAxisConfig, mapperConfig };
  }, [data, xAxis, mapper, yAxis, autoDetect, labelMap]);

  const { xAxisConfig, mapperConfig } = smartConfig;

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

  // Processar dados para garantir compatibilidade com Recharts
  const processedData = data.map((item) => ({
    ...item,
    name: String(item[xAxisConfig.dataKey] || "N/A"), // Garantir propriedade 'name' para tooltip
  }));

  // Função simples para gerar cores dinâmicas
  const generateColors = (dataKeys: string[]): Record<string, string> => {
    const colorMap: Record<string, string> = {};
    const allColors = generateAdditionalColors(colors, dataKeys.length);

    dataKeys.forEach((key, index) => {
      colorMap[key] = allColors[index] || colors[index % colors.length];
    });

    return colorMap;
  };

  // Extrair as chaves dos dados baseado no mapperConfig inteligente
  const dataKeys = Object.keys(mapperConfig);
  const finalColors = generateColors(dataKeys);

  // Função para adaptar dados universais para o tooltip
  const adaptDataForTooltip = (universalData: BarChartData) => {
    return {
      ...universalData,
      name: String(universalData[xAxisConfig.dataKey] || "N/A"), // Garantir que tem a propriedade 'name'
    };
  };

  // using niceCeil from helpers

  const maxDataValue = useMemo(() => {
    let max = 0;
    const keys = Object.keys(mapperConfig);
    for (const row of processedData) {
      const r = row as Record<string, unknown>;
      for (const key of keys) {
        const v = r[key];
        if (typeof v === "number" && Number.isFinite(v) && v > max)
          max = v as number;
      }
    }
    return max;
  }, [processedData, mapperConfig]);

  const niceMax = useMemo(() => {
    let padding = 0.08;
    if (maxDataValue > 1_000_000) padding = 0.05;
    if (maxDataValue > 10_000_000) padding = 0.03;
    if (maxDataValue === 0) padding = 0.12;
    const padded = maxDataValue * (1 + padding);
    return niceCeil(padded);
  }, [maxDataValue]);

  // Função para lidar com o click na barra
  const handleBarClick = (
    data: BarChartData,
    index: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Previne que o click propague para o chart

    // Usar o campo dinâmico do xAxisConfig ao invés de "name" fixo
    const xAxisValue = data[xAxisConfig.dataKey] || "N/A";
    const tooltipId = `${xAxisValue}`;
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
    const baseClasses = "text-xl font-semibold text-foreground mb-3";
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
        width: typeof width === "number" ? `${width + 32}px` : "fit-content",
        maxWidth: "100%",
      }}
    >
      {title && (
        <div style={{ paddingLeft: `${resolvedContainerPaddingLeft}px` }}>
          <h3 className={getTitleClassName(titlePosition)}>{title}</h3>
        </div>
      )}

      <RechartsBarChart
        data={processedData}
        width={typeof width === "number" ? width : 900}
        height={height}
        margin={resolveChartMargins(margins, chartMargins, showLabels)}
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
          dataKey={xAxisConfig.dataKey}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={xAxisConfig.valueFormatter}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.toLocaleString("pt-BR")}
          domain={[0, niceMax]}
          tickCount={6}
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
        {/* Renderizar barras dinamicamente baseado no mapperConfig */}
        {dataKeys.map((key) => {
          const fieldConfig = mapperConfig[key];
          return (
            <Bar
              key={key}
              dataKey={key}
              name={fieldConfig?.label || key}
              fill={fieldConfig?.color || finalColors[key]}
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
                  content={
                    renderPillLabel(
                      finalColors[key] || "#000",
                      "filled"
                    ) as unknown as (props: unknown) => React.ReactNode
                  }
                />
              )}
            </Bar>
          );
        })}
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
          data={adaptDataForTooltip(tooltip.data)}
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
          showCloseAllButton={index === 0}
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

export default BarChart;
