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
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type ColorType = "green" | "gray" | "red" | "yellow" | "blue" | "purple";

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
    green: "bg-green-50 text-green-500 border-green-200",
    gray: "bg-gray-50 text-gray-500 border-gray-200",
    red: "bg-red-50 text-red-500 border-red-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    blue: "bg-blue-50 text-blue-500 border-blue-200",
    purple: "bg-purple-50 text-purple-500 border-purple-200",
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
