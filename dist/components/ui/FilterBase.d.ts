import { AvailableFilter } from "../filter/services/types";
type FilterDialogProps<T extends Record<string, unknown>> = {
    availableFilters: AvailableFilter<T>[];
};
export default function FilterDialog<T extends Record<string, unknown>>({ availableFilters, }: FilterDialogProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
