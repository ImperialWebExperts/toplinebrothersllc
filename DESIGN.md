# Top Line Brothers — Style Reference
> A black-and-white equipment-rental system with one job: get a contractor to request a quote. Structure and tone come from Uber (plain, utilitarian, big tap targets), geometry and forms from IBM (square corners, bordered tiles, flat surfaces), and typographic weight from Nike (huge uppercase display lockups that do the work photography would). There are no photos and no illustrations. Safety yellow is used for exactly one thing: the quote action. If it is yellow, it leads to /contact.

**Theme:** light, with black inverse bands (closing CTA, footer, category tiles)

**Brand assets:** `logo_black.png` on light surfaces, `logo_white.png` on dark surfaces. The logo is a black-and-white circular badge with an angular "TL" monogram, wide extended lettering, and a segmented ring. The system borrows its angularity (square corners) and its width (extended display type).

**Not a copy of any source brand.** This merges three published style snapshots into a new system. Do not use Uber, Nike, or IBM names, logos, or marks.

## Merge decisions

Where the three sources conflicted, one rule won. This table records which and why, so no one re-blends them later.

| Decision | Winner | Why |
|---|---|---|
| Base palette | Uber (pure black and white) | Matches the black logo file exactly |
| Corner geometry | IBM (0px on everything actionable or structural) | Echoes the angular logo; pills on buttons would fight it |
| Rounded shapes | Nike (pill, **tags and chips only**) | Gives non-clickable labels a distinct shape from buttons |
| Display type | Nike's idea (big uppercase lockups), built with an extended face | Extended letterforms echo the logo's lettering |
| Text type and scale | IBM (Plex Sans) with Uber's plain hierarchy | Legible, free, renders well at 14–18px |
| Forms | IBM (filled fields, bottom border, 48px height) | Best-documented accessible form pattern of the three |
| FAQ, tags | Nike | Clean rows and chips, no decoration |
| Spacing and grid | IBM (4px base, 96px sections, 1200px max) | Most complete scale |
| Accent color | New (safety yellow) | Not in any source. Trades and equipment vernacular. Source accents were dropped |
| Dropped entirely | IBM blue, Nike pink/purple/teal/sale red, Uber link blue, all photography and illustration | One accent only |

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| primary | `#ffc400` | `--color-primary` | The quote action. Button fills only. Never text, never large decorative areas |
| primary hover | `#e6b000` | `--color-primary-hover` | Hover state for primary button |
| primary pressed | `#cc9c00` | `--color-primary-pressed` | Pressed state for primary button |
| on primary | `#000000` | `--color-on-primary` | Text on primary fill (≈13:1) |
| ink | `#000000` | `--color-ink` | Headings, body text, secondary button fill, borders |
| ink muted | `#525252` | `--color-ink-muted` | Secondary text, captions (≈7.9:1 on white) |
| ink subtle | `#8c8c8c` | `--color-ink-subtle` | Input bottom borders, disabled text, icons only. Fails 4.5:1 for text, so never use for readable copy |
| canvas | `#ffffff` | `--color-canvas` | Default page surface |
| surface 1 | `#f4f4f4` | `--color-surface-1` | Input fill, soft cards, trust strip, utility bar |
| surface 2 | `#e0e0e0` | `--color-surface-2` | Disabled fills, row dividers, pressed neutral |
| hairline | `#cacacb` | `--color-hairline` | Card and tile borders |
| hairline soft | `#e0e0e0` | `--color-hairline-soft` | FAQ, table, and list dividers |
| inverse canvas | `#000000` | `--color-inverse-canvas` | Dark bands, footer, category tiles |
| inverse surface | `#262626` | `--color-inverse-surface` | Raised element on a dark band |
| inverse ink | `#ffffff` | `--color-inverse-ink` | Text on dark |
| inverse ink muted | `#c6c6c6` | `--color-inverse-ink-muted` | Secondary text on dark (≈12:1) |
| inverse hairline | `#4b4b4b` | `--color-inverse-hairline` | Dividers on dark |
| success | `#007d48` | `--color-success` | Confirmation states (≈5.2:1 on white) |
| error | `#da1e28` | `--color-error` | Form errors (≈5:1 on white) |

