"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Reveal } from "@/components/molecules/Reveal";

export function EditorialIntro({
  title,
  lead,
}: {
  title: string;
  lead: string;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      className="relative"
      style={{
        background: "#201E17",
        color: c.cream,
        padding: "56px 0",
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))",
        }}
      />
      <Reveal
        className="editorial-grid"
        style={{
          maxWidth: "min(1320px, 92vw)",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "80px 1fr 1fr",
          gap: "0 32px",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: theme.fonts.heading,
            fontSize: typeScale.h2,
            fontWeight: 400,
            lineHeight: 1.15,
            gridColumn: "1 / 3",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.leadMd,
            color: alpha(c.cream, 0.7),
            lineHeight: 1.6,
            maxWidth: "42ch",
          }}
        >
          {lead}
        </p>
      </Reveal>
    </section>
  );
}
