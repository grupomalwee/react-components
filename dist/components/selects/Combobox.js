import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from "react";
import { ComboboxBase } from "./ComboboxBase";
export function Combobox({ items, selected, onChange, placeholder, searchPlaceholder, }) {
    const selectedItem = items.find((item) => item.value === selected);
    const renderSelected = useMemo(() => selectedItem?.label ?? placeholder ?? "Selecione uma opção...", [placeholder, selectedItem]);
    const checkIsSelected = useCallback((value) => (selected == null ? false : selected == value), [selected]);
    const handleSelection = useCallback((value) => {
        onChange(value === selected ? null : value);
    }, [selected, onChange]);
    return (_jsx(ComboboxBase, { items: items, renderSelected: renderSelected, handleSelection: handleSelection, checkIsSelected: checkIsSelected, searchPlaceholder: searchPlaceholder }));
}
