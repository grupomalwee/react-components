import { useCallback, useMemo } from "react";
import { ComboboxProps } from "./Combobox";
import { ErrorMessageProps } from "@/components/ui/shared/ErrorMessage";
import { ComboboxBase } from "./ComboboxBase";
import LabelBase from "../form/LabelBase";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ClearButton } from "../shared/ClearButton";
export interface MultiComboboxTestIds {
  root?: string;
  label?: string;
  selectedWrapper?: string;
  emptyPlaceholder?: string;
  selectedItem?: (value: string) => string;
  clearAll?: string;
}

export interface MultiComboboxProps<T extends string>
  extends Omit<ComboboxProps<T>, "selected" | "onChange">,
    ErrorMessageProps {
  selected: T[];
  onChange: (value: T[]) => void;
  label?: string;
  labelClassname?: string;
  testIds?: MultiComboboxTestIds;
  keepOpen?: boolean;
  showClearAll?: boolean;
  disabled?: boolean;
}
export function MultiCombobox<T extends string>({
  items,
  selected,
  onChange,
  className,
  placeholder,
  searchPlaceholder,
  label,
  labelClassname,
  testIds = {},
  error,
  disabled = false,
  keepOpen = true,
  showClearAll = false,
  empty,
}: MultiComboboxProps<T>) {
  const selectedItems = items.filter((item) => selected.includes(item.value));
  const checkIsSelected = useCallback(
    (value: T) => selected.includes(value),
    [selected]
  );
  const handleSelection = useCallback(
    (value: T) => {
      const isSelected = selected.includes(value);
      if (isSelected) {
        onChange(selected.filter((item) => item !== value));
      } else {
        onChange([...selected, value]);
      }
    },
    [selected, onChange]
  );
  const closeAll =
    showClearAll && selectedItems.length > 0 ? (
      <div className="flex items-center pointer-events-auto z-10">
        <ClearButton
          onClick={() => {
            if (disabled) return;
            onChange([]);
          }}
        />
      </div>
    ) : null;
  const renderSelected = useMemo(() => {
    if (selectedItems.length === 0) {
      return (
        <span
          data-testid={testIds.emptyPlaceholder ?? "combobox-selected-empty"}
          className="text-gray-500 truncate"
        >
          {placeholder ?? "Selecione uma opção..."}
        </span>
      );
    }
    return (
      <div
        data-testid={testIds.selectedWrapper ?? "combobox-selected-wrapper"}
        className="flex w-full flex-wrap gap-2 overflow-hidden "
      >
        <AnimatePresence mode="popLayout">
          {selectedItems.map((item) => (
            <motion.div
              key={item.value}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
              className="flex items-center justify-between my-1 rounded-md border max-w-full h-6"
              data-testid={
                testIds.selectedItem?.(item.value) ??
                `combobox-selected-${item.value}`
              }
            >
              <span className="text-xs truncate px-2">{item.label}</span>
              <ClearButton
                onClick={(e) => {
                  if (disabled) return;
                  e?.stopPropagation();
                  handleSelection(item.value);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }, [handleSelection, placeholder, selectedItems, testIds, disabled]);
  return (
    <div
      className={cn("flex flex-col w-full min-w-[150px]", className)}
      data-testid={testIds.root ?? "multi-combobox-root"}
    >
      {label && (
        <LabelBase
          className={labelClassname}
          data-testid={testIds.label ?? "multi-combobox-label"}
        >
          {label}
        </LabelBase>
      )}
      <ComboboxBase
        items={items}
        renderSelected={renderSelected}
        handleSelection={handleSelection}
        checkIsSelected={checkIsSelected}
        keepOpen={keepOpen}
        closeAll={closeAll}
        searchPlaceholder={searchPlaceholder}
        error={error}
        empty={empty}
        disabled={disabled}
      />
    </div>
  );
}
