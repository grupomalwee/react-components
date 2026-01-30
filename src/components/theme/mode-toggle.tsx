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

type ModeToggleBaseProps = {
  themes?: Theme[];
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "link"
    | "destructive"
    | "secondary"
    | "ghost";
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

export function ModeToggleBase({
  themes = ["light", "dark", "system"],
  className,
  variant = "ghost",
}: ModeToggleBaseProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme: currentTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    mounted &&
    (currentTheme?.includes("dark") ||
      (currentTheme === "system" &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  const toggleTheme = async (newTheme: Theme) => {
    if (!buttonRef.current || !document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(async () => {
      setTheme(newTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      [
        {
          clipPath: `circle(0px at ${x}px ${y}px)`,
        },
        {
          clipPath: `circle(${Math.ceil(endRadius)}px at ${x}px ${y}px)`,
        },
      ],
      {
        duration: 400,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <DropDownMenuBase>
      <DropDownMenuTriggerBase asChild>
        <ButtonBase
          ref={buttonRef}
          variant={variant}
          size="icon"
          className={cn(
            "relative overflow-hidden group",
            className,
          )}
        >
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
          </>
          <span className="sr-only">Toggle theme</span>
        </ButtonBase>
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
                "gap-3 transition-all duration-200",
                isActive
                  ? "bg-accent/80 text-accent-foreground border-l-2 border-primary font-medium pl-1.5"
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
