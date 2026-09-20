import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Steps from "@/components/ui/Steps";
import FAQ, { type FaqItem } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/how-renting-works";
const TITLE = "How Equipment Rental Works";
const DESCRIPTION = `Renting from ${SITE.shortName} takes four steps: send a request, confirm the details, get your equipment, and return it.`;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

// Client-supplied answers, worded in the site voice: direct answer first, plain sentences, "we'll".
// String answers are emitted in FAQPage JSON-LD, so keep them to what the client has confirmed.
const FAQS: FaqItem[] = [
  { q: "How do I start a rental?", a: "Use the quote form or email us. We'll reply with availability and pricing." },
  { q: "How long can I rent equipment?", a: "You can rent by the hour, day, week, or month. Terms are adjustable, so tell us how long you need it." },
  { q: "What do I need to bring?", a: "Bring a government-issued photo ID." },
  { q: "Do you require a deposit?", a: "Yes. Every rental requires a deposit." },
  { q: "Can you deliver to my job site?", a: "Yes. Just tell us the address you want it delivered to." },
  { q: "What if I return the equipment late?", a: "We charge a late fee for late returns." },
  { q: "What happens if equipment is damaged?", a: "We charge a penalty fee for damaged equipment." },
  { q: "Can I extend a rental?", a: "Yes. Let us know and we'll work around your schedule." },
];

export default function HowRentingWorksPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ type: "WebPage", path: PATH, name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "How Renting Works", href: PATH }]),
        )}
      />

      <Section hero>
        <h1 className="type-display-lg">How renting works</h1>
        <p className="type-subhead mt-6 max-w-prose text-ink-muted">
          Renting from {SITE.shortName} takes four steps: send a request, confirm the details,
          get your equipment, and return it.
        </p>
      </Section>

      <Section>
        <h2 className="sr-only">The four steps</h2>
        <Steps
          steps={[
            { title: "Send your request", body: "Use the quote form or email us with the equipment, dates, and job site city." },
            { title: "We confirm the details", body: "We reply with availability, rate, and what's required to book." },
            { title: "Get your equipment", body: "Pick it up, or have it delivered. You choose." },
            { title: "Return the equipment", body: "Drop it off, or we'll come get it." },
          ]}
        />
      </Section>

      <Section>
        <h2 className="sr-only">Rental basics</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {[
            { t: "Rental periods", p: "hourly / daily / weekly / monthly terms" },
            { t: "Delivery and pickup", p: `One flat delivery fee applies across the ${SITE.region}. You choose the delivery and pickup times.` },
            { t: "Deposits and payment", p: "We accept cash, card, and online payments" },
            { t: "Returns and late returns", p: "A late fee will be applied for any late returns." },
          ].map((b) => (
            <li key={b.t}>
              <Card className="h-full">
                <h3 className="type-title">{b.t}</h3>
                <p className="type-body text-ink-muted">{b.p}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="type-headline">Rental questions, answered</h2>
        <div className="mt-8 md:mt-10"><FAQ items={FAQS} /></div>
      </Section>
    </>
  );
}