**Yellow rules:**
1. Yellow is a button fill. It is never a text color, border, icon color, background band, or highlight.
2. Text on yellow is always `--color-on-primary`.
3. Yellow on white has ≈1.6:1 contrast, so a yellow button is identified by its label, not its edge. Do not place yellow buttons on `--color-surface-1` without checking that the label stays the focal point.
4. There is no warning color. If a warning is needed, use ink text with an icon.

## Tokens — Typography

Two families, clearly distinct. One is heavy and wide. One is quiet and readable.

### Archivo (extended) · `--font-display`
- **Source:** Google Fonts, variable, `wdth` axis (62–125)
- **Substitute:** Arial Black, system-ui, sans-serif
- **Weights:** 700, 800
- **Width:** `font-stretch: 125%` from 768px up; `110%` below 768px so the longest words fit at 375px
- **Used for:** H1, H2, campaign and category tile text, step numerals
- **Role:** The one memorable element. Wide, heavy, and close to the logo's extended lettering.

### IBM Plex Sans · `--font-text`
- **Source:** Google Fonts
- **Substitute:** Inter, system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Used for:** H3 and below, body, buttons, forms, navigation, captions
- **Role:** Everything that needs to be read quickly on a phone at a job site.

### Type Scale

| Role | Family | Size (desktop / mobile) | Line height | Letter spacing | Case | Token |
|---|---|---|---|---|---|---|
| display-xl (home H1) | Archivo 800 | 72px / 36px | 1.0 | -0.01em | UPPERCASE | `--text-display-xl` |
| display-lg (inner H1, tile text) | Archivo 800 | 52px / 32px | 1.08 | -0.01em | UPPERCASE | `--text-display-lg` |
| headline (H2) | Archivo 700 | 36px / 28px | 1.2 | 0 | Sentence case | `--text-headline` |
| numeral (step numbers) | Archivo 800 | 64px / 48px | 1.0 | 0 | n/a | `--text-numeral` |
| title (H3, card title) | Plex 600 | 24px / 20px | 1.33 | 0 | Sentence case | `--text-title` |
| subhead (lead paragraph) | Plex 400 | 20px / 18px | 1.4 | 0 | Sentence case | `--text-subhead` |
| body-lg | Plex 400 | 18px | 1.5 | 0 | Sentence case | `--text-body-lg` |
| body | Plex 400 | 16px | 1.5 | 0.16px | Sentence case | `--text-body` |
| body-strong | Plex 600 | 16px | 1.5 | 0.16px | Sentence case | `--text-body-strong` |
| body-sm | Plex 400 | 14px | 1.43 | 0.16px | Sentence case | `--text-body-sm` |
| caption | Plex 400 | 12px | 1.33 | 0.32px | Sentence case | `--text-caption` |
| button | Plex 600 | 16px | 1.25 | 0 | Sentence case | `--text-button` |
| button-lg | Plex 600 | 18px | 1.33 | 0 | Sentence case | `--text-button-lg` |

**Type rules:**
- Uppercase is reserved for H1 lockups and tile text. Everything else, including H2 question headings, is sentence case. This keeps AEO-style headings ("How does equipment rental work?") readable.
- No tracked-out uppercase labels or eyebrows above headings. A label is only allowed when it carries information the heading does not.
- Body text line length: 68 characters max (`max-w-prose`).
- Minimum body size is 16px. 14px is for secondary text only. 12px is for captions only.

## Tokens — Spacing & Shapes

**Density:** comfortable

### Spacing Scale (4px base)

| Name | Value | Token |
|---|---|---|
| xxs | 4px | `--spacing-xxs` |
| xs | 8px | `--spacing-xs` |
| sm | 12px | `--spacing-sm` |
| md | 16px | `--spacing-md` |
| lg | 24px | `--spacing-lg` |
| xl | 32px | `--spacing-xl` |
| xxl | 48px | `--spacing-xxl` |
| 3xl | 64px | `--spacing-3xl` |
| section | 96px | `--spacing-section` |

### Border Radius

