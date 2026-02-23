'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IconProps } from '@phosphor-icons/react';

// Importando seus componentes de Modal base
import {
  ModalBase,
  ModalContentBase,
  ModalHeaderBase,
  ModalFooterBase,
  ModalTitleBase,
  ModalDescriptionBase,
} from "../feedback/ModalBase"; // Ajuste o caminho conforme seu projeto

import {
  ContextMenuBase,
  ContextMenuTriggerBase,
  ContextMenuContentBase,
  ContextMenuItemBase,
} from "./ContextMenuBase"; 

type PhosphorIcon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

type MenuItem = {
  id: number;
  label: string;
  icon: PhosphorIcon;
  description?: string; // Opcional para o ModalDescription
};

type RadialMenuProps = {
  children?: React.ReactNode;
  menuItems: MenuItem[];
  size?: number;
  iconSize?: number;
  bandWidth?: number;
  innerGap?: number;
  outerGap?: number;
  outerRingWidth?: number;
  onSelect?: (item: MenuItem) => void;
};

const menuTransition: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 1,
};

const wedgeTransition: Transition = {
  duration: 0.05,
  ease: 'easeOut',
};

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

function degToRad(deg: number) { return (deg * Math.PI) / 180; }

function polarToCartesian(radius: number, angleDeg: number) {
  const rad = degToRad(angleDeg);
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

function slicePath(index: number, total: number, wedgeRadius: number, innerRadius: number) {
  if (total <= 0) return '';
  const anglePerSlice = FULL_CIRCLE / total;
  const midDeg = START_ANGLE + anglePerSlice * index;
  const halfSlice = anglePerSlice / 2;
  const startDeg = midDeg - halfSlice;
  const endDeg = midDeg + halfSlice;
  const outerStart = polarToCartesian(wedgeRadius, startDeg);
  const outerEnd = polarToCartesian(wedgeRadius, endDeg);
  const innerStart = polarToCartesian(innerRadius, startDeg);
  const innerEnd = polarToCartesian(innerRadius, endDeg);
  const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
  return `M ${outerStart.x} ${outerStart.y} A ${wedgeRadius} ${wedgeRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y} Z`;
}

export function RadialMenu({
  children,
  menuItems,
  size = 240,
  iconSize = 20,
  bandWidth = 50,
  innerGap = 8,
  outerGap = 8,
  outerRingWidth = 12,
  onSelect,
}: RadialMenuProps) {
  const radius = size / 2;
  const outerRingOuterRadius = radius;
  const outerRingInnerRadius = outerRingOuterRadius - outerRingWidth;
  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;
  const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;
  const centerRadius = Math.max(wedgeInnerRadius - innerGap, 0);
  const slice = 360 / menuItems.length;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // ESTADOS PARA CONTROLE DO SEU MODALBASE
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
    setIsOpen(true);
    onSelect?.(item);
  };

  return (
    <>
      <ContextMenuBase>
        <ContextMenuTriggerBase asChild>
          <div className="select-none outline-none">
            {children || <div className="size-80 flex justify-center items-center border-2 border-dashed rounded-lg">Right-click here.</div>}
          </div>
        </ContextMenuTriggerBase>

        <ContextMenuContentBase
          className="p-0 border-none bg-transparent shadow-none overflow-visible"
          style={{ width: size, height: size }}
        >
          <motion.div
            className="relative size-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={menuTransition}
          >
            <svg className="absolute inset-0 size-full" viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const midDeg = START_ANGLE + slice * index;
                const { x: iconX, y: iconY } = polarToCartesian(iconRingRadius, midDeg);
                const isActive = activeIndex === index;
                const ICON_BOX = iconSize * 2;

                return (
                  <g key={item.id} className="cursor-pointer outline-none" onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}>
                    <motion.path
                      d={slicePath(index, menuItems.length, outerRingOuterRadius, outerRingInnerRadius)}
                      className={cn(isActive ? "fill-accent" : "fill-muted/20")}
                      transition={wedgeTransition}
                    />
                    <motion.path
                      d={slicePath(index, menuItems.length, wedgeOuterRadius, wedgeInnerRadius)}
                      className={cn("stroke-border/40 stroke-1", isActive ? "fill-accent/10" : "fill-popover")}
                      transition={wedgeTransition}
                    />
                    <foreignObject x={iconX - ICON_BOX / 2} y={iconY - ICON_BOX / 2} width={ICON_BOX} height={ICON_BOX}>
                      {/* O onSelect dispara a abertura do ModalBase */}
                      <ContextMenuItemBase 
                        className="size-full p-0 flex items-center justify-center bg-transparent focus:bg-transparent border-none" 
                        onSelect={() => handleItemSelect(item)}
                      >
                        <Icon size={iconSize} weight={isActive ? "fill" : "regular"} className={isActive ? "text-accent-foreground" : "text-foreground"} />
                      </ContextMenuItemBase>
                    </foreignObject>
                  </g>
                );
              })}
              <circle r={centerRadius} className="fill-popover/50 stroke-border/50 stroke-1" />
            </svg>
          </motion.div>
        </ContextMenuContentBase>
      </ContextMenuBase>

      {/* INTEGRAÇÃO COM SEU MODALBASE */}
      <ModalBase open={isOpen} onOpenChange={setIsOpen}>
        <ModalContentBase size="md" backdropBlur={true}>
          <ModalHeaderBase>
            <div className="flex items-center gap-2 mb-1">
               {selectedItem?.icon && <selectedItem.icon size={24} weight="fill" className="text-accent" />}
               <ModalTitleBase>{selectedItem?.label}</ModalTitleBase>
            </div>
            <ModalDescriptionBase>
              {selectedItem?.description || `Configure as opções para ${selectedItem?.label}.`}
            </ModalDescriptionBase>
          </ModalHeaderBase>

          <div className="py-4 min-h-[100px]">
            {/* Lógica condicional de conteúdo */}
            {selectedItem?.id === 1 && <p>Interface de Configurações</p>}
            {selectedItem?.id === 2 && <p>Dashboard de Estatísticas</p>}
            {!selectedItem?.id && <p>Conteúdo padrão para {selectedItem?.label}</p>}
          </div>

          <ModalFooterBase>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium transition-colors rounded-md bg-secondary hover:bg-secondary/80"
            >
              Cancelar
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium transition-colors rounded-md bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Salvar Alterações
            </button>
          </ModalFooterBase>
        </ModalContentBase>
      </ModalBase>
    </>
  );
}