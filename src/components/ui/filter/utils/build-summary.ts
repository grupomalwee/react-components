import { AvailableFilter, Filter } from "../services/types";

export function buildFilterSummary<T extends Record<string, unknown>>(
  filter: Filter<T>,
  availableFilters: AvailableFilter<T>[],
) {
  if (!filter) return null;

  const foundFilter = availableFilters.find((f) => f.filterId == filter.id);
  if (!foundFilter) return null;
  const foundCondition = foundFilter.conditions.find(
    (c) => c.conditionId == filter.conditionId,
  );
  if (!foundCondition) return null;

  if (filter.conditionId === "$exists" || filter.conditionId === "$notExists") {
    return `${foundFilter.filterName} ${foundCondition.conditionName}`;
  }

  if (!filter.value) return null;
  let value = filter.value.toString();

  switch (foundCondition.valueType) {
    case "select": {
      const selected = foundCondition.selectValues?.find(
        (s) => s.value == filter.value,
      );
      if (selected) {
        value = selected.label;
      }
      break;
    }
  }

  return `${foundFilter.filterName} ${foundCondition.conditionName} '${value}'`;
}
