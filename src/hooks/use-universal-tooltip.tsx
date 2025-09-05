import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

interface TooltipPosition {
  top: number;
  left: number;
}

interface UniversalTooltip {
  id: string;
  position: TooltipPosition;
  content: React.ReactNode;
  sourceElement?: HTMLElement;
  metadata?: Record<string, unknown>;
}

interface AlignmentGuide {
  type: 'horizontal' | 'vertical';
  position: number;
  visible: boolean;
  sourceTooltip: { top: number; left: number; width: number; height: number };
  targetTooltip: { top: number; left: number; width: number; height: number };
}

interface UniversalTooltipContextType {
  tooltips: UniversalTooltip[];
  alignmentGuides: AlignmentGuide[];
  isDragging: string | null;
  
  // Funções principais
  addTooltip: (tooltip: Omit<UniversalTooltip, 'id'>) => string;
  removeTooltip: (id: string) => void;
  updateTooltipPosition: (id: string, position: TooltipPosition) => void;
  clearAllTooltips: () => void;
  
  // Drag & Drop
  startDrag: (id: string, offset: { x: number; y: number }) => void;
  updateDrag: (position: TooltipPosition) => void;
  endDrag: () => void;
  
  // Configurações
  config: {
    snapThreshold: number;
    guideThreshold: number;
    enableSnap: boolean;
    enableGuides: boolean;
    tooltipDefaultWidth: number;
    tooltipDefaultHeight: number;
  };
  updateConfig: (newConfig: Partial<UniversalTooltipContextType['config']>) => void;
}

const UniversalTooltipContext = createContext<UniversalTooltipContextType | null>(null);

const DEFAULT_CONFIG = {
  snapThreshold: 15,
  guideThreshold: 25,
  enableSnap: true,
  enableGuides: true,
  tooltipDefaultWidth: 224,
  tooltipDefaultHeight: 120,
};

