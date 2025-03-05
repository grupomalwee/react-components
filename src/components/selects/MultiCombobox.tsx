import { useCallback, useMemo } from "react";
import { ComboboxItem, ComboboxProps } from "./Combobox";
import { ComboboxBase } from "./ComboboxBase";

interface MultiComboboxProps
  extends Omit<ComboboxProps, "selected" | "onChange"> {
  selected: ComboboxItem["value"][];
  onChange: (value: ComboboxItem["value"][]) => void;
}

export function MultiCombobox({
  items,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
}: MultiComboboxProps) {
  // Filtra os itens selecionados com base no array 'selected'
  const selectedItems = useMemo(() => 
    items.filter((item) => selected.includes(item.value)),
    [items, selected]
  );

  // Função que verifica se o item está selecionado
  const checkIsSelected = useCallback(
    (value: string) => selected.includes(value),
    [selected]
  );

  // Lida com a seleção ou remoção de um item
  const handleSelection = useCallback(
    (value: string) => {
      const isSelected = selected.includes(value);
      if (isSelected) {
        onChange(selected.filter((item) => item !== value)); // Remove o item se ele já estiver selecionado
      } else {
        onChange([...selected, value]); // Adiciona o item se não estiver selecionado
      }
    },
    [selected, onChange]
  );

  // Renderiza os itens selecionados de maneira otimizada
  const renderSelected = useMemo(() => {
    if (selectedItems.length === 0) return placeholder ?? "Selecione uma opção...";

    return (
      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <div
            key={item.value}
            className="flex items-center gap-1 rounded-md border p-1"
          >
            <span className="text-xs">{item.label}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Impede que o click no botão afete a interação geral
                handleSelection(item.value); // Remove ou adiciona ao selecionado
              }}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    );
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
