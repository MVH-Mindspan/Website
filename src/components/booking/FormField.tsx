"use client";

import { forwardRef } from "react";

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
  options?: { label: string; value: string }[];
  className?: string;
};

const inputClasses =
  "w-full rounded-xl border px-4 py-3 text-[0.9375rem] leading-snug outline-none transition-all duration-200 bg-white placeholder:text-[rgba(8,54,48,0.35)]";
const focusClasses =
  "focus:border-[#083630] focus:ring-2 focus:ring-[#083630]/10";
const errorClasses = "border-red-400 focus:border-red-500 focus:ring-red-500/10";
const normalBorder = "border-[rgba(8,54,48,0.15)]";

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, FormFieldProps>(
  function FormField(
    { label, name, type = "text", placeholder, required, value, onChange, onBlur, error, options, className = "" },
    ref
  ) {
    const id = `field-${name}`;
    const borderClass = error ? errorClasses : normalBorder;

    return (
      <div className={className}>
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-1.5"
          style={{ color: "#083630" }}
        >
          {label}
          {required && (
            <span className="text-[#fb4d17] ml-0.5">*</span>
          )}
        </label>

        {type === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            rows={3}
            className={`${inputClasses} ${focusClasses} ${borderClass} resize-none`}
            style={{ color: "#111" }}
          />
        ) : type === "select" ? (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`${inputClasses} ${focusClasses} ${borderClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20d%3D%22M6%208L1%203h10z%22%20fill%3D%22%23083630%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
            style={{ color: value ? "#111" : "rgba(8,54,48,0.35)" }}
          >
            <option value="" disabled>
              {placeholder || "Select..."}
            </option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`${inputClasses} ${focusClasses} ${borderClass}`}
            style={{ color: "#111" }}
          />
        )}

        {error && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

export default FormField;
