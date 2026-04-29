"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";

type Props = {
  children: ReactNode;
  radius?: string;
  className?: string;
  style?: CSSProperties;
};

export function ImageFrame({
  children,
  radius = "2rem",
  className,
  style,
}: Props) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <div
      className={`overflow-hidden ${className ?? ""}`.trim()}
      style={{
        borderRadius: radius,
        border: `1px solid ${alpha(c.ink, 0.08)}`,
        boxShadow: [
          `inset 0 1px 0 ${alpha("#ffffff", 0.45)}`,
          `0 1px 2px ${alpha(c.ink, 0.06)}`,
          `0 18px 40px -16px ${alpha(c.ink, 0.22)}`,
        ].join(", "),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
