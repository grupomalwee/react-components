"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: number | string;
  url: string;
  title: string;
}

export interface CarouselBaseProps {
  items: CarouselItem[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  width?: string;
  height?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
}

export default function CarouselBase({
  items,
  className,
  containerClassName,
  imageClassName,
  width,
  height = "400px",
  showControls = true,
  showIndicators = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  springConfig = {
    stiffness: 300,
    damping: 30,
  },
}: CarouselBaseProps) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: "spring",
        stiffness: springConfig.stiffness,
        damping: springConfig.damping,
      });
    }
  }, [index, x, springConfig.stiffness, springConfig.damping]);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  return (
    <div
      className={cn("w-full lg:p-10 sm:p-4 p-2", className)}
      style={{ width }}
    >
      <div className="flex flex-col gap-3">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg",
            containerClassName,
          )}
          ref={containerRef}
        >
          <motion.div className="flex" style={{ x }}>
            {items.map((item) => (
              <div key={item.id} className="shrink-0 w-full" style={{ height }}>
                <img
                  src={item.url}
                  alt={item.title}
                  className={cn(
                    "w-full h-full object-cover rounded-lg select-none pointer-events-none",
                    imageClassName,
                  )}
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          {showControls && (
            <>
              <motion.button
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
                  ${
                    index === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "bg-secondary hover:scale-110 hover:opacity-100 opacity-70"
                  }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              <motion.button
                disabled={index === items.length - 1}
                onClick={() =>
                  setIndex((i) => Math.min(items.length - 1, i + 1))
                }
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
                  ${
                    index === items.length - 1
                      ? "opacity-40 cursor-not-allowed"
                      : "bg-secondary hover:scale-110 hover:opacity-100 opacity-70"
                  }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </>
          )}

          {/* Progress Indicator */}
          {showIndicators && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
