// Single source of truth for site copy. Edit here, not in components.
//
// POSITIONING — read before editing anything below.
//
// Montegritty is a voice AI company. We build agents that make and take phone
// calls in Pakistani languages, the models underneath them, and the automation
// that makes them useful once they are answering. We do not sell ERP rollouts,
// CRM implementations, websites, or ad campaigns; we integrate with those
// systems when a voice agent needs to read or write them, which is a different
// claim and should stay worded that way.
//
// The eight agents in lib/agents.js are demonstrations of our work, never a
// menu to order from. Keep that framing.

export const CONTACT = {
  // One number, used everywhere — calls and WhatsApp both.
  phoneDisplay: "0313 0760309",
  // tel: needs international format so the link works from outside Pakistan
  phoneLink: "tel:+923130760309",
  // wa.me requires full international format, no plus, no spaces (92 =
  // Pakistan). The enquiry form appends ?text=... per submission; this is
  // the bare base link.
  whatsappDisplay: "0313 0760309",
  whatsappLink: "https://wa.me/923130760309",
  hours: "Open 24/7 · Mon–Sun",
};

export const NAV = [
  { href: "/solutions", label: "Solutions" },
  { href: "/voice-agents", label: "Demos" },
  { href: "/industries", label: "Industries" },
  { href: "/process", label: "Process" },
];

export const HERO = {
  eyebrow: "Voice AI, built for Pakistan",
  lines: ["The voice that", "answers your phone"],
  lastLine: "when nobody ",
  lastLineEm: "can.",
  lede:
    "Montegritty builds voice agents that hold real conversations in Urdu, Pashto and Sindhi — taking the calls your team cannot get to, making the ones nobody has time for, and writing every outcome back into the systems you already run.",
  primary: { href: "/voice-agents", label: "Hear a real call" },
  secondary: { href: "/solutions", label: "What we build" },
  statBig: "8",
  statLabel: "agents you can hear right now",
};

export const MARQUEE = [
  "Urdu Voice Agents",
  "Inbound Call Handling",
  "Outbound Campaigns",
  "Custom Voice Models",
  "Pashto & Sindhi",
  "Workflow Automation",
  "Self-Hosted Deployment",
  "Operations Dashboards",
];

/**
 * The three pillars. Rendered as an accordion by components/Services.jsx.
 * Every service carries its own href so the accordion never has to guess.
 */
export const UMBRELLAS = [
  {
    id: "voice-agents",
    num: "01",
    name: "Voice Agents",
    lead: "Agents that make and take calls, in the language your customers actually speak.",
    services: [
      {
        name: "Inbound Support Agents",
        desc: "Answer every call on the first ring — outage checks, order status, balances, FAQs — and hand the rest to a human with the transcript attached.",
        href: "/voice-agents/hassan-support",
      },
      {
        name: "Order & Delivery Confirmation",
        desc: "Verify cash-on-delivery orders before dispatch, catch fake numbers and hoax orders, and stop paying two-way freight on sales that were never real.",
        href: "/voice-agents/bilal-cod",
      },
      {
        name: "Appointment & Booking Agents",
        desc: "Confirm, remind and reschedule against live calendar availability, then back-fill the cancelled slot from the waitlist automatically.",
        href: "/voice-agents/ayesha-clinic",
      },
      {
        name: "Payment Reminders & Collections",
        desc: "Call the whole book on schedule — pre-due, due, and graduated follow-up — offering digital payment rails, with every call recorded for audit.",
        href: "/voice-agents/fatima-collections",
      },
      {
        name: "Lead Qualification Agents",
        desc: "Dial inbound leads within a minute of the form submission, qualify on budget, timeline and intent, and book only the serious ones into a calendar.",
        href: "/voice-agents/kamran-leads",
      },
      {
        name: "Outreach & Survey Agents",
        desc: "Reach households that SMS campaigns miss, answer objections conversationally, and return structured data instead of a delivery receipt.",
        href: "/voice-agents/zainab-outreach",
      },
    ],
  },
  {
    id: "voice-models",
    num: "02",
    name: "Voice Models",
    lead: "The speech layer underneath the agent — finetuned on your data, deployed where you need it.",
    services: [
      {
        name: "Custom Voice Finetuning",
        desc: "Speech-to-text and text-to-speech trained on your domain vocabulary, brand tone and compliance requirements — not a shared third-party API.",
        href: "/solutions#voice-models",
      },
      {
        name: "Native Language Models",
        desc: "Urdu, Pashto and Sindhi built on native-speaker data, including the code-mixing every Pakistani caller actually uses mid-sentence.",
        href: "/solutions#voice-models",
      },
      {
        name: "Self-Hosted Deployment",
        desc: "Runs inside your own infrastructure or private cloud. Voice data never leaves your environment, and there is no per-request bill at volume.",
        href: "/solutions#voice-models",
      },
      {
        name: "Cloud-Hosted Deployment",
        desc: "Managed on Montegritty infrastructure, scaling automatically with demand — the fastest path from a finetuned model to production traffic.",
        href: "/solutions#voice-models",
      },
    ],
  },
  {
    id: "automation",
    num: "03",
    name: "Automation & Integration",
    lead: "The work that turns an agent from a recording into part of your operation.",
    services: [
      {
        name: "Systems Integration",
        desc: "Wire the agent into the systems that hold the answers — CRM, ERP, order feeds, billing, HMS — so it reads live data and writes outcomes back.",
        href: "/contact",
      },
      {
        name: "Workflow Automation",
        desc: "Automate what happens after the call: tickets raised, dispatches booked, records updated, exceptions escalated to the right person.",
        href: "/contact",
      },
      {
        name: "Agentic Back-Office",
        desc: "Agents that reason and act across your tools for the intake, triage and follow-up work that currently eats a person's week — with a full audit trail.",
        href: "/contact",
      },
      {
        name: "Operations Dashboards",
        desc: "Live reporting built from the agent's own transcripts and outcomes, in English or Urdu, so the system answering the phone is the system reporting on it.",
        href: "/voice-agents/dashboard",
      },
    ],
  },
];

