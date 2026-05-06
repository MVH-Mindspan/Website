"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { StatCounter } from "@/components/molecules/StatCounter";
import { Reveal } from "@/components/molecules/Reveal";
import type { Stat } from "@/content/stats";

export function StatsBand({
  stats,
  tone = "sand",
}: {
  stats: readonly Stat[];
  tone?: "sand" | "cream";
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  const [first, second, ...rest] = stats;
  const bg = tone === "cream" ? c.cream : c.sand;
  const cardBg = tone === "cream" ? c.sand : c.cream;

  if (stats.length === 0) return null;

  return (
    <section style={{ background: bg, padding: "clamp(48px, 8vw, 72px) 0" }}>
      <div
        style={{
          maxWidth: "min(1320px, 92vw)",
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 48,
        }}
      >
        {first && second && (
          <Reveal
            className="stats-comparison"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 0,
              background: cardBg,
              borderRadius: "1.5rem",
              padding: "clamp(28px, 5vw, 40px) clamp(24px, 5vw, 48px)",
              border: `1px solid ${alpha(c.ink, 0.07)}`,
            }}
          >
            <ComparisonStat stat={first} align="left" highlight />
            <div
              className="stats-comparison-divider"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "0 clamp(16px, 4vw, 40px)",
              }}
            >
              <div
                className="stats-comparison-line"
                style={{
                  width: 1,
                  height: 40,
                  background: alpha(c.ink, 0.15),
                }}
              />
              <span
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  fontWeight: 700,
                  color: alpha(c.ink, 0.55),
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                vs
              </span>
              <div
                className="stats-comparison-line"
                style={{
                  width: 1,
                  height: 40,
                  background: alpha(c.ink, 0.15),
                }}
              />
            </div>
            <ComparisonStat stat={second} align="right" />
          </Reveal>
        )}

        {rest.length > 0 && (
          <Reveal
            className="stats-rest"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${rest.length}, 1fr)`,
              gap: 32,
            }}
          >
            {rest.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <StatCounter value={s.value} label={s.label} />
              </div>
            ))}
          </Reveal>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          :global(.stats-comparison) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          :global(.stats-comparison-divider) {
            flex-direction: row !important;
            padding: 0 !important;
            gap: 12px !important;
          }
          :global(.stats-comparison-line) {
            width: 32px !important;
            height: 1px !important;
          }
          :global(.stats-rest) {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 380px) {
          :global(.stats-rest) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ComparisonStat({
  stat,
  align,
  highlight,
}: {
  stat: Stat;
  align: "left" | "right";
  highlight?: boolean;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const isRight = align === "right";

  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState(stat.value);
  const hasAnimated = useRef(false);

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

        const duration = 1400;
        const start = performance.now();

        // Range pattern: "2–3 wks", "1-5 days" (handles en-dash, em-dash, hyphen)
        const rangeMatch = stat.value.match(
          /^(.*?)(\d[\d.]*)(\s*[–—-]\s*)(\d[\d.]*)(.*)$/
        );
        if (rangeMatch) {
          const [, prefix, n1Str, sep, n2Str, suffix] = rangeMatch;
          const n1 = parseFloat(n1Str);
          const n2 = parseFloat(n2Str);
          const isDec = n1Str.includes(".") || n2Str.includes(".");
          const fmt = (n: number) =>
            isDec ? n.toFixed(1) : Math.round(n).toString();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const e = 1 - Math.pow(1 - t, 4);
            setDisplayed(prefix + fmt(n1 * e) + sep + fmt(n2 * e) + suffix);
            if (t < 1) requestAnimationFrame(tick);
            else setDisplayed(stat.value);
          };
          requestAnimationFrame(tick);
          return;
        }

        // Single-number pattern: "12+ months", "98%", "1,200 patients"
        const numMatch = stat.value.match(/(\d[\d.]*)/);
        if (!numMatch) {
          setDisplayed(stat.value);
          return;
        }
        const target = parseFloat(numMatch[1]);
        const prefix = stat.value.slice(0, numMatch.index);
        const suffix = stat.value.slice(
          (numMatch.index ?? 0) + numMatch[1].length
        );
        const isDec = numMatch[1].includes(".");
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - t, 4);
          const cur = target * e;
          setDisplayed(
            prefix +
              (isDec ? cur.toFixed(1) : Math.round(cur).toString()) +
              suffix
          );
          if (t < 1) requestAnimationFrame(tick);
          else setDisplayed(stat.value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [stat.value]);

  return (
    <div style={{ textAlign: align }}>
      <p
        ref={ref}
        style={{
          fontFamily: theme.fonts.heading,
          fontSize: typeScale.h1,
          fontWeight: 500,
          lineHeight: 1,
          color: highlight ? c.brandGreen : alpha(c.ink, 0.35),
          marginBottom: 12,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {displayed}
      </p>
      <p
        style={{
          fontFamily: theme.fonts.body,
          fontSize: typeScale.body,
          color: isRight ? alpha(c.ink, 0.5) : alpha(c.ink, 0.72),
          lineHeight: 1.4,
          fontWeight: isRight ? 400 : 500,
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}
