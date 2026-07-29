"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
    done: d === 0,
  };
}

export function Countdown({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO).getTime();
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-5">
      {units.map((u) => (
        <div
          key={u.label}
          className="gold-panel flex min-w-[68px] flex-col items-center rounded-xl px-3 py-3 sm:min-w-[92px] sm:px-5 sm:py-4"
        >
          <span
            className="font-display text-3xl font-bold tabular-nums text-gold-gradient sm:text-5xl"
            suppressHydrationWarning
          >
            {mounted ? String(u.value).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
