"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale, radius } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/molecules/Reveal";

export function ArticleHeader({
  tag,
  title,
  description,
  authorName,
  dateLabel,
  updatedLabel,
  readingMinutes,
  image,
  imageAlt,
  backHref,
  backLabel,
}: {
  tag?: string;
  title: string;
  description: string;
  authorName: string;
  dateLabel: string;
  updatedLabel?: string;
  readingMinutes: number;
  image?: string;
  imageAlt?: string;
  backHref: string;
  backLabel: string;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <header
      style={{
        background: c.cream,
        color: c.ink,
        paddingTop: "max(140px, 16vh)",
      }}
    >
      <Container width="narrow">
        <Reveal>
          <p style={{ fontFamily: theme.fonts.body, fontSize: typeScale.micro }}>
            <Link
              href={backHref}
              style={{ color: alpha(c.ink, 0.6), textDecoration: "none" }}
              className="hover:underline"
            >
              ← {backLabel}
            </Link>
          </p>
          <Eyebrow color={c.accentText} className="mt-6">
            {tag ?? "Article"}
          </Eyebrow>
          <Heading
            as="h1"
            variant="h2"
            fontFamily={theme.fonts.heading}
            color={c.ink}
            className="mt-4"
          >
            {title}
          </Heading>
          <Lead size="md" color={alpha(c.ink, 0.75)} className="mt-5" maxWidth="62ch">
            {description}
          </Lead>
          <p
            className="mt-6"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.bodySm,
              color: alpha(c.ink, 0.6),
            }}
          >
            <span style={{ color: c.ink, fontWeight: 500 }}>{authorName}</span>
            {" · "}
            <time>{dateLabel}</time>
            {updatedLabel && <> · Updated {updatedLabel}</>}
            {" · "}
            {readingMinutes} min read
          </p>
        </Reveal>
      </Container>
      {image && (
        <Container className="mt-12">
          <Reveal delay={1}>
            <ImageFrame radius={radius.xl}>
              <img
                src={image}
                alt={imageAlt ?? ""}
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  objectFit: "cover",
                }}
              />
            </ImageFrame>
          </Reveal>
        </Container>
      )}
    </header>
  );
}
