/** @type {import('tailwindcss').Config} */
// Eduardo Ronchi de Araujo - Desenvolvidor de Sistemas Junio
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {

      transitionTimingFunction: {
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      fontFamily: {
        syne: ["Syne", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0", opacity: "0" },
          to: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
          },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
          },
          to: { height: "0", opacity: "0" },
        },
        "loading-spin": {
          "0%": { transform: "rotate(0deg)", opacity: "1" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "rotate(360deg)", opacity: "1" },
        },
        "loading-glow": {
          "0%": { opacity: "0.4", transform: "scale(0.95)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
          "100%": { opacity: "0.4", transform: "scale(0.95)" },
        },
        "loading-fade": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        "collapsible-down":
          "collapsible-down 600ms cubic-bezier(0.4, 0.0, 0.2, 1)",
        "collapsible-up": "collapsible-up 600ms cubic-bezier(0.4, 0.0, 0.2, 1)",
        "loading-spin":
          "loading-spin 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "loading-glow": "loading-glow 2s ease-in-out infinite",
        "loading-fade": "loading-fade 0.5s ease-out",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
