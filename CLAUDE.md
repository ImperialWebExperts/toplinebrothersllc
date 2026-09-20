# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing site for Top Line Brothers LLC, a weeks-old California equipment rental company (power tools and access equipment, Imperial Valley). Its only job is to make the company look legitimate and turn visitors into quote requests. `README.md` covers env vars, mail setup and the launch checklist; `DESIGN.md` is the style reference and must be read before any UI work.

`AGENTS.md` warns that this is Next.js 16 with breaking changes from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

## Commands

```bash
npm run dev            # dev server on :3000
npm run lint           # eslint (next core-web-vitals + typescript)
npx tsc --noEmit       # type check
npm run build          # production build
```

There is no test suite. Before calling a task done, run lint, type check, and build, then check the affected pages at 375px, 768px, and 1280px. Some errors only show in `next build`, not `next dev` (see `useSearchParams` below).

## Architecture

Next.js App Router, React 19, TypeScript (strict, no `any`), Tailwind v4 with no UI libraries. Every page is statically generated. The only server code is `src/app/api/quote/route.ts`. `"use client"` is limited to `QuoteForm`, `MobileNav`, and `NavLink`; justify any new client component.

**`src/lib/site.ts` is the single source of truth**: business name, email, site URL (`NEXT_PUBLIC_SITE_URL` overrides the `vercel.app` fallback), `NAV`, `CTA`, `CATEGORIES`, `CITIES`, `SOCIAL`, and `INDEXABLE_ROUTES`. Never hardcode nav items, city names, CTA strings, or the domain in a page or component.

**Quote flow** spans several files:
- `components/forms/QuoteForm.tsx` (client) and `app/api/quote/route.ts` both validate with `lib/quote.ts`. The route never trusts the client's checks.
- The route order is: rate limit (`lib/rateLimit.ts`, 5 per IP per 10 min, in memory, so best-effort on serverless), then honeypot (`website` field; a filled one returns 200 and sends nothing), then `parse()`, then `lib/mail.ts`.
- `lib/mail.ts` picks a transport by env: Gmail SMTP through `nodemailer` (`SMTP_USER` + `SMTP_PASS`, wins when set) or Resend over plain `fetch` (`RESEND_API_KEY`). `QUOTE_TO_EMAIL` overrides the recipient for testing and must be unset at launch. With neither configured the form shows an error with a `mailto:` fallback.
- The email subject uses only labels from `lib/site.ts`, never raw user text. Failure logs contain error codes only, since messages can echo customer details.
- The start date must be today or later in Pacific time (`todayPacific()`).
- The field list is fixed (`Fields` in `lib/quote.ts`: name, phone or email, category, need, start date, length, city, delivery or pickup). Do not add fields without asking. `?category=` and `?city=` prefill the form and are validated against the slug lists.

**SEO plumbing**: each page calls `pageMetadata()` (`lib/seo.ts`) and emits JSON-LD through `JsonLd` with one `@graph` per page built by `lib/schema.ts` (nodes link by `@id`). `sitemap.ts`, `robots.ts`, and `llms.txt/route.ts` are all built from `lib/site.ts`.

**Design system**: colors and type roles are defined once in `src/app/globals.css` (`@theme` tokens such as `bg-canvas`, `text-ink-muted`, `border-hairline`; `type-*` utilities such as `type-headline`, `type-body`). Use them, never hex values or ad-hoc `text-*` sizes. Follow `DESIGN.md` exactly and introduce no new colors, fonts, radii, or shadows. Yellow (`primary`) is the quote button and nothing else. Fonts are Archivo and IBM Plex Sans, loaded in `app/layout.tsx`.

## Content rules

The confirmed business facts are the name, California LLC, email, service area (Imperial Valley and surrounding areas), and the two categories. The other client-supplied facts are already on Home and `/how-renting-works`: reliability guarantee, delivery and pickup with one flat delivery fee, hourly through monthly rentals, a deposit plus late and damage fees (no amounts), and a photo ID requirement. Reuse that wording and do not extend it. The Instagram link lives in `SOCIAL` (`lib/site.ts`) and is shown in the footer.

