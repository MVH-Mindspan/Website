"use client";

import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import FormField from "./FormField";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const GREEN = "#083630";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

type StepAddressProps = {
  data: {
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    zipCode: string;
    otherFirstName: string;
    otherLastName: string;
    reason: string;
    referralSource: string;
  };
  visitFor: string;
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
};

export default function StepAddress({ data, visitFor, onChange, errors }: StepAddressProps) {
  const reducedMotion = useReducedMotion();
  const showOtherName = visitFor === "someone-else";

  return (
    <div>
      <h2 className="studio-h2" style={{ color: GREEN }}>
        A few more details
      </h2>
      <p
        className="studio-lead mt-3"
        style={{ color: "rgba(8,54,48,0.7)" }}
      >
        This helps us prepare for your visit and send any materials you might need.
      </p>

      <motion.div
        className="mt-10 space-y-8 max-w-lg"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        {/* Conditional: other person's name */}
        <AnimatePresence>
          {showOtherName && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <div
                className="rounded-xl p-5 mb-2"
                style={{ background: "rgba(8,54,48,0.03)", border: "1px solid rgba(8,54,48,0.08)" }}
              >
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: GREEN }}
                >
                  Who is the visit for?
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Their first name"
                    name="otherFirstName"
                    placeholder="First name"
                    value={data.otherFirstName}
                    onChange={(v) => onChange("otherFirstName", v)}
                    error={errors.otherFirstName}
                  />
                  <FormField
                    label="Their last name"
                    name="otherLastName"
                    placeholder="Last name"
                    value={data.otherLastName}
                    onChange={(v) => onChange("otherLastName", v)}
                    error={errors.otherLastName}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Address */}
        <motion.div className="space-y-4" variants={fadeUp}>
          <p
            className="text-sm font-medium"
            style={{ color: GREEN }}
          >
            Your address
          </p>
          <FormField
            label="Street address"
            name="streetAddress"
            required
            placeholder="123 Main St"
            value={data.streetAddress}
            onChange={(v) => onChange("streetAddress", v)}
            error={errors.streetAddress}
          />
          <FormField
            label="Street address line 2"
            name="streetAddress2"
            placeholder="Apt, suite, unit, etc."
            value={data.streetAddress2}
            onChange={(v) => onChange("streetAddress2", v)}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <FormField
              label="City"
              name="city"
              required
              placeholder="Boston"
              value={data.city}
              onChange={(v) => onChange("city", v)}
              error={errors.city}
            />
            <FormField
              label="State"
              name="state"
              type="select"
              required
              placeholder="Select state"
              value={data.state}
              onChange={(v) => onChange("state", v)}
              error={errors.state}
              options={US_STATES.map((s) => ({ label: s, value: s }))}
            />
            <FormField
              label="Zip code"
              name="zipCode"
              required
              placeholder="02101"
              value={data.zipCode}
              onChange={(v) => onChange("zipCode", v)}
              error={errors.zipCode}
            />
          </div>
        </motion.div>

        {/* Extras */}
        <motion.div className="space-y-4" variants={fadeUp}>
          <FormField
            label="Reason for your interest in Mindspan"
            name="reason"
            type="textarea"
            placeholder="Tell us a bit about what's going on and what you're hoping for..."
            value={data.reason}
            onChange={(v) => onChange("reason", v)}
          />
          <FormField
            label="How did you hear about us?"
            name="referralSource"
            placeholder="e.g., My doctor, Google, a friend"
            value={data.referralSource}
            onChange={(v) => onChange("referralSource", v)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
