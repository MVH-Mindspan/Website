"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type } from "@/lib/tokens";

// Match the FIRST contiguous numeric token (optional minus sign and decimal),
// e.g. "-1.5K" -> "-1.5". Falls back to rendering value as-is when no number is present.
const NUMERIC = /(-?\d+(?:\.\d+)?)/;

export function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const [counting, setCounting] = useState(false);
  const hasAnimated = useRef(false);
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    if (reduceMotion) {
      // Show final number immediately, no count-up.
      hasAnimated.current = true;
      setDisplayed(value);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        obs.disconnect();

        const match = value.match(NUMERIC);
        if (!match) {
          setDisplayed(value);
          return;
        }
        const target = parseFloat(match[1]);
        // Guard against NaN, ±Infinity, or absurdly large values that would
        // jitter layout while counting up.
        if (
          !Number.isFinite(target) ||
          Math.abs(target) > 1_000_000_000
        ) {
          setDisplayed(value);
          return;
        }
        const prefix = value.slice(0, match.index);
        const suffix = value.slice((match.index ?? 0) + match[1].length);
        const isDecimal = match[1].includes(".");
        // 0 or negative starting target: nothing meaningful to count up to.
        if (target <= 0) {
          setDisplayed(value);
          return;
        }
        const duration = 1200;
        const start = performance.now();
        setCounting(true);

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
          else {
            setDisplayed(value);
            setCounting(false);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, reduceMotion]);

  return (
    <div>
      <p
        ref={ref}
        // While counting, hide the intermediate frames from screen readers.
        // Once settled, expose the final number politely so AT picks it up
        // without interrupting whatever the user is doing.
        aria-hidden={counting ? true : undefined}
        aria-live={counting ? undefined : "polite"}
        aria-atomic="true"
        style={{
          fontFamily: theme.fonts.heading,
          fontSize: type.h2,
          fontWeight: 500,
          lineHeight: 1,
          marginBottom: 8,
          color: theme.colors.brandGreen,
          // Stop very large numbers from blowing out narrow columns.
          overflowWrap: "anywhere",
        }}
      >
        {displayed}
      </p>
      <p
        style={{
          fontFamily: theme.fonts.body,
          fontSize: type.body,
          color: alpha(theme.colors.ink, 0.72),
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
    </div>
  );
}
