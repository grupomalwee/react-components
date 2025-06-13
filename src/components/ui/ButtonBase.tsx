// components/ui/ButtonBase.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Variantes base do botão
const buttonVariantsBase = cva(
  `
    inline-flex items-center justify-center gap-2
    whitespace-nowrap rounded-md text-sm
    transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    active:scale-[0.97]
    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
  `,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:opacity-90 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm border border-transparent hover:opacity-80 hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-1.5",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Props base do botão
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantsBase> {
  asChild?: boolean;
}

// Botão individual
const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariantsBase({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonBase.displayName = "Button";

// Group de botões (horizontal)
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
              "rounded-none border-0",
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

export { ButtonBase, ButtonGroupBase, buttonVariantsBase };
