"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Lead } from "@/components/atoms/Lead";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { Location } from "@/content/locations";

export function LocationCards({
  id,
  intro,
  locations,
  groupByKind = false,
  tone,
}: {
  id?: string;
  intro?: { eyebrow: string; title: string; lead: string };
  locations: readonly Location[];
  groupByKind?: boolean;
  tone?: "sand" | "cream";
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const inPerson = locations.filter((l) => l.kind === "clinic");
  const video = locations.filter((l) => l.kind === "video");
  const bg = tone === "sand" ? c.sand : tone === "cream" ? c.cream : undefined;

  if (locations.length === 0 && !intro) return null;

  return (
    <section id={id} style={{ padding: "clamp(56px, 10vw, 96px) 0", background: bg }}>
      <Container>
        {intro && (
          <SectionHeader
            eyebrow={intro.eyebrow}
            title={intro.title}
            lead={intro.lead}
          />
        )}

        {groupByKind ? (
          <div className={intro ? "mt-14 flex flex-col gap-16" : "flex flex-col gap-16"}>
            {inPerson.length > 0 && (
              <LocationGroup heading="In-person clinics" locations={inPerson} />
            )}
            {video.length > 0 && (
              <LocationGroup heading="Video visits" locations={video} />
            )}
          </div>
        ) : (
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12${intro ? " mt-14" : ""}`}
          >
            {locations.map((l, i) => (
              <LocationCard key={l.slug} location={l} index={i} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function LocationGroup({
  heading,
  locations,
}: {
  heading: string;
  locations: Location[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const cols = locations.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div>
      <h3
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
      </h3>
      <div className={`grid sm:grid-cols-2 ${cols} gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12`}>
        {locations.map((l, i) => (
          <LocationCard key={l.slug} location={l} index={i} />
        ))}
      </div>
    </div>
  );
}

function LocationCard({
  location: l,
  index: i,
}: {
  location: Location;
  index: number;
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <Reveal
      className="group flex flex-col rounded-[2rem] overflow-hidden"
      style={{
        background: c.cream,
        border: `1px solid ${alpha(c.ink, 0.06)}`,
        animationDelay: `${i * 80}ms`,
      }}
    >
      {l.image && (
        <ImageFrame radius="1.25rem" className="m-3 mb-0">
          <img
            src={l.image}
            alt={l.imageAlt ?? ""}
            className="block w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] aspect-[4/3] sm:aspect-[16/10]"
            loading="lazy"
          />
        </ImageFrame>
      )}
      <div className="p-6 md:p-7 flex flex-col flex-1 min-w-0">
        <Eyebrow color={c.accentText}>{l.eyebrow}</Eyebrow>
        <Heading
          as="h4"
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