| Name | Value | Token | Use |
|---|---|---|---|
| none | 0px | `--radius-none` | **Default.** Buttons, cards, tiles, inputs, bands, nav |
| sm | 4px | `--radius-sm` | Wireframe chips and tooltips only |
| pill | 9999px | `--radius-pill` | **Tags and filter chips only.** Never on anything that navigates or submits |

### Layout

- **Max content width:** 1200px
- **Grid:** 4 columns (under 768px, 16px margins, 16px gutters), 8 columns (768–1023px, 32px margins, 24px gutters), 12 columns (1024px and up, 32px margins, 24px gutters)
- **Section padding (vertical):** 48px mobile, 64px tablet, 96px desktop
- **Card padding:** 24px
- **Element gap:** 16px
- **Breakpoints:** 375 (design target), 768, 1024, 1280

### Elevation

Flat. No shadows on cards, tiles, or buttons. The only shadow in the system is on overlays that float over content (mobile nav drawer, dialogs): `0 8px 24px rgba(0,0,0,0.16)`. Borders and surface color carry hierarchy.

## Signature Details

**The top line.** A 4px solid rule (`--color-ink` on light bands, `--color-inverse-ink` on dark bands) that opens each major page section. It marks "a new section starts here" and nothing else. It is not placed on cards, tiles, or inputs, and it is never yellow.

**Header lockup.** The badge logo's ring text is unreadable below about 64px. In the header, use the badge at 48px height next to the company name typeset in Archivo 800 uppercase. This also gives crawlers and screen readers a real text name. Use the full badge alone at 96px or larger (footer, closing band).

**Icons.** 24px, outline style, 2px stroke, miter joins and butt caps to match the angular logo. Icons carry meaning (trust points, checklist items). They are never decoration. If using lucide-react, set `strokeLinecap="butt"` and `strokeLinejoin="miter"`.

**Type as image.** With no photography, large Archivo lettering on black tiles fills the role of the image. Category tiles and the home hero rely on this. Do not add stock photos, illustrations, gradients, or patterns to compensate.

## Components

### button primary
**Role:** The quote action. One per view above the fold. The same button everywhere it appears.

- **backgroundColor:** `{colors.primary}`
- **textColor:** `{colors.on-primary}`
- **typography:** `{typography.button}`
- **rounded:** `{rounded.none}`
- **padding:** `14px 24px`
- **minHeight:** `48px`
- **hover:** `{colors.primary-hover}`
- **pressed:** `{colors.primary-pressed}`
- **focus:** 3px solid `{colors.ink}` outline, 2px offset (3px solid `{colors.inverse-ink}` on dark)
- **disabled:** `{colors.surface-2}` fill, `{colors.ink-subtle}` text

### button secondary
**Role:** Second action next to the primary ("View equipment", "Email us").

- **backgroundColor:** `{colors.ink}`
- **textColor:** `{colors.inverse-ink}`
- **typography:** `{typography.button}`
- **rounded:** `{rounded.none}`
- **padding:** `14px 24px`
- **minHeight:** `48px`
- **hover:** `{colors.inverse-surface}` fill

### button outline
**Role:** Tertiary action, and secondary on busy surfaces.

- **backgroundColor:** transparent
- **textColor:** `{colors.ink}`
- **border:** 2px solid `{colors.ink}`
- **typography:** `{typography.button}`
- **rounded:** `{rounded.none}`
- **padding:** `12px 22px`
- **hover:** `{colors.ink}` fill, `#ffffff` text

### button on dark
**Role:** Secondary and outline buttons placed on inverse bands.

- **backgroundColor:** `{colors.inverse-ink}`
- **textColor:** `{colors.ink}`
- **rounded:** `{rounded.none}`
- **note:** The primary (yellow) button keeps the same style on dark.

### text link
**Role:** Inline and standalone links.

- **textColor:** `{colors.ink}`
- **decoration:** always underlined, 1px, 3px offset
- **hover:** underline thickens to 2px
- **note:** No arrows or chevrons appended to link or button text. Link text names the destination.

### tag
**Role:** Non-clickable labels, such as tool types on the Equipment page. The only pill in the system.

- **backgroundColor:** `{colors.surface-1}`
- **textColor:** `{colors.ink}`
- **typography:** `{typography.body-sm}` at weight 500
- **rounded:** `{rounded.pill}`
- **padding:** `4px 12px`

