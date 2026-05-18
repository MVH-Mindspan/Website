"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { easeArrays } from "@/lib/tokens";

const REVEAL = easeArrays.reveal;


type ProgressBarProps = {
  steps: string[];
  currentStep: number; // 0-indexed
  onStepClick?: (step: number) => void;
};

export default function ProgressBar({ steps, currentStep, onStepClick }: ProgressBarProps) {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-between relative">
        {/* Connecting line background */}
        <div
          className="absolute top-[18px] sm:top-4 left-0 right-0 h-[2px] mx-3 sm:mx-6 md:mx-8"
          style={{ background: alpha(c.brandGreen, 0.08) }}
        />
        {/* Active line — scaleX for a smoother, compositor-only fill. */}
        <motion.div
          className="absolute top-[18px] sm:top-4 left-0 right-0 h-[2px] mx-3 sm:mx-6 md:mx-8"
          style={{ background: c.brandGreen, transformOrigin: "left" }}
          initial={false}
          animate={{
            scaleX: currentStep / Math.max(steps.length - 1, 1),
          }}
          transition={
            reducedMotion ? { duration: 0 } : { duration: 0.55, ease: REVEAL }
          }
        />

        {steps.map((label, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          const isClickable = i < currentStep && onStepClick;

          return (
            <li key={label} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(i)}
                disabled={!isClickable}
                aria-label={`Step ${i + 1} of ${steps.length}: ${label}${
                  isCompleted ? " (completed)" : isCurrent ? " (current)" : ""
                }`}
                aria-current={isCurrent ? "step" : undefined}
                className={`
                  flex items-center justify-center h-9 w-9 sm:h-8 sm:w-8 rounded-full text-sm sm:text-xs font-semibold
                  transition-all duration-300
                  ${isClickable ? "cursor-pointer" : "cursor-default"}
                  ${isCompleted
                    ? "bg-[#083630] text-white"
                    : isCurrent
                      ? "bg-white border-2 border-[#083630] text-[#083630]"
                      : "bg-white border-2 border-[rgba(8,54,48,0.25)] text-[rgba(8,54,48,0.55)]"
                  }
                `}
              >
                {isCompleted ? (
                  <motion.svg
                    viewBox="0 0 12 12"
                    className="h-3.5 w-3.5"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: REVEAL }}
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
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
                    : "text-[rgba(8,54,48,0.55)]"
                  }
                `}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
