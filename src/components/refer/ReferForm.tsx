"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ease, type as typeScale } from "@/lib/tokens";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Heading } from "@/components/atoms/Heading";

const SUBMIT_TIMEOUT_MS = 15000;

const FIELD_LABELS: Record<string, string> = {
  referrerFirstName: "Your first name",
  referrerLastName: "Your last name",
  referrerEmail: "Your email",
  referrerPhone: "Your direct phone",
  practiceName: "Practice name",
  patientFirstName: "Patient's first name",
  patientLastName: "Patient's last name",
  patientPhone: "Patient phone",
  notes: "Notes",
};

const FIELD_ORDER = [
  "referrerFirstName",
  "referrerLastName",
  "referrerEmail",
  "referrerPhone",
  "practiceName",
  "patientFirstName",
  "patientLastName",
  "patientPhone",
  "notes",
] as const;

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
  if (!data.referrerFirstName.trim()) errors.referrerFirstName = "Please enter your first name";
  if (!data.referrerLastName.trim()) errors.referrerLastName = "Please enter your last name";
  if (!data.referrerEmail.trim()) {
    errors.referrerEmail = "Please enter your email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.referrerEmail.trim())) {
    errors.referrerEmail = "Please enter a valid email address";
  }
  // Optional referrer phone — only validate when present.
  const referrerDigits = data.referrerPhone.replace(/\D/g, "");
  if (referrerDigits.length > 0 && referrerDigits.length < 10) {
    errors.referrerPhone = "Please enter a 10-digit phone number, or leave it blank";
  }
  if (!data.patientFirstName.trim()) errors.patientFirstName = "Please enter the patient's first name";
  if (!data.patientLastName.trim()) errors.patientLastName = "Please enter the patient's last name";
  if (!data.patientPhone.trim() || data.patientPhone.replace(/\D/g, "").length < 10)
    errors.patientPhone = "Please enter a valid 10-digit phone number";
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

  const submitControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const successWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      submitControllerRef.current?.abort();
    };
  }, []);

  // Focus the success container after submit so screen readers hear it.
  useEffect(() => {
    if (submitted) {
      successWrapperRef.current?.focus();
    }
  }, [submitted]);

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
        // Focus the error summary so AT users hear the count + list, then
        // queue moving focus into the first invalid field on the next frame.
        requestAnimationFrame(() => {
          errorSummaryRef.current?.focus();
          const firstKey = FIELD_ORDER.find((k) => stepErrors[k as keyof Errors]);
          if (!firstKey) return;
          const el = document.getElementById(`refer-${firstKey}`);
          if (el && typeof (el as HTMLElement).focus === "function") {
            // Slight delay so the summary announcement isn't pre-empted.
            setTimeout(() => {
              if (!isMountedRef.current) return;
              (el as HTMLElement).focus();
              el.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
            }, 50);
          }
        });
        return;
      }
      setSubmitError(undefined);
      setSubmitting(true);
      const controller = new AbortController();
      submitControllerRef.current = controller;
      const timeout = setTimeout(() => controller.abort("timeout"), SUBMIT_TIMEOUT_MS);
      try {
        const res = await fetch("/api/refer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referrer: {
              firstName: data.referrerFirstName.trim(),
              lastName: data.referrerLastName.trim(),
              email: data.referrerEmail.trim(),
              phone: data.referrerPhone,
              practice: data.practiceName.trim(),
            },
            patient: {
              firstName: data.patientFirstName.trim(),
              lastName: data.patientLastName.trim(),
              phone: data.patientPhone,
            },
            notes: data.notes.trim(),
          }),
          signal: controller.signal,
        });
        if (!isMountedRef.current) return;
        if (!res.ok) {
          const isClientError = res.status >= 400 && res.status < 500;
          setSubmitError(
            isClientError
              ? "Something in the form didn't come through. Please review and try again, or call us at the number to the right."
              : "Our system is having a hiccup. Please try again in a moment, or call or fax us using the contact methods to the right."
          );
        } else {
          setSubmitted(true);
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
          }
        }
      } catch (err) {
        if (!isMountedRef.current) return;
        const error = err as { name?: string };
        if (error?.name === "AbortError") {
          setSubmitError(
            "That took longer than expected. Please check your connection and try again, or call us."
          );
        } else {
          setSubmitError(
            "We couldn't reach our servers. Please try again, or call or fax us using the contact methods to the right."
          );
        }
      } finally {
        clearTimeout(timeout);
        submitControllerRef.current = null;
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      }
    },
    [data, submitting, submitted, reduceMotion]
  );

  if (submitted) {
    return (
      <motion.div
        ref={successWrapperRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: ease.expressive as unknown as number[] }}
        style={{
          background: "#fff",
          border: `1px solid ${alpha(c.ink, 0.08)}`,
          borderRadius: "1.5rem",
          padding: "clamp(32px, 6vw, 48px) clamp(20px, 4vw, 32px)",
          textAlign: "center",
          outline: "none",
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

  const errorEntries = (Object.entries(errors) as [keyof Errors, string | undefined][]).filter(
    (entry): entry is [keyof Errors, string] => Boolean(entry[1])
  );
  const hasErrors = errorEntries.length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      style={{
        background: "#fff",
        border: `1px solid ${alpha(c.ink, 0.08)}`,
        borderRadius: "1.5rem",
        padding: "32px",
        boxShadow: `0 4px 32px -16px ${alpha(c.ink, 0.18)}`,
      }}
    >
      {hasErrors && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          style={{
            marginBottom: 24,
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
            Please fix {errorEntries.length === 1 ? "this" : `these ${errorEntries.length}`}{" "}
            {errorEntries.length === 1 ? "field" : "fields"}:
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
            {errorEntries.map(([key, msg]) => (
              <li key={key} style={{ overflowWrap: "anywhere" }}>
                <a
                  href={`#refer-${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(`refer-${key}`);
                    if (el && typeof (el as HTMLElement).focus === "function") {
                      (el as HTMLElement).focus();
                      el.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
                    }
                  }}
                  style={{ color: c.accentText, textDecoration: "underline" }}
                >
                  {FIELD_LABELS[key as string] || (key as string)}: {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
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
            hint="Optional. US numbers only."
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
          hint="US numbers only. We use this to schedule the intake call."
        />
        <Field
          id="refer-notes"
          label="Anything we should know?"
          as="textarea"
          value={data.notes}
          onChange={(v) => update("notes", v)}
          hint="Optional. Urgency, language preference, caregiver context, etc. Please skip clinical detail and PHI, we capture that on the intake call."
          maxLength={600}
        />
      </FieldGroup>

      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            marginTop: 20,
            padding: "14px 16px",
            background: alpha(c.accent, 0.08),
            border: `1px solid ${alpha(c.accent, 0.2)}`,
            color: c.accentText,
            borderRadius: "0.75rem",
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            overflowWrap: "anywhere",
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: 4 }}>
            We couldn't send this referral.
          </p>
          <p>{submitError}</p>
        </div>
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
          aria-busy={submitting}
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
          {submitting ? (
            <>
              <span
                aria-hidden="true"
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(255,255,255,0.35)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: reduceMotion ? "none" : "refer-spinner 0.8s linear infinite",
                }}
              />
              <span>{copy.submitting}</span>
              <span className="sr-only">Sending the referral, please wait</span>
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowIcon />
            </>
          )}
        </button>
        <style jsx>{`
          @keyframes refer-spinner {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
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
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: 12,
      }}
      className="refer-row"
    >
      {children}
      <style jsx>{`
        @media (max-width: 560px) {
          .refer-row {
            grid-template-columns: minmax(0, 1fr) !important;
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
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          aria-required={required ? true : undefined}
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
          aria-required={required ? true : undefined}
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

