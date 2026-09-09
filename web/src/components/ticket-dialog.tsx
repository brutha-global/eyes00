"use client";

import { useState, type ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { site, ticketTiers } from "@/lib/site";
import { ExternalLink } from "lucide-react";

function buildTicketUrl(rateId?: string) {
  const base = site.zeffy.embedUrl;
  if (!rateId || !base.includes("zeffy.com")) return base;
  const items = JSON.stringify([{ rateId, quantity: 1 }]);
  return `${base}?items=${encodeURIComponent(items)}`;
}

function buildDirectUrl(rateId?: string) {
  const base = site.zeffy.directUrl;
  if (!rateId || !base.includes("zeffy.com")) return base;
  const items = JSON.stringify([{ rateId, quantity: 1 }]);
  return `${base}?items=${encodeURIComponent(items)}`;
}

export function TicketDialog({
  children,
  tierId,
}: {
  children: ReactElement;
  tierId?: string;
}) {
  const [open, setOpen] = useState(false);

  const tier = tierId ? ticketTiers.find((t) => t.id === tierId) : undefined;
  const rateId = tier?.zeffyRateId;
  const src = buildTicketUrl(rateId);
  const directLink = buildDirectUrl(rateId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent
        showCloseButton
        className="max-w-3xl gap-0 overflow-hidden border-primary/30 bg-ink-soft p-0 sm:max-w-3xl"
      >
        <DialogHeader className="border-b border-primary/20 px-6 py-4">
          <DialogTitle className="font-display text-xl tracking-wide text-gold-gradient">
            {tier ? `${tier.name} · ${tier.price}` : `Reserve Your Place · ${site.eventName}`}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {site.dateLabel} · {site.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="relative bg-white">
          <iframe
            key={open ? `open-${tierId ?? "all"}` : "closed"}
            title={`Eyes Wide Shut 2 — ${tier?.name ?? "Ticketing"}`}
            src={src}
            className="h-[70vh] max-h-[760px] w-full"
            allow="payment"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col items-center gap-1 border-t border-primary/20 px-6 py-3 text-center text-xs text-muted-foreground">
          <span>
            Secure checkout powered by Ticketleap · All sales final.
          </span>
          <a
            href={directLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
          >
            Trouble loading? Open ticketing in a new tab
            <ExternalLink className="size-3" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
