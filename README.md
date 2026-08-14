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

## Template library & voice studio

Two things beyond the recorded demos, both of which create **real, live agents**
through the Uplift AI realtime assistant API:

| Route | What it does |
| ----- | ------------ |
| `/templates` | 52 ready-made agent briefs across 12 sectors. "Deploy & talk" creates a live agent and links to it. |
| `/studio` | Describe an agent out loud; a builder agent interviews you and builds it while you talk. |
| `/agent/[id]` | Public page for any created agent — press start and talk to it. `noindex`. |

### How the studio actually works

1. The browser asks `/api/sessions` for credentials. The route creates (or reuses)
   a **builder assistant** and returns a LiveKit token via Uplift's
   `createPublicSession`, which needs no API key — that is what makes a
   talk-to-it-yourself demo possible on a marketing site.
2. The builder interviews the visitor in Urdu or English. Its instructions live
   in `BUILDER_INSTRUCTIONS` in `lib/uplift.js`.
3. When it has enough, it calls the **`create_agent` client tool**, defined in
   `components/Studio.jsx`. The handler runs in the browser and POSTs the spec
   to `/api/agents`.
4. `/api/agents` creates the agent with the **server-held** `UPLIFT_API_KEY` and
   returns an id. The page shows the shareable link.

The API key never reaches the browser. Everything under `lib/uplift.js` is
server-only and imported solely by route handlers.

### Integration logos

The strip on the home page comes from `lib/integrations.js`, generated from the
`simple-icons` package (a devDependency, so its 3,453 icons never ship):

```bash
node tools/logos.mjs
```

**Slack, Salesforce and Twilio are named in text rather than drawn.** They are
absent from simple-icons because their owners asked for them to be removed —
which is a good signal that those marks are actively policed, so we do not
redraw them.

Watch the copy in `components/Integrations.jsx`. These are routes an agent can
reach through MCP and n8n, **not sixteen finished, supported connectors**. If
that section ever starts reading like a certified integration catalogue, it is
promising something we would then have to honour. Connector documentation is
still to be written.

### If the agent talks over itself

Two symptoms travel together: the agent cuts off mid-sentence, and it appears to
answer itself. Both are the same fault — the agent's own speech reaching the
microphone, getting transcribed, and being treated as the visitor talking. The
barge-in detector hears it too, which is what truncates the sentence.

It is an echo-cancellation problem, not a model problem, so do not go looking in
the prompt. `components/VoiceRoom.jsx` guards it in three ways:

1. **The permission probe stops its own tracks.** It used to leave the stream
   open, which kept a second, unmanaged capture of the microphone alive next to
   the one LiveKit opens. Chrome cancels echo against *its* managed capture, so
   the stray one defeated it. This was the original bug.
2. **`ROOM_OPTIONS.audioCaptureDefaults`** asks explicitly for echo
   cancellation, noise suppression, auto gain and (where supported) voice
   isolation, rather than relying on browser defaults.
3. **The applied settings are read back** from the live track once connected. If
   the device reports echo cancellation off, the UI tells the visitor to use
   headphones, because at that point nothing in software will save the call.

If it recurs, check in that order: stray `getUserMedia` calls that never stop
their tracks, then whether the track actually applied `echoCancellation`, then
whether the person is on laptop speakers at high volume.

### Free-tier limit

Creating an agent costs real API credits and leaves something live, so visitors
get **5 free demo agents** (`FREE_LIMIT` in `lib/quota.js`). Template deploys and
studio builds draw on the same allowance because both create the same thing.
After that the deploy button becomes a link to `/contact`.

Tracked in an HMAC-signed httpOnly cookie, not an account — there is no login and
there should not be one just to hear a demo. **Be clear-eyed about what that
means:** the signature stops someone editing the counter (a tampered cookie is
treated as exhausted, not as zero), but clearing cookies or opening a private
window starts the count again. This is a friction gate to start a sales
conversation, not a licence check. If it ever needs to be enforceable it needs
accounts, and that is a bigger change than raising the number.

