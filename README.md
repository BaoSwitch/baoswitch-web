# baoswitch-web

The BAOSWITCH Digital Services marketing site — Next.js 16 (App Router,
Turbopack) + React 19 + Tailwind CSS 4, built from the
[BAOSWITCH Figma file](https://www.figma.com/design/dgAnTqrFuKJ9UvMK9Ueg0y/BAOSWITCH-PROJECT--Copy-).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (standalone output)
npm run start
npm run lint
```

## Routes

**Public** — `/` · `/about` · `/services` · `/pricing` · `/contact`
**Account access** — `/login` · `/signup` · `/verify` · `/forgot-password` · `/reset-password` · `/set-pin`
**Customer dashboard** — `/app` and below: `wallet`, `wallet/fund`, `wallet/status`, `pay` + six
purchase forms, `pay/review`, `transactions`, `transactions/[reference]`, `beneficiaries`,
`beneficiaries/[id]`, `beneficiaries/new`, `services/architects`, `services/architects/[id]`,
`services/architects/requests`, `services/laundry`, `services/laundry/booking`, `support`,
`support/report`, `support/tickets/[id]`, `settings`, `settings/security`,
`settings/notifications`, `settings/identity`
**Admin** — `/admin`

All 37 Figma frames are built. The source exports are in `docs/design/frames/`,
named after the frames they came from.

### Four states, one route

The frames draw "Payment successful", "Payment pending", "Payment failed" and
the electricity token as four separate screens. They are one screen in four
states, so `transactions/[reference]` renders whichever state a reference is
in. A link saved while a payment was pending still resolves after it settles.

## Layout

```
app/
  globals.css          design tokens, card system, utilities — the whole theme
  layout.tsx           fonts, metadata, skip link
  fonts/               self-hosted Poppins .woff2 (see "Fonts")
  (marketing)/
    layout.tsx         header + footer shared by the five public pages
    page.tsx           the LANDING PAGE frame, section for section
    about|services|pricing|contact/
  (auth)/
    login|signup/      the split-panel frames
components/
  auth/auth-shell.tsx  green brand panel + white form panel
  brand/logo.tsx       the B-mark + AOSWITCH lockup
  marketing/*          one file per landing-page section, plus split-page
                       and price-table used by the inner pages
  motion/*             scroll reveal + an off-screen idle hook
  ui/                  button, form fields, the slot-aware DesignIcon
lib/
  content.ts           every string and asset path the pages render
  pricing.ts           the three price tables, verbatim from the frame
  site.ts              name, domain, contact details, socials
public/assets/         brand marks, icons, photos and provider logos from Figma
```

## Icons from Figma

Figma centres each glyph in a square slot but exports it cropped to its own
bounds, so the files are all different shapes — `svc-electricity.svg` is
46.7 x 66.7, `youtube.svg` is 24 x 16. `<DesignIcon>` takes the file's
intrinsic size plus its slot and sizes the glyph as a percentage of that slot,
which is the only way to avoid either stretching a glyph into a square or
letting `object-contain` scale a narrow one up to fill.

Some marks ship in two colourways. The footer sits on black and uses the white
exports (`phone-call.svg`); the Contact page is on white and uses the green
ones (`phone-call-green.svg`). Using the wrong set renders an invisible icon.

## Design tokens

Three brand colours come out of the Figma file as variables, and everything
in `globals.css` derives from them:

| Token | Value | Role |
| --- | --- | --- |
| `--bs-primary` | `#00C853` | GREEN (Primary) — tiles, buttons, the green band |
| `--bs-accent` | `#0A1931` | Deep Navy Blue (Accent) — body copy, logo plates |
| `--bs-secondary` | `#FFC400` | Bright Yellow (Sec.) — Subscribe, the lockup's strapline |

Tailwind sees them as ordinary utilities (`bg-primary`, `text-accent`,
`border-line`) through the `@theme inline` block, so a brand change is a
three-line edit and nothing hardcodes a hex.

### Contrast

White text on `#00C853` measures **2.24:1** — under the 4.5:1 WCAG 2.2 AA
needs for body copy, and under even the 3:1 for large text. The same green as
*text* on white is also 2.24:1. So the green is split by job:

| Token | Value | Used for |
| --- | --- | --- |
| `--bs-primary-vivid` | `#00C853` | Decoration only — glows, rules, the active-nav underline. Never behind or as text. |
| `--bs-primary` | `#00843A` | Surfaces that carry white text: service tiles, the How It Works band, FAQ bars, primary buttons. 4.8:1. |
| `--bs-primary-text` | `#00843A` | Green words on a light background. 4.8:1. |

Accessible is the **default**. To see the frame reproduced exactly, put
`data-bs-contrast="brand"` on `<html>` — it restores the literal `#00C853` on
text-bearing surfaces and fails AA. It exists for side-by-side review, not
for shipping.

```tsx
<html lang="en-NG" data-bs-contrast="brand">
```

## Fonts

Poppins is **self-hosted** from `app/fonts/*.woff2` through `next/font/local`,
not fetched from Google Fonts. No third-party request on first paint, no
visitor IP handed to Google, and the build does not depend on
`fonts.gstatic.com` being reachable. The files come from `@fontsource/poppins`
(a devDependency); to refresh them:

```bash
for w in 300 400 500 600 700 800; do
  cp node_modules/@fontsource/poppins/files/poppins-latin-$w-normal.woff2 app/fonts/poppins-$w.woff2
done
```

## Dark mode

A full dark token set is defined under `.dark` and is wired through the same
`@theme inline` block, but no toggle ships yet — the Figma file is light-only.
Adding `class="dark"` to `<html>` switches the whole page today.

## Notes on the Figma translation

- The frame positions every section absolutely on a 1728px artboard. Sections
  here are flow-laid and fluid; the 1424px content column is `bs-wrap`.
- `<Band>` adds alternating contrast and a colour wash so the page is not
  eight identical white slabs.
- The provider strip is a real marquee (duplicated track, `-50%` translate)
  rather than the frame's one static 4556px row. It idles off screen, pauses
  on hover/focus, and becomes a plain scrollable row under
  `prefers-reduced-motion`.
- The FAQ accordion is native `<details>`/`<summary>`, so it works without
  JavaScript and find-in-page can reach the answers.
- "Why choose us" is numbered 1,2,3,3,4,5 in the frame; the numerals come
  from the list index here.
