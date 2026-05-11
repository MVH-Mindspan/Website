"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";

type Tone = "cream" | "sand";

export function VideoFeature({
  id,
  eyebrow,
  title,
  body,
  youtubeId,
  posterAlt,
  poster,
  videoPosition = "right",
  tone = "sand",
  primary,
  secondary,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  youtubeId: string;
  posterAlt: string;
  poster?: string;
  videoPosition?: "left" | "right";
  tone?: Tone;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [playing, setPlaying] = useState(false);

  const background = tone === "sand" ? c.sand : c.cream;
  const posterSrc =
    poster ?? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

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
            <Button
              href={primary.href}
              variant="primary"
              iconRight={<ArrowIcon />}
            >
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

  const media = (
    <div
      className="relative overflow-hidden rounded-[2rem]"
      style={{
        aspectRatio: "16 / 9",
        boxShadow:
          "0 30px 60px -30px rgba(32,30,23,0.28), 0 2px 8px rgba(32,30,23,0.06)",
        background: alpha(c.ink, 0.06),
      }}
    >
      {playing ? (
        <iframe
          src={embedSrc}
          title={posterAlt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 cursor-pointer"
          aria-label={`Play video: ${posterAlt}`}
          style={{ background: "transparent", border: 0, padding: 0 }}
        >
          <img
            src={posterSrc}
            alt={posterAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${alpha(
                "#0e0d0a",
                0
              )} 40%, ${alpha("#0e0d0a", 0.32)} 100%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110"
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: c.brandGreen,
                boxShadow:
                  "0 18px 36px -12px rgba(8,54,48,0.6), 0 0 0 6px rgba(255,255,255,0.18)",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="#ffffff"
                aria-hidden
                style={{ marginLeft: 4 }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </button>
      )}
    </div>
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
        <Reveal className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {videoPosition === "left" ? (
            <>
              {media}
              {text}
            </>
          ) : (
            <>
              {text}
              {media}
            </>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
