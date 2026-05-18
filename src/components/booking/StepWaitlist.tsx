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
import { SuccessExhale } from "@/components/molecules/SuccessExhale";
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
    lastName: string;
    stateOfResidence: string;
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
      <div className="py-12" role="status" aria-live="polite">
        <SuccessExhale
          title={waitlistCopy.success.title}
          body={waitlistCopy.success.body}
          action={
            <Button href="/" variant="primary">
              {waitlistCopy.success.backToHome}
            </Button>
          }
        />
      </div>
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
            label={waitlistCopy.fieldLabels.stateOfResidence}
            name="stateOfResidence"
            type="select"
            required
            placeholder={waitlistCopy.placeholders.stateOfResidence}
            value={data.stateOfResidence}
            onChange={(v) => onChange("stateOfResidence", v)}
            error={errors.stateOfResidence}
            options={waitlistCopy.stateOptions}
          />
        </motion.div>

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
            label={waitlistCopy.fieldLabels.lastName}
            name="lastName"
            required
            placeholder={waitlistCopy.placeholders.lastName}
            value={data.lastName}
            onChange={(v) => onChange("lastName", v)}
            error={errors.lastName}
            maxLength={120}
            autoComplete="family-name"
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
