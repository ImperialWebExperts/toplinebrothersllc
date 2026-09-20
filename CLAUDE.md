# CLAUDE.md — Top Line Brothers LLC website

Marketing website for Top Line Brothers LLC, a new California equipment rental company. The site's job is to make a weeks-old company look legitimate and turn visitors into quote requests. Read this file at the start of every session. Read `DESIGN.md` before touching any UI — and if `DESIGN.md` does not exist yet, that confirms the project is still in Phase 1: build grayscale and do not invent a visual direction.

## Current phase

**Phase 2: `DESIGN.md` applied.** Tokens, fonts, and components follow `DESIGN.md` exactly. Do not introduce colors, fonts, radii, or shadows outside it. Structure is the Phase 1 structure, plus the components `DESIGN.md` adds (utility bar, trust strip, category tiles). Yellow is the quote button and nothing else.

Phases, in order (update the line above when the phase changes):
1. Grayscale wireframe, reviewed and approved by the client
2. Apply `DESIGN.md` (swap token values, load fonts, restyle; no structural changes)
3. Real content replaces placeholders as the client supplies it
4. Launch checks (SEO, schema, performance, accessibility, legal review)

### Phase 4 SEO launch checklist

The SEO plumbing is built; these steps need the domain or the client and cannot be done from code.

1. Set the real domain: `NEXT_PUBLIC_SITE_URL` at build time, or the fallback in `lib/site.ts`. Canonicals, sitemap, Open Graph, `llms.txt` and JSON-LD all follow it. Until then every URL points at `example.com`, so nothing is indexable.
2. Replace the Gmail address in `SITE.email` with a domain email.
3. Verify the site in Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`.
4. Create Google Business Profile (as a service-area business), Bing Places, and Apple Business Connect, using only confirmed details.
5. When confirmed, add `telephone`, `openingHours`, and `address` (if there is one) to `localBusinessSchema()`, and `sameAs` once profiles exist. The code comment in `lib/schema.ts` lists them.
6. Run the Rich Results Test and validator.schema.org on the live URL. Structured data has only been checked structurally.
7. Confirm no `[PLACEHOLDER: ...]` text is left, since it would be indexed.

## Business facts (the only facts you may use)

- **Legal name:** Top Line Brothers LLC
- **Type:** California Limited Liability Company
- **Activity:** Power tool and access equipment rental
- **Service area:** Imperial Valley and surrounding areas (all cities)
- **Email:** Toplinebrothersllc@gmail.com
- **Audience:** contractors, tradesmen, and property owners
- **Company age:** a few weeks old. Never imply otherwise.
- **Power tools are kept general.** No specific models, brands, or SKUs.
- **Client-supplied, already on the site** (Home and `/how-renting-works`). Reuse the wording; do not extend it and never add amounts:
  - The "100% Reliable Equipment Guarantee" trust point on Home.
  - Tile chips: "Electric, Pneumatic, Fuel-Powered" (Power Tools) and "Scaffolds, Ladders, Lifts" (Access Equipment).
  - Delivery to the job site and customer pickup are both offered, with one flat delivery fee across the Imperial Valley.
  - Rentals by the hour, day, week, or month. Payment by cash, card, or online.
  - A deposit on every rental, a late fee for late returns, and a penalty fee for damaged equipment. No amounts are stated.

## Hard rules

1. **Never invent facts.** No phone number, prices, inventory, years in business, fleet size, reviews, testimonials, licenses, insurance claims, certifications, addresses, hours, response times, or "trusted by" claims. If it is not listed above or supplied by the client, it is unknown.
2. **Unknown means placeholder.** Every unknown renders through the `<Placeholder label="..."/>` component (visible as `[PLACEHOLDER: label]`). Never write plausible-sounding filler instead.
3. **No photos or stock imagery.** The client does not want images. The only image assets are `logo_black.png` and `logo_white.png` in `public/brand/`, plus the browser and link-preview images derived from the logo (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/brand/og-image.png`). Those are the badge on white and never appear on a page. Everything else is type, borders, surfaces, and inline SVG icons. Do not add illustrations, gradients, or patterns to compensate.
4. **Legal text is not yours to finalize.** The site has no legal pages (see the dropped routes under Sitemap and funnel). Do not write binding terms, liability language, deposit amounts, or fee schedules.
5. **Omit unconfirmed schema properties.** Leave `telephone`, `address`, and `openingHours` out of JSON-LD until the client confirms them. Leave a code comment noting what to add.
6. **Ask before adding dependencies** beyond Next.js, React, TypeScript, and Tailwind. `lucide-react` is the only pre-approved extra, and only if inline SVGs are not enough.

