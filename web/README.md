# Eyes Wide Shut 2 — Event Site

A sleek, immersive black-and-gold masquerade website for **Eyes Wide Shut 2**, an exclusive
VIP luxury soirée presented by VAB Bookings, headlined by Gary "Lil G" Jenkins of SILK.

Built with **Next.js 16 · React 19 · Tailwind v4 · shadcn/UI (Base UI)**. Ticketing via **Ticketleap**.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build && npm start   # production
```

## Edit the content — one file

Almost everything is driven from **`src/lib/site.ts`**:

- Event name, date, time, tagline, dress code, venue policy
- Headliner bio
- Socials + contact email
- **Ticket tiers** (`ticketTiers`) — names, prices, perks
- **FAQ** (`faqs`)
- Marquee ticker words

### Ticketing link

In `src/lib/site.ts`, update the ticketing block:

```ts
zeffy: {
  embedUrl: "https://events.ticketleap.com/events/vabbookings",
  directUrl: "https://events.ticketleap.com/events/vabbookings",
  isPlaceholder: false,
}
```

Every "Get Tickets / Reserve" button across the site opens the ticketing modal with a direct fallback link.

## Assets

Live in `public/assets/`:

- `splash.mp4` — the intro splash video (`eyes00.mp4` from the source folder)
- `flyer-headliner.png` — headliner spotlight image
- `flyer-casting.png` — casting-call flyer (available for a future section)

Drop new assets here and reference them as `/assets/<name>`. More were promised later —
the headliner section and a gallery are easy to extend.

## Structure

- `src/app/layout.tsx` — fonts (Cinzel, Cinzel Decorative, Cormorant, Inter) + metadata
- `src/app/globals.css` — the gold-on-black theme, marquee-bulb text, shimmer, particles CSS
- `src/app/page.tsx` — all page sections
- `src/components/` — `splash`, `site-nav`, `ticket-dialog` (Zeffy), `gold-particles`,
  `countdown`, `mask`, `reveal`
- `src/components/ui/` — shadcn/UI primitives

## Deploy

Optimized for **Vercel** (matches `vab00.vercel.app`): push the `web/` folder to a repo and
import it, or run `vercel` from this directory. No environment variables required.