### text input, select, textarea
**Role:** Quote form fields. IBM filled-field pattern.

- **backgroundColor:** `{colors.surface-1}`
- **textColor:** `{colors.ink}`
- **typography:** `{typography.body}`
- **rounded:** `{rounded.none}`
- **border:** none, except `border-bottom: 1px solid {colors.ink-subtle}`
- **height:** `48px` (textarea: 120px minimum)
- **padding:** `11px 16px`
- **label:** above the field, `{typography.body-sm}` at weight 500, always visible (never placeholder-only)
- **helper text:** below the field, `{typography.caption}`, `{colors.ink-muted}`

### text input focused
- **outline:** 2px solid `{colors.ink}`, no offset, bottom border removed

### text input error
- **outline:** 2px solid `{colors.error}`
- **message:** below the field, `{colors.error}`, `{typography.body-sm}`, with an icon. States what is wrong and how to fix it ("Enter a phone number or email so we can reply").
- **aria:** `aria-invalid="true"` and `aria-describedby` pointing to the message

### card
**Role:** Default content container. Flat, bordered.

- **backgroundColor:** `{colors.canvas}`
- **border:** 1px solid `{colors.hairline}`
- **textColor:** `{colors.ink}`
- **typography:** `{typography.body}`
- **rounded:** `{rounded.none}`
- **padding:** `24px`

### card soft
**Role:** Grouped content that should recede (checklists, "what happens next").

- **backgroundColor:** `{colors.surface-1}`
- **border:** none
- **rounded:** `{rounded.none}`
- **padding:** `24px`

### card link
**Role:** A whole card that navigates (city cards).

- **base:** same as card
- **hover:** border becomes 2px solid `{colors.ink}` (reduce padding by 1px so content does not shift), no movement or scale
- **focus:** same focus outline as buttons

### category tile
**Role:** The typographic stand-in for a product photo. Home page "Power Tools" and "Access Equipment" tiles.

- **backgroundColor:** `{colors.inverse-canvas}`
- **textColor:** `{colors.inverse-ink}`
- **typography:** `{typography.display-lg}` for the category name, `{typography.body-lg}` in `{colors.inverse-ink-muted}` for the description
- **rounded:** `{rounded.none}`
- **padding:** `32px` (48px on desktop)
- **minHeight:** `280px`
- **cta:** button on dark, aligned to the bottom of the tile

### trust strip
**Role:** 3–4 confirmed trust points. Only shows facts the client can prove.

- **backgroundColor:** `{colors.surface-1}`
- **layout:** icon (24px) above `{typography.body-strong}` label and one `{typography.body-sm}` line, columns separated by 1px `{colors.hairline}` dividers
- **padding:** `32px 24px`
- **note:** Unconfirmed points render as placeholder chips, never as invented claims.

### steps
**Role:** A real sequence (How it works, What happens next). This is the only place numbers appear as markers.

- **numeral:** `{typography.numeral}`, `{colors.ink}`
- **title:** `{typography.title}`
- **body:** `{typography.body}`, `{colors.ink-muted}`
- **layout:** 3 or 4 across on desktop, stacked on mobile, 1px `{colors.hairline}` rule above each step

### checklist
**Role:** "What you need to rent", "What to include in your request".

- **marker:** 24px square check icon, `{colors.ink}`
- **typography:** `{typography.body}`
- **gap:** `12px` between items

### faq row
**Role:** Native `<details>` and `<summary>`. Answer is always in the DOM.

- **backgroundColor:** `{colors.canvas}`
- **question:** `{typography.body-lg}` at weight 600
- **answer:** `{typography.body}`, `{colors.ink-muted}`, first sentence answers the question directly
- **padding:** `24px 0`
- **border:** 1px solid `{colors.hairline-soft}` below each row
- **indicator:** plus and minus icon on the right, no rotation animation

### city card
**Role:** One per Imperial Valley city on the Service Area page.

- **base:** card link
- **content:** "Serving {city}" in `{typography.body-strong}` plus a text link "Request a quote"
- **grid:** 4 columns desktop, 2 columns tablet, 1 column under 480px

