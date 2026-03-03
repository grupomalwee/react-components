import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type CircularProgressSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<CircularProgressSize, { container: string; text: string }> = {
  sm: { container: "size-24", text: "text-lg" },
  md: { container: "size-40", text: "text-2xl" },
  lg: { container: "size-56", text: "text-3xl" },
  xl: { container: "size-72", text: "text-4xl" },
};

export interface CircularProgressProps {
  value: number;
  max?: number;
  min?: number;
  size?: CircularProgressSize;
  showValue?: boolean;
  label?: string;
  disableAnimation?: boolean;
  midThreshold?: number;
  lowThreshold?: number;
  formatValue?: (percent: number) => string;
  className?: string;
}

export function CircularProgress({
  value,
  className,
  max = 100,
  min = 0,
  size = "md",
  showValue = true,
  label,
  disableAnimation = false,
  midThreshold = 50,
  lowThreshold = 10,
  formatValue,
}: CircularProgressProps) {
  const circumference = 2 * Math.PI * 45;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100);

  const count = useMotionValue(disableAnimation ? currentPercent : 0);
  const rounded = useTransform(count, (v) => {
    const pct = Math.round(v);
    return formatValue ? formatValue(pct) : `${pct}%`;
  });

  const strokePercent = useSpring(disableAnimation ? currentPercent : 0, {
    stiffness: 55,
    damping: 18,
    restDelta: 0.001,
  });

  const strokeDasharray = useTransform(
    strokePercent,
    (v) => `${(v / 100) * circumference} ${circumference}`
  );

  let colorClass: string;
  if (currentPercent >= midThreshold) colorClass = "stroke-emerald-500";
  else if (currentPercent > lowThreshold) colorClass = "stroke-yellow-500";
  else colorClass = "stroke-red-500";

  useEffect(() => {
    if (disableAnimation) {
      count.set(currentPercent);
      strokePercent.set(currentPercent);
      return;
    }
    strokePercent.set(currentPercent);
    const controls = animate(count, currentPercent, {
      duration: 1.4,
      ease: "easeOut",
      delay: 0.15,
    });
    return controls.stop;
  }, [currentPercent, count, strokePercent, disableAnimation]);

  const { container, text } = sizeMap[size];

  return (
    <motion.div
      className={cn("relative flex flex-col items-center gap-1", className)}
      initial={disableAnimation ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={cn("relative font-semibold", container, text)}>
        <svg fill="none" className="size-full" strokeWidth="2" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth={10}
            strokeLinecap="round"
            className={`${colorClass} opacity-15`}
          />
          {/* Progress */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth={10}
            strokeLinecap="round"
            className={colorClass}
            strokeDashoffset="0"
            strokeDasharray={strokeDasharray}
            style={{ rotate: -90, transformOrigin: "50px 50px" }}
          />
        </svg>

        {showValue && (
          <motion.span
            className="absolute inset-0 m-auto flex size-fit items-center justify-center"
            initial={disableAnimation ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          >
            {rounded}
          </motion.span>
        )}
      </div>

      {label && (
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
      )}
    </motion.div>
  );
}

export default CircularProgress;
