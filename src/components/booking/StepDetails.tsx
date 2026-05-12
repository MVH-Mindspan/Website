"use client";

import { useCallback } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { FormErrorSummary } from "@/components/molecules/FormErrorSummary";
import { bookingPage } from "@/content/pages/booking";
import { formatPhone, normalizePhone } from "@/lib/forms";
import FormField from "./FormField";

const detailsCopy = bookingPage.details;
const FIELD_LABELS = detailsCopy.fieldLabels;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

type BookingFor = "self" | "loved-one" | "";

type StepDetailsProps = {
  data: {
    bookingFor: BookingFor;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    patientFirstName: string;
    patientLastName: string;
    relationship: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
};

export default function StepDetails({ data, onChange, errors }: StepDetailsProps) {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const c = theme.colors;
  const isCaregiver = data.bookingFor === "loved-one";

  const handlePhoneChange = useCallback(
    (value: string) => {
      onChange("phone", normalizePhone(value));
    },
    [onChange]
  );

  const errorEntries = Object.entries(errors).filter(([, msg]) => Boolean(msg));
  const hasErrors = errorEntries.length > 0;

  // The wizard's continue handler moves focus to the first invalid field —
  // that triggers the most actionable AT cue. The summary block here is a
  // visual + scroll target only. We do not steal focus here.

  const contactHeading = isCaregiver ? detailsCopy.titleCaregiver : detailsCopy.titleSelf;
  const contactSubtitle = isCaregiver ? detailsCopy.leadCaregiver : detailsCopy.leadSelf;

  return (
    <div>
      <Eyebrow color={c.accent}>{isCaregiver ? detailsCopy.eyebrowCaregiver : detailsCopy.eyebrowSelf}</Eyebrow>
      <Heading
        as="h2"
        variant="h2"
        fontFamily={theme.fonts.heading}
        color={c.brandGreen}
        className="mt-3"
      >
        {contactHeading}
      </Heading>
      <Lead
        size="md"
        color={alpha(c.brandGreen, 0.7)}
        className="mt-3"
        maxWidth="56ch"
      >
        {contactSubtitle}
      </Lead>

      {hasErrors && (
        <div className="mt-6">
          <FormErrorSummary
            errors={errorEntries as Array<[string, string]>}
            labels={FIELD_LABELS}
            fieldIdFor={(key) => [
              `field-${key}`,
              `field-${key}-self`,
              `field-${key}-loved-one`,
            ]}
            headings={detailsCopy.errorSummary}
          />
        </div>
      )}

      <motion.div
        className="mt-10 space-y-8"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <fieldset>
            <legend
              className="block text-sm font-medium mb-3"
              style={{ color: c.brandGreen }}
            >
              {detailsCopy.bookingForLegend}
              <span aria-hidden="true" className="ml-0.5" style={{ color: c.accent }}>*</span>
              <span className="sr-only"> (required)</span>
            </legend>
            <div
              className="grid sm:grid-cols-2 gap-3"
              role="radiogroup"
              aria-required="true"
              aria-invalid={errors.bookingFor ? true : undefined}
              aria-describedby={errors.bookingFor ? "field-bookingFor-error" : undefined}
            >
              {detailsCopy.bookingForChoices.map((choice) => {
                const selected = data.bookingFor === choice.id;
                return (
                  <button
                    key={choice.id}
                    id={`field-bookingFor-${choice.id}`}
                    type="button"
                    role="radio"
                    onClick={() => onChange("bookingFor", choice.id)}
                    aria-checked={selected}
                    className={`
                      relative text-left rounded-xl px-4 py-4 cursor-pointer min-w-0
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#083630]/30
                      ${selected
                        ? "border-2 border-[#083630] bg-white shadow-[0_8px_24px_-12px_rgba(8,54,48,0.25)]"
                        : "border border-[rgba(8,54,48,0.15)] bg-white hover:border-[rgba(8,54,48,0.35)]"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        aria-hidden="true"
                        className={`
                          mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center
                          transition-colors
                          ${selected
                            ? "bg-[#083630]"
                            : "border border-[rgba(8,54,48,0.3)] bg-white"
                          }
                        `}
                      >
                        {selected && (
                          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white">
                            <path
                              d="M2 6l3 3 5-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span
                          className="text-base font-semibold leading-tight break-words"
                          style={{ color: c.brandGreen }}
                        >
                          {choice.title}
                        </span>
                        <span
                          className="mt-0.5 text-sm break-words"
                          style={{ color: alpha(c.brandGreen, 0.6) }}
                        >
                          {choice.subtitle}
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.bookingFor && (
              <p
                id="field-bookingFor-error"
                role="alert"
                aria-live="polite"
                className="mt-2 text-xs font-medium"
                style={{ color: c.accentText }}
              >
                {errors.bookingFor}
              </p>
            )}
          </fieldset>
        </motion.div>

        {isCaregiver && (
          <motion.div
            className="space-y-5 max-w-lg"
            variants={fadeUp}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div>
              <h3
                className="text-base font-semibold"
                style={{ color: c.brandGreen }}
              >
                {detailsCopy.patientGroup.title}
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: alpha(c.brandGreen, 0.6) }}
              >
                {detailsCopy.patientGroup.subtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                label={FIELD_LABELS.patientFirstName}
                name="patientFirstName"
                required
                placeholder={detailsCopy.placeholders.patientFirstName}
                value={data.patientFirstName}
                onChange={(v) => onChange("patientFirstName", v)}
                error={errors.patientFirstName}
                maxLength={120}
                autoComplete="off"
              />
              <FormField
                label={FIELD_LABELS.patientLastName}
                name="patientLastName"
                required
                placeholder={detailsCopy.placeholders.patientLastName}
                value={data.patientLastName}
                onChange={(v) => onChange("patientLastName", v)}
                error={errors.patientLastName}
                maxLength={120}
                autoComplete="off"
              />
            </div>

            <FormField
              label={FIELD_LABELS.relationship}
              name="relationship"
              type="select"
              required
              placeholder={detailsCopy.placeholders.relationship}
              value={data.relationship}
              onChange={(v) => onChange("relationship", v)}
              error={errors.relationship}
              options={detailsCopy.relationshipOptions}
            />
          </motion.div>
        )}

        <motion.div className="space-y-5 max-w-lg" variants={fadeUp}>
          {isCaregiver && (
            <div>
              <h3
                className="text-base font-semibold"
                style={{ color: c.brandGreen }}
              >
                {detailsCopy.selfGroup.title}
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: alpha(c.brandGreen, 0.6) }}
              >
                {detailsCopy.selfGroup.subtitle}
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              label={FIELD_LABELS.firstName}
              name="firstName"
              required
              placeholder={detailsCopy.placeholders.firstName}
              value={data.firstName}
              onChange={(v) => onChange("firstName", v)}
              error={errors.firstName}
              maxLength={120}
              autoComplete="given-name"
            />
            <FormField
              label={FIELD_LABELS.lastName}
              name="lastName"
              required
              placeholder={detailsCopy.placeholders.lastName}
              value={data.lastName}
              onChange={(v) => onChange("lastName", v)}
              error={errors.lastName}
              maxLength={120}
              autoComplete="family-name"
            />
          </div>

          <FormField
            label={FIELD_LABELS.email}
            name="email"
            type="email"
            placeholder={detailsCopy.placeholders.email}
            value={data.email}
            onChange={(v) => onChange("email", v)}
            error={errors.email}
            maxLength={255}
            autoComplete="email"
            inputMode="email"
            hint={detailsCopy.emailHint}
          />

          <FormField
            label={FIELD_LABELS.phone}
            name="phone"
            type="tel"
            required
            placeholder={detailsCopy.placeholders.phone}
            value={formatPhone(data.phone)}
            onChange={handlePhoneChange}
            error={errors.phone}
            maxLength={20}
            autoComplete="tel-national"
            inputMode="tel"
            hint={detailsCopy.phoneHint}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
