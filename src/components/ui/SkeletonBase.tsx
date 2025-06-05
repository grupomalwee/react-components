import { cn } from "../..//lib/utils";

function SkeletonBase({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse  bg-primary/10", className)}
      {...props}
    />
  );
}

export { SkeletonBase };
