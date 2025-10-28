import { useState } from "react";
import { CopySimple, Check } from "@phosphor-icons/react";

export default {
  title: "Colors",
  parameters: { layout: "padded" },
};

const tokenGroups = [
  { name: "white", var: "white" },
  { name: "purple", var: "purple" },
  { name: "green", var: "green" },
  { name: "blue", var: "blue" },
  { name: "background", var: "background" },
  { name: "foreground", var: "foreground" },
  { name: "muted", var: "muted" },
  { name: "muted-foreground", var: "muted-foreground" },
  { name: "popover", var: "popover" },
  { name: "popover-foreground", var: "popover-foreground" },
  { name: "border", var: "border" },
  { name: "input", var: "input" },
  { name: "card", var: "card" },
  { name: "card-foreground", var: "card-foreground" },
  { name: "primary", var: "primary" },
  { name: "primary-foreground", var: "primary-foreground" },
  { name: "secondary", var: "secondary" },
  { name: "secondary-foreground", var: "secondary-foreground" },
  { name: "accent", var: "accent" },
  { name: "accent-foreground", var: "accent-foreground" },
  { name: "destructive", var: "destructive" },
  { name: "destructive-foreground", var: "destructive-foreground" },
  { name: "ring", var: "ring" },
  { name: "tick-color", var: "tick-color" },
];

function readCssVar(name: string) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    `--${name}`
  );
  if (!raw) return null;
  const v = raw.trim();
  if (!v) return null;
  if (v.startsWith("hsl(") || v.startsWith("#") || v.startsWith("rgb("))
    return v;
  return `hsl(${v})`;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  const normalized =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbStringToRgb(rgb: string) {
  const m = rgb.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((p) => parseFloat(p));
  return { r: parts[0], g: parts[1], b: parts[2] };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360 * 10) / 10,
    s: Math.round(s * 1000) / 10,
    l: Math.round(l * 1000) / 10,
  };
}

function parseHslLike(value: string | null) {
  if (!value) return null;
  const v = value.trim();
  if (v.startsWith("hsl(")) {
    const inside = v
      .replace(/^hsl\(/, "")
      .replace(/\)$/, "")
      .trim();
    const parts = inside.split(/\s+/).filter(Boolean);
    if (parts.length >= 3) {
      const h = parseFloat(parts[0]);
      const s = parseFloat(parts[1].replace("%", ""));
      const l = parseFloat(parts[2].replace("%", ""));
      return { h, s, l };
    }
  }
  if (v.startsWith("#")) {
    try {
      const { r, g, b } = hexToRgb(v);
      return rgbToHsl(r, g, b);
    } catch {
      return null;
    }
  }
  if (v.startsWith("rgb")) {
    const rgb = rgbStringToRgb(v);
    if (rgb) return rgbToHsl(rgb.r, rgb.g, rgb.b);
  }
  const parts = v.split(/\s+/).filter(Boolean);
  if (parts.length >= 3) {
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1].replace("%", ""));
    const l = parseFloat(parts[2].replace("%", ""));
    if (!isNaN(h) && !isNaN(s) && !isNaN(l)) return { h, s, l };
  }
  return null;
}

function makeShades(
  hsl: { h: number; s: number; l: number } | null,
  count = 10
) {
  if (!hsl) return Array.from({ length: count }, () => null);
  const top = 96;
  const bottom = 6;
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const L = Math.round((top * (1 - t) + bottom * t) * 10) / 10;
    arr.push(`hsl(${hsl.h} ${hsl.s}% ${L}%)`);
  }
  return arr;
}

