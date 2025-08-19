import { cn } from "../../lib/utils";

export type LoadingVariant =
  | "spinner"
  | "pulse"
  | "dots"
  | "grid"
  | "skeleton"
  | "dual-ring"
  | "orbit";

interface LoadingBaseProps {
  size?: number | string;
  className?: string;
  variant?: LoadingVariant;
}

export function LoadingBase({
  size = "2.5rem",
  className,
  variant = "spinner",
}: LoadingBaseProps) {
  if (variant === "pulse") {
    return (
      <span
        className={cn(
          "inline-block rounded-full bg-primary animate-pulse",
          className
        )}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        role="status"
        aria-label="Carregando"
      />
    );
  }
  if (variant === "dots") {
    const dotSize =
      typeof size === "string" ? `calc(${size} / 2)` : `${Number(size) / 2}px`;
    return (
      <span
        className={cn("flex items-center gap-1", className)}
        role="status"
        aria-label="Carregando"
      >
        <span
          className="rounded-full bg-primary animate-bounce"
          style={{ width: dotSize, height: dotSize, animationDelay: "0ms" }}
        />
        <span
          className="rounded-full bg-primary animate-bounce"
          style={{ width: dotSize, height: dotSize, animationDelay: "150ms" }}
        />
        <span
          className="rounded-full bg-primary animate-bounce"
          style={{ width: dotSize, height: dotSize, animationDelay: "300ms" }}
        />
      </span>
    );
  }
  if (variant === "grid") {
    return (
      <span
        className={cn("grid grid-cols-3 gap-1", className)}
        style={{
          width: typeof size === "string" ? size : `${size}px`,
          height: typeof size === "string" ? size : `${size}px`,
        }}
        role="status"
        aria-label="Carregando"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="w-full h-full bg-primary animate-[blink_0.6s_alternate_infinite_linear] rounded"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
        <style>{`
          @keyframes blink {
            0% { opacity: 0.3; transform: scale(0.5) rotate(5deg); }
            50% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </span>
    );
  }
  if (variant === "dual-ring") {
    return (
      <span
        className={cn("grid", className)}
        style={{ width: size, height: size, position: "relative" }}
        role="status"
        aria-label="Carregando"
      >
        <span
          className="absolute inset-0 rounded-full border-solid border-primary border-b-transparent border-l-transparent mix-blend-darken dark:mix-blend-lighten"
          style={{
            width: "100%",
            height: "100%",
            borderWidth:
              typeof size === "string"
                ? `calc(${size} / 5)`
                : `${Number(size) / 5}px`,
            animation: "dualring 1s linear infinite",
          }}
        />
        <span
          className="absolute inset-0 rounded-full border-solid border-muted border-t-transparent border-r-transparent mix-blend-darken dark:mix-blend-lighten"
          style={{
            width: "100%",
            height: "100%",
            borderWidth:
              typeof size === "string"
                ? `calc(${size} / 5)`
                : `${Number(size) / 5}px`,
            animation: "dualringReverse 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes dualring {
            100% { transform: rotate(1turn); }
          }
          @keyframes dualringReverse {
            100% { transform: rotate(-1turn); }
          }
        `}</style>
      </span>
    );
  }
  if (variant === "orbit") {
    return (
      <span
        className={cn("grid aspect-[4/1] relative h-[calc(100%/3)]", className)}
        style={{
          height: typeof size === "string" ? size : `${Number(size) / 3}px`,
        }}
        role="status"
        aria-label="Carregando"
      >
        <span
          className="absolute inset-0 m-auto rounded-full bg-primary"
          style={{
            height: "100%",
            aspectRatio: "1/1",
            gridArea: "1/1",
            transformOrigin: "-100% 50%",
            animation: "orbit 1s infinite linear",
          }}
        />
        <span
          className="absolute inset-0 m-auto rounded-full bg-primary"
          style={{
            height: "100%",
            aspectRatio: "1/1",
            gridArea: "1/1",
            transformOrigin: "200% 50%",
            animation: "orbit 1s infinite linear",
            animationDelay: "-0.5s",
          }}
        />
        <style>{`
          @keyframes orbit {
            58%, 100% {
              transform: rotate(1turn);
            }
          }
        `}</style>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-4 border-solid border-muted border-t-primary",
        className
      )}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      role="status"
      aria-label="Carregando"
    />
  );
}
