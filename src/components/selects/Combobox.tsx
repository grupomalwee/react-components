import { useCallback, useMemo } from "react";
import { ComboboxBase } from "./ComboboxBase";

export interface ComboboxItem {
  label: string;
  value: string;
}

export interface ComboboxProps {
  items: ComboboxItem[];
  selected: ComboboxItem["value"] | null;
  onChange: (value: ComboboxItem["value"] | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}

export function Combobox({
  items,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
}: ComboboxProps) {
  const selectedItem = items.find((item) => item.value === selected);

  const renderSelected = useMemo(
    () => selectedItem?.label ?? placeholder ?? "Selecione uma opção...",
    [placeholder, selectedItem]
  );

  const checkIsSelected = useCallback(
    (value: string) => (selected == null ? false : selected == value),
    [selected]
  );

  const handleSelection = useCallback(
    (value: string) => {
      onChange(value === selected ? null : value);
    },
    [selected, onChange]
  );

  return (
    <div className="dark:bg-[hsl(231,15%,19%)]">
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
