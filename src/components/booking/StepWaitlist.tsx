"use client";

import { useCallback } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import FormField from "./FormField";
import SubmitErrorBlock from "./SubmitErrorBlock";

const GREEN = "#083630";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

type StepWaitlistProps = {
  data: {
    firstName: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
  onSubmit: () => void;
  submitting: boolean;
  submitted: boolean;
  submitError?: string;
};

export default function StepWaitlist({
  data,
  onChange,
  errors,
  onSubmit,
  submitting,
  submitted,
  submitError,
}: StepWaitlistProps) {
  const reducedMotion = useReducedMotion();

  const handlePhoneChange = useCallback(
    (value: string) => {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      onChange("phone", digits);
    },
    [onChange]
  );

  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(34,197,94,0.1)" }}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-green-600">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h2 className="studio-h2" style={{ color: GREEN }}>
          You're on the list
        </h2>
        <p
          className="studio-lead mt-4 mx-auto max-w-md"
          style={{ color: "rgba(8,54,48,0.7)" }}
        >
          We'll reach out the moment Mindspan is available in your area.
        </p>
        <a
          href="/"
          className="studio-btn studio-btn-primary mt-8 inline-flex"
        >
          Back to homepage
        </a>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="studio-h2" style={{ color: GREEN }}>
        We're not in your state yet
      </h2>
      <p className="studio-lead mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>
        Drop your details and we'll let you know the moment Mindspan opens up in
        your area.
      </p>

      <motion.form
        className="mt-10 space-y-5 max-w-lg"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <motion.div variants={fadeUp}>
          <FormField
            label="First name"
            name="firstName"
            required
            placeholder="Jane"
            value={data.firstName}
            onChange={(v) => onChange("firstName", v)}
            error={errors.firstName}
            maxLength={120}
            autoComplete="given-name"
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <FormField
            label="Email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            value={data.email}
            onChange={(v) => onChange("email", v)}
            error={errors.email}
            maxLength={255}
            autoComplete="email"
            inputMode="email"
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <FormField
            label="Phone number"
            name="phone"
            type="tel"
            required
            placeholder="(555) 123-4567"
            value={formatPhone(data.phone)}
            onChange={handlePhoneChange}
            error={errors.phone}
            maxLength={20}
            autoComplete="tel-national"
            inputMode="tel"
          />
        </motion.div>

        {submitError && (
          <motion.div variants={fadeUp}>
            <SubmitErrorBlock message={submitError} onRetry={onSubmit} disabled={submitting} />
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="studio-btn studio-btn-accent justify-center text-base px-10 w-full sm:w-auto"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Joining...
              </>
            ) : (
              <>
                Join the waitlist
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
          <p
            className="text-xs mt-3"
            style={{ color: "rgba(8,54,48,0.72)" }}
          >
            We'll only use your information to let you know when we're available.
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
}
