"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale, container, measure } from "@/lib/tokens";
import { Grid, GridCol } from "@/components/atoms/Grid";
import { Reveal } from "@/components/molecules/Reveal";

export function EditorialIntro({
  title,
  lead,
  id,
}: {
  title: string;
  lead: string;
  id?: string;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      id={id}
      className="relative"
      style={{
        background: c.primary,
        color: c.cream,
        padding: "clamp(40px, 7vw, 56px) 0",
        scrollMarginTop: "96px",
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))",
        }}
      />
      <Reveal style={{ maxWidth: container.width, marginInline: "auto" }}>
        {/* Two-block editorial split on the modular grid: heading on cols 1-5,
            lede on cols 7-12, leaving col 6 as a true gutter between them. */}
        <Grid style={{ alignItems: "center" }}>
          <GridCol
            span={5}
            as="h2"
            style={{
              fontFamily: theme.fonts.heading,
              fontSize: typeScale.h2,
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            {title}
          </GridCol>
          <GridCol
            span={6}
            start={7}
            as="p"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.leadMd,
              color: alpha(c.cream, 0.7),
              lineHeight: 1.6,
              maxWidth: measure.lead,
            }}
          >
            {lead}
          </GridCol>
        </Grid>
      </Reveal>
    </section>
  );
}
