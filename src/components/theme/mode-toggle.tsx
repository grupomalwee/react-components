import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/navigation/DropDownMenuBase";

import { useTheme, type Theme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "../ui/feedback/TooltipBase";

type AnimationOrigin = "center" | "top-left" | "top-right" | "cursor";

type ModeToggleBaseProps = {
  themes?: Theme[];
  className?: string;
  directToggle?: boolean;
  variant?:
    | "default"
    | "outline"
    | "link"
    | "destructive"
    | "secondary"
    | "ghost";

  showLabel?: boolean;
  tooltip?: boolean | string;
  animationOrigin?: AnimationOrigin;
  transitionDuration?: number;
  storageKey?: string;
  defaultTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
};

const themeLabels: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
  "light-purple": "Light Purple",
  "dark-purple": "Dark Purple",
  "light-blue": "Light Blue",
  "dark-blue": "Dark Blue",
  "light-green": "Light Green",
  "dark-green": "Dark Green",
};

const ThemeIcon = ({ theme }: { theme: Theme }) => {
  switch (theme) {
    case "light":
      return <SunIcon className="size-4" />;
    case "dark":
      return <MoonIcon className="size-4" />;
    case "system":
      return <DesktopIcon className="size-4" />;
  }

  const [mode, color] = theme.split("-") as [string, string];
  const colorMap: Record<string, string> = {
    purple: "#a855f7",
    blue: "#3b82f6",
    green: "#22c55e",
  };

  const leftColor = mode === "light" ? "#f8fafc" : "#0f172a";
  const rightColor = colorMap[color] || "#cbd5e1";

  return (
    <div className="flex items-center justify-center size-4">
      <div
        className={cn("size-3 rounded-full border border-black")}
        style={{
          background: `linear-gradient(120deg, ${leftColor} 50%, ${rightColor} 50%)`,
        }}
      />
    </div>
  );
};

function resolveOrigin(
  origin: AnimationOrigin,
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  cursorPos: { x: number; y: number } | null,
): { x: number; y: number } {
  if (origin === "cursor" && cursorPos) {
    return cursorPos;
  }

  if (!buttonRef.current) {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  const rect = buttonRef.current.getBoundingClientRect();

  switch (origin) {
    case "top-left":
      return { x: rect.left, y: rect.top };
    case "top-right":
      return { x: rect.right, y: rect.top };
    case "center":
    default:
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
}

export function ModeToggleBase({
  themes = ["light", "dark", "system"],
  className,
  directToggle = false,
  variant = "ghost",
  showLabel = false,
  tooltip = false,
  animationOrigin = "center",
  transitionDuration = 400,
  storageKey,
  defaultTheme,
  onThemeChange,
}: ModeToggleBaseProps) {
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cursorPos = useRef<{ x: number; y: number } | null>(null);
  const { setTheme, theme: currentTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Aplica storageKey e defaultTheme uma vez no mount
  useEffect(() => {
    if (storageKey && defaultTheme) {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (!stored) setTheme(defaultTheme);
    } else if (defaultTheme && !localStorage.getItem("theme")) {
      setTheme(defaultTheme);
    }
    setMounted(true);
  }, []);

  const isDark =
    mounted &&
    (currentTheme?.includes("dark") ||
      (currentTheme === "system" &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  const activeTheme = (mounted ? currentTheme : defaultTheme) as Theme;

  const tooltipText =
    tooltip === true
      ? (themeLabels[activeTheme] ?? "Toggle theme")
      : typeof tooltip === "string"
        ? tooltip
        : null;

  const toggleTheme = async (newTheme: Theme) => {
    if (isTransitioning) return;

    if (!buttonRef.current) {
      setTheme(newTheme);
      onThemeChange?.(newTheme);
      return;
    }

    const supportsViewTransition =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      typeof document.startViewTransition === "function";

    if (!supportsViewTransition) {
      setTheme(newTheme);
      onThemeChange?.(newTheme);
      return;
    }

    try {
      setIsTransitioning(true);

      const { x, y } = resolveOrigin(
        animationOrigin,
        buttonRef,
        cursorPos.current,
      );
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = document.startViewTransition(async () => {
        setTheme(newTheme);
        onThemeChange?.(newTheme);
      });

      await transition.ready;

      const animation = document.documentElement.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${Math.ceil(endRadius)}px at ${x}px ${y}px)` },
        ],
        {
          duration: transitionDuration,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );

      animation.onfinish = () => setIsTransitioning(false);
      animation.oncancel = () => setIsTransitioning(false);
    } catch {
      setTheme(newTheme);
      onThemeChange?.(newTheme);
      setIsTransitioning(false);
    }
  };

  const handleDirectToggle = () => {
    const currentIndex = themes.indexOf(currentTheme as Theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    toggleTheme(themes[nextIndex]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorPos.current = { x: e.clientX, y: e.clientY };
  };

  const buttonContent = (
    <>
      <SunIcon
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-500 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100 group-hover:rotate-12"
        }`}
      />
      <MoonIcon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ${
          isDark
            ? "rotate-0 scale-100 opacity-100 group-hover:-rotate-12"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
      {showLabel && mounted && (
        <span className="ml-5 text-sm font-medium">
          {themeLabels[activeTheme]}
        </span>
      )}
      <span className="sr-only">Toggle theme</span>
    </>
  );

  const wrapWithTooltip = (node: React.ReactNode) => {
    if (!tooltipText) return node;
    return (
      <TooltipProviderBase>
        <TooltipBase>
          <TooltipTriggerBase asChild>{node}</TooltipTriggerBase>
          <TooltipContentBase>{tooltipText}</TooltipContentBase>
        </TooltipBase>
      </TooltipProviderBase>
    );
  };

  if (directToggle) {
    return wrapWithTooltip(
      <ButtonBase
        ref={buttonRef}
        variant={variant}
        size={showLabel ? "default" : "icon"}
        className={cn("relative overflow-hidden group", className)}
        onClick={handleDirectToggle}
        onMouseMove={handleMouseMove}
        onKeyDown={(e) => {
          if (e.repeat && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
          }
        }}
      >
        {buttonContent}
      </ButtonBase>,
    );
  }

  return (
    <DropDownMenuBase>
      <DropDownMenuTriggerBase asChild>
        {wrapWithTooltip(
          <ButtonBase
            ref={buttonRef}
            variant={variant}
            size={showLabel ? "default" : "icon"}
            className={cn("relative overflow-hidden group", className)}
            onMouseMove={handleMouseMove}
          >
            {buttonContent}
          </ButtonBase>,
        )}
      </DropDownMenuTriggerBase>
      <DropDownMenuContentBase
        align="end"
        className="border-border bg-popover text-popover-foreground min-w-[140px]"
      >
        {themes.map((theme) => {
          const isActive = currentTheme === theme;
          return (
            <DropDownMenuItemBase
              key={theme}
              onClick={() => toggleTheme(theme)}
              className={cn(
                "gap-2 transition-all duration-200",
                isActive
                  ? "bg-accent/80 text-accent-foreground border-l-2 border-primary font-medium pl-1.5 my-0.5"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <ThemeIcon theme={theme} />
              {themeLabels[theme]}
            </DropDownMenuItemBase>
          );
        })}
      </DropDownMenuContentBase>
    </DropDownMenuBase>
  );
}
