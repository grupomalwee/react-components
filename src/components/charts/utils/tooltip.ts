export function adaptDataForTooltip(
  universalData: Record<string, unknown>,
  xAxisKey: string
): Record<string, string | number> & { name: string } {
  const out: Record<string, string | number> = {};
  for (const k of Object.keys(universalData)) {
    const v = universalData[k];
    if (typeof v === "number") out[k] = v;
    else if (typeof v === "string") out[k] = v;
    else if (v === null || v === undefined) out[k] = "";
    else out[k] = String(v);
  }

  out.name = String(
    universalData[xAxisKey] ?? (universalData).name ?? "N/A"
  );

  return out as Record<string, string | number> & { name: string };
}
