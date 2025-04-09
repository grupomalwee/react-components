import { ReactNode } from "react";
export interface ComboboxItem {
    label: string;
    value: string;
}
export interface ComboboxBaseProps {
    items: ComboboxItem[];
    renderSelected: ReactNode;
    handleSelection: (value: string) => void;
    checkIsSelected: (value: string) => boolean;
    searchPlaceholder?: string;
}
export declare function ComboboxBase({ items, renderSelected, handleSelection, checkIsSelected, searchPlaceholder, }: ComboboxBaseProps): import("react/jsx-runtime").JSX.Element;
