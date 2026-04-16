export const ease = {
  standard: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  expressive: "cubic-bezier(0.22, 1, 0.36, 1)",
  reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const easeArray = [0.22, 0.61, 0.36, 1] as const;

export const type = {
  display: "clamp(3rem, 1.8rem + 5vw, 7rem)",
  h1: "clamp(2.5rem, 5.5vw + 1rem, 5.5rem)",
  h2: "clamp(2rem, 1.4rem + 2vw, 3.4rem)",
  h3: "clamp(1.5rem, 1.15rem + 1.2vw, 2.2rem)",
  h4: "clamp(1.375rem, 0.8vw + 1rem, 1.75rem)",
  leadLg: "clamp(1rem, 0.4vw + 0.95rem, 1.25rem)",
  leadMd: "clamp(0.95rem, 0.9rem + 0.2vw, 1.08rem)",
  body: "1rem",
  bodySm: "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
  micro: "clamp(0.7rem, 0.65rem + 0.2vw, 0.8rem)",
} as const;

export const lineHeight = {
  display: 0.98,
  h1: 1.02,
  h2: 1.08,
  h3: 1.15,
  h4: 1.18,
  lead: 1.55,
  body: 1.6,
  eyebrow: 1.2,
} as const;

export const tracking = {
  display: "-0.03em",
  tight: "-0.02em",
  normal: "-0.01em",
  loose: "0.01em",
  eyebrow: "0.14em",
  wide: "0.08em",
} as const;

export const radius = {
  sm: "0.75rem",
  md: "1.25rem",
  lg: "1.5rem",
  xl: "2rem",
  pill: "10rem",
} as const;

export const container = {
  width: "min(1320px, 92vw)",
  widthWide: "min(1440px, 100%)",
  widthNarrow: "min(900px, 92vw)",
  widthProse: "min(760px, 92vw)",
} as const;

export const section = {
  padY: "96px",
  padYSm: "64px",
  padYLg: "112px",
} as const;

export type Tone = "dark" | "light" | "muted";