export const SOLUTIONS_PAGE = {
  eyebrow: "What we build",
  heading: ["Three things, and we do them ", "properly"],
  lede:
    "We are not a general software shop. Everything below exists because a voice agent needs it to work in production: the agent itself, the speech models underneath it, and the plumbing that connects it to the systems already running your business.",
};

/**
 * The market case. Every figure here is public and sourced — the links are
 * rendered beneath the band. Do not add a statistic without a source.
 */
export const WHY_VOICE = {
  eyebrow: "Why voice, and why here",
  heading: ["Pakistan runs on ", "voice", ", not text"],
  lede:
    "This is not a bet on a trend. It is arithmetic about a country where almost everyone can answer a phone and a third of adults cannot read the message you sent them instead.",
  stats: [
    {
      value: "37%",
      body: "of Pakistani adults cannot read an SMS. Literacy sits at 63% — and 44% among rural women.",
    },
    {
      value: "82.6%",
      body: "mobile penetration, with 161m broadband subscriptions. Almost everyone can take a call.",
    },
    {
      value: "PKR 60k+",
      body: "the monthly cost of a single support seat, against turnover that runs above 40% a year.",
    },
    {
      value: "80%+",
      body: "of online orders are cash on delivery, and roughly one parcel in five comes back undelivered.",
    },
  ],
  close:
    "Every call these agents make is already being made today — badly, expensively, and only to a fraction of the list. That makes this a cost-and-coverage argument rather than a new-behaviour one, which is the easier case to win.",
  sources: [
    {
      label: "Economic Survey 2025-26 literacy figures (Dawn)",
      href: "https://www.dawn.com/news/2007104",
    },
    {
      label: "Digital 2026: Pakistan (DataReportal)",
      href: "https://datareportal.com/reports/digital-2026-pakistan",
    },
    {
      label: "Call centre costs in Pakistan (PrimeBPO)",
      href: "https://www.primebpo.com/blog/call-center-in-pakistan",
    },
    {
      label: "Reducing COD returns (DHL Pakistan)",
      href: "https://www.dhl.com/discover/en-pk/e-commerce-advice/e-commerce-best-practice/subscription-marketing/how-pakistani-e-commerce-sellers-can-reduce-cod-returns",
    },
  ],
};

/**
 * TESTIMONIALS — NOT RENDERED ANYWHERE. Kept for when they can be used honestly.
 *
 * Two problems, both blocking:
 *   1. These are invented quotes attributed to real, named people at real
 *      companies. Nobody said these words. That needs written sign-off.
 *   2. They describe ERP and data-pipeline work, which is no longer what
 *      Montegritty sells — so even with sign-off they would misrepresent the
 *      offer and would need rewriting around voice engagements.
 *
 * To bring the section back: get sign-off on quotes about voice work, then
 * re-add <Testimonials /> to the home page composition.
 */
