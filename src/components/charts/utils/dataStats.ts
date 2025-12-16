export function maxForKeys(
  processedData: Array<Record<string, unknown>>,
  keys: string[]
) {
  let max = 0;
  for (const row of processedData) {
    const r = row as Record<string, unknown>;
    for (const key of keys) {
      const v = r[key];
      if (typeof v === "number" && Number.isFinite(v) && v > max)
        max = v as number;
    }
  }
  return max;
}

export function minForKeys(
  processedData: Array<Record<string, unknown>>,
  keys: string[]
) {
  let min = 0;
  for (const row of processedData) {
    const r = row as Record<string, unknown>;
    for (const key of keys) {
      const v = r[key];
      if (typeof v === "number" && Number.isFinite(v) && v < min)
        min = v as number;
    }
  }
  return min;
}
