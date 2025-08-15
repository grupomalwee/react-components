import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterBase from '../components/ui/FilterBase';
import { MemoryRouter } from 'react-router-dom';
import type { FilterConditions } from "@/filter/services/types";
import { AvailableFilter } from "@/filter/services/types";

const meta: Meta<typeof FilterBase> = {
  title: 'Components/Filter',
  component: FilterBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterBase>;

type FilterData = { [key: string]: object };

const availableFilters: AvailableFilter<FilterData>[] = [
  {
    filterId: "nome",
    filterName: "Nome",
    conditions: [
      { conditionId: "$eq" as FilterConditions, conditionName: "Igual a", valueType: "string", selectValues: [] },
      { conditionId: "$ne" as FilterConditions, conditionName: "Diferente de", valueType: "string", selectValues: [] },
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
        ],
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
        ],
      },
    ],
  },
  {
    filterId: "cidade",
    filterName: "Cidade",
    conditions: [
      { conditionId: "$eq" as FilterConditions, conditionName: "Igual a", valueType: "string", selectValues: [] },
      { conditionId: "$ne" as FilterConditions, conditionName: "Diferente de", valueType: "string", selectValues: [] },
    ],
  },
  {
    filterId: "showroom",
    filterName: "Showroom",
    conditions: [
      { conditionId: "$eq" as FilterConditions, conditionName: "Igual a", valueType: "string", selectValues: [] },
      { conditionId: "$ne" as FilterConditions, conditionName: "Diferente de", valueType: "string", selectValues: [] },
    ],
  },
  {
    filterId: "preco",
    filterName: "Preço",
    conditions: [
      { conditionId: "$gt" as FilterConditions, conditionName: "Maior que", valueType: "number", selectValues: [] },
      { conditionId: "$lt" as FilterConditions, conditionName: "Menor que", valueType: "number", selectValues: [] },
      { conditionId: "$gte" as FilterConditions, conditionName: "Maior ou igual a", valueType: "number", selectValues: [] },
      { conditionId: "$lte" as FilterConditions, conditionName: "Menor ou igual a", valueType: "number", selectValues: [] },
    ],
  },
];


export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <div className="p-5">
        <FilterBase availableFilters={availableFilters} />
      </div>
    </MemoryRouter>
  )
};
