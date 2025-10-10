"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariantsBase = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive onclikk:scale-[0.98] active:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: " px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariantsBase> {
  asChild?: boolean
  testid?: string 
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, testid = `button-${variant ?? "default"}`, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
    className={cn(buttonVariantsBase({ variant, size, className }))}
        ref={ref}
        data-testid={testid ?? `button-${variant ?? "default"}`}
        {...props}
      />
    )
  }
)
ButtonBase.displayName = "Button"

// Group de botões
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  orientation?: "horizontal" | "vertical"
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
          if (!React.isValidElement(child)) return child

          const typedChild = child as React.ReactElement<{ className?: string }>

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
          })
        })}
      </div>
    )
  }
)
ButtonGroupBase.displayName = "ButtonGroup"

// eslint-disable-next-line react-refresh/only-export-components
export { ButtonBase, ButtonGroupBase, buttonVariantsBase }
