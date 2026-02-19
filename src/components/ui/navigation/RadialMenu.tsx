"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconProps } from "@phosphor-icons/react";
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

  const timerRef = React.useRef<NodeJS.Timeout>(null);
  const isLongPress = React.useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    isLongPress.current = false;
    const touch = e.touches[0];
    const { clientX, clientY } = touch;

    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX,
        clientY,
        button: 2,
        buttons: 2,
      });
      e.target.dispatchEvent(event);
    }, 1000);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleTouchMove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: isMobile
        ? { duration: 0 }
        : {
            delayChildren: 0.05,
            staggerChildren: 0.03,
            type: "spring" as const,
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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: isMobile
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 400, damping: 20 },
    },
  };

  return (
    <ContextMenuBase>
      <ContextMenuTriggerBase asChild>
        <div
          className="select-none outline-none group touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {children || (
            <div className="size-80 flex justify-center items-center border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/5 text-muted-foreground hover:bg-muted/10 transition-colors">
              Right-click or Long-press here (1s)
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
            <div className="absolute inset-0 rounded-full bg-background/5 blur-2xl -z-10" />

            <svg
              className="absolute inset-0 size-full overflow-visible"
              viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
            >
              <motion.circle
                r={centerRadius}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={
                  isMobile
                    ? { duration: 0 }
                    : {
                        type: "spring" as const,
                        stiffness: 300,
                        delay: 0.2,
                      }
                }
                className="fill-background stroke-border stroke-1 shadow-inner"
              />

              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const midDeg = START_ANGLE + slice * index;
                const { x: iconX, y: iconY } = polarToCartesian(
                  iconRingRadius,
                  midDeg,
                );
                const isActive = activeIndex === index;
                const ICON_BOX = iconSize * 2.5;

                return (
                  <motion.g
                    key={item.id}
                    variants={itemVariants}
                    className="cursor-pointer outline-none"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() => onSelect?.(item)}
                    style={{ originX: "0px", originY: "0px" }}
                  >
                    <path
                      d={slicePath(
                        index,
                        menuItems.length,
                        wedgeOuterRadius,
                        wedgeInnerRadius,
                      )}
                      className={cn(
                        "transition-colors duration-200 stroke-1",
                        isActive
                          ? "fill-primary stroke-primary-foreground/20"
                          : "fill-background/90 stroke-border/50 hover:fill-accent",
                      )}
                    />

                    <foreignObject
                      x={iconX - ICON_BOX / 2}
                      y={iconY - ICON_BOX / 2}
                      width={ICON_BOX}
                      height={ICON_BOX}
                      className="pointer-events-none"
                    >
                      <div className="size-full flex items-center justify-center">
                        <Icon
                          size={iconSize}
                          weight={isActive ? "fill" : "regular"}
                          className={cn(
                            "transition-all duration-200",
                            isActive
                              ? "text-primary-foreground "
                              : "text-muted-foreground",
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
