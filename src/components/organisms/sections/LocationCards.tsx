"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
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
    <section id={id} style={{ padding: "96px 0", background: bg }}>
      <Container>
        {intro && (
          <SectionHeader
            eyebrow={intro.eyebrow}
            title={intro.title}
            lead={intro.lead}
          />
        )}

        {groupByKind ? (
          <div className={intro ? "mt-14 flex flex-col gap-14" : "flex flex-col gap-14"}>
            {inPerson.length > 0 && (
              <LocationGroup heading="In-person clinics" locations={inPerson} />
            )}
            {video.length > 0 && (
              <LocationGroup heading="Video visits" locations={video} />
            )}
          </div>
        ) : (
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6${intro ? " mt-14" : ""}`}
          >
            {locations.map((l, i) => (
              <LocationCard key={l.city + l.state} location={l} index={i} />
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
        className="mb-6"
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
      <div className={`grid sm:grid-cols-2 ${cols} gap-5 md:gap-6`}>
        {locations.map((l, i) => (
          <LocationCard key={l.city + l.state} location={l} index={i} />
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
  const hasMap = Boolean(l.bbox && l.marker);
  const mapSrc = hasMap
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${l.bbox}&layer=mapnik&marker=${l.marker}`
    : null;
  const isVideo = l.kind === "video";

  return (
    <Reveal
      className="group relative overflow-hidden rounded-[2rem] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.4)]"
      style={{
        background: c.primary,
        animationDelay: `${i * 80}ms`,
      }}
    >
      <a href={l.href} className="flex flex-col flex-1">
        <div
          className="relative overflow-hidden h-40 rounded-t-[2rem]"
          style={{ background: c.primaryLight }}
        >
          {mapSrc ? (
            <iframe
              src={mapSrc}
              className="absolute left-0 right-0 top-0 w-full border-0 pointer-events-none transition-transform duration-500 group-hover:scale-[1.05]"
              style={{
                height: "calc(100% + 60px)",
                borderTopLeftRadius: "2rem",
                borderTopRightRadius: "2rem",
              }}
              loading="lazy"
              title={`Map of ${l.city}, ${l.state}`}
              aria-hidden="true"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${alpha(
                  c.primaryLight,
                  1
                )} 0%, ${alpha(c.primary, 1)} 100%)`,
              }}
            />
          )}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="rounded-full px-4 py-2 font-semibold"
                style={{
                  background: c.sky,
                  color: c.brandGreen,
                  fontSize: typeScale.bodySm,
                }}
              >
                Video visits, {l.state}
              </span>
            </div>
          )}
          <div
            className="absolute top-3 start-3 flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold"
            style={{
              background: c.brandGreen,
              color: "#fff",
              fontSize: typeScale.bodySm,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "#22c55e",
                boxShadow: `0 0 0 3px ${alpha("#22c55e", 0.22)}`,
                animation: "pulseDot 2.4s ease-in-out infinite",
              }}
            />
            {isVideo ? "Video" : "Open"}
          </div>
        </div>
        <div className="flex flex-col flex-1 p-6">
          <h3
            className="!text-[1.65rem] leading-[1.05]"
            style={{
              color: c.cream,
              fontFamily: theme.fonts.heading,
              letterSpacing: "-0.02em",
            }}
          >
            {l.city}
          </h3>
          <p
            className="mt-2"
            style={{
              color: alpha(c.cream, 0.85),
              fontSize: typeScale.body,
              fontWeight: 500,
            }}
          >
            {l.state}
          </p>
          <p
            className="mt-5 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
            style={{ color: "#bdd8f5", fontSize: typeScale.body }}
          >
            {isVideo ? "Book a video visit" : "Visit clinic"}{" "}
            <ArrowIcon />
          </p>
        </div>
      </a>
    </Reveal>
  );
}
