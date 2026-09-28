"use client";

/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { externalLinkProps } from "@/lib/links";
import type { JourneyStage } from "@/content/journey";

export function EditorialStages({
  stages,
  intro,
  tone = "cream",
  align = "left",
  visuals,
}: {
  stages: readonly JourneyStage[];
  intro?: { eyebrow: string; title: string; lead: string };
  tone?: "sand" | "cream";
  align?: "left" | "center";
  /** Optional per-stage visual (by index) rendered instead of the stage image. */
  visuals?: readonly ReactNode[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const bg = tone === "sand" ? c.sand : c.cream;

  if (stages.length === 0 && !intro) return null;

  return (
    <section style={{ background: bg, color: c.ink, padding: "48px 0" }}>
      <div style={{ maxWidth: "min(1320px, 92vw)", marginInline: "auto" }}>
        {intro && (
          <div style={{ padding: "48px 0 24px" }}>
            <SectionHeader
              eyebrow={intro.eyebrow}
              title={intro.title}
              lead={intro.lead}
              align={align}
            />
          </div>
        )}
        {stages.map((step, i) => (
          <Reveal
            key={step.title}
            className="stage-row group"
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr",
              gap: "0 32px",
              padding: "48px 0",
              borderBottom:
                i < stages.length - 1 ? `1px solid ${c.sand}` : "none",
              position: "relative",
              animationDelay: `${i * 80}ms`,
            }}
          >
            <div
              className="flex flex-col items-center"
              style={{ paddingTop: 8 }}
            >
              <div
                className="stage-num flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0 transition-all duration-300"
                style={{
                  fontFamily: theme.fonts.body,
                  width: 36,
                  height: 36,
                  border: `1.5px solid ${c.brandGreen}`,
                  color: c.brandGreen,
                  background: c.skySoft,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              {i < stages.length - 1 && (
                <div
                  className="flex-1"
                  style={{
                    width: 1,
                    background: `linear-gradient(to bottom, ${alpha(
                      c.brandGreen,
                      0.25
                    )}, ${alpha(c.sky, 0.4)})`,
                    marginTop: 12,
                  }}
                />
              )}
            </div>

            <div className="sm:pr-8">
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.micro,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: c.accentText,
                  marginBottom: 12,
                }}
              >
                {step.kicker}
              </p>
              <h3
                style={{
                  textWrap: "balance",
                  fontFamily: theme.fonts.heading,
                  fontSize: typeScale.h3,
                  fontWeight: 500,
                  marginBottom: 4,
                  lineHeight: 1.15,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.leadMd,
                  color: alpha(c.ink, 0.65),
                  lineHeight: 1.55,
                  maxWidth: "42ch",
                }}
              >
                {step.body}
              </p>
              {step.cta && (
                <a
                  href={step.cta.href}
                  {...externalLinkProps(step.cta.href)}
                  className="inline-flex items-center justify-center text-center gap-2 font-semibold transition-all prox-cta mt-6"
                  data-proximity=""
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    padding: "12px clamp(18px, 5vw, 24px)",
                    background: c.brandGreen,
                    color: "#fff",
                    borderRadius: "10rem",
                  }}
                >
                  {step.cta.label} <ArrowIcon />
                  {externalLinkProps(step.cta.href).target === "_blank" && (
                    <span className="sr-only"> (opens in new tab)</span>
                  )}
                </a>
              )}
              {step.link && (
                <a
                  href={step.link.href}
                  {...externalLinkProps(step.link.href)}
                  style={{
                    display: "block",
                    width: "fit-content",
                    // 10px padding + matching negative margins: 44px touch target, same layout.
                    padding: "10px 0",
                    margin: `${step.cta ? 6 : 14}px 0 -10px`,
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    color: c.brandGreen,
                    textDecoration: "underline",
                    textUnderlineOffset: "0.2em",
                    textDecorationThickness: "1px",
                    textDecorationColor: alpha(c.brandGreen, 0.4),
                  }}
                >
                  {step.link.label}
                </a>
              )}
            </div>

            <div className={`flex flex-col justify-center ${visuals?.[i] ? "stage-visual" : "stage-image"}`}>
              {visuals?.[i] ? (
                visuals[i]
              ) : step.image && (
                <ImageFrame radius="1rem">
                  <img
                    src={step.image}
                    alt={step.imageAlt ?? step.title}
                    className="w-full object-cover aspect-[4/3] sm:aspect-[16/10]"
                    loading="lazy"
                  />
                </ImageFrame>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
