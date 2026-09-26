"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Mask } from "@/components/mask";

const KEY = "ews2-splash-seen";
const SPLASH_SECONDS = 14;

export function Splash() {
  const [active, setActive] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(SPLASH_SECONDS);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const leavingRef = useRef(false);

  /* ───────── session / replay logic ───────── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const force = params.has("splash") || params.has("replay") || params.has("intro");
    const seen = sessionStorage.getItem(KEY);

    if (seen && !force) {
      setActive(false);
      document.body.style.overflow = "";
      return;
    }

    setActive(true);
    document.body.style.overflow = "hidden";

    // staggered content reveal
    const t = setTimeout(() => setShowContent(true), 400);

    const handleReplay = () => {
      leavingRef.current = false;
      setActive(true);
      setLeaving(false);
      setReady(false);
      setShowContent(false);
      setSecondsLeft(SPLASH_SECONDS);
      setProgress(0);
      setIsMuted(true);
      startTimeRef.current = null;
      document.body.style.overflow = "hidden";
      setTimeout(() => setShowContent(true), 400);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        videoRef.current.play().then(() => setIsMuted(false)).catch(() => {
          videoRef.current!.muted = true;
          videoRef.current!.play().catch(() => {});
        });
      }
    };

    window.addEventListener("ews:replay-splash", handleReplay);
    return () => {
      clearTimeout(t);
      window.removeEventListener("ews:replay-splash", handleReplay);
      document.body.style.overflow = "";
    };
  }, []);

  /* ───────── enter site ───────── */
  const enter = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    sessionStorage.setItem(KEY, "1");

    // Smooth audio fade
    const v = videoRef.current;
    if (v && !v.muted && v.volume > 0) {
      const fadeStep = v.volume / 12;
      const id = window.setInterval(() => {
        if (v.volume > fadeStep) {
          v.volume = Math.max(0, v.volume - fadeStep);
        } else {
          v.volume = 0;
          v.pause();
          window.clearInterval(id);
        }
      }, 50);
    }

    window.setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
    }, 1200);
  }, []);

  /* ───────── keyboard ───────── */
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        enter();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleAudio();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, enter]);

  /* ───────── autoplay with sound ───────── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !active) return;

    v.currentTime = 0;
    v.volume = 1.0;

    // Try with sound first
    v.muted = false;
    const p = v.play();
    if (p !== undefined) {
      p.then(() => {
        setIsMuted(false);
        setReady(true);
      }).catch(() => {
        // Browser blocked unmuted autoplay — fall back
        v.muted = true;
        setIsMuted(true);
        v.play().then(() => setReady(true)).catch(() => {});
      });
    }

    const onReady = () => setReady(true);
    const onEnd = () => enter();
    v.addEventListener("canplay", onReady);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("ended", onEnd);
    };
  }, [active, enter]);

  /* ───────── 14-second countdown ───────── */
  useEffect(() => {
    if (!active || leaving) {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      return;
    }
    startTimeRef.current = performance.now();
    const dur = SPLASH_SECONDS * 1000;

    const tick = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const ratio = Math.min(1, elapsed / dur);
      setProgress(ratio * 100);
      setSecondsLeft(Math.max(0, Math.ceil((dur - elapsed) / 1000)));

      if (elapsed >= dur) {
        enter();
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };
    timerRef.current = requestAnimationFrame(tick);
    return () => { if (timerRef.current) cancelAnimationFrame(timerRef.current); };
  }, [active, leaving, enter]);

  /* ───────── toggle audio ───────── */
  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (isMuted || v.muted) {
      v.muted = false;
      v.volume = 1.0;
      v.play().catch(() => {});
      setIsMuted(false);
    } else {
      v.muted = true;
      setIsMuted(true);
    }
  };

  if (!active) return null;

  /* ───────── progress ring SVG math ───────── */
  const circumference = 2 * Math.PI * 19;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div
      onClick={enter}
      className={`splash-root fixed inset-0 z-[100] flex cursor-pointer select-none items-center justify-center overflow-hidden bg-ink ${
        leaving ? "splash-leaving" : ""
      }`}
      role="dialog"
      aria-label="Welcome video intro"
    >
      {/* ── Cinematic gold top-line progress ── */}
      <div className="splash-topbar pointer-events-none absolute inset-x-0 top-0 z-40 h-[3px]">
        <div
          className="splash-topbar-fill h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Layer 1: blurred ambient glow of the video ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden splash-ambient-wrap">
        <video
          className="splash-ambient absolute inset-[-20%] h-[140%] w-[140%] object-cover"
          autoPlay muted loop playsInline preload="auto"
          aria-hidden
        >
          <source src="/eyes.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Layer 2: main video ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className={`splash-video absolute inset-0 h-full w-full object-cover ${
            ready ? "is-playing" : ""
          }`}
          autoPlay muted={isMuted} playsInline preload="auto"
        >
          <source src="/eyes.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Layer 3: cinematic overlays ── */}
      <div className="pointer-events-none absolute inset-0 splash-vignette" />
      <div className="pointer-events-none absolute inset-0 splash-gold-wash" />
      <div className="pointer-events-none absolute inset-0 splash-scanlines" />

      {/* ── Layer 4: animated corner filigree frame ── */}
      <div className="pointer-events-none absolute inset-5 z-20 sm:inset-10 splash-frame">
        {/* Top-left */}
        <svg className="splash-corner splash-corner-tl" viewBox="0 0 60 60" fill="none">
          <path d="M0 60 V8 Q0 0 8 0 H60" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0 40 V8 Q0 0 8 0 H40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="20" cy="3" r="1.5" fill="currentColor" opacity="0.5" />
          <circle cx="3" cy="20" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
        {/* Top-right */}
        <svg className="splash-corner splash-corner-tr" viewBox="0 0 60 60" fill="none">
          <path d="M60 60 V8 Q60 0 52 0 H0" stroke="currentColor" strokeWidth="1.5" />
          <path d="M60 40 V8 Q60 0 52 0 H20" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <circle cx="52" cy="8" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="40" cy="3" r="1.5" fill="currentColor" opacity="0.5" />
          <circle cx="57" cy="20" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
        {/* Bottom-left */}
        <svg className="splash-corner splash-corner-bl" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 V52 Q0 60 8 60 H60" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0 20 V52 Q0 60 8 60 H40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <circle cx="8" cy="52" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="20" cy="57" r="1.5" fill="currentColor" opacity="0.5" />
          <circle cx="3" cy="40" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
        {/* Bottom-right */}
        <svg className="splash-corner splash-corner-br" viewBox="0 0 60 60" fill="none">
          <path d="M60 0 V52 Q60 60 52 60 H0" stroke="currentColor" strokeWidth="1.5" />
          <path d="M60 20 V52 Q60 60 52 60 H20" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <circle cx="52" cy="52" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="40" cy="57" r="1.5" fill="currentColor" opacity="0.5" />
          <circle cx="57" cy="40" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* ── Layer 5: staggered center content ── */}
      <div className={`splash-content relative z-20 flex flex-col items-center px-6 text-center ${
        showContent ? "is-visible" : ""
      } ${leaving ? "is-leaving" : ""}`}>
        {/* Mask emblem */}
        <div className="splash-el splash-el-1">
          <Mask className="h-10 w-16 sm:h-14 sm:w-24 splash-mask-glow" />
        </div>

        {/* Presenter line */}
        <p className="splash-el splash-el-2 mt-3 text-[10px] uppercase tracking-[0.6em] text-gold-200/90 sm:text-xs">
          {site.presenter} Presents
        </p>

        {/* Title */}
        <h1 className="splash-el splash-el-3 splash-title mt-2 font-script text-4xl font-black tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
          Eyes Wide Shut
          <span className="splash-el-edition ml-2 align-top text-primary sm:ml-3">2</span>
        </h1>

        {/* Tagline */}
        <p className="splash-el splash-el-4 mt-3 max-w-lg font-serif text-sm italic tracking-wider text-gold-100/80 sm:text-base md:text-lg">
          {site.tagline}
        </p>

        {/* Date badge */}
        <div className="splash-el splash-el-5 mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-ink/60 px-5 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary splash-dot-pulse" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-200/90 sm:text-xs">
            {site.dateLabel}
          </span>
        </div>
      </div>

      {/* ── Layer 6: bottom HUD ── */}
      <div className={`splash-hud absolute inset-x-0 bottom-0 z-30 ${showContent ? "is-visible" : ""}`}>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 pb-6 sm:pb-10">

          {/* Unmute prompt — only if browser blocked audio */}
          {isMuted && (
            <button
              type="button"
              onClick={toggleAudio}
              className="splash-unmute-btn group flex items-center gap-2.5 rounded-full border border-primary/50 bg-ink/80 px-5 py-2.5 backdrop-blur-md"
            >
              {/* sound-wave icon */}
              <svg className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" opacity="0.3" />
                <line x1="23" y1="9" x2="17" y2="15" className="animate-pulse" />
                <line x1="17" y1="9" x2="23" y2="15" className="animate-pulse" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-100">
                Tap for Sound
              </span>
            </button>
          )}

          {/* Controls row */}
          <div className="flex w-full items-center justify-between gap-3">

            {/* Audio toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className="splash-ctrl group flex items-center gap-2 rounded-full border border-primary/25 bg-ink/70 px-3.5 py-2 backdrop-blur-md"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <svg className="size-4 text-muted-foreground group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <>
                  <svg className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" opacity="0.3" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                  <div className="flex items-end gap-[3px] h-4">
                    <span className="splash-eq-bar w-[3px] rounded-full bg-primary" style={{ animationDelay: "0s" }} />
                    <span className="splash-eq-bar w-[3px] rounded-full bg-primary" style={{ animationDelay: "0.15s" }} />
                    <span className="splash-eq-bar w-[3px] rounded-full bg-primary" style={{ animationDelay: "0.3s" }} />
                    <span className="splash-eq-bar w-[3px] rounded-full bg-primary" style={{ animationDelay: "0.1s" }} />
                    <span className="splash-eq-bar w-[3px] rounded-full bg-primary" style={{ animationDelay: "0.25s" }} />
                  </div>
                </>
              )}
            </button>

            {/* Enter site CTA */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); enter(); }}
              className="splash-enter-btn group relative flex items-center gap-3 rounded-full px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.35em]"
            >
              <span className="splash-enter-shimmer" />
              <span className="relative z-10">Enter the Masquerade</span>
              <svg className="relative z-10 size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Countdown ring */}
            <div className="splash-ctrl flex items-center gap-2 rounded-full border border-primary/25 bg-ink/70 px-3 py-1.5 backdrop-blur-md">
              <div className="relative flex size-9 items-center justify-center">
                <svg className="size-9 -rotate-90" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="19" className="fill-none stroke-primary/15" strokeWidth="2" />
                  <circle
                    cx="21" cy="21" r="19"
                    className="fill-none stroke-primary splash-ring-progress"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-mono text-[11px] font-bold text-gold-100 tabular-nums">
                  {secondsLeft}
                </span>
              </div>
            </div>
          </div>

          {/* Hint text */}
          <p className="splash-hint text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60">
            Tap anywhere · Press Enter · or wait {secondsLeft}s
          </p>
        </div>
      </div>
    </div>
  );
}
