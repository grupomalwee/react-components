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
}from "@/components/ui/PopoverBase"
import { ButtonBase } from "@/components/ui/ButtonBase";
import { cn } from "@/lib/utils";
import { CaretUp, Check } from "phosphor-react";

import { ReactNode, useState } from "react";

export interface ComboboxItem {
  label: string;
  value: string;
}

export interface ComboboxBaseProps<T extends string> {
  items: ComboboxItem[];
  renderSelected: ReactNode;
  handleSelection: (value: T) => void;
  checkIsSelected: (value: T) => boolean;
  searchPlaceholder?: string;
  errorMessage?: string;
}

export function ComboboxBase<T extends string>({
  items,
  renderSelected,
  handleSelection,
  checkIsSelected,
  searchPlaceholder,
  errorMessage,
}: ComboboxBaseProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="col-span-1 w-full">
      <PopoverBase open={open} onOpenChange={setOpen} modal>
        <PopoverTriggerBase asChild className="flex w-full justify-between">
          <ButtonBase
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="gap-2 bg-white text-xs sm:text-sm"
          >
            {renderSelected}
            <span>
              <CaretUp className="text-gray-500" size={16} />
            </span>
            {errorMessage && (
              <span className="text-red-500">{errorMessage}</span>
            )}
          </ButtonBase>
        </PopoverTriggerBase>
        <PopoverContentBase className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
          <CommandBase>
            <CommandInputBase
              tabIndex={-1}
              placeholder={searchPlaceholder ?? "Busque uma opção..."}
            />
            <CommandListBase>
              <CommandEmptyBase>Nenhum dado encontrado</CommandEmptyBase>
              <CommandGroupBase>
                {items.map((item) => (
                  <CommandItemBase
                    key={item.value}
                    keywords={[item.label]}
                    value={item.value}
                    onSelect={(value) => {
                      handleSelection(value as T);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        checkIsSelected(item.value as T)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItemBase>
                ))}
              </CommandGroupBase>
            </CommandListBase>
          </CommandBase>
        </PopoverContentBase>
      </PopoverBase>
    </div>
  );
}
