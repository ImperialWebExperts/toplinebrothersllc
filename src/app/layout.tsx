import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClosingCTA from "@/components/layout/ClosingCTA";
import { SITE } from "@/lib/site";
import { TITLE_TEMPLATE, socialMetadata } from "@/lib/seo";
import "./globals.css";

// Display face: Archivo with the width axis, stretched via font-stretch in the type-display-* roles.
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display-src", display: "swap" });
const text = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-text-src",
  display: "swap",
});

const DEFAULT_TITLE = `${SITE.name} — Equipment Rental in the ${SITE.region}`;

// Pages set their own title, description, canonical and social tags through pageMetadata (lib/seo.ts).
// What is here applies site-wide, and is the fallback for routes with no metadata of their own (the 404).
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: DEFAULT_TITLE, template: TITLE_TEMPLATE },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  // Allows full-length snippets and large previews, which search and AI answer engines draw on.
  // /contact/thanks sets its own robots, which replaces this object.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  ...socialMetadata({ title: DEFAULT_TITLE, description: SITE.description }),
  // Region hints. Google ignores them; some other engines read them.
  other: { "geo.region": "US-CA", "geo.placename": SITE.region },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body className="bg-canvas text-ink type-body">
        <Header />
        {/* Sections stack with top padding only, so this is the space before the closing band. Keep it. */}
        <main className="pb-24">{children}</main>
        <ClosingCTA />
        <Footer />
      </body>
    </html>
  );
}
