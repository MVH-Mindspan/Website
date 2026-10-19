import type { CSSProperties, ReactNode } from "react";
import { tracking } from "@/lib/tokens";

export function Eyebrow({
  children,
  color,
  className,
  style,
  as: Tag = "p",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** Render as a heading when the eyebrow is the only label of its section. */
  as?: "p" | "h2";
}) {
  return (
    <Tag
      className={className}
      style={{
        // Global h1-h3 rules set the serif heading face; eyebrows stay in body type.
        fontFamily: "inherit",
        fontWeight: 600,
        fontSize: "0.9375rem",
        letterSpacing: tracking.eyebrow,
        textTransform: "uppercase",
        overflowWrap: "break-word",
        minWidth: 0,
        color,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
