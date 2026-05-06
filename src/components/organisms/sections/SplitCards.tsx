"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Lead } from "@/components/atoms/Lead";
import { BulletList } from "@/components/molecules/BulletList";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { externalLinkProps } from "@/lib/links";
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
  edge?: Protocol;
  closing?: string;
  cta?: { label: string; href: string };
  footnote?: string | readonly string[];
  tone?: "default" | "sand";
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const background = tone === "sand" ? c.sand : undefined;
  const footnoteParagraphs = Array.isArray(footnote)
    ? footnote
    : footnote
      ? [footnote]
      : [];

  return (
    <section style={{ padding: "96px 0", background }}>
      <Container>
        <SectionHeader
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
        />

        {intro.image && (
          <Reveal className="mt-12">
            <ImageFrame>
              <img
                src={intro.image}
                alt={intro.imageAlt ?? ""}
                width={1600}
                height={840}
                className="w-full object-cover"
                style={{ maxHeight: 420, aspectRatio: "1600 / 840" }}
                loading="lazy"
              />
            </ImageFrame>
          </Reveal>
        )}

        <div className={`mt-12 grid gap-6 md:gap-8 ${edge ? "lg:grid-cols-2" : ""}`}>
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
              className="mt-4"
            >
              {core.title}
            </Heading>
            <Lead
              size="bodyCard"
              color={alpha(c.ink, 0.72)}
              maxWidth={false}
              className="mt-5"
            >
              {core.body}
            </Lead>
            <BulletList
              items={core.bullets}
              bulletColor={c.brandGreen}
              color={alpha(c.ink, 0.82)}
              className="mt-8 text-base"
            />
          </Reveal>

          {edge && (
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
                <IconBadge background={alpha("#A8D2FB", 0.15)} color="#A8D2FB">
                  <SectionIcon name={edge.icon} />
                </IconBadge>
                <Eyebrow color="#A8D2FB" className="mt-5">
                  {edge.eyebrow}
                </Eyebrow>
                <Heading
                  as="h3"
                  variant="h4"
                  fontFamily={theme.fonts.heading}
                  className="mt-4"
                >
                  {edge.title}
                </Heading>
                <Lead
                  size="bodyCard"
                  maxWidth={false}
                  className="mt-5 text-white/80"
                >
                  {edge.body}
                </Lead>
                <BulletList
                  items={edge.bullets}
                  bulletColor="#A8D2FB"
                  className="mt-8 text-base text-white/85"
                />
              </div>
            </Reveal>
          )}
        </div>

        {(closing || cta) && (
          <Reveal className="mt-12 max-w-3xl">
            {closing && (
              <Lead
                size="bodyCard"
                maxWidth={false}
                color={alpha(c.ink, 0.72)}
              >
                {closing}
              </Lead>
            )}
            {cta && (
              <div className="mt-6">
                <Button
                  href={cta.href}
                  {...externalLinkProps(cta.href)}
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

        {footnoteParagraphs.length > 0 && (
          <Reveal className="mt-8 max-w-3xl">
            {footnoteParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? undefined : "mt-3"}
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  color: alpha(c.ink, 0.55),
                  lineHeight: 1.55,
                }}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
