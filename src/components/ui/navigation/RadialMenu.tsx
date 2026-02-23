import * as React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Adicionado Variants
import { cn } from "@/lib/utils";
import {
  ContextMenuBase,
  ContextMenuContentBase,
  ContextMenuTriggerBase,
} from "./ContextMenuBase";
import { useMediaQuery } from "@/hooks/use-media-query";

import { IconProps, PencilIcon, CopyIcon, DownloadIcon, TrashIcon } from "@phosphor-icons/react";

type PhosphorIcon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export type MenuItem = {
  id: string | number;
  label: string;
  icon: PhosphorIcon;
  color?: "default" | "danger";
  variants?: number; 
};

type RadialMenuProps = {
  children?: React.ReactNode;
  menuItems?: MenuItem[];
  size?: number;
  iconSize?: number;
  bandWidth?: number;
  innerGap?: number;
  outerGap?: number;
  outerRingWidth?: number;
  onSelect?: (item: MenuItem) => void;
};


const CRUD_ITEMS: MenuItem[] = [
  { id: "edit", label: "Editar", icon: PencilIcon },
  { id: "copy", label: "Copiar", icon: CopyIcon },
  { id: "download", label: "Baixar", icon: DownloadIcon },
  { id: "delete", label: "Excluir", icon: TrashIcon, color: "danger" },
];

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

function degToRad(deg: number) { return (deg * Math.PI) / 180; }

function polarToCartesian(radius: number, angleDeg: number) {
  const rad = degToRad(angleDeg);
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

function slicePath(index: number, total: number, wedgeRadius: number, innerRadius: number) {
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
  menuItems = CRUD_ITEMS, 
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
  const outerRingInnerRadius = radius - outerRingWidth;
  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;
  const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;
  const centerRadius = Math.max(wedgeInnerRadius - innerGap, 0);
  const slice = 360 / menuItems.length;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);



  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: isMobile
        ? { duration: 0 }
        : {
            delayChildren: 0.05,
            staggerChildren: 0.03,
            type: "spring",
            stiffness: 300,
            damping: 24,
          },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: isMobile ? { duration: 0 } : { duration: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: isMobile
        ? { duration: 0 }
        : { type: "spring", stiffness: 400, damping: 20 },
    },
  };

  return (
    <ContextMenuBase>
      <ContextMenuTriggerBase asChild>
        <div className="select-none outline-none group touch-none">
          {children || (
            <div className="size-80 flex justify-center items-center border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/5 cursor-context-menu">
              Clique com botão direito
            </div>
          )}
        </div>
      </ContextMenuTriggerBase>

      <ContextMenuContentBase
        className="p-0 border-none bg-transparent shadow-none overflow-visible -translate-x-1/2 -translate-y-1/2"
        style={{ width: size, height: size }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            className="relative size-full drop-shadow-xl will-change-transform"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <svg
              className="absolute inset-0 size-full overflow-visible"
              viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
            >
              <motion.circle r={centerRadius} className="fill-background stroke-border stroke-1" />

              <AnimatePresence>
                {activeIndex !== null && (
                  <motion.text
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground text-[11px] font-bold uppercase tracking-tighter pointer-events-none"
                  >
                    {menuItems[activeIndex].label}
                  </motion.text>
                )}
              </AnimatePresence>

              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const midDeg = START_ANGLE + slice * index;
                const { x: iconX, y: iconY } = polarToCartesian(iconRingRadius, midDeg);
                const isActive = activeIndex === index;
                const ICON_BOX = iconSize * 2.5;

                return (
                  <motion.g
                    key={item.id}
                    variants={itemVariants}
                    className="cursor-pointer outline-none"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={(e) => {
                       e.stopPropagation(); 
                       onSelect?.(item);
                    }}
                    style={{ originX: "0px", originY: "0px" }}
                  >
                    <path
                      d={slicePath(index, menuItems.length, wedgeOuterRadius, wedgeInnerRadius)}
                      className={cn(
                        "transition-colors duration-200 stroke-1",
                        isActive
                          ? (item.color === "danger" ? "fill-destructive stroke-destructive-foreground/20" : "fill-primary stroke-primary-foreground/20")
                          : "fill-background/90 stroke-border/50 hover:fill-accent",
                      )}
                    />

                    <foreignObject x={iconX - ICON_BOX / 2} y={iconY - ICON_BOX / 2} width={ICON_BOX} height={ICON_BOX} className="pointer-events-none">
                      <div className="size-full flex items-center justify-center">
                        <Icon
                          size={iconSize}
                          weight={isActive ? "fill" : "regular"}
                          className={cn(
                            "transition-all duration-200",
                            isActive ? "text-primary-foreground" : (item.color === "danger" ? "text-destructive" : "text-muted-foreground")
                          )}
                        />
                      </div>
                    </foreignObject>
                  </motion.g>
                );
              })}
            </svg>
          </motion.div>
        </AnimatePresence>
      </ContextMenuContentBase>
    </ContextMenuBase>
  );
}