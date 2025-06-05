import { useCallback, useMemo } from "react";
import { ComboboxBase } from "./ComboboxBase";
import LabelBase from "../ui/LabelBase";

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
  label?: string;
}

export function Combobox({
  items,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
  label,
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
