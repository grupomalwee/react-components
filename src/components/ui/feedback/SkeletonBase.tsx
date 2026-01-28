import { cn } from "../../../lib/utils";

function SkeletonBase({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white dark:before:via-gray-800 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { SkeletonBase };
