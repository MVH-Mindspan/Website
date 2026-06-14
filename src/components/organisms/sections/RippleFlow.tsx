"use client";

import type { CSSProperties } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale, ease, tracking } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionIcon, type Icon } from "./icons";

export type RippleStep = {
  /** Short pill label, e.g. "Free screening". */
  label: string;
  /** Line icon shown inside the node circle. */
  icon: Icon;
  /** Marks the climax node (warm accent + soft pulse). Default false. */
  accent?: boolean;
};

export type RippleVariant = "ripple" | "rail" | "rings";

export function RippleFlow({
  steps,
  intro,
  variant = "ripple",
  tone = "cream",
  cta,
}: {
  steps: readonly RippleStep[];
  intro: { title: string; caption?: string; eyebrow?: string };
  variant?: RippleVariant;
  /** "primary" is the dark teal feature band; sand / cream are light. */
  tone?: "sand" | "cream" | "primary";
  /** Optional call to action rendered below the caption. */
  cta?: { label: string; href: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const isDark = tone === "primary";
  const bg = isDark ? c.primary : tone === "sand" ? c.sand : c.cream;

  // Text + connector colors flip for the dark band.
  const textColor = isDark ? c.cream : c.ink;
  // On dark green the eyebrow uses the brand "baby blue" accent (#A8D2FB, the
  // --color-highlight token, matching FinalCTA) — orange text is unreadable on
  // dark green. Orange stays reserved for the filled climax + glows.
  const eyebrowColor = isDark ? "#A8D2FB" : c.accentText;
  const captionColor = isDark ? alpha(c.cream, 0.72) : alpha(c.ink, 0.62);

  // Diagram accent (climax disc, rail end, glows): brand "baby blue" on the dark
  // green band, warm orange on light tones. On dark green orange reads as a rule
  // violation, so the whole diagram accent switches to blue, not just text.
  const dAccent = isDark ? "#A8D2FB" : c.accent;

  if (steps.length === 0) return null;

  // Per-node visuals. Muted nodes escalate gently within the sand family; only
  // the accent node switches palette so it lands as a hopeful arrival.
  const nodes = steps.map((s, i) => {
    const isAccent = !!s.accent;
    const t = steps.length > 1 ? i / (steps.length - 1) : 0;
    const haloA = 0.3 + 0.16 * t; // 0.30 -> 0.46 toward the climax

    const halo = isAccent
      ? `radial-gradient(circle at 50% 45%, ${alpha(dAccent, 0.42)} 0%, ${alpha(
          dAccent,
          0.16
        )} 46%, ${alpha(dAccent, 0)} 72%)`
      : `radial-gradient(circle at 50% 45%, ${alpha(c.sky, haloA)} 0%, ${alpha(
          c.sky,
          haloA * 0.4
        )} 46%, ${alpha(c.sky, 0)} 72%)`;

    // On dark the climax is a solid accent disc; baby blue is light, so its glyph
    // must be dark (teal). On light it is a soft warm tint with a dark-orange
    // glyph. Muted nodes stay light discs (they pop on dark too).
    const circleBg = isAccent ? (isDark ? dAccent : alpha(c.accent, 0.14)) : c.skySoft;
    const iconColor = isAccent ? (isDark ? c.primary : c.accentText) : c.brandGreen;

    const ringShadow = isAccent
      ? `inset 0 0 0 1.5px ${alpha(dAccent, isDark ? 0.9 : 0.5)}, 0 14px 32px ${alpha(
          dAccent,
          isDark ? 0.4 : 0.22
        )}`
      : `inset 0 0 0 1px ${alpha(c.brandGreen, 0.12)}`;
    const ringsShadow = isAccent
      ? `0 0 0 7px ${alpha(dAccent, 0.16)}, 0 0 0 16px ${alpha(dAccent, 0.07)}, 0 12px 30px ${alpha(dAccent, 0.22)}`
      : `0 0 0 7px ${alpha(c.sky, 0.2)}, 0 0 0 16px ${alpha(c.sky, 0.09)}`;

    const circleShadow = variant === "rings" ? ringsShadow : ringShadow;

    // Pill placement: ripple alternates above/below; rail + rings sit below.
    const pillPos = variant === "ripple" ? (i % 2 === 0 ? "top" : "bottom") : "bottom";

    // Climax pill: outlined in the diagram accent. Baby blue text would be
    // unreadable on white, so on the dark band the text falls back to ink and
    // the blue shows in the ring.
    const pillBg = isAccent ? c.white : isDark ? c.white : alpha(c.white, 0.78);
    const pillColor = isAccent ? (isDark ? c.ink : c.accentText) : c.ink;
    const pillRing = isAccent
      ? `inset 0 0 0 1.3px ${alpha(dAccent, isDark ? 0.9 : 0.55)}`
      : `inset 0 0 0 1px ${alpha(c.brandGreen, 0.18)}`;

    return {
      ...s,
      isAccent,
      halo,
      circleBg,
      iconColor,
      circleShadow,
      pillPos,
      pillBg,
      pillColor,
      pillRing,
    };
  });

  const rootStyle = {
    background: bg,
    color: textColor,
    position: "relative",
    overflow: "hidden",
    padding: "clamp(64px, 9vw, 104px) 0",
    // Custom props consumed by the scoped <style> rules below.
    ["--rf-circle" as string]: "clamp(62px, 7.5vw, 82px)",
    ["--rf-ease" as string]: ease.reveal,
    ["--rf-line" as string]: isDark ? alpha(dAccent, 0.35) : alpha(c.brandGreen, 0.18),
    ["--rf-rail" as string]: isDark ? alpha(dAccent, 0.3) : alpha(c.brandGreen, 0.16),
  } as CSSProperties;

  // Rail fill / rings band start from a tone-appropriate light end and resolve
  // to the warm accent at the climax.
  // On dark the rail is a true blue gradient (translucent -> solid baby blue);
  // on light it fades the brand green into the warm accent.
  const railStart = isDark ? alpha(dAccent, 0.4) : alpha(c.brandGreen, 0.55);
  const railFill = `linear-gradient(90deg, ${railStart}, ${dAccent})`;
  const bandMid = isDark ? alpha(c.cream, 0.4) : alpha(c.skySoft, 0.6);
  const ringsBand = `linear-gradient(90deg, ${alpha(c.sky, 0.0)} 0%, ${alpha(
    isDark ? c.cream : c.sky,
    0.45
  )} 18%, ${bandMid} 55%, ${alpha(dAccent, 0.2)} 95%, ${alpha(dAccent, 0)} 100%)`;

  return (
    <section className="rf-root" style={rootStyle}>
      {isDark && (
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
        >
          <div
            className="final-glow--warm"
            style={{
              position: "absolute",
              top: -160,
              right: -160,
              width: 640,
              height: 640,
              borderRadius: "50%",
              filter: "blur(64px)",
              background: `radial-gradient(circle, ${alpha(dAccent, 0.2)} 0%, transparent 62%)`,
            }}
          />
          <div
            className="final-glow--cool"
            style={{
              position: "absolute",
              bottom: -160,
              left: -160,
              width: 560,
              height: 560,
              borderRadius: "50%",
              filter: "blur(64px)",
              background: `radial-gradient(circle, ${alpha(dAccent, 0.13)} 0%, transparent 62%)`,
            }}
          />
        </div>
      )}
      <Container style={{ position: "relative", zIndex: 1 }}>
        <Reveal className="rf-head">
          {intro.eyebrow && (
            <p
              style={{
                fontFamily: theme.fonts.body,
                fontSize: typeScale.micro,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: tracking.eyebrow,
                color: eyebrowColor,
                marginBottom: 14,
              }}
            >
              {intro.eyebrow}
            </p>
          )}
          <Heading
            as="h2"
            variant="h2"
            fontFamily={theme.fonts.heading}
            style={{ marginInline: "auto", maxWidth: "20ch" }}
          >
            {intro.title}
          </Heading>
        </Reveal>

        <div className="rf-band">
          <Reveal className={`rf-row rf-row--${variant}`}>
            {variant === "rail" && (
              <>
                <span className="rf-rail" style={{ background: "var(--rf-rail)" }} aria-hidden />
                <span className="rf-rail-fill" style={{ background: railFill }} aria-hidden />
              </>
            )}
            {variant === "rings" && (
              <span className="rf-rings-band" style={{ background: ringsBand }} aria-hidden />
            )}

            {nodes.map((n, i) => (
              <div className="rf-node" key={n.label} style={{ ["--i" as string]: i } as CSSProperties}>
                <div className="rf-cw">
                  {variant === "ripple" && (
                    <span className="rf-halo" style={{ background: n.halo }} aria-hidden />
                  )}
                  {n.isAccent && (
                    <span
                      className="rf-pulse"
                      style={{ boxShadow: `0 0 0 1.5px ${alpha(dAccent, 0.45)}` }}
                      aria-hidden
                    />
                  )}
                  <IconBadge
                    className={`rf-circle${n.isAccent ? " rf-climax" : ""}`}
                    background={n.circleBg}
                    color={n.iconColor}
                    size={82}
                    style={{
                      width: "var(--rf-circle)",
                      height: "var(--rf-circle)",
                      borderRadius: "50%",
                      boxShadow: n.circleShadow,
                    }}
                  >
                    <SectionIcon name={n.icon} />
                  </IconBadge>
                </div>
                <span
                  className={`rf-pill rf-pill--${n.pillPos}`}
                  style={{ background: n.pillBg, color: n.pillColor, boxShadow: n.pillRing }}
                >
                  {n.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        {(intro.caption || cta) && (
          <Reveal className="rf-caption-wrap">
            {intro.caption && (
              <p
                className="rf-caption"
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.leadMd,
                  color: captionColor,
                }}
              >
                {intro.caption}
              </p>
            )}
            {cta && (
              <Button
                href={cta.href}
                variant={isDark ? "secondary" : "primary"}
                size="lg"
                iconRight={<ArrowIcon />}
                className="rf-cta"
              >
                {cta.label}
              </Button>
            )}
          </Reveal>
        )}
      </Container>

      <style>{CSS}</style>
    </section>
  );
}

/* Scoped layout/motion CSS. Dynamic colors come from inline styles + custom
   properties above; this block holds only structure, the reveal-triggered
   stagger/fill, and the responsive (mobile) vertical-timeline fallback. */
const CSS = `
.rf-head { text-align: center; }
.rf-band { position: relative; max-width: 880px; margin: clamp(40px, 6vw, 64px) auto 0; }

/* The row carries the .reveal class but we neutralize its own fade and use it
   purely as the .on trigger for the per-node stagger + rail fill. */
.rf-row.reveal { opacity: 1; transform: none; transition: none; }
.rf-row {
  position: relative;
  display: flex;
  align-items: center;
  padding-block: 52px;
}
.rf-row--ripple { justify-content: center; gap: clamp(4px, 1.4vw, 18px); }
.rf-row--rail,
.rf-row--rings { justify-content: space-between; gap: 0; }

.rf-node {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s var(--rf-ease), transform 0.7s var(--rf-ease);
  transition-delay: calc(var(--i, 0) * 90ms);
}
.rf-row.on .rf-node { opacity: 1; transform: none; }

.rf-cw { position: relative; z-index: 1; display: inline-flex; }
.rf-halo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(var(--rf-circle) * 2);
  height: calc(var(--rf-circle) * 2);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.rf-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: rf-pulse 3.2s var(--rf-ease) infinite;
}
@keyframes rf-pulse {
  0%   { transform: scale(1);   opacity: 0.55; }
  70%  { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* Pills — absolute above/below the circle on desktop; reserved space comes from
   the row's padding-block. */
.rf-pill {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  padding: 5px 13px;
  border-radius: 10rem;
  font-size: 0.8125rem;
  font-weight: 600;
  max-width: 13rem;
  z-index: 2;
}
.rf-pill--top { bottom: calc(100% + 14px); }
.rf-pill--bottom { top: calc(100% + 14px); }

/* Rail variant connector + scroll-triggered fill. */
.rf-rail,
.rf-rail-fill {
  position: absolute;
  top: 50%;
  /* Stop at the circle edges (full circle inset), not the centers — otherwise
     the line runs into the translucent climax circle and shows through it. */
  left: var(--rf-circle);
  right: var(--rf-circle);
  height: 2px;
  transform: translateY(-50%);
  z-index: 0;
}
.rf-rail-fill {
  transform: translateY(-50%) scaleX(0);
  transform-origin: left center;
  transition: transform 1.1s var(--rf-ease) 0.15s;
}
.rf-row.on .rf-rail-fill { transform: translateY(-50%) scaleX(1); }

/* Rings variant soft connecting band. */
.rf-rings-band {
  position: absolute;
  top: 50%;
  left: var(--rf-circle);
  right: var(--rf-circle);
  height: 12px;
  transform: translateY(-50%);
  border-radius: 10rem;
  z-index: 0;
}

.rf-caption-wrap { text-align: center; margin-top: clamp(32px, 5vw, 48px); }
.rf-caption { max-width: 52ch; margin-inline: auto; line-height: 1.55; }
.rf-cta { margin-top: 28px; }

/* ---- Mobile: vertical stacked mini-timeline (all variants unify) ---- */
@media (max-width: 719px) {
  /* Shrink-wrap the timeline to its widest row and center it, so the
     icon + label column sits balanced rather than jammed against the edge. */
  .rf-band { width: fit-content; max-width: 100%; margin-inline: auto; }
  .rf-row,
  .rf-row--ripple,
  .rf-row--rail,
  .rf-row--rings {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0;
    padding-block: 8px;
  }
  /* one continuous vertical connector behind the circles */
  /* Start/end at the first/last circle edges so the line spans only the gaps
     between circles — never behind the translucent climax circle (8px row pad
     + 12px node pad + one circle height to clear the end circle). */
  .rf-row::before {
    content: "";
    position: absolute;
    left: calc(var(--rf-circle) / 2);
    top: calc(20px + var(--rf-circle));
    bottom: calc(20px + var(--rf-circle));
    width: 2px;
    background: var(--rf-line);
    z-index: 0;
  }
  .rf-node {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    padding: 12px 0;
  }
  .rf-cw { z-index: 1; }
  .rf-halo,
  .rf-rail,
  .rf-rail-fill,
  .rf-rings-band { display: none; }
  .rf-pill,
  .rf-pill--top,
  .rf-pill--bottom {
    position: static;
    transform: none;
    left: auto;
    top: auto;
    bottom: auto;
    white-space: normal;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rf-node { opacity: 1; transform: none; transition: none; }
  .rf-rail-fill { transform: translateY(-50%) scaleX(1); transition: none; }
  .rf-pulse { animation: none; opacity: 0; }
}
`;
