import * as React from "react";
import { cn } from "../../lib/utils";
import LabelBase from "./LabelBase";

export interface InputBaseProps extends React.ComponentProps<"input"> {
  label?: string;
  labelClassname?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      className,
      type = "text",
      label,
      labelClassname,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col w-full min-w-[150px]">
        {label && <LabelBase className={labelClassname}>{label}</LabelBase>}

        <div
          className={cn(
            "flex items-center rounded-md transition focus-within:ring-1 focus-within:ring-ring focus-within:border-ring bg-white dark:bg-[hsl(231,15%,19%)] overflow-hidden",
            type !== "number" && type !== "file" && "border border-input",
            (type === "file" || type === "number") && "border-none"
          )}
        >
          {leftIcon && (
            <div className="flex items-center justify-center px-2">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              "w-full flex-1 text-sm leading-tight py-2 px-3 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-[hsl(231,15%,19%)]",
              className
            )}
            ref={ref}
            {...props}
          />

          {rightIcon && (
            <div className="flex items-center justify-center px-2">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InputBase.displayName = "Input";

export { InputBase };
