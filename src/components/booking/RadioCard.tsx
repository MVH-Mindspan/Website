"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type RadioCardProps = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function RadioCard({
  selected,
  onClick,
  children,
  className = "",
}: RadioCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`
        relative w-full text-left rounded-2xl p-6 cursor-pointer
        transition-all duration-300 overflow-hidden
        ${selected
          ? "border-2 border-[#083630] bg-white shadow-[0_8px_30px_-12px_rgba(8,54,48,0.25)]"
          : "border border-[rgba(8,54,48,0.1)] bg-white hover:border-[rgba(8,54,48,0.25)] hover:shadow-[0_12px_32px_-16px_rgba(8,54,48,0.18)]"
        }
        ${className}
      `}
      whileHover={reducedMotion ? {} : { y: -2 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      {/* Selection indicator */}
      <div
        className={`
          absolute top-4 right-4 h-6 w-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-300
          ${selected
            ? "border-[#083630] bg-[#083630]"
            : "border-[rgba(8,54,48,0.2)] bg-transparent"
          }
        `}
      >
        {selected && (
          <motion.svg
            viewBox="0 0 12 12"
            className="h-3 w-3 text-white"
            initial={reducedMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: EASE }}
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
        )}
      </div>
      {children}
    </motion.button>
  );
}
