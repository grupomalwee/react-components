import { ComboboxItem, ComboboxProps } from "./Combobox";
interface MultiComboboxProps extends Omit<ComboboxProps, "selected" | "onChange"> {
    selected: ComboboxItem["value"][];
    onChange: (value: ComboboxItem["value"][]) => void;
}
export declare function MultiCombobox({ items, selected, onChange, placeholder, searchPlaceholder, }: MultiComboboxProps): import("react/jsx-runtime").JSX.Element;
export {};
