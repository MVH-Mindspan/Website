"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { BulletList } from "@/components/molecules/BulletList";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import type { Protocol } from "@/content/protocols";
import { SectionIcon } from "./icons";

export function SplitCards({
  intro,
  core,
  edge,
  closing,
  cta,
  footnote,
  tone = "default",
}: {
  intro: {
    eyebrow: string;
    title: string;
    lead: string;
    image?: string;
    imageAlt?: string;
  };
  core: Protocol;
  edge: Protocol;
  closing?: string;
  cta?: { label: string; href: string };
  footnote?: string;
  tone?: "default" | "sand";
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const background = tone === "sand" ? c.sand : undefined;

  return (
    <section style={{ padding: "96px 0", background }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
        />

        {intro.image && (
          <Reveal className="mt-12 overflow-hidden rounded-[2rem]">
            <img
              src={intro.image}
              alt={intro.imageAlt ?? ""}
              className="w-full object-cover"
              style={{ maxHeight: 420 }}
              loading="lazy"
            />
          </Reveal>
        )}

        <div className="mt-12 grid lg:grid-cols-2 gap-6 md:gap-8">
          <Reveal
            className="rounded-[2rem] p-8 md:p-10"
            style={{
              background: tone === "sand" ? c.cream : c.skySoft,
              border: `1px solid ${alpha(c.ink, 0.06)}`,
            }}
          >
            <IconBadge background={c.sky} color={c.brandGreen}>
              <SectionIcon name={core.icon} />
            </IconBadge>
            <Eyebrow color={alpha(c.ink, 0.6)} className="mt-5">
              {core.eyebrow}
            </Eyebrow>
            <Heading
              as="h3"
              variant="h4"
              color={c.ink}
              fontFamily={theme.fonts.heading}
              className="mt-3"
            >
              {core.title}
            </Heading>
            <Lead
              size="md"
              color={alpha(c.ink, 0.72)}
              maxWidth={false}
              className="mt-4"
              style={{ fontSize: typeScale.body, lineHeight: 1.6 }}
            >
              {core.body}
            </Lead>
            <BulletList
              items={core.bullets}
              bulletColor={c.brandGreen}
              color={alpha(c.ink, 0.82)}
              className="mt-6 text-base"
            />
          </Reveal>

          <Reveal
            className="rounded-[2rem] p-8 md:p-10 relative overflow-hidden text-white"
            style={{ background: c.brandGreen }}
          >
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                background: `radial-gradient(120% 100% at 100% 0%, ${alpha(
                  c.accent,
                  0.18
                )} 0%, transparent 55%)`,
              }}
            />
            <div className="relative">
              <IconBadge background={alpha("#bdd8f5", 0.15)} color="#bdd8f5">
                <SectionIcon name={edge.icon} />
              </IconBadge>
              <Eyebrow color="#bdd8f5" className="mt-5">
                {edge.eyebrow}
              </Eyebrow>
              <Heading
                as="h3"
                variant="h4"
                fontFamily={theme.fonts.heading}
                className="mt-3"
              >
                {edge.title}
              </Heading>
              <Lead
                size="md"
                maxWidth={false}
                className="mt-4 text-white/80"
                style={{ fontSize: typeScale.body, lineHeight: 1.6 }}
              >
                {edge.body}
              </Lead>
              <BulletList
                items={edge.bullets}
                bulletColor="#bdd8f5"
                className="mt-6 text-[15px] text-white/85"
              />
            </div>
          </Reveal>
        </div>

        {(closing || cta) && (
          <Reveal className="mt-12 max-w-3xl">
            {closing && (
              <Lead
                size="md"
                maxWidth={false}
                color={alpha(c.ink, 0.72)}
                style={{ fontSize: typeScale.body, lineHeight: 1.65 }}
              >
                {closing}
              </Lead>
            )}
            {cta && (
              <div className="mt-6">
                <Button
                  href={cta.href}
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowIcon />}
                >
                  {cta.label}
                </Button>
              </div>
            )}
          </Reveal>
        )}

        {footnote && (
          <Reveal
            className="mt-8 max-w-3xl"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.bodySm,
              color: alpha(c.ink, 0.55),
              lineHeight: 1.55,
            }}
          >
            {footnote}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
