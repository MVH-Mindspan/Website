"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";

type SubmitErrorBlockProps = {
  message: string;
  onRetry: () => void;
  disabled?: boolean;
};

export default function SubmitErrorBlock({ message, onRetry, disabled }: SubmitErrorBlockProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-xl p-4 text-sm"
      style={{
        background: alpha(c.accent, 0.08),
        border: `1px solid ${alpha(c.accent, 0.25)}`,
        color: c.accentText,
      }}
    >
      <p className="font-semibold">We couldn't submit your information.</p>
      <p className="mt-1" style={{ color: alpha(c.accentText, 0.85) }}>
        {message}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50"
          style={{ background: c.accentText, color: "#fff" }}
        >
          Try again
        </button>
        <a
          href="mailto:hello@mindspan.co"
          className="text-xs font-medium underline underline-offset-2"
          style={{ color: c.accentText }}
        >
          Or email us at hello@mindspan.co
        </a>
      </div>
    </div>
  );
}
