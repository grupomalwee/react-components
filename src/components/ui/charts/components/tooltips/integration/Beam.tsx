import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";

export const Beam: React.FC<{
  isInput: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  leftRef: React.RefObject<HTMLDivElement | null>;
  rightRef: React.RefObject<HTMLDivElement | null>;
}> = ({ isInput, containerRef, leftRef, rightRef }) => {
  const gradientId = useId();
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const container = containerRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      if (!container || !left || !right) return;

      const cr = container.getBoundingClientRect();
      const lr = left.getBoundingClientRect();
      const rr = right.getBoundingClientRect();

      const cx1 = lr.left - cr.left + lr.width / 2;
      const cy1 = lr.top - cr.top + lr.height / 2;
      const cx2 = rr.left - cr.left + rr.width / 2;
      const cy2 = rr.top - cr.top + rr.height / 2;

      const dx = cx2 - cx1,
        dy = cy2 - cy1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return;
      const ux = dx / dist,
        uy = dy / dist;

      const r1 = lr.width / 2;
      const r2 = rr.width / 2;

      setSvgSize({ w: cr.width, h: cr.height });
      setPathD(
        `M ${cx1 + ux * r1},${cy1 + uy * r1} ` +
          `L ${cx2 - ux * r2},${cy2 - uy * r2}`,
      );
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    requestAnimationFrame(() => requestAnimationFrame(update));
    schedule();
    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    if (leftRef.current) ro.observe(leftRef.current);
    if (rightRef.current) ro.observe(rightRef.current);

    const mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    mo.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mo.disconnect();
    };
  }, [containerRef, leftRef, rightRef]);

  const animX1 = isInput ? ["90%", "-10%"] : ["10%", "110%"];
  const animX2 = isInput ? ["100%", "0%"] : ["0%", "100%"];

  if (!pathD) return null;

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0"
      width={svgSize.w}
      height={svgSize.h}
      fill="none"
    >
      <path
        d={pathD}
        className="stroke-primary"
        strokeWidth={2}
        strokeOpacity={0.2}
        strokeLinecap="round"
      />
      <motion.path
        d={pathD}
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ strokeOpacity: 0 }}
        animate={{ strokeOpacity: 1 }}
        transition={{ duration: 1 }}
      />
      <defs>
        <motion.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: animX1,
            x2: animX2,
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }}
          transition={{
            duration: 4,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop stopColor="hsl(var(--primary))" />
          <stop offset="32.5%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
