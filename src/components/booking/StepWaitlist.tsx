"use client";

import { useCallback } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Button } from "@/components/atoms/Button";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { bookingPage } from "@/content/pages/booking";
import { formatPhone, normalizePhone } from "@/lib/forms";
import FormField from "./FormField";
import SubmitErrorBlock from "./SubmitErrorBlock";

const waitlistCopy = bookingPage.waitlist;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

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
  const { theme } = useTheme();
  const c = theme.colors;

  const handlePhoneChange = useCallback(
    (value: string) => {
      onChange("phone", normalizePhone(value));
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
          style={{ background: alpha(c.brandGreen, 0.08), color: c.brandGreen }}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8">
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
        <Heading
          as="h2"
          variant="h2"
          fontFamily={theme.fonts.heading}
          color={c.brandGreen}
        >
          {waitlistCopy.success.title}
        </Heading>
        <Lead
          size="md"
          color={alpha(c.brandGreen, 0.7)}
          className="mt-4 mx-auto"
          maxWidth="32rem"
        >
          {waitlistCopy.success.body}
        </Lead>
        <div className="mt-8 inline-flex">
          <Button href="/" variant="primary">
            {waitlistCopy.success.backToHome}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <Eyebrow color={c.accent}>{waitlistCopy.eyebrow}</Eyebrow>
      <Heading
        as="h2"
        variant="h2"
        fontFamily={theme.fonts.heading}
        color={c.brandGreen}
        className="mt-3"
      >
        {waitlistCopy.title}
      </Heading>
      <Lead
        size="md"
        color={alpha(c.brandGreen, 0.7)}
        className="mt-3"
        maxWidth="56ch"
      >
        {waitlistCopy.lead}
      </Lead>

      <motion.form
        className="mt-10 space-y-5 max-w-lg"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        aria-busy={submitting}
      >
        <motion.div variants={fadeUp}>
          <FormField
            label={waitlistCopy.fieldLabels.firstName}
            name="firstName"
            required
            placeholder={waitlistCopy.placeholders.firstName}
            value={data.firstName}
            onChange={(v) => onChange("firstName", v)}
            error={errors.firstName}
            maxLength={120}
            autoComplete="given-name"
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <FormField
            label={waitlistCopy.fieldLabels.email}
            name="email"
            type="email"
            required
            placeholder={waitlistCopy.placeholders.email}
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
            label={waitlistCopy.fieldLabels.phone}
            name="phone"
            type="tel"
            required
            placeholder={waitlistCopy.placeholders.phone}
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
          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={submitting}
            iconRight={!submitting ? <ArrowIcon /> : undefined}
            style={submitting ? { cursor: "wait", opacity: 0.7 } : undefined}
          >
            {submitting ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                />
                <span>{waitlistCopy.submitting}</span>
                <span className="sr-only">{waitlistCopy.submittingAria}</span>
              </>
            ) : (
              waitlistCopy.submit
            )}
          </Button>
          <p
            className="text-xs mt-3"
            style={{ color: alpha(c.brandGreen, 0.72) }}
          >
            {waitlistCopy.privacy}
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
}
