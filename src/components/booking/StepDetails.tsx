"use client";

import { useCallback } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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

type StepDetailsProps = {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function StepDetails({ data, onChange, errors }: StepDetailsProps) {
  const reducedMotion = useReducedMotion();

  const handlePhoneChange = useCallback(
    (value: string) => {
      // Allow typing freely, store formatted
      const digits = value.replace(/\D/g, "").slice(0, 10);
      onChange("phone", digits);
    },
    [onChange]
  );

  return (
    <div>
      <h2 className="studio-h2" style={{ color: GREEN }}>
        Tell us about yourself
      </h2>
      <p
        className="studio-lead mt-3"
        style={{ color: "rgba(8,54,48,0.7)" }}
      >
        We just need a few details so our team can reach you.
      </p>

      <motion.div
        className="mt-10 space-y-5 max-w-lg"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        <motion.div className="grid sm:grid-cols-2 gap-4" variants={fadeUp}>
          <FormField
            label="First name"
            name="firstName"
            required
            placeholder="Jane"
            value={data.firstName}
            onChange={(v) => onChange("firstName", v)}
            error={errors.firstName}
          />
          <FormField
            label="Last name"
            name="lastName"
            required
            placeholder="Smith"
            value={data.lastName}
            onChange={(v) => onChange("lastName", v)}
            error={errors.lastName}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={data.email}
            onChange={(v) => onChange("email", v)}
            error={errors.email}
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
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