export const UniversalTooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltips, setTooltips] = useState<UniversalTooltip[]>([]);
  const [alignmentGuides, setAlignmentGuides] = useState<AlignmentGuide[]>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  
  const idCounter = useRef(0);

  // Gerar ID único
  const generateId = useCallback(() => {
    idCounter.current += 1;
    return `tooltip-${idCounter.current}-${Date.now()}`;
  }, []);

  // Adicionar tooltip
  const addTooltip = useCallback((tooltip: Omit<UniversalTooltip, 'id'>) => {
    const id = generateId();
    const newTooltip: UniversalTooltip = { ...tooltip, id };
    setTooltips(prev => [...prev, newTooltip]);
    return id;
  }, [generateId]);

  // Remover tooltip
  const removeTooltip = useCallback((id: string) => {
    setTooltips(prev => prev.filter(t => t.id !== id));
  }, []);

  // Atualizar posição do tooltip
  const updateTooltipPosition = useCallback((id: string, position: TooltipPosition) => {
    setTooltips(prev => prev.map(tooltip => 
      tooltip.id === id ? { ...tooltip, position } : tooltip
    ));
  }, []);

  // Limpar todos os tooltips
  const clearAllTooltips = useCallback(() => {
    setTooltips([]);
    setAlignmentGuides([]);
    setIsDragging(null);
  }, []);

  // Função para calcular guias de alinhamento
  const updateAlignmentGuides = useCallback((draggedTooltipId: string, currentPosition: TooltipPosition) => {
    if (!config.enableGuides || !isDragging) return;

    const otherTooltips = tooltips.filter(t => t.id !== draggedTooltipId);
    const guides: AlignmentGuide[] = [];

    otherTooltips.forEach(tooltip => {
      const tooltipDimensions = { 
        width: config.tooltipDefaultWidth, 
        height: config.tooltipDefaultHeight 
      };

      // Guia horizontal (alinhamento top)
      const topDiff = Math.abs(currentPosition.top - tooltip.position.top);
      if (topDiff <= config.guideThreshold) {
        guides.push({
          type: 'horizontal',
          position: tooltip.position.top,
          visible: true,
          sourceTooltip: {
            top: currentPosition.top,
            left: currentPosition.left,
            width: tooltipDimensions.width,
            height: tooltipDimensions.height
          },
          targetTooltip: {
            top: tooltip.position.top,
            left: tooltip.position.left,
            width: tooltipDimensions.width,
            height: tooltipDimensions.height
          }
        });
      }

      // Guia vertical (alinhamento left)
      const leftDiff = Math.abs(currentPosition.left - tooltip.position.left);
      if (leftDiff <= config.guideThreshold) {
        guides.push({
          type: 'vertical',
          position: tooltip.position.left,
          visible: true,
          sourceTooltip: {
            top: currentPosition.top,
            left: currentPosition.left,
            width: tooltipDimensions.width,
            height: tooltipDimensions.height
          },
          targetTooltip: {
            top: tooltip.position.top,
            left: tooltip.position.left,
            width: tooltipDimensions.width,
            height: tooltipDimensions.height
          }
        });
      }
    });

    setAlignmentGuides(guides);
  }, [tooltips, isDragging, config]);

  // Função para fazer snap para as guias
  const snapToGuides = useCallback((position: TooltipPosition): TooltipPosition => {
    if (!config.enableSnap) return position;

    let newTop = position.top;
    let newLeft = position.left;

    alignmentGuides.forEach(guide => {
      if (guide.type === 'horizontal') {
        const diff = Math.abs(position.top - guide.position);
        if (diff <= config.snapThreshold) {
          newTop = guide.position;
        }
      } else {
        const diff = Math.abs(position.left - guide.position);
        if (diff <= config.snapThreshold) {
          newLeft = guide.position;
        }
      }
    });

    return { top: newTop, left: newLeft };
  }, [alignmentGuides, config]);

  // Iniciar drag
  const startDrag = useCallback((id: string, offset: { x: number; y: number }) => {
    setIsDragging(id);
    setDragOffset(offset);
  }, []);

  // Atualizar drag
  const updateDrag = useCallback((position: TooltipPosition) => {
    if (!isDragging) return;

    // Calcular posição com offset
    const rawPosition = {
      top: position.top - dragOffset.y,
      left: position.left - dragOffset.x
    };

    // Atualizar guias
    updateAlignmentGuides(isDragging, rawPosition);

    // Aplicar snap
    const snappedPosition = snapToGuides(rawPosition);

    // Atualizar posição do tooltip
    updateTooltipPosition(isDragging, snappedPosition);
  }, [isDragging, dragOffset, updateAlignmentGuides, snapToGuides, updateTooltipPosition]);

  // Finalizar drag
  const endDrag = useCallback(() => {
    setIsDragging(null);
    setAlignmentGuides([]);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  // Atualizar configuração
  const updateConfig = useCallback((newConfig: Partial<typeof config>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Event listeners globais para mouse
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      updateDrag({ top: e.clientY, left: e.clientX });
    };

    const handleGlobalMouseUp = () => {
      endDrag();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, updateDrag, endDrag]);

  const value: UniversalTooltipContextType = {
    tooltips,
    alignmentGuides,
    isDragging,
    addTooltip,
    removeTooltip,
    updateTooltipPosition,
    clearAllTooltips,
    startDrag,
    updateDrag,
    endDrag,
    config,
    updateConfig,
  };

  return (
    <UniversalTooltipContext.Provider value={value}>
      {children}
    </UniversalTooltipContext.Provider>
  );
};

// Hook para usar o contexto
export const useUniversalTooltip = () => {
  const context = useContext(UniversalTooltipContext);
  if (!context) {
    throw new Error('useUniversalTooltip deve ser usado dentro de UniversalTooltipProvider');
  }
  return context;
};

// Hook específico para criar tooltips facilmente
export const useTooltip = () => {
  const { addTooltip, removeTooltip, startDrag } = useUniversalTooltip();

  const createTooltip = useCallback((
    element: HTMLElement,
    content: React.ReactNode,
    options?: {
      position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
      offset?: { x: number; y: number };
      metadata?: Record<string, unknown>;
    }
  ) => {
    const rect = element.getBoundingClientRect();
    
    let position: TooltipPosition;
    
    switch (options?.position || 'auto') {
      case 'top':
        position = { top: rect.top - 10, left: rect.left + rect.width / 2 };
        break;
      case 'bottom':
        position = { top: rect.bottom + 10, left: rect.left + rect.width / 2 };
        break;
      case 'left':
        position = { top: rect.top + rect.height / 2, left: rect.left - 10 };
        break;
      case 'right':
        position = { top: rect.top + rect.height / 2, left: rect.right + 10 };
        break;
      default:
        position = { top: rect.top - 10, left: rect.left + rect.width / 2 };
    }

    if (options?.offset) {
      position.top += options.offset.y;
      position.left += options.offset.x;
    }

    return addTooltip({
      position,
      content,
      sourceElement: element,
      metadata: options?.metadata
    });
  }, [addTooltip]);

  const handleElementMouseDown = useCallback((
    tooltipId: string,
    event: React.MouseEvent
  ) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    startDrag(tooltipId, offset);
  }, [startDrag]);

  return {
    createTooltip,
    removeTooltip,
    handleElementMouseDown
  };
};
