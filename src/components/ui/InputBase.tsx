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
    { className, type = "text", label, labelClassname, leftIcon, rightIcon, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 w-full min-w-[150px]">
        {label && <LabelBase labelClassname={labelClassname}>{label}</LabelBase>}

        <div className="flex items-center rounded-md border border-input transition focus-within:ring-1 focus-within:ring-ring focus-within:border-ring">
          {leftIcon && (
            <div className="flex items-center justify-center px-2">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              "w-full flex-1 bg-transparent px-3 py-1 text-base placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
