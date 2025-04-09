import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const initialState = {
    theme: "system",
    setTheme: () => null,
};
const ThemeProviderContext = createContext(initialState);
export function ThemeProviderBase({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
    const [theme, setTheme] = useState(() => defaultTheme || defaultTheme);
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "light-purple", "light-green", "light-blue", "dark", "dark-purple", "dark-green", "dark-blue", "system");
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);
    const value = {
        theme,
        setTheme: (theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };
    return (_jsx(ThemeProviderContext.Provider, { ...props, value: value, children: children }));
}
export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
