# Montegritty

Marketing site for Montegritty — enterprise digital solutions.

Rebuilt from a single static `index.html` into a Next.js App Router project.
The original file is preserved untouched at [`legacy/index.html`](legacy/index.html)
for reference.

**Live:** https://montegritty.netlify.app

---

## Stack

| Layer      | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js 15 (App Router)                                    |
| UI         | React 19, plain CSS (no framework — design language is bespoke) |
| 3D         | three.js — hero point field only                           |
| Backend    | Next.js Route Handler at `/api/contact`                    |
| Fonts      | `next/font` (Fraunces, Plus Jakarta Sans, Space Mono), self-hosted |
| Hosting    | Netlify + `@netlify/plugin-nextjs`                         |

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
  page.js              section composition
  globals.css          the entire design system
  api/contact/route.js contact form backend
components/            one file per section
lib/content.js         ALL site copy — edit here, not in components
legacy/index.html      the original single-file site
```

Copy lives in `lib/content.js` on purpose. Changing a service name, a
testimonial, or the WhatsApp number means editing one object, not hunting
through JSX.

## Services

Thirteen services under three umbrellas, rendered as an accordion
(`components/Services.jsx`, data in `lib/content.js`):

- **Development** — Web Development, Application Development, ERP Implementation, CRM Implementation, Custom Software
- **AI & Machine Learning** — Agentic AI, AI Automation, Custom Model Development, Computer Vision, Custom Finetuning & Voice Models
- **Digital Marketing** — UI/UX, Social Media Management, Meta Ads

## ⚠️ Testimonials — read before going live

The five testimonials in `lib/content.js` are **draft copy that was written for
this build**. They are attributed to real, named people at real companies:

- Haris — Skinbird
- Hamza Abdul Sattar — Zoue Tech
- Huzaifa Awan — Cortex
- Atif Shehzad — Makka Groups
- Shakir Shehzad — Shakir & Associates

**None of these people said these words.** Get written sign-off from each of
them, and replace any quote they'd like worded differently, before this section
is published. Publishing invented quotes under a real person's name and title is
a reputational and legal problem, not a placeholder detail.

## Contact form

`POST /api/contact` accepts `{ name, email, company?, message, timeline? }`.

- Validates on both client and server; server is the authority.
- Strips control characters before anything reaches a log or an email header.
- Rate limited to **5 well-formed submissions per IP per minute**. Validation
  failures deliberately do *not* count, so a mistyped email can't lock a real
  visitor out.

### Email delivery

Delivery uses [Resend](https://resend.com). Set these in Netlify → Site
configuration → Environment variables (see `.env.example`):

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

**If they aren't set, the form still works** — it validates and returns success,
but only logs to the server console and tells the visitor to use WhatsApp
instead. Set them before launch, or enquiries will land nowhere anyone reads.

### Rate limiter caveat

The limiter is an in-memory `Map`. It resets on every deploy and does **not**
coordinate across serverless instances, so on Netlify the real ceiling is
5/minute *per warm instance*. It's a speed bump for casual spam, not abuse
protection. Put Upstash Redis behind it if the form starts getting hit.

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

## Deploying (Netlify)

The site is already on Netlify. `netlify.toml` pins the build command, Node 20,
the Next.js runtime plugin, and a few security headers.

The plugin is **required** — without it the `/api/contact` route handler is not
deployed as a function and the form 404s in production.

To connect this repo: Netlify → Site configuration → Build & deploy → link the
repository. Netlify reads `netlify.toml` automatically. Then add the three
environment variables above and trigger a redeploy.

## Known issues

- `npm audit` reports 2 moderate advisories from a transitive `postcss` inside
  Next.js. The advisory range covers every Next release through 16.x, so there
  is no version to upgrade to. Revisit when Next ships a bumped dependency.
