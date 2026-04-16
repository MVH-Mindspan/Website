"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { themes, defaultTheme, type ThemeConfig } from "./themes";

interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (id: string) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
  themes,
});

const STORAGE_KEY = "mindspan-dev-theme";

function applyThemeCSSVars(theme: ThemeConfig) {
  const root = document.documentElement;
  const c = theme.colors;

  root.style.setProperty("--theme-primary", c.primary);
  root.style.setProperty("--theme-primary-light", c.primaryLight);
  root.style.setProperty("--theme-accent", c.accent);
  root.style.setProperty("--theme-accent-hover", c.accentHover);
  root.style.setProperty("--theme-cream", c.cream);
  root.style.setProperty("--theme-sand", c.sand);
  root.style.setProperty("--theme-sky", c.sky);
  root.style.setProperty("--theme-sky-soft", c.skySoft);
  root.style.setProperty("--theme-ink", c.ink);

  root.style.setProperty("--theme-font-heading", theme.fonts.heading);
  root.style.setProperty("--theme-font-body", theme.fonts.body);
  root.style.setProperty("--theme-font-accent", theme.fonts.accent);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);

  // Read theme from URL param, then localStorage, then default
  useEffect(() => {
    const url = new URL(window.location.href);
    const paramTheme = url.searchParams.get("theme");

    // URL param takes priority
    if (paramTheme) {
      const found = themes.find((t) => t.id === paramTheme);
      if (found) {
        setThemeState(found);
        applyThemeCSSVars(found);
        localStorage.setItem(STORAGE_KEY, paramTheme);
        return;
      }
    }

    // Then localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const found = themes.find((t) => t.id === stored);
      if (found) {
        setThemeState(found);
        applyThemeCSSVars(found);
        return;
      }
    }

    // Apply default on first load
    applyThemeCSSVars(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback((id: string) => {
    const found = themes.find((t) => t.id === id);
    if (!found) return;

    // Add transition class for smooth crossfade
    document.documentElement.classList.add("theme-transitioning");
    setThemeState(found);
    applyThemeCSSVars(found);
    localStorage.setItem(STORAGE_KEY, id);

    // Update URL so the link is shareable
    const url = new URL(window.location.href);
    url.searchParams.set("theme", id);
    window.history.replaceState({}, "", url.toString());

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 500);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
