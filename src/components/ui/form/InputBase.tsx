import * as React from "react";
import { cn } from "../../../lib/utils";
import LabelBase from "./LabelBase";
import ErrorMessage from "../shared/ErrorMessage";

export interface InputBaseProps extends React.ComponentProps<"input"> {
  label?: string;
  labelClassname?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  "data-testid"?: string;
  error?: string | undefined;
  numericKeyboard?: boolean;
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
      "data-testid": dataTestId,
      numericKeyboard,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col w-full min-w-[150px]">
        {label && <LabelBase className={labelClassname}>{label}</LabelBase>}

        <div
          className={cn(
            "flex items-center rounded-md transition h-9  bg-background overflow-hidden",
            type !== "file" && "border border-input",
            error
              ? "border-destructive focus:ring-1 focus:ring-destructive"
              : "border-input",
          )}
        >
          {leftIcon && (
            <div className="flex items-center justify-center px-2">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            inputMode={numericKeyboard ? "numeric" : undefined}
            pattern={numericKeyboard ? "[0-9]*" : undefined}
            className={cn(
              "w-full flex-1 text-sm p-1.5  px-3 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 bg-background text-foreground",
              className,
            )}
            ref={ref}
            data-testid={dataTestId ?? "input-base"}
            {...props}
          />

          {rightIcon && (
            <div className="flex items-center justify-center px-2">
              {rightIcon}
            </div>
          )}
        </div>
        <ErrorMessage error={error} />
      </div>
    );
  },
);

InputBase.displayName = "Input";

export { InputBase };
