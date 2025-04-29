import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  CommandBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
} from "@/components/ui/CommandBase";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "@/components/ui/PopoverBase";

import { cn } from "../..//lib/utils";
// import { CaretUpDown, Check } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";

export interface ComboboxItem {
  label: string;
  value: string;
}

export interface ComboboxBaseProps {
  items: ComboboxItem[];
  renderSelected: ReactNode;
  handleSelection: (value: string) => void;
  checkIsSelected: (value: string) => boolean;
  searchPlaceholder?: string;
}

export function ComboboxBase({
  items,
  renderSelected,
  handleSelection,
  checkIsSelected,
  searchPlaceholder,
}: ComboboxBaseProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopoverBase open={open} onOpenChange={setOpen} modal>
      <PopoverTriggerBase asChild className="flex w-full justify-between">
        <ButtonBase variant="outline" role="combobox" aria-expanded={open}>
          {renderSelected}
          <button className="text-gray-500" />
        </ButtonBase>
      </PopoverTriggerBase>
      <PopoverContentBase className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
        <CommandBase>
          <CommandInputBase
            placeholder={searchPlaceholder ?? "Busque uma opção..."}
          />
          <CommandListBase>
            <CommandEmptyBase>Nenhum responsável encontrado</CommandEmptyBase>
            <CommandGroupBase>
              {items.map((item) => (
                <CommandItemBase
                  key={item.value}
                  value={item.value}
                  onSelect={(value) => {
                    handleSelection(value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <button
                    className={cn(
                      "ml-auto",
                      checkIsSelected(item.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItemBase>
              ))}
            </CommandGroupBase>
          </CommandListBase>
        </CommandBase>
      </PopoverContentBase>
    </PopoverBase>
  );
}
