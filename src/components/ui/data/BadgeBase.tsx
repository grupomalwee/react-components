import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      size: {
        sm: "px-1 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type ColorType = "green" | "gray" | "red" | "yellow" | "blue" | "purple";

interface BadgeBaseProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  color?: ColorType;
  size?: "sm" | "md" | "lg";
  /** status: usado em alguns lugares para indicar um badge-posicionado (ex: Avatar). Valor livre/legacy */
  status?: string;
}

function BadgeBase({
  className,
  color,
  size = "md",
  asChild = false,
  children,
  style,
  ...props
}: BadgeBaseProps) {
  const Comp = asChild ? Slot : "span";

  const customStyle = style;

  const colorClasses: Record<ColorType, string> = {
    green: "bg-green-500 text-white",
    gray: "bg-gray-400 text-white",
    red: "bg-red-500 text-white",
    yellow: "bg-yellow-400 text-black",
    blue: "bg-blue-500 text-white",
    purple: "bg-purple-500 text-white",
  };

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ size }),
        color ? colorClasses[color] : undefined,
        className
      )}
      style={customStyle}
      {...props}
    >
      {children}
    </Comp>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { BadgeBase, badgeVariants };
