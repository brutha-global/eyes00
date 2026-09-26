"use client";

import { Film } from "lucide-react";

export function ReplayIntroButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("ews:replay-splash"));
      }}
      className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-ink/40 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gold-200/80 backdrop-blur-sm transition-all hover:border-primary/60 hover:text-primary hover:scale-105 ${className}`}
      title="Watch the opening film intro again"
    >
      <Film className="size-3.5 text-primary" />
      <span>Replay Intro</span>
    </button>
  );
}
