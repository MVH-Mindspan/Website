"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ease, type as typeScale } from "@/lib/tokens";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Heading } from "@/components/atoms/Heading";

const SUBMIT_TIMEOUT_MS = 15000;

type FormData = {
  referrerFirstName: string;
  referrerLastName: string;
  referrerEmail: string;
  referrerPhone: string;
  practiceName: string;
  patientFirstName: string;
  patientLastName: string;
  patientPhone: string;
  notes: string;
};

const initial: FormData = {
  referrerFirstName: "",
  referrerLastName: "",
  referrerEmail: "",
  referrerPhone: "",
  practiceName: "",
  patientFirstName: "",
  patientLastName: "",
  patientPhone: "",
  notes: "",
};

type Errors = Partial<Record<keyof FormData, string>>;

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.referrerFirstName.trim()) errors.referrerFirstName = "Required";
  if (!data.referrerLastName.trim()) errors.referrerLastName = "Required";
  if (!data.referrerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.referrerEmail))
    errors.referrerEmail = "Enter a valid email";
  if (!data.patientFirstName.trim()) errors.patientFirstName = "Required";
  if (!data.patientLastName.trim()) errors.patientLastName = "Required";
  if (!data.patientPhone.trim() || data.patientPhone.replace(/\D/g, "").length < 10)
    errors.patientPhone = "Enter a 10-digit phone number";
  return errors;
}

type Copy = {
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  privacy: string;
};

export function ReferForm({ copy }: { copy: Copy }) {
  const { theme } = useTheme();
  const c = theme.colors;
  const reduceMotion = useReducedMotion();

  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();

  const update = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (prev[field]) {
          const next = { ...prev };
          delete next[field];
          return next;
        }
        return prev;
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (submitting || submitted) return;
      const stepErrors = validate(data);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        const firstKey = Object.keys(stepErrors)[0];
        const el = document.getElementById(`refer-${firstKey}`);
        el?.focus();
        return;
      }
      setSubmitError(undefined);
      setSubmitting(true);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
      try {
        const res = await fetch("/api/refer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referrer: {
              firstName: data.referrerFirstName,
              lastName: data.referrerLastName,
              email: data.referrerEmail,
              phone: data.referrerPhone,
              practice: data.practiceName,
            },
            patient: {
              firstName: data.patientFirstName,
              lastName: data.patientLastName,
              phone: data.patientPhone,
            },
            notes: data.notes,
          }),
          signal: controller.signal,
        });
        if (!res.ok) {
          setSubmitError(
            `Our system returned an error (${res.status}). Please try again or call us.`
          );
        } else {
          setSubmitted(true);
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
          }
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          setSubmitError("The request took too long. Please try again or call us.");
        } else {
          setSubmitError("We couldn't reach our servers. Please try again or call us.");
        }
      } finally {
        clearTimeout(timeout);
        setSubmitting(false);
      }
    },
    [data, submitting, submitted, reduceMotion]
  );

  if (submitted) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: ease.expressive as unknown as number[] }}
        style={{
          background: "#fff",
          border: `1px solid ${alpha(c.ink, 0.08)}`,
          borderRadius: "1.5rem",
          padding: "clamp(32px, 6vw, 48px) clamp(20px, 4vw, 32px)",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: alpha(c.brandGreen, 0.08),
            color: c.brandGreen,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Heading
          as="h3"
          variant="h3"
          fontFamily={theme.fonts.heading}
          color={c.ink}
        >
          {copy.successTitle}
        </Heading>
        <p
          style={{
            marginTop: 12,
            fontFamily: theme.fonts.body,
            fontSize: typeScale.body,
            color: alpha(c.ink, 0.7),
            lineHeight: 1.6,
            maxWidth: "44ch",
            marginInline: "auto",
          }}
        >
          {copy.successBody}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        background: "#fff",
        border: `1px solid ${alpha(c.ink, 0.08)}`,
        borderRadius: "1.5rem",
        padding: "32px",
        boxShadow: `0 4px 32px -16px ${alpha(c.ink, 0.18)}`,
      }}
    >
      <FieldGroup
        label="Referring provider"
        description="The clinician sending this referral"
      >
        <Row>
          <Field
            id="refer-referrerFirstName"
            label="Your first name"
            required
            value={data.referrerFirstName}
            error={errors.referrerFirstName}
            onChange={(v) => update("referrerFirstName", v)}
            autoComplete="given-name"
          />
          <Field
            id="refer-referrerLastName"
            label="Your last name"
            required
            value={data.referrerLastName}
            error={errors.referrerLastName}
            onChange={(v) => update("referrerLastName", v)}
            autoComplete="family-name"
          />
        </Row>
        <Row>
          <Field
            id="refer-referrerEmail"
            label="Your email"
            type="email"
            required
            value={data.referrerEmail}
            error={errors.referrerEmail}
            onChange={(v) => update("referrerEmail", v)}
            autoComplete="email"
            inputMode="email"
            placeholder="you@practice.com"
          />
          <Field
            id="refer-referrerPhone"
            label="Your direct phone"
            type="tel"
            value={formatPhone(data.referrerPhone)}
            error={errors.referrerPhone}
            onChange={(v) => update("referrerPhone", v.replace(/\D/g, "").slice(0, 10))}
            autoComplete="tel"
            inputMode="tel"
            placeholder="(555) 123-4567"
            hint="Optional"
          />
        </Row>
        <Field
          id="refer-practiceName"
          label="Practice name"
          value={data.practiceName}
          onChange={(v) => update("practiceName", v)}
          autoComplete="organization"
          hint="Optional"
        />
      </FieldGroup>

      <Divider />

      <FieldGroup
        label="Patient you are referring"
        description="Information about the person you want us to see."
        emphasis
      >
        <Row>
          <Field
            id="refer-patientFirstName"
            label="Patient's first name"
            required
            value={data.patientFirstName}
            error={errors.patientFirstName}
            onChange={(v) => update("patientFirstName", v)}
          />
          <Field
            id="refer-patientLastName"
            label="Patient's last name"
            required
            value={data.patientLastName}
            error={errors.patientLastName}
            onChange={(v) => update("patientLastName", v)}
          />
        </Row>
        <Field
          id="refer-patientPhone"
          label="Best phone for the patient or their caregiver"
          type="tel"
          required
          value={formatPhone(data.patientPhone)}
          error={errors.patientPhone}
          onChange={(v) => update("patientPhone", v.replace(/\D/g, "").slice(0, 10))}
          inputMode="tel"
          placeholder="(555) 123-4567"
        />
        <Field
          id="refer-notes"
          label="Anything we should know?"
          as="textarea"
          value={data.notes}
          onChange={(v) => update("notes", v)}
          hint="Optional. Urgency, language preference, caregiver context, etc. Please skip clinical detail and PHI — we capture that on the intake call."
          maxLength={600}
        />
      </FieldGroup>

      {submitError && (
        <p
          role="alert"
          aria-live="polite"
          style={{
            marginTop: 20,
            padding: "12px 14px",
            background: alpha(c.accent, 0.08),
            color: c.accentText,
            borderRadius: "0.75rem",
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
          }}
        >
          {submitError}
        </p>
      )}

      <div
        style={{
          marginTop: 28,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <button
          type="submit"
          disabled={submitting}
          className="hover:-translate-y-0.5"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: theme.fonts.body,
            fontWeight: 600,
            fontSize: typeScale.body,
            padding: "16px 32px",
            background: c.brandGreen,
            color: "#fff",
            border: "none",
            borderRadius: "10rem",
            cursor: submitting ? "wait" : "pointer",
            opacity: submitting ? 0.7 : 1,
            transition: `transform 0.2s ${ease.standard}, box-shadow 0.2s ${ease.standard}, background 0.2s ease`,
            boxShadow: `0 4px 16px -4px ${alpha(c.brandGreen, 0.4)}`,
          }}
        >
          {submitting ? copy.submitting : copy.submit}
          {!submitting && <ArrowIcon />}
        </button>
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.micro,
            color: alpha(c.ink, 0.55),
            lineHeight: 1.5,
            textWrap: "pretty",
          }}
        >
          {copy.privacy}
        </p>
      </div>
    </form>
  );
}

