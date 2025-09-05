import React from 'react';
import { useUniversalTooltip, useTooltip } from '../../hooks/use-universal-tooltip';
import { cn } from '../../lib/utils';
import { XIcon } from '@phosphor-icons/react/dist/ssr';

interface UniversalTooltipRendererProps {
  className?: string;
  showCloseButton?: boolean;
  showCloseAllButton?: boolean;
  tooltipClassName?: string;
  guideClassName?: string;
  closeButtonClassName?: string;
  closeAllButtonClassName?: string;
}

export const UniversalTooltipRenderer: React.FC<UniversalTooltipRendererProps> = ({
  className,
  showCloseButton = true,
  showCloseAllButton = true,
  tooltipClassName,
  guideClassName,
  closeButtonClassName,
  closeAllButtonClassName,
}) => {
  const { 
    tooltips, 
    alignmentGuides, 
    isDragging, 
    clearAllTooltips 
  } = useUniversalTooltip();
  
  const { removeTooltip, handleElementMouseDown } = useTooltip();

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      {/* Botão Fechar Todos */}
      {showCloseAllButton && tooltips.length > 1 && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300">
          <button
            onClick={clearAllTooltips}
            className={cn(
              "bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 hover:shadow-2xl",
              closeAllButtonClassName
            )}
          >
            Fechar Todos ({tooltips.length})
          </button>
        </div>
      )}

      {/* Guias de Alinhamento Visual */}
      {alignmentGuides.map((guide, index) => {
        const isHorizontal = guide.type === 'horizontal';
        const color = isHorizontal ? '#3b82f6' : '#ef4444';
        
        // Calcular posições para conectar os tooltips
        const startX = isHorizontal 
          ? Math.min(guide.sourceTooltip.left + guide.sourceTooltip.width / 2, guide.targetTooltip.left + guide.targetTooltip.width / 2)
          : guide.sourceTooltip.left + guide.sourceTooltip.width / 2;
        const endX = isHorizontal 
          ? Math.max(guide.sourceTooltip.left + guide.sourceTooltip.width / 2, guide.targetTooltip.left + guide.targetTooltip.width / 2)
          : guide.targetTooltip.left + guide.targetTooltip.width / 2;
        
        const startY = isHorizontal 
          ? guide.sourceTooltip.top + guide.sourceTooltip.height / 2
          : Math.min(guide.sourceTooltip.top + guide.sourceTooltip.height / 2, guide.targetTooltip.top + guide.targetTooltip.height / 2);
        const endY = isHorizontal 
          ? guide.targetTooltip.top + guide.targetTooltip.height / 2
          : Math.max(guide.sourceTooltip.top + guide.sourceTooltip.height / 2, guide.targetTooltip.top + guide.targetTooltip.height / 2);

        return (
          <div key={index} className="pointer-events-none">
            {/* Linha principal conectando os tooltips */}
            <div
              className={cn("fixed z-30", guideClassName)}
              style={{
                left: startX,
                top: startY,
                width: isHorizontal ? endX - startX : '2px',
                height: isHorizontal ? '2px' : endY - startY,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}60`,
                opacity: 0.9,
                borderStyle: 'dashed',
                borderWidth: '1px',
                borderColor: color,
                transform: 'translateZ(0)'
              }}
            />
            
            {/* Marcadores nos tooltips */}
            <div
              className="fixed z-31"
              style={{
                left: guide.sourceTooltip.left + guide.sourceTooltip.width / 2 - 4,
                top: guide.sourceTooltip.top + guide.sourceTooltip.height / 2 - 4,
                width: '8px',
                height: '8px',
                backgroundColor: color,
                borderRadius: '50%',
                boxShadow: `0 0 4px ${color}80`,
                opacity: 0.8
              }}
            />
            <div
              className="fixed z-31"
              style={{
                left: guide.targetTooltip.left + guide.targetTooltip.width / 2 - 4,
                top: guide.targetTooltip.top + guide.targetTooltip.height / 2 - 4,
                width: '8px',
                height: '8px',
                backgroundColor: color,
                borderRadius: '50%',
                boxShadow: `0 0 4px ${color}80`,
                opacity: 0.8
              }}
            />
          </div>
        );
      })}

      {/* Renderizar Tooltips */}
      {tooltips.map((tooltip) => (
        <div 
          key={tooltip.id}
          className={cn(
            "fixed bg-card border border-border rounded-lg shadow-lg min-w-56 select-none pointer-events-auto",
            isDragging === tooltip.id ? "cursor-grabbing z-60" : "cursor-grab z-50",
            tooltipClassName
          )}
          style={{
            top: tooltip.position.top,
            left: tooltip.position.left,
          }}
          onMouseDown={(e) => handleElementMouseDown(tooltip.id, e)}
        >
          {/* Header do Tooltip */}
          <div className="flex items-center justify-between p-3 border-b bg-muted/20 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Tooltip
              </span>
            </div>
            
            {showCloseButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTooltip(tooltip.id);
                }}
                className={cn(
                  "text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded",
                  closeButtonClassName
                )}
              >
                <XIcon size={16} />
              </button>
            )}
          </div>
          
          {/* Conteúdo do Tooltip */}
          <div className="p-4">
            {tooltip.content}
          </div>
        </div>
      ))}
    </div>
  );
};
