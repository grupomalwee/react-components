import { useState } from "react";
import FilterDialog from "../components/ui/FilterBase";
import {
  AvailableFilter,
  FilterConditions,
  SelectItem,
} from "../components/filter/services/types";
import { MemoryRouter } from "react-router-dom";
import { TooltipProviderBase } from "../components/ui/TooltipBase";
import "../global.css"

export default {
  title: "diversos/FilterDialog",
  component: FilterDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "FilterDialog para filtros avançados, seleção dinâmica e múltiplos tipos de campo.",
      },
      source: {
        code: `import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { TooltipProviderBase, FilterBase } from '@mlw-packages/react-components';

const availableFilters = [ /* configure seus filtros conforme a story */ ];

function Example() {
  const [filters, setFilters] = React.useState(availableFilters);

  return (
    <MemoryRouter>
      <TooltipProviderBase>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
          <FilterBase availableFilters={filters} />
        </div>
      </TooltipProviderBase>
    </MemoryRouter>
  );
}

export default Example;`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <MemoryRouter>
        <TooltipProviderBase>
          <div className="flex flex-col gap-4">
            <div className="p-5">
              <FilterDialog availableFilters={filters} />
            </div>
          </div>
        </TooltipProviderBase>
      </MemoryRouter>
    </div>
  );
};
