// Loose, RFC-friendly email shape. Accepts +aliases, dots, and most TLDs.
// We deliberately don't try to be smarter than the user.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/** Format a US phone number progressively as the user types. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Strip everything but digits and clamp to 10 characters. */
export function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 10);
}
