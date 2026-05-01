export interface ThemeColors {
  primary: string;
  primaryLight: string;
  accent: string;
  accentText: string;
  accentHover: string;
  cream: string;
  sand: string;
  sky: string;
  skySoft: string;
  ink: string;
  white: string;
  /** Brand green used for icon backgrounds, badges, and secondary highlights */
  brandGreen: string;
  brandGreenLight: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
    accent: string;
  };
}

/** Convert hex color + opacity to rgba string */
export function alpha(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const brandV2Theme: ThemeConfig = {
  id: "mindspan-v2",
  name: "Mindspan Brand v2",
  description: "Warm sand editorial — the canonical site brand",
  colors: {
    primary: "#083630",
    primaryLight: "#1f514a",
    accent: "#fb4d17",
    accentText: "#c93a0e",
    accentHover: "#e23d08",
    cream: "#FBF7F0",
    sand: "#E9DECB",
    sky: "#E2D4BC",
    skySoft: "#EDE5D6",
    ink: "#201E17",
    white: "#ffffff",
    brandGreen: "#083630",
    brandGreenLight: "#1f514a",
  },
  fonts: {
    heading: "var(--font-eb-garamond), Georgia, serif",
    body: "var(--font-figtree), system-ui, sans-serif",
    accent: "var(--font-eb-garamond), Georgia, serif",
  },
};
