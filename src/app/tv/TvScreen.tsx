"use client";

import { useEffect, useRef, useState } from "react";
import { tvImages } from "@/lib/tv-manifest";

const ROTATE_MS = 15 * 60 * 1000;
const FADE_MS = 1500;
const DEFAULT_LINE1 = "Welcome";
const DEFAULT_LINE2 = "To your appointment.";
const LAST_KEY = "mindspan.tv.lastImage";

function pickRandom(exclude: string | null): string {
  let pick = tvImages[Math.floor(Math.random() * tvImages.length)];
  while (pick === exclude && tvImages.length > 1) {
    pick = tvImages[Math.floor(Math.random() * tvImages.length)];
  }
  return pick;
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
    const params = new URLSearchParams(window.location.search);
    const l1 = params.get("line1");
    const l2 = params.get("line2");
    if (l1 && l1.trim().length > 0) setLine1(l1);
    if (l2 && l2.trim().length > 0) setLine2(l2);

    let last: string | null = null;
    try {
      last = window.localStorage.getItem(LAST_KEY);
    } catch {
      last = null;
    }
    const first = pickRandom(last);
    try {
      window.localStorage.setItem(LAST_KEY, first);
    } catch {
      // localStorage unavailable (private mode, kiosk lockdown) — proceed without persistence
    }
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
        try {
          window.localStorage.setItem(LAST_KEY, next);
        } catch {
          // ignore
        }
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
