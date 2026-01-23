import { CheckIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/navigation/DropDownMenuBase";
import { useTheme, type Theme } from "@/components/theme/theme-provider";

type ModeToggleBaseProps = {
  themes?: Theme[];
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

export function ModeToggleBase({
  themes = ["light", "dark", "system"],
}: ModeToggleBaseProps) {
  const { setTheme, theme: currentTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isDark =
    currentTheme?.includes("dark") ||
    (currentTheme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

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
          variant="ghost"
          size="icon"
          className="relative overflow-hidden border-transparent"
        >
          <>
            <SunIcon
              className={`h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
                isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
              }`}
            />
            <MoonIcon
              className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ${
                isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
              }`}
            />
          </>
          <span className="sr-only">Toggle theme</span>
        </ButtonBase>
      </DropDownMenuTriggerBase>
      <DropDownMenuContentBase
        align="end"
        className="border-border bg-popover text-popover-foreground"
      >
        {themes.map((theme) => (
          <DropDownMenuItemBase
            key={theme}
            onClick={() => toggleTheme(theme)}
            className="flex items-center justify-between hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            {themeLabels[theme]}
            {currentTheme === theme && (
              <CheckIcon className="h-4 w-4 opacity-100" />
            )}
          </DropDownMenuItemBase>
        ))}
      </DropDownMenuContentBase>
    </DropDownMenuBase>
  );
}
