"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ease, type as typeScale } from "@/lib/tokens";
import { brand } from "@/content/brand";
import { nav } from "@/content/nav";

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
        background: scrolled ? alpha("#201E17", 0.96) : alpha("#201E17", 0.88),
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "10rem",
        padding: scrolled ? "8px 12px 8px 24px" : "12px 12px 12px 24px",
        boxShadow: scrolled ? "0 8px 32px -8px rgba(0,0,0,0.3)" : "none",
        transition: `padding 0.4s ${ease.expressive}, background 0.4s ease, box-shadow 0.4s ease`,
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
      </ul>
      <div className="flex items-center gap-2">
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
          {brand.primaryCta}
        </a>
      </div>
    </nav>
  );
}
