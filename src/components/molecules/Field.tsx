"use client";

import type { CSSProperties } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";

type FieldOption = { label: string; value: string };

export type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: "text" | "email" | "tel";
  as?: "input" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  hint?: string;
  error?: string;
  maxLength?: number;
  options?: FieldOption[];
  rows?: number;
};

export function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  as = "input",
  required,
  placeholder,
  autoComplete,
  inputMode,
  hint,
  error,
  maxLength,
  options,
  rows = 3,
}: FieldProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontFamily: theme.fonts.body,
    fontSize: typeScale.bodySm,
    color: c.ink,
    background: c.cream,
    border: `1px solid ${error ? c.accent : alpha(c.ink, 0.14)}`,
    borderRadius: "0.75rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.currentTarget.style.borderColor = c.brandGreen;
    e.currentTarget.style.background = "#fff";
    e.currentTarget.style.boxShadow = `0 0 0 3px ${alpha(c.brandGreen, 0.12)}`;
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.currentTarget.style.borderColor = error ? c.accent : alpha(c.ink, 0.14);
    e.currentTarget.style.background = c.cream;
    e.currentTarget.style.boxShadow = "none";
    onBlur?.();
  };

  const ariaProps = {
    "aria-required": required ? true : undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  } as const;

  return (
    <div style={{ minWidth: 0 }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: theme.fonts.body,
          fontSize: typeScale.bodySm,
          fontWeight: 500,
          color: c.ink,
          marginBottom: 6,
          overflowWrap: "break-word",
        }}
      >
        {label}
        {required && (
          <>
            <span aria-hidden style={{ color: c.accent, marginLeft: 4 }}>
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          {...ariaProps}
          style={{ ...inputStyle, resize: "vertical", minHeight: 88 }}
        />
      ) : as === "select" ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          {...ariaProps}
          style={{
            ...inputStyle,
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M6 8L1 3h10z' fill='${c.brandGreen}'/></svg>`
            )}")`,
            backgroundSize: "12px",
            backgroundPosition: "right 16px center",
            backgroundRepeat: "no-repeat",
            paddingRight: 40,
            color: value ? c.ink : alpha(c.ink, 0.55),
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          {...ariaProps}
          style={inputStyle}
        />
      )}
      {error ? (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          style={{
            marginTop: 6,
            fontFamily: theme.fonts.body,
            fontSize: typeScale.micro,
            color: c.accentText,
            fontWeight: 500,
            overflowWrap: "anywhere",
          }}
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={hintId}
          style={{
            marginTop: 6,
            fontFamily: theme.fonts.body,
            fontSize: typeScale.micro,
            color: alpha(c.ink, 0.55),
            lineHeight: 1.5,
            overflowWrap: "break-word",
          }}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
