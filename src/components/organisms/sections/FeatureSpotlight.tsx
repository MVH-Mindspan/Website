"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/molecules/Reveal";

type Tone = "cream" | "sand";

export function FeatureSpotlight({
  id,
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  imagePosition = "right",
  tone = "cream",
  primary,
  secondary,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  tone?: Tone;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const background = tone === "sand" ? c.sand : c.cream;

  const text = (
    <div>
      <Eyebrow color={c.accentText}>{eyebrow}</Eyebrow>
      <Heading
        as="h2"
        variant="h2"
        color={c.ink}
        fontFamily={theme.fonts.heading}
        className="mt-4"
      >
        {title}
      </Heading>
      <Lead
        size="lg"
        color={alpha(c.ink, 0.72)}
        maxWidth="48ch"
        className="mt-5"
      >
        {body}
      </Lead>
      {(primary || secondary) && (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {primary && (
            <Button href={primary.href} variant="primary" iconRight={<ArrowIcon />}>
              {primary.label}
            </Button>
          )}
          {secondary && (
            <Button href={secondary.href} variant="ghostDark">
              {secondary.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const picture = (
    <ImageFrame radius="1.5rem">
      <img
        src={image}
        alt={imageAlt}
        className="w-full object-cover block aspect-[4/3] sm:aspect-[16/10]"
        loading="lazy"
      />
    </ImageFrame>
  );

  return (
    <section
      id={id}
      style={{
        background,
        color: c.ink,
        padding: "clamp(56px, 10vw, 96px) 0",
        scrollMarginTop: "96px",
      }}
    >
      <Container>
        <Reveal className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {imagePosition === "left" ? (
            <>
              {picture}
              {text}
            </>
          ) : (
            <>
              {text}
              {picture}
            </>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
