"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { CardCaption } from "@/components/molecules/CardCaption";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { Location } from "@/content/locations";

type HeadingTag = "h2" | "h3" | "h4";

export function LocationCards({
  id,
  intro,
  locations,
  groupByKind = false,
  tone,
}: {
  id?: string;
  intro?: { eyebrow: string; title: string; lead: string; note?: string };
  locations: readonly Location[];
  groupByKind?: boolean;
  tone?: "sand" | "cream";
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const inPerson = locations.filter((l) => l.kind === "clinic");
  const video = locations.filter((l) => l.kind === "video");
  const bg = tone === "sand" ? c.sand : tone === "cream" ? c.cream : undefined;
  // Keep the outline sequential: under the intro's h2 when there is one,
  // otherwise directly under the page h1 (e.g. /locations).
  const groupTag: HeadingTag = intro ? "h3" : "h2";
  const cardTag: HeadingTag = !groupByKind ? groupTag : intro ? "h4" : "h3";

  if (locations.length === 0 && !intro) return null;

  return (
    <section id={id} style={{ padding: "clamp(56px, 10vw, 96px) 0", background: bg }}>
      <Container>
        {intro && (
          <SectionHeader
            layout="split"
            eyebrow={intro.eyebrow}
            title={intro.title}
            lead={intro.lead}
          />
        )}

        {intro?.note && (
          <p
            className="mt-5"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: typeScale.bodySm,
              color: alpha(c.ink, 0.55),
              fontStyle: "italic",
              lineHeight: 1.55,
              maxWidth: "62ch",
            }}
          >
            {intro.note}
          </p>
        )}

        {groupByKind ? (
          <div className={intro ? "mt-14 flex flex-col gap-16" : "flex flex-col gap-16"}>
            {inPerson.length > 0 && (
              <LocationGroup
                heading="In-person clinics"
                headingAs={groupTag}
                cardHeadingAs={cardTag}
                locations={inPerson}
              />
            )}
            {video.length > 0 && (
              <LocationGroup
                heading="Video visits"
                headingAs={groupTag}
                cardHeadingAs={cardTag}
                locations={video}
              />
            )}
          </div>
        ) : (
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12${intro ? " mt-14" : ""}`}
          >
            {locations.map((l, i) => (
              <LocationCard key={l.slug} location={l} index={i} headingAs={cardTag} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function LocationGroup({
  heading,
  headingAs: Tag,
  cardHeadingAs,
  locations,
}: {
  heading: string;
  headingAs: HeadingTag;
  cardHeadingAs: HeadingTag;
  locations: Location[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const cols = locations.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div>
      <Tag
        className="mb-8"
        style={{
          fontFamily: theme.fonts.body,
          fontSize: typeScale.bodySm,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: alpha(c.ink, 0.55),
        }}
      >
        {heading}
      </Tag>
      <div className={`grid sm:grid-cols-2 ${cols} gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12`}>
        {locations.map((l, i) => (
          <LocationCard key={l.slug} location={l} index={i} headingAs={cardHeadingAs} />
        ))}
      </div>
    </div>
  );
}

function LocationCard({
  location: l,
  index: i,
  headingAs,
}: {
  location: Location;
  index: number;
  headingAs: HeadingTag;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <Reveal
      dataProximity="subtle"
      className="v2-card group flex flex-col rounded-[2rem]"
      style={{
        background: alpha(c.cream, 0.7),
        overflow: "hidden",
        animationDelay: `${i * 80}ms`,
      }}
    >
      {l.image && (
        <ImageFrame radius="1.25rem" className="m-3 mb-0">
          <img
            src={l.image}
            alt={l.imageAlt ?? ""}
            className="block w-full object-cover prox-inner-img aspect-[4/3] sm:aspect-[16/10]"
            loading="lazy"
          />
        </ImageFrame>
      )}
      <div className="p-6 md:p-7 flex flex-col flex-1 min-w-0">
        <Eyebrow color={c.accentText}>{l.eyebrow}</Eyebrow>
        <Heading
          as={headingAs}
          variant="h4"
          color={c.ink}
          fontFamily={theme.fonts.heading}
          className="mt-3 break-words"
          style={{ letterSpacing: "-0.01em" }}
        >
          {l.headline}
        </Heading>
        <Lead
          size="bodyCard"
          color={alpha(c.ink, 0.7)}
          maxWidth={false}
          className="mt-3 break-words"
        >
          {l.summary}
        </Lead>
        {l.caption && (
          <CardCaption color={alpha(c.ink, 0.55)} className="mt-5">
            {l.caption}
          </CardCaption>
        )}
        <div className="mt-auto pt-6">
          <Button
            href={l.href}
            variant="ghostDark"
            size="sm"
            iconRight={<ArrowIcon />}
          >
            {l.ctaLabel}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
