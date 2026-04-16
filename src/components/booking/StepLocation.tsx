"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { locations } from "@/content";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const GREEN = "#083630";
const ORANGE = "#fb4d17";
const CREAM = "#efeeeb";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type BookingLocation = {
  id: string;
  city: string;
  state: string;
  description: string;
  kind: "clinic" | "telehealth" | "program" | "inquiry";
  bbox?: string;
  marker?: string;
};

const bookingLocations: BookingLocation[] = [
  ...locations.map((l) => ({
    id: `${l.city.toLowerCase().replace(/\s/g, "-")}-${l.state.toLowerCase().substring(0, 2)}`,
    city: l.city,
    state: l.state,
    description: l.kind === "telehealth" ? "Video visits statewide" : "In-person clinic",
    kind: l.kind,
    bbox: l.bbox,
    marker: l.marker,
  })),
  {
    id: "cms-guide",
    city: "CMS GUIDE",
    state: "California & Massachusetts",
    description: "Medicare coverage study for early Alzheimer's detection",
    kind: "program" as const,
    bbox: undefined,
    marker: undefined,
  },
  {
    id: "general",
    city: "General inquiry",
    state: "Not sure yet? We'll help.",
    description: "Ask us anything about Mindspan",
    kind: "inquiry" as const,
    bbox: undefined,
    marker: undefined,
  },
];

type StepLocationProps = {
  value: string;
  onChange: (locationId: string) => void;
};

export default function StepLocation({ value, onChange }: StepLocationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <h2
        className="studio-h2"
        style={{ color: GREEN }}
      >
        Where would you like to be seen?
      </h2>
      <p
        className="studio-lead mt-3"
        style={{ color: "rgba(8,54,48,0.7)" }}
      >
        Choose a clinic, video visit, or program below.
      </p>

      <motion.div
        className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        {bookingLocations.map((loc) => {
          const isSelected = value === loc.id;
          const hasMap = loc.bbox && loc.marker;
          const mapSrc = hasMap
            ? `https://www.openstreetmap.org/export/embed.html?bbox=${loc.bbox}&layer=mapnik&marker=${loc.marker}`
            : null;

          return (
            <motion.button
              key={loc.id}
              type="button"
              onClick={() => onChange(loc.id)}
              className={`
                group relative text-left overflow-hidden rounded-2xl
                transition-all duration-300 cursor-pointer
                ${isSelected
                  ? "ring-2 ring-[#083630] shadow-[0_12px_36px_-12px_rgba(8,54,48,0.3)]"
                  : "border border-[rgba(8,54,48,0.1)] hover:border-[rgba(8,54,48,0.25)] hover:shadow-[0_16px_40px_-16px_rgba(8,54,48,0.2)]"
                }
              `}
              style={{ background: "#fff" }}
              variants={fadeUp}
              whileHover={reducedMotion ? {} : { y: -3 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              {/* Selection badge */}
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 z-20 h-7 w-7 rounded-full flex items-center justify-center"
                  style={{ background: GREEN }}
                  initial={reducedMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 text-white">
                    <path
                      d="M2 6l3 3 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Map or icon area */}
              <div
                className="relative overflow-hidden h-36"
                style={{ background: CREAM }}
              >
                {mapSrc ? (
                  <>
                    <iframe
                      src={mapSrc}
                      className="absolute left-0 right-0 top-0 w-full border-0 pointer-events-none transition-transform duration-500 group-hover:scale-[1.05]"
                      style={{ height: "calc(100% + 60px)" }}
                      loading="lazy"
                      title={`Map of ${loc.city}, ${loc.state}`}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,54,48,0.0) 0%, rgba(8,54,48,0.08) 60%, rgba(8,54,48,0.2) 100%)",
                      }}
                    />
                    {loc.kind === "telehealth" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="rounded-full px-4 py-2 text-xs font-semibold backdrop-blur"
                          style={{
                            background: "rgba(255,255,255,0.92)",
                            color: GREEN,
                            border: "1px solid rgba(8,54,48,0.1)",
                          }}
                        >
                          Video visits statewide
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {loc.kind === "program" ? (
                      /* Brain/science icon for CMS GUIDE */
                      <div
                        className="h-16 w-16 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgba(8,54,48,0.06)" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-8 w-8" style={{ color: GREEN }}>
                          <path
                            fill="currentColor"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          />
                        </svg>
                      </div>
                    ) : (
                      /* Chat bubble icon for general inquiry */
                      <div
                        className="h-16 w-16 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgba(8,54,48,0.06)" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-8 w-8" style={{ color: GREEN }}>
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Open badge for clinics */}
                {(loc.kind === "clinic" || loc.kind === "telehealth") && (
                  <div
                    className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-semibold shadow-sm"
                    style={{ color: GREEN }}
                  >
                    <span
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{ background: "#22c55e" }}
                    />
                    Taking patients
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3
                  className="text-lg font-semibold leading-tight"
                  style={{
                    color: GREEN,
                    fontFamily: "var(--font-pt-serif), Georgia, serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {loc.city}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "rgba(8,54,48,0.55)" }}
                >
                  {loc.state}
                </p>
                <p
                  className="mt-2 text-xs"
                  style={{ color: "rgba(8,54,48,0.45)" }}
                >
                  {loc.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
