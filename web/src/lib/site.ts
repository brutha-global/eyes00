// ---------------------------------------------------------------------------
// Central config for the Eyes Wide Shut 2 site.
// Update event details, ticket tiers, and the Zeffy link here in one place.
// ---------------------------------------------------------------------------

export const site = {
  eventName: "Eyes Wide Shut 2",
  presenter: "VAB Bookings",
  tagline: "An Exclusive Night of Mystery, Luxury & Seduction",
  subtitle: "A Luxury Masquerade Experience",
  dateISO: "2026-10-31T21:00:00-05:00",
  dateLabel: "Saturday, October 31, 2026",
  timeLabel: "9:00 PM – Late",
  agePolicy: "21+ Only · Valid ID Required",
  dressCode: "Formal & Masquerade · Strictly Enforced",
  locationLabel: "Location Revealed to Ticket Holders",
  locationCity: "Undisclosed · Details sent with your ticket",
  ticketSaleDate: "September 20th, 2026",

  headliner: {
    name: 'Gary "Lil G" Jenkins',
    group: "SILK",
    role: "Lead Singer of the Iconic R&B Group",
    blurb:
      "With over three decades of smooth hits, timeless harmony, and a voice that defined a generation, Lil G brings his signature romance and sophistication to the most anticipated masquerade experience of the year.",
  },

  socials: {
    instagram: "https://instagram.com/vabbookings",
    instagramHandle: "@VABBOOKINGS",
    site: "https://vab00.vercel.app",
    siteLabel: "vab00.vercel.app",
    email: "info@vabbooking.com",
  },

  contact: {
    name: "Kenrico Scott",
    title: "Vice President of Operations",
    email: "kenrico@vabbooking.com",
  },

  nonprofit: {
    name: "Whoz Nexxx Sports",
    description: "50% of the event's proceeds will go to Whoz Nexxx Sports nonprofit organization.",
  },

  zeffy: {
    embedUrl: "https://www.zeffy.com/en-US/embed/ticketing/eyes-wide-shut--2",
    directUrl: "https://www.zeffy.com/en-US/ticketing/eyes-wide-shut--2",
    isPlaceholder: false,
  },
} as const;

export type TicketTier = {
  id: string;
  zeffyRateId: string;
  name: string;
  price: string;
  cadence?: string;
  tagline: string;
  perks: string[];
  featured?: boolean;
};

export const ticketTiers: TicketTier[] = [
  {
    id: "general",
    zeffyRateId: "d4ce0025-ad04-4cf2-b222-c7fca61374e1",
    name: "General Admission",
    price: "$55",
    tagline: "Enter the masquerade.",
    perks: [
      'A Game Changer food package included',
      "2 complimentary drink tickets",
      "Entry to the Eyes Wide Shut 2 soirée",
    ],
  },
  {
    id: "2-person-table",
    zeffyRateId: "044d7cf5-a165-404b-9469-bb647229dd0f",
    name: "2 Person Table",
    price: "$155",
    tagline: "An intimate evening for two.",
    perks: [
      "Reserved table for 2 guests",
      'A Game Changer food package per person',
      "2 complimentary drink tickets per person",
      "Entry to the Eyes Wide Shut 2 soirée",
    ],
  },
  {
    id: "5-person-table",
    zeffyRateId: "3013174d-fb4f-4e26-aa8e-014857ff3a9c",
    name: "5 Person Table",
    price: "$350",
    tagline: "Bring the crew.",
    featured: true,
    perks: [
      "Reserved table for 5 guests",
      'A Game Changer food package per person',
      "2 complimentary drink tickets per person",
      "Entry to the Eyes Wide Shut 2 soirée",
    ],
  },
  {
    id: "5-person-bottle",
    zeffyRateId: "13d82af3-f921-4909-a2eb-def7ddec8f13",
    name: "5 Person Table + Bottle",
    price: "$650",
    tagline: "Own the night.",
    perks: [
      "Reserved table for 5 guests",
      "Bottle of your choice included",
      'A Game Changer food package per person',
      "Premium VIP experience",
    ],
  },
];

export type Contest = {
  name: string;
  prize: string;
  note?: string;
};

export const contests: Contest[] = [
  {
    name: "Best Masquerade Mask",
    prize: "$250",
  },
  {
    name: "Best Dressed Couple",
    prize: "$250",
    note: "Must be dressed in formal Masquerade Attire.",
  },
];

export const hostessInfo = {
  title: "Exclusive VIP Hostesses Casting Call",
  subtitle: "VAB Bookings | VAB Girlz",
  intro:
    "VAB Bookings is seeking 5 exceptional female event hosts and content creators to represent an exclusive, VIP luxury masquerade soirée this Halloween.",
  description:
    "This is a curated opportunity for confident, stylish women who embody elegance, sophistication, and a strong presence both in person and online.",
  positions: 5,
  compensation: [
    "Paid gig",
    "Additional performance incentives based on ticket sales generated through your personalized promotional link",
  ],
  qualifications: [
    "Female, 21 years of age or older",
    "Polished, professional, and comfortable in upscale social settings",
    "A strong social media presence is preferred",
  ],
  submitRequirements: [
    "Full name, city, and state",
    "3–4 recent, unfiltered photos, including at least 1 professional-quality headshot and at least 1 full-body photo",
    "Links to your social media platforms (Instagram, TikTok, etc.)",
  ],
  closingNote:
    "Only a select number of applicants will be invited to participate. Selected talent will receive additional event details, exclusive access information, and may also be considered for future opportunities with VAB Bookings and upcoming events.",
};

export const faqs = [
  {
    q: "What is the dress code?",
    a: "Formal attire and masquerade masks are required and strictly enforced. Think black tie meets Venetian mystery — tuxedos, gowns, and ornate masks. Guests not meeting the dress code will not be admitted.",
  },
  {
    q: "Where is the event located?",
    a: "This is an exclusive, invitation-caliber affair. The venue is undisclosed until closer to the event — confirmed ticket holders receive the address and access details directly ahead of the night.",
  },
  {
    q: "Is there an age requirement?",
    a: "Yes. Eyes Wide Shut 2 is a 21-and-over event. A valid government-issued photo ID is required at the door for all guests.",
  },
  {
    q: "How do tickets work?",
    a: "All tickets are sold securely through Zeffy. Once you complete checkout you'll receive an email confirmation and entry credentials. Tickets are limited and expected to sell out.",
  },
  {
    q: "What's included with my ticket?",
    a: 'Every ticket includes A Game Changer food package and 2 complimentary drink tickets. Table packages include per-person food and drinks, and the $650 tier adds a bottle of your choice.',
  },
  {
    q: "What are the contests?",
    a: "We're giving away $250 for Best Masquerade Mask and $250 for Best Dressed Couple. You must be in formal masquerade attire to compete. Plus a raffle/giveaway the night of the event.",
  },
  {
    q: "What is the refund policy?",
    a: "All sales are final. Tickets are transferable — contact us if you need to change the name on your reservation.",
  },
  {
    q: "How do I apply to be a VIP Hostess?",
    a: "Applications are open now. Submit your name, city/state, 3–4 recent photos (including a headshot and full-body), and social media links to kenrico@vabbooking.com. Only 5 positions will be filled.",
  },
];

export const marqueeWords = [
  "MUSIC",
  "MYSTERY",
  "MEMORIES",
  "MASQUERADE",
  "SEDUCTION",
  "LUXURY",
  "ELEGANCE",
  "CONTESTS",
];