export const TESTIMONIALS = [
  {
    company: "Skinbird",
    name: "Haris",
    role: "Chief Executive Officer",
    initials: "H",
    quote:
      "We came to Montegritty with orders living in three different places and no one able to say what stock we actually had. They spent the first two weeks just watching how we worked before proposing anything — that patience is why the system fit on day one instead of day ninety. Our fulfilment time dropped by more than half and I stopped spending my evenings reconciling spreadsheets.",
  },
  {
    company: "Cortex",
    name: "Huzaifa Awan",
    role: "Founder",
    initials: "HA",
    quote:
      "The agentic layer they built now handles the intake work that used to eat two full days a week. What convinced me was that they insisted on auditability from the start — every action the system takes is traceable. That mattered more to us than raw speed, and they understood it without being told twice.",
  },
  {
    company: "Shakir & Associates",
    name: "Shakir Shehzad",
    role: "Principal",
    initials: "SS",
    quote:
      "In our practice a data mistake is a liability issue, not an inconvenience. Montegritty treated our compliance constraints as the starting requirement rather than something to work around later. The result is a client system my team trusts, and that trust is the whole point.",
  },
];

export const VOICE_MODELS = {
  lede:
    "Most “AI voice” offerings are a thin wrapper around a generic third-party API — same voice, same limitations, same bill regardless of what you actually need. Montegritty finetunes both speech-to-text and text-to-speech models on your own data — domain vocabulary, brand tone, and compliance requirements — then deploys them the way your operation actually requires.",
  deployment: [
    {
      name: "Self-Hosted",
      best: "Regulated & high-volume operations",
      points: [
        "Deployed inside your own infrastructure or private cloud",
        "Voice data never leaves your environment — full data sovereignty",
        "No per-request API costs at scale",
        "Fits healthcare, financial services, and other compliance-bound operations",
      ],
    },
    {
      name: "Cloud-Hosted",
      best: "Speed & variable demand",
      points: [
        "Deployed and managed on Montegritty-operated infrastructure",
        "Fastest path from finetuned model to production",
        "Scales automatically with demand, maintained by us",
        "Predictable, usage-based cost with no infrastructure to own",
      ],
    },
  ],
  languages: [
    {
      name: "Urdu",
      sub: "Native script & Roman Urdu",
      body: "Transcription tuned for natural, everyday spoken Urdu. Speech output with correct pronunciation and cadence — not a robotic accent.",
    },
    {
      name: "Pashto",
      sub: "Pakistani & Afghan dialects",
      body: "Built on native-speaker data and tuned for regional dialects — the same model quality as our Urdu and English agents, not an afterthought.",
    },
    {
      name: "English",
      sub: "Full support, any accent profile",
      body: "Full-featured alongside native languages, so one agent can serve multiple markets and language groups at once.",
    },
  ],
  languageNote:
    "Additional regional and native languages are available on a per-engagement basis — tell us the languages your customers actually use.",
  faq: [
    {
      q: "Can voice agents be deployed on our own infrastructure?",
      a: "Yes. Montegritty voice models can be deployed self-hosted on your own infrastructure or private cloud, so voice data never leaves your environment — or cloud-hosted on Montegritty-operated infrastructure for the fastest path to production.",
    },
    {
      q: "Do you support Urdu and Pashto voice AI?",
      a: "Yes. Montegritty finetunes both speech-to-text and text-to-speech models directly on native-speaker data for Urdu and Pashto, alongside English, so the agent speaks and listens the way your customers actually do — not a machine-translated approximation.",
    },
    {
      q: "Is this a generic voice API, or a custom model?",
      a: "Every Montegritty voice model is custom-finetuned on your own domain vocabulary, brand tone, and compliance requirements — not a shared third-party API used by every other business.",
    },
    {
      q: "Can an agent handle Urdu and English in the same sentence?",
      a: "Yes. Code-mixing is how Pakistanis actually speak on the phone, so the models are trained on it directly rather than treating it as an error to recover from.",
    },
    {
      q: "What happens when the agent cannot handle a call?",
      a: "It transfers to a human and passes the full transcript and context with the call, so the person picking up does not start the conversation from zero. Which calls escalate is a rule you set, not a limitation you discover.",
    },
  ],
};

