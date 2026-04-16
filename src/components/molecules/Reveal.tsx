"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: "div" | "section" | "article" | "li";
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  style,
  id,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      node.classList.add("on");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -120px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const delayClass = delay > 0 ? ` reveal-d${delay}` : "";

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal${delayClass} ${className ?? ""}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
