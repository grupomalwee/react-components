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

export function ModeToggleBase({
  themes = ["light", "dark", "system"],
}: ModeToggleBaseProps) {
  const { setTheme } = useTheme();

  return (
    <DropDownMenuBase>
      <DropDownMenuTriggerBase asChild>
        <ButtonBase
          variant="ghost"
          size="icon"
          className="relative overflow-hidden border-transparent"
        >
          <>
            <Sun className="h-[1.2rem] w-[1.2rem]  transition-transform duration-300 rotate-0 scale-100" />
            <Moon className="absolute top-0 left-0 h-[1.2rem] w-[1.2rem]  transition-transform duration-300 rotate-90 scale-0" />
          </>

          <span className="sr-only">Toggle theme</span>
        </ButtonBase>
      </DropDownMenuTriggerBase>
      <DropDownMenuContentBase align="end" className="dark:border-transparent">
        {themes.map((theme) => (
          <DropDownMenuItemBase key={theme} onClick={() => setTheme(theme)}>
            {themeLabels[theme]}
          </DropDownMenuItemBase>
        ))}
      </DropDownMenuContentBase>
    </DropDownMenuBase>
  );
}
