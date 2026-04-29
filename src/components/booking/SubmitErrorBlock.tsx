"use client";

type SubmitErrorBlockProps = {
  message: string;
  onRetry: () => void;
  disabled?: boolean;
};

export default function SubmitErrorBlock({ message, onRetry, disabled }: SubmitErrorBlockProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-xl p-4 text-sm"
      style={{
        background: "rgba(220,38,38,0.06)",
        border: "1px solid rgba(220,38,38,0.25)",
        color: "#7f1d1d",
      }}
    >
      <p className="font-semibold">We couldn't submit your information.</p>
      <p className="mt-1" style={{ color: "rgba(127,29,29,0.85)" }}>
        {message}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50"
          style={{ background: "#7f1d1d", color: "#fff" }}
        >
          Try again
        </button>
        <a
          href="mailto:hello@mindspan.co"
          className="text-xs font-medium underline underline-offset-2"
          style={{ color: "#7f1d1d" }}
        >
          Or email us at hello@mindspan.co
        </a>
      </div>
    </div>
  );
}
