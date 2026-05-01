"use client";

import { useEffect, useRef, useState } from "react";

export function useHeroVideo({ playbackRate = 1 }: { playbackRate?: number } = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reducedData = (
      window.matchMedia("(prefers-reduced-data: reduce)") as MediaQueryList | undefined
    )?.matches;
    const slow = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const isSlow = slow?.saveData === true || slow?.effectiveType === "slow-2g" || slow?.effectiveType === "2g";
    if (reducedMotion || reducedData || isSlow) return;
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const handle = idle(() => setShowVideo(true));
    return () => {
      const cancel = (window as Window & { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback;
      if (cancel) cancel(handle as number);
    };
  }, []);

  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;

    const RAMP_DURATION = 1.4;
    const MIN_RATE = 0.5;
    const baseRate = playbackRate;

    const applyBaseRate = () => {
      v.playbackRate = baseRate;
    };

    const handleTimeUpdate = () => {
      const dur = v.duration;
      if (!isFinite(dur) || dur <= 0) return;
      const remaining = dur - v.currentTime;
      if (remaining > RAMP_DURATION || remaining <= 0) return;
      const t = 1 - remaining / RAMP_DURATION;
      const eased = t * t;
      const next = baseRate - (baseRate - MIN_RATE) * eased;
      v.playbackRate = Math.max(MIN_RATE, next);
    };

    const handleEnded = () => setEnded(true);

    v.addEventListener("loadedmetadata", applyBaseRate);
    v.addEventListener("timeupdate", handleTimeUpdate);
    v.addEventListener("ended", handleEnded);
    if (v.readyState >= 1) applyBaseRate();

    return () => {
      v.removeEventListener("loadedmetadata", applyBaseRate);
      v.removeEventListener("timeupdate", handleTimeUpdate);
      v.removeEventListener("ended", handleEnded);
    };
  }, [showVideo, playbackRate]);

  return { videoRef, showVideo, ended };
}
