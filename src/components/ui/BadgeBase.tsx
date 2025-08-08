import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Mapeamento de cores do Tailwind CSS para valores hexadecimais
const tailwindColors: Record<string, string> = {
  // Red
  "red-50": "#fef2f2",
  "red-100": "#fee2e2",
  "red-200": "#fecaca",
  "red-300": "#fca5a5",
  "red-400": "#f87171",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "red-700": "#b91c1c",
  "red-800": "#991b1b",
  "red-900": "#7f1d1d",
  // Orange
  "orange-50": "#fff7ed",
  "orange-100": "#ffedd5",
  "orange-200": "#fed7aa",
  "orange-300": "#fdba74",
  "orange-400": "#fb923c",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "orange-800": "#9a3412",
  "orange-900": "#7c2d12",
  // Yellow
  "yellow-50": "#fefce8",
  "yellow-100": "#fef3c7",
  "yellow-200": "#fde68a",
  "yellow-300": "#fcd34d",
  "yellow-400": "#fbbf24",
  "yellow-500": "#f59e0b",
  "yellow-600": "#d97706",
  "yellow-700": "#b45309",
  "yellow-800": "#92400e",
  "yellow-900": "#78350f",
  // Green
  "green-50": "#f0fdf4",
  "green-100": "#dcfce7",
  "green-200": "#bbf7d0",
  "green-300": "#86efac",
  "green-400": "#4ade80",
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "green-700": "#15803d",
  "green-800": "#166534",
  "green-900": "#14532d",
  // Blue
  "blue-50": "#eff6ff",
  "blue-100": "#dbeafe",
  "blue-200": "#bfdbfe",
  "blue-300": "#93c5fd",
  "blue-400": "#60a5fa",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "blue-800": "#1e40af",
  "blue-900": "#1e3a8a",
  // Purple
  "purple-50": "#faf5ff",
  "purple-100": "#f3e8ff",
  "purple-200": "#e9d5ff",
  "purple-300": "#d8b4fe",
  "purple-400": "#c084fc",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "purple-700": "#7c3aed",
  "purple-800": "#6b21a8",
  "purple-900": "#581c87",
  // Pink
  "pink-50": "#fdf2f8",
  "pink-100": "#fce7f3",
  "pink-200": "#fbcfe8",
  "pink-300": "#f9a8d4",
  "pink-400": "#f472b6",
  "pink-500": "#ec4899",
  "pink-600": "#db2777",
  "pink-700": "#be185d",
  "pink-800": "#9d174d",
  "pink-900": "#831843",
  // Gray
  "gray-50": "#f9fafb",
  "gray-100": "#f3f4f6",
  "gray-200": "#e5e7eb",
  "gray-300": "#d1d5db",
  "gray-400": "#9ca3af",
  "gray-500": "#6b7280",
  "gray-600": "#4b5563",
  "gray-700": "#374151",
  "gray-800": "#1f2937",
  "gray-900": "#111827",
  // Indigo
  "indigo-50": "#eef2ff",
  "indigo-100": "#e0e7ff",
  "indigo-200": "#c7d2fe",
  "indigo-300": "#a5b4fc",
  "indigo-400": "#818cf8",
  "indigo-500": "#6366f1",
  "indigo-600": "#4f46e5",
  "indigo-700": "#4338ca",
  "indigo-800": "#3730a3",
  "indigo-900": "#312e81",
  // Teal
  "teal-50": "#f0fdfa",
  "teal-100": "#ccfbf1",
  "teal-200": "#99f6e4",
  "teal-300": "#5eead4",
  "teal-400": "#2dd4bf",
  "teal-500": "#14b8a6",
  "teal-600": "#0d9488",
  "teal-700": "#0f766e",
  "teal-800": "#115e59",
  "teal-900": "#134e4a",
  // Emerald
  "emerald-50": "#ecfdf5",
  "emerald-100": "#d1fae5",
  "emerald-200": "#a7f3d0",
  "emerald-300": "#6ee7b7",
  "emerald-400": "#34d399",
  "emerald-500": "#10b981",
  "emerald-600": "#059669",
  "emerald-700": "#047857",
  "emerald-800": "#065f46",
  "emerald-900": "#064e3b",
  // Cyan
  "cyan-50": "#ecfeff",
  "cyan-100": "#cffafe",
  "cyan-200": "#a5f3fc",
  "cyan-300": "#67e8f9",
  "cyan-400": "#22d3ee",
  "cyan-500": "#06b6d4",
  "cyan-600": "#0891b2",
  "cyan-700": "#0e7490",
  "cyan-800": "#155e75",
  "cyan-900": "#164e63",
};

// Função para converter cores do Tailwind
const getTailwindColor = (color: string): string => {
  // Se já é uma cor hexadecimal, RGB ou HSL, retorna como está
  if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl')) {
    return color;
  }
  
  // Se é uma cor do Tailwind, converte
  if (tailwindColors[color]) {
    return tailwindColors[color];
  }
  
  // Se é apenas o nome da cor sem número (ex: "red"), usa a versão 500
  if (!color.includes('-')) {
    const defaultColor = `${color}-500`;
    if (tailwindColors[defaultColor]) {
      return tailwindColors[defaultColor];
    }
  }
  
  // Se não encontrou, retorna a cor original
  return color;
};

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      status: {
        success: "bg-green-500 border-white dark:border-zinc-900",
        desactivated: "bg-gray-400 border-white dark:border-zinc-900",
        destructive: "bg-red-500 border-white dark:border-zinc-900",
        away: "bg-yellow-400 border-white dark:border-zinc-900",
        custom: "border-white dark:border-zinc-900", 
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type StatusType = "success" | "desactivated" | "destructive" | "away" | "custom";

interface BadgeBaseProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  status?: StatusType;
  statusColor?: string; 
}

function BadgeBase({
  className,
  variant,
  status,
  statusColor,
  asChild = false,
  children,
  style,
  ...props
}: BadgeBaseProps) {
  const Comp = asChild ? Slot : "span";

  const isStatus = Boolean(status);
  
  // Converte a cor do Tailwind para valor hexadecimal se necessário
  const resolvedStatusColor = statusColor ? getTailwindColor(statusColor) : undefined;
  
  const customStyle = status === "custom" && resolvedStatusColor 
    ? { ...style, backgroundColor: resolvedStatusColor }
    : style;

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, status: isStatus ? status : undefined }),
        isStatus &&
          "absolute bottom-0 right-0 rounded-full p-0 h-4 w-4 flex items-center justify-center border-2",
        className
      )}
      style={customStyle}
      {...props}
    >
      {isStatus ? null : children}
    </Comp>
  );
}

export { BadgeBase, badgeVariants };
