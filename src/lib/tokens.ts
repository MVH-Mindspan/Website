export const ease = {
  standard: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  expressive: "cubic-bezier(0.22, 1, 0.36, 1)",
  reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const easeArray = [0.22, 0.61, 0.36, 1] as const;

export const easeArrays = {
  standard: [0.22, 0.61, 0.36, 1],
  expressive: [0.22, 1, 0.36, 1],
  reveal: [0.16, 1, 0.3, 1],
} as const;

export const type = {
  display: "clamp(2.5rem, 1.6rem + 3.5vw, 5.25rem)",
  h1: "clamp(2.5rem, 5.5vw + 1rem, 5.5rem)",
  h2: "clamp(2rem, 1.4rem + 2vw, 3.4rem)",
  h3: "clamp(1.5rem, 1.15rem + 1.2vw, 2.2rem)",
  h4: "clamp(1.375rem, 0.8vw + 1rem, 1.75rem)",
  leadLg: "clamp(1.2rem, 0.4vw + 1.1rem, 1.45rem)",
  leadMd: "clamp(1.1rem, 1rem + 0.25vw, 1.25rem)",
  body: "1.125rem",
  bodySm: "clamp(1rem, 0.95rem + 0.2vw, 1.1rem)",
  micro: "clamp(0.8rem, 0.75rem + 0.2vw, 0.9rem)",
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

/**
 * Corner radius scale.
 *
 * Rule for nested rounded elements:
 *   outer_radius = inner_radius + padding
 *
 * Concentric pairs (outer -> inner -> required padding to nearest edge):
 *   xl -> md -> 0.75rem (12px)   canonical ImageFrame-in-card
 *   xl -> sm -> 1.25rem (20px)
 *   xl -> lg -> 0.5rem (8px)
 *   lg -> sm -> 0.75rem (12px)
 *
 * `pill` (10rem) and `50%` (circles) are exempt; they are shape primitives,
 * not part of the nesting system. The rule only binds when an inner shape is
 * visually framed by the outer wall (e.g. ImageFrame at the top of a card).
 * Content sitting in the body of a card with normal layout padding does not
 * need to follow it.
 */
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

/**
 * Modular grid — single source of truth for column count + gutter.
 * 12 columns + an 8px baseline is the robust general web default in the
 * Mueller-Brockmann / International Typographic Style. Sections opt in via the
 * `<Grid>` / `<GridCol>` atoms and place elements by column line, so every
 * heading, lede, and card snaps to the same lines.
 */
export const grid = {
  columns: 12,
  columnGap: "32px", // == Tailwind gap-8; matches the historical editorial gutter
} as const;

/**
 * Measure (line-length caps) — one value per role. Replaces the ad-hoc spread
 * of 42ch / 58ch / 62ch / 65ch that drifted across sections. Keeping a single
 * measure per role is what holds the copy to a consistent reading rhythm.
 */
export const measure = {
  body: "68ch", // long-form body copy
  lead: "62ch", // section lede / SectionHeader lead (flush-left default)
  leadCentered: "58ch", // narrower when centered (optical balance)
} as const;

/**
 * 8px rhythm scale — canonical reference for inter-element copy spacing.
 * Tailwind's 4px spacing scale maps onto this 1:1 (mt-2=8, mt-4=16, mt-6=24,
 * mt-8=32, mt-12=48), so card internals snap to it by using only 8-multiples.
 */
export const space = {
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "32px",
  xl: "48px",
} as const;

export type Tone = "dark" | "light" | "muted";
