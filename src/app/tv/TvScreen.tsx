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

function clearStored(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function TvScreen() {
  const [mounted, setMounted] = useState(false);
  const [layerA, setLayerA] = useState<string | null>(null);
  const [layerB, setLayerB] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<"a" | "b">("a");
  const [line1, setLine1] = useState(DEFAULT_LINE1);
  const [line2, setLine2] = useState(DEFAULT_LINE2);
  const [showSettings, setShowSettings] = useState(false);
  const [draftLine1, setDraftLine1] = useState("");
  const [draftLine2, setDraftLine2] = useState("");

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

  const openSettings = () => {
    setDraftLine1(line1);
    setDraftLine2(line2);
    setShowSettings(true);
  };

  const closeSettings = () => setShowSettings(false);

  const saveSettings = () => {
    const next1 = draftLine1.trim();
    const next2 = draftLine2.trim();
    const applied1 = next1.length > 0 ? next1 : DEFAULT_LINE1;
    const applied2 = next2.length > 0 ? next2 : DEFAULT_LINE2;
    setLine1(applied1);
    setLine2(applied2);
    if (next1.length > 0) writeStored(LINE1_KEY, next1);
    else clearStored(LINE1_KEY);
    if (next2.length > 0) writeStored(LINE2_KEY, next2);
    else clearStored(LINE2_KEY);
    setShowSettings(false);
  };

  const resetSettings = () => {
    clearStored(LINE1_KEY);
    clearStored(LINE2_KEY);
    setLine1(DEFAULT_LINE1);
    setLine2(DEFAULT_LINE2);
    setDraftLine1(DEFAULT_LINE1);
    setDraftLine2(DEFAULT_LINE2);
  };

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
      if (!showSettings && !inField && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        openSettings();
      } else if (showSettings && e.key === "Escape") {
        e.preventDefault();
        closeSettings();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mounted, showSettings, line1, line2]);

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
      <button
        type="button"
        className="tv-settings-trigger"
        onClick={openSettings}
        aria-label="Edit display text"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
      {showSettings && (
        <div
          className="tv-settings-backdrop"
          onClick={closeSettings}
          role="presentation"
        >
          <div
            className="tv-settings-panel"
            role="dialog"
            aria-label="Edit display text"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="tv-settings-title">Display text</h2>
            <label className="tv-settings-field">
              <span>Top line</span>
              <input
                type="text"
                value={draftLine1}
                onChange={(e) => setDraftLine1(e.target.value)}
                maxLength={80}
                autoFocus
                spellCheck={false}
              />
            </label>
            <label className="tv-settings-field">
              <span>Second line</span>
              <input
                type="text"
                value={draftLine2}
                onChange={(e) => setDraftLine2(e.target.value)}
                maxLength={140}
                spellCheck={false}
              />
            </label>
            <p className="tv-settings-hint">
              Leave blank to use the default. Saved on this TV until you change it again.
            </p>
            <div className="tv-settings-actions">
              <button type="button" className="tv-btn tv-btn-ghost" onClick={resetSettings}>
                Reset to default
              </button>
              <div className="tv-settings-actions-end">
                <button type="button" className="tv-btn tv-btn-ghost" onClick={closeSettings}>
                  Cancel
                </button>
                <button type="button" className="tv-btn tv-btn-primary" onClick={saveSettings}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
