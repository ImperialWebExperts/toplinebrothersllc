# Top Line Brothers LLC website

Marketing website for Top Line Brothers LLC, a California equipment rental company serving the Imperial Valley. It rents power tools and access equipment to contractors, tradesmen, and property owners. The site's job is to turn visitors into quote requests.

Live at <https://toplinebrothersllc.vercel.app>.

## Stack

Next.js (App Router), React, TypeScript (strict), Tailwind CSS v4. All pages are statically generated. The only server code is the quote API route. There are no UI libraries and no images beyond the logo.

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run lint       # must pass with no errors
npx tsc --noEmit   # type check
npm run build      # production build, must pass with no errors
npm run start      # serve the production build
```

## Environment variables

Copy the names below into `.env` locally (it is gitignored) and into the Vercel project settings for production.

| Variable | Required | Purpose |
|---|---|---|
| `SMTP_USER` | One of the two mail options | A Gmail address the site sends from (see Quote email delivery). |
| `SMTP_PASS` | With `SMTP_USER` | That Gmail account's App Password, not its normal password. |
| `RESEND_API_KEY` | One of the two mail options | Sends through Resend instead. Used only when `SMTP_USER` and `SMTP_PASS` are not both set. |
| `QUOTE_FROM_EMAIL` | No | Resend sender on a verified domain. Defaults to `onboarding@resend.dev`. Only needed with a custom domain. |
| `QUOTE_TO_EMAIL` | No, testing only | Overrides the recipient (default: the business email in `src/lib/site.ts`). Leave it unset in production. |
| `NEXT_PUBLIC_SITE_URL` | If the domain changes | Overrides the production URL used for canonicals, the sitemap, Open Graph, JSON-LD, and `llms.txt`. |

If no mail option is configured, the form shows its error state with a `mailto:` fallback.

### Quote email delivery

`src/lib/mail.ts` emails each quote request to the business email in `SITE.email`. The site has no custom domain, so it uses one of two options.

**Gmail SMTP (preferred).** The site logs in to a Gmail account you control and sends from it. No domain is needed and the business inbox does not have to be involved.

1. On the sending Gmail account, turn on 2-Step Verification (myaccount.google.com/security).
2. Create an App Password at myaccount.google.com/apppasswords. Google shows 16 characters, with or without spaces.
3. Set `SMTP_USER` (the Gmail address) and `SMTP_PASS` (the App Password) locally and in Vercel, then redeploy.
4. Submit a real request on the deployed site and confirm it arrives. Reply goes to the customer when they gave an email.

Requests depend on that Gmail account: if its password changes or the App Password is revoked, sending stops until a new one is set. Gmail allows roughly 500 sent emails a day.

**Resend.** Without a verified domain, Resend only delivers from `onboarding@resend.dev` to the address that owns the Resend account, and a `*.vercel.app` address cannot be verified. So the Resend account must be registered under `SITE.email`: sign up with that address, create a "Sending access" key, and set it as `RESEND_API_KEY`. Mark the first email "Not spam" if Gmail filters it. If a custom domain is added later, verify it in Resend and set `QUOTE_FROM_EMAIL`.

### Spam protection

The quote form has a hidden honeypot field, and `/api/quote` validates every field again on the server. The route also allows 5 requests per IP address every 10 minutes (`src/lib/rateLimit.ts`). The counters live in server memory, so on Vercel each warm instance counts separately. For a hard limit, add a rate-limit rule for `/api/quote` under Vercel > Firewall.

## Project structure

```
src/
  app/            Routes: /, /how-renting-works, /service-area, /about, /contact,
                  /contact/thanks, the 404, sitemap, robots, llms.txt, and api/quote
  components/
    layout/       Header, MobileNav, NavLink, Footer, ClosingCTA
    ui/           Button, Section, Container, Card, FAQ, Logo, Steps, Icon, TrustStrip, Placeholder
    forms/        QuoteForm
    seo/          JsonLd
  lib/
    site.ts       Single source of truth: name, email, URL, nav, cities, categories, CTA labels
    quote.ts      Quote form validation, shared by the form and the API route
    rateLimit.ts  Per-IP limiter for the API route
    schema.ts     JSON-LD builders
    seo.ts        Page metadata, Open Graph and Twitter tags
public/brand/     Logo files and the link-preview image
```

Business facts (name, email, cities, nav, calls to action, domain) live only in `src/lib/site.ts`. Change them there and nowhere else.

## Design

Colors, type, and components follow `DESIGN.md`. Colors are theme tokens in `src/app/globals.css` (`bg-canvas`, `text-ink-muted`, and so on), never hex values in components. Yellow is used for the quote button and nothing else.

## Content rules

- Only confirmed facts go on the site: no invented phone numbers, prices, reviews, licenses, or years in business. `CLAUDE.md` lists what is confirmed.
- Unknown details use the `Placeholder` component, which renders `[PLACEHOLDER: label]`. None are on the site right now.
- Confirm the sitemap and pages contain no `[PLACEHOLDER: ...]` text before launch, since it would be indexed.

## Before adding or changing pages

- Use `pageMetadata()` from `src/lib/seo.ts` for title, canonical, Open Graph, and Twitter tags.
- Add new indexable routes to `INDEXABLE_ROUTES` in `src/lib/site.ts`, or the sitemap will not list them.
- Keep `useSearchParams` inside a `<Suspense>` boundary, or `next build` fails.
- Check pages at 375px, 768px, and 1280px widths.

## Launch checklist

These need the client or an account, so they cannot be done from code.

1. Set up quote email (Gmail SMTP or Resend, see above) and test a real quote request on the deployed site.
2. Verify the site in Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`.
3. Create a Google Business Profile (as a service-area business), Bing Places, and Apple Business Connect, using only confirmed details.
4. When confirmed, add `telephone`, `openingHours`, and `address` to `localBusinessSchema()` in `src/lib/schema.ts`, and `sameAs` once profiles exist.
5. Run the Rich Results Test and validator.schema.org on the live URL.
