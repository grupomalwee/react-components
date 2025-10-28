import { CheckIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/navigation/DropDownMenuBase";
import { useTheme, type Theme } from "@/components/theme-provider";

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

  // Verifica se é um tema dark ou system com preferência dark
  const isDark =
    currentTheme?.includes("dark") ||
    (currentTheme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <DropDownMenuBase>
      <DropDownMenuTriggerBase asChild>
        <ButtonBase
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
            onClick={() => setTheme(theme)}
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
