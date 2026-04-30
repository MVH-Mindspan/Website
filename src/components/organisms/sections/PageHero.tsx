"use client";

/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";

type HeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  location?: string;
  availability?: { text: string; cta: { label: string; href: string } };
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  subTagline?: string;
  subhead?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function PageHero(props: HeroProps) {
  return props.image ? <ImageHero {...props} /> : <EditorialHero {...props} />;
}

function EditorialHero({
  eyebrow,
  title,
  lead,
  location,
  availability,
  children,
}: HeroProps) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      style={{
        background: c.cream,
        color: c.ink,
        paddingTop: "max(140px, 16vh)",
        paddingBottom: "72px",
      }}
    >
      <Container>
        <Reveal>
          {availability && (
            <AvailabilityPill availability={availability} tone="dark" />
          )}
          <Eyebrow color={c.accentText}>{eyebrow}</Eyebrow>
          {location && <LocationLine text={location} color={c.brandGreen} textColor={alpha(c.ink, 0.7)} />}
          <Heading
            as="h1"
            variant="h1"
            fontFamily={theme.fonts.heading}
            color={c.ink}
            className="mt-4"
          >
            {title}
          </Heading>
          {lead && (
            <Lead size="lg" color={alpha(c.ink, 0.7)} className="mt-5">
              {lead}
            </Lead>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}

function ImageHero({
  eyebrow,
  title,
  lead,
  location,
  availability,
  image,
  imageAlt,
  children,
  subTagline,
  subhead,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const hasAside =
    Boolean(subTagline) || Boolean(subhead) || Boolean(primaryCta) || Boolean(secondaryCta);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "min(820px, 92vh)",
        background: "#1a1814",
        color: c.cream,
      }}
    >
      <img
        src={image}
        alt={imageAlt ?? title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: "block" }}
        loading="eager"
        fetchPriority="high"
      />

      {/* Base darken for overall contrast */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: alpha("#0e0d0a", 0.35) }}
      />

      {/* Strong left-to-right darkening so copy is legible while image still reads on the right */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${alpha("#0e0d0a", 0.82)} 0%, ${alpha(
            "#0e0d0a",
            0.68
          )} 42%, ${alpha("#0e0d0a", 0.32)} 75%, transparent 100%)`,
        }}
      />

      {/* Soft vertical fade at top so floating header stays clean */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0"
        style={{
          height: 220,
          background: `linear-gradient(180deg, ${alpha("#0e0d0a", 0.45)} 0%, transparent 100%)`,
        }}
      />

      <div
        className="relative"
        style={{
          minHeight: "min(820px, 92vh)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingTop: "max(160px, 18vh)",
          paddingBottom: "88px",
        }}
      >
        <Container>
          <Reveal>
            {availability && (
              <AvailabilityPill availability={availability} tone="light" />
            )}
            <div
              className={
                hasAside
                  ? "flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16"
                  : ""
              }
            >
              <div>
                <Eyebrow color={alpha(c.cream, 0.85)}>{eyebrow}</Eyebrow>
                {location && (
                  <LocationLine
                    text={location}
                    color={alpha(c.cream, 0.9)}
                    textColor={alpha(c.cream, 0.85)}
                  />
                )}
                <Heading
                  as="h1"
                  variant="h1"
                  fontFamily={theme.fonts.heading}
                  color={c.cream}
                  className="mt-4"
                  style={{ maxWidth: hasAside ? "16ch" : "18ch" }}
                >
                  {title}
                </Heading>
                {!hasAside && lead && (
                  <Lead
                    size="lg"
                    color={alpha(c.cream, 0.85)}
                    className="mt-5"
                    maxWidth="58ch"
                  >
                    {lead}
                  </Lead>
                )}
              </div>
              {hasAside && (
                <HeroAside
                  lead={lead}
                  subTagline={subTagline}
                  subhead={subhead}
                  primaryCta={primaryCta}
                  secondaryCta={secondaryCta}
                />
              )}
            </div>
            {children && <div className="mt-8">{children}</div>}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

function HeroAside({
  lead,
  subTagline,
  subhead,
  primaryCta,
  secondaryCta,
}: {
  lead?: string;
  subTagline?: string;
  subhead?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <div className="md:max-w-[480px] w-full">
      {subTagline && (
        <p
          className="font-semibold"
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.leadMd,
            color: c.cream,
            lineHeight: 1.4,
            marginBottom: 8,
          }}
        >
          {subTagline}
        </p>
      )}
      {(subhead || lead) && (
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            color: alpha(c.cream, 0.78),
            lineHeight: 1.55,
            marginBottom: primaryCta || secondaryCta ? 20 : 0,
          }}
        >
          {subhead ?? lead}
        </p>
      )}
      {(primaryCta || secondaryCta) && (
        <div className="flex flex-wrap items-center gap-3 hero-aside-ctas">
          {primaryCta && (
            <a
              href={primaryCta.href}
              className="hero-aside-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: theme.fonts.body,
                fontSize: typeScale.bodySm,
                fontWeight: 600,
                color: c.brandGreen,
                background: "#fff",
                padding: "14px 28px",
                borderRadius: "10rem",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = c.cream)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              {primaryCta.label} <ArrowIcon />
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="hero-aside-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: theme.fonts.body,
                fontSize: typeScale.bodySm,
                fontWeight: 600,
                color: c.cream,
                padding: "14px 22px",
                border: `1px solid ${alpha(c.cream, 0.45)}`,
                borderRadius: "10rem",
                textDecoration: "none",
                background: "transparent",
              }}
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      )}
      <style jsx>{`
        @media (max-width: 480px) {
          .hero-aside-primary,
          .hero-aside-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

function AvailabilityPill({
  availability,
  tone,
}: {
  availability: { text: string; cta: { label: string; href: string } };
  tone: "dark" | "light";
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  const isLight = tone === "light";
  const bg = isLight ? alpha("#ffffff", 0.14) : alpha(c.brandGreen, 0.08);
  const border = isLight
    ? `1px solid ${alpha("#ffffff", 0.28)}`
    : `1px solid ${alpha(c.brandGreen, 0.2)}`;
  const textColor = isLight ? c.cream : c.brandGreen;
  const dotColor = isLight ? "#9ee6a5" : c.brandGreen;
  const divider = isLight
    ? `1px solid ${alpha("#ffffff", 0.3)}`
    : `1px solid ${alpha(c.brandGreen, 0.25)}`;

  return (
    <a
      href={availability.cta.href}
      className="inline-flex items-center gap-3 transition-all hover:-translate-y-0.5"
      style={{
        marginBottom: 24,
        padding: "8px 16px 8px 14px",
        background: bg,
        border,
        borderRadius: "10rem",
        color: textColor,
        fontFamily: theme.fonts.body,
        fontSize: "0.875rem",
        fontWeight: 600,
        backdropFilter: isLight ? "blur(8px)" : undefined,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: dotColor,
          boxShadow: `0 0 0 4px ${alpha(dotColor, 0.22)}`,
          animation: "pulseDot 2s ease-in-out infinite",
        }}
      />
      <span>{availability.text}</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          paddingLeft: 10,
          marginLeft: 2,
          borderLeft: divider,
        }}
      >
        {availability.cta.label} <ArrowIcon />
      </span>
    </a>
  );
}

function LocationLine({
  text,
  color,
  textColor,
}: {
  text: string;
  color: string;
  textColor: string;
}) {
  const { theme } = useTheme();
  return (
    <p
      className="mt-3 inline-flex items-center gap-2"
      style={{
        fontFamily: theme.fonts.body,
        fontSize: typeScale.body,
        color: textColor,
        fontWeight: 500,
      }}
    >
      <PinIcon color={color} />
      <span>{text}</span>
    </p>
  );
}

function PinIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
