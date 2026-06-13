"use client";

import type { CSSProperties } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Grid, GridCol } from "@/components/atoms/Grid";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { measure } from "@/lib/tokens";
import { linkifyNeurologists } from "@/lib/linkify";
import { Reveal } from "./Reveal";

type Tone = "dark" | "light";
type Align = "left" | "center";
/**
 * "stack" — eyebrow / heading / lead stacked (default).
 * "split" — editorial two-block grid: eyebrow + heading on the left columns,
 *           lead on the right columns, bottom-aligned (magazine masthead).
 */
type Layout = "stack" | "split";

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  divided = false,
  layout = "stack",
  maxWidth = "max-w-3xl",
  eyebrowColor,
  className,
  style,
  linkify = true,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: Align;
  tone?: Tone;
  divided?: boolean;
  layout?: Layout;
  maxWidth?: string;
  eyebrowColor?: string;
  className?: string;
  style?: CSSProperties;
  linkify?: boolean;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  const titleColor = tone === "light" ? c.cream : c.ink;
  const leadColor =
    tone === "light" ? alpha(c.cream, 0.65) : alpha(c.ink, 0.7);
  const resolvedEyebrowColor = eyebrowColor ?? c.accentText;
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  const eyebrowNode =
    divided ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
            // On narrow viewports, allow the eyebrow to wrap onto its own row
            // rather than crushing the dividers when the label is long.
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              height: 1,
              flex: 1,
              minWidth: 24,
              background:
                tone === "light" ? alpha(c.cream, 0.18) : alpha(c.ink, 0.15),
            }}
          />
          <Eyebrow
            color={resolvedEyebrowColor}
            style={{ margin: 0, flexShrink: 0, maxWidth: "100%" }}
          >
            {eyebrow}
          </Eyebrow>
          <div
            style={{
              height: 1,
              flex: 1,
              minWidth: 24,
              background:
                tone === "light" ? alpha(c.cream, 0.18) : alpha(c.ink, 0.15),
            }}
          />
        </div>
      ) : (
        <Eyebrow color={resolvedEyebrowColor}>{eyebrow}</Eyebrow>
      );

  const headingNode = (
    <Heading
      as="h2"
      variant="h2"
      color={titleColor}
      fontFamily={theme.fonts.heading}
      className="mt-4 text-balance"
    >
      {linkify ? linkifyNeurologists(title) : title}
    </Heading>
  );

  if (layout === "split") {
    // Editorial masthead: title block on the left columns, lede on the right,
    // both pinned to the same baseline. Stacks below `md` via the Grid atom.
    return (
      <Reveal className={className} style={style}>
        <Grid style={{ alignItems: "end", rowGap: "20px" }}>
          <GridCol span={7}>
            {eyebrowNode}
            {headingNode}
          </GridCol>
          <GridCol span={5}>
            {lead && (
              <Lead size="lg" color={leadColor} maxWidth={measure.lead}>
                {linkify ? linkifyNeurologists(lead) : lead}
              </Lead>
            )}
          </GridCol>
        </Grid>
      </Reveal>
    );
  }

  return (
    <Reveal
      className={`${maxWidth} ${alignClass} ${className ?? ""}`.trim()}
      style={style}
    >
      {eyebrowNode}
      {headingNode}
      {lead && (
        <Lead
          size="lg"
          color={leadColor}
          maxWidth={align === "center" ? measure.leadCentered : measure.lead}
          className="mt-5"
          style={align === "center" ? { marginInline: "auto" } : undefined}
        >
          {linkify ? linkifyNeurologists(lead) : lead}
        </Lead>
      )}
    </Reveal>
  );
}