Set `QUOTA_SECRET` in production to make the signature meaningful; it falls back
to `UPLIFT_API_KEY` and then to a development constant.

### Environment variables

```bash
UPLIFT_API_KEY=sk_api_...            # required to create agents
UPLIFT_BUILDER_ASSISTANT_ID=...      # optional but recommended — see below
QUOTA_SECRET=...                     # optional — signs the free-tier counter
```

Everything degrades honestly. Without `UPLIFT_API_KEY` the site still builds,
every other page works, `/studio` explains itself and deploys return 503.

There is deliberately **no user login**. Creating an agent is rate-limited by
cookie; talking to an agent someone shared with you is open to anyone with the
link, which is the entire point of a share link.

**Pin the builder.** If `UPLIFT_BUILDER_ASSISTANT_ID` is unset, each cold start
creates a fresh builder assistant and logs its id. Copy that id into the
environment so you are not accumulating duplicates on every deploy.

### Voice policy — read before assigning any voice

`lib/voices.js` is an **allowlist**, and it is enforced in three places.

Uplift's catalogue is 82 voices and a large part of it is deliberately
theatrical: comedy aunties, street vendors, horror narrators, lovesick
teenagers, a washroom singer. Those are for entertainment work. On a business
call they are actively damaging — a customer who hears a caricature answer the
phone concludes the company is a joke. Female voices are held to the same bar:
professional registers only, no teenager, socialite, gossip or "intimate
late-night" characters.

Enforcement:

1. Every template in `lib/templates.js` uses a voice from the roster.
2. The studio builder is given only the roster to choose from (`voiceMenuText()`).
3. `POST /api/agents` runs `safeVoice()`, so an LLM that invents a voice id — or
   a hand-crafted request — silently falls back to the default rather than
   putting an unvetted voice in front of a customer.

To add a voice, put it in `VOICES` with a gender and a one-line description of
the job it suits. If you cannot describe it as "a competent adult doing a job",
it does not belong there.

Note the deliberate exception: the **caller** voices in the recorded demos
(`peer_voice` in `tools/voice-agents/agents.py`) are ordinary-person voices on
purpose. They play the customer on the other end of the line, not the agent, and
that variety is what makes the demos sound like real calls.

### Template voice samples

Every template has a preview of its opening line at `public/templates/<id>.mp3`,
so a visitor can hear the voice before deploying anything. Regenerate after
changing a greeting or a voice:

```bash
UPLIFT_API_KEY=sk_api_... node tools/voice-agents/template_samples.mjs
```

It reads `lib/templates.js` directly, so a sample can never drift from what
actually gets deployed. Existing files are skipped, so changing one greeting
costs one API call; pass `--force` to redo all 52 (about 2 MB).

### Adding a template

Add an entry to `TEMPLATES` in `lib/templates.js`. Templates are deployable, not
decorative — `voice`, `greeting` and `instructions` are passed straight to the
API. Write `instructions` the way you would brief a new hire on day one: what
they handle, the tone, what they must never do, and when to hand over. The
`demo` field links a template to one of the eight agents with a recorded call.

## Client delivery: agents, dashboards, admin

A client gets two things — a voice agent, and a dashboard reporting on it. The
dashboard reaches them two ways: a URL they sign in to, and an embed code for
their own site.

| Route | Who | What |
| ----- | --- | ---- |
| `/login` | anyone | One form. The server decides if you are an admin or a client and routes you. |
| `/admin` | admin | Create clients, assign an Uplift assistant, set their username and password, copy their URL and embed code. |
| `/c/<slug>` | that client, or an admin | Their dashboard. Requires a session. |
| `/embed/<slug>?k=…` | anyone with the key | Chrome-less version for an iframe. |
| `<slug>.montegritty.com` | — | Rewritten to `/c/<slug>` by `middleware.js`. |

### Storage — read this before deploying

