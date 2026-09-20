import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { CTA } from "@/lib/site";

// Next adds its own noindex to a 404. Say the same thing here so the layout's site-wide
// "index, follow" does not sit beside it as a conflicting directive.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Section hero>
      <p className="type-body-strong text-ink-muted">Error 404</p>
      <h1 className="type-display-lg mt-4">This page isn&apos;t here</h1>
      <p className="type-subhead mt-6 max-w-prose text-ink-muted">
        The page you asked for doesn&apos;t exist. You can head back home or send us a rental
        request directly.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={CTA.primaryHref}>{CTA.primary}</Button>
        <Button href="/" variant="outline">Back to home</Button>
      </div>
    </Section>
  );
}
