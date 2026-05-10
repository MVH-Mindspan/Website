"use client";

import { useEffect, useRef, useState } from "react";
import { tvImages } from "@/lib/tv-manifest";

const ROTATE_MS = 15 * 60 * 1000;
const FADE_MS = 1500;
const DEFAULT_LINE1 = "Welcome";
const DEFAULT_LINE2 = "To your appointment.";
const LAST_KEY = "mindspan.tv.lastImage";
const LINE1_KEY = "mindspan.tv.line1";
const LINE2_KEY = "mindspan.tv.line2";

function pickRandom(exclude: string | null): string {
  let pick = tvImages[Math.floor(Math.random() * tvImages.length)];
  while (pick === exclude && tvImages.length > 1) {
    pick = tvImages[Math.floor(Math.random() * tvImages.length)];
  }
  return pick;
}

function readParams(): { line1: string | null; line2: string | null } {
  // Prefer query string (?line1=...&line2=...), fall back to hash
  // (#line1=...&line2=...) so kiosk browsers that strip the query
  // — or chained meta-refresh redirects that drop it — still work.
  const search = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const pick = (key: string) => {
    const fromSearch = search.get(key);
    if (fromSearch && fromSearch.trim().length > 0) return fromSearch;
    const fromHash = hash.get(key);
    if (fromHash && fromHash.trim().length > 0) return fromHash;
    return null;
  };
  return { line1: pick("line1"), line2: pick("line2") };
}

function readStored(key: string): string | null {
  try {
    const v = window.localStorage.getItem(key);
    return v && v.trim().length > 0 ? v : null;
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // localStorage unavailable (private mode, kiosk lockdown) — proceed without persistence
  }
}

export function TvScreen() {
  const [mounted, setMounted] = useState(false);
  const [layerA, setLayerA] = useState<string | null>(null);
  const [layerB, setLayerB] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<"a" | "b">("a");
  const [line1, setLine1] = useState(DEFAULT_LINE1);
  const [line2, setLine2] = useState(DEFAULT_LINE2);

  const activeRef = useRef<"a" | "b">("a");
  const layerARef = useRef<string | null>(null);
  const layerBRef = useRef<string | null>(null);
  const promotionTimeout = useRef<number | null>(null);
  const preloadImg = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    layerARef.current = layerA;
  }, [layerA]);
  useEffect(() => {
    layerBRef.current = layerB;
  }, [layerB]);

  useEffect(() => {
    const { line1: urlLine1, line2: urlLine2 } = readParams();
    const resolvedLine1 = urlLine1 ?? readStored(LINE1_KEY) ?? DEFAULT_LINE1;
    const resolvedLine2 = urlLine2 ?? readStored(LINE2_KEY) ?? DEFAULT_LINE2;
    if (urlLine1) writeStored(LINE1_KEY, urlLine1);
    if (urlLine2) writeStored(LINE2_KEY, urlLine2);
    setLine1(resolvedLine1);
    setLine2(resolvedLine2);

    const last = readStored(LAST_KEY);
    const first = pickRandom(last);
    writeStored(LAST_KEY, first);
    setLayerA(first);
    layerARef.current = first;
    activeRef.current = "a";
    setActiveLayer("a");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const swap = () => {
      const current = activeRef.current === "a" ? layerARef.current : layerBRef.current;
      const next = pickRandom(current);

      const img = new Image();
      preloadImg.current = img;
      img.onload = () => {
        if (preloadImg.current !== img) return;
        writeStored(LAST_KEY, next);
        const incoming: "a" | "b" = activeRef.current === "a" ? "b" : "a";
        if (incoming === "a") setLayerA(next);
        else setLayerB(next);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            activeRef.current = incoming;
            setActiveLayer(incoming);

            if (promotionTimeout.current) window.clearTimeout(promotionTimeout.current);
            promotionTimeout.current = window.setTimeout(() => {
              if (incoming === "a") setLayerB(null);
              else setLayerA(null);
            }, FADE_MS + 50);
          });
        });
      };
      img.src = next;
    };

    const id = window.setInterval(swap, ROTATE_MS);
    return () => {
      window.clearInterval(id);
      if (promotionTimeout.current) window.clearTimeout(promotionTimeout.current);
      if (preloadImg.current) {
        preloadImg.current.onload = null;
        preloadImg.current = null;
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {layerA && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`tv-layer${activeLayer === "a" ? " is-active" : ""}`}
          src={layerA}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
      )}
      {layerB && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`tv-layer${activeLayer === "b" ? " is-active" : ""}`}
          src={layerB}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
      )}
      <div className="tv-scrim" />
      <div className="tv-overlay">
        <div className="tv-text">
          <p className="tv-line1">{line1}</p>
          <p className="tv-line2">{line2}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tv-logo" src="/assets/logo-white.png" alt="Mindspan" />
      </div>
    </>
  );
}
