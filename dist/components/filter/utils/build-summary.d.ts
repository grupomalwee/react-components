import { AvailableFilter, Filter } from "../services/types";
export declare function buildFilterSummary<T extends Record<string, unknown>>(filter: Filter<T>, availableFilters: AvailableFilter<T>[]): string | null;
