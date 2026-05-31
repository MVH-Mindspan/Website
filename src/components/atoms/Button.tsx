"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";

type Variant = "primary" | "secondary" | "accent" | "ghostDark" | "ghostLight";
type Size = "sm" | "md" | "lg";

const sizeStyles: Record<Size, CSSProperties> = {
  sm: { padding: "12px 20px", fontSize: "0.875rem", minHeight: 44 },
  md: { padding: "14px 28px", fontSize: "0.9375rem", minHeight: 44 },
  lg: { padding: "16px 32px", fontSize: "1rem", minHeight: 48 },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  iconRight?: ReactNode;
  target?: string;
  rel?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  iconRight,
  target,
  rel,
  disabled,
  className,
  style,
  "aria-label": ariaLabel,
}: Props) {
  const { theme } = useTheme();
  const c = theme.colors;

  // Variant strategy:
  // - primary / secondary / accent are SOLID CTAs. They carry text-on-color
  //   pairs that need WCAG AA contrast, so backgrounds stay opaque. They still
  //   get a subtle inset highlight + soft drop shadow for refinement.
  // - ghostDark / ghostLight are translucent on purpose. Glass behaviour only
  //   makes sense for surfaces where the underlying section/photo should show
  //   through; ghosts are designed to sit on contrasting backgrounds.
  const variantStyles: Record<Variant, CSSProperties> = {
    primary: {
      background: c.brandGreen,
      color: "#fff",
      boxShadow:
        "inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 8px 24px -8px rgba(8, 54, 48, 0.35)",
    },
    secondary: {
      background: "#fff",
      color: c.brandGreen,
      border: `1px solid ${alpha(c.ink, 0.08)}`,
      boxShadow:
        "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 8px 24px -8px rgba(8, 54, 48, 0.18)",
    },
    accent: {
      background: c.accent,
      color: "#fff",
      boxShadow:
        "inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 8px 24px -8px rgba(251, 77, 23, 0.45)",
    },
    ghostDark: {
      background: alpha(c.ink, 0.04),
      color: c.ink,
      border: `1px solid ${alpha(c.ink, 0.3)}`,
      boxShadow:
        "inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 4px 16px -4px rgba(8, 54, 48, 0.12)",
    },
    // ghostLight is only safe on dark backgrounds (hero photo, primary teal
    // section). On a light section the white-on-translucent-white text would
    // be invisible.
    ghostLight: {
      background: "rgba(255, 255, 255, 0.08)",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.65)",
      boxShadow:
        "inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 16px -4px rgba(0, 0, 0, 0.2)",
    },
  };

  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: theme.fonts.body,
    fontWeight: 600,
    borderRadius: "10rem",
    backdropFilter: "blur(32px) saturate(180%) brightness(1.08)",
    WebkitBackdropFilter: "blur(32px) saturate(180%) brightness(1.08)",
    textWrap: "balance",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    maxWidth: "100%",
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const content = (
    <>
      {children}
      {iconRight}
    </>
  );

  const hoverClass = disabled ? "" : "v2-btn";
  const combined = `${hoverClass} ${className ?? ""}`.trim();

  if (href && !disabled) {
    // Treat anything that isn't relative, an in-page anchor, or a mindspan.co host as external.
    const isExternal =
      /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?mindspan\.co(\/|$|\?|#)/i.test(href);
    const finalTarget = target ?? (isExternal ? "_blank" : undefined);
    // When opening in a new tab, always set rel for security; preserve any caller-supplied tokens.
    let finalRel = rel;
    if (finalTarget === "_blank") {
      const tokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));
      tokens.add("noopener");
      tokens.add("noreferrer");
      finalRel = Array.from(tokens).join(" ");
    }

    return (
      <a
        href={href}
        onClick={onClick}
        target={finalTarget}
        rel={finalRel}
        aria-label={ariaLabel}
        className={combined}
        style={baseStyle}
        data-proximity=""
      >
        {content}
      </a>
    );
  }

  // Disabled link: render as a non-interactive anchor with aria-disabled for AT.
  if (href && disabled) {
    return (
      <a
        role="link"
        aria-disabled="true"
        tabIndex={-1}
        aria-label={ariaLabel}
        className={combined}
        style={{ ...baseStyle, pointerEvents: "none" }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      className={combined}
      style={baseStyle}
      data-proximity={disabled ? undefined : ""}
    >
      {content}
    </button>
  );
}
