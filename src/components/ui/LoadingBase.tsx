"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loadingVariants = cva(
  "rounded-full border-2", 
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-[3px]",
      },
      variant: {
        default: "border-gray-200 border-t-primary",
        secondary: "border-gray-200 border-t-gray-600",
        destructive: "border-red-200 border-t-red-500",
        success: "border-green-200 border-t-green-500",
        warning: "border-yellow-200 border-t-yellow-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

interface LoadingBaseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  message?: string;
  overlay?: boolean;
}

const LoadingBase = React.forwardRef<HTMLDivElement, LoadingBaseProps>(
  ({ className, size, variant, message, overlay = false, ...props }, ref) => {
    const loadingContent = (
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(loadingVariants({ size, variant }))}
          style={{
            animation: 'spin 1s linear infinite',
          }}
          aria-hidden="true"
        />
        {message && (
          <p
            className={cn(
              "text-sm text-center",
              variant === "secondary" && "text-gray-600",
              variant === "destructive" && "text-red-600",
              variant === "success" && "text-green-600", 
              variant === "warning" && "text-yellow-600",
              variant === "default" && "text-gray-700"
            )}
          >
            {message}
          </p>
        )}
      </div>
    );

    if (overlay) {
      return (
        <div
          ref={ref}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm",
            className
          )}
          role="status"
          aria-label={message || "Carregando"}
          {...props}
        >
          <div>
            {loadingContent}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        role="status"
        aria-label={message || "Carregando"}
        {...props}
      >
        {loadingContent}
      </div>
    );
  }
);
LoadingBase.displayName = "LoadingBase";

export { LoadingBase };
