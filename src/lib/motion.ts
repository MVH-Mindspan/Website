import type { Variants } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { easeArray } from "./tokens";

export const EASE = easeArray;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerSequential: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

export const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Variants that resolve to a no-op when the user prefers reduced motion. */
const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/**
 * Returns the standard `fadeUp` variants, or a static no-op variant when the
 * user has `prefers-reduced-motion: reduce`. Components opt in by calling
 * this hook instead of importing `fadeUp` directly. The existing exports
 * remain unchanged for backwards compatibility.
 */
export function useFadeUp(): Variants {
  const reduce = useReducedMotion();
  return reduce ? reducedMotionVariants : fadeUp;
}

/**
 * Variant of `useFadeUp` that returns the softer, slower fade. Same
 * reduced-motion semantics.
 */
export function useFadeUpSoft(): Variants {
  const reduce = useReducedMotion();
  return reduce ? reducedMotionVariants : fadeUpSoft;
}
