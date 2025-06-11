import { useCallback, useMemo } from "react";
import { ComboboxBase, ComboboxItem } from "./ComboboxBase";
import LabelBase from "../ui/LabelBase";

export interface ComboboxProps<T extends string> {
  items: ComboboxItem<T>[];
  selected: ComboboxItem<T>["value"] | null;
  onChange: (value: ComboboxItem<T>["value"] | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
}

export function Combobox<T extends string>({
  items,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
  label,
}: ComboboxProps<T>) {
  const selectedItem = items.find((item) => item.value === selected);

  const renderSelected = useMemo(
    () => selectedItem?.label ?? placeholder ?? "Selecione uma opção...",
    [placeholder, selectedItem]
  );

  const checkIsSelected = useCallback(
    (value: T) => (selected == null ? false : selected == value),
    [selected]
  );

  const handleSelection = useCallback(
    (value: T) => {
      onChange(value === selected ? null : value);
    },
    [selected, onChange]
  );

  return (
    <div className="flex flex-col gap-1 w-full min-w-[150px]">
      {label && <LabelBase>{label}</LabelBase>}

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
