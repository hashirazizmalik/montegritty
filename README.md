# Montegritty

Marketing site for Montegritty — enterprise digital solutions.

Rebuilt from a single static `index.html` into a Next.js App Router project.
The original file is preserved untouched at [`legacy/index.html`](legacy/index.html)
for reference.

---

## Stack

| Layer      | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js 15 (App Router)                                    |
| UI         | React 19, plain CSS (no framework — design language is bespoke) |
| 3D         | three.js — hero point field only                           |
| Fonts      | `next/font` (Fraunces, Plus Jakarta Sans, Space Mono), self-hosted |
| Hosting    | Vercel                                                      |

There is no backend. The enquiry form builds a `wa.me` deep link client-side
and hands off to WhatsApp — see [Contact](#contact) below.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Project layout

```
app/
  layout.js            fonts, metadata, <html> shell
  page.js               section composition
  globals.css           the entire design system
components/              one file per section
lib/content.js           ALL site copy — edit here, not in components
legacy/index.html        the original single-file site
```

Copy lives in `lib/content.js` on purpose. Changing a service name, a
testimonial, or the phone/WhatsApp number means editing one object, not
hunting through JSX.

## Services

Thirteen services under three umbrellas, rendered as an accordion
(`components/Services.jsx`, data in `lib/content.js`):

- **Development** — Web Development, Application Development, ERP Implementation, CRM Implementation, Custom Software
- **AI & Machine Learning** — Agentic AI, AI Automation, Custom Model Development, Computer Vision, Custom Finetuning & Voice Models
- **Digital Marketing** — UI/UX, Social Media Management, Meta Ads

## ⚠️ Testimonials — read before going live

The testimonials in `lib/content.js` are **draft copy**, attributed to real,
named people at real companies:

- Haris — Skinbird
- Hamza Abdul Sattar — Zoue Tech
- Huzaifa Awan — Cortex
- Shakir Shehzad — Shakir & Associates

**None of these people said these words.** Get written sign-off from each of
them, and replace any quote they'd like worded differently, before this
section is published. Publishing invented quotes under a real person's name
and title is a reputational and legal problem, not a placeholder detail.

## Contact

- **Footer / "call us directly"** — a plain phone number (`CONTACT.phoneDisplay`
  / `CONTACT.phoneLink` in `lib/content.js`), rendered as a `tel:` link.
- **Enquiry form** ("Start the conversation") — on submit, it validates the
  fields client-side, formats them into a message, and opens
  `https://wa.me/923055684317?text=...` in a new tab so the visitor sends the
  enquiry straight to WhatsApp. There is no server involved and nothing is
  stored — the message only exists once the visitor actually hits send in
  WhatsApp.

Both numbers live in `CONTACT` in `lib/content.js` — update the number there,
not in the components.

### A note on the WhatsApp handoff

`window.open` is called synchronously inside the form's submit handler with no
`await` before it, which is required — browsers block popups that open after
any asynchronous gap. If a browser blocks it anyway (some mobile browsers are
stricter), the visitor sees an inline message pointing them at the phone
button instead.

## Three.js layer

`components/HeroCanvas.jsx` — a slow-drifting point field behind the hero,
fog-faded into the bone background so the cloud has no visible edge. Kept
deliberately quiet; the design is editorial and a showy 3D scene would fight it.

It bails out cleanly rather than degrading badly:

- `prefers-reduced-motion: reduce` → never initialises, CSS grid alone remains
- no WebGL context → returns silently, same fallback
- offscreen or hidden tab → animation loop pauses
- unmount → geometries, materials, and renderer all disposed

Loaded via `next/dynamic` with `ssr: false`, so three.js is a separate chunk and
stays out of the initial bundle.

## Accessibility notes

- Collapsed accordion panels are `inert`, keeping hidden links out of the tab order
- Testimonial rail is keyboard navigable (←/→) and auto-rotation pauses on hover and focus
- All motion is disabled under `prefers-reduced-motion`
- Focus-visible outlines on every custom control

## Deploying (Vercel)

No config file is needed — Vercel detects Next.js automatically.

**Framework Preset must be set to "Next.js"** in Project Settings → Build and
Deployment. If it's left on "Other" (Vercel's default when a repo is imported
without auto-detection kicking in), the build looks for a static `public/`
output directory and fails with "No Output Directory named public found."

```bash
npx vercel link      # first time: connect this folder to a Vercel project
npx vercel --prod     # deploy
```

No environment variables are required — there's no backend to configure.

## Known issues

- `npm audit` reports 2 moderate advisories from a transitive `postcss` inside
  Next.js. The advisory range covers every Next release through 16.x, so there
  is no version to upgrade to. Revisit when Next ships a bumped dependency.
