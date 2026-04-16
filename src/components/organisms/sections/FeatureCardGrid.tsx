"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { TechCard } from "@/content/technology";
import { SectionIcon } from "./icons";

export function FeatureCardGrid({
  id,
  intro,
  cards,
  columns = 3,
  rounded = true,
  primary,
  secondary,
}: {
  id?: string;
  intro: { eyebrow: string; title: string; lead: string };
  cards: readonly TechCard[];
  columns?: 2 | 3 | 4;
  rounded?: boolean;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  const gridColsClass =
    columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  return (
    <section
      id={id}
      style={{
        background: c.primary,
        color: c.cream,
        padding: "96px 0",
        borderRadius: rounded ? "2.2rem 2.2rem 0 0" : undefined,
      }}
    >
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          tone="light"
          eyebrowColor="#bdd8f5"
        />

        <div className={`mt-12 grid ${gridColsClass} gap-5 md:gap-6`}>
          {cards.map((card, i) => (
            <Reveal
              key={card.id}
              className="rounded-[2rem] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)]"
              style={{ background: c.primaryLight, animationDelay: `${i * 80}ms` }}
            >
              <IconBadge background={c.sky} color={c.brandGreen}>
                <SectionIcon name={card.icon} />
              </IconBadge>
              <Eyebrow color={alpha(c.cream, 0.6)} className="mt-6">
                {card.eyebrow}
              </Eyebrow>
              <Heading
                as="h4"
                variant="h4"
                fontFamily={theme.fonts.heading}
                className="mt-3"
              >
                {card.title}
              </Heading>
              <Lead
                size="md"
                maxWidth={false}
                color={alpha(c.cream, 0.65)}
                className="mt-4"
                style={{ fontSize: typeScale.body, lineHeight: 1.6 }}
              >
                {card.body}
              </Lead>
            </Reveal>
          ))}
        </div>

        {(primary || secondary) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {primary && (
              <Button
                href={primary.href}
                variant="primary"
                size="lg"
                iconRight={<ArrowIcon />}
              >
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button href={secondary.href} variant="ghostLight" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
