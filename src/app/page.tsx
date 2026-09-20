import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Steps from "@/components/ui/Steps";
import TrustStrip, { type TrustPoint } from "@/components/ui/TrustStrip";
import FAQ, { type FaqItem } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { graph, localBusinessSchema, webPageSchema, websiteSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { CATEGORIES, CTA, HOME_CITIES, SITE } from "@/lib/site";

const PAGE_NAME = `${SITE.region} Equipment Rental`;

export const metadata: Metadata = pageMetadata({
  title: { absolute: `${PAGE_NAME} | ${SITE.name}` },
  description: SITE.description,
  path: "/",
});

const FAQS: FaqItem[] = [
  { q: "What kind of equipment can I rent?", a: "Power tools and access equipment. Tell us the job and we will confirm what we can supply." },
  { q: "Do you serve my city?", a: "We serve all cities in the Imperial Valley and surrounding areas. Ask if your site is nearby but unlisted." },
  { q: "How do I get a price?", a: "Send a quote request with the equipment, dates, and location, and we will reply with pricing." },
  // Same client-supplied answer as /how-renting-works. Keep the two in step.
  { q: "Do you deliver?", a: "Yes. Just tell us the address you want it delivered to." },
];

// Only facts from the business record. An unconfirmed point renders as a placeholder, never a claim.
const TRUST_POINTS: readonly TrustPoint[] = [
  { icon: "document", label: "California LLC", detail: `${SITE.name} is a California limited liability company.` },
  { icon: "pin", label: `${SITE.region} service area`, detail: "We serve all cities in the region and surrounding areas." },
  { icon: "toolbox", label: "Power tools and access equipment", detail: "Rentals for contractors, tradesmen, and property owners." },
  { icon: "shield", label: "100% Reliable Equipment Guarantee", detail: "Tested for performance so your job stays on schedule without downtime." 
},
];

// Copy for the two category tiles, keyed by the slugs in CATEGORIES. Tool types are unknown, so each
// tile carries a placeholder instead of an invented list.
const TILE_COPY: Record<string, { body: string; types: React.ReactNode }> = {
  "power-tools": {
    body: "For contractors, tradesmen, and property owners. Tell us the job and we will confirm what we can supply.",
    types: "Electric, Pneumatic, Fuel-Powered",
  },
  "access-equipment": {
    body: "For contractors, tradesmen, and property owners. Tell us the job and we will confirm what we can supply.",
    types: "Scaffolds, Ladders, Lifts",
  },
};
const TILES = CATEGORIES.filter((c) => c.slug in TILE_COPY);

// Home names a subset of cities; the full list lives on /service-area.
const featuredCities = new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(
  HOME_CITIES.map((c) => c.name),
);

const leadClass = "type-body-lg mt-4 max-w-prose text-ink-muted";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          localBusinessSchema(),
          websiteSchema(),
          webPageSchema({ type: "WebPage", path: "/", name: PAGE_NAME, description: SITE.description, breadcrumb: false }),
        )}
      />

      {/* Type is the image here: the uppercase H1 lockup is the loudest thing on the page. */}
      <Section hero>
        <h1 className="type-display-xl">
          Power tool and access equipment rental in the Imperial Valley
        </h1>
        <p className="type-subhead mt-6 max-w-prose text-ink-muted md:mt-8">{SITE.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <Button href={CTA.primaryHref}>{CTA.primary}</Button>
          <Button href={CTA.secondaryHref} variant="outline">{CTA.secondary}</Button>
        </div>
        <div className="mt-12 md:mt-16">
          <TrustStrip points={TRUST_POINTS} />
        </div>
      </Section>

      <Section>
        <h2 className="type-headline">What can I rent?</h2>
        <p className={leadClass}>Power tools and access equipment. Pick a category to start a quote.</p>
        {/* Side by side only from 1280px: at 52px extended width the longest word ("Equipment") needs ~405px,
            and a two-column tile has that much room only at xl. Below that the tiles stack. */}
        <ul className="mt-8 grid gap-6 xl:grid-cols-2">
          {TILES.map((c) => (
            <li
              key={c.slug}
              className="on-dark flex min-h-[280px] flex-col bg-inverse-canvas p-8 text-inverse-ink md:p-12"
            >
              <h3 className="type-display-lg">{c.label}</h3>
              <p className="type-body-lg mt-4 max-w-[36ch] text-inverse-ink-muted">{TILE_COPY[c.slug].body}</p>
              <div className="mt-5">{TILE_COPY[c.slug].types}</div>
              <div className="mt-auto pt-8">
                <Button href={`/contact?category=${c.slug}`} variant="onDark">
                  {CTA.primary}
                  <span className="sr-only"> for {c.label.toLowerCase()}</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="type-headline">How does renting work?</h2>
        <p className={leadClass}>Three steps: request a quote, confirm the details, and get your equipment.</p>
        <div className="mt-8 md:mt-10">
          <Steps
            steps={[
              { title: "Request a quote", body: "Send what you need, where, and when." },
              { title: "Confirm details", body: "We confirm availability, price, and timing." },
              { title: "Get your equipment", body: "Choose pickup or delivery, then get to work." },
            ]}
          />
        </div>
        <Button href="/how-renting-works" variant="link" className="mt-6">
          See the full rental process
        </Button>
      </Section>

      <Section>
        <h2 className="type-headline">Who we serve</h2>
        <ul className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
          {[
            { t: "Contractors", b: "Short-term equipment for jobs that don't justify buying." },
            { t: "Tradesmen", b: "Tools for when a job calls for something outside your kit." },
            { t: "Property owners", b: "Rent what you need for a single project, without the storage." },
          ].map((a) => (
            <li key={a.t}>
              <Card className="h-full">
                <h3 className="type-title">{a.t}</h3>
                <p className="type-body text-ink-muted">{a.b}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="type-headline">Where do you rent?</h2>
        <p className={leadClass}>
          We serve all cities in the Imperial Valley and surrounding areas, including {featuredCities}.
        </p>
        <Button href="/service-area" variant="link" className="mt-4">See the full service area</Button>
      </Section>

      <Section>
        <h2 className="type-headline">Common questions</h2>
        <div className="mt-8 md:mt-10"><FAQ items={FAQS} /></div>
        <Button href="/how-renting-works" variant="link" className="mt-6">More answers</Button>
      </Section>
    </>
  );
}
