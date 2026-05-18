"use client";

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
import { formatPhone } from "@/lib/forms";
import { getCareOption } from "./StepCareOption";
import SubmitErrorBlock from "./SubmitErrorBlock";

const reviewCopy = bookingPage.review;
const RELATIONSHIP_LABELS = reviewCopy.relationshipLabels;

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
  bookingFor: "self" | "loved-one" | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  patientFirstName: string;
  patientLastName: string;
  relationship: string;
};

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
  submitError?: string;
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
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: alpha(c.brandGreen, 0.02),
        border: `1px solid ${alpha(c.brandGreen, 0.08)}`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{
            color: alpha(c.brandGreen, 0.72),
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
          style={{ color: c.accent, background: alpha(c.accent, 0.06) }}
        >
          {reviewCopy.edit}
        </button>
      </div>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  const { theme } = useTheme();
  const c = theme.colors;
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-1.5">
      <dt
        className="text-sm shrink-0 sm:w-28"
        style={{ color: alpha(c.brandGreen, 0.5) }}
      >
        {label}
      </dt>
      <dd
        className="text-sm font-medium break-words min-w-0"
        style={{ color: c.brandGreen }}
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
  submitError,
}: StepReviewProps) {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const c = theme.colors;

  if (submitted) {
    return (
      <div className="py-12" role="status" aria-live="polite">
        <SuccessExhale
          title={reviewCopy.success.title}
          body={reviewCopy.success.body}
          action={
            <Button href="/" variant="primary">
              {reviewCopy.success.backToHome}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <Eyebrow color={c.accent}>{reviewCopy.eyebrow}</Eyebrow>
      <Heading
        as="h2"
        variant="h2"
        fontFamily={theme.fonts.heading}
        color={c.brandGreen}
        className="mt-3"
      >
        {reviewCopy.title}
      </Heading>
      <Lead
        size="md"
        color={alpha(c.brandGreen, 0.7)}
        className="mt-3"
        maxWidth="56ch"
      >
        {reviewCopy.lead}
      </Lead>

      <motion.div
        className="mt-10 space-y-4"
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <ReviewSection title={reviewCopy.sectionLabels.visit} onEdit={onEditCare}>
            <p className="text-sm font-medium" style={{ color: c.brandGreen }}>
              {careOptionLabel(data.careOption)}
            </p>
          </ReviewSection>
        </motion.div>

        {data.bookingFor === "loved-one" && (
          <motion.div variants={fadeUp}>
            <ReviewSection title={reviewCopy.sectionLabels.patient} onEdit={onEditDetails}>
              <dl className="space-y-0.5">
                <ReviewRow
                  label={reviewCopy.rowLabels.name}
                  value={`${data.patientFirstName} ${data.patientLastName}`.trim()}
                />
                <ReviewRow
                  label={reviewCopy.rowLabels.relationship}
                  value={RELATIONSHIP_LABELS[data.relationship] || data.relationship}
                />
              </dl>
            </ReviewSection>
          </motion.div>
        )}

        <motion.div variants={fadeUp}>
          <ReviewSection
            title={data.bookingFor === "loved-one" ? reviewCopy.sectionLabels.yourContactCaregiver : reviewCopy.sectionLabels.yourDetails}
            onEdit={onEditDetails}
          >
            <dl className="space-y-0.5">
              <ReviewRow
                label={reviewCopy.rowLabels.name}
                value={`${data.firstName} ${data.lastName}`.trim()}
              />
              <ReviewRow label={reviewCopy.rowLabels.phone} value={formatPhone(data.phone)} />
              <ReviewRow label={reviewCopy.rowLabels.email} value={data.email} />
            </dl>
          </ReviewSection>
        </motion.div>

        {submitError && (
          <motion.div variants={fadeUp}>
            <SubmitErrorBlock message={submitError} onRetry={onSubmit} disabled={submitting} />
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="pt-6 flex flex-col items-center">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            onClick={onSubmit}
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
                <span>{reviewCopy.submitting}</span>
                <span className="sr-only">{reviewCopy.submittingAria}</span>
              </>
            ) : (
              reviewCopy.submit
            )}
          </Button>
          <p
            className="text-center text-xs mt-3"
            style={{ color: alpha(c.brandGreen, 0.72) }}
          >
            {reviewCopy.privacy}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