`lib/store.js` picks a backend automatically:

| Backend | When | Survives redeploy |
| ------- | ---- | ----------------- |
| `supabase` | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set | **yes** |
| `kv` | `KV_REST_API_URL` + `KV_REST_API_TOKEN` set | yes |
| `file` | local development | on your machine only |
| `memory` | on Vercel with neither configured | **no** |

**Vercel's filesystem is read-only and per-invocation**, so without Supabase or
KV anything created in the admin panel is gone on the next deploy. The panel
says so in a banner rather than letting you find out later. Run `SUPABASE.sql`
once in the Supabase SQL editor to create the single table it needs.

Seeds in `lib/clients.js` are always merged underneath whatever is stored, so a
client defined in code exists even when the store is empty.

### Sign-in and passwords

Passwords are scrypt-hashed with a per-password salt — the admin's included —
and sessions are an HMAC-signed cookie, so there is no session table. A client
can only ever see their own dashboard; an admin can see any.

`ADMIN_PASSWORD` **must be set in production** or admin sign-in is refused
outright. Off production it falls back to a known default so the panel works on
a fresh clone. That asymmetry is deliberate: a default admin password on a live
deployment is an open door.

### The embed key

`/embed/<slug>` carries an unguessable key rather than requiring a session,
because an iframe on a client's own website cannot send our cookie. Serving a
wrong or missing key renders no data at all. The key is generated per client;
regenerating it revokes every embed already out there, which is the point.

Only `/embed/*` is framable (`frame-ancestors *`). Everything else sends
`X-Frame-Options: SAMEORIGIN` — see `next.config.mjs`.

### There is no server-side call data — capture it yourself

Worth knowing before designing any reporting: **Uplift exposes no call log,
transcript, analytics or webhook API.** You can create, list, get, update and
delete assistants, and you can mint sessions — that is the entire surface. Once
a call ends there is nothing to query. `roomName` cannot be looked up later.

So every number the client dashboard will ever show has to be captured live in
the room and written to our own storage.

`/admin/capture` exists to establish exactly what is capturable. It joins a real
call, attaches to every `RoomEvent` the SDK emits, timestamps each one relative
to call start, and produces a downloadable JSON log plus a summary of which
event types actually fired.

The events that carry real signal:

| Event | What you get |
| ----- | ------------ |
| `TranscriptionReceived` | text, speaker, `final`, language, start/end time — the transcript |
| `ParticipantAttributesChanged` | `lk.agent.state` → listening / thinking / speaking |
| `ActiveSpeakersChanged` | who was talking, with audio level |
| `TrackSubscribed` / `Muted` | when audio actually started and stopped |
| `ConnectionQualityChanged` | call quality |
| `Disconnected` | end reason |

Duration, turn counts, words per side, languages used, interruptions and
outcome-by-keyword are all derivable from those. Anything **not** in a capture
log cannot appear on a dashboard without being invented — which is the trap this
page is here to avoid.

### Metrics are seeded, and are not admin-owned

`client.metrics` is sample data and every dashboard says so on screen.

**`saveClient` deliberately strips `metrics` before writing, and `listClients`
always resolves it from the seed.** Without that, saving a client through the
admin panel captured whatever shape `metrics` had that day, and the stale copy
then beat the seed forever — which is exactly what happened once: the dashboard
silently rendered with no KPIs and no chart after an unrelated edit.

Real telemetry belongs in its own Supabase table, not in the client record.

### Watch out for bare element selectors

`app/globals.css` is shared by the marketing site and the client dashboard, and
three rules have already leaked across that boundary:

- `header {}` — pinned the dashboard's own `<header>` to the viewport.
- `footer {}` — same hazard.
- `section:not(.hero) { padding: 130px 0 }` — put 130px of padding on every
  dashboard card, because those are `<section>` elements too.

All three are now scoped (`.site-header`, `.site-footer`,
`main > section:not(.hero)`). Add new global rules by class, not by element.

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
