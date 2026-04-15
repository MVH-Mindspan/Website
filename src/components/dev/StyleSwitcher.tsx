"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import type { ThemeConfig } from "@/lib/themes";

const EASE = [0.22, 0.61, 0.36, 1] as const;

function ColorDot({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.1)`,
      }}
    />
  );
}

function ThemeCard({
  t,
  isActive,
  onSelect,
}: {
  t: ThemeConfig;
  isActive: boolean;
  onSelect: () => void;
}) {
  const { primary, accent, cream, sand, sky } = t.colors;

  return (
    <button
      onClick={onSelect}
      className="relative flex flex-col gap-3 rounded-2xl p-4 text-left transition-all duration-200 cursor-pointer group"
      style={{
        background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
        border: isActive
          ? `1.5px solid ${accent}`
          : "1.5px solid rgba(255,255,255,0.08)",
        minWidth: 200,
      }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center"
          style={{ background: accent }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" className="h-3 w-3">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </motion.div>
      )}

      {/* Theme name + description */}
      <div>
        <p
          className="text-sm font-semibold"
          style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.7)" }}
        >
          {t.name}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          {t.description}
        </p>
      </div>

      {/* Color swatches */}
      <div className="flex items-center gap-1.5">
        <ColorDot color={primary} />
        <ColorDot color={accent} />
        <ColorDot color={cream} />
        <ColorDot color={sand} />
        <ColorDot color={sky} />
      </div>

      {/* Font preview */}
      <div
        className="text-[11px] leading-tight"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <span style={{ fontFamily: t.fonts.heading }}>Heading</span>
        {" / "}
        <span style={{ fontFamily: t.fonts.body }}>Body</span>
      </div>
    </button>
  );
}

export function StyleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut: Ctrl+Shift+T to toggle
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "T") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Only render in development
  if (process.env.NODE_ENV !== "development") return null;
  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Collapsed pill */
          <motion.button
            key="collapsed"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 rounded-full px-4 py-2.5 cursor-pointer"
            style={{
              background: "rgba(20, 20, 16, 0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 8px 32px -8px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            whileHover={{ y: -2 }}
          >
            <ColorDot color={theme.colors.accent} size={10} />
            <span
              className="text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {theme.name}
            </span>
            <span
              className="text-[10px]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Ctrl+Shift+T
            </span>
          </motion.button>
        ) : (
          /* Expanded panel */
          <motion.div
            key="expanded"
            className="rounded-3xl p-5 relative"
            style={{
              background: "rgba(20, 20, 16, 0.95)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 24px 80px -16px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.05)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="h-6 w-6 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.8"
                    className="h-3.5 w-3.5"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
                <p
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}
                >
                  Style
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  className="h-3.5 w-3.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Theme cards */}
            <div className="flex gap-3">
              {themes.map((t) => (
                <ThemeCard
                  key={t.id}
                  t={t}
                  isActive={theme.id === t.id}
                  onSelect={() => {
                    setTheme(t.id);
                  }}
                />
              ))}
            </div>

            {/* Footer hint */}
            <p
              className="mt-3 text-center text-[10px]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Dev only — hidden in production
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
