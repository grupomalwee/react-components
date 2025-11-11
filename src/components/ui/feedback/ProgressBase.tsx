"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import LabelBase from "../form/LabelBase";
import { cn } from "@/lib/utils";


export type ProgressType = "bar" | "segments" | "panels" | "circles";

export interface ProgressBaseProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: ProgressType;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showValue?: boolean;
  valuePosition?: "left" | "right" | "inside";
  segments?: number;
  steps?: string[];
  currentStep?: number;
  autocolor?: number[];
  plusIndicator?: boolean;
}

const ProgressBase = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBaseProps
>(
  (
    {
      className,
      value: rawValue,
      label,
      leftIcon,
      rightIcon,
      variant = "bar",
      segments = 5,
      steps = [],
      currentStep = 0,
      showValue = false,
      valuePosition = "right",
      autocolor,
      plusIndicator,
      ...props
    },
    ref
  ) => {
    const value = Number(rawValue || 0);
    const indicatorWidth = Math.min(value, 100);

    switch (variant) {
      case "segments":
        return (
          <ProgressSegmentsBase
            label={label}
            segments={segments}
            value={value || 0}
          />
        );

      case "panels":
        return (
          <ProgressPanelsBase
            label={label}
            steps={steps}
            currentStep={currentStep}
          />
        );

      case "circles":
        return (
          <ProgressCirclesBase
            label={label}
            steps={steps}
            currentStep={currentStep}
          />
        );

      case "bar":
      default:
        return (
          <div className="flex flex-col gap-1 w-full min-w-[150px]">
            {label && <LabelBase className="py-2">{label}</LabelBase>}

            <div className="flex items-center gap-2">
              {showValue && valuePosition === "left" && (
                <div className="w-12 text-sm text-right font-extrabold">
                  {Math.round(value || 0)}%
                </div>
              )}
              {leftIcon && (
                <div className="flex items-center justify-center">
                  {leftIcon}
                </div>
              )}

              <ProgressPrimitive.Root
                ref={ref}
                className={cn(
                  " relative h-3 w-full overflow-visible rounded-full bg-muted/80 shadow-inner transition-all ",
                  className
                )}
                value={value}
                {...props}
              >
                <ProgressPrimitive.Indicator
                  className={cn(
                    "h-full transition-all duration-500 ease-in-out rounded-lg",
                    autocolor && autocolor.length >= 2
                      ? "bg-transparent"
                      : "bg-primary"
                  )}
                  style={{ width: `${indicatorWidth}%` }}
                />

                {autocolor &&
                  Array.isArray(autocolor) &&
                  autocolor.length >= 2 &&
                  (() => {
                    const [t1Raw, t2Raw] = autocolor;
                    const [t1, t2] = [Number(t1Raw), Number(t2Raw)].sort(
                      (a, b) => a - b
                    );
                    const v = Number(value || 0);
                    let colorClass = "bg-red-500";

                    if (v <= t1) {
                      colorClass = "bg-red-500";
                    } else if (v <= t2) {
                      colorClass = "bg-yellow-500";
                    } else {
                      colorClass = "bg-emerald-500";
                    }
                    return (
                      <div
                        aria-hidden
                        className={cn(
                          "absolute top-0 left-0 h-full transition-all duration-500 ease-in-out rounded-lg",
                          colorClass
                        )}
                        style={{ width: `${indicatorWidth}%` }}
                      />
                    );
                  })()}

                {plusIndicator && value > 100 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 w-0.5 bg-black/70 transition-all duration-500 ease-in-out pointer-events-none"
                    style={{left: `${(100 / value) * 100}%`, }}
                  >
                    {value > 120 && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs whitespace-nowrap font-extrabold">{`+${Math.round(
                        value - 100
                      )}%`}</div>
                    )}
                  </div>
                )}

                {showValue && valuePosition === "inside" && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-sm select-none pointer-events-none text-secondary font-extrabold"
                    aria-hidden
                  >
                    {Math.round(value || 0)}%
                  </span>
                )}
              </ProgressPrimitive.Root>

              {showValue && valuePosition === "right" && (
                <div className="w-12 text-sm font-extrabold text-left">
                  {Math.round(value || 0)}%
                </div>
              )}
              {rightIcon && (
                <div className="flex items-center justify-center">
                  {rightIcon}
                </div>
              )}
            </div>
          </div>
        );
    }
  }
);

ProgressBase.displayName = "ProgressBase";

//  SEGMENTs
export interface ProgressSegmentsBaseProps {
  label?: string;
  segments: number;
  value: number;
}

const ProgressSegmentsBase = ({
  label,
  segments,
  value,
}: ProgressSegmentsBaseProps) => {
  const filled = Math.round((value / 100) * segments);

  return (
    <div className="flex flex-col gap-1 w-full min-w-[150px]">
      {label && <LabelBase className="py-2">{label}</LabelBase>}
      <div className="flex gap-1 w-full">
        {Array.from({ length: segments }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              idx < filled ? "bg-primary" : "bg-zinc-300 hover:bg-zinc-400"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// PANELS
export interface ProgressPanelsBaseProps {
  label?: string;
  steps: string[];
  currentStep: number;
}

const ArrowRightIcon = () => (
  <svg
    className="w-6 h-6 text-zinc-400 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ProgressPanelsBase = ({
  label,
  steps,
  currentStep,
}: ProgressPanelsBaseProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <LabelBase className="py-2">{label}</LabelBase>}

      <div className="flex w-full gap-1 rounded-lg overflow-hidden">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={idx}>
              <div
                className={cn(
                  "relative flex items-center justify-center cursor-pointer select-none rounded-lg border transition-shadow duration-300 ease-in-out",
                  "hover:shadow-md hover:z-10",
                  "aspect-[5/1] min-w-[90px] px-4",
                  isActive
                    ? "bg-primary/20 border-2 border-primary shadow-lg font-semibold"
                    : "border-zinc-300"
                )}
                style={{ flex: "1 1 0" }}
              >
                <span className="truncate">{step}</span>

                {isActive && (
                  <div className="absolute bottom-0 left-0 h-1 w-full animate-pulse rounded-b-lg" />
                )}
              </div>

              {!isLast && (
                <div className="flex items-center px-2 group">
                  <ArrowRightIcon />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// CIRCLES

export interface ProgressCirclesBaseProps {
  label?: string;
  steps: string[];
  currentStep: number;
}

const ProgressCirclesBase = ({
  label,
  steps,
  currentStep,
}: ProgressCirclesBaseProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="py-2 text-base font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative flex items-center justify-between w-full">
        <div className="absolute top-5 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-700" />

        <div
          className="absolute top-5 left-0 h-1 bg-primary transition-all duration-300"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, idx) => {
          const isActive = idx <= currentStep;

          return (
            <div
              key={idx}
              className="relative flex flex-col items-center w-10"
              style={{ zIndex: isActive ? 10 : 1 }}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 cursor-pointer select-none",
                  isActive
                    ? "bg-primary text-white dark:text-black shadow-md"
                    : "bg-zinc-200 text-zinc-500 hover:bg-zinc-300 dark:bg-zinc-500 dark:text-black"
                )}
              >
                {idx + 1}
              </div>

              <span className="text-xs text-center font-medium mt-1 max-w-[80px] break-words">
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export {
  ProgressBase,
  ProgressSegmentsBase,
  ProgressPanelsBase,
  ProgressCirclesBase,
};

export default ProgressBase;