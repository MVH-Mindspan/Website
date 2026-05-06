"use client";

import { useCallback } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import FormField from "./FormField";

const GREEN = "#083630";

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

const RELATIONSHIP_OPTIONS = [
  { label: "Spouse or partner", value: "spouse-partner" },
  { label: "Parent", value: "parent" },
  { label: "Adult child", value: "adult-child" },
  { label: "Sibling", value: "sibling" },
  { label: "Other family member", value: "other-family" },
  { label: "Friend", value: "friend" },
  { label: "Professional caregiver", value: "professional-caregiver" },
  { label: "Other", value: "other" },
];

const BOOKING_FOR_CHOICES: { id: BookingFor; title: string; subtitle: string }[] = [
  {
    id: "self",
    title: "Myself",
    subtitle: "I'm the patient",
  },
  {
    id: "loved-one",
    title: "A loved one",
    subtitle: "I'm helping arrange their care",
  },
];

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function StepDetails({ data, onChange, errors }: StepDetailsProps) {
  const reducedMotion = useReducedMotion();
  const isCaregiver = data.bookingFor === "loved-one";

  const handlePhoneChange = useCallback(
    (value: string) => {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      onChange("phone", digits);
    },
    [onChange]
  );

  const contactHeading = isCaregiver ? "Your contact info" : "Tell us about yourself";
  const contactSubtitle = isCaregiver
    ? "We'll use these details to reach you about their care."
    : "We just need a few details so our team can reach you.";

  return (
    <div>
      <h2 className="studio-h2" style={{ color: GREEN }}>
        {contactHeading}
      </h2>
      <p className="studio-lead mt-3" style={{ color: "rgba(8,54,48,0.7)" }}>
        {contactSubtitle}
      </p>

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
              style={{ color: GREEN }}
            >
              Who is this visit for?
              <span className="text-[#fb4d17] ml-0.5">*</span>
            </legend>
            <div className="grid sm:grid-cols-2 gap-3">
              {BOOKING_FOR_CHOICES.map((c) => {
                const selected = data.bookingFor === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onChange("bookingFor", c.id)}
                    aria-pressed={selected}
                    className={`
                      relative text-left rounded-xl px-4 py-4 cursor-pointer
                      transition-all duration-200
                      ${selected
                        ? "border-2 border-[#083630] bg-white shadow-[0_8px_24px_-12px_rgba(8,54,48,0.25)]"
                        : "border border-[rgba(8,54,48,0.15)] bg-white hover:border-[rgba(8,54,48,0.35)]"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
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
                      <span className="flex flex-col">
                        <span
                          className="text-base font-semibold leading-tight"
                          style={{ color: GREEN }}
                        >
                          {c.title}
                        </span>
                        <span
                          className="mt-0.5 text-sm"
                          style={{ color: "rgba(8,54,48,0.6)" }}
                        >
                          {c.subtitle}
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.bookingFor && (
              <p
                role="alert"
                aria-live="polite"
                className="mt-2 text-xs text-red-500 font-medium"
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
                style={{ color: GREEN }}
              >
                About the patient
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(8,54,48,0.6)" }}
              >
                A few details about the person you're booking for.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                label="Patient's first name"
                name="patientFirstName"
                required
                placeholder="John"
                value={data.patientFirstName}
                onChange={(v) => onChange("patientFirstName", v)}
                error={errors.patientFirstName}
                maxLength={120}
                autoComplete="off"
              />
              <FormField
                label="Patient's last name"
                name="patientLastName"
                required
                placeholder="Smith"
                value={data.patientLastName}
                onChange={(v) => onChange("patientLastName", v)}
                error={errors.patientLastName}
                maxLength={120}
                autoComplete="off"
              />
            </div>

            <FormField
              label="Your relationship to the patient"
              name="relationship"
              type="select"
              required
              placeholder="Select a relationship"
              value={data.relationship}
              onChange={(v) => onChange("relationship", v)}
              error={errors.relationship}
              options={RELATIONSHIP_OPTIONS}
            />
          </motion.div>
        )}

        <motion.div className="space-y-5 max-w-lg" variants={fadeUp}>
          {isCaregiver && (
            <div>
              <h3
                className="text-base font-semibold"
                style={{ color: GREEN }}
              >
                About you
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(8,54,48,0.6)" }}
              >
                So our team knows how to reach you.
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
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
            <FormField
              label="Last name"
              name="lastName"
              required
              placeholder="Smith"
              value={data.lastName}
              onChange={(v) => onChange("lastName", v)}
              error={errors.lastName}
              maxLength={120}
              autoComplete="family-name"
            />
          </div>

          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={data.email}
            onChange={(v) => onChange("email", v)}
            error={errors.email}
            maxLength={255}
            autoComplete="email"
            inputMode="email"
          />

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
      </motion.div>
    </div>
  );
}
