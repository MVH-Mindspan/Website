"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { StatCounter } from "@/components/molecules/StatCounter";
import { Reveal } from "@/components/molecules/Reveal";
import type { Stat } from "@/content/stats";

export function StatsBand({ stats }: { stats: readonly Stat[] }) {
  const { theme } = useTheme();
  const c = theme.colors;

  const [first, second, ...rest] = stats;

  return (
    <section style={{ background: c.sand, padding: "72px 0" }}>
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
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 0,
              background: c.cream,
              borderRadius: "1.5rem",
              padding: "40px 48px",
              border: `1px solid ${alpha(c.ink, 0.07)}`,
            }}
          >
            <ComparisonStat stat={first} align="left" highlight />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "0 40px",
              }}
            >
              <div
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
                  color: alpha(c.ink, 0.35),
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                vs
              </span>
              <div
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
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${rest.length}, 1fr)`,
              gap: 32,
            }}
          >
            {rest.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </Reveal>
        )}
      </div>
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

  return (
    <div style={{ textAlign: align }}>
      <p
        style={{
          fontFamily: theme.fonts.heading,
          fontSize: typeScale.h1,
          fontWeight: 500,
          lineHeight: 1,
          color: highlight ? c.brandGreen : alpha(c.ink, 0.35),
          marginBottom: 12,
        }}
      >
        {stat.value}
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
