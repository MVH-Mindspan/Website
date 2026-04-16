"use client";

import { useTheme } from "@/lib/theme-context";
import { StatCounter } from "@/components/molecules/StatCounter";
import { Reveal } from "@/components/molecules/Reveal";
import type { Stat } from "@/content/stats";

export function StatsBand({ stats }: { stats: readonly Stat[] }) {
  const { theme } = useTheme();
  return (
    <section style={{ background: theme.colors.sand, padding: "64px 0" }}>
      <Reveal
        className="stats-grid"
        style={{
          maxWidth: "min(1320px, 92vw)",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
        }}
      >
        {stats.map((s) => (
          <StatCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </Reveal>
    </section>
  );
}
