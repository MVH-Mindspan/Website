export interface ThemeColors {
  primary: string;
  primaryLight: string;
  accent: string;
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

export type ThemeStructure = "mindspan" | "arrival";

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  structure: ThemeStructure;
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

export const mindspanTheme: ThemeConfig = {
  id: "mindspan",
  name: "Mindspan",
  description: "Green & orange healthcare — current brand",
  structure: "mindspan",
  colors: {
    primary: "#083630",
    primaryLight: "#1f514a",
    accent: "#fb4d17",
    accentHover: "#e23d08",
    cream: "#efeeeb",
    sand: "#dad6c9",
    sky: "#bdd8f5",
    skySoft: "#d9e6f3",
    ink: "#111111",
    white: "#ffffff",
    brandGreen: "#083630",
    brandGreenLight: "#1f514a",
  },
  fonts: {
    heading: "var(--font-pt-serif), Georgia, serif",
    body: "var(--font-inter), system-ui, sans-serif",
    accent: "var(--font-bitter), Georgia, serif",
  },
};

export const arrivalTheme: ThemeConfig = {
  id: "arrival",
  name: "Video Hero",
  description: "Warm sand editorial — full page structure swap",
  structure: "arrival",
  colors: {
    primary: "#083630",
    primaryLight: "#1f514a",
    accent: "#fb4d17",
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

export const themes: ThemeConfig[] = [mindspanTheme, arrivalTheme];