## Stack

Next.js (App Router), React, TypeScript (strict, no `any`), Tailwind CSS. No UI libraries, no CSS-in-JS. All pages statically generated.

Server Components by default. `"use client"` only for `MobileNav`, `NavLink` (needs the current pathname to mark the active page), and `QuoteForm`. Justify any new client component before adding it.

## Commands

```bash
npm run dev            # local dev server
npm run build          # must pass with no errors
npm run lint           # must pass with no errors
npx tsc --noEmit       # type check
```

Before calling any task done: run lint, type check, and build; then check the affected pages at **375px, 768px, and 1280px** widths.

## Project structure

```
src/
  app/
    layout.tsx               root layout: Header, main, ClosingCTA, Footer
    page.tsx                 Home
    globals.css              Tailwind import + theme tokens (see Design and copy)
    how-renting-works/page.tsx
    service-area/page.tsx
    about/page.tsx
    contact/page.tsx         quote form + contact details
    contact/thanks/page.tsx  confirmation (noindex)
    sitemap.ts  robots.ts  not-found.tsx
    llms.txt/route.ts        plain-text site summary for AI crawlers (static)
    favicon.ico  icon.png  apple-icon.png    derived from the logo
  components/
    layout/   Header, MobileNav, NavLink, Footer, ClosingCTA
    ui/       Button, Section, Container, Card, Placeholder, FAQ, Logo, Steps, Checklist, Icon, TrustStrip
    forms/    QuoteForm
    seo/      JsonLd
  lib/
    site.ts                  single source of truth (see below)
    schema.ts                JSON-LD builders
    seo.ts                   pageMetadata (title, canonical, Open Graph, Twitter), share image, title template
public/brand/                logo_black.png, logo_white.png, og-image.png
```

### `lib/site.ts` is the single source of truth

Business name, email, nav links, city list, equipment categories, CTA labels, and the domain (placeholder, overridable with `NEXT_PUBLIC_SITE_URL`) live here and nowhere else. Never hardcode nav items, city names, or CTA strings in a page or component. When the client confirms a phone number, city list, or domain, the change should be one file.

## Sitemap and funnel

| Route | Funnel stage | Job |
|---|---|---|
| `/` | Awareness | Who they are, what they rent, where. Carries the two equipment categories. Route to quote |
| `/how-renting-works` | Consideration | Main AEO page: process, requirements, FAQs |
| `/service-area` | Local / Awareness | Imperial Valley cities |
| `/about` | Trust | LLC facts, who is behind it, credentials (only if confirmed) |
| `/contact` | Decision | Quote form. The conversion page |
| `/contact/thanks` | Confirmation | Post-submit. `noindex` |
| `/404` | Recovery | `not-found.tsx`. Link home plus a quote CTA |

**There is no `/equipment` route.** It was cut in review: with no confirmed inventory the page was a wall of placeholders. Power Tools and Access Equipment live as the two "What we rent" cards on Home, each linking to `/contact?category=power-tools` / `?category=access-equipment`. Do not re-add the route unless the client supplies real category content and asks for it — and if that happens, add it to `NAV` in `lib/site.ts` and to `INDEXABLE_ROUTES`, not just as a file.

**There is no `/rental-terms` route.** The client dropped it. It is removed from `INDEXABLE_ROUTES`, and the "Read the full rental terms" button is gone from How renting works. Do not re-add it unless asked.

**There is no `/privacy-policy` route and no Legal column in the footer.** The client dropped both. `LEGAL_NAV` and the `type-headline-sm` utility (used only by the legal page) were deleted with it, and the footer grid is three columns. Do not re-add any of it unless asked; if a legal page returns, add it to `INDEXABLE_ROUTES` and the footer together.

