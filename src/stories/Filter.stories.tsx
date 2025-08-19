import { useState } from "react";
import FilterDialog from "../components/ui/FilterBase";
import {
  AvailableFilter,
  FilterConditions,
  SelectItem,
} from "../components/filter/services/types";
import { MemoryRouter } from "react-router-dom";
import { TooltipProviderBase } from "../components/ui/TooltipBase";

export default {
  title: "diversos/FilterDialog",
  component: FilterDialog,
  tags: ['autodocs'],
};

type FilterValues = {
  categoria: string;
  preco: number;
  nome: string;
  marca: string;
  cidade: string;
  showroom: string;
};

const availableFilters: AvailableFilter<FilterValues>[] = [
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
        conditionId: "$eq" as FilterConditions,
        conditionName: "Igual a",
        valueType: "select",
        selectValues: [
          { label: "Apple", value: "Apple" },
          { label: "Samsung", value: "Samsung" },
          { label: "LG", value: "LG" },
          { label: "Sony", value: "Sony" },
          { label: "Motorola", value: "Motorola" },
        ] as SelectItem[],
      },
      {
        conditionId: "$ne" as FilterConditions,
        conditionName: "Diferente de",
        valueType: "select",
        selectValues: [
          { label: "Apple", value: "Apple" },
          { label: "Samsung", value: "Samsung" },
          { label: "LG", value: "LG" },
          { label: "Sony", value: "Sony" },
          { label: "Motorola", value: "Motorola" },
        ] as SelectItem[],
      },
    ],
  },
  {
    filterId: "cidade",
    filterName: "Cidade",
    conditions: [
      {
        conditionId: "$eq" as FilterConditions,
        conditionName: "Igual a",
        valueType: "string",
        selectValues: [],
      },
      {
        conditionId: "$ne" as FilterConditions,
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
        conditionId: "$eq" as FilterConditions,
        conditionName: "Igual a",
        valueType: "string",
        selectValues: [],
      },
      {
        conditionId: "$ne" as FilterConditions,
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
        conditionId: "$gt" as FilterConditions,
        conditionName: "Maior que",
        valueType: "number",
        selectValues: [],
      },
      {
        conditionId: "$lt" as FilterConditions,
        conditionName: "Menor que",
        valueType: "number",
        selectValues: [],
      },
      {
        conditionId: "$gte" as FilterConditions,
        conditionName: "Maior ou igual a",
        valueType: "number",
        selectValues: [],
      },
      {
        conditionId: "$lte" as FilterConditions,
        conditionName: "Menor ou igual a",
        valueType: "number",
        selectValues: [],
      },
    ],
  },
];

export const Default = () => {
  const [filters] = useState<AvailableFilter<FilterValues>[]>(availableFilters);
  return (
    <MemoryRouter>
      <TooltipProviderBase>
        <div className="flex flex-col gap-4">
          <div className="p-5">
            <FilterDialog availableFilters={filters} />
          </div>
        </div>
      </TooltipProviderBase>
    </MemoryRouter>
  );
};
