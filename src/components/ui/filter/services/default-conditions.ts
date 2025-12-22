import { AvailableFilterConditions } from "./types";

export const defaultStringConditions: AvailableFilterConditions[] = [
  {
    conditionId: "$contains",
    conditionName: "contém",
    valueType: "string",
  },
  {
    conditionId: "$startsWith",
    conditionName: "começa com",
    valueType: "string",
  },
  {
    conditionId: "$endsWith",
    conditionName: "termina com",
    valueType: "string",
  },
  {
    conditionId: "$eq",
    conditionName: "é igual a",
    valueType: "string",
  },
  {
    conditionId: "$ne",
    conditionName: "não é igual a",
    valueType: "string",
  },
];
