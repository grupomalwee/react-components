import { calcDivision } from "@/utils/calcDivision";

export function formatLinePercentage(value: number | string | undefined) {
  const numValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? parseFloat(value)
        : 0;
  const percentage = calcDivision(numValue, 100);
  const formattedPercentage =
    typeof percentage === "number"
      ? percentage.toFixed(1).replace(".", ",")
      : String(percentage).replace(".", ",");
  return `${formattedPercentage}%`;
}
