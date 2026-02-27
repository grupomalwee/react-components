"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ZoomImageProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  src: string;
  alt: string;
  maxZoom?: number;
  transitionDuration?: number;
  borderRadius?: number;
  imageClassName?: string;
}

const ZoomImage = React.forwardRef<HTMLDivElement, ZoomImageProps>(
  (
    {
      className,
      src,
      alt,
      maxZoom = 2.0,
      transitionDuration = 0.3,
      borderRadius = 12,
      imageClassName,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);
    const zoomLevel = useMotionValue(1);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const smoothZoomLevel = useSpring(zoomLevel, springConfig);

    const transformOrigin = useTransform(
      [mouseX, mouseY],
      ([latestX, latestY]) => `${latestX}% ${latestY}%`,
    );

    const touchStartDist = React.useRef(0);
    const touchStartZoom = React.useRef(1);
    const isPinching = React.useRef(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isPinching.current) return;

      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      mouseX.set(x);
      mouseY.set(y);
    };

    const innerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current!);

    React.useEffect(() => {
      const element = innerRef.current;
      if (!element) return;

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = -e.deltaY * 0.005;
        const newZoom = Math.min(Math.max(1, zoomLevel.get() + delta), maxZoom);
        zoomLevel.set(newZoom);
      };

      element.addEventListener("wheel", onWheel, { passive: false });
      return () => element.removeEventListener("wheel", onWheel);
    }, [maxZoom, zoomLevel]);

    const handleMouseLeave = () => {
      if (!isPinching.current) {
        mouseX.set(50);
        mouseY.set(50);
        zoomLevel.set(1);
      }
    };

    const getDistance = (touches: React.TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getCenter = (touches: React.TouchList, rect: DOMRect) => {
      const x = (touches[0].clientX + touches[1].clientX) / 2;
      const y = (touches[0].clientY + touches[1].clientY) / 2;
      return {
        x: ((x - rect.left) / rect.width) * 100,
        y: ((y - rect.top) / rect.height) * 100,
      };
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length === 2) {
        isPinching.current = true;
        touchStartDist.current = getDistance(e.touches);
        touchStartZoom.current = zoomLevel.get();

        const rect = e.currentTarget.getBoundingClientRect();
        const center = getCenter(e.touches, rect);
        mouseX.set(center.x);
        mouseY.set(center.y);
      }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length === 2 && isPinching.current) {
        e.preventDefault();

        const dist = getDistance(e.touches);
        const rect = e.currentTarget.getBoundingClientRect();

        const scaleChange = dist / touchStartDist.current;
        const newZoom = Math.min(
          Math.max(1, touchStartZoom.current * scaleChange),
          maxZoom,
        );
        zoomLevel.set(newZoom);
        const center = getCenter(e.touches, rect);
        mouseX.set(center.x);
        mouseY.set(center.y);
      }
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length < 2) {
        if (isPinching.current) {
          isPinching.current = false;
        }
      }
    };

    return (
      <motion.div
        ref={innerRef}
        className={cn(
          "relative w-full h-full overflow-hidden touch-none",
          className,
        )}
        style={{ borderRadius: `${borderRadius}px` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        <motion.img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-contain", imageClassName)}
          style={{
            borderRadius: `${borderRadius}px`,
            transformOrigin: transformOrigin,
            scale: smoothZoomLevel,
          }}
          transition={{
            type: "spring",
            duration: transitionDuration,
            bounce: 0,
          }}
        />
      </motion.div>
    );
  },
);

ZoomImage.displayName = "ZoomImage";

export { ZoomImage };
