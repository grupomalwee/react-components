import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      status: {
        online: "bg-green-500 border-white dark:border-zinc-900",
        offline: "bg-gray-400 border-white dark:border-zinc-900",
        busy: "bg-red-500 border-white dark:border-zinc-900",
        away: "bg-yellow-400 border-white dark:border-zinc-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type StatusType = "online" | "offline" | "busy" | "away";

interface BadgeBaseProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  status?: StatusType;
}

function BadgeBase({
  className,
  variant,
  status,
  asChild = false,
  children,
  ...props
}: BadgeBaseProps) {
  const Comp = asChild ? Slot : "span";

  const isStatus = Boolean(status);

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, status: isStatus ? status : undefined }),
        isStatus &&
          "absolute bottom-0 right-0 rounded-full p-0 h-4 w-4 flex items-center justify-center border-2",
        className
      )}
      {...props}
    >
      {isStatus ? null : children}
    </Comp>
  );
}

export { BadgeBase, badgeVariants };