- **Never invent facts**: phone, prices, fee amounts, inventory, years in business, fleet size, reviews, licenses, insurance, addresses, hours, "trusted by" claims. The company is a few weeks old; never imply otherwise. Power tools stay general (no brands or models). If something is unknown, leave it off the page (there is no placeholder component) and ask rather than filling in plausible copy. Before launch, no `[PLACEHOLDER: ...]` text may be in any page.
- **No photos or stock imagery.** Only the logo files in `public/brand/` and the icons and OG image derived from them. Everything else is type, borders, surfaces, and inline SVG (`components/ui/Icon.tsx`).
- **No legal text.** Do not write terms, liability language, or fee schedules.
- **Omit unconfirmed JSON-LD properties**: `telephone`, `address`, `openingHours`, `sameAs`, `dateModified`, `datePublished`, `foundingDate`. `localBusinessSchema()` has a comment listing what to add once confirmed.
- **Ask before adding dependencies** beyond Next, React, TypeScript, Tailwind, and the already-approved `nodemailer`.
- Voice is plain and direct, in sentence case, for a contractor on a phone. Buttons say what happens ("Request a quote").
- Keep the business name and email identical everywhere.

## Routes the client cut (do not re-add unless asked)

`/equipment`, `/rental-terms`, `/privacy-policy` (and the footer Legal column), and the mobile sticky bar. Power Tools and Access Equipment are two cards on Home linking to `/contact?category=...`. If any of these returns, add it to `NAV`/`INDEXABLE_ROUTES` in `lib/site.ts`, not just as a file.

## Gotchas

- **`useSearchParams` must stay inside `<Suspense>`** (`QuoteForm` inside `/contact`). Without it `next build` fails with a prerender error even though dev works.
- **Keep the honeypot check in both places** (client and route), and keep server-side validation. The form is `noValidate` on purpose, with our own `aria-invalid` / `aria-describedby` errors.
- **A new page is not indexed until it is in `INDEXABLE_ROUTES`.** `/contact/thanks` stays out of it and also sets `robots: { index: false }` in its own metadata, so it needs both.
- **Use `pageMetadata()`, not a hand-written `metadata` object.** Next replaces `openGraph` and `twitter` wholesale, so a page that sets only a title loses its social tags. `not-found.tsx` sets its own `noindex`.
- **`favicon.ico` must contain RGBA PNGs**, or the build fails with "The PNG is not in RGBA format". Keep the alpha channel if the icons are regenerated.
- **Logo** goes through `next/image` with explicit dimensions (`components/ui/Logo.tsx`). The source files have heavy padding, so `Logo` crops them; pass the size you want the badge to be. `logo_white.png` is for dark surfaces only.
- **`Button` sets its own `display`**, so in Tailwind v4 `className="hidden md:inline-flex"` on it shows at every width. Hide a wrapper element instead. The 48px touch target (`min-h-12`) is set in `Button` once, not per page.
- **Category tiles stack until `xl`**; side by side at `md` breaks "Equipment" mid-word.
- **`ClosingCTA` is rendered by the root layout.** Do not add a second one in a page.
- **Keep `<main>`'s `pb-24` in `app/layout.tsx`.** Sections stack with top padding only, so it is the space before the closing band.

## Current state

Phase 4 (launch checks): the design is applied and the client has confirmed the copy. Still open and not doable from code: Search Console and Bing verification, business profiles, a real test quote through Gmail SMTP in Vercel, and phone, hours, address, and final city list (`CITIES` in `lib/site.ts` is an editable guess). No custom domain is planned, so the site stays on `toplinebrothersllc.vercel.app` and quote email goes through the Gmail account.

## Working style

Make the smallest change that does the job and do not refactor unrelated files. If a request conflicts with a rule above, say so and ask. Report what you verified and say plainly if a check could not be run.
