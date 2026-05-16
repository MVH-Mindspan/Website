"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type } from "@/lib/tokens";

// Match the FIRST contiguous numeric token (optional minus sign and decimal),
// e.g. "-1.5K" -> "-1.5". Falls back to rendering value as-is when no number is present.
const NUMERIC = /(-?\d+(?:\.\d+)?)/;

function formatTemplate(
  template: string,
  target: number,
  progress: number,
  isDecimal: boolean
): string {
  const match = template.match(NUMERIC);
  if (!match) return template;
  const prefix = template.slice(0, match.index);
  const suffix = template.slice((match.index ?? 0) + match[1].length);
  const current = target * progress;
  return (
    prefix +
    (isDecimal ? current.toFixed(1) : Math.round(current).toString()) +
    suffix
  );
}

export function StatCounter({
  value,
  valueShort,
  label,
}: {
  value: string;
  valueShort?: string;
  label: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();

  const numMatch = value.match(NUMERIC);
  const rawTarget = numMatch ? parseFloat(numMatch[1]) : NaN;
  const isDecimal = numMatch ? numMatch[1].includes(".") : false;
  const canAnimate =
    Number.isFinite(rawTarget) &&
    Math.abs(rawTarget) <= 1_000_000_000 &&
    rawTarget > 0;
  const target = canAnimate ? rawTarget : 0;

  // progress goes 0 -> 1 once the counter scrolls into view. Initial value of 1
  // means SSR / pre-animation renders the final number, matching prior behavior.
  const [progress, setProgress] = useState(1);
  const [counting, setCounting] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    if (!canAnimate) {
      hasAnimated.current = true;
      return;
    }
    if (reduceMotion) {
      hasAnimated.current = true;
      setProgress(1);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        obs.disconnect();

        const duration = 1200;
        const start = performance.now();
        setCounting(true);

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setProgress(eased);
          if (t < 1) requestAnimationFrame(tick);
          else {
            setProgress(1);
            setCounting(false);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [canAnimate, reduceMotion]);

  const render = (template: string) =>
    canAnimate ? formatTemplate(template, target, progress, isDecimal) : template;

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
        {valueShort ? (
          <>
            <span className="hidden sm:inline">{render(value)}</span>
            <span className="inline sm:hidden">{render(valueShort)}</span>
          </>
        ) : (
          render(value)
        )}
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
