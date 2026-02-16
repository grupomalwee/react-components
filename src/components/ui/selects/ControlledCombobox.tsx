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
import { ClearButton } from "@/components/ui/shared/ClearButton";
import ErrorMessage, {
  ErrorMessageProps,
} from "@/components/ui/shared/ErrorMessage";

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
  hideClear?: boolean;
}

export interface ControlledComboboxProps<
  T extends string,
> extends ErrorMessageProps {
  items: ComboboxItem<T>[];
  renderSelected: ReactNode;
  handleSelection: (value: T) => void;
  checkIsSelected: (value: T) => boolean;
  disabled?: boolean;
  keepOpen?: boolean;
  closeAll?: ReactNode;
  searchPlaceholder?: string;
  empty?: ReactNode;
  hideClear?: boolean;
  onClear?: () => void;
  testIds?: ComboboxTestIds;
  isMulti?: boolean;
  hasSelected?: boolean;
  onSearchChange?: (value: string) => void;
  onEndReached?: () => void;
  loading?: boolean;
}

export function ControlledCombobox<T extends string>({
  items,
  renderSelected,
  handleSelection,
  checkIsSelected,
  disabled = false,
  keepOpen = false,
  searchPlaceholder,
  empty = "Nenhum dado encontrado",
  error,
  testIds = {},
  onClear,
  hasSelected = false,
  hideClear = false,
  onSearchChange,
  onEndReached,
  loading = false,
}: ControlledComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="col-span-1 w-full"
      data-testid={testIds.root ?? "combobox-base-root"}
    >
      <PopoverBase
        open={open}
        onOpenChange={(v) => !disabled && setOpen(v)}
        modal={false}
      >
        <PopoverTriggerBase
          asChild
          className="flex w-full justify-between dark:bg-[hsl(231,15%,19%)] p-3"
        >
          <ButtonBase
            variant="select"
            size="select"
            role="combobox"
            aria-expanded={open}
            aria-disabled={disabled || undefined}
            disabled={disabled}
            className={cn(
              `flex items-center gap-2 justify-between [&>div]:line-clamp-1 relative h-9 no-active-animation`,
              error && "border-red-500",
            )}
            data-testid={testIds.trigger ?? "combobox-trigger"}
          >
            {renderSelected}

            <motion.span className="flex items-center">
              <div className="flex flex-row gap-0 items-center ">
                {hasSelected && onClear && !disabled && !hideClear && (
                  <ClearButton
                    onClick={(e?: React.MouseEvent) => {
                      if (e) e.stopPropagation();
                      if (onClear && !disabled) {
                        onClear();
                        if (!keepOpen) setOpen(false);
                      }
                    }}
                  />
                )}
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CaretDownIcon className="h-4 w-4" />
                </motion.div>
              </div>
            </motion.span>
          </ButtonBase>
        </PopoverTriggerBase>

        <PopoverContentBase
          className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0 border-none"
          data-testid={testIds.popover ?? "combobox-popover"}
        >
          <CommandBase
            className="dark:text-white hover:bg-rsecondary"
            data-testid={testIds.command ?? "combobox-command"}
            filter={
              onSearchChange
                ? () => 1
                : (value, search) => {
                    const label =
                      items.find((item) => item.value === value)?.label ||
                      value;
                    if (label.toLowerCase().includes(search.toLowerCase()))
                      return 1;
                    return 0;
                  }
            }
          >
            <CommandInputBase
              tabIndex={-1}
              disabled={disabled}
              placeholder={searchPlaceholder ?? "Busque uma opção..."}
              data-testid={testIds.search ?? "combobox-search"}
              onValueChange={onSearchChange}
            />
            <CommandListBase
              data-testid={testIds.list ?? "combobox-list"}
              onEndReached={onEndReached}
            >
              <CommandEmptyBase data-testid={testIds.empty ?? "combobox-empty"}>
                {loading ? "Carregando..." : empty}
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
                        if (disabled) return;
                        handleSelection(value as T);
                        if (!keepOpen) setOpen(false);
                      }}
                      disabled={disabled}
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
                            isSelected ? "opacity-100" : "opacity-0",
                          )}
                          data-testid={
                            isSelected
                              ? (testIds.check ?? "combobox-option-check")
                              : undefined
                          }
                        />
                      </motion.div>
                    </CommandItemBase>
                  );
                })}
              </CommandGroupBase>
              {loading && items.length > 0 && (
                <div className="flex items-center justify-center p-2">
                  <span className="text-sm text-muted-foreground">
                    Carregando mais...
                  </span>
                </div>
              )}
            </CommandListBase>
          </CommandBase>
        </PopoverContentBase>
      </PopoverBase>
      <ErrorMessage error={error} />
    </div>
  );
}
