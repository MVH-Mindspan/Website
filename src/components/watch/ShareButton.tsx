"use client";

import { useEffect, useRef, useState } from "react";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

function copyWithTextarea(text: string): boolean {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  el.remove();
  return ok;
}

/**
 * Shares a video's standalone /watch URL. Uses the device share sheet where
 * there is one (phones, Safari, Edge), otherwise copies the link.
 */
export function ShareButton({
  url,
  title,
  slug,
  label,
  copiedLabel = "Link copied",
  className = "video-share",
}: {
  url: string;
  title: string;
  slug: string;
  label: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const showCopied = () => {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2500);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showCopied();
      return true;
    } catch {
      const ok = copyWithTextarea(url);
      if (ok) showCopied();
      return ok;
    }
  };

  const onClick = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        track(ANALYTICS_EVENTS.videoShare, { video: slug, method: "share_sheet" });
        return;
      } catch (err) {
        // Closing the share sheet is not a failure; anything else falls back to copy.
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    if (await copy()) track(ANALYTICS_EVENTS.videoShare, { video: slug, method: "copy" });
  };

  return (
    <button type="button" className={className} onClick={onClick} data-share-url={url}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M8 10.5V1.5M4.5 5 8 1.5 11.5 5M2.5 8.5v5h11v-5" />
      </svg>
      <span>{copied ? copiedLabel : label}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
