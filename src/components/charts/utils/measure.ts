export function estimateTextWidth(text: string | number | undefined) {
  const s = String(text ?? "");
  if (typeof document === "undefined") return Math.min(200, s.length * 8 + 12);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return Math.min(200, s.length * 8 + 12);
  ctx.font = "12px system-ui, -apple-system, 'Segoe UI', Roboto";
  const w = Math.ceil(ctx.measureText(s).width) + 12;
  return Math.min(300, w);
}
