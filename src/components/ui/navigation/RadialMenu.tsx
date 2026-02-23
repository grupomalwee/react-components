"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IconProps } from '@phosphor-icons/react';

import {
  ContextMenuBase,
  ContextMenuContentBase,
  ContextMenuTriggerBase,
} from "./ContextMenuBase";
import { useMediaQuery } from "@/hooks/use-media-query";

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

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(radius: number, angleDeg: number) {
  const rad = degToRad(angleDeg);
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

function slicePath(
  index: number,
  total: number,
  wedgeRadius: number,
  innerRadius: number,
) {
  if (total <= 0) return "";
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
  iconSize = 24,
  bandWidth = 60,
  innerGap = 16,
  outerGap = 12,
  outerRingWidth = 8,
  onSelect,
}: RadialMenuProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const radius = size / 2;
  const outerRingOuterRadius = radius;
  const outerRingInnerRadius = outerRingOuterRadius - outerRingWidth;
  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;
  const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;
  const centerRadius = Math.max(wedgeInnerRadius - innerGap, 0);
  const slice = 360 / menuItems.length;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
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
                    <ContextMenuItemBase className="size-full p-0 flex items-center justify-center bg-transparent focus:bg-transparent border-none" onClick={() => onSelect?.(item)}>
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
  );
}
