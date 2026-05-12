"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { bookingPage } from "@/content/pages/booking";
import { isEmail } from "@/lib/forms";
import ProgressBar from "./ProgressBar";
import StepState, { type StateChoice } from "./StepState";
import StepCareOption from "./StepCareOption";
import StepDetails from "./StepDetails";
import StepReview from "./StepReview";
import StepWaitlist from "./StepWaitlist";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

const STORAGE_KEY = "mindspan:booking:v1";
const SUBMIT_TIMEOUT_MS = 15000;
const detailsErrors = bookingPage.details.errors;
const waitlistErrors = bookingPage.waitlist.errors;
const submitErrorCopy = bookingPage.submitErrors;
const srHeadings = bookingPage.srHeadings;
const shellCopy = bookingPage.shell;

// Field order on the details step, used to scroll the first invalid field
// into view when validation fails.
const DETAILS_FIELD_ORDER = [
  "bookingFor",
  "patientFirstName",
  "patientLastName",
  "relationship",
  "firstName",
  "lastName",
  "email",
  "phone",
] as const;

const WAITLIST_FIELD_ORDER = ["firstName", "email", "phone"] as const;

function focusFirstError(orderedKeys: readonly string[], errors: StepErrors) {
  if (typeof document === "undefined") return;
  const firstKey = orderedKeys.find((k) => errors[k]);
  if (!firstKey) return;
  // Try the canonical `field-{name}` id first, then fall back to a couple of
  // sibling ids used for radio groups.
  const candidates = [
    `field-${firstKey}`,
    `field-${firstKey}-self`,
    `field-${firstKey}-loved-one`,
  ];
  for (const id of candidates) {
    const el = document.getElementById(id);
    if (el && typeof (el as HTMLElement).focus === "function") {
      (el as HTMLElement).focus({ preventScroll: false });
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
  }
}

type BookingFor = "self" | "loved-one" | "";

type FormData = {
  state: StateChoice | "";
  careOption: string;
  bookingFor: BookingFor;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  patientFirstName: string;
  patientLastName: string;
  relationship: string;
};

const initialFormData: FormData = {
  state: "",
  careOption: "",
  bookingFor: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  patientFirstName: "",
  patientLastName: "",
  relationship: "",
};

type StepId = "state" | "waitlist" | "care" | "details" | "review";

const BOOKING_STEPS: { id: StepId; label: string }[] = [
  { id: "state", label: shellCopy.progressLabels[0] },
  { id: "care", label: shellCopy.progressLabels[1] },
  { id: "details", label: shellCopy.progressLabels[2] },
  { id: "review", label: shellCopy.progressLabels[3] },
];

type StepErrors = Record<string, string>;

function validateDetails(data: FormData): StepErrors {
  const errors: StepErrors = {};
  if (!data.bookingFor) errors.bookingFor = detailsErrors.bookingForRequired;
  if (!data.firstName.trim()) errors.firstName = detailsErrors.firstNameRequired;
  if (!data.lastName.trim()) errors.lastName = detailsErrors.lastNameRequired;
  const email = data.email.trim();
  if (email && !isEmail(email)) {
    errors.email = detailsErrors.emailInvalid;
  }
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!phoneDigits) {
    errors.phone = detailsErrors.phoneRequired;
  } else if (phoneDigits.length < 10) {
    errors.phone = detailsErrors.phoneInvalid;
  }
  if (data.bookingFor === "loved-one") {
    if (!data.patientFirstName.trim())
      errors.patientFirstName = detailsErrors.patientFirstNameRequired;
    if (!data.patientLastName.trim())
      errors.patientLastName = detailsErrors.patientLastNameRequired;
    if (!data.relationship.trim())
      errors.relationship = detailsErrors.relationshipRequired;
  }
  return errors;
}

function validateWaitlist(data: FormData): StepErrors {
  const errors: StepErrors = {};
  if (!data.firstName.trim()) errors.firstName = waitlistErrors.firstNameRequired;
  const email = data.email.trim();
  if (!email) {
    errors.email = waitlistErrors.emailRequired;
  } else if (!isEmail(email)) {
    errors.email = waitlistErrors.emailInvalid;
  }
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!phoneDigits) {
    errors.phone = waitlistErrors.phoneRequired;
  } else if (phoneDigits.length < 10) {
    errors.phone = waitlistErrors.phoneInvalid;
  }
  return errors;
}

