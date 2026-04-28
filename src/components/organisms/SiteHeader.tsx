"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ease, type as typeScale } from "@/lib/tokens";
import { brand } from "@/content/brand";
import { nav, audienceNav } from "@/content/nav";

export function SiteHeader() {
  const { theme } = useTheme();
  const c = theme.colors;
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.6);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] flex items-center justify-between"
      style={{
        width: "min(1320px, 92vw)",
        background: "#201E17",
        borderRadius: "10rem",
        padding: scrolled ? "8px 12px 8px 24px" : "12px 12px 12px 24px",
        boxShadow: scrolled
          ? "0 8px 32px -8px rgba(0,0,0,0.3)"
          : "0 4px 16px -8px rgba(0,0,0,0.2)",
        transition: `padding 0.4s ${ease.expressive}, box-shadow 0.4s ease`,
      }}
    >
      <a
        href="/"
        className="font-extrabold uppercase tracking-tight"
        style={{
          fontFamily: theme.fonts.body,
          fontSize: "clamp(1.2rem, 1.05rem + 0.5vw, 1.5rem)",
          color: c.cream,
          letterSpacing: "-0.01em",
        }}
      >
        {brand.name}
      </a>

      <ul className="hidden md:flex items-center gap-8">
        {nav.map((n) => (
          <li key={n.label}>
            <a
              href={n.href}
              className="transition-colors"
              style={{
                fontFamily: theme.fonts.body,
                fontSize: typeScale.bodySm,
                fontWeight: 450,
                color: alpha(c.cream, 0.7),
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = c.cream)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = alpha(c.cream, 0.7))
              }
            >
              {n.label}
            </a>
          </li>
        ))}

        {[audienceNav.providers].map((n) => (
          <li key={n.label}>
            <a
              href={n.href}
              className="transition-colors"
              style={{
                fontFamily: theme.fonts.body,
                fontSize: typeScale.bodySm,
                fontWeight: 450,
                color: alpha(c.cream, 0.7),
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = c.cream)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = alpha(c.cream, 0.7))
              }
            >
              {n.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <a
          href={brand.phoneHref}
          className="hidden md:inline-flex items-center gap-2 font-semibold transition-colors"
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            color: alpha(c.cream, 0.85),
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = c.cream)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = alpha(c.cream, 0.85))
          }
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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
        <a
          href={brand.primaryCtaHref}
          className="font-semibold transition-all"
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            color: c.brandGreen,
            background: "#fff",
            padding: "12px 24px",
            borderRadius: "10rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = c.cream)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          Book an appointment
        </a>
      </div>
    </nav>
  );
}
