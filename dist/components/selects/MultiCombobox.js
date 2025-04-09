import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo } from "react";
import { ComboboxBase } from "./ComboboxBase";
export function MultiCombobox({ items, selected, onChange, placeholder, searchPlaceholder, }) {
    // Filtra os itens selecionados com base no array 'selected'
    const selectedItems = useMemo(() => items.filter((item) => selected.includes(item.value)), [items, selected]);
    // Função que verifica se o item está selecionado
    const checkIsSelected = useCallback((value) => selected.includes(value), [selected]);
    // Lida com a seleção ou remoção de um item
    const handleSelection = useCallback((value) => {
        const isSelected = selected.includes(value);
        if (isSelected) {
            onChange(selected.filter((item) => item !== value)); // Remove o item se ele já estiver selecionado
        }
        else {
            onChange([...selected, value]); // Adiciona o item se não estiver selecionado
        }
    }, [selected, onChange]);
    // Renderiza os itens selecionados de maneira otimizada
    const renderSelected = useMemo(() => {
        if (selectedItems.length === 0)
            return placeholder ?? "Selecione uma opção...";
        return (_jsx("div", { className: "flex flex-wrap gap-2", children: selectedItems.map((item) => (_jsxs("div", { className: "flex items-center gap-1 rounded-md border p-1", children: [_jsx("span", { className: "text-xs", children: item.label }), _jsx("button", { onClick: (e) => {
                            e.stopPropagation(); // Impede que o click no botão afete a interação geral
                            handleSelection(item.value); // Remove ou adiciona ao selecionado
                        }, className: "cursor-pointer" })] }, item.value))) }));
    }, [handleSelection, placeholder, selectedItems]);
    return (_jsx(ComboboxBase, { items: items, renderSelected: renderSelected, handleSelection: handleSelection, checkIsSelected: checkIsSelected, searchPlaceholder: searchPlaceholder }));
}
