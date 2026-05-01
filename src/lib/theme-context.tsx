"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { brandV2Theme, type ThemeConfig } from "./themes";

interface ThemeContextValue {
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: brandV2Theme });

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
  useEffect(() => {
    applyThemeCSSVars(brandV2Theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: brandV2Theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
