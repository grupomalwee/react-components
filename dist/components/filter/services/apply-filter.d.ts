import { FilterConditions, FilterTypes, FilterValues } from "./types";
interface ApplyFilterProps {
    condition: FilterConditions;
    filterValue: FilterValues | null;
    valueType: FilterTypes | null;
    value: FilterValues;
}
export declare function applyfilter({ condition, filterValue, valueType, value, }: ApplyFilterProps): boolean | undefined;
export {};