export const PROCESS = [
  {
    phase: "PHASE 01",
    title: "Listen",
    body: "We sit with the calls you already make — recordings, scripts, the reasons people ring — and pick the one where an agent moves a number you care about.",
  },
  {
    phase: "PHASE 02",
    title: "Script",
    body: "We write the conversation with the people who currently have it, choose the voice, and agree what the agent must never say or decide on its own.",
  },
  {
    phase: "PHASE 03",
    title: "Wire",
    body: "The agent is connected to the systems holding the answers, then run against real traffic in a limited pilot with a human always one transfer away.",
  },
  {
    phase: "PHASE 04",
    title: "Prove",
    body: "We measure against the number we agreed at the start. If it moves, we scale the volume. If it does not, we change the agent or tell you plainly.",
  },
];

export const PROCESS_PAGE = {
  eyebrow: "How we work",
  heading: ["Start with one call, ", "not a platform"],
  lede:
    "Nobody should buy a voice programme off a slide deck. Every engagement starts as a narrow pilot on a single call type, measured against a number agreed before we build anything.",
  pilot: {
    title: "What a pilot looks like",
    points: [
      "One call type, one department, roughly six weeks",
      "A single success metric agreed up front — return rate, no-show rate, collection efficiency, calls deflected",
      "A human always one transfer away, from the first call to the last",
      "Full recordings and transcripts, so you audit the agent rather than trust it",
      "You keep the scripts and the call data whether or not we continue",
    ],
  },
  faq: [
    {
      q: "How long before an agent is taking real calls?",
      a: "A pilot on a single call type typically reaches live traffic in four to six weeks, most of which is integration work rather than the agent itself.",
    },
    {
      q: "What do you need from us to start?",
      a: "Recordings or a written version of the call as it happens today, access to whichever system holds the answers, and one person who knows the process well enough to argue with the script.",
    },
    {
      q: "Who owns the scripts and the call data?",
      a: "You do, throughout. On a self-hosted deployment the voice data never reaches us at all.",
    },
    {
      q: "What if it does not work?",
      a: "The pilot is scoped so that answer arrives in weeks rather than quarters, and we say so plainly. That is the point of agreeing a number before building anything.",
    },
  ],
};

export const VERTICALS = [
  {
    idx: "01",
    title: "Telecom & Internet Providers",
    body: "Tier-1 queues are the same five questions asked ten thousand times a day: is there an outage, what is my bill, why is my router blinking. An agent answers all of them on the first ring, checks live outage and billing systems before it speaks, and escalates only what genuinely needs a person — which is where your expensive agents should have been all along.",
    tags: ["Inbound Support", "Systems Integration"],
  },
  {
    idx: "02",
    title: "Healthcare & Diagnostics",
    body: "Between a fifth and two fifths of outpatient appointments are no-shows, and every empty slot is a consultant hour billed to nobody. Agents confirm the day before in spoken Urdu, reschedule on the spot against live availability, deliver fasting and document instructions, and reach the patients who were never going to read an SMS.",
    tags: ["Appointments", "Patient Outreach"],
  },
  {
    idx: "03",
    title: "E-Commerce & Logistics",
    body: "Cash on delivery is most of the market and return-to-origin is the tax on it. Agents call every order within minutes of checkout, read it back, confirm the address and that cash will be ready, and stop hoax orders before they enter the courier network — where each one costs two-way freight and locked-up stock.",
    tags: ["Order Confirmation", "Delivery Coordination"],
  },
  {
    idx: "04",
    title: "Banking & Microfinance",
    body: "Collection efficiency decides whether a lending book works, but field officers cover a handful of borrowers a day and aggressive third-party collectors create regulatory risk. Agents call the entire portfolio on schedule, offer digital payment rails, capture promise-to-pay dates, and record every conversation for audit.",
    tags: ["Reminders & Collections", "Compliance Recording"],
  },
  {
    idx: "05",
    title: "Education Networks",
    body: "Campuses lose weeks of admin time chasing parents over absences and unpaid fees, and printed circulars sent home in schoolbags never arrive. Agents call the same evening a child is absent, log the reason, fold in fee reminders and meeting invitations, and write every response straight back into the school system.",
    tags: ["Parent Engagement", "Workflow Automation"],
  },
  {
    idx: "06",
    title: "Government, Donors & NGOs",
    body: "Immunisation drives and cash-transfer enrolment are pushed over SMS and posters, both of which fail the third of adults who cannot read and the rural women hardest to reach. Agents call in warm, regionally-accented Urdu, answer the rumours directly, name the date and the nearest camp, and report structured coverage data back.",
    tags: ["Public Outreach", "Field Data Capture"],
  },
];

