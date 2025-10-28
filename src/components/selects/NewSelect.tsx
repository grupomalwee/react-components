"use client";

import {
  CommandBase,
  CommandEmptyBase,
  CommandGroupBase,
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
import { useCallback, useMemo, useState } from "react";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import LabelBase from "../ui/form/LabelBase";
import { cn } from "@/lib/utils";

export interface SelectItem<T extends string> {
  label: string;
  value: T;
}

export interface SelectTestIds {
  root?: string;
  trigger?: string;
  popover?: string;
  command?: string;
  list?: string;
  empty?: string;
  group?: string;
  option?: string;
  check?: string;
  selected?: string;
}

export interface SelectProps<T extends string> extends ErrorMessageProps {
  items: SelectItem<T>[];
  selected: SelectItem<T>["value"] | null;
  onChange: (value: SelectItem<T>["value"] | null) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  labelClassname?: string;
  testIds?: SelectTestIds;
}

export function Select<T extends string>({
  items,
  selected,
  onChange,
  className,
  placeholder,
  label,
  labelClassname,
  testIds,
  error,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedItem = items.find((item) => item.value === selected);

  const renderSelected = useMemo(() => {
    return (
      <span
        data-testid={testIds?.selected ?? "select-selected"}
        className={cn("truncate", !selectedItem && "text-gray-500")}
      >
        {selectedItem?.label ?? placeholder ?? "Selecione uma opção..."}
      </span>
    );
  }, [placeholder, selectedItem, testIds?.selected]);

  const checkIsSelected = useCallback(
    (value: T) => (selected == null ? false : selected == value),
    [selected]
  );

  const handleSelection = useCallback(
    (value: T) => {
      onChange(value === selected ? null : value);
      setOpen(false);
    },
    [selected, onChange]
  );

  return (
    <div className={cn("flex flex-col gap-1 w-full min-w-[150px]", className)}>
      {label && <LabelBase className={labelClassname}>{label}</LabelBase>}

      <div
        data-testid={testIds?.root ?? "select-root"}
        className="col-span-1 w-full"
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
              data-testid={testIds?.trigger ?? "select-trigger"}
            >
              {renderSelected}
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
            data-testid={testIds?.popover ?? "select-popover"}
          >
            <CommandBase
              className="dark:text-white hover:bg-rsecondary"
              data-testid={testIds?.command ?? "select-command"}
            >
              <CommandListBase data-testid={testIds?.list ?? "select-list"}>
                <CommandEmptyBase
                  data-testid={testIds?.empty ?? "select-empty"}
                >
                  Nenhum dado encontrado
                </CommandEmptyBase>
                <CommandGroupBase
                  data-testid={testIds?.group ?? "select-group"}
                >
                  {items.map((item) => {
                    const isSelected = checkIsSelected(item.value);
                    return (
                      <CommandItemBase
                        key={item.value}
                        keywords={[item.label]}
                        value={item.value}
                        onSelect={(value) => handleSelection(value as T)}
                        data-testid={testIds?.option ?? "select-option"}
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
                                ? testIds?.check ?? "select-option-check"
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
    </div>
  );
}

export default Select;
