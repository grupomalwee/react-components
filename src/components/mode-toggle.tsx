import { Moon, Sun } from "phosphor-react";
import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/DropDownMenuBase";
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

export function ModeToggleBase({ themes = ["light", "dark", "system"] }: ModeToggleBaseProps) {
  const { setTheme } = useTheme();

  return (
    <DropDownMenuBase>
      <DropDownMenuTriggerBase asChild>
        <ButtonBase variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </ButtonBase>
      </DropDownMenuTriggerBase>
      <DropDownMenuContentBase align="end">
        {themes.map((theme) => (
          <DropDownMenuItemBase key={theme} onClick={() => setTheme(theme)}>
            {themeLabels[theme]}
          </DropDownMenuItemBase>
        ))}
      </DropDownMenuContentBase>
    </DropDownMenuBase>
  );
}
