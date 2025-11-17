import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "green" | "gray" | "red" | "yellow" | "blue" | "purple" | "retire";
  size?: "xs" | "sm" | "md" | "lg";
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "inline";
  show?: boolean;
  children?: React.ReactNode;
}

export function StatusIndicator({
  color = "green",
  size = "sm",
  position = "top-right",
  show = true,
  children,
  className,
  ...props
}: StatusProps) {
  const absolutePositionClasses: Record<string, string> = {
    "top-right": "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "top-left": "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2",
    "bottom-left": "absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  };
  const sizeClasses: Record<NonNullable<StatusProps["size"]>, string> = {
    xs: "h-2 w-2",
    sm: "h-2.5 w-2.5",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const colorClasses: Record<NonNullable<StatusProps["color"]>, string> = {
    green: "bg-green-500",
    gray: "bg-gray-400",
    red: "bg-red-500",
    yellow: "bg-yellow-400",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    retire: "bg-slate-300/70 ring-1 ring-slate-200",
  };

  const dotClass = cn(
    "rounded-full inline-block",
    sizeClasses[size],
    colorClasses[color],
    "flex-shrink-0"
  );

  if (position === "inline") {
    return (
      <span
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        {show && <span className={dotClass} aria-hidden={!show} />}
        {children && <span className="truncate">{children}</span>}
      </span>
    );
  }

  return (
    <div className={cn("relative inline-flex", className)} {...props}>
      {show && (
        <span
          aria-hidden={!show}
          className={cn(
            "pointer-events-none z-10",
            absolutePositionClasses[
              position as keyof typeof absolutePositionClasses
            ]
          )}
        >
          <span className={dotClass} />
        </span>
      )}

      <div className="min-w-0">{children}</div>
    </div>
  );
}

