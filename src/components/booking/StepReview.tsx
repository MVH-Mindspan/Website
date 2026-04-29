"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { getCareOption } from "./StepCareOption";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const GREEN = "#083630";
const ORANGE = "#fb4d17";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type FormData = {
  state: "MA" | "CA" | "Other" | "";
  careOption: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

function formatPhone(digits: string): string {
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function careOptionLabel(id: string): string {
  const opt = getCareOption(id);
  if (!opt) return id;
  return opt.kind === "video"
    ? `${opt.city} (${opt.state})`
    : `${opt.city}, ${opt.state}`;
}

type StepReviewProps = {
  data: FormData;
  onEditCare: () => void;
  onEditDetails: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitted: boolean;
};

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "rgba(8,54,48,0.02)",
        border: "1px solid rgba(8,54,48,0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{
            color: "rgba(8,54,48,0.45)",
            fontSize: "0.6875rem",
            letterSpacing: "0.12em",
          }}
        >
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium px-3 py-1 rounded-full transition-colors"
          style={{ color: ORANGE, background: "rgba(251,77,23,0.06)" }}
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-1.5">
      <dt
        className="text-sm shrink-0 sm:w-28"
        style={{ color: "rgba(8,54,48,0.5)" }}
      >
        {label}
      </dt>
      <dd
        className="text-sm font-medium break-words min-w-0"
        style={{ color: GREEN }}
      >
        {value}
      </dd>
    </div>
  );
}

export default function StepReview({
  data,
  onEditCare,
  onEditDetails,
  onSubmit,
  submitting,
  submitted,
}: StepReviewProps) {
  const reducedMotion = useReducedMotion();

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
          You're all set
        </h2>
        <p
          className="studio-lead mt-4 mx-auto max-w-md"
          style={{ color: "rgba(8,54,48,0.7)" }}
        >
          Our team will reach out within one business day to schedule your
          visit.
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
        Almost done
      </h2>
      <p
        className="studio-lead mt-3"
        style={{ color: "rgba(8,54,48,0.7)" }}
      >
        Confirm everything looks right and we'll be in touch.
      </p>

      <motion.div
        className="mt-10 space-y-4"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <ReviewSection title="Visit type" onEdit={onEditCare}>
            <p className="text-sm font-medium" style={{ color: GREEN }}>
              {careOptionLabel(data.careOption)}
            </p>
          </ReviewSection>
        </motion.div>

        <motion.div variants={fadeUp}>
          <ReviewSection title="Your details" onEdit={onEditDetails}>
            <dl className="space-y-0.5">
              <ReviewRow
                label="Name"
                value={`${data.firstName} ${data.lastName}`.trim()}
              />
              <ReviewRow label="Email" value={data.email} />
              <ReviewRow label="Phone" value={formatPhone(data.phone)} />
            </dl>
          </ReviewSection>
        </motion.div>

        <motion.div variants={fadeUp} className="pt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="studio-btn studio-btn-accent justify-center text-base px-10"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Confirm and submit
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
          <p
            className="text-center text-xs mt-3"
            style={{ color: "rgba(8,54,48,0.4)" }}
          >
            Your information is secure and only used to schedule your visit.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
