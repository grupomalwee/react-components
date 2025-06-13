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
import { ButtonBase } from "@/components/ui/ButtonBase";
import { cn } from "@/lib/utils";
import { CaretDown, Check } from "phosphor-react";
import { ReactNode, useState } from "react";
import LabelBase from "../ui/LabelBase";

export interface ComboboxItem<T extends string> {
  label: string;
  value: T;
}

export interface ComboboxBaseProps<T extends string> {
  items: ComboboxItem<T>[];
  renderSelected: ReactNode;
  handleSelection: (value: T) => void;
  checkIsSelected: (value: T) => boolean;
  searchPlaceholder?: string;
  errorMessage?: string;
  labelClassname?: string;
  label?: string;
}

export function ComboboxBase<T extends string>({
  items,
  renderSelected,
  handleSelection,
  checkIsSelected,
  searchPlaceholder,
  errorMessage,
  labelClassname,
  label,
}: ComboboxBaseProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="col-span-1 w-full">
      {label && (
        <LabelBase
          className={cn(
            "mb-1 block text-sm font-medium text-foreground",
            labelClassname
          )}
        >
          {label}
        </LabelBase>
      )}

      <PopoverBase open={open} onOpenChange={setOpen} modal>
        <PopoverTriggerBase
          asChild
          className="flex w-full justify-between dark:bg-[hsl(231,15%,19%)]"
        >
          <ButtonBase
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex-wrap items-start gap-2 justify-between h-full",
              errorMessage && "border-red-500"
            )}
          >
            <div className="flex flex-wrap gap-2 flex-1">{renderSelected}</div>
            <CaretDown size={16} className="mt-1" />
          </ButtonBase>
        </PopoverTriggerBase>

        <PopoverContentBase className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0 border-none">
          <CommandBase className="dark:text-white">
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