**There is no mobile sticky bar.** The client dropped it. `MobileStickyBar` was deleted, along with `viewportFit: "cover"` in `layout.tsx` (it existed only for the bar's safe-area inset) and the footer's extra mobile bottom padding. Do not re-add any of it unless asked. `<main>` keeps its `pb-24`: that is the space before the closing band, not bar clearance.

Funnel rules:
- The quote action ("Request a quote") is visible above the fold on every page and repeated in the closing band before the footer. No page is a dead end.
- Every page has one obvious next step, using the primary button style, identically everywhere.
- The quote form stays short: name, phone or email, equipment category, what they need, dates, job site city, delivery or pickup. Do not add fields without asking.
- The equipment category and city are prefilled from `?category=` and `?city=` query params.
- Form submit POSTs to `src/app/api/quote/route.ts`, which validates again and emails the request to `SITE.email` through Resend's REST API (plain `fetch`, no SDK). It needs `RESEND_API_KEY` (and optionally `QUOTE_FROM_EMAIL`, default `onboarding@resend.dev`, which only delivers to the Resend account owner until a domain is verified). On success the user goes to `/contact/thanks`; on failure the form stays put and shows a `mailto:` fallback. Validation rules shared by form and route live in `lib/quote.ts`.

## SEO, AEO, and GEO

- One H1 per page. Headings in logical order. Question-style headings where a visitor would ask that question, followed by a direct answer in the first one or two sentences.
- FAQ uses native `<details>`/`<summary>` so every answer is in the server-rendered HTML. FAQ pages emit `FAQPage` JSON-LD.
- JSON-LD via the `JsonLd` component, one `@graph` per page built with `graph()` from `lib/schema.ts`. Nodes link by `@id`. `LocalBusiness` (with `areaServed` from the cities array, email, logo, and a price-free service catalog) plus `WebSite` on Home; `LocalBusiness` on Contact; inner pages carry a typed `WebPage`/`AboutPage`/`ContactPage` and a `BreadcrumbList` and point at the business by `@id`. The `FAQ` component emits its own `FAQPage` block.
- Each page sets `title`, `description`, canonical, Open Graph and Twitter through `pageMetadata()` in `lib/seo.ts`. The root layout sets the title template `%s | Top Line Brothers LLC`, `metadataBase`, and a site-wide `robots` allowing full snippets and large previews.
- `sitemap.ts` lists all indexable routes and excludes `/contact/thanks`. It has no `lastModified`: nothing tracks real change dates, and a build-time stamp is a false freshness signal. `robots.ts` blocks `/contact/thanks` and `/api/`.
- `/llms.txt` is a cheap extra for AI crawlers, built from `lib/site.ts`. No major engine has confirmed it reads the file.
- `dateModified`, `datePublished`, and `foundingDate` stay out of JSON-LD until real dates exist.
- Keep the business name, email, and (later) phone identical everywhere they appear.
- Use descriptive link text. Never "click here".

## Design and copy

- **Tokens:** colors are defined once in `src/app/globals.css` (a Tailwind v4 `@theme` block) under the names `DESIGN.md` uses: `--color-primary`, `-ink`, `-ink-muted`, `-canvas`, `-surface-1`, `-hairline`, `-inverse-*`, `-success`, `-error`. Use them as `bg-canvas`, `text-ink-muted`, `border-hairline`. Never a hex value in a component. The old `wire-*` grayscale tokens are gone.
- **Type:** roles from the `DESIGN.md` type scale are `type-*` utilities in `globals.css` (`type-display-xl`, `type-display-lg`, `type-headline`, `type-title`, `type-body`, ...). Use them instead of ad-hoc `text-*` sizes. Archivo (display) and IBM Plex Sans (text) load in `layout.tsx`.
- **Styling:** follow `DESIGN.md` exactly. It defines colors, type, spacing, components, and the do's and don'ts. Do not introduce colors, fonts, radii, or shadows outside it.
- Copy voice: plain, direct, written for a contractor on a phone. Sentence case. Active verbs. Buttons say what happens ("Request a quote", not "Submit"). No hype and no claims the client cannot back up.
- Accessibility floor: semantic landmarks, visible focus on every interactive element, 48px touch targets, labeled form fields with `aria-invalid` and `aria-describedby` on errors, color never the only signal.

## Wireframe tooling

- `<Placeholder>` marks every unknown. It is removed or emptied at launch.

## Gotchas in this codebase

These have already bitten or will. Do not "fix" them by removing the guard.

- **`useSearchParams` must stay inside `<Suspense>`.** `QuoteForm` reads `?category=` and `?city=`; `/contact` wraps it in a Suspense boundary. Removing the boundary breaks `next build` with a prerender error, not a dev error — so it passes locally and fails in CI.
- **The quote form has a honeypot** (`website`, visually hidden, `tabIndex={-1}`). Submissions with it filled are silently dropped, on the client and again in `/api/quote` (which returns 200 and sends nothing). Keep both checks, and keep server-side validation in the route.
- **The form is `noValidate`** on purpose — validation and error messaging are ours, so errors are consistent and announced via `aria-invalid` / `aria-describedby`. Do not re-enable native validation bubbles.
- **`INDEXABLE_ROUTES` in `lib/site.ts` drives `sitemap.ts`.** A new page is not indexed until it is added there. `/contact/thanks` stays out of it and sets `robots: { index: false }` in its own metadata — both, not one.
- **Use `pageMetadata()`, not a hand-written `metadata` object, for indexable pages.** Next replaces `openGraph` and `twitter` wholesale when a page sets them, so a page that sets only a title loses its social tags. `not-found.tsx` sets `robots: { index: false }` itself, because Next adds its own `noindex` to a 404 and the layout's `index, follow` would otherwise sit beside it.
- **`favicon.ico` must contain RGBA PNGs.** Next's ICO decoder fails the build on RGB ones ("The PNG is not in RGBA format"). If the icons are regenerated from the logo, keep an alpha channel.
- **The logo goes through `next/image` with explicit dimensions** (`components/ui/Logo.tsx`) to avoid layout shift in the sticky header. The supplied files carry heavy internal padding, so `Logo` crops them (the badge is drawn 1.5x its box and clipped); pass the size you want the *badge* to be. Header lockup is the 48px badge plus the name as real text. `logo_white.png` is for dark surfaces only (footer).
- **Touch targets:** the shared `Button` is `min-h-12` (48px). Change it in `Button` once, not per page.
- **`Button` sets its own `display`.** In Tailwind v4 a bare `hidden` loses to `inline-flex`, so `<Button className="hidden md:inline-flex">` shows at every width. Hide a wrapper element instead (see the tablet CTA in `Header`).
- **Category tiles stack until `xl`.** At 52px extended width the longest word ("Equipment") needs about 405px, and a two-column tile has that much room only from 1280px. Side by side at `md` breaks the word mid-letter.
- **Every route must render `ClosingCTA`** — it lives in the root layout, so do not add a second one inside a page.

## Known unknowns (waiting on the client)

Do not guess any of these. Use placeholders.

- Phone number and business hours
- Whether there is a yard address (delivery and pickup themselves are answered; see Business facts)
- Final list of cities (current list is an editable guess: El Centro, Calexico, Brawley, Imperial, Holtville, Calipatria, Westmorland, Heber, Seeley, Niland) and whether "surrounding areas" extends beyond Imperial County
- Concrete tool types beyond the three chips per tile on Home (those are client-supplied; do not add more)
- Whether the client wants an `/equipment` page at all once inventory is known
- Provable trust facts: insurance, licensing, locally owned
- Domain name (also needed to replace the Gmail address with a domain email). The owner will supply it; see the Phase 4 SEO checklist
- Rental term details: deposit amount, late and damage fee amounts, cancellation, liability. The site states only that a deposit and fees apply
- Owner names and roles for the About page

## Working style

- Make the smallest change that does the job. Do not refactor unrelated files.
- When a request conflicts with a hard rule above, say so and ask instead of working around it.
- When something is ambiguous, ask one focused question rather than guessing.
- Report what you changed and what you verified. Say plainly if you could not run a check.