function FieldGroup({
  label,
  description,
  emphasis,
  children,
}: {
  label: string;
  description?: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: description ? 4 : 16,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: emphasis ? c.accent : c.brandGreen,
            flexShrink: 0,
          }}
        />
        <legend
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            color: c.ink,
            fontWeight: 600,
            letterSpacing: "-0.005em",
            padding: 0,
          }}
        >
          {label}
        </legend>
      </div>
      {description && (
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.micro,
            color: alpha(c.ink, 0.6),
            lineHeight: 1.5,
            marginBottom: 16,
            marginLeft: 16,
          }}
        >
          {description}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </fieldset>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
      }}
      className="refer-row"
    >
      {children}
      <style jsx>{`
        @media (max-width: 560px) {
          .refer-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function Divider() {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <div
      aria-hidden
      style={{
        height: 1,
        background: alpha(c.ink, 0.08),
        marginBlock: 24,
      }}
    />
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "tel";
  as?: "input" | "textarea";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  hint?: string;
  error?: string;
  maxLength?: number;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  as = "input",
  required,
  placeholder,
  autoComplete,
  inputMode,
  hint,
  error,
  maxLength,
}: FieldProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  const inputStyle: React.CSSProperties = {
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

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = c.brandGreen;
    e.currentTarget.style.background = "#fff";
    e.currentTarget.style.boxShadow = `0 0 0 3px ${alpha(c.brandGreen, 0.12)}`;
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = error ? c.accent : alpha(c.ink, 0.14);
    e.currentTarget.style.background = c.cream;
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: theme.fonts.body,
          fontSize: typeScale.bodySm,
          fontWeight: 500,
          color: c.ink,
          marginBottom: 6,
        }}
      >
        {label}
        {required && (
          <span aria-hidden style={{ color: c.accent, marginLeft: 4 }}>
            *
          </span>
        )}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={3}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          style={{ ...inputStyle, resize: "vertical", minHeight: 88 }}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          style={inputStyle}
        />
      )}
      {error ? (
        <p
          id={errorId}
          role="alert"
          style={{
            marginTop: 6,
            fontFamily: theme.fonts.body,
            fontSize: typeScale.micro,
            color: c.accentText,
            fontWeight: 500,
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
          }}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

