"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  aDir: number;
  hue: number;
};

/**
 * Ambient drifting gold bokeh / dust — evokes the shimmering particle field
 * from the flyers. Pure canvas, respects reduced-motion.
 */
export function GoldParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.floor((width * height) / 14000);
      const count = Math.max(28, Math.min(120, density));
      particles = Array.from({ length: count }, () => spawn(true));
    };

    function spawn(anywhere: boolean): Particle {
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : height + 20,
        r: Math.random() * 2.4 + 0.5,
        vy: -(Math.random() * 0.35 + 0.05),
        vx: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.6 + 0.1,
        aDir: Math.random() > 0.5 ? 1 : -1,
        hue: 40 + Math.random() * 12, // gold range
      };
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        p.a += p.aDir * 0.004;
        if (p.a <= 0.05 || p.a >= 0.8) p.aDir *= -1;

        if (p.y < -20 || p.x < -20 || p.x > width + 20) {
          Object.assign(p, spawn(false));
        }

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, `hsla(${p.hue}, 85%, 72%, ${p.a})`);
        glow.addColorStop(0.4, `hsla(${p.hue}, 80%, 55%, ${p.a * 0.5})`);
        glow.addColorStop(1, "hsla(40, 80%, 50%, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 95%, 85%, ${Math.min(1, p.a + 0.15)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, width, height);
      // static field for reduced motion
      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      draw();
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
