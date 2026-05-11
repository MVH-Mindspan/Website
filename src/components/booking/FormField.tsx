"use client";

import { Field } from "@/components/molecules/Field";

type FormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  options?: { label: string; value: string }[];
  className?: string;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
};

// Compat wrapper: booking steps use `name="X"` and rely on the canonical
// `field-${name}` id pattern (focusFirstError + error-summary anchor links).
// All visual treatment lives in the shared Field molecule.
export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  onBlur,
  error,
  hint,
  options,
  maxLength,
  autoComplete,
  inputMode,
}: FormFieldProps) {
  const id = `field-${name}`;
  const as = type === "textarea" ? "textarea" : type === "select" ? "select" : "input";
  const inputType: "text" | "email" | "tel" =
    type === "email" ? "email" : type === "tel" ? "tel" : "text";

  return (
    <Field
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={inputType}
      as={as}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      hint={hint}
      error={error}
      maxLength={maxLength}
      options={options}
    />
  );
}
