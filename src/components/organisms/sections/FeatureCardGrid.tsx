"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
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
  tone = "primary",
  primary,
  secondary,
}: {
  id?: string;
  intro: { eyebrow: string; title: string; lead: string };
  cards: readonly TechCard[];
  columns?: 2 | 3 | 4;
  rounded?: boolean;
  tone?: "primary" | "sand";
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  if (cards.length === 0) return null;

  const gridColsClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : columns === 2
      ? "md:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  const isSand = tone === "sand";
  const sectionBg = isSand ? c.sand : c.primary;
  const sectionText = isSand ? c.ink : c.cream;
  const cardBg = isSand ? c.cream : c.primaryLight;
  const cardBorder = isSand ? `1px solid ${alpha(c.ink, 0.06)}` : undefined;
  const eyebrowColor = isSand ? alpha(c.ink, 0.6) : alpha(c.cream, 0.6);
  const bodyColor = isSand ? alpha(c.ink, 0.7) : alpha(c.cream, 0.65);

  return (
    <section
      id={id}
      style={{
        background: sectionBg,
        color: sectionText,
        padding: "clamp(56px, 10vw, 96px) 0",
        borderRadius: rounded ? "2rem 2rem 0 0" : undefined,
        scrollMarginTop: "96px",
      }}
    >
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          tone={isSand ? "dark" : "light"}
          eyebrowColor={isSand ? undefined : "#A8D2FB"}
        />

        <div className={`mt-12 grid grid-cols-1 ${gridColsClass} gap-5 md:gap-6`}>
          {cards.map((card, i) => (
            <Reveal
              key={card.id}
              className="group rounded-[2rem] p-5 sm:p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] min-w-0"
              style={{
                background: cardBg,
                border: cardBorder,
                animationDelay: `${i * 80}ms`,
              }}
            >
              <IconBadge
                background={c.sky}
                color={c.brandGreen}
                className="transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              >
                <SectionIcon name={card.icon} />
              </IconBadge>
              <Eyebrow color={eyebrowColor} className="mt-6">
                {card.eyebrow}
              </Eyebrow>
              <Heading
                as="h4"
                variant="h4"
                color={sectionText}
                fontFamily={theme.fonts.heading}
                className="mt-4 break-words"
              >
                {card.title}
              </Heading>
              <Lead
                size="bodyCard"
                maxWidth={false}
                color={bodyColor}
                className="mt-5 break-words"
              >
                {card.body}
              </Lead>
            </Reveal>
          ))}
        </div>

        {(primary || secondary) && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
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
              <Button
                href={secondary.href}
                variant={isSand ? "ghostDark" : "ghostLight"}
                size="lg"
              >
                {secondary.label}
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
