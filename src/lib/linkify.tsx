import Link from "next/link";
import type { ReactNode } from "react";

const NEUROLOGIST_PATTERN = /board[-\s]certified\s+neurologists?/gi;
const PROVIDERS_HREF = "/providers#our-neurologists";

const linkStyle = {
  color: "inherit",
  textDecoration: "underline",
  textUnderlineOffset: "0.2em",
  textDecorationThickness: "1px",
} as const;

export function linkifyNeurologists(text: string): ReactNode;
export function linkifyNeurologists(text: string | undefined): ReactNode;
export function linkifyNeurologists(text: string | undefined): ReactNode {
  if (!text) return text;

  const matches = [...text.matchAll(NEUROLOGIST_PATTERN)];
  if (matches.length === 0) return text;

  const parts: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((match, i) => {
    const start = match.index ?? 0;
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <Link key={`neuro-${i}-${start}`} href={PROVIDERS_HREF} style={linkStyle}>
        {match[0]}
      </Link>,
    );
    cursor = start + match[0].length;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}
