/**
 * Ornamental Venetian masquerade mask — drawn as an SVG so it scales crisply
 * and picks up the gold gradient. Decorative only.
 */
export function Mask({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="maskGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7e7ad" />
          <stop offset="35%" stopColor="#d4af37" />
          <stop offset="70%" stopColor="#a97e1e" />
          <stop offset="100%" stopColor="#f0d585" />
        </linearGradient>
      </defs>
      <g stroke="url(#maskGold)" strokeWidth="2.4" strokeLinecap="round">
        {/* outer mask body */}
        <path
          d="M100 26c-22-16-52-20-78-10-8 3-14 12-14 28 0 26 26 44 50 44 20 0 34-14 42-30 8 16 22 30 42 30 24 0 50-18 50-44 0-16-6-25-14-28-26-10-56-6-78 10Z"
          fill="url(#maskGold)"
          fillOpacity="0.10"
        />
        {/* eye holes */}
        <ellipse cx="52" cy="52" rx="20" ry="13" fill="#060406" />
        <ellipse cx="148" cy="52" rx="20" ry="13" fill="#060406" />
        {/* filigree flourishes */}
        <path d="M100 30c0 10-4 20-4 30" strokeWidth="1.6" />
        <path d="M30 40c8-4 16-4 22 0M148 40c8-4 16-4 22 0" strokeWidth="1.4" />
        <path d="M18 66c6 6 14 8 20 6M182 66c-6 6-14 8-20 6" strokeWidth="1.4" />
        {/* top ornaments */}
        <path d="M52 34c-2-8 2-14 8-16M148 34c2-8-2-14-8-16" strokeWidth="1.4" />
        <circle cx="100" cy="20" r="3" fill="url(#maskGold)" />
        <circle cx="62" cy="14" r="2" fill="url(#maskGold)" />
        <circle cx="138" cy="14" r="2" fill="url(#maskGold)" />
      </g>
    </svg>
  );
}
