import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import FilterDialog from "@/components/ui/FilterBase";
/**
 * Página de filtros que exibe um diálogo para aplicar filtros baseados em condições específicas como "Nome", "Marca", "Cidade", "Showroom" e "Preço".
 * O componente `FilterDialog` é usado para apresentar os filtros e suas respectivas condições ao usuário.
 *
 * @component
 * @example
 * ```tsx
 * <FilterPage />
 * ```
 */
export default function FilterPage() {
    const [availableFilters] = useState([
        {
            filterId: "nome",
            filterName: "Nome",
            conditions: [
                {
                    conditionId: "$eq",
                    conditionName: "Igual a",
                    valueType: "string",
                    selectValues: [],
                },
                {
                    conditionId: "$ne",
                    conditionName: "Diferente de",
                    valueType: "string",
                    selectValues: [],
                },
            ],
        },
        {
            filterId: "marca",
            filterName: "Marca",
            conditions: [
                {
                    conditionId: "$eq",
                    conditionName: "Igual a",
                    valueType: "select",
                    selectValues: [
                        { label: "Apple", value: "Apple" },
                        { label: "Samsung", value: "Samsung" },
                        { label: "LG", value: "LG" },
                        { label: "Sony", value: "Sony" },
                        { label: "Motorola", value: "Motorola" },
                    ],
                },
                {
                    conditionId: "$ne",
                    conditionName: "Diferente de",
                    valueType: "select",
                    selectValues: [
                        { label: "Apple", value: "Apple" },
                        { label: "Samsung", value: "Samsung" },
                        { label: "LG", value: "LG" },
                        { label: "Sony", value: "Sony" },
                        { label: "Motorola", value: "Motorola" },
                    ],
                },
            ],
        },
        {
            filterId: "cidade",
            filterName: "Cidade",
            conditions: [
                {
                    conditionId: "$eq",
                    conditionName: "Igual a",
                    valueType: "string",
                    selectValues: [],
                },
                {
                    conditionId: "$ne",
                    conditionName: "Diferente de",
                    valueType: "string",
                    selectValues: [],
                },
            ],
        },
        {
            filterId: "showroom",
            filterName: "Showroom",
            conditions: [
                {
                    conditionId: "$eq",
                    conditionName: "Igual a",
                    valueType: "string",
                    selectValues: [],
                },
                {
                    conditionId: "$ne",
                    conditionName: "Diferente de",
                    valueType: "string",
                    selectValues: [],
                },
            ],
        },
        {
            filterId: "preco",
            filterName: "Preço",
            conditions: [
                {
                    conditionId: "$gt",
                    conditionName: "Maior que",
                    valueType: "number",
                    selectValues: [],
                },
                {
                    conditionId: "$lt",
                    conditionName: "Menor que",
                    valueType: "number",
                    selectValues: [],
                },
                {
                    conditionId: "$gte",
                    conditionName: "Maior ou igual a",
                    valueType: "number",
                    selectValues: [],
                },
                {
                    conditionId: "$lte",
                    conditionName: "Menor ou igual a",
                    valueType: "number",
                    selectValues: [],
                },
            ],
        },
    ]);
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(FilterDialog, { availableFilters: availableFilters }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { useState } from "react";
import FilterDialog from "@/components/ui/FilterBase";
import {
  AvailableFilter,
  FilterConditions,
  SelectItem,
} from "@/filter/services/types";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<FilterPage />` }) })] })] })] }));
}
