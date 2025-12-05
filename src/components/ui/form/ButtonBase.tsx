"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { CircleNotchIcon } from "@phosphor-icons/react";

const buttonVariantsBase = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [&:not(.no-active-animation)]:active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-background dark:border-input dark:hover:bg-background/95",
        select:
          "box-border border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-background dark:hover:bg-background/95",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 py-2 px-4 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        select: "h-[34px] py-[7px] px-4 has-[>svg]:px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantsBase> {
  asChild?: boolean;
  testid?: string;
  isLoading?: boolean;
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      testid = `button-${variant ?? "default"}`,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const mergedDisabled = Boolean(props.disabled) || isLoading;

    const isActivelyLoading = isLoading && !props.disabled;

    return (
      <Comp
        className={cn(
          buttonVariantsBase({ variant, size, className }),
          "relative"
        )}
        ref={ref}
        data-testid={testid ?? `button-${variant ?? "default"}`}
        aria-busy={isActivelyLoading || undefined}
        disabled={mergedDisabled}
        {...props}
      >
          {children}

        {isActivelyLoading && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-md">
            <span className="absolute inset-0 rounded-md backdrop-blur overflow-hidden" />
            <CircleNotchIcon
              weight="bold"
              className="relative animate-spin h-4 w-4 text-current"
            />
          </span>
        )}
      </Comp>
    );
  }
);
ButtonBase.displayName = "Button";

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

const ButtonGroupBase = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === "vertical" ? "flex-col" : "flex-row",
          "rounded-md overflow-hidden isolate",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;

          const typedChild = child as React.ReactElement<{
            className?: string;
          }>;

          return React.cloneElement(typedChild, {
            className: cn(
              typedChild.props.className,
              "rounded-none",
              index === 0 && orientation === "horizontal" && "rounded-l-md",
              index === 0 && orientation === "vertical" && "rounded-t-md",
              index === React.Children.count(children) - 1 &&
                orientation === "horizontal" &&
                "rounded-r-md",
              index === React.Children.count(children) - 1 &&
                orientation === "vertical" &&
                "rounded-b-md"
            ),
          });
        })}
      </div>
    );
  }
);
ButtonGroupBase.displayName = "ButtonGroup";

// eslint-disable-next-line react-refresh/only-export-components
export { ButtonBase, ButtonGroupBase, buttonVariantsBase };
