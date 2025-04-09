export interface SelectItem {
    label: string;
    value: string;
}
interface DefaultSelectProps {
    placeholder: string;
    onChange: (value: string) => void;
    errorMessage?: string;
}
interface SelectPropsWithItems extends DefaultSelectProps {
    items: SelectItem[];
    groupItems?: never;
}
interface SelectPropsWithGroupItems extends DefaultSelectProps {
    items?: never;
    groupItems: {
        [key: string]: SelectItem[];
    };
}
type SelectProps = SelectPropsWithItems | SelectPropsWithGroupItems;
export declare function Select({ items, groupItems, placeholder, onChange, errorMessage, }: SelectProps): import("react/jsx-runtime").JSX.Element;
export {};
