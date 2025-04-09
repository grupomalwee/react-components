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
export declare function Combobox({ items, selected, onChange, placeholder, searchPlaceholder, }: ComboboxProps): import("react/jsx-runtime").JSX.Element;
