import type { CSSProperties, ReactNode } from "react";

// Shared look for coded recreations of Digital Twin report screens. Values
// come from the tool's own styles (twin.mindspan.co); only the outer drop
// shadow is added so the card sits on the site's sand sections.

export const twin = {
  primary: "#083630",
  cream: "#FBF7F0",
  sand: "#E9DECB",
  sky: "#E2D4BC",
  // color-mix(in srgb, #a8d2fb 70%, #083630)
  together: "rgb(120, 163, 190)",
  accent: "#FB4D17",
  eyebrow: "#C93A0E",
  ink: (a: number) => `rgba(32, 30, 23, ${a})`,
  // color-mix(in srgb, var(--primary) N%, var(--cream)) at N = 70 / 66 / 60 / 58
  muted70: "rgb(81, 112, 106)",
  muted66: "rgb(91, 120, 113)",
  muted60: "rgb(105, 131, 125)",
  muted58: "rgb(110, 135, 129)",
  heading: "var(--font-eb-garamond), Georgia, serif",
  body: "var(--font-figtree), system-ui, sans-serif",
} as const;

/**
 * A screen from the tool, presented as one image for assistive tech: the
 * figure carries the description and the recreated UI inside is hidden, so
 * nobody tabs into a slider that isn't real.
 */
export function TwinScreen({
  label,
  children,
  radius = 18,
  style,
}: {
  label: string;
  children: ReactNode;
  radius?: number;
  style?: CSSProperties;
}) {
  return (
    <figure
      role="img"
      aria-label={label}
      style={{
        margin: 0,
        width: "100%",
        background: twin.cream,
        color: twin.primary,
        fontFamily: twin.body,
        borderRadius: radius,
        overflow: "hidden",
        boxShadow: `0 1px 2px ${twin.ink(0.06)}, inset 0 0 0 1px ${twin.ink(0.07)}, 0 28px 56px -32px rgba(8, 54, 48, 0.35)`,
        ...style,
      }}
    >
      <div aria-hidden="true">{children}</div>
    </figure>
  );
}
