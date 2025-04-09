type Theme = "light" | "light-purple" | "light-green" | "light-blue" | "dark" | "dark-purple" | "dark-green" | "dark-blue" | "system";
type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
export declare function ThemeProviderBase({ children, defaultTheme, storageKey, ...props }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => ThemeProviderState;
export {};
