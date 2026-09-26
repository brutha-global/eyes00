import type { Metadata, Viewport } from "next";
import { Cinzel, Cinzel_Decorative, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const decorative = Cinzel_Decorative({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.socials.site),
  title: `${site.eventName} · ${site.presenter}`,
  description: `${site.eventName} — ${site.tagline}. ${site.subtitle} featuring ${site.headliner.name} of ${site.headliner.group}. ${site.dateLabel}.`,
  openGraph: {
    title: `${site.eventName} · A Luxury Masquerade`,
    description: `${site.tagline} — ${site.dateLabel}. Featuring ${site.headliner.name} of ${site.headliner.group}.`,
    images: ["/assets/flyer-headliner.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060406",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${decorative.variable} ${cormorant.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/eyes.mp4" as="video" type="video/mp4" />
      </head>
      <body className="grain min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
