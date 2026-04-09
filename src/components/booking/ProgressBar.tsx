"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const STEPS = [
  { label: "Location" },
  { label: "Visit type" },
  { label: "Details" },
  { label: "Address" },
  { label: "Review" },
];

type ProgressBarProps = {
  currentStep: number; // 0-indexed
  onStepClick?: (step: number) => void;
};

export default function ProgressBar({ currentStep, onStepClick }: ProgressBarProps) {
  const reducedMotion = useReducedMotion();

  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-between relative">
        {/* Connecting line background */}
        <div
          className="absolute top-4 left-0 right-0 h-[2px] mx-8"
          style={{ background: "rgba(8,54,48,0.08)" }}
        />
        {/* Active line */}
        <motion.div
          className="absolute top-4 left-0 h-[2px] mx-8"
          style={{ background: "#083630" }}
          initial={false}
          animate={{
            width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: EASE }
          }
        />

        {STEPS.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          const isClickable = i < currentStep && onStepClick;

          return (
            <li key={step.label} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(i)}
                disabled={!isClickable}
                className={`
                  flex items-center justify-center h-8 w-8 rounded-full text-xs font-semibold
                  transition-all duration-300
                  ${isClickable ? "cursor-pointer" : "cursor-default"}
                  ${isCompleted
                    ? "bg-[#083630] text-white"
                    : isCurrent
                      ? "bg-white border-2 border-[#083630] text-[#083630]"
                      : "bg-white border-2 border-[rgba(8,54,48,0.15)] text-[rgba(8,54,48,0.35)]"
                  }
                `}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <svg viewBox="0 0 12 12" className="h-3.5 w-3.5">
                    <path
                      d="M2 6l3 3 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </button>
              <span
                className={`
                  mt-2 text-[11px] font-medium hidden md:block
                  transition-colors duration-300
                  ${isCurrent || isCompleted
                    ? "text-[#083630]"
                    : "text-[rgba(8,54,48,0.35)]"
                  }
                `}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
