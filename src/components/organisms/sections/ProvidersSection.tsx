"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { BulletList } from "@/components/molecules/BulletList";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import type { ProviderCard } from "@/content/providers";

function ProviderBlock({ card }: { card: ProviderCard }) {
  const { theme } = useTheme();
  const c = theme.colors;
  const dark = card.tone === "dark";

  return (
    <Reveal
      className={`${dark ? "v2-card-dark" : "v2-card"} rounded-[2rem] p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden group`}
      style={{
        background: alpha(dark ? c.primary : c.cream, dark ? 0.85 : 0.7),
        color: dark ? "#fff" : undefined,
      }}
    >
      {dark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(120% 100% at 100% 0%, ${alpha(
              c.accent,
              0.18
            )} 0%, transparent 55%)`,
          }}
        />
      )}
      <div className="relative min-w-0">
        <Eyebrow color={dark ? "#A8D2FB" : c.accentText}>{card.eyebrow}</Eyebrow>
        <Heading
          as="h3"
          variant="h4"
          color={dark ? "#fff" : c.ink}
          fontFamily={theme.fonts.heading}
          className="mt-4 break-words"
        >
          {card.title}
        </Heading>
        <Lead
          size="bodyCard"
          maxWidth={false}
          color={dark ? undefined : alpha(c.ink, 0.72)}
          className={`mt-5 break-words ${dark ? "text-white/80" : ""}`.trim()}
        >
          {card.body}
        </Lead>
        <BulletList
          items={card.bullets}
          bulletColor={dark ? "#A8D2FB" : c.accent}
          color={dark ? undefined : alpha(c.ink, 0.82)}
          className={`mt-8 ${dark ? "text-base text-white/85" : "text-base"}`.trim()}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={card.primaryCta.href}
            className="inline-flex items-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: theme.fonts.body,
              padding: "14px 28px",
              background: dark ? "#A8D2FB" : c.brandGreen,
              color: dark ? c.brandGreen : "#fff",
              borderRadius: "10rem",
              fontSize: "0.9375rem",
            }}
          >
            {card.primaryCta.label} <ArrowIcon />
          </a>
          <a
            href={card.secondaryCta.href}
            className="inline-flex items-center gap-2 font-medium transition-all"
            style={{
              fontFamily: theme.fonts.body,
              padding: "14px 28px",
              color: dark ? "#fff" : c.ink,
              border: dark
                ? "1px solid rgba(255,255,255,0.35)"
                : `1px solid ${alpha(c.ink, 0.25)}`,
              borderRadius: "10rem",
              fontSize: "0.9375rem",
            }}
          >
            {card.secondaryCta.label}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function ProvidersSection({
  id,
  intro,
  refer,
  join,
}: {
  id?: string;
  intro: { eyebrow: string; title: string; lead: string };
  refer: ProviderCard;
  join: ProviderCard;
}) {
  const { theme } = useTheme();
  return (
    <section
      id={id}
      className="providers-section"
      style={{ background: theme.colors.sand, padding: "clamp(64px, 11vw, 112px) 0" }}
    >
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          align="center"
          divided
          maxWidth="max-w-[900px]"
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
          <ProviderBlock card={refer} />
          <ProviderBlock card={join} />
        </div>
      </Container>
    </section>
  );
}
