"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { TicketDialog } from "@/components/ticket-dialog";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#the-night", label: "The Night" },
  { href: "#experience", label: "Experience" },
  { href: "#tickets", label: "Tickets" },
  { href: "#faq", label: "FAQ" },
  { href: "#hostesses", label: "Apply" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-primary/15 bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-script text-lg font-bold tracking-wide text-gold-gradient sm:text-xl">
            EWS<span className="text-primary">2</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
            {site.presenter}
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-[0.2em] text-gold-100/80 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <TicketDialog>
            <button className="btn-gold hidden rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] sm:inline-flex">
              Get Tickets
            </button>
          </TicketDialog>
          <button
            className="text-gold-100 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-primary/15 bg-ink/95 px-5 py-4 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm uppercase tracking-[0.2em] text-gold-100/90"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <TicketDialog>
                <button className="btn-gold mt-1 w-full rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.2em]">
                  Get Tickets
                </button>
              </TicketDialog>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
