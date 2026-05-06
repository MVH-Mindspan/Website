"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";

const GREEN = "#083630";
const CREAM = "#efeeeb";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export type StateChoice = "MA" | "CA" | "Other";

const choices: {
  id: StateChoice;
  title: string;
  subtitle: string;
}[] = [
  {
    id: "MA",
    title: "Massachusetts",
    subtitle: "We see patients here",
  },
  {
    id: "CA",
    title: "California",
    subtitle: "We see patients here",
  },
  {
    id: "Other",
    title: "Somewhere else",
    subtitle: "Join the waitlist for your area",
  },
];

type StepStateProps = {
  value: StateChoice | "";
  onChange: (state: StateChoice) => void;
};

export default function StepState({ value, onChange }: StepStateProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <h2 className="studio-h2" style={{ color: GREEN }}>
        Where do you live?
      </h2>
      <p className="studio-lead mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>
        We see patients in Massachusetts and California today.
      </p>

      <motion.div
        className="mt-10 grid sm:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        {choices.map((c) => {
          const isSelected = value === c.id;
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => onChange(c.id)}
              variants={fadeUp}
              whileHover={reducedMotion ? {} : { y: -3 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
              className={`
                relative text-left rounded-2xl p-6 cursor-pointer overflow-hidden
                transition-all duration-300
                ${isSelected
                  ? "border-2 border-[#083630] bg-white shadow-[0_12px_36px_-12px_rgba(8,54,48,0.3)]"
                  : "border border-[rgba(8,54,48,0.1)] bg-white hover:border-[rgba(8,54,48,0.25)] hover:shadow-[0_16px_40px_-16px_rgba(8,54,48,0.2)]"
                }
              `}
              style={{ minHeight: "200px" }}
            >
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 h-7 w-7 rounded-full flex items-center justify-center"
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

              <div className="flex flex-col h-full">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: CREAM }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    style={{ color: GREEN }}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold leading-tight"
                  style={{
                    color: GREEN,
                    fontFamily: "var(--font-pt-serif), Georgia, serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "rgba(8,54,48,0.6)" }}
                >
                  {c.subtitle}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <div
        className="mt-10 rounded-xl p-4 flex items-start gap-3"
        style={{
          background: "rgba(8,54,48,0.03)",
          border: "1px solid rgba(8,54,48,0.06)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 mt-0.5 shrink-0"
          style={{ color: "rgba(8,54,48,0.72)" }}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        <p className="text-sm" style={{ color: "rgba(8,54,48,0.7)" }}>
          <strong style={{ color: GREEN }}>Already a patient?</strong>{" "}
          Book directly through your{" "}
          <a
            href="https://assessment.mindspan.co"
            className="font-medium underline underline-offset-2 hover:no-underline"
            style={{ color: "#fb4d17" }}
          >
            patient portal
          </a>
          .
        </p>
      </div>
    </div>
  );
}
