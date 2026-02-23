import { BaseType } from "@/services/types";

export const cleanString = (str: BaseType) =>
  str
    .toString()
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase();

export function includes(input: BaseType, query: BaseType) {
  return cleanString(input).includes(cleanString(query));
}

export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const formatPercentage = (value: number, factor = 100, decimal = 1) =>
  `${(value * factor).toLocaleString("pt-BR", { minimumFractionDigits: decimal, maximumFractionDigits: decimal })}%`;
