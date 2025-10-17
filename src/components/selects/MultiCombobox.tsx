import { useCallback, useMemo } from "react";
import { ComboboxProps } from "./Combobox";
import { ComboboxBase } from "./ComboboxBase";
import { XIcon } from "@phosphor-icons/react";
import LabelBase from "../ui/LabelBase";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonBase } from "@/components/ui/ButtonBase";

interface MultiComboboxTestIds {
  root?: string;
  label?: string;
  selectedWrapper?: string;
  emptyPlaceholder?: string;
  selectedItem?: (value: string) => string;
  clearAll?: string;
}

interface MultiComboboxProps<T extends string>
  extends Omit<ComboboxProps<T>, "selected" | "onChange"> {
  selected: T[];
  onChange: (value: T[]) => void;
  label?: string;
  labelClassname?: string;
  testIds?: MultiComboboxTestIds;
  keepOpen?: boolean;
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
  keepOpen = true,
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
    selectedItems.length > 0 ? (
      <div className=" flex items-center">
        <ButtonBase
          variant="ghost"
          data-testid={testIds.clearAll ?? "combobox-clear-all"}
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onChange([]);
          }}
          className="text-xs  hover:bg-red-50 hover:text-red-500 transition-colors rounded-md mr-2"
        >
          <XIcon />
        </ButtonBase>
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
        className="flex w-full flex-wrap gap-2 overflow-hidden pr-1.5"
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
              className="flex items-center justify-between gap-2 my-1 rounded-md border p-1 max-w-full"
              data-testid={
                testIds.selectedItem?.(item.value) ??
                `combobox-selected-${item.value}`
              }
            >
              <span className="text-xs truncate">{item.label}</span>
              <motion.span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelection(item.value);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer p-0.5 text-xs flex items-center justify-center hover:text-red-500 transition-colors flex-shrink-0 rounded hover:bg-red-50 "
              >
                <XIcon size={14} />
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }, [handleSelection, placeholder, selectedItems, testIds]);

  return (
    <div
      className={cn("flex flex-col gap-1 w-full min-w-[150px]", className)}
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
      />
    </div>
  );
}
