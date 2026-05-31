"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: "div" | "section" | "article" | "li";
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** Opt this node into the pointer-proximity "pre-hover" effect.
   *  "strong" is reserved for signature moments (e.g. the feature-grid wave). */
  dataProximity?: "subtle" | "strong";
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  style,
  id,
  dataProximity,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduceMotion) {
      // Render statically. No transition, no observer.
      node.classList.add("on");
      return;
    }

    const isNarrow = window.innerWidth < 768;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            obs.unobserve(e.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: isNarrow ? "0px 0px -40px 0px" : "0px 0px -120px 0px",
      }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduceMotion]);

  const delayClass = delay > 0 && !reduceMotion ? ` reveal-d${delay}` : "";

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal${delayClass} ${className ?? ""}`.trim()}
      style={style}
      data-proximity={dataProximity}
    >
      {children}
    </Tag>
  );
}
