"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { ANALYTICS_EVENTS, funnelFor, track } from "@/lib/analytics";

type Action = { label: string; href: string; ariaLabel?: string };

type Props = {
  call: Action;
  assessment: Action;
  book: Action;
};

/**
 * Fixed bottom action bar, mobile only. Slides in once the visitor scrolls
 * past the hero (which has its own CTAs) and slides away near the bottom of
 * the page (where FinalCTA takes over). Fixed positioning means it never
 * shifts layout.
 */
export function MobileActionBar({ call, assessment, book }: Props) {
  const { theme } = useTheme();
  const c = theme.colors;
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const pastHero = window.scrollY > window.innerHeight * 0.7;
    const nearBottom =
      window.innerHeight + window.scrollY >
      document.documentElement.scrollHeight - 640;
    setVisible(pastHero && !nearBottom);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const trackTap = (variant: string, action: Action) =>
    track(ANALYTICS_EVENTS.ctaClicked, {
      location: "mobile_action_bar",
      variant,
      funnel: funnelFor(action.href),
      label: action.label,
      href: action.href,
    });

  const itemBase = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 48,
    minWidth: 0,
    padding: "12px 8px",
    borderRadius: "10rem",
    fontFamily: theme.fonts.body,
    fontSize: typeScale.bodySm,
    fontWeight: 600,
    textDecoration: "none",
    whiteSpace: "nowrap",
  } as const;

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-[900]"
      data-analytics-location="mobile_action_bar"
      aria-label="Quick actions"
      role="navigation"
      style={{
        background: c.primary,
        borderTop: `1px solid ${alpha(c.cream, 0.14)}`,
        boxShadow: "0 -8px 32px -12px rgba(0,0,0,0.35)",
        padding: "10px 10px calc(10px + env(safe-area-inset-bottom))",
        transform: visible ? "translateY(0)" : "translateY(110%)",
        visibility: visible ? "visible" : "hidden",
        transition: reduceMotion
          ? "visibility 0s"
          : "transform 0.3s ease, visibility 0.3s",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto minmax(0, 1fr) auto",
          gap: 6,
          maxWidth: 560,
          marginInline: "auto",
        }}
      >
        <a
          href={call.href}
          aria-label={call.ariaLabel}
          onClick={() => trackTap("phone", call)}
          style={{
            ...itemBase,
            color: c.cream,
            border: `1px solid ${alpha(c.cream, 0.4)}`,
            background: "transparent",
            paddingInline: 12,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 2.5h2.4l1.2 3-1.6 1a8 8 0 0 0 4.5 4.5l1-1.6 3 1.2V13a.5.5 0 0 1-.5.5A11 11 0 0 1 2.5 3a.5.5 0 0 1 .5-.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          {call.label}
        </a>
        <a
          href={assessment.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTap("primary", assessment)}
          style={{
            ...itemBase,
            color: c.brandGreen,
            background: "#fff",
          }}
        >
          {assessment.label}
        </a>
        <a
          href={book.href}
          onClick={() => trackTap("secondary", book)}
          style={{
            ...itemBase,
            color: c.cream,
            border: `1px solid ${alpha(c.cream, 0.4)}`,
            background: "transparent",
            paddingInline: 12,
          }}
        >
          {book.label}
        </a>
      </div>
    </div>
  );
}
