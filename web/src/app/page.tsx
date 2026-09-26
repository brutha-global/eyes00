import {
  CalendarDays,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Crown,
  Check,
  Mail,
  Globe,
  Award,
  Heart,
  Send,
  Users,
  Star,
  Gift,
} from "lucide-react";
import { Splash } from "@/components/splash";
import { ReplayIntroButton } from "@/components/replay-intro";
import { SiteNav } from "@/components/site-nav";
import { GoldParticles } from "@/components/gold-particles";
import { Mask } from "@/components/mask";
import { Reveal } from "@/components/reveal";
import { Countdown } from "@/components/countdown";
import { TicketDialog } from "@/components/ticket-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site, ticketTiers, contests, hostessInfo, faqs, marqueeWords } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Splash />
      <SiteNav />

      <main id="top" className="relative flex-1">
        {/* ============================= HERO ============================= */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 pb-16">
          <GoldParticles />
          {/* draped bulb-curtain gradient echoing the flyer */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(212,175,55,0.18),transparent_70%)]" />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
            <Reveal>
              <p className="mb-5 text-[11px] uppercase tracking-[0.5em] text-gold-200/80 sm:text-sm">
                {site.presenter} Presents
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="marquee-title font-script text-[15vw] font-black leading-[0.88] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
                EYES WIDE SHUT
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-2 flex items-center justify-center gap-4">
                <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-primary/70 sm:block" />
                <span className="marquee-title font-script text-6xl font-black text-primary sm:text-7xl">
                  2
                </span>
                <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-primary/70 sm:block" />
              </div>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 max-w-xl font-serif text-lg italic text-gold-100/90 sm:text-2xl">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
                <span className="flex items-center gap-2 text-gold-100">
                  <CalendarDays className="size-4 text-primary" />
                  {site.dateLabel}
                </span>
                <span className="hidden text-primary/50 sm:inline">◆</span>
                <span>{site.subtitle}</span>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <TicketDialog>
                  <button className="btn-gold rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.25em]">
                    Get Tickets
                  </button>
                </TicketDialog>
              </div>
            </Reveal>

            <div className="mt-14 w-40 animate-floaty opacity-90">
              <Mask />
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70">
            Scroll to Enter the Night
          </div>
        </section>

        {/* ============================ TICKER ============================ */}
        <div className="relative overflow-hidden border-y border-primary/20 bg-ink-soft/60 py-4">
          <div className="ticker-track">
            {[0, 1].map((set) => (
              <div key={set} className="flex items-center" aria-hidden={set === 1}>
                {marqueeWords.map((w, i) => (
                  <span key={`${set}-${i}`} className="flex items-center">
                    <span className="px-6 font-display text-sm uppercase tracking-[0.35em] text-gold-200/90 sm:text-base">
                      {w}
                    </span>
                    <span className="text-primary/60">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ========================== THE NIGHT ========================== */}
        <section id="the-night" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-32">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <GoldParticles className="opacity-40" />
          </div>
          <Reveal className="text-center">
            <SectionLabel icon={<Sparkles className="size-4" />}>The Affair</SectionLabel>
            <h2 className="mt-4 font-script text-4xl font-bold text-gold-gradient sm:text-6xl">
              A Masquerade Unlike Any Other
            </h2>
            <hr className="gold-rule mx-auto mt-8 w-40" />
          </Reveal>

          <Reveal delay={120} className="mx-auto mt-10 max-w-3xl text-center">
            <p className="font-serif text-xl leading-relaxed text-gold-100/85 sm:text-2xl">
              Behind the mask, anything is possible. {site.eventName} returns as an
              exclusive, VIP luxury soirée — a single night of live music, hidden
              identities, and unforgettable indulgence. Velvet, candlelight, and gold;
              a room full of strangers who become the memory of the year.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: <Crown className="size-6" />,
                title: "Celebrity Entertainment",
                body: "A live, exclusive set from an R&B legend — an intimate performance you won't find anywhere else.",
              },
              {
                icon: <Sparkles className="size-6" />,
                title: "Luxury & Mystery",
                body: "An immersive world of masks, low light, and sophistication. Come as yourself — leave as a legend.",
              },
              {
                icon: <ShieldCheck className="size-6" />,
                title: "Exclusive Access",
                body: "Strictly limited entry, a strictly enforced dress code, and a location revealed only to guests.",
              },
            ].map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 120}
                className="gold-panel group rounded-2xl p-7 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors group-hover:bg-primary group-hover:text-ink">
                  {c.icon}
                </div>
                <h3 className="mt-5 font-display text-lg uppercase tracking-[0.15em] text-gold-100">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========================= EXPERIENCE ========================= */}
        <section id="experience" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
          <Reveal className="text-center">
            <SectionLabel icon={<Sparkles className="size-4" />}>The Details</SectionLabel>
            <h2 className="mt-4 font-script text-4xl font-bold text-gold-gradient sm:text-5xl">
              Know Before You Go
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <CalendarDays className="size-6" />,
                label: "Date",
                value: site.dateLabel,
              },
              { icon: <Clock className="size-6" />, label: "Time", value: site.timeLabel },
              {
                icon: <MapPin className="size-6" />,
                label: "Location",
                value: site.locationLabel,
              },
              {
                icon: <ShieldCheck className="size-6" />,
                label: "Entry",
                value: site.agePolicy,
              },
            ].map((d, i) => (
              <Reveal
                key={d.label}
                delay={i * 90}
                className="gold-panel rounded-2xl p-6 text-center"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-primary/40 text-primary">
                  {d.icon}
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {d.label}
                </p>
                <p className="mt-1.5 font-display text-sm uppercase tracking-[0.08em] text-gold-100">
                  {d.value}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Dress code + countdown band */}
          <Reveal className="mt-8">
            <div className="gold-panel flex flex-col items-center gap-8 rounded-3xl px-6 py-10 text-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                  Dress Code
                </p>
                <p className="mt-2 font-script text-2xl font-bold text-gold-gradient sm:text-3xl">
                  {site.dressCode}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Black tie meets Venetian mystery. Masks required. No exceptions.
                </p>
              </div>
              <hr className="gold-rule w-48" />
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                  The Night Begins In
                </p>
                <Countdown dateISO={site.dateISO} />
              </div>
            </div>
          </Reveal>
        </section>

        {/* =========================== TICKETS =========================== */}
        <section id="tickets" className="relative overflow-hidden py-24 sm:py-32">
          <GoldParticles className="opacity-50" />
          <div className="relative mx-auto max-w-7xl px-5">
            <Reveal className="text-center">
              <SectionLabel icon={<Sparkles className="size-4" />}>Reserve</SectionLabel>
              <h2 className="mt-4 font-script text-4xl font-bold text-gold-gradient sm:text-6xl">
                Premium Experience Packages
              </h2>
              <p className="mx-auto mt-5 max-w-xl font-serif text-lg italic text-gold-100/80 sm:text-xl">
                Every package includes food and drinks. Choose your experience and
                secure your place before the doors close for good.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {ticketTiers.map((tier, i) => (
                <Reveal
                  key={tier.id}
                  delay={i * 100}
                  className={`relative flex flex-col rounded-3xl p-7 ${
                    tier.featured
                      ? "gold-panel border-primary/60 shadow-[0_40px_120px_-50px_rgba(212,175,55,0.7)] xl:-mt-4 xl:mb-4"
                      : "gold-panel"
                  }`}
                >
                  {tier.featured && (
                    <span className="btn-gold absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.25em]">
                      Best Value
                    </span>
                  )}
                  <h3 className="font-display text-lg uppercase tracking-[0.15em] text-gold-100">
                    {tier.name}
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-muted-foreground">
                    {tier.tagline}
                  </p>
                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
                      {tier.price}
                    </span>
                    {tier.cadence && (
                      <span className="pb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {tier.cadence}
                      </span>
                    )}
                  </div>

                  <hr className="gold-rule my-5" />

                  <ul className="flex flex-1 flex-col gap-2.5">
                    {tier.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-gold-100/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <TicketDialog tierId={tier.id}>
                    <button
                      className={`mt-7 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                        tier.featured
                          ? "btn-gold"
                          : "border border-primary/50 text-gold-100 hover:border-primary hover:bg-primary hover:text-ink"
                      }`}
                    >
                      Reserve Now
                    </button>
                  </TicketDialog>
                </Reveal>
              ))}
            </div>

            {/* Contests & Giveaways */}
            <Reveal className="mt-20 text-center">
              <SectionLabel icon={<Award className="size-4" />}>Contests &amp; Giveaways</SectionLabel>
            </Reveal>
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
              {contests.map((c, i) => (
                <Reveal
                  key={c.name}
                  delay={i * 120}
                  className="gold-panel group rounded-2xl p-7 text-center transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors group-hover:bg-primary group-hover:text-ink">
                    {i === 0 ? <Star className="size-6" /> : <Heart className="size-6" />}
                  </div>
                  <h3 className="mt-5 font-display text-lg uppercase tracking-[0.15em] text-gold-100">
                    {c.name}
                  </h3>
                  <p className="mt-3 font-display text-3xl font-bold text-gold-gradient">{c.prize}</p>
                  {c.note && (
                    <p className="mt-3 text-xs italic text-muted-foreground">{c.note}</p>
                  )}
                </Reveal>
              ))}
            </div>

            {/* Raffle / Giveaway banner */}
            <Reveal className="mt-10">
              <div className="gold-panel mx-auto max-w-3xl rounded-2xl px-6 py-8 text-center">
                <div className="flex items-center justify-center gap-3">
                  <Gift className="size-5 text-primary" />
                  <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-200">
                    Raffle / Giveaway
                  </p>
                  <Gift className="size-5 text-primary" />
                </div>
                <hr className="gold-rule mx-auto my-5 w-32" />
                <p className="font-serif text-lg text-gold-100/90 sm:text-xl">
                  {site.nonprofit.description}
                </p>
                <p className="mt-3 font-display text-base font-bold uppercase tracking-[0.2em] text-gold-gradient">
                  {site.nonprofit.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Nonprofit Organization
                </p>
              </div>
            </Reveal>

            {/* Ticket sale date + fine print */}
            <Reveal className="mt-10 text-center">
              <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-200/90">
                Tickets Go on Sale {site.ticketSaleDate}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Secure checkout via Ticketleap · All sales final
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================= FAQ ============================= */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-24 sm:py-28">
          <Reveal className="text-center">
            <SectionLabel icon={<Sparkles className="size-4" />}>Answers</SectionLabel>
            <h2 className="mt-4 font-script text-4xl font-bold text-gold-gradient sm:text-5xl">
              Frequently Asked
            </h2>
            <hr className="gold-rule mx-auto mt-8 w-32" />
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <Accordion multiple={false} className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-primary/15">
                  <AccordionTrigger className="text-left font-display text-base uppercase tracking-[0.08em] text-gold-100 hover:text-primary hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </section>

        {/* ========================= HOSTESSES ========================= */}
        <section id="hostesses" className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(169,126,30,0.12),transparent_70%)]" />
          <div className="mx-auto max-w-5xl px-5">
            <Reveal className="text-center">
              <SectionLabel icon={<Users className="size-4" />}>Apply Now</SectionLabel>
              <p className="mt-5 font-display text-sm uppercase tracking-[0.3em] text-gold-200/90">
                {hostessInfo.subtitle}
              </p>
              <h2 className="mt-3 font-script text-3xl font-bold text-gold-gradient sm:text-5xl">
                {hostessInfo.title}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Luxury Masquerade Experience · {site.dateLabel}
              </p>
              <hr className="gold-rule mx-auto mt-8 w-40" />
            </Reveal>

            <Reveal delay={100} className="mx-auto mt-10 max-w-3xl text-center">
              <p className="font-serif text-xl leading-relaxed text-gold-100/85 sm:text-2xl">
                {hostessInfo.intro}
              </p>
              <p className="mt-5 font-serif text-lg leading-relaxed text-muted-foreground">
                {hostessInfo.description}
              </p>
            </Reveal>

            <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
              {/* Compensation */}
              <Reveal delay={0} className="gold-panel rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full border border-primary/40 text-primary">
                    <Sparkles className="size-5" />
                  </div>
                  <h3 className="font-display text-sm uppercase tracking-[0.18em] text-gold-100">
                    Compensation
                  </h3>
                </div>
                <ul className="mt-5 flex flex-col gap-3">
                  {hostessInfo.compensation.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gold-100/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Qualifications */}
              <Reveal delay={120} className="gold-panel rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full border border-primary/40 text-primary">
                    <Crown className="size-5" />
                  </div>
                  <h3 className="font-display text-sm uppercase tracking-[0.18em] text-gold-100">
                    Qualifications
                  </h3>
                </div>
                <ul className="mt-5 flex flex-col gap-3">
                  {hostessInfo.qualifications.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gold-100/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* To Be Considered */}
              <Reveal delay={240} className="gold-panel rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full border border-primary/40 text-primary">
                    <Send className="size-5" />
                  </div>
                  <h3 className="font-display text-sm uppercase tracking-[0.18em] text-gold-100">
                    To Be Considered
                  </h3>
                </div>
                <ul className="mt-5 flex flex-col gap-3">
                  {hostessInfo.submitRequirements.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gold-100/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Positions + closing note */}
            <Reveal className="mt-10">
              <div className="gold-panel mx-auto max-w-2xl rounded-2xl px-6 py-8 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-primary/50">
                  <span className="font-display text-2xl font-bold text-gold-gradient">
                    {hostessInfo.positions}
                  </span>
                </div>
                <p className="mt-4 font-display text-sm uppercase tracking-[0.3em] text-gold-100">
                  Only {hostessInfo.positions} Positions Will Be Filled
                </p>
                <hr className="gold-rule mx-auto my-5 w-32" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {hostessInfo.closingNote}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                  <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                  Applications Are Now Open
                </div>

                <div className="mt-6 flex flex-col items-center gap-2 text-sm">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Contact · {site.contact.title}
                  </p>
                  <p className="font-display text-base uppercase tracking-[0.15em] text-gold-100">
                    {site.contact.name}
                  </p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="flex items-center gap-2 text-primary transition-colors hover:text-gold-100"
                  >
                    <Mail className="size-4" />
                    {site.contact.email}
                  </a>
                  <a
                    href={`mailto:${site.socials.email}`}
                    className="flex items-center gap-2 text-primary transition-colors hover:text-gold-100"
                  >
                    <Mail className="size-4" />
                    {site.socials.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ========================= FINAL CTA ========================= */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
          <Reveal className="mx-auto max-w-3xl px-5 text-center">
            <div className="mx-auto mb-8 w-28 animate-floaty opacity-90">
              <Mask />
            </div>
            <h2 className="marquee-title font-script text-4xl font-black leading-tight sm:text-6xl">
              The Mask Awaits
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif text-xl italic text-gold-100/85">
              One night. One legend. One unforgettable secret. Will we see you behind
              the mask?
            </p>
            <TicketDialog>
              <button className="btn-gold mt-9 rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-[0.28em]">
                Get Your Tickets
              </button>
            </TicketDialog>
          </Reveal>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="border-t border-primary/20 bg-ink-soft/70">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="font-script text-2xl font-bold text-gold-gradient">
                EYES WIDE SHUT <span className="text-primary">2</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                An Exclusive VIP Masquerade Experience
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 text-sm text-gold-100/85 md:items-end">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <IgGlyph className="size-4 text-primary" />
                {site.socials.instagramHandle}
              </a>
              <a
                href={`https://${site.socials.siteLabel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Globe className="size-4 text-primary" />
                {site.socials.siteLabel}
              </a>
              <a
                href={`mailto:${site.socials.email}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                {site.socials.email}
              </a>
            </div>
          </div>

          <hr className="gold-rule my-10" />

          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
            <p>
              © 2026 {site.presenter}. All rights reserved.
            </p>
            <ReplayIntroButton />
            <p className="uppercase tracking-[0.25em]">
              {site.dateLabel} · {site.agePolicy}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function IgGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function SectionLabel({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-ink/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.35em] text-primary">
      {icon}
      {children}
    </span>
  );
}
