"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { Container } from "@/components/atoms/Container";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { Location } from "@/content/locations";

export function LocationCards({
  id,
  intro,
  locations,
}: {
  id?: string;
  intro?: { eyebrow: string; title: string; lead: string };
  locations: readonly Location[];
}) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section id={id} style={{ padding: "96px 0" }}>
      <Container>
        {intro && (
          <SectionHeader
            eyebrow={intro.eyebrow}
            title={intro.title}
            lead={intro.lead}
          />
        )}

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6${intro ? " mt-14" : ""}`}
        >
          {locations.map((l, i) => {
            const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${l.bbox}&layer=mapnik&marker=${l.marker}`;
            const isTelehealth = l.kind === "telehealth";
            return (
              <Reveal
                key={l.city + l.state}
                className="group relative overflow-hidden rounded-[2rem] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.4)]"
                style={{
                  background: c.primary,
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <a href={l.href} className="flex flex-col flex-1">
                  <div
                    className="relative overflow-hidden h-40"
                    style={{ background: c.primaryLight }}
                  >
                    <iframe
                      src={mapSrc}
                      className="absolute left-0 right-0 top-0 w-full border-0 pointer-events-none transition-transform duration-500 group-hover:scale-[1.05]"
                      style={{ height: "calc(100% + 60px)" }}
                      loading="lazy"
                      title={`Map of ${l.city}, ${l.state}`}
                      aria-hidden="true"
                    />
                    {isTelehealth && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="rounded-full px-4 py-2 text-xs font-semibold backdrop-blur"
                          style={{ background: alpha(c.sky, 0.92), color: c.brandGreen }}
                        >
                          Video visits statewide
                        </span>
                      </div>
                    )}
                    <div
                      className="absolute top-3 left-3 flex items-center gap-2 rounded-full backdrop-blur px-3 py-1.5 text-[11px] font-semibold"
                      style={{ background: c.brandGreen, color: "#fff" }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: "#22c55e" }}
                      />
                      {isTelehealth ? "Video" : "Open"}
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
                      className="mt-1 text-sm"
                      style={{ color: alpha(c.cream, 0.5) }}
                    >
                      {l.state}
                    </p>
                    <p
                      className="mt-5 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                      style={{ color: "#bdd8f5" }}
                    >
                      {isTelehealth ? "Book a video visit" : "Visit clinic"}{" "}
                      <ArrowIcon />
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
