import type { ReactNode } from "react";

export function CardCaption({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2 text-[0.8125rem] ${className ?? ""}`}
      style={{ color: color ?? "rgba(8, 54, 48, 0.6)" }}
    >
      <svg
        viewBox="0 0 12 12"
        className="w-3 h-3 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M6 1.5v9M1.5 6h9M2.5 2.5l7 7M9.5 2.5l-7 7"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
      {children}
    </p>
  );
}
