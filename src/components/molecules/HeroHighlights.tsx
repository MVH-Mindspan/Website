"use client";

import { useId } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { radius, tracking, type as typeScale } from "@/lib/tokens";
import { Pill } from "@/components/atoms/Pill";
import type { QuestionCardItem } from "@/components/organisms/sections/QuestionCards";

/**
 * Numbered question highlights sized for the bottom of a dark media hero
 * (passed as PageHero children). Light cards keep high contrast over the
 * photo. Informational only, so no hover lift.
 */
export function HeroHighlights({
  label,
  items,
}: {
  label: string;
  items: readonly Pick<QuestionCardItem, "id" | "title" | "tag">[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const labelId = useId();

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
          color: alpha(c.cream, 0.75),
        }}
      >
        {label}
      </p>
      <ol className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <li
            key={item.id}
            className="flex items-start gap-4 p-4 md:p-5 min-w-0"
            style={{
              background: alpha(c.cream, 0.94),
              borderRadius: radius.lg,
              boxShadow: "0 20px 40px -24px rgba(0, 0, 0, 0.6)",
            }}
          >
            <span
              aria-hidden
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: "2rem",
                lineHeight: 1,
                color: c.accentText,
                minWidth: "1ch",
              }}
            >
              {i + 1}
            </span>
            <span className="min-w-0">
              <span
                className="block break-words"
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)",
                  fontWeight: 500,
                  lineHeight: 1.2,
                  color: c.ink,
                }}
              >
                {item.title}
              </span>
              {item.tag && (
                <Pill background={c.sand} color={c.brandGreen} className="mt-2">
                  {item.tag}
                </Pill>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