### utility bar (desktop only, optional)
**Role:** Quiet trust line above the header.

- **backgroundColor:** `{colors.surface-1}`
- **textColor:** `{colors.ink-muted}`
- **typography:** `{typography.caption}`
- **height:** `36px`
- **content:** service area statement on the left; email link (and phone when confirmed) on the right. Separate items with spacing, not middle dots.

### header / nav
**Role:** Primary navigation and the persistent quote action.

- **backgroundColor:** `{colors.canvas}`
- **border:** 1px solid `{colors.hairline-soft}` below
- **height:** `72px` desktop, `64px` mobile
- **logo:** header lockup (badge 48px plus uppercase wordmark)
- **links:** `{typography.body-strong}`, `{colors.ink}`, active page marked with a 2px `{colors.ink}` underline
- **cta:** button primary "Request a quote" at the right edge
- **mobile:** collapses to a menu button; drawer is full-width, `{colors.canvas}`, with the overlay shadow

### mobile sticky bar
**Role:** Always-reachable quote path on phones.

- **backgroundColor:** `{colors.canvas}`
- **border:** 1px solid `{colors.hairline}` above
- **height:** `64px` plus safe-area inset
- **content:** button primary "Request a quote" (flex-grow) and button outline "Email us"; a "Call" slot appears once a phone number is confirmed
- **note:** Add matching bottom padding to the page so content is never covered

### closing band
**Role:** The last thing before the footer on every page. No dead ends.

- **backgroundColor:** `{colors.inverse-canvas}`
- **textColor:** `{colors.inverse-ink}`
- **typography:** `{typography.headline}` for the heading (sentence case), `{typography.body-lg}` in `{colors.inverse-ink-muted}` below
- **padding:** `64px 32px`
- **border-top:** the top line, in `{colors.inverse-ink}`
- **cta:** button primary "Request a quote" (the only yellow on the band)
- **note:** Sits directly on the footer, which is also black. They read as one closing block separated by an `{colors.inverse-hairline}` rule.

### footer
**Role:** Legitimacy and navigation.

- **backgroundColor:** `{colors.inverse-canvas}`
- **textColor:** `{colors.inverse-ink-muted}`
- **typography:** `{typography.body-sm}`
- **padding:** `64px 32px`
- **logo:** `logo_white.png`, 96px or larger
- **links:** `{colors.inverse-ink}`, underlined on hover; Rental Terms and Privacy Policy always present
- **legal line:** "© {year} Top Line Brothers LLC"

### legal text page
**Role:** Rental Terms and Privacy Policy.

- **layout:** single column, `max-w-prose` (68 characters), table of contents in card soft at the top with anchor links
- **headings:** H2 `{typography.headline}` reduced to 28px, H3 `{typography.title}`
- **body:** `{typography.body}` at line height 1.6
- **updated line:** `{typography.caption}`, `{colors.ink-muted}`

### logo usage
- `logo_black.png` on `{colors.canvas}` and `{colors.surface-1}`; `logo_white.png` on `{colors.inverse-canvas}` and `{colors.inverse-surface}`
- Clear space: at least 25% of the badge width on all sides. The provided files carry extra internal padding, so crop or size deliberately and check them against the surfaces above.
- Never recolor, rotate, add effects, or place on yellow, photographs, or mid-gray surfaces.

## Wireframe-only components

These stay visible until the content is confirmed and are removed at launch.

### placeholder
**Role:** Every fact the client has not provided. Renders as `[PLACEHOLDER: label]`.

- **backgroundColor:** `{colors.surface-1}`
- **textColor:** `{colors.ink-muted}`
- **border:** 1px dashed `{colors.ink-muted}`
- **typography:** `{typography.body-sm}`
- **rounded:** `{rounded.sm}`
- **padding:** `2px 8px` inline, `16px` as a block

### annotation
**Role:** Funnel notes visible only when "Show annotations" is on.

- **backgroundColor:** `{colors.ink}`
- **textColor:** `#ffffff`
- **typography:** `{typography.caption}`
- **rounded:** `{rounded.sm}`
- **padding:** `2px 8px`
- **position:** top-left of the annotated section, above other content

## Voice

