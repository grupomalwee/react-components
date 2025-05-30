import { useCallback, useMemo } from "react";
import { ComboboxProps } from "./Combobox";
import { ComboboxBase } from "./ComboboxBase";
import { X } from "phosphor-react";

interface MultiComboboxProps
  extends Omit<ComboboxProps, "selected" | "onChange"> {
  selected: string[];
  onChange: (value: string[]) => void;
}

export function MultiCombobox({
  items,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
}: MultiComboboxProps) {
  const selectedItems = items.filter((item) => selected.includes(item.value));

  const checkIsSelected = useCallback(
    (value: string) => selected.includes(value),
    [selected],
  );

  const handleSelection = useCallback(
    (value: string) => {
      const isSelected = selected.includes(value);
      if (isSelected) {
        onChange(selected.filter((item) => item !== value));
      } else {
        onChange([...selected, value]);
      }
    },
    [selected, onChange],
  );

  const renderSelected = useMemo(() => {
    if (selectedItems.length == 0)
      return placeholder ?? "Selecione uma opção...";

    const items = selectedItems.map((item) => (
      <div
        key={item.value}
        className="flex items-center gap-1 rounded-md border p-1"
      >
        <span className="truncate whitespace-break-spaces text-xs">
          {item.label}
        </span>
        <span>
          <X
            size={14}
            onClick={(e) => {
              e.stopPropagation();
              handleSelection(item.value);
            }}
            className="cursor-pointer"
          />
        </span>
      </div>
    ));

    return <div className="flex flex-wrap gap-2">{items}</div>;
  }, [handleSelection, placeholder, selectedItems]);

  return (
    <ComboboxBase
      items={items}
      renderSelected={renderSelected}
      handleSelection={handleSelection}
      checkIsSelected={checkIsSelected}
      searchPlaceholder={searchPlaceholder}
    />
  );
}
