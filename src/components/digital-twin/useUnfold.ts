"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/tokens";

/**
 * One-time "unfold" for the recreated report screens: they play their small
 * story (slider settles, paths draw, years fill in) the first time they come
 * into view.
 *
 * - "final": fully drawn. This is the server-rendered state, so nothing is
 *   hidden without JavaScript, and it's what reduced-motion users always see.
 * - "armed": hidden start state, set on mount only when the screen is still
 *   below the fold (so nothing already on screen flickers).
 * - "play": animates to the final state, then returns to "final" after
 *   `totalMs` so nothing (clip-paths, transitions) stays on at rest.
 */
export type UnfoldPhase = "final" | "armed" | "play";

export function useUnfold<T extends HTMLElement>(totalMs: number) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  // Play once the element is in the reading zone (clear of the bottom edge),
  // not the moment it peeks in. 0.6 still fits a 300px chart on a landscape
  // phone, so nothing can stay hidden.
  const inView = useInView(ref, { once: true, amount: 0.6, margin: "0px 0px -15% 0px" });
  const [phase, setPhase] = useState<UnfoldPhase>("final");

  useEffect(() => {
    if (reduce || !ref.current) return;
    const top = ref.current.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.8) setPhase("armed");
  }, [reduce]);

  useEffect(() => {
    if (phase !== "play") return;
    const t = window.setTimeout(() => setPhase("final"), totalMs + 50);
    return () => window.clearTimeout(t);
  }, [phase, totalMs]);

  useEffect(() => {
    if (!inView || phase !== "armed") return;
    // Two frames so the hidden start state paints before the transition runs.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPhase("play"));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [inView, phase]);

  return { ref, phase };
}

/** The site's standard easing, which is also the tool's own slider curve. */
export const UNFOLD_EASE = ease.standard;

/**
 * Left-to-right reveal via clip-path (no layout work, no shape distortion).
 * Only applied while armed or playing; at rest there's no clip at all.
 * `outset` lets strokes (e.g. round line caps) overhang the box while drawing.
 */
export function revealStyle(phase: UnfoldPhase, ms: number, delayMs = 0, round = "0", outset = "0px") {
  if (phase === "final") return {};
  const o = outset;
  return {
    clipPath:
      phase === "armed"
        ? `inset(-${o} calc(100% + ${o}) -${o} -${o} round ${round})`
        : `inset(-${o} -${o} -${o} -${o} round ${round})`,
    transition: phase === "play" ? `clip-path ${ms}ms ${UNFOLD_EASE} ${delayMs}ms` : "none",
  } as const;
}

/** Fade for labels that should appear once their line has arrived. */
export function fadeStyle(phase: UnfoldPhase, ms: number, delayMs = 0) {
  return {
    opacity: phase === "armed" ? 0 : 1,
    transition: phase === "play" ? `opacity ${ms}ms ${UNFOLD_EASE} ${delayMs}ms` : "none",
  } as const;
}
