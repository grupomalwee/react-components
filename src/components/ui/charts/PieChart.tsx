import React, { useState } from "react";
import {
  PieChart as RechartPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Sector,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { motion, AnimatePresence } from "framer-motion";
import ChartHeader from "./components/ChartHeader";
import { cn } from "@/lib/utils";

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
  [key: string]: string | number | undefined;
}

interface PieChartProps {
  data: PieChartData[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  title?: string;
  titlePosition?: "left" | "center" | "right";
  className?: string;
  periodLabel?: string;
  totalLabel?: string;
  valueFormatter?: (props: {
    value: number | string;
    formattedValue: string;
    dataKey?: string;
    name?: string;
  }) => string;
  categoryFormatter?: (value: string | number) => string;
}

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayed, setDisplayed] = React.useState(value);
  const prevRef = React.useRef(value);

  React.useEffect(() => {
    const start = prevRef.current;
    const end = value;
    if (start === end) return;
    const duration = 420;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevRef.current = end;
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{displayed}</>;
};

const Callout = ({
  sx,
  sy,
  mx,
  my,
  ex,
  ey,
  fill,
  name,
  value,
  percent,
  isRight,
}: {
  sx: number;
  sy: number;
  mx: number;
  my: number;
  ex: number;
  ey: number;
  fill: string;
  name: string;
  value: number;
  percent: number;
  isRight: boolean;
}) => (
  <AnimatePresence>
    <motion.g
      key={name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="z-9999"
    >
      <motion.path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.32, ease: "easeInOut" }}
      />

      <motion.circle
        cx={ex}
        cy={ey}
        r={3}
        fill={fill}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      />

      <foreignObject
        x={isRight ? ex + 10 : ex - 90}
        y={ey - 24}
        width={90}
        height={48}
        style={{ overflow: "visible" }}
      >
        <motion.div
          key={name}
          initial={{
            opacity: 0,
            x: isRight ? -14 : 14,
            scale: 0.88,
            filter: "blur(4px)",
          }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            x: isRight ? -8 : 8,
            scale: 0.92,
            filter: "blur(3px)",
          }}
          transition={{
            type: "spring",
            stiffness: 460,
            damping: 26,
            mass: 0.8,
          }}
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "#333",
              lineHeight: 1,
            }}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -4, opacity: 0 }}
            transition={{
              delay: 0.06,
              type: "spring",
              stiffness: 400,
              damping: 22,
            }}
          >
            PV <AnimatedNumber value={value} />
          </motion.div>

          <motion.div
            style={{ fontSize: 11, color: "#999", marginTop: 5 }}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -4, opacity: 0 }}
            transition={{
              delay: 0.12,
              type: "spring",
              stiffness: 400,
              damping: 22,
            }}
          >
            Rate {(percent * 100).toFixed(2)}%
          </motion.div>
        </motion.div>
      </foreignObject>
    </motion.g>
  </AnimatePresence>
);

const renderActiveShape = (props: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * (midAngle ?? 0));
  const cos = Math.cos(-RADIAN * (midAngle ?? 0));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {(payload as PieChartData)?.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />

      <Callout
        sx={sx}
        sy={sy}
        mx={mx}
        my={my}
        ex={ex}
        ey={ey}
        fill={fill ?? "#8884d8"}
        name={(payload as PieChartData)?.name}
        value={value as number}
        percent={percent ?? 0}
        isRight={cos >= 0}
      />
    </g>
  );
};

const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  width = 400,
  height = 300,
  innerRadius = 60,
  outerRadius = 80,
  showLegend = true,
  showTooltip = true,
  title,
  titlePosition = "left",
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const finalColors = Object.fromEntries(
    data.map((d) => [d.name, d.color || "#8884d8"]),
  );

  return (
    <div
      className={cn(
        "w-full overflow-hidden min-w-0 rounded-lg border-border bg-card",
        className,
      )}
      tabIndex={-1}
    >
      {title && (
        <ChartHeader
          title={title}
          titlePosition={titlePosition}
          HORIZONTAL_PADDING_CLASS="px-6"
          data={data}
          allKeys={data.map((d) => d.name)}
          processedData={data}
          finalColors={finalColors}
          mapperConfig={Object.fromEntries(
            data.map((d) => [
              d.name,
              { label: d.name, color: d.color || "#8884d8" },
            ]),
          )}
        />
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartPieChart
          width={typeof width === "number" ? width : 400}
          height={height}
          margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
        >
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
            onClick={e => { if (e && e.target && typeof e.target.blur === 'function') e.target.blur(); }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
            ))}
          </Pie>
          {showLegend && <Legend />}
          {showTooltip && <Tooltip content={() => null} />}
        </RechartPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
