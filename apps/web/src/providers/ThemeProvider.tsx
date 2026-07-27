// ThemeProvider.tsx
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>(() => {
        return (
            (localStorage.getItem("theme") as Theme) ??
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
        );
    });

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme: () =>
                    setTheme((t) =>
                        t === "dark" ? "light" : "dark"
                    ),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);

    if (!ctx) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return ctx;
}