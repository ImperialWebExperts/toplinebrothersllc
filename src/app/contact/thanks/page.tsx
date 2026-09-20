import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Steps from "@/components/ui/Steps";
import { CTA, NEXT_STEPS, SITE } from "@/lib/site";

// noindex here AND absent from INDEXABLE_ROUTES (sitemap) — both are required.
export const metadata: Metadata = {
  title: "Quote request received",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <Section hero>
      {/* Confirmation state: success color plus an icon and text, never color alone. */}
      <p className="type-body-strong flex items-center gap-2 text-success">
        <Icon name="check" />
        Request sent
      </p>
      <h1 className="type-display-lg mt-4">Quote request received</h1>
      <p className="type-subhead mt-6 max-w-prose text-ink-muted">
        A member of {SITE.shortName} will follow up to confirm availability, pricing, and timing.
      </p>

      <div className="mt-10 max-w-xl">
        <Card soft>
          <h2 className="type-title">What happens next</h2>
          <Steps layout="stack" steps={NEXT_STEPS.map((title) => ({ title }))} />
        </Card>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href={CTA.secondaryHref} variant="secondary">{CTA.secondary}</Button>
        <Button href="/" variant="outline">Back to home</Button>
      </div>
    </Section>
  );
}
