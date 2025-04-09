import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo, useEffect } from "react";
import { ButtonBase } from "./ButtonBase";
import { DialogBase, DialogContentBase, DialogDescriptionBase, DialogFooterBase, DialogHeaderBase, DialogTitleBase, DialogTriggerBase, } from "./DialogBase";
import { useSearchParams } from "react-router-dom";
import { buildFilterSummary } from "../filter/utils/build-summary";
import { InputBase } from "./InputBase";
import { Combobox } from "@/components/selects/Combobox";
import { MultiCombobox } from "@/components/selects/MultiCombobox";
import { TooltipBase, TooltipContentBase, TooltipTriggerBase, } from "./TooltipBase";
import { FunnelSimple, Plus, Trash } from "phosphor-react";
import colors from "tailwindcss/colors";
export default function FilterDialog({ availableFilters, }) {
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const applyedFilters = useMemo(() => {
        const queryParam = searchParams.get("params");
        if (!queryParam || queryParam === "") {
            return [];
        }
        else {
            return JSON.parse(queryParam);
        }
    }, [searchParams]);
    const [filters, setFilters] = useState(applyedFilters);
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
        }
        else {
            setSearchParams((prev) => {
                if (filters.length === 0) {
                    prev.delete("params");
                    return prev;
                }
                else {
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
    return (_jsxs(DialogBase, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTriggerBase, { asChild: true, children: _jsx(ButtonBase, { variant: "ghost", size: "sm", className: "flex gap-2", children: _jsx(FilterTrigger, { applyedFiltersLength: applyedFilters.length, handleClean: handleClean }) }) }), _jsxs(DialogContentBase, { className: "max-w-4xl", children: [_jsxs(DialogHeaderBase, { children: [_jsx(DialogTitleBase, { children: "Aplicar filtros" }), _jsx(DialogDescriptionBase, { children: "Utilize os filtros abaixo para filtrar." })] }), _jsxs("section", { className: "flex w-full flex-col items-center p-3", children: [_jsx("span", { className: "flex h-10 w-full items-center justify-center rounded-t-xl border border-zinc-300 bg-background text-xs", children: "CONDI\u00C7\u00D5ES (CRIAR AT\u00C9 CINCO OP\u00C7\u00D5ES)" }), _jsx("div", { className: "flex w-full flex-col gap-2 border-x border-zinc-300 p-2", children: filters.map((filter, index) => (_jsx(FilterItem, { availableFilters: availableFilters, filter: filter, onFilterChange: (filter) => {
                                        if (!filter) {
                                            const newFilters = [...filters];
                                            newFilters.splice(index, 1);
                                            setFilters(newFilters);
                                            return;
                                        }
                                        const newFilters = [...filters];
                                        newFilters[index] = filter;
                                        setFilters(newFilters);
                                    } }, index))) }), _jsx("div", { className: "border-t-none flex w-full items-center justify-center rounded-b-xl rounded-t-none border border-zinc-300", children: _jsxs(ButtonBase, { variant: "ghost", className: "flex w-full gap-2", disabled: filters.length >= 5 ||
                                        filters.some((f) => f.id === null ||
                                            f.conditionId === null ||
                                            (f.value === null && f.valueType !== "boolean")), onClick: pushFilter, children: [_jsx("span", { children: "Adicionar condi\u00E7\u00E3o" }), _jsx(Plus, { size: 20 })] }) })] }), _jsx("span", { className: "px-3 text-sm", children: filters
                            .map((f) => buildFilterSummary(f, availableFilters))
                            .join(" e ") }), _jsxs(DialogFooterBase, { children: [_jsx(ButtonBase, { variant: "outline", onClick: handleClean, children: "Limpar filtros" }), _jsx(ButtonBase, { onClick: handleApply, children: "Aplicar filtros" })] })] })] }));
}
function FilterItem({ availableFilters, filter, onFilterChange, }) {
    const valueType = useMemo(() => availableFilters
        .find((f) => f.filterId == filter.id)
        ?.conditions.find((c) => c.conditionId == filter.conditionId)
        ?.valueType ?? null, [availableFilters, filter.conditionId, filter.id]);
    const selectedCondition = useMemo(() => {
        return availableFilters
            .find((f) => f.filterId == filter.id)
            ?.conditions.find((c) => c.conditionId == filter.conditionId);
    }, [availableFilters, filter.conditionId, filter.id]);
    const valueIsInput = useMemo(() => {
        return valueType == "string" || valueType == "number";
    }, [valueType]);
    const dimensionItems = useMemo(() => {
        if (availableFilters.length == 0)
            return [];
        const map = availableFilters.map((f) => ({
            value: f.filterId.toString(),
            label: f.filterName,
        }));
        return map;
    }, [availableFilters]);
    const conditionItems = useMemo(() => {
        const availableFilterById = availableFilters.find((f) => f.filterId == filter?.id) ?? null;
        if (availableFilters.length == 0 || !availableFilterById)
            return [];
        const map = availableFilterById.conditions.map((f) => ({
            value: f.conditionId,
            label: f.conditionName,
        }));
        return map;
    }, [availableFilters, filter?.id]);
    useEffect(() => {
        if (!valueType || filter.valueType == valueType)
            return;
        onFilterChange({
            ...filter,
            valueType,
        });
    }, [filter, onFilterChange, valueType]);
    return (_jsxs("div", { className: "flex w-full gap-2 bg-background items-center", children: [_jsxs("div", { className: "grid w-full grid-cols-3 gap-2", children: [_jsx(Combobox, { items: dimensionItems, selected: filter.id ? String(filter.id) : null, onChange: (value) => {
                            onFilterChange({
                                id: value ? value : null,
                                conditionId: null,
                                valueType,
                                value: null,
                            });
                        } }), filter.id !== null && (_jsx(Combobox, { items: conditionItems, selected: filter.conditionId, onChange: (value) => {
                            onFilterChange({
                                id: filter?.id,
                                conditionId: value,
                                valueType,
                                value: filter.value ?? null,
                            });
                        } })), filter.conditionId !== null && valueIsInput && (_jsx(InputBase, { placeholder: "value", type: valueType == "number" ? "number" : "text", value: filter.value?.toString() ?? "", onChange: (e) => onFilterChange({
                            id: filter.id,
                            conditionId: filter.conditionId,
                            valueType,
                            value: e.target.value,
                        }) })), filter.conditionId !== null && valueType == "select" && (_jsx(Combobox, { items: selectedCondition?.selectValues ?? [], selected: filter.value?.toString() ?? "", onChange: (value) => onFilterChange({
                            id: filter.id,
                            conditionId: filter.conditionId,
                            valueType,
                            value: value,
                        }) })), filter.conditionId !== null && valueType == "multi-select" && (_jsx(MultiCombobox, { items: selectedCondition?.selectValues ?? [], selected: Array.isArray(filter.value) ? filter.value : [], onChange: (value) => onFilterChange({
                            id: filter.id,
                            conditionId: filter.conditionId,
                            valueType,
                            value,
                        }) }))] }), _jsx(Trash, { onClick: () => onFilterChange(null), color: "red", style: { cursor: "pointer" } })] }));
}
function FilterTrigger({ applyedFiltersLength, handleClean, }) {
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FunnelSimple, { size: 20 }), _jsx("span", { children: "Filtrar" }), _jsxs("div", { className: "group flex size-5 items-center justify-center rounded-md ", children: [_jsx("span", { className: "text-xs group-hover:hidden", children: applyedFiltersLength }), _jsxs(TooltipBase, { children: [_jsx(TooltipTriggerBase, { children: _jsx("div", { className: "rounded-md hidden gap-2 bg-background p-0.5 group-hover:flex", onClick: (e) => {
                                        e.stopPropagation();
                                        handleClean();
                                    }, children: _jsx(Trash, { color: colors.red[500], size: 14 }) }) }), _jsx(TooltipContentBase, { side: "top", children: _jsx("p", { children: "Limpar filtros" }) })] })] })] }));
}
