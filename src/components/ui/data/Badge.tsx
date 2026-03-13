import { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-border",
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
  },
);

export type BadgeColorType =
  | "green"
  | "gray"
  | "red"
  | "yellow"
  | "blue"
  | "purple";

export type BadgeRankType = "diamond" | "gold" | "silver" | "bronze";

interface BadgeBaseProps
  extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  color?: BadgeColorType;
  rank?: BadgeRankType;
  size?: "sm" | "md" | "lg";
  status?: string;
}

function Badge({
  className,
  color,
  rank,
  size = "md",
  asChild = false,
  children,
  style,
  ...props
}: BadgeBaseProps) {
  const Comp = asChild ? Slot : "span";

  const customStyle = style;

  const colorClasses: Record<BadgeColorType, string> = {
    green: "bg-green-50 text-green-500 border-green-200",
    gray: "bg-gray-50 text-gray-500 border-gray-200",
    red: "bg-red-50 text-red-500 border-red-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    blue: "bg-blue-50 text-blue-500 border-blue-200",
    purple: "bg-purple-50 text-purple-500 border-purple-200",
  };

const rankClasses: Record<BadgeRankType, string> = {
  diamond: "bg-cyan-100 text-cyan-600 border-cyan-300 dark:text-cyan-800 dark:border-cyan-800",
  gold: "bg-amber-50 text-amber-500 border-amber-300 dark:text-amber-600 dark:border-amber-600 dark:bg-amber-50",
  silver: "bg-gray-100 text-gray-500 border-gray-300 dark:text-gray-800 dark:border-gray-800",
  bronze: "bg-orange-100 text-orange-700 border-orange-300 dark:text-orange-800 dark:border-orange-800",
};

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ size }),
        color ? colorClasses[color] : undefined,
        rank ? rankClasses[rank] : undefined,
        className,
      )}
      style={customStyle}
      {...props}
    >
      {children}
    </Comp>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