// Sectors we take work in, but that don't yet warrant a full card.
export const VERTICALS_ALSO = [
  "Real Estate & Property",
  "Insurance & Takaful",
  "Automotive Sales",
  "Utilities & Billing",
  "Travel & Hospitality",
];

/**
 * VOICE AGENT DEMOS
 *
 * The positioning here is load-bearing: the eight agents are our work, shown as
 * proof, not a catalogue. Every line should reinforce that we build the agent
 * around the client's operation — the demos exist to show the standard.
 *
 * The agents themselves (personas, transcripts, audio, pricing) live in
 * lib/agents.js, which is generated — see tools/voice-agents/.
 */
export const VOICE_AGENTS = {
  eyebrow: "Built, not mocked up",
  heading: ["Eight voice agents we have ", "already built"],
  lede:
    "Every voice on this page is a working Montegritty agent handling a real call, synthesised end to end — not a stock recording, not a script someone read aloud. We built these eight to show what the stack does in Urdu, across the industries that ask us for it most.",
  sub:
    "None of them is a product you buy off a shelf. They are demonstrations. What we build for you is shaped around your operation — your scripts, your systems, your customers' language, and a voice chosen to sound like someone who already works for you.",

  customEyebrow: "What we build for you",
  customHeading: ["Your agent is ", "not on this page"],
  customLede:
    "These eight demos took a brief, a script, and an integration list. Yours starts the same way. We map the call your team is drowning in, write the script with the people who currently make it, wire the agent into the systems that hold the answers, and stay accountable for the number it was hired to move.",
  customCards: [
    {
      title: "Your voice, not ours",
      body:
        "Pick from the Pakistani voice library, or we finetune a model on your own recordings so the agent sounds like your brand — Urdu, Pashto, Sindhi, English, or a caller who switches between them mid-sentence.",
    },
    {
      title: "Wired into your systems",
      body:
        "An agent that cannot see your data is a recording. Ours read live from your ERP, CRM, order feed or billing stack, so what the caller hears is what the system actually says — and every outcome is written straight back.",
    },
    {
      title: "Self-hosted if you need it",
      body:
        "Regulated operations keep voice data inside their own infrastructure, on their own hardware, with no per-request API bill. Everything else runs cloud-hosted on ours for the fastest path to production.",
    },
  ],
  customCta: "Tell us the call you're drowning in",

  // Shown once on the demo index — honesty about what the numbers are.
  disclosure:
    "Market figures cited on these pages are sourced and public. The per-agent impact figures are modelled targets built from published industry benchmarks — treat them as pilot success criteria to be proven on your data, not as guarantees.",

  dashboardTeaser: {
    title: "Live operations dashboard",
    body:
      "Every call an agent handles is transcribed, scored and written back — so the same system that answers the phone is also the system that tells you what is happening on it. Here is that dashboard, in Urdu, with sample data.",
    cta: "Open the dashboard",
  },
};

export const FOOTER = {
  blurb:
    "Voice AI for Pakistani operations — agents that take the call, models that speak the language, and the automation that connects them to the systems you already run.",
  columns: [
    {
      title: "Solutions",
      links: [
        { href: "/solutions#voice-agents", label: "Voice Agents" },
        { href: "/solutions#voice-models", label: "Voice Models" },
        { href: "/solutions#automation", label: "Automation & Integration" },
        { href: "/industries", label: "Industries" },
      ],
    },
    {
      title: "See it work",
      links: [
        { href: "/voice-agents", label: "Agent demos" },
        { href: "/voice-agents/dashboard", label: "Operations dashboard" },
        { href: "/process", label: "How we work" },
        { href: "/contact", label: "Start a project" },
      ],
    },
  ],
};

export const CONTACT_PAGE = {
  eyebrow: "Start a project",
  heading: ["Tell us the call your team is ", "drowning in"],
  lede:
    "One call type, one department, one number to move. That is how every engagement starts — and the fastest way to find out whether a voice agent is worth your money is to scope a pilot on the call you already hate making.",
};
