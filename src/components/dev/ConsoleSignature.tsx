"use client";

import { useEffect } from "react";

let hasLogged = false;

/**
 * One-shot styled console message for developers who open DevTools.
 * Module-level guard means React Strict Mode's double-invocation in dev
 * still only logs once per page-load.
 */
export function ConsoleSignature() {
  useEffect(() => {
    if (hasLogged) return;
    if (typeof window === "undefined") return;
    hasLogged = true;
    // The pill has its own background so it reads everywhere. The tagline
    // sits on whatever bg the user's DevTools uses, so pick a color that
    // contrasts with their color scheme.
    const prefersDark =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const taglineColor = prefersDark ? "#FBF7F0" : "#083630";
    /* eslint-disable no-console */
    console.log(
      "%cMindspan%c\nIf you care about brains too, we are hiring. mindspan.co/careers",
      [
        "background:#083630",
        "color:#FBF7F0",
        "font-family:Georgia,serif",
        "font-size:18px",
        "padding:6px 12px",
        "border-radius:6px",
        "letter-spacing:0.02em",
      ].join(";"),
      [
        `color:${taglineColor}`,
        "font-family:system-ui,sans-serif",
        "font-size:12px",
        "line-height:1.6",
        "padding-top:6px",
      ].join(";")
    );
    /* eslint-enable no-console */
  }, []);

  return null;
}
