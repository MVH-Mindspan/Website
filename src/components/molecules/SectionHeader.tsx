"use client";

import type { CSSProperties } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { linkifyNeurologists } from "@/lib/linkify";
import { Reveal } from "./Reveal";

type Tone = "dark" | "light";
type Align = "left" | "center";

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  divided = false,
  maxWidth = "max-w-3xl",
  eyebrowColor,
  className,
  style,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: Align;
  tone?: Tone;
  divided?: boolean;
  maxWidth?: string;
  eyebrowColor?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  const titleColor = tone === "light" ? c.cream : c.ink;
  const leadColor =
    tone === "light" ? alpha(c.cream, 0.65) : alpha(c.ink, 0.7);
  const resolvedEyebrowColor = eyebrowColor ?? c.accentText;
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  const header = (
    <>
      {divided ? (
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
      )}
      <Heading
        as="h2"
        variant="h2"
        color={titleColor}
        fontFamily={theme.fonts.heading}
        className="mt-4 text-balance"
      >
        {linkifyNeurologists(title)}
      </Heading>
      {lead && (
        <Lead
          size="lg"
          color={leadColor}
          maxWidth={align === "center" ? "58ch" : "62ch"}
          className="mt-5"
          style={align === "center" ? { marginInline: "auto" } : undefined}
        >
          {linkifyNeurologists(lead)}
        </Lead>
      )}
    </>
  );

  return (
    <Reveal
      className={`${maxWidth} ${alignClass} ${className ?? ""}`.trim()}
      style={style}
    >
      {header}
    </Reveal>
  );
}