export const Palette = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [copiedAt, setCopiedAt] = useState<number | null>(null);

  const handleCopy = (color: string | null) => {
    if (!color) return;
    navigator.clipboard.writeText(color);
    setCopied(color);
    setCopiedAt(Date.now());
    setTimeout(() => setCopied(null), 1000);
  };

  const handleKeyCopy = (e: React.KeyboardEvent, color: string | null) => {
    if (!color) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCopy(color);
    }
  };

  function shadeTextColor(sh: string | null) {
    // tenta extrair o L de hsl(...) ou usa fallback para garantir contraste
    if (!sh) return "white";
    const m = sh.match(/hsl\(.+?\s(\d+(?:\.\d+)?)%\)/);
    if (m) {
      const L = parseFloat(m[1]);
      return L > 55 ? "#111827" : "white"; // claro -> texto escuro, senão branco
    }
    // se for rgb/hex, tenta converter aproximadamente buscando valor numérico
    if (sh.startsWith("#")) {
      try {
        const r = parseInt(sh.slice(1, 3), 16);
        const g = parseInt(sh.slice(3, 5), 16);
        const b = parseInt(sh.slice(5, 7), 16);
        const l = ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255) * 100;
        return l > 55 ? "#111827" : "white";
      } catch {
        return "white";
      }
    }
    return "white";
  }

  return (
    <div className="space-y-8 p-6">
      {tokenGroups.map((g) => {
        const raw = readCssVar(g.var);
        const parsed = parseHslLike(raw);
        const shades = makeShades(parsed, 10);

        return (
          <section key={g.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <h3 className="text-lg" style={{ margin: 0 }}>
                {g.name}
              </h3>
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 13,
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                }}
              >
                {raw ?? "(sem valor)"}
              </div>
            </div>

            <div style={{ padding: 1, borderRadius: 8 }}>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  overflowX: "auto",
                }}
              >
                {shades.map((sh, idx) => {
                  const id = `${g.name}-${idx}`;
                  const overlayVisible = hovered === id || copied === sh;
                  const textColor = shadeTextColor(sh);
                  return (
                    <div
                      key={idx}
                      className="group"
                      style={{
                        width: 90,
                        textAlign: "center",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onClick={() => handleCopy(sh)}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                      role="button"
                      tabIndex={0}
                      aria-label={sh ? `Copiar ${sh}` : `Sem cor`}
                      onKeyDown={(e) => handleKeyCopy(e, sh)}
                    >
                      <div
                        style={{
                          height: 120,
                          borderRadius: 12,
                          overflow: "hidden",
                          background: sh ?? "transparent",
                          border: "1px solid rgba(255,255,255,0.04)",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: overlayVisible
                              ? "rgba(0,0,0,0.28)"
                              : "transparent",
                            opacity: overlayVisible ? 1 : 0,
                            transition:
                              "opacity 180ms ease, background 180ms ease",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              pointerEvents: "none",
                            }}
                          >
                            {copied === sh ? (
                              <Check
                                size={28}
                                weight="bold"
                                color={textColor}
                              />
                            ) : (
                              <CopySimple
                                size={24}
                                weight="bold"
                                color={textColor}
                              />
                            )}
                            <div
                              style={{
                                color: textColor,
                                fontSize: 13,
                                fontFamily:
                                  "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                              }}
                            >
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: 8,
                          color: "rgba(255,255,255,0.78)",
                          fontSize: 13,
                          fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                        }}
                      >
                        {sh ? `step-${idx + 1}` : "—"}
                      </div>
                      <div
                        style={{
                          marginTop: 4,
                          color: "rgba(255,255,255,0.52)",
                          fontSize: 12,
                          fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                        }}
                      >
                        {sh ?? "—"}
                      </div>

                      {/* tooltip pequeno flutuante ao copiar */}
                      {copied === sh && copiedAt ? (
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: -34,
                            background: "rgba(17,24,39,0.9)",
                            color: "white",
                            padding: "6px 10px",
                            borderRadius: 8,
                            fontSize: 12,
                            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                          }}
                        >
                          Copiado!
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
      {/* região para leitor de tela */}
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        {copied ? `Cor copiada ${copied}` : ""}
      </div>
    </div>
  );
};

Palette.storyName = "Color palette";