function hasFormProgress(data: FormData): boolean {
  return Boolean(
    data.state ||
      data.careOption ||
      data.bookingFor ||
      data.firstName.trim() ||
      data.lastName.trim() ||
      data.email.trim() ||
      data.phone.trim() ||
      data.patientFirstName.trim() ||
      data.patientLastName.trim() ||
      data.relationship.trim()
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

type SubmitResult = { ok: true } | { ok: false; error: string };

async function submitForm(
  endpoint: string,
  payload: unknown,
  signal: AbortSignal
): Promise<SubmitResult> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal,
    });
    if (!res.ok) {
      // 4xx means we sent something the server rejected; 5xx means our side.
      // Either way, the caregiver isn't at fault, so we keep the message warm.
      const isClientError = res.status >= 400 && res.status < 500;
      return {
        ok: false,
        error: isClientError ? submitErrorCopy.client : submitErrorCopy.server,
      };
    }
    return { ok: true };
  } catch (err) {
    const error = err as { name?: string };
    if (error?.name === "AbortError") {
      return { ok: false, error: submitErrorCopy.timeout };
    }
    return { ok: false, error: submitErrorCopy.network };
  }
}

export default function BookingWizard() {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const c = theme.colors;
  const [stepId, setStepId] = useState<StepId>("state");
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);

  const stepHeadingRef = useRef<HTMLDivElement | null>(null);
  const submitControllerRef = useRef<AbortController | null>(null);
  const autoAdvanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  // Track mount status and tear down any pending work on unmount.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
      if (submitControllerRef.current) {
        submitControllerRef.current.abort();
      }
    };
  }, []);

  // Fire booking_started once per wizard mount.
  useEffect(() => {
    track(ANALYTICS_EVENTS.bookingStarted);
  }, []);

  // Track each step view (including resumed-from-storage step on hydrate).
  useEffect(() => {
    track(ANALYTICS_EVENTS.bookingStepViewed, { step: stepId });
  }, [stepId]);

  // Move focus to the step heading when the step changes — for screen readers.
  useEffect(() => {
    if (!hydrated) return;
    // Allow AnimatePresence/exit transition to complete before focusing.
    const t = setTimeout(() => {
      if (!isMountedRef.current) return;
      stepHeadingRef.current?.focus();
    }, reducedMotion ? 0 : 380);
    return () => clearTimeout(t);
  }, [stepId, submitted, hydrated, reducedMotion]);

  // Hydrate from sessionStorage after mount (avoid SSR mismatch).
  useEffect(() => {
    setHydrated(true);
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { formData?: FormData; stepId?: StepId };
      if (parsed.formData) {
        setFormData({ ...initialFormData, ...parsed.formData });
      }
      if (parsed.stepId) {
        setStepId(parsed.stepId);
      }
    } catch {
      // Corrupt storage — ignore and start fresh.
    }
  }, []);

  // Persist formData + stepId until submitted. Clear on success.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (submitted) {
        sessionStorage.removeItem(STORAGE_KEY);
        return;
      }
      if (hasFormProgress(formData)) {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ formData, stepId })
        );
      }
    } catch {
      // Storage unavailable (e.g. private mode quota) — silently degrade.
    }
  }, [formData, stepId, submitted, hydrated]);

  // Warn on accidental tab close / refresh while form has unsaved data.
  useEffect(() => {
    if (submitted) return;
    const dirty = hasFormProgress(formData);
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [formData, submitted]);

  const updateField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const goTo = useCallback(
    (target: StepId, dir: 1 | -1 = 1) => {
      setDirection(dir);
      setErrors({});
      setSubmitError(undefined);
      setStepId(target);
      window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
    },
    [reducedMotion]
  );

  const handleStateSelect = useCallback(
    (state: StateChoice) => {
      updateField("state", state);
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
      autoAdvanceTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        if (state === "Other") {
          goTo("waitlist", 1);
        } else {
          goTo("care", 1);
        }
      }, reducedMotion ? 0 : 350);
    },
    [updateField, goTo, reducedMotion]
  );

  const handleCareSelect = useCallback(
    (id: string) => {
      updateField("careOption", id);
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
      autoAdvanceTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        goTo("details", 1);
      }, reducedMotion ? 0 : 350);
    },
    [updateField, goTo, reducedMotion]
  );

  const handleDetailsContinue = useCallback(() => {
    const stepErrors = validateDetails(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Move keyboard focus to the first invalid field so the user lands
      // somewhere actionable instead of having to hunt.
      requestAnimationFrame(() => focusFirstError(DETAILS_FIELD_ORDER, stepErrors));
      return;
    }
    goTo("review", 1);
  }, [formData, goTo]);

  const handleWaitlistSubmit = useCallback(async () => {
    if (submitting || submitted) return;
    const stepErrors = validateWaitlist(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      requestAnimationFrame(() => focusFirstError(WAITLIST_FIELD_ORDER, stepErrors));
      return;
    }
    setSubmitError(undefined);
    setSubmitting(true);
    const controller = new AbortController();
    submitControllerRef.current = controller;
    const timeout = setTimeout(() => controller.abort("timeout"), SUBMIT_TIMEOUT_MS);
    const result = await submitForm(
      "/api/waitlist",
      {
        firstName: formData.firstName.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        state: formData.state,
      },
      controller.signal
    );
    clearTimeout(timeout);
    submitControllerRef.current = null;
    if (!isMountedRef.current) return;
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
      track(ANALYTICS_EVENTS.waitlistSubmitted, { state: formData.state });
    } else {
      setSubmitError(result.error);
      track(ANALYTICS_EVENTS.waitlistSubmitFailed, { state: formData.state });
    }
  }, [formData, submitting, submitted]);

  const handleBookingSubmit = useCallback(async () => {
    if (submitting || submitted) return;
    // Re-validate to catch any state cleared by rapid back-navigation.
    const detailErrors = validateDetails(formData);
    if (Object.keys(detailErrors).length > 0 || !formData.state || !formData.careOption) {
      setSubmitError(bookingPage.review.submitMissing);
      return;
    }
    setSubmitError(undefined);
    setSubmitting(true);
    const controller = new AbortController();
    submitControllerRef.current = controller;
    const timeout = setTimeout(() => controller.abort("timeout"), SUBMIT_TIMEOUT_MS);
    const result = await submitForm(
      "/api/book",
      {
        state: formData.state,
        careOption: formData.careOption,
        bookingFor: formData.bookingFor,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        ...(formData.bookingFor === "loved-one" && {
          patientFirstName: formData.patientFirstName.trim(),
          patientLastName: formData.patientLastName.trim(),
          relationship: formData.relationship,
        }),
      },
      controller.signal
    );
    clearTimeout(timeout);
    submitControllerRef.current = null;
    if (!isMountedRef.current) return;
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
      track(ANALYTICS_EVENTS.bookingSubmitted, {
        state: formData.state,
        careOption: formData.careOption,
      });
    } else {
      setSubmitError(result.error);
      track(ANALYTICS_EVENTS.bookingSubmitFailed, {
        state: formData.state,
        careOption: formData.careOption,
      });
    }
  }, [formData, submitting, submitted]);

  const back = useCallback(() => {
    if (stepId === "care") goTo("state", -1);
    else if (stepId === "details") goTo("care", -1);
    else if (stepId === "review") goTo("details", -1);
    else if (stepId === "waitlist") goTo("state", -1);
  }, [stepId, goTo]);

  const isWaitlist = stepId === "waitlist";
  const showProgress = !isWaitlist && !submitted;
  const progressIndex = BOOKING_STEPS.findIndex((s) => s.id === stepId);
  const showContinue = stepId === "details";
  const showBack = stepId !== "state" && !submitted;

  const handleProgressClick = useCallback(
    (i: number) => {
      const target = BOOKING_STEPS[i].id;
      if (i < progressIndex) goTo(target, -1);
    },
    [progressIndex, goTo]
  );

  const handleExitClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (submitted) return;
      if (!hasFormProgress(formData)) return;
      const confirmed = window.confirm(shellCopy.exitConfirm);
      if (!confirmed) {
        e.preventDefault();
        return;
      }
      track(ANALYTICS_EVENTS.bookingAbandoned, { step: stepId });
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    },
    [formData, submitted, stepId]
  );

  const renderStep = () => {
    switch (stepId) {
      case "state":
        return (
          <StepState value={formData.state} onChange={handleStateSelect} />
        );
      case "waitlist":
        return (
          <StepWaitlist
            data={formData}
            onChange={updateField}
            errors={errors}
            onSubmit={handleWaitlistSubmit}
            submitting={submitting}
            submitted={submitted}
            submitError={submitError}
          />
        );
      case "care":
        return (
          <StepCareOption
            state={formData.state as Exclude<StateChoice, "Other">}
            value={formData.careOption}
            onChange={handleCareSelect}
          />
        );
      case "details":
        return (
          <StepDetails
            data={formData}
            onChange={updateField}
            errors={errors}
          />
        );
      case "review":
        return (
          <StepReview
            data={formData}
            onEditCare={() => goTo("care", -1)}
            onEditDetails={() => goTo("details", -1)}
            onSubmit={handleBookingSubmit}
            submitting={submitting}
            submitted={submitted}
            submitError={submitError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: c.cream }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
        style={{ background: c.brandGreen }}
      >
        {shellCopy.skipToMain}
      </a>
      <header className="py-6">
        <Container className="flex items-center justify-between">
          <a
            href="/"
            onClick={handleExitClick}
            className="flex items-center gap-3 group"
          >
            <img
              src="/assets/mindspan-logo-horizontal-dark.png"
              srcSet="/assets/mindspan-logo-horizontal-dark.png 1x, /assets/mindspan-logo-horizontal-dark@2x.png 2x, /assets/mindspan-logo-horizontal-dark@3x.png 3x"
              alt="Mindspan"
              className="h-8 w-auto"
            />
          </a>
          <a
            href="/"
            onClick={handleExitClick}
            className="text-sm font-medium flex items-center gap-1.5 transition-colors"
            style={{ color: alpha(c.brandGreen, 0.72) }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {shellCopy.backToSite}
          </a>
        </Container>
      </header>

      {showProgress && (
        <Container className="pb-8">
          <div className="max-w-2xl mx-auto">
            <ProgressBar
              steps={BOOKING_STEPS.map((s) => s.label)}
              currentStep={Math.max(progressIndex, 0)}
              onStepClick={handleProgressClick}
            />
          </div>
        </Container>
      )}

      <main id="main-content" className="pb-32" aria-busy={submitting}>
        <Container>
        {/* Hidden focus target so screen readers land on the step heading
            on step change. We use this rather than focusing the heading
            directly to avoid disturbing visual styles. */}
        <div
          ref={stepHeadingRef}
          tabIndex={-1}
          className="sr-only"
          aria-live="polite"
        >
          {submitted
            ? srHeadings.submitted
            : stepId === "state"
              ? srHeadings.state
              : stepId === "care"
                ? srHeadings.care
                : stepId === "details"
                  ? srHeadings.details
                  : stepId === "review"
                    ? srHeadings.review
                    : stepId === "waitlist"
                      ? srHeadings.waitlist
                      : ""}
        </div>
        <div
          className="max-w-3xl mx-auto rounded-3xl p-4 sm:p-6 md:p-10 lg:p-12 min-w-0"
          style={{
            background: "#fff",
            border: `1px solid ${alpha(c.brandGreen, 0.06)}`,
            boxShadow: `0 4px 40px -12px ${alpha(c.brandGreen, 0.08)}`,
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={stepId + (submitted ? "-done" : "")}
              custom={direction}
              variants={reducedMotion ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE }}
              className="min-w-0"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {(showBack || showContinue) && !submitted && (
          <div className="max-w-3xl mx-auto mt-6 flex items-center justify-between px-2">
            {showBack ? (
              <Button variant="ghostDark" onClick={back}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </Button>
            ) : (
              <div />
            )}
            {showContinue && (
              <Button
                variant="primary"
                onClick={handleDetailsContinue}
                iconRight={<ArrowIcon />}
              >
                Continue
              </Button>
            )}
          </div>
        )}
        </Container>
      </main>
    </div>
  );
}
