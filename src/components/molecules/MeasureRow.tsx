"use client";

import { useId } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { radius, tracking, type as typeScale } from "@/lib/tokens";

export type Measure = {
  name: string;
  meaning: string;
  accent: "plaque" | "repair" | "wear";
};

/**
 * Frosted row of named measures, built to sit over a dark media hero
 * (passed as PageHero children). Chips are informational, not links,
 * so they deliberately have no hover lift.
 */
export function MeasureRow({
  label,
  items,
}: {
  label: string;
  items: readonly Measure[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const labelId = useId();
  const dot: Record<Measure["accent"], string> = {
    plaque: "#A8D2FB",
    repair: c.sand,
    wear: c.accent,
  };

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="pt-6 md:pt-8"
      style={{ borderTop: `1px solid ${alpha(c.cream, 0.14)}` }}
    >
      <p
        id={labelId}
        style={{
          fontFamily: theme.fonts.body,
          fontSize: typeScale.micro,
          fontWeight: 600,
          letterSpacing: tracking.eyebrow,
          textTransform: "uppercase",
          color: alpha(c.cream, 0.7),
        }}
      >
        {label}
      </p>
      <ul className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((m) => (
          <li
            key={m.name}
            className="flex items-center gap-3 p-3 md:px-5 md:py-4 min-w-0"
            style={{
              background: alpha("#0e0d0a", 0.42),
              backdropFilter: "blur(14px) saturate(140%)",
              WebkitBackdropFilter: "blur(14px) saturate(140%)",
              border: `1px solid ${alpha(c.cream, 0.16)}`,
              borderRadius: radius.md,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: dot[m.accent],
                flex: "none",
              }}
            />
            <span className="min-w-0">
              <span
                className="block"
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: "clamp(1.125rem, 1rem + 0.6vw, 1.5rem)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: c.cream,
                }}
              >
                {m.name}
              </span>
              <span
                className="block mt-1"
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.micro,
                  lineHeight: 1.35,
                  color: alpha(c.cream, 0.8),
                }}
              >
                {m.meaning}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
