import { useCallback, useMemo } from "react";
import { ComboboxProps } from "./Combobox";
import { ComboboxBase } from "./ComboboxBase";
import { X } from "phosphor-react";
import LabelBase from "../ui/LabelBase";
import { cn } from "@/lib/utils";

interface MultiComboboxProps<T extends string>
  extends Omit<ComboboxProps<T>, "selected" | "onChange"> {
    selected: T[];
    onChange: (value: T[]) => void;
    label?: string;
  labelClassname?: string;
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

    const renderSelected = useMemo(() => {
    if (selectedItems.length === 0) {
      return (
        <span data-testid="combobox-selected" className="text-gray-500">
          {placeholder ?? "Selecione uma opção..."}
        </span>
      );
    }
  
    const items = selectedItems.map((item) => (
      <div
        key={item.value}
        className="flex items-center gap-1 rounded-md border p-1"
      >
        <span className="whitespace-break-spaces text-xs">
          {item.label}
        </span>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            handleSelection(item.value);
          }}
          className="cursor-pointer p-0 m-0 text-xs flex items-center justify-center hover:text-red-500 hover:scale-110 transition-all"
        >
          <X size={14} />
        </span>
      </div>
    ));
  
    return (
      <div data-testid="combobox-selected" className="flex w-full flex-wrap gap-2">
        {items}
      </div>
    );
  }, [handleSelection, placeholder, selectedItems]);
  return (
    <div className={cn("flex flex-col gap-1 w-full min-w-[150px]", className)}>
      {label && <LabelBase className={labelClassname}>{label}</LabelBase>}
      <ComboboxBase
        items={items}
        renderSelected={renderSelected}
        handleSelection={handleSelection}
        checkIsSelected={checkIsSelected}
        searchPlaceholder={searchPlaceholder}
      />
    </div>
  );
}
