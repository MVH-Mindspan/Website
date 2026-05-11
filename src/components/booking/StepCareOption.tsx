"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import { ImageFrame } from "@/components/atoms/ImageFrame";
import type { StateChoice } from "./StepState";

const GREEN = "#083630";

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
  image: string;
  imageAlt?: string;
  address?: string;
};

const careOptionsByState: Record<"MA" | "CA", CareOption[]> = {
  MA: [
    {
      id: "danvers",
      city: "Danvers",
      state: "Massachusetts",
      description: "In-person clinic, north of Boston",
      kind: "clinic",
      image: "/assets/danvers-clinic.webp",
      imageAlt: "Mindspan Danvers clinic on Boston’s North Shore",
      address: "99 Conifer Hill Drive, Danvers, MA 01923",
    },
    {
      id: "video-ma",
      city: "Video visit",
      state: "From anywhere in Massachusetts",
      description: "See your provider on your phone or computer, no driving, no waiting room",
      kind: "video",
      image: "/assets/video-visit-poster.webp",
      imageAlt: "Mindspan video visit, anywhere in Massachusetts",
    },
  ],
  CA: [
    {
      id: "bay-area",
      city: "Bay Area",
      state: "California",
      description: "In-person clinic",
      kind: "clinic",
      image: "/assets/bay-area-clinic.webp",
      imageAlt: "Mindspan Bay Area clinic exterior in San Jose, California",
      address: "2520 Samaritan Dr, Suite 201B, San Jose, CA 95124",
    },
    {
      id: "video-ca",
      city: "Video visit",
      state: "From anywhere in California",
      description: "See your provider on your phone or computer, no driving, no waiting room",
      kind: "video",
      image: "/assets/video-visit-poster.webp",
      imageAlt: "Mindspan video visit, anywhere in California",
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
        Visit one of our clinics, or see your provider over video, whatever
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

          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={isSelected}
              aria-label={
                opt.kind === "video"
                  ? `Video visit with ${opt.city} (${opt.state}) team`
                  : `In-person visit at ${opt.city}, ${opt.state}`
              }
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
                  className="absolute top-6 right-6 z-20 h-7 w-7 rounded-full flex items-center justify-center"
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

              <div className="relative">
                <ImageFrame radius="1.25rem" className="m-3 mb-0">
                  <img
                    src={opt.image}
                    alt={opt.imageAlt ?? ""}
                    className="block w-full object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </ImageFrame>

                <div
                  className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-semibold shadow-sm"
                  style={{ color: GREEN }}
                >
                  <span
                    className="h-2 w-2 rounded-full animate-pulse"
                    style={{ background: "#22c55e" }}
                  />
                  Taking patients
                </div>
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
                  style={{ color: "rgba(8,54,48,0.72)" }}
                >
                  {opt.description}
                </p>
                {opt.address && (
                  <p
                    className="mt-2 text-xs"
                    style={{ color: "rgba(8,54,48,0.55)" }}
                  >
                    {opt.address}
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
