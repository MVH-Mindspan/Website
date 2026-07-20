"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { StatCounter } from "@/components/molecules/StatCounter";
import { Reveal } from "@/components/molecules/Reveal";
import { externalLinkProps } from "@/lib/links";
import type { Stat } from "@/content/stats";
import type { Testimonial } from "@/content/testimonials";

export function StatsBand({
  stats,
  tone = "sand",
  testimonial,
}: {
  stats: readonly Stat[];
  tone?: "sand" | "cream";
  testimonial?: Testimonial;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  const [first, second, ...rest] = stats;
  const bg = tone === "cream" ? c.cream : c.sand;
  const cardBg = tone === "cream" ? c.sand : c.cream;

  if (stats.length === 0) return null;

  return (
    <section
      data-analytics-location="stats_band"
      style={{ background: bg, padding: "clamp(48px, 8vw, 72px) 0" }}
    >
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
            className="stats-comparison v2-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 0,
              background: alpha(cardBg, 0.7),
              borderRadius: "1.5rem",
              padding: "clamp(28px, 5vw, 40px) clamp(24px, 5vw, 48px)",
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

        {testimonial && (
          <Reveal delay={1} style={{ marginTop: -16, textAlign: "center" }}>
            <figure style={{ margin: 0 }}>
              <blockquote
                style={{
                  fontFamily: theme.fonts.accent,
                  fontStyle: "italic",
                  fontSize: typeScale.leadMd,
                  color: alpha(c.ink, 0.82),
                  lineHeight: 1.45,
                  maxWidth: "48ch",
                  marginInline: "auto",
                  textWrap: "pretty",
                }}
              >
                “{testimonial.quote}”
              </blockquote>
              <figcaption
                style={{
                  marginTop: 10,
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  color: alpha(c.ink, 0.72),
                }}
              >
                {testimonial.name} · {testimonial.relation}
              </figcaption>
            </figure>
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
                <StatCounter value={s.value} valueShort={s.valueShort} label={s.label} />
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
            justify-content: center !important;
            padding: 0 !important;
            gap: 12px !important;
          }
          :global(.stats-comparison-line) {
            width: 32px !important;
            height: 1px !important;
          }
          :global(.stats-comparison .comparison-stat) {
            text-align: center !important;
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

// Range pattern: "2–3 weeks", "1-5 days" (handles en-dash, em-dash, hyphen).
const RANGE_PATTERN = /^(.*?)(\d[\d.]*)(\s*[–—-]\s*)(\d[\d.]*)(.*)$/;
// Single-number pattern: "12+ months", "98%", "1,200 patients".
const SINGLE_PATTERN = /(\d[\d.]*)/;

function formatComparisonValue(template: string, progress: number): string {
  const range = template.match(RANGE_PATTERN);
  if (range) {
    const [, prefix, n1Str, sep, n2Str, suffix] = range;
    const n1 = parseFloat(n1Str);
    const n2 = parseFloat(n2Str);
    const isDec = n1Str.includes(".") || n2Str.includes(".");
    const fmt = (n: number) =>
      isDec ? n.toFixed(1) : Math.round(n).toString();
    return prefix + fmt(n1 * progress) + sep + fmt(n2 * progress) + suffix;
  }
  const numMatch = template.match(SINGLE_PATTERN);
  if (!numMatch) return template;
  const target = parseFloat(numMatch[1]);
  const prefix = template.slice(0, numMatch.index);
  const suffix = template.slice((numMatch.index ?? 0) + numMatch[1].length);
  const isDec = numMatch[1].includes(".");
  const cur = target * progress;
  return (
    prefix +
    (isDec ? cur.toFixed(1) : Math.round(cur).toString()) +
    suffix
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
  // progress = 1 keeps SSR and pre-animation renders at the final number.
  const [progress, setProgress] = useState(1);
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
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - t, 4);
          setProgress(e);
          if (t < 1) requestAnimationFrame(tick);
          else setProgress(1);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [stat.value]);

  const renderValue = (template: string) =>
    formatComparisonValue(template, progress);

  return (
    <div className="comparison-stat" style={{ textAlign: align }}>
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
        {stat.valueShort ? (
          <>
            <span className="hidden sm:inline">{renderValue(stat.value)}</span>
            <span className="inline sm:hidden">{renderValue(stat.valueShort)}</span>
          </>
        ) : (
          renderValue(stat.value)
        )}
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
      {stat.link && (
        <a
          href={stat.link.href}
          {...externalLinkProps(stat.link.href)}
          style={{
            display: "inline-block",
            marginTop: 6,
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            color: c.brandGreen,
            textDecoration: "underline",
            textUnderlineOffset: "0.2em",
            textDecorationThickness: "1px",
            textDecorationColor: alpha(c.brandGreen, 0.4),
          }}
        >
          {stat.link.label}
        </a>
      )}
    </div>
  );
}
