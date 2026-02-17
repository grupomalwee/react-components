import { forwardRef, useEffect, useState } from "react";
import { InputBase } from "./InputBase";
import { cn } from "../../../lib/utils";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { ErrorMessageProps } from "../shared/ErrorMessage";

export interface DebouncedInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">,
    ErrorMessageProps {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  label?: string;
  labelClassname?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showLoadingIndicator?: boolean;
  error?: string | undefined;
}

export const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  (
    {
      value: initialValue,
      onChange,
      debounce = 500,
      label,
      labelClassname,
      leftIcon,
      rightIcon,
      showLoadingIndicator = false,
      className,
      error,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState(initialValue);
    const [isDebouncing, setIsDebouncing] = useState(false);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      if (value === initialValue) {
        setIsDebouncing(false);
        return;
      }

      setIsDebouncing(true);

      const timeout = setTimeout(() => {
        onChange(value);
        setIsDebouncing(false);
      }, debounce);

      return () => {
        clearTimeout(timeout);
        setIsDebouncing(false);
      };
    }, [debounce, initialValue, onChange, value]);

    const renderRightIcon = () => {
      if (showLoadingIndicator && isDebouncing) {
        return (
          <CircleNotchIcon className="h-4 w-4 animate-spin  text-muted-foreground" />
        );
      }
      return rightIcon;
    };

    return (
      <InputBase
        {...props}
        ref={ref}
        label={label}
        labelClassname={labelClassname}
        leftIcon={leftIcon}
        rightIcon={renderRightIcon()}
        className={cn("transition-all duration-200", className)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={error}
      />
    );
  },
);

DebouncedInput.displayName = "DebouncedInput";

export default DebouncedInput;
