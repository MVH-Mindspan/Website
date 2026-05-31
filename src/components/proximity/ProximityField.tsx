"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ProximityField — a tiny pointer-proximity shim.
 *
 * Feeds the cursor's distance into a `--proximity` custom property (0 = far,
 * 1 = touching) on every `[data-proximity]` element under `.v2-scope`, plus
 * `--px`/`--py` (0..1) for a directional glow origin. CSS does all the visual
 * work, so elements gently react *before* you actually hover them — the
 * "pre-hover" feel. Think of it as polyfilling the proposed `:near()` selector.
 *
 * It renders nothing (an effect host, like ConsoleSignature) and is mounted
 * once inside the marketing layout's `.v2-scope`.
 *
 * Discipline:
 * - Runs ONLY on fine-pointer, motion-OK devices; reacts to those prefs
 *   changing at runtime. Does literally nothing on touch / reduce-motion.
 * - One rAF per frame, coalescing high-frequency pointermove events.
 * - Per-frame work is bounded to elements currently in the viewport.
 * - Reads all rects first, then writes — one reflow per frame, no thrash.
 * - Skips writes within an epsilon, so a stationary cursor and far-field
 *   elements cost zero style writes.
 */

const RADIUS = 150; // px from an element's edge where the ramp begins
const EPSILON = 0.008; // skip writes smaller than this
const ROOT_MARGIN = "120px"; // start tracking just before an element scrolls in

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export function ProximityField() {
  // Rebuild the target set after each client-side navigation. usePathname is
  // the same navigation signal SiteHeader already relies on.
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const root =
      (document.querySelector(".v2-scope") as HTMLElement | null) ?? document.body;

    const capable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)");

    // Teardown for the *active* engine (null when not running).
    let stopEngine: (() => void) | null = null;

    const start = () => {
      if (stopEngine) return; // already running

      let running = true;
      let rafId = 0;
      let scheduled = false;
      let pointerX = -1; // -1 means "pointer is away / unknown"
      let pointerY = -1;

      const visible = new Set<HTMLElement>();
      const lastWritten = new WeakMap<HTMLElement, number>();
      // Reused scratch buffer for the read pass (avoids per-frame allocation).
      const scratch: Array<{ el: HTMLElement; r: DOMRect }> = [];

      let candidates = Array.from(
        root.querySelectorAll<HTMLElement>("[data-proximity]")
      );

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              visible.add(el);
            } else {
              visible.delete(el);
              // Settle to rest when it leaves the viewport.
              if ((lastWritten.get(el) ?? 0) !== 0) {
                el.style.setProperty("--proximity", "0");
                lastWritten.set(el, 0);
              }
            }
          }
        },
        { rootMargin: ROOT_MARGIN }
      );

      const observeAll = () => {
        io.disconnect();
        visible.clear();
        for (const el of candidates) io.observe(el);
      };
      observeAll();

      const write = (el: HTMLElement, p: number) => {
        const prev = lastWritten.get(el) ?? 0;
        // Always allow the final settle to exactly 0; otherwise skip tiny moves.
        if (Math.abs(p - prev) < EPSILON && !(p === 0 && prev !== 0)) return;
        el.style.setProperty("--proximity", p === 0 ? "0" : p.toFixed(3));
        lastWritten.set(el, p);
      };

      const frame = () => {
        scheduled = false;
        if (!running) return;

        // Pointer is away — drain everything currently lit back to rest.
        if (pointerX < 0) {
          for (const el of visible) write(el, 0);
          return;
        }

        // READ pass — gather all rects first (single forced layout).
        scratch.length = 0;
        for (const el of visible) scratch.push({ el, r: el.getBoundingClientRect() });

        // WRITE pass — compute proximity + set custom properties.
        for (let i = 0; i < scratch.length; i++) {
          const { el, r } = scratch[i];
          // Distance to the nearest point on the rect (0 when inside it).
          const dx = Math.max(r.left - pointerX, 0, pointerX - r.right);
          const dy = Math.max(r.top - pointerY, 0, pointerY - r.bottom);
          const dist = Math.hypot(dx, dy);
          const t = dist >= RADIUS ? 0 : 1 - dist / RADIUS;
          const p = t * t * (3 - 2 * t); // smoothstep — eases in and out
          if (p > 0 && r.width > 0 && r.height > 0) {
            el.style.setProperty("--px", clamp01((pointerX - r.left) / r.width).toFixed(3));
            el.style.setProperty("--py", clamp01((pointerY - r.top) / r.height).toFixed(3));
          }
          write(el, p);
        }
      };

      const schedule = () => {
        if (scheduled || !running) return;
        scheduled = true;
        rafId = requestAnimationFrame(frame);
      };

      const onMove = (e: PointerEvent) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
        schedule();
      };
      const onAway = () => {
        pointerX = -1;
        pointerY = -1;
        schedule();
      };
      // Geometry shifts under a stationary cursor on scroll/resize.
      const onReflow = () => {
        if (pointerX >= 0) schedule();
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onReflow, { passive: true });
      window.addEventListener("resize", onReflow, { passive: true });
      window.addEventListener("blur", onAway);
      document.addEventListener("pointerleave", onAway);

      // Safety net for async / conditionally mounted targets (e.g. content that
      // reveals after data loads). Debounced into a single rAF re-query.
      let moQueued = false;
      const mo = new MutationObserver(() => {
        if (moQueued) return;
        moQueued = true;
        requestAnimationFrame(() => {
          moQueued = false;
          if (!running) return;
          candidates = Array.from(
            root.querySelectorAll<HTMLElement>("[data-proximity]")
          );
          observeAll();
          schedule();
        });
      });
      mo.observe(root, { childList: true, subtree: true });

      stopEngine = () => {
        running = false;
        cancelAnimationFrame(rafId);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onReflow);
        window.removeEventListener("resize", onReflow);
        window.removeEventListener("blur", onAway);
        document.removeEventListener("pointerleave", onAway);
        io.disconnect();
        mo.disconnect();
        // Clear any lingering values so a later teardown leaves a clean rest state.
        for (const el of candidates) {
          if ((lastWritten.get(el) ?? 0) !== 0) el.style.setProperty("--proximity", "0");
        }
        stopEngine = null;
      };
    };

    const stop = () => stopEngine?.();

    const evaluate = () => {
      if (capable.matches && motionOK.matches) start();
      else stop();
    };
    evaluate();

    capable.addEventListener("change", evaluate);
    motionOK.addEventListener("change", evaluate);

    return () => {
      capable.removeEventListener("change", evaluate);
      motionOK.removeEventListener("change", evaluate);
      stop();
    };
  }, [pathname]);

  return null;
}
