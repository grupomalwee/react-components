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
