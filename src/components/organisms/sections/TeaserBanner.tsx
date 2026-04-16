"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";

export function TeaserBanner({
  href,
  ariaLabel,
  primary,
  badge,
}: {
  href: string;
  ariaLabel: string;
  primary: string;
  badge: string;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="block transition-colors"
      style={{ background: c.sand, padding: "20px 0" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = alpha(c.sand, 0.7))}
      onMouseLeave={(e) => (e.currentTarget.style.background = c.sand)}
    >
      <div
        className="teaser-banner-grid"
        style={{
          maxWidth: "min(1320px, 92vw)",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "80px 1fr 1fr",
          gap: "0 32px",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            fontWeight: 600,
            color: c.ink,
            margin: 0,
            gridColumn: "1 / 3",
          }}
        >
          {primary}
        </p>
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            color: c.accent,
            fontWeight: 600,
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 6,
          }}
        >
          <span
            style={{
              background: alpha(c.accent, 0.1),
              padding: "4px 12px",
              borderRadius: "10rem",
            }}
          >
            {badge}
          </span>
          <ArrowIcon size={14} />
        </p>
      </div>
    </a>
  );
}
