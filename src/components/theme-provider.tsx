'use client';

import { createContext, useContext, useEffect, useState } from "react";

export type Theme =
  | "light"
  | "light-purple"
  | "light-green"
  | "light-blue"
  | "dark"
  | "dark-purple"
  | "dark-green"
  | "dark-blue"
  | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProviderBase({
  children,
  defaultTheme = "system",
  storageKey = "app-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove todas as classes de tema
    root.classList.remove(
      "light",
      "light-purple",
      "light-green",
      "light-blue",
      "dark",
      "dark-purple",
      "dark-green",
      "dark-blue",
      "system"
    );

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      
      // Forçar re-render dos estilos
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      return;
    }

    // Aplicar o tema selecionado
    root.classList.add(theme);
    
    // Forçar re-render dos estilos para temas dark
    if (theme.includes('dark')) {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
