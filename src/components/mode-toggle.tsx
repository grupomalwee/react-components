import { Moon, Sun } from "phosphor-react";

import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/DropDownMenuBase";
import { useTheme } from "@/components/theme-provider";

export function ModeToggleBase() {
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
        <DropDownMenuItemBase onClick={() => setTheme("light")}>
          Light
        </DropDownMenuItemBase>
        <DropDownMenuItemBase onClick={() => setTheme("dark")}>
          Dark
        </DropDownMenuItemBase>
        <DropDownMenuItemBase onClick={() => setTheme("light-purple")}>
          Light Purple
        </DropDownMenuItemBase>
        <DropDownMenuItemBase onClick={() => setTheme("light-blue")}>
          Light Blue
        </DropDownMenuItemBase>
        <DropDownMenuItemBase onClick={() => setTheme("light-green")}>
          Light Green
        </DropDownMenuItemBase>
        <DropDownMenuItemBase onClick={() => setTheme("dark-purple")}>
          Dark Purple
        </DropDownMenuItemBase>
        <DropDownMenuItemBase onClick={() => setTheme("dark-blue")}>
          Dark Blue
        </DropDownMenuItemBase>
        <DropDownMenuItemBase onClick={() => setTheme("dark-green")}>
          Dark Green
        </DropDownMenuItemBase>
        <DropDownMenuItemBase onClick={() => setTheme("system")}>
          System
        </DropDownMenuItemBase>
      </DropDownMenuContentBase>
    </DropDownMenuBase>
  );
}
