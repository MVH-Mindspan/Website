"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import RadioCard from "./RadioCard";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const GREEN = "#083630";
const ORANGE = "#fb4d17";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const options = [
  {
    id: "yourself" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" style={{ color: GREEN }}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    title: "Myself",
    description: "I'd like to book a visit for myself",
  },
  {
    id: "family" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" style={{ color: GREEN }}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    title: "A family member",
    description: "I'm booking on behalf of a parent, spouse, or loved one",
  },
  {
    id: "someone-else" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" style={{ color: GREEN }}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    title: "Someone else",
    description: "I'm helping someone who isn't a family member",
  },
];

type StepVisitForProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function StepVisitFor({ value, onChange }: StepVisitForProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <h2 className="studio-h2" style={{ color: GREEN }}>
        Who is this visit for?
      </h2>
      <p
        className="studio-lead mt-3"
        style={{ color: "rgba(8,54,48,0.7)" }}
      >
        Let us know so we can tailor your experience.
      </p>

      <motion.div
        className="mt-10 grid sm:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        {options.map((opt) => (
          <motion.div key={opt.id} variants={fadeUp}>
            <RadioCard
              selected={value === opt.id}
              onClick={() => onChange(opt.id)}
            >
              <div className="pr-8">
                <div className="mb-3">{opt.icon}</div>
                <h3
                  className="text-base font-semibold"
                  style={{ color: GREEN }}
                >
                  {opt.title}
                </h3>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "rgba(8,54,48,0.6)" }}
                >
                  {opt.description}
                </p>
              </div>
            </RadioCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Routing callouts */}
      <div className="mt-10 space-y-3">
        <div
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ background: "rgba(8,54,48,0.03)", border: "1px solid rgba(8,54,48,0.06)" }}
        >
          <span className="text-lg mt-0.5">
            <svg viewBox="0 0 24 24" className="h-5 w-5" style={{ color: "rgba(8,54,48,0.4)" }}>
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm" style={{ color: "rgba(8,54,48,0.7)" }}>
              <strong style={{ color: GREEN }}>Already a patient?</strong>{" "}
              You can book directly through your{" "}
              <a
                href="https://assessment.mindspan.co"
                className="font-medium underline underline-offset-2 hover:no-underline"
                style={{ color: ORANGE }}
              >
                patient portal
              </a>
              .
            </p>
          </div>
        </div>
        <div
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ background: "rgba(8,54,48,0.03)", border: "1px solid rgba(8,54,48,0.06)" }}
        >
          <span className="text-lg mt-0.5">
            <svg viewBox="0 0 24 24" className="h-5 w-5" style={{ color: "rgba(8,54,48,0.4)" }}>
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm" style={{ color: "rgba(8,54,48,0.7)" }}>
              <strong style={{ color: GREEN }}>Are you a provider?</strong>{" "}
              You can refer a patient through our{" "}
              <a
                href="/providers/refer"
                className="font-medium underline underline-offset-2 hover:no-underline"
                style={{ color: ORANGE }}
              >
                referral form
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
