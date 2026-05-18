"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { easeArrays, type as typeScale } from "@/lib/tokens";
import { Heading } from "@/components/atoms/Heading";

const REVEAL = easeArrays.reveal;

type Props = {
  title: ReactNode;
  body: ReactNode;
  action?: ReactNode;
  headingAs?: "h2" | "h3";
  headingColor?: string;
  bodyColor?: string;
  size?: "md" | "lg";
};

/**
 * Shared success panel for booking + refer + waitlist flows.
 * Plays a four-beat exhale: soft glow, ring, drawn check, then a staggered
 * rise for the title, body, and action. Collapses to a single static frame
 * under `prefers-reduced-motion: reduce`.
 */
export function SuccessExhale({
  title,
  body,
  action,
  headingAs = "h2",
  headingColor,
  bodyColor,
  size = "lg",
}: Props) {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const c = theme.colors;
  const ringId = useId();
  const glowId = useId();

  const headingTone = headingColor ?? c.brandGreen;
  const bodyTone = bodyColor ?? alpha(c.brandGreen, 0.7);

  // Path length for the SVG check — used for the stroke draw.
  const pathLength = 28;

  const sizes = size === "lg"
    ? { ring: 72, icon: 32, gap: 28 }
    : { ring: 56, icon: 24, gap: 20 };

  const glowStyle: CSSProperties = {
    position: "absolute",
    inset: "-48px",
    background: `radial-gradient(circle at 50% 50%, ${alpha(c.sand, 0.55)} 0%, ${alpha(
      c.sand,
      0
    )} 70%)`,
    pointerEvents: "none",
    zIndex: 0,
    filter: "blur(8px)",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: sizes.ring,
          height: sizes.ring,
          margin: "0 auto",
          marginBottom: sizes.gap,
        }}
      >
        {!reduceMotion && (
          <motion.div
            key={glowId}
            aria-hidden
            style={glowStyle}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: REVEAL, delay: 0.05 }}
          />
        )}
        <motion.div
          key={ringId}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: alpha(c.brandGreen, 0.08),
            color: c.brandGreen,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: REVEAL, delay: 0.12 }}
        >
          <svg
            viewBox="0 0 24 24"
            width={sizes.icon}
            height={sizes.icon}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M4.5 12.75l6 6 9-13.5"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.7, ease: REVEAL, delay: 0.32 },
                opacity: { duration: 0.2, delay: 0.32 },
              }}
              style={{ strokeDasharray: pathLength, strokeDashoffset: 0 }}
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: REVEAL, delay: 0.65 }}
      >
        <Heading
          as={headingAs}
          variant={headingAs === "h3" ? "h3" : "h2"}
          fontFamily={theme.fonts.heading}
          color={headingTone}
        >
          {title}
        </Heading>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: REVEAL, delay: 0.8 }}
        style={{
          marginTop: 16,
          marginInline: "auto",
          maxWidth: "32rem",
          fontFamily: theme.fonts.body,
          fontSize: typeScale.bodySm,
          color: bodyTone,
          lineHeight: 1.6,
        }}
      >
        {body}
      </motion.div>

      {action && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: REVEAL, delay: 0.95 }}
          style={{ marginTop: 28, display: "inline-flex" }}
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}
