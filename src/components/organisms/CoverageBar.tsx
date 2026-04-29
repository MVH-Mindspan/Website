"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { brand } from "@/content/brand";

export function CoverageBar() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <div
      role="complementary"
      aria-label="Insurance coverage and phone"
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-center flex-wrap"
      style={{
        minHeight: 36,
        background: c.sand,
        borderBottom: `1px solid ${alpha(c.ink, 0.08)}`,
        color: c.ink,
        fontFamily: theme.fonts.body,
        fontSize: typeScale.bodySm,
        fontWeight: 500,
        letterSpacing: "0.005em",
        gap: 14,
        padding: "6px 16px",
      }}
    >
      <span className="inline-flex items-center" style={{ gap: 8 }}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{ flexShrink: 0 }}
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke={c.brandGreen}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Covered by Medicare and most Medicare Advantage plans</span>
      </span>
      <span
        aria-hidden
        className="hidden sm:inline-block"
        style={{ width: 1, height: 14, background: alpha(c.ink, 0.2) }}
      />
      <a
        href={brand.phoneHref}
        className="inline-flex items-center transition-colors"
        style={{
          gap: 8,
          color: c.brandGreen,
          fontWeight: 600,
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = c.ink)}
        onMouseLeave={(e) => (e.currentTarget.style.color = c.brandGreen)}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{ flexShrink: 0 }}
        >
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {brand.phone}
      </a>
    </div>
  );
}
