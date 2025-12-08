import {
  CommandBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
} from "@/components/ui/navigation/CommandBase";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "@/components/ui/overlays/PopoverBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import ErrorMessage, { ErrorMessageProps } from "@/components/ui/ErrorMessage";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

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

export interface ComboboxBaseProps<T extends string> extends ErrorMessageProps {
  items: ComboboxItem<T>[];
  renderSelected: ReactNode;
  handleSelection: (value: T) => void;
  checkIsSelected: (value: T) => boolean;
  keepOpen?: boolean;
  closeAll?: ReactNode;
  searchPlaceholder?: string;
  empty?: ReactNode;
  testIds?: ComboboxTestIds;
}

export function ComboboxBase<T extends string>({
  items,
  renderSelected,
  handleSelection,
  checkIsSelected,
  keepOpen = false,
  closeAll,
  searchPlaceholder,
  empty = "Nenhum dado encontrado",
  error,
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
            variant="select"
            size="select"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex items-center gap-2 justify-between h-auto [&>div]:line-clamp-1 [&>span]:line-clamp-1",
              error && "border-red-500"
            )}
            data-testid={testIds.trigger ?? "combobox-trigger"}
          >
            {renderSelected}
            {closeAll}
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex"
            >
              <CaretDownIcon className=" flex-shrink-0" />
            </motion.div>
          </ButtonBase>
        </PopoverTriggerBase>

        <PopoverContentBase
          className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0 border-none"
          data-testid={testIds.popover ?? "combobox-popover"}
        >
          <CommandBase
            className="dark:text-white hover:bg-rsecondary"
            data-testid={testIds.command ?? "combobox-command"}
          >
            <CommandInputBase
              tabIndex={-1}
              placeholder={searchPlaceholder ?? "Busque uma opção..."}
              data-testid={testIds.search ?? "combobox-search"}
            />
            <CommandListBase data-testid={testIds.list ?? "combobox-list"}>
              <CommandEmptyBase data-testid={testIds.empty ?? "combobox-empty"}>
                {empty}
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
                        if (!keepOpen) setOpen(false);
                      }}
                      data-testid={testIds.option ?? "combobox-option"}
                    >
                      {item.label}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isSelected ? 1 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="ml-auto "
                      >
                        <CheckIcon
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
                      </motion.div>
                    </CommandItemBase>
                  );
                })}
              </CommandGroupBase>
            </CommandListBase>
          </CommandBase>
        </PopoverContentBase>
      </PopoverBase>
      <ErrorMessage error={error} />
    </div>
  );
}
