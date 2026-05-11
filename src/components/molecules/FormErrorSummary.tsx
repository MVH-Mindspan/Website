"use client";

import { forwardRef } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";

type FormErrorSummaryProps = {
  errors: Array<[string, string]>;
  labels: Record<string, string>;
  /**
   * Resolve a field key into one or more candidate DOM ids to focus when an
   * error link is clicked. Booking radio groups have composite ids; returning
   * an array lets the summary try each one in order.
   */
  fieldIdFor: (key: string) => string | string[];
  headings: {
    one: string;
    many: (n: number) => string;
  };
  smoothScroll?: boolean;
  className?: string;
};

export const FormErrorSummary = forwardRef<HTMLDivElement, FormErrorSummaryProps>(
  function FormErrorSummary(
    { errors, labels, fieldIdFor, headings, smoothScroll = true, className },
    ref
  ) {
    const { theme } = useTheme();
    const c = theme.colors;
    if (errors.length === 0) return null;

    const resolveCandidates = (key: string): string[] => {
      const r = fieldIdFor(key);
      return Array.isArray(r) ? r : [r];
    };

    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={className}
        style={{
          padding: "14px 16px",
          background: alpha(c.accent, 0.08),
          border: `1px solid ${alpha(c.accent, 0.2)}`,
          borderRadius: "0.75rem",
          fontFamily: theme.fonts.body,
          color: c.accentText,
          outline: "none",
        }}
      >
        <p style={{ fontSize: typeScale.bodySm, fontWeight: 600 }}>
          {errors.length === 1 ? headings.one : headings.many(errors.length)}
        </p>
        <ul
          style={{
            marginTop: 8,
            paddingLeft: 20,
            fontSize: typeScale.micro,
            listStyle: "disc",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {errors.map(([key, msg]) => {
            const candidates = resolveCandidates(key);
            return (
              <li key={key} style={{ overflowWrap: "anywhere" }}>
                <a
                  href={`#${candidates[0]}`}
                  onClick={(e) => {
                    e.preventDefault();
                    for (const id of candidates) {
                      const el = document.getElementById(id);
                      if (el && typeof (el as HTMLElement).focus === "function") {
                        (el as HTMLElement).focus();
                        el.scrollIntoView({
                          block: "center",
                          behavior: smoothScroll ? "smooth" : "auto",
                        });
                        return;
                      }
                    }
                  }}
                  style={{ color: c.accentText, textDecoration: "underline" }}
                >
                  {labels[key] || key}: {msg}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
