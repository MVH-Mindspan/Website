"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import StepLocation from "./StepLocation";
import StepVisitFor from "./StepVisitFor";
import StepDetails from "./StepDetails";
import StepAddress from "./StepAddress";
import StepReview from "./StepReview";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const GREEN = "#083630";
const ORANGE = "#fb4d17";

type FormData = {
  location: string;
  visitFor: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

const initialFormData: FormData = {
  location: "",
  visitFor: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipCode: "",
  otherFirstName: "",
  otherLastName: "",
  reason: "",
  referralSource: "",
};

type StepErrors = Record<string, string>;

function validateStep(step: number, data: FormData): StepErrors {
  const errors: StepErrors = {};

  switch (step) {
    case 0:
      if (!data.location) errors.location = "Please choose a location";
      break;
    case 1:
      if (!data.visitFor) errors.visitFor = "Please select who the visit is for";
      break;
    case 2:
      if (!data.firstName.trim()) errors.firstName = "First name is required";
      if (!data.lastName.trim()) errors.lastName = "Last name is required";
      if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10)
        errors.phone = "Please enter a valid phone number";
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "Please enter a valid email";
      break;
    case 3:
      if (!data.streetAddress.trim()) errors.streetAddress = "Street address is required";
      if (!data.city.trim()) errors.city = "City is required";
      if (!data.state) errors.state = "State is required";
      if (!data.zipCode.trim()) errors.zipCode = "Zip code is required";
      break;
  }

  return errors;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function BookingWizard() {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    (target: number) => {
      setDirection(target > step ? 1 : -1);
      setErrors({});
      setStep(target);
      // Scroll to top of wizard
      window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
    },
    [step, reducedMotion]
  );

  const next = useCallback(() => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    goTo(step + 1);
  }, [step, formData, goTo]);

  const back = useCallback(() => {
    if (step > 0) goTo(step - 1);
  }, [step, goTo]);

  const handleLocationSelect = useCallback(
    (locationId: string) => {
      updateField("location", locationId);
      // Auto-advance after brief highlight
      setTimeout(() => {
        setDirection(1);
        setErrors({});
        setStep(1);
      }, 400);
    },
    [updateField]
  );

  const handleVisitForSelect = useCallback(
    (value: string) => {
      updateField("visitFor", value);
      // Auto-advance after brief highlight
      setTimeout(() => {
        setDirection(1);
        setErrors({});
        setStep(2);
      }, 400);
    },
    [updateField]
  );

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    // Simulate submission — will be wired to JotForm later
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  }, []);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepLocation
            value={formData.location}
            onChange={handleLocationSelect}
          />
        );
      case 1:
        return (
          <StepVisitFor
            value={formData.visitFor}
            onChange={handleVisitForSelect}
          />
        );
      case 2:
        return (
          <StepDetails
            data={formData}
            onChange={updateField}
            errors={errors}
          />
        );
      case 3:
        return (
          <StepAddress
            data={formData}
            visitFor={formData.visitFor}
            onChange={updateField}
            errors={errors}
          />
        );
      case 4:
        return (
          <StepReview
            data={formData}
            onEdit={goTo}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitted={submitted}
          />
        );
      default:
        return null;
    }
  };

  const showContinue = step === 2 || step === 3;
  const showBack = step > 0 && step < 4;

  return (
    <div className="min-h-screen" style={{ background: "#efeeeb" }}>
      {/* Header */}
      <header className="py-6">
        <div className="studio-container flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/assets/Logo green@2x.png"
              alt="Mindspan"
              className="h-8 w-auto"
            />
          </a>
          <a
            href="/"
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

      {/* Progress */}
      {!submitted && (
        <div className="studio-container pb-8">
          <div className="max-w-2xl mx-auto">
            <ProgressBar currentStep={step} onStepClick={goTo} />
          </div>
        </div>
      )}

      {/* Wizard body */}
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
              key={step}
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

        {/* Navigation buttons */}
        {!submitted && (showContinue || showBack) && (
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
                onClick={next}
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

        {/* Step 4 (review) has its own submit button */}
      </main>
    </div>
  );
}
