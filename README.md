# Montegritty

Marketing site for Montegritty — **voice AI for Pakistani operations**.

We build voice agents that make and take phone calls in Urdu, Pashto and
Sindhi, the custom speech models underneath them, and the automation that wires
them into a client's existing systems. We do **not** sell ERP rollouts, CRM
implementations, websites, or ad campaigns — the site was repositioned away
from that. If you are editing copy, read the positioning note at the top of
`lib/content.js` first.

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
  layout.js                    fonts, metadata, <html> shell
  globals.css                  the entire design system
  page.js                      home — introduces and routes, does not contain the site
  solutions/                   the three pillars in full
  industries/                  where voice agents earn their keep
  process/                     how an engagement runs + pilot terms
  contact/                     enquiry form
  voice-agents/                demo index
    [slug]/                    one page per demo agent
    dashboard/                 Urdu operations dashboard
components/                    one file per section, shared across routes
lib/content.js                 ALL site copy — edit here, not in components
lib/agents.js                  GENERATED demo agents — see tools/voice-agents/
lib/dashboard.js               sample data for the Urdu dashboard
legacy/index.html              the original single-file site
```

## Information architecture

The home page **introduces and routes**; it does not contain everything. Each
section there is a teaser that links to the page which holds the full version:

| Home section | Links to |
| ------------ | -------- |
| Pillars (3 cards) | `/solutions` — the full accordion, 14 services |
| Featured agents (4 of 8) | `/voice-agents` — all eight + the dashboard |
| Why voice | (self-contained, sourced) |
| Your agent is not on this page | `/contact` |

`/industries` and `/process` are reachable from the nav and footer. Adding a
section to the home page is almost always the wrong move — give it a route.

Copy lives in `lib/content.js` on purpose. Changing a service name, a
testimonial, or the phone/WhatsApp number means editing one object, not
hunting through JSX.

## Positioning — read before touching copy

Montegritty builds and runs voice agents for Pakistani organisations, **led by
healthcare**. Three claims separate this from a self-serve builder, and every
page should reinforce at least one:

1. **Proof.** Our agents have real recorded calls you can listen to. A gallery of
   templates nobody has deployed is not proof — it is the thing competitors have.
2. **Engine-agnostic.** Uplift AI is primary for Urdu because it is the best
   available; ElevenLabs, Vapi and open-source are used where they win, and
   self-hosted open-source where data cannot leave. A product welded to one
   vendor inherits that vendor's roadmap and outages. This is the claim a
   Bayan-style competitor structurally cannot make.
3. **We run it.** Built, wired into your systems, accountable for one number. A
   shareable link is not a deployment.

**Urdu-first and multilingual. Do not claim Pashto as production-ready** — it is
not, and a buyer disproves it on their first call. `LANGUAGES` in
`lib/content.js` states each language at its real status; keep it that way.

### Sectors

Healthcare (lead), education, front desk — `lib/verticals.js`, rendered by
`components/VerticalPage.jsx`. Banking and telecom are **deliberately absent**:
both are already crowded with BPO vendors and we add nothing there.

### Information architecture

```
/                 the whole story, in order, each section linking out
/healthcare       lead vertical
/education        /front-desk
/agents           8 recorded calls + 52 listenable templates
/agents/[slug]    one agent, full call + transcript
/how-it-works     pilot terms, engines, languages, FAQ
/contact
/voice-agents/dashboard   the reporting demo
```

There is **no sign-in, no client accounts and no live-call surface** on this
site. Visitors listen; they do not create. `/admin/capture` is an internal
debugging tool gated behind `CAPTURE_TOOL=on` and 404s otherwise.

### Template avatars

Faces make the catalogue read as a cast rather than a config list — the one
thing worth borrowing from Bayan. Generated at build time from DiceBear
(open source), so there is no runtime request and no layout shift:

```bash
node tools/avatars.mjs
```

## Voice agent demos

Eight working Urdu voice agents live at `/voice-agents`, each with its own page
(`/voice-agents/<id>`) carrying a full recorded call and a bilingual transcript.
There is also an Urdu operations dashboard at `/voice-agents/dashboard`.

**Positioning is deliberate and load-bearing.** These are demonstrations of work
we have built, not a catalogue to order from — the copy in `VOICE_AGENTS`
(`lib/content.js`) and the `CustomAgentPanel` that follows every gallery both
exist to make sure nobody reads the eight as a product menu. Keep that framing
if you edit the copy.

### How it fits together

```
tools/voice-agents/
  agents.py          personas, Urdu call scripts, KPIs, pricing  ← source of truth
  translations.py    English gloss for every line, same order
  generate.py        synthesises each line via Uplift AI Orator, stitches with ffmpeg
  export_js.py       agents.py + translations.py + timings.json → lib/agents.js
  timings.json       generated: start offset of every turn
  .cache/            per-line clips, gitignored — makes a rerun incremental

