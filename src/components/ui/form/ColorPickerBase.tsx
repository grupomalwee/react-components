"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import LabelBase from "./LabelBase";
import { ErrorMessage } from "../shared/ErrorMessage";
import { SlideBase } from "./SliderBase";
import { ButtonBase } from "./ButtonBase";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "../overlays";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function isValidHex(hex: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

export const DEFAULT_SWATCHES = [
  "#000000",
  "#ffffff",
  "#6B7280",
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#84CC16",
  "#22C55E",
  "#14B8A6",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F43F5E",
  "#D97706",
  "#0EA5E9",
];

export interface ColorPickerBaseProps {
  value?: string;
  onChange?: (value: string) => void;
  opacity?: number;
  onOpacityChange?: (opacity: number) => void;
  swatches?: string[];
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  "data-testid"?: string;
}

const ColorPickerBase = React.forwardRef<HTMLDivElement, ColorPickerBaseProps>(
  (
    {
      value = "#3B82F6",
      onChange,
      opacity = 1,
      onOpacityChange,
      swatches = DEFAULT_SWATCHES,
      label,
      error,
      disabled = false,
      className,
      "data-testid": dataTestId = "color-picker-base",
    },
    ref,
  ) => {
    const [hexInput, setHexInput] = React.useState(value.toUpperCase());

    React.useEffect(() => {
      setHexInput(value.toUpperCase());
    }, [value]);

    const rgb = hexToRgb(value) ?? { r: 59, g: 130, b: 246 };
    const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const opacityPercent = Math.round(opacity * 100);

    const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value.toUpperCase());
    };

    const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setHexInput(raw.toUpperCase());
      const withHash = raw.startsWith("#") ? raw : `#${raw}`;
      if (isValidHex(withHash)) onChange?.(withHash.toUpperCase());
    };

    const handleHexBlur = () => {
      const withHash = hexInput.startsWith("#") ? hexInput : `#${hexInput}`;
      if (!isValidHex(withHash)) setHexInput(value.toUpperCase());
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col w-full min-w-[150px]", className)}
        data-testid={dataTestId}
      >
        {label && <LabelBase className="mb-1">{label}</LabelBase>}

        <PopoverBase>
          <PopoverTriggerBase asChild disabled={disabled}>
            <ButtonBase
              variant="outline"
              size="select"
              disabled={disabled}
              data-testid={`${dataTestId}-trigger`}
              className={cn(
                "w-full justify-start font-normal",
                error && "border-destructive",
              )}
            >
              <span
                className="inline-block size-4 rounded-sm border border-border shrink-0"
                style={{
                  backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
                }}
              />
              <span className="font-mono text-xs tracking-wide">
                {value.toUpperCase()}
              </span>
              {onOpacityChange && (
                <span className="ml-auto text-muted-foreground text-xs">
                  {opacityPercent}%
                </span>
              )}
            </ButtonBase>
          </PopoverTriggerBase>

          <PopoverContentBase
            className="w-64 p-3 flex flex-col gap-3"
            align="start"
          >
            {/* Swatches grid */}
            <div className="grid grid-cols-8 gap-1">
              {swatches.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  title={swatch}
                  data-testid={`${dataTestId}-swatch`}
                  onClick={() => onChange?.(swatch)}
                  className={cn(
                    "size-6 rounded-md border transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    value.toUpperCase() === swatch.toUpperCase()
                      ? "border-ring ring-2 ring-ring/50 scale-110"
                      : "border-border",
                  )}
                  style={{ backgroundColor: swatch }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative size-9 shrink-0 rounded-md border border-border overflow-hidden cursor-pointer">
                <input
                  type="color"
                  value={value}
                  onChange={handleNativeChange}
                  data-testid={`${dataTestId}-native`}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{ backgroundColor: rgbString }}
                />
              </div>

              <div className="flex items-center gap-1 flex-1 rounded-md border border-input bg-background h-9 px-2">
                <span className="text-muted-foreground text-xs font-mono">
                  #
                </span>
                <input
                  type="text"
                  maxLength={6}
                  value={
                    hexInput.startsWith("#") ? hexInput.slice(1) : hexInput
                  }
                  onChange={handleHexInput}
                  onBlur={handleHexBlur}
                  data-testid={`${dataTestId}-hex-input`}
                  className="flex-1 bg-transparent text-xs font-mono text-foreground focus:outline-none uppercase tracking-widest placeholder:text-muted-foreground"
                  placeholder="RRGGBB"
                />
              </div>
            </div>

            {onOpacityChange && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Opacidade
                  </span>
                  <span className="text-xs font-mono text-foreground">
                    {opacityPercent}%
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 right-0 my-auto h-1.5 rounded-full pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 right-0 my-auto h-1.5 rounded-full pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, transparent, ${rgbString})`,
                    }}
                  />
                  <SlideBase
                    min={0}
                    max={100}
                    step={1}
                    value={[opacityPercent]}
                    onValueChange={([val]) => onOpacityChange(val / 100)}
                    data-testid={`${dataTestId}-opacity`}
                    className="relative"
                  />
                </div>
              </div>
            )}
          </PopoverContentBase>
        </PopoverBase>

        <ErrorMessage error={error} />
      </div>
    );
  },
);

ColorPickerBase.displayName = "ColorPickerBase";

export { ColorPickerBase };
