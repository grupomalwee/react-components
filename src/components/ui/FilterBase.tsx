import { useState, useCallback, useMemo, useEffect } from "react";
import { ButtonBase } from "./ButtonBase";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
} from "./DialogBase";
import { useSearchParams } from "react-router-dom";
import {
  AvailableFilter,
  Filter,
  FilterConditions,
} from "../filter/services/types";
import { buildFilterSummary } from "../filter/utils/build-summary";
import { InputBase } from "./InputBase";
import { Combobox } from "@/components/selects/Combobox";
import { MultiCombobox } from "@/components/selects/MultiCombobox";
import {
  TooltipBase,
  TooltipContentBase,
  TooltipTriggerBase,
} from "./TooltipBase";
import { FunnelSimple, Plus, Trash } from "phosphor-react";
import colors from "tailwindcss/colors";

// FilterDialog component
type FilterDialogProps<T extends Record<string, unknown>> = {
  availableFilters: AvailableFilter<T>[];
};

export default function FilterDialog<T extends Record<string, unknown>>({
  availableFilters,
}: FilterDialogProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const applyedFilters: Filter<T>[] = useMemo(() => {
    const queryParam = searchParams.get("params");
    if (!queryParam || queryParam === "") {
      return [];
    } else {
      return JSON.parse(queryParam);
    }
  }, [searchParams]);

  const [filters, setFilters] = useState<Filter<T>[]>(applyedFilters);

  const pushFilter = useCallback(() => {
    setFilters([
      ...filters,
      {
        id: null,
        conditionId: null,
        valueType: null,
        value: null,
      },
    ]);
  }, [filters]);

  if (filters.length === 0) {
    pushFilter();
  }

  const handleApply = useCallback(() => {
    if (filters.length === 1 && filters[0].id === null) {
      setSearchParams((prev) => {
        prev.delete("params");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        if (filters.length === 0) {
          prev.delete("params");
          return prev;
        } else {
          prev.set("params", JSON.stringify(filters));
          return prev;
        }
      });
    }

    setOpen(false);
  }, [filters, setSearchParams]);

  const handleClean = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete("params");
      return prev;
    });
    setFilters([]);
    setOpen(false);
  }, [setSearchParams]);

  return (
    <DialogBase open={open} onOpenChange={setOpen}>
      <DialogTriggerBase asChild>
        <ButtonBase variant="ghost" size="sm" className="flex gap-2">
          <FilterTrigger
            applyedFiltersLength={applyedFilters.length}
            handleClean={handleClean}
          />
        </ButtonBase>
      </DialogTriggerBase>
      <DialogContentBase className="max-w-4xl">
        <DialogHeaderBase>
          <DialogTitleBase>Aplicar filtros</DialogTitleBase>
          <DialogDescriptionBase>
            Utilize os filtros abaixo para filtrar.
          </DialogDescriptionBase>
        </DialogHeaderBase>

        <section className="flex w-full flex-col items-center p-3">
          <span className="flex h-10 w-full items-center justify-center rounded-t-xl border border-zinc-300 bg-background text-xs">
            CONDIÇÕES (CRIAR ATÉ CINCO OPÇÕES)
          </span>
          <div className="flex w-full flex-col gap-2 border-x border-zinc-300 p-2">
            {filters.map((filter, index) => (
              <FilterItem
                key={index}
                availableFilters={availableFilters}
                filter={filter}
                onFilterChange={(filter) => {
                  if (!filter) {
                    const newFilters = [...filters];
                    newFilters.splice(index, 1);
                    setFilters(newFilters);
                    return;
                  }
                  const newFilters = [...filters];
                  newFilters[index] = filter;
                  setFilters(newFilters);
                }}
              />
            ))}
          </div>
          <div className="border-t-none flex w-full items-center justify-center rounded-b-xl rounded-t-none border border-zinc-300">
            <ButtonBase
              variant="ghost"
              className="flex w-full gap-2"
              disabled={
                filters.length >= 5 ||
                filters.some(
                  (f) =>
                    f.id === null ||
                    f.conditionId === null ||
                    (f.value === null && f.valueType !== "boolean")
                )
              }
              onClick={pushFilter}
            >
              <span>Adicionar condição</span>
              <Plus size={20} />
            </ButtonBase>
          </div>
        </section>
        <span className="px-3 text-sm">
          {filters
            .map((f) => buildFilterSummary(f, availableFilters))
            .join(" e ")}
        </span>
        <DialogFooterBase>
          <ButtonBase variant="outline" onClick={handleClean}>
            Limpar filtros
          </ButtonBase>
          <ButtonBase onClick={handleApply}>Aplicar filtros</ButtonBase>
        </DialogFooterBase>
      </DialogContentBase>
    </DialogBase>
  );
}

