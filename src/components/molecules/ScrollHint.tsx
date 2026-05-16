"use client";

import { useEffect, useState } from "react";

type Props = {
  color?: string;
  delayMs?: number;
  bottomOffset?: number;
};

export function ScrollHint({
  color = "#F5EBD8",
  delayMs = 4000,
  bottomOffset = 16,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let shown = false;

    const timer = window.setTimeout(() => {
      if (window.scrollY <= 8) {
        shown = true;
        setVisible(true);
      }
    }, delayMs);

    const onScroll = () => {
      if (window.scrollY > 8) {
        window.clearTimeout(timer);
        if (shown) {
          shown = false;
          setVisible(false);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [delayMs]);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: "50%",
        bottom: bottomOffset,
        transform: "translateX(-50%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
        pointerEvents: "none",
        color,
        zIndex: 5,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.14)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.28)",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.18)",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="scroll-hint-chevron"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <style jsx>{`
        @keyframes scroll-hint-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
        .scroll-hint-chevron {
          animation: scroll-hint-bounce 2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-hint-chevron {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