public/voice/        16 finished MP3s (8 calls, 8 greetings), served statically
lib/agents.js        GENERATED — do not hand-edit
lib/dashboard.js     sample data for the Urdu dashboard
```

Each line of a call is synthesised separately — the agent in its own voice, the
caller in a second one — then stitched into a single MP3. That is what makes the
demo sound like a conversation instead of a monologue, and because each clip's
duration is known, `lib/agents.js` also carries the exact start time of every
turn. The transcript therefore seeks and highlights in sync with **no alignment
model**: `CallPlayer` just compares `currentTime` against `turn.at`.

### Agent portraits

Each agent has a portrait, shown large in the demo slider
(`components/AgentShowcase.jsx`) and as a thumbnail in its nav strip. Source
PNGs are ~1.9 MB each and are **not** committed; `tools/voice-agents/images.mjs`
converts them to WebP at two sizes into `public/agents/`, taking all eight from
about 15 MB down to 570 KB.

```bash
node tools/voice-agents/images.mjs ~/Downloads
```

Filenames are matched loosely by substring, so `dr saad.png`, `Dr Saad.PNG` and
`saad.webp` all resolve to the same agent. Anything missing is reported and
skipped — the slider falls back to a monogram panel, so a missing portrait never
renders as a broken image.

### Hovering the portrait plays the voice

The slider previews an agent's opening line when you hover their photo, after a
260 ms dwell so brushing past does not fire audio. Two separate `<audio>`
elements are used — the greeting for the hover preview, the full call for the
player — because they must never overlap.

**Browsers refuse audible playback until the visitor has interacted with the
document, and a hover does not count.** So a cold visitor's first hover is
silently rejected; the component catches that and changes the cue to "Tap to
hear the voice", and one click anywhere unlocks hover previews for the rest of
the session. This is browser policy, not something to fix. On touch devices,
where there is no hover at all, the cue says "Tap" from the start.

### Regenerating

Only needed after editing a script, a voice, or a persona:

```bash
export UPLIFT_API_KEY=sk_api_...        # never commit this
cd tools/voice-agents
python3 generate.py                     # only re-synthesises what changed
python3 export_js.py                    # refresh lib/agents.js
```

`generate.py` needs `ffmpeg` and `requests`. Audio is `MP3_22050_64` — about
600 KB for a 75-second call, which is why it is served as files rather than
inlined.

### Numbers on these pages

Market statistics (literacy, COD return rates, BPO costs) are sourced and
public. The **per-agent impact figures are modelled targets** from published
industry benchmarks, not measured results from a live deployment. The demo index
says so in `VOICE_AGENTS.disclosure` and each agent page repeats it above the
KPIs. Do not turn them into contractual guarantees before a real pilot produces
its own numbers.

### Urdu typography

Urdu is set in Noto Nastaliq Urdu (`--font-urdu`, loaded in `app/layout.js` via
`next/font`, self-hosted like the rest). A naskh fallback reads as machine
output to a Pakistani buyer, which defeats the point of the demo. The dashboard
sets `direction: rtl` on its own shell only — figures stay in Latin digits,
isolated with `unicode-bidi`, which is what Pakistani operations software
actually does.

## Services

Fourteen services under three pillars, rendered as an accordion
(`components/Services.jsx`, data in `lib/content.js`):

- **Voice Agents** — Inbound Support, Order & Delivery Confirmation, Appointment
  & Booking, Payment Reminders & Collections, Lead Qualification, Outreach & Survey
- **Voice Models** — Custom Voice Finetuning, Native Language Models, Self-Hosted
  Deployment, Cloud-Hosted Deployment
- **Automation & Integration** — Systems Integration, Workflow Automation,
  Agentic Back-Office, Operations Dashboards

Each service carries its own `href`, so a service row can link to the demo that
proves it. Footer links deep-link into a pillar (`/solutions#voice-models`) and
the accordion opens that pillar on load.

## ⚠️ Testimonials — currently not rendered

`<Testimonials />` is deliberately **absent from every page**. The data is still
in `lib/content.js` because the component works and the quotes may be salvageable,
but two things block it:

1. The quotes are **invented**, attributed to real, named people at real
   companies — Haris (Skinbird), Huzaifa Awan (Cortex), Shakir Shehzad (Shakir &
   Associates). None of them said these words. Publishing that under a real
   person's name is a legal and reputational problem, not a placeholder detail.
2. They describe ERP and data-pipeline engagements, which is **no longer what
   Montegritty sells**. Even with sign-off they would misrepresent the offer.

To bring the section back: get written sign-off on quotes about voice work, then
re-add `<Testimonials />` to `app/page.js`.

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
