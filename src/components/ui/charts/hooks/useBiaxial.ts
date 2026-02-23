import { useMemo } from "react";
import { BiaxialConfig } from "../types/chart.types";

export function useBiaxial(
  biaxial?: BiaxialConfig | string | string[],
  yAxisLabel?: string,
): BiaxialConfig | null {
  return useMemo(() => {
    if (!biaxial) return null;
    if (typeof biaxial === "string") return { key: [biaxial] } as BiaxialConfig;
    if (Array.isArray(biaxial)) return { key: biaxial } as BiaxialConfig;

    const normalized = biaxial as BiaxialConfig;
    const leftLabelMissing = !yAxisLabel || String(yAxisLabel).trim() === "";
    const rightLabelMissing =
      !normalized.label || String(normalized.label).trim() === "";

    if (leftLabelMissing || rightLabelMissing) {
      throw new Error(
        "When using `biaxial`, you must provide both `yAxisLabel` (left axis) and `biaxial.label` (right axis).",
      );
    }

    return normalized;
  }, [biaxial, yAxisLabel]);
}
