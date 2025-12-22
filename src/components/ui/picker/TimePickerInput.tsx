import { CaretUpIcon, CaretDownIcon } from "@phosphor-icons/react";

import { cn } from "../../../lib/utils";
import React from "react";
import {
  Period,
  TimePickerType,
  getArrowByType,
  getDateByType,
  setDateByType,
} from "./utils/time-picker-utils";

export interface TimePickerInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  picker: TimePickerType;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  period?: Period;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
  showArrows?: boolean;
  label?: string;
  error?: boolean;
  inputSize?: "sm" | "md" | "lg";
  enableButton?: boolean;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
}

const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = "tel",
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      setDate,
      onChange,
      onKeyDown,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      showArrows = true,
      label,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false);
    const [prevIntKey, setPrevIntKey] = React.useState<string>("0");
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    /**
     * allow the user to enter the second digit within 2 seconds
     * otherwise start again with entering first digit
     */
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [flag]);

    const calculatedValue = React.useMemo(() => {
      return getDateByType(date, picker);
    }, [date, picker]);

    const calculateNewValue = (key: string) => {
      /*
       * If picker is '12hours' and the first digit is 0, then the second digit is automatically set to 1.
       * The second entered digit will break the condition and the value will be set to 10-12.
       */
      if (picker === "12hours") {
        if (flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0")
          return "0" + key;
      }

      return !flag ? "0" + key : calculatedValue.slice(1, 2) + key;
    };

    const handleArrowClick = (direction: "up" | "down") => {
      const step = direction === "up" ? 1 : -1;
      const newValue = getArrowByType(calculatedValue, step, picker);
      if (flag) setFlag(false);
      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker, period));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") return;
      e.preventDefault();
      if (e.key === "ArrowRight") onRightFocus?.();
      if (e.key === "ArrowLeft") onLeftFocus?.();
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        const step = e.key === "ArrowUp" ? 1 : -1;
        const newValue = getArrowByType(calculatedValue, step, picker);
        if (flag) setFlag(false);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker, period));
      }
      if (e.key >= "0" && e.key <= "9") {
        if (picker === "12hours") setPrevIntKey(e.key);

        const newValue = calculateNewValue(e.key);
        if (flag) onRightFocus?.();
        setFlag((prev) => !prev);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker, period));
      }
    };

    const getPickerLabel = () => {
      if (label) return label;
      switch (picker) {
        case "hours":
        case "12hours":
          return "Horas";
        case "minutes":
          return "Minutos";
        case "seconds":
          return "Segundos";
        default:
          return "";
      }
    };

    const getAriaLabel = () => {
      const baseLabel = getPickerLabel();
      return `${baseLabel}, valor atual: ${calculatedValue}.`;
    };
    return (
      <div className="relative group flex flex-col items-center">
        {getPickerLabel() && (
          <label
            htmlFor={id || picker}
            className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 sm:mb-2 select-none"
          >
            {getPickerLabel()}
          </label>
        )}

        <div
          className={cn(
            "relative flex flex-col items-center",
            "transition-all duration-200"
          )}
        >
          {showArrows && (
            <button
              type="button"
              onClick={() => handleArrowClick("up")}
              className={cn(
                "flex items-center justify-center w-10 sm:w-12 h-5 sm:h-6 mb-1",
                "rounded-t",
                "bg-background hover:bg-accent active:bg-accent/80 transition-colors",
                "text-muted-foreground hover:text-foreground",
                "focus:outline-none focus:ring-1 focus:ring-ring",
                "touch-manipulation",
                isFocused && "border-ring"
              )}
              tabIndex={-1}
              aria-label={`Incrementar ${getPickerLabel().toLowerCase()}`}
            >
              <CaretUpIcon size={14} className="sm:w-4 sm:h-4" />
            </button>
          )}

          <div className="relative">
            <input
              ref={ref}
              id={id || picker}
              name={name || picker}
              className={cn(
                "w-16 sm:w-20 h-10 sm:h-12 text-center font-mono text-lg sm:text-xl font-semibold",
                "border-2 rounded-lg",
                "bg-background text-foreground",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
                "selection:bg-primary selection:text-primary-foreground",
                "touch-manipulation",
                showArrows && "rounded-lg",
                isFocused && "ring-2 ring-ring border-ring shadow-md",
                className
              )}
              value={value || calculatedValue}
              onChange={(e) => {
                e.preventDefault();
                onChange?.(e);
              }}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
                e.target.select();
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              type={type}
              inputMode="decimal"
              onKeyDown={(e) => {
                onKeyDown?.(e);
                handleKeyDown(e);
              }}
              aria-label={getAriaLabel()}
              aria-describedby={`${id || picker}-help`}
              autoComplete="off"
              spellCheck={false}
              {...props}
            />

            {isFocused && (
              <div className="absolute inset-0 rounded-lg ring-2 ring-primary/20 pointer-events-none animate-pulse" />
            )}
          </div>

          {showArrows && (
            <button
              type="button"
              onClick={() => handleArrowClick("down")}
              className={cn(
                "flex items-center justify-center w-10 sm:w-12 h-5 sm:h-6 mt-1",
                "rounded-b",
                "bg-background hover:bg-accent active:bg-accent/80 transition-colors",
                "text-muted-foreground hover:text-foreground",
                "focus:outline-none focus:ring-1 focus:ring-ring",
                "touch-manipulation",
                isFocused && "border-ring"
              )}
              tabIndex={-1}
              aria-label={`Decrementar ${getPickerLabel().toLowerCase()}`}
            >
              <CaretDownIcon size={14} className="sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

TimePickerInput.displayName = "TimePickerInput";

export { TimePickerInput };
