"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import StepState, { type StateChoice } from "./StepState";
import StepCareOption from "./StepCareOption";
import StepDetails from "./StepDetails";
import StepReview from "./StepReview";
import StepWaitlist from "./StepWaitlist";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const STORAGE_KEY = "mindspan:booking:v1";
const SUBMIT_TIMEOUT_MS = 15000;

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
  { id: "state", label: "Where" },
  { id: "care", label: "How" },
  { id: "details", label: "You" },
  { id: "review", label: "Confirm" },
];

type StepErrors = Record<string, string>;

function validateDetails(data: FormData): StepErrors {
  const errors: StepErrors = {};
  if (!data.bookingFor) errors.bookingFor = "Please select who this visit is for";
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email";
  if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Please enter a valid phone number";
  if (data.bookingFor === "loved-one") {
    if (!data.patientFirstName.trim())
      errors.patientFirstName = "Patient's first name is required";
    if (!data.patientLastName.trim())
      errors.patientLastName = "Patient's last name is required";
    if (!data.relationship.trim())
      errors.relationship = "Please tell us your relationship";
  }
  return errors;
}

function validateWaitlist(data: FormData): StepErrors {
  const errors: StepErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email";
  if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Please enter a valid phone number";
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
      return {
        ok: false,
        error: `Our system returned an error (${res.status}). Please try again or email us.`,
      };
    }
    return { ok: true };
  } catch (err) {
    if ((err as Error)?.name === "AbortError") {
      return {
        ok: false,
        error: "The request took too long. Please check your connection and try again.",
      };
    }
    return {
      ok: false,
      error: "We couldn't reach our servers. Please check your connection and try again.",
    };
  }
}

export default function BookingWizard() {
  const reducedMotion = useReducedMotion();
  const [stepId, setStepId] = useState<StepId>("state");
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);

  // Fire booking_started once per wizard mount.
  useEffect(() => {
    track(ANALYTICS_EVENTS.bookingStarted);
  }, []);

  // Track each step view (including resumed-from-storage step on hydrate).
  useEffect(() => {
    track(ANALYTICS_EVENTS.bookingStepViewed, { step: stepId });
  }, [stepId]);

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
      setTimeout(() => {
        if (state === "Other") {
          goTo("waitlist", 1);
        } else {
          goTo("care", 1);
        }
      }, 350);
    },
    [updateField, goTo]
  );

  const handleCareSelect = useCallback(
    (id: string) => {
      updateField("careOption", id);
      setTimeout(() => {
        goTo("details", 1);
      }, 350);
    },
    [updateField, goTo]
  );

  const handleDetailsContinue = useCallback(() => {
    const stepErrors = validateDetails(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    goTo("review", 1);
  }, [formData, goTo]);

  const handleWaitlistSubmit = useCallback(async () => {
    if (submitting || submitted) return;
    const stepErrors = validateWaitlist(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setSubmitError(undefined);
    setSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    const result = await submitForm(
      "/api/waitlist",
      {
        firstName: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        state: formData.state,
      },
      controller.signal
    );
    clearTimeout(timeout);
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
      setSubmitError(
        "Some required information is missing. Please go back and complete every step."
      );
      return;
    }
    setSubmitError(undefined);
    setSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    const result = await submitForm(
      "/api/book",
      {
        state: formData.state,
        careOption: formData.careOption,
        bookingFor: formData.bookingFor,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        ...(formData.bookingFor === "loved-one" && {
          patientFirstName: formData.patientFirstName,
          patientLastName: formData.patientLastName,
          relationship: formData.relationship,
        }),
      },
      controller.signal
    );
    clearTimeout(timeout);
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
      const confirmed = window.confirm(
        "Leave booking? Your progress so far will be cleared."
      );
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
    <div className="min-h-screen" style={{ background: "#efeeeb" }}>
      <header className="py-6">
        <div className="studio-container flex items-center justify-between">
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
            style={{ color: "rgba(8,54,48,0.5)" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to site
          </a>
        </div>
      </header>

      {showProgress && (
        <div className="studio-container pb-8">
          <div className="max-w-2xl mx-auto">
            <ProgressBar
              steps={BOOKING_STEPS.map((s) => s.label)}
              currentStep={Math.max(progressIndex, 0)}
              onStepClick={handleProgressClick}
            />
          </div>
        </div>
      )}

      <main className="studio-container pb-32">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 md:p-12"
          style={{
            background: "#fff",
            border: "1px solid rgba(8,54,48,0.06)",
            boxShadow: "0 4px 40px -12px rgba(8,54,48,0.08)",
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
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {(showBack || showContinue) && !submitted && (
          <div className="max-w-3xl mx-auto mt-6 flex items-center justify-between px-2">
            {showBack ? (
              <button
                type="button"
                onClick={back}
                className="studio-btn studio-btn-ghost"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}
            {showContinue && (
              <button
                type="button"
                onClick={handleDetailsContinue}
                className="studio-btn studio-btn-primary"
              >
                Continue
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
