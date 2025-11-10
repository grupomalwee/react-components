import { useState } from "react";
import { CopySimple, Check } from "@phosphor-icons/react";

export default {
  title: "Theme/Cores",
  
  parameters: {
    layout: "fullscreen",
      tags: ["!autodocs"],

    docs: {
      description: {
        component:
          "Paleta de cores completa do design system com tons e variações. Clique em qualquer cor para copiar o valor HSL.",
      },
    },
  },
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
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--muted)))",
        padding: "3rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              margin: 0,
              marginBottom: "0.5rem",
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Paleta de Cores
          </h1>
          <p
            style={{
              color: "hsl(var(--muted-foreground))",
              fontSize: "1rem",
              margin: 0,
            }}
          >
            Clique em qualquer cor para copiar o valor HSL
          </p>
        </div>

        <div className="space-y-10">
          {tokenGroups.map((g) => {
            const raw = readCssVar(g.var);
            const parsed = parseHslLike(raw);
            const shades = makeShades(parsed, 10);

            return (
              <section
                key={g.name}
                style={{
                  background: "hsl(var(--card))",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  border: "1px solid hsl(var(--border))",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      textTransform: "capitalize",
                    }}
                  >
                    {g.name.replace(/-/g, " ")}
                  </h3>
                  <div
                    style={{
                      color: "hsl(var(--muted-foreground))",
                      fontSize: 14,
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                      background: "hsl(var(--muted))",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    {raw ?? "(sem valor)"}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
                    gap: 16,
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
                          textAlign: "center",
                          position: "relative",
                          cursor: "pointer",
                          transition: "transform 200ms ease",
                        }}
                        onClick={() => handleCopy(sh)}
                        onMouseEnter={() => setHovered(id)}
                        onMouseLeave={() => setHovered(null)}
                        role="button"
                        tabIndex={0}
                        aria-label={sh ? `Copiar ${sh}` : `Sem cor`}
                        onKeyDown={(e) => handleKeyCopy(e, sh)}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform =
                            "scale(0.95)";
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.transform =
                            hovered === id ? "scale(1.05)" : "scale(1)";
                        }}
                      >
                        <div
                          style={{
                            height: 110,
                            borderRadius: 12,
                            overflow: "hidden",
                            background: sh ?? "hsl(var(--muted))",
                            border: "2px solid hsl(var(--border))",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: overlayVisible
                              ? "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                              : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                            transition:
                              "box-shadow 200ms ease, transform 200ms ease",
                            transform:
                              hovered === id ? "scale(1.05)" : "scale(1)",
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
                                ? "rgba(0,0,0,0.5)"
                                : "transparent",
                              backdropFilter: overlayVisible
                                ? "blur(4px)"
                                : "none",
                              opacity: overlayVisible ? 1 : 0,
                              transition: "all 200ms ease",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 6,
                                pointerEvents: "none",
                                transform: overlayVisible
                                  ? "scale(1)"
                                  : "scale(0.8)",
                                transition: "transform 200ms ease",
                              }}
                            >
                              {copied === sh ? (
                                <>
                                  <Check
                                    size={32}
                                    weight="bold"
                                    color={textColor}
                                  />
                                  <span
                                    style={{
                                      color: textColor,
                                      fontSize: 12,
                                      fontWeight: 600,
                                    }}
                                  >
                                    Copiado!
                                  </span>
                                </>
                              ) : (
                                <>
                                  <CopySimple
                                    size={28}
                                    weight="bold"
                                    color={textColor}
                                  />
                                  <span
                                    style={{
                                      color: textColor,
                                      fontSize: 11,
                                      fontWeight: 500,
                                    }}
                                  >
                                    Copiar
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            marginTop: 10,
                            color: "hsl(var(--foreground))",
                            fontSize: 13,
                            fontWeight: 600,
                            fontFamily:
                              "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                          }}
                        >
                          {sh ? `${idx + 1}` : "—"}
                        </div>
                        <div
                          style={{
                            marginTop: 4,
                            color: "hsl(var(--muted-foreground))",
                            fontSize: 11,
                            fontFamily:
                              "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                            wordBreak: "break-all",
                            lineHeight: "1.2",
                          }}
                        >
                          {sh ?? "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Toast de feedback */}
        {copied && copiedAt && (
          <div
            style={{
              position: "fixed",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              padding: "12px 24px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: "slideUp 200ms ease",
              zIndex: 9999,
            }}
          >
            <Check size={20} weight="bold" />
            <span>
              Cor copiada:{" "}
              <code
                style={{
                  background: "rgba(0,0,0,0.2)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                {copied}
              </code>
            </span>
          </div>
        )}

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

      <style>{`
        @keyframes slideUp {
          from {
            transform: translate(-50%, 20px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

Palette.storyName = "Paleta Completa";