// FilterItem component
type FilterItemProps<T extends Record<string, unknown>> = {
  availableFilters: AvailableFilter<T>[];
  filter: Filter<T>;
  onFilterChange: (filter: Filter<T> | null) => void;
};

function FilterItem<T extends Record<string, unknown>>({
  availableFilters,
  filter,
  onFilterChange,
}: FilterItemProps<T>) {
  const valueType = useMemo(
    () =>
      availableFilters
        .find((f) => f.filterId == filter.id)
        ?.conditions.find((c) => c.conditionId == filter.conditionId)
        ?.valueType ?? null,
    [availableFilters, filter.conditionId, filter.id]
  );

  const selectedCondition = useMemo(() => {
    return availableFilters
      .find((f) => f.filterId == filter.id)
      ?.conditions.find((c) => c.conditionId == filter.conditionId);
  }, [availableFilters, filter.conditionId, filter.id]);

  const valueIsInput = useMemo(() => {
    return valueType == "string" || valueType == "number";
  }, [valueType]);

  const dimensionItems = useMemo(() => {
    if (availableFilters.length == 0) return [];
    const map = availableFilters.map((f) => ({
      value: f.filterId.toString(),
      label: f.filterName,
    }));
    return map;
  }, [availableFilters]);

  const conditionItems = useMemo(() => {
    const availableFilterById =
      availableFilters.find((f) => f.filterId == filter?.id) ?? null;
    if (availableFilters.length == 0 || !availableFilterById) return [];

    const map = availableFilterById.conditions.map((f) => ({
      value: f.conditionId,
      label: f.conditionName,
    }));
    return map;
  }, [availableFilters, filter?.id]);

  useEffect(() => {
    if (!valueType || filter.valueType == valueType) return;
    onFilterChange({
      ...filter,
      valueType,
    });
  }, [filter, onFilterChange, valueType]);

  return (
    <div className="flex w-full gap-2 bg-background items-center dark:bg-[hsl(231,15%,19%)]">
      <div className="grid w-full grid-cols-3 gap-2">
        <Combobox
          items={dimensionItems}
          selected={filter.id ? String(filter.id) : null}
          onChange={(value) => {
            onFilterChange({
              id: value ? (value as keyof T) : null,
              conditionId: null,
              valueType,
              value: null,
            });
          }}
        />
        {filter.id !== null && (
          <Combobox
            items={conditionItems}
            selected={filter.conditionId}
            onChange={(value) => {
              onFilterChange({
                id: filter?.id,
                conditionId: value as FilterConditions,
                valueType,
                value: filter.value ?? null,
              });
            }}
          />
        )}
        {filter.conditionId !== null && valueIsInput && (
          <InputBase
            placeholder="value"
            type={valueType == "number" ? "number" : "text"}
            value={filter.value?.toString() ?? ""}
            onChange={(e) =>
              onFilterChange({
                id: filter.id,
                conditionId: filter.conditionId,
                valueType,
                value: e.target.value,
              })
            }
          />
        )}
        {filter.conditionId !== null && valueType == "select" && (
          <Combobox
            items={selectedCondition?.selectValues ?? []}
            selected={filter.value?.toString() ?? ""}
            onChange={(value) =>
              onFilterChange({
                id: filter.id,
                conditionId: filter.conditionId,
                valueType,
                value: value as string,
              })
            }
          />
        )}
        {filter.conditionId !== null && valueType == "multi-select" && (
          <MultiCombobox
            items={selectedCondition?.selectValues ?? []}
            selected={Array.isArray(filter.value) ? filter.value : []}
            onChange={(value) =>
              onFilterChange({
                id: filter.id,
                conditionId: filter.conditionId,
                valueType,
                value,
              })
            }
          />
        )}
      </div>
      <Trash
        onClick={() => onFilterChange(null)}
        color="red"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

// FilterTrigger component
type FilterTriggerProps = {
  applyedFiltersLength: number;
  handleClean: () => void;
};

function FilterTrigger({
  applyedFiltersLength,
  handleClean,
}: FilterTriggerProps) {
  return (
    <div className="flex items-center gap-2">
      <FunnelSimple size={20} />
      <span>Filtrar</span>
      <div className="group flex size-5 items-center justify-center rounded-md ">
        <span className="text-xs group-hover:hidden">
          {applyedFiltersLength}
        </span>

        <TooltipBase>
          <TooltipTriggerBase>
            <div
              className="rounded-md hidden gap-2 bg-background p-0.5 group-hover:flex"
              onClick={(e) => {
                e.stopPropagation();
                handleClean();
              }}
            >
              <Trash color={colors.red[500]} size={14} />
            </div>
          </TooltipTriggerBase>
          <TooltipContentBase side="top">
            <p>Limpar filtros</p>
          </TooltipContentBase>
        </TooltipBase>
      </div>
    </div>
  );
}
