import { cleanString, includes } from "@/utils/stringHelpers";
import { FilterConditions, FilterTypes, FilterValues } from "./types";

interface ApplyFilterProps {
  condition: FilterConditions;
  filterValue: FilterValues | null;
  valueType: FilterTypes | null;
  value: FilterValues;
}

export function applyfilter({
  condition,
  filterValue,
  valueType,
  value,
}: ApplyFilterProps) {
  if (!valueType || value === undefined) return true;

  if (valueType === "string") {
    if (!filterValue) return true;

    switch (condition) {
      case "$eq":
        return value === filterValue;
      case "$startsWith":
        return cleanString(value).startsWith(cleanString(filterValue));
      case "$endsWith":
        return cleanString(value).endsWith(cleanString(filterValue));
      case "$contains":
        return includes(value, String(filterValue));
      default:
        return false;
    }
  }

  if (valueType === "boolean") {
    switch (condition) {
      case "$exists":
        return Boolean(value) === true;
      case "$notExists":
        return Boolean(value) === false;
      default:
        return false;
    }
  }

  if (valueType === "select") {
    if (!filterValue) return true;

    switch (condition) {
      case "$eq":
        return cleanString(value) === cleanString(filterValue);
      case "$ne":
        return cleanString(value) !== cleanString(filterValue);
      default:
        return false;
    }
  }

  if (valueType === "multi-select") {
    if (!filterValue || !Array.isArray(filterValue)) return true;

    const filterValues = filterValue.map((value) => cleanString(value));
    switch (condition) {
      case "$eq":
        return filterValues.includes(cleanString(value));
      case "$ne":
        return !filterValues.includes(cleanString(value));
      default:
        return false;
    }
  }
}
