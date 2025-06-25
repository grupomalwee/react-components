import * as React from "react";

import { cn } from "../..//lib/utils";

const CardBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "card-base", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    data-testid={dataTestId}
    {...props}
  />
));
CardBase.displayName = "Card";

const CardHeaderBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "card-header", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    data-testid={dataTestId}
    {...props}
  />
));
CardHeaderBase.displayName = "CardHeader";

const CardTitleBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "card-title", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    data-testid={dataTestId}
    {...props}
  />
));
CardTitleBase.displayName = "CardTitle";

const CardDescriptionBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "card-description", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    data-testid={dataTestId}
    {...props}
  />
));
CardDescriptionBase.displayName = "CardDescription";

const CardContentBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "card-content", ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} data-testid={dataTestId} {...props} />
));
CardContentBase.displayName = "CardContent";

const CardFooterBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "card-footer", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    data-testid={dataTestId}
    {...props}
  />
));

CardFooterBase.displayName = "CardFooter";

export {
  CardBase,
  CardHeaderBase,
  CardFooterBase,
  CardTitleBase,
  CardDescriptionBase,
  CardContentBase,
};