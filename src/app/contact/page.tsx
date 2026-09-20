import type { Metadata } from "next";
import { Suspense } from "react";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Steps from "@/components/ui/Steps";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, localBusinessSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { NEXT_STEPS, SITE } from "@/lib/site";

const PATH = "/contact";
const TITLE = "Request an Equipment Rental Quote";
const DESCRIPTION = `Tell ${SITE.shortName} what equipment your job needs, when, and where, and we will reply with availability and pricing.`;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          localBusinessSchema(),
          webPageSchema({ type: "ContactPage", path: PATH, name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Request a Quote", href: PATH }]),
        )}
      />

      <Section hero>
        <h1 className="type-display-lg">Request a quote</h1>
        <p className="type-subhead mt-6 max-w-prose text-ink-muted">
          Tell us what you need, when you need it, and where the job is. We&apos;ll reply with availability and pricing.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            {/* QuoteForm reads ?category= and ?city= via useSearchParams, which must stay inside Suspense.
                The fallback reserves the form's height (1012px stacked, 912px from sm) so the cards below
                do not jump when it mounts. Re-measure if a field is added or removed. */}
            <Suspense
              fallback={
                <div className="min-h-[1012px] sm:min-h-[912px]">
                  <p className="type-body text-ink-muted">Loading form…</p>
                </div>
              }
            >
              <QuoteForm />
            </Suspense>
          </div>

          <aside aria-label="Contact details and next steps" className="grid content-start gap-6 lg:col-span-5 lg:col-start-8">
            <Card soft>
              <h2 className="type-title">Contact details</h2>
              <dl>
                <dt className="type-body-sm font-medium text-ink-muted">Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="type-body link inline-flex min-h-12 items-center break-all">
                    {SITE.email}
                  </a>
                </dd>
              </dl>
            </Card>

            <Card soft>
              <h2 className="type-title">What happens next</h2>
              <Steps layout="stack" steps={NEXT_STEPS.map((title) => ({ title }))} />
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
