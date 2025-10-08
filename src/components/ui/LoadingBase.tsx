"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loadingVariants = cva(
  "rounded-full border-2 animate-spin border-muted border-t-primary", 
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12 border-[3px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dotsVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "gap-1",
        md: "gap-1.5",
        lg: "gap-2",
        xl: "gap-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dotVariants = cva(
  "rounded-full bg-gradient-to-r from-primary to-primary/70 shadow-sm",
  {
    variants: {
      size: {
        sm: "h-1.5 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-2.5 w-3",
        xl: "h-3.5 w-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface LoadingBaseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  message?: string;
  overlay?: boolean;
  variant?: "spinner" | "dots";
}

const LoadingBase = React.forwardRef<HTMLDivElement, LoadingBaseProps>(
  ({ className, size, message, overlay = false, variant = "spinner", ...props }, ref) => {
    // Adicionamos o CSS customizado para a animação dos dots
    React.useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.8;
          }
          40% {
            transform:  translateY(-8px);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }, []);

    const renderSpinner = () => {
      if (variant === "dots") {
        return (
          <div className={cn(dotsVariants({ size }))} aria-hidden="true">
            <div 
              className={cn(dotVariants({ size }))}
              style={{ 
                animation: "dotBounce 1.4s ease-in-out infinite",
                animationDelay: "0ms",
                transform: "translateY(0px)"
              }}
            />
            <div 
              className={cn(dotVariants({ size }))}
              style={{ 
                animation: "dotBounce 1.4s ease-in-out infinite",
                animationDelay: "0.16s",
                transform: "translateY(0px)"
              }}
            />
            <div 
              className={cn(dotVariants({ size }))}
              style={{ 
                animation: "dotBounce 1.4s ease-in-out infinite",
                animationDelay: "0.32s",
                transform: "translateY(0px)"
              }}
            />
          </div>
        );
      }

      return (
        <div
          className={cn(loadingVariants({ size }))}
          style={{
            animation: 'spin 1s linear infinite',
          }}
          aria-hidden="true"
        />
      );
    };

    const loadingContent = (
      <div className="flex flex-col items-center gap-4">
        {renderSpinner()}
        {message && (
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
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
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-background/80 dark:bg-background/60",
            "backdrop-blur-md backdrop-saturate-150",
            "transition-all duration-300 ease-in-out",
            "animate-in fade-in-0",
            className
          )}
          role="status"
          aria-label={message || "Carregando"}
          {...props}
        >
          <div className={cn(
            "relative p-8 rounded-2xl",
            "bg-card/90 dark:bg-card/95",
            "border border-border/50",
            "shadow-2xl shadow-black/10 dark:shadow-black/30",
            "backdrop-blur-xl backdrop-saturate-150",
            "animate-in zoom-in-95 fade-in-0 duration-300",
            "text-center space-y-4"
          )}>
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
