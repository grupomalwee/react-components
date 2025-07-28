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

export interface ComboboxItem<T extends string> {
  label: string;
  value: T;
}

export interface ComboboxTestIds {
  root?: string;
  trigger?: string;
  popover?: string;
  command?: string;
  search?: string;
  list?: string;
  empty?: string;
  group?: string;
  option?: string;
  check?: string;
}

export interface ComboboxBaseProps<T extends string> {
  items: ComboboxItem<T>[];
  renderSelected: ReactNode;
  handleSelection: (value: T) => void;
  checkIsSelected: (value: T) => boolean;
  searchPlaceholder?: string;
  errorMessage?: string;
  testIds?: ComboboxTestIds;
}

export function ComboboxBase<T extends string>({
  items,
  renderSelected,
  handleSelection,
  checkIsSelected,
  searchPlaceholder,
  errorMessage,
  testIds = {},
}: ComboboxBaseProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="col-span-1 w-full"
      data-testid={testIds.root ?? "combobox-base-root"}
    >
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
              "flex items-start gap-2 justify-between h-full",
              errorMessage && "border-red-500"
            )}
            data-testid={testIds.trigger ?? "combobox-trigger"}
          >
            {renderSelected}
            <CaretDown size={16} className="mt-0.5" />
          </ButtonBase>
        </PopoverTriggerBase>

        <PopoverContentBase
          className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0 border-none"
          data-testid={testIds.popover ?? "combobox-popover"}
        >
          <CommandBase
            className="dark:text-white"
            data-testid={testIds.command ?? "combobox-command"}
          >
            <CommandInputBase
              tabIndex={-1}
              placeholder={searchPlaceholder ?? "Busque uma opção..."}
              data-testid={testIds.search ?? "combobox-search"}
            />
            <CommandListBase data-testid={testIds.list ?? "combobox-list"}>
              <CommandEmptyBase data-testid={testIds.empty ?? "combobox-empty"}>
                Nenhum dado encontrado
              </CommandEmptyBase>
              <CommandGroupBase data-testid={testIds.group ?? "combobox-group"}>
                {items.map((item) => {
                  const isSelected = checkIsSelected(item.value);
                  return (
                    <CommandItemBase
                      key={item.value}
                      keywords={[item.label]}
                      value={item.value}
                      onSelect={(value) => {
                        handleSelection(value as T);
                        setOpen(false);
                      }}
                      data-testid={testIds.option ?? "combobox-option"}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                        data-testid={
                          isSelected
                            ? testIds.check ?? "combobox-option-check"
                            : undefined
                        }
                      />
                    </CommandItemBase>
                  );
                })}
              </CommandGroupBase>
            </CommandListBase>
          </CommandBase>
        </PopoverContentBase>
      </PopoverBase>
    </div>
  );
}
