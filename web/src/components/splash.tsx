"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const KEY = "ews2-splash-seen";

export function Splash() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(KEY);
    if (!seen) {
      setActive(true);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const enter = useCallback(() => {
    setLeaving(true);
    sessionStorage.setItem(KEY, "1");
    window.setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
    }, 1100);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, enter]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !active) return;
    if (v.readyState >= 3) {
      setReady(true);
      return;
    }
    const play = () => {
      v.play().catch(() => {});
    };
    v.addEventListener("canplaythrough", play, { once: true });
    return () => v.removeEventListener("canplaythrough", play);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-[1100ms] ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Fullscreen video — scaled up with cinematic blur to mask low source resolution */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="splash-video absolute inset-[-8%] h-[116%] w-[116%] object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={() => setReady(true)}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
        >
          <source src="/assets/splash.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Vignette + gold wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,4,6,0.9)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/85" />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center px-6 text-center transition-all duration-700 ${
          ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } ${leaving ? "scale-105" : "scale-100"}`}
      >
        <p className="mb-4 text-[11px] uppercase tracking-[0.55em] text-gold-200/80 sm:text-sm">
          {site.presenter} Presents
        </p>
        <h1 className="marquee-title font-script text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Eyes Wide Shut
          <span className="ml-3 align-top text-primary">2</span>
        </h1>
        <p className="mt-5 max-w-md font-serif text-base italic text-gold-100/85 sm:text-lg">
          {site.tagline}
        </p>

        <button
          onClick={enter}
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-primary/50 bg-ink/40 px-8 py-3 text-sm uppercase tracking-[0.35em] text-gold-100 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-ink"
        >
          Enter
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </button>
        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          {site.dateLabel}
        </p>
      </div>

      {/* Animated bulb frame corners */}
      <div className="pointer-events-none absolute inset-4 rounded-lg border border-primary/15 sm:inset-8" />
    </div>
  );
}
