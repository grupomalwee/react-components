import * as React from "react";
import { cn } from "../..//lib/utils";
import LabelBase from "./LabelBase";

interface InputBaseProps extends React.ComponentProps<"input"> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  ({ className, type = "text", label, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && <LabelBase>{label}</LabelBase>}

        <div className="flex w-full border border-input rounded-md">
          {leftIcon && (
            <div className="flex items-center justify-center px-2">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              "flex h-9 w-full bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

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
