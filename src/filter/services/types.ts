import { BaseType } from "@/services/types";

export type FilterTypes =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "select"
  | "multi-select";

export type FilterValues = BaseType;

export type Filter<T extends Record<string, unknown>> = {
  id: keyof T | null;
  conditionId: FilterConditions | null;
  valueType: FilterTypes | null;
  value: FilterValues | null;
};

export type FilterConditions =
  | "$eq"
  | "$ne"
  | "$gt"
  | "$lt"
  | "$gte"
  | "$lte"
  | "$startsWith"
  | "$endsWith"
  | "$contains"
  | "$in"
  | "$nin"
  | "$exists"
  | "$notExists";

export type AvailableFilterConditions = {
  conditionId: FilterConditions;
  conditionName: string;
  valueType: FilterTypes;
  selectValues?: SelectItem[];
};

export type AvailableFilter<T extends Record<string, unknown>> = {
  filterId: keyof T;
  filterName: string;
  conditions: AvailableFilterConditions[];
};

// No arquivo `../filter/services/types.ts`

export interface SelectItem {
  label: string;
  value: string;
}
