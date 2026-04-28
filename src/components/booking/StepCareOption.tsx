"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { StateChoice } from "./StepState";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const GREEN = "#083630";
const ORANGE = "#fb4d17";
const CREAM = "#efeeeb";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export type CareOption = {
  id: string;
  city: string;
  state: string;
  description: string;
  kind: "clinic" | "video";
  bbox?: string;
  marker?: string;
};

const careOptionsByState: Record<"MA" | "CA", CareOption[]> = {
  MA: [
    {
      id: "danvers",
      city: "Danvers",
      state: "Massachusetts",
      description: "In-person clinic, north of Boston",
      kind: "clinic",
      bbox: "-70.97,42.555,-70.89,42.595",
      marker: "42.575,-70.933",
    },
    {
      id: "video-ma",
      city: "Video visit",
      state: "From anywhere in Massachusetts",
      description: "See your provider on your phone or computer — no driving, no waiting room",
      kind: "video",
    },
  ],
  CA: [
    {
      id: "irvine",
      city: "Irvine",
      state: "California",
      description: "In-person clinic, Orange County",
      kind: "clinic",
      bbox: "-117.87,33.65,-117.76,33.72",
      marker: "33.684,-117.827",
    },
    {
      id: "bay-area",
      city: "Bay Area",
      state: "California",
      description: "In-person clinic",
      kind: "clinic",
      bbox: "-122.52,37.70,-122.35,37.82",
      marker: "37.775,-122.418",
    },
    {
      id: "video-ca",
      city: "Video visit",
      state: "From anywhere in California",
      description: "See your provider on your phone or computer — no driving, no waiting room",
      kind: "video",
    },
  ],
};

export function getCareOption(id: string): CareOption | undefined {
  return [...careOptionsByState.MA, ...careOptionsByState.CA].find(
    (o) => o.id === id
  );
}

type StepCareOptionProps = {
  state: Exclude<StateChoice, "Other">;
  value: string;
  onChange: (id: string) => void;
};

export default function StepCareOption({
  state,
  value,
  onChange,
}: StepCareOptionProps) {
  const reducedMotion = useReducedMotion();
  const options = careOptionsByState[state];

  return (
    <div>
      <h2 className="studio-h2" style={{ color: GREEN }}>
        How would you like to be seen?
      </h2>
      <p className="studio-lead mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>
        Visit one of our clinics, or see your provider over video — whatever
        works best for you.
      </p>

      <motion.div
        className={`mt-10 grid gap-5 ${
          options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        {options.map((opt) => {
          const isSelected = value === opt.id;
          const hasMap = opt.bbox && opt.marker;
          const mapSrc = hasMap
            ? `https://www.openstreetmap.org/export/embed.html?bbox=${opt.bbox}&layer=mapnik&marker=${opt.marker}`
            : null;

          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              variants={fadeUp}
              whileHover={reducedMotion ? {} : { y: -3 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
              className={`
                group relative text-left overflow-hidden rounded-2xl
                transition-all duration-300 cursor-pointer
                ${isSelected
                  ? "ring-2 ring-[#083630] shadow-[0_12px_36px_-12px_rgba(8,54,48,0.3)]"
                  : "border border-[rgba(8,54,48,0.1)] hover:border-[rgba(8,54,48,0.25)] hover:shadow-[0_16px_40px_-16px_rgba(8,54,48,0.2)]"
                }
              `}
              style={{ background: "#fff" }}
            >
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
                      title={`Map of ${opt.city}, ${opt.state}`}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,54,48,0.0) 0%, rgba(8,54,48,0.08) 60%, rgba(8,54,48,0.2) 100%)",
                      }}
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-16 w-16 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(8,54,48,0.08)" }}
                    >
                      <svg viewBox="0 0 24 24" className="h-8 w-8" style={{ color: GREEN }}>
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

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

                {opt.kind === "video" && (
                  <div
                    className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{
                      background: ORANGE,
                      color: "#fff",
                    }}
                  >
                    Easiest option
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3
                  className="text-lg font-semibold leading-tight"
                  style={{
                    color: GREEN,
                    fontFamily: "var(--font-pt-serif), Georgia, serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {opt.city}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "rgba(8,54,48,0.55)" }}
                >
                  {opt.state}
                </p>
                <p
                  className="mt-2 text-xs"
                  style={{ color: "rgba(8,54,48,0.45)" }}
                >
                  {opt.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