- Plain, direct, and confident. Short sentences. Active verbs. Written for a contractor reading on a phone.
- Sentence case everywhere except H1 lockups.
- Buttons say what happens: "Request a quote", not "Submit". The same action keeps the same name through the flow: button "Request a quote", confirmation "Quote request received".
- Errors say what is wrong and how to fix it. They do not apologize.
- No superlatives, no hype, no claims the client cannot back up (years in business, fleet size, response times, reviews, licenses).

## Motion

- No entrance animations, scroll effects, parallax, or hover movement.
- State changes (hover, focus, pressed, open and close) transition color only, 120ms ease-out.
- Respect `prefers-reduced-motion`: remove all transitions.

## Accessibility floor

- Text contrast 4.5:1 minimum; large text and UI boundaries 3:1.
- Touch targets 48px minimum height; 8px minimum gap between adjacent targets.
- Visible focus on every interactive element (see button primary).
- One H1 per page. Headings in order. FAQ answers present in the DOM.
- Color is never the only signal (errors also have an icon and text; the active nav link is underlined).

## Do's and Don'ts

### Do

- Keep pages anchored to `--color-canvas`, with black bands used for the closing block, footer, and category tiles.
- Let the extended uppercase H1 be the loudest element on the page. Keep everything around it quiet.
- Use `--color-primary` only for the quote button, and keep it the same button in the same style everywhere.
- Use the top line to open major sections.
- Route every unknown fact through the placeholder component.
- Set all business data (name, email, nav, cities) in one config file and reference it.

### Don't

- Do not add photography, stock imagery, illustrations, gradients, textures, or hazard-stripe patterns.
- Do not use yellow for text, borders, icons, highlights, or backgrounds.
- Do not round buttons, cards, inputs, or bands. Pills are for tags only.
- Do not add shadows to cards or buttons.
- Do not use uppercase outside H1 lockups and tile text.
- Do not add tracked-out labels, middle-dot separators, monospace labels, or arrows appended to links.
- Do not number anything that is not a sequence.
- Do not introduce colors outside the token set above.
- Do not put a top line on cards or tiles.
- Do not invent facts to fill visual space. Use a placeholder.

## Implementation notes (Next.js + Tailwind)

Fonts, in `app/layout.tsx` with `next/font/google`:

```ts
import { Archivo, IBM_Plex_Sans } from "next/font/google";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display-src", display: "swap" });
const text = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-text-src", display: "swap" });
// Add both .variable classes to <html>. Display classes set font-stretch: 125% (md and up) or 110% (below md).
// If the wdth axis is unavailable in your next/font version, use Archivo 800 at normal width and re-check that long words fit at 375px.
```

Tokens, in `globals.css` (Tailwind v4 syntax; on v3 map the same names into `theme.extend`):

```css
@theme {
  --color-primary: #ffc400;
  --color-primary-hover: #e6b000;
  --color-primary-pressed: #cc9c00;
  --color-on-primary: #000000;
  --color-ink: #000000;
  --color-ink-muted: #525252;
  --color-ink-subtle: #8c8c8c;
  --color-canvas: #ffffff;
  --color-surface-1: #f4f4f4;
  --color-surface-2: #e0e0e0;
  --color-hairline: #cacacb;
  --color-hairline-soft: #e0e0e0;
  --color-inverse-canvas: #000000;
  --color-inverse-surface: #262626;
  --color-inverse-ink: #ffffff;
  --color-inverse-ink-muted: #c6c6c6;
  --color-inverse-hairline: #4b4b4b;
  --color-success: #007d48;
  --color-error: #da1e28;

  --font-display: var(--font-display-src), "Arial Black", system-ui, sans-serif;
  --font-text: var(--font-text-src), Inter, system-ui, sans-serif;

  --radius-sm: 4px;
}
```

Migrating from the grayscale wireframe: the wireframe's neutral theme tokens keep their names. Swap their values for the ones above, replace the single "accent gray for CTAs" with `--color-primary`, and load the two fonts. No structural changes should be needed.

## Layout

Use the spacing scale and component geometry above as the implementation baseline. Validate every page at 375px, 768px, and 1280px, paying particular attention to the H1 lockup: the longest word in each H1 must fit on one line at 375px.
