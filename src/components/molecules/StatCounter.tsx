"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type, lineHeight } from "@/lib/tokens";

export function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const hasAnimated = useRef(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      hasAnimated.current = true;
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        obs.disconnect();

        const match = value.match(/([\d.]+)/);
        if (!match) {
          setDisplayed(value);
          return;
        }
        const target = parseFloat(match[1]);
        const prefix = value.slice(0, match.index);
        const suffix = value.slice((match.index ?? 0) + match[1].length);
        const isDecimal = match[1].includes(".");
        const duration = 1200;
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          const current = target * eased;
          setDisplayed(
            prefix +
              (isDecimal ? current.toFixed(1) : Math.round(current).toString()) +
              suffix
          );
          if (t < 1) requestAnimationFrame(tick);
          else setDisplayed(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div>
      <p
        ref={ref}
        style={{
          fontFamily: theme.fonts.heading,
          fontSize: type.h2,
          fontWeight: 500,
          lineHeight: 1,
          marginBottom: 8,
          color: theme.colors.brandGreen,
        }}
      >
        {displayed}
      </p>
      <p
        style={{
          fontFamily: theme.fonts.body,
          fontSize: type.bodySm,
          color: alpha(theme.colors.ink, 0.6),
          lineHeight: lineHeight.eyebrow,
        }}
      >
        {label}
      </p>
    </div>
  );
}
