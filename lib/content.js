// Single source of truth for site copy. Edit here, not in components.
//
// POSITIONING — read before editing anything below.
//
// Montegritty builds Pakistan's first Urdu-first AGENTIC voice agents. The word
// that matters is agentic. Every page must reinforce these four, in this order:
//
//   1. IT ACTS. The agent does the work — checks availability, books, confirms,
//      updates the record — while the caller is still on the line. A chatbot
//      with a voice ends a call with a promise; an agent ends it with your
//      system changed. This is the whole pitch. Never bury it.
//   2. URDU-FIRST. Built on native Urdu speech, including Urdu-English
//      code-mixing. Not an English agent with translation bolted on.
//   3. INTEGRATED. It reaches your booking system, ERP, CRM or order feed live
//      during the call, through MCP and n8n.
//   4. PROOF. Eight real recorded calls you can listen to. A template gallery
//      nobody has deployed is not proof.
//
// WRITING RULES. Short sentences. One idea per paragraph. If a paragraph runs
// past three lines on a phone, cut it — the site was rewritten once already
// because nobody could read it. Do NOT claim Pashto as production-ready; a
// buyer disproves that in one phone call.

export const CONTACT = {
  phoneDisplay: "0313 0760309",
  phoneLink: "tel:+923130760309",
  whatsappDisplay: "0313 0760309",
  whatsappLink: "https://wa.me/923130760309",
  hours: "Open 24/7 · Mon–Sun",
};

export const NAV = [
  { href: "/healthcare", label: "Healthcare" },
  { href: "/education", label: "Education" },
  { href: "/front-desk", label: "Front Desk" },
  { href: "/agents", label: "Hear the agents" },
  { href: "/how-it-works", label: "How it works" },
];

export const HERO = {
  eyebrow: "Pakistan's first Urdu-first agentic voice AI",
  lines: ["Most voice AI", "only talks."],
  lastLine: "Ours ",
  lastLineEm: "does the work.",
  lede:
    "Our agents speak Urdu first — then act on it. They check live availability, book the slot, confirm the order and write the outcome into your system, while the caller is still on the line.",
  primary: { href: "/agents", label: "Hear a real call" },
  secondary: { href: "/how-it-works", label: "See how it connects" },
  statBig: "8",
  statLabel: "agents you can listen to right now",
};

// Actions, not topics. The marquee is the fastest place a visitor reads what
// "agentic" actually means, so every item is a verb the agent performs.
export const MARQUEE = [
  "Books the appointment",
  "Confirms the order",
  "Updates your CRM",
  "Checks live availability",
  "Logs the outcome",
  "Writes back to your ERP",
  "Escalates to a human",
  "Speaks Urdu first",
];

/**
 * The three claims that separate an agent from a talking demo. Sits directly
 * under the hero — a visitor should understand "agentic" inside one screen.
 */
export const EDGE = {
  eyebrow: "Agentic, not conversational",
  heading: ["Anyone can generate a voice. ", "Almost nobody makes it act."],
  lede:
    "A chatbot with a voice ends the call with a promise. An agent ends it with your system already updated.",
  points: [
    {
      n: "01",
      title: "It does the work, not just the talking",
      body:
        "Checks availability, books, reschedules, confirms, logs the outcome. Every call ends with a record changed — not a note for someone to action on Monday.",
      href: "/how-it-works",
      cta: "See what it does",
    },
    {
      n: "02",
      title: "Urdu-first, not Urdu-translated",
      body:
        "Built on native Urdu speech, including the Urdu-English code-mixing real callers use. Not an English agent with a translation layer bolted on.",
      href: "/agents",
      cta: "Hear it in Urdu",
    },
    {
      n: "03",
      title: "Wired into what you already run",
      body:
        "Your booking system, ERP, CRM or order feed — reached live during the call. An agent that cannot read your systems is only a recording.",
      href: "/how-it-works#integrations",
      cta: "See the connections",
    },
  ],
};

/**
 * Engine independence. Keep it factual: name what each engine is actually for.
 * A competitor welded to one vendor inherits that vendor's roadmap.
 */
export const ENGINES = {
  eyebrow: "The engine layer",
  heading: ["One agent. ", "Whichever engine suits it."],
  lede:
    "Voice AI is three swappable parts: speech in, reasoning, speech out. We pick each per project rather than taking whatever one vendor offers.",
  items: [
    {
      name: "Uplift AI",
      role: "Primary — Urdu & regional",
      body: "The best Urdu speech on the market, built in Pakistan on native-speaker data. Our default for any Pakistani caller.",
      status: "In production",
    },
    {
      name: "ElevenLabs",
      role: "English & multilingual",
      body: "For English-speaking and international callers, where naturalness across accents matters most.",
      status: "In production",
    },
    {
      name: "Vapi",
      role: "Telephony orchestration",
      body: "Call routing, SIP and number provisioning when an agent answers a real phone line.",
      status: "Available",
    },
    {
      name: "Open-source, self-hosted",
      role: "When data cannot leave",
      body: "Whisper and open speech models on your own hardware. No third party receives a recording. No per-request bill.",
      status: "On request",
    },
  ],
  note:
    "The engine is chosen with you and can be changed later. Nothing about the agent is rewritten when it changes.",
};

/**
 * Language honesty. Urdu is production. Everything else carries its real
 * status — a buyer tests this on the first call, so overclaiming costs more
 * than it buys.
 */
export const LANGUAGES = {
  eyebrow: "Languages",
  heading: ["Urdu first. ", "Honestly labelled."],
  lede:
    "Every competitor publishes a language roadmap. Here is ours with the status attached.",
  rows: [
    { name: "Urdu", status: "In production", note: "Native script and Roman Urdu." },
    { name: "English", status: "In production", note: "One agent serves both, on one number." },
    { name: "Urdu + English mixed", status: "In production", note: "How Pakistani business calls are actually conducted — handled as one language, not a failure case." },
    { name: "Pashto, Punjabi, Sindhi", status: "On request", note: "Where a project justifies the tuning work. We tell you what quality to expect first." },
  ],
};

/**
 * VERTICALS — three, with weight. Healthcare leads: that is where the live
 * institutional work is and where the literacy gap bites hardest. Banking and
 * telecom are deliberately absent — already crowded with BPO vendors.
 */
export const VERTICALS = [
  {
    slug: "healthcare",
    idx: "01",
    title: "Healthcare",
    lead: "Clinics, hospitals, labs and diagnostics",
    short: "Confirms the appointment, reschedules against live availability, and updates the record.",
    body:
      "Up to two in five outpatient appointments are no-shows, and every empty slot is a consultant hour billed to nobody. The agent calls, confirms in Urdu, rebooks against live availability and back-fills the slot.",
    tags: ["Appointments", "Patient intake", "Follow-up"],
  },
  {
    slug: "education",
    idx: "02",
    title: "Education",
    lead: "Schools, colleges and training networks",
    short: "Logs the absence, folds in the fee reminder, writes both into your school system.",
    body:
      "Campuses lose weeks chasing parents over absences and unpaid fees, and circulars sent home in schoolbags never arrive. The agent calls the same evening and records the answer where the office can see it.",
    tags: ["Admissions", "Fees", "Attendance"],
  },
  {
    slug: "front-desk",
    idx: "03",
    title: "Front desk",
    lead: "The businesses that live on the phone",
    short: "Confirms the order, qualifies the lead, books the slot — then writes it to your CRM.",
    body:
      "Cash on delivery is most of Pakistani e-commerce and return-to-origin is the tax on it. Property leads go cold in an afternoon. All the same shape: high-volume, repetitive calls a person is too expensive to keep answering.",
    tags: ["Order confirmation", "Bookings", "Lead qualification"],
  },
];

export const VERTICALS_ALSO = [
  "Microfinance & lending",
  "Insurance & takaful",
  "Government & NGO outreach",
  "Logistics & field operations",
];

/**
 * The market case. Every figure is public and sourced — the links render
 * beneath the band. Do not add a statistic without a source.
 */
export const WHY_VOICE = {
  eyebrow: "Why voice, and why here",
  heading: ["Pakistan runs on ", "voice", ", not text"],
  lede:
    "Almost everyone in Pakistan answers a phone. Four in ten adults cannot comfortably read the message you sent instead.",
  stats: [
    { value: "60.7%", body: "national literacy. Female literacy is 52.8%." },
    { value: "82.6%", body: "mobile penetration. Connectivity has outrun literacy." },
    { value: "37.8%", body: "annual growth in healthcare voice AI globally." },
    { value: "80%+", body: "of Pakistani online orders are cash on delivery." },
  ],
  close:
    "Every call these agents make is already being made today — badly, expensively, and only to a fraction of the list.",
  sources: [
    { label: "Pakistan Bureau of Statistics, 2023 census", href: "https://www.dawn.com/news/2007104" },
    { label: "Digital 2026: Pakistan (DataReportal)", href: "https://datareportal.com/reports/digital-2026-pakistan" },
    { label: "Healthcare voice AI market (Grand View Research)", href: "https://www.grandviewresearch.com/industry-analysis/voice-ai-agents-healthcare-market-report" },
    { label: "Reducing COD returns (DHL Pakistan)", href: "https://www.dhl.com/discover/en-pk/e-commerce-advice/e-commerce-best-practice/subscription-marketing/how-pakistani-e-commerce-sellers-can-reduce-cod-returns" },
  ],
};

export const PROCESS = [
  { phase: "PHASE 01", title: "Listen", body: "We sit with the calls you already make and pick the one where an agent moves a number you care about." },
  { phase: "PHASE 02", title: "Script", body: "We write the conversation with the people who currently have it, and agree what the agent must never say or decide alone." },
  { phase: "PHASE 03", title: "Wire", body: "The agent is connected to the systems holding the answers, then run on real traffic with a human one transfer away." },
  { phase: "PHASE 04", title: "Prove", body: "We measure against the number agreed at the start. If it moves, we scale. If it does not, we say so." },
];

export const PROCESS_PAGE = {
  eyebrow: "How it works",
  heading: ["Start with one call, ", "not a platform"],
  lede:
    "Every engagement starts as a narrow pilot on a single call type, measured against a number agreed before anything is built.",
  pilot: {
    title: "What a pilot looks like",
    points: [
      "One call type, one department, roughly six weeks",
      "One success metric agreed up front — no-shows, collections, returns, calls answered",
      "A human always one transfer away",
      "Full recordings and transcripts, so you audit the agent rather than trust it",
      "You keep the scripts and the call data either way",
    ],
  },
  faq: [
    { q: "What makes an agent 'agentic' rather than a voice bot?", a: "A voice bot talks and then hands you a transcript. An agentic voice agent takes actions during the call — it reads live availability, books or cancels the slot, confirms the order and writes the outcome back into your system before the caller hangs up." },
    { q: "What systems can a voice agent connect to?", a: "Anything with an API. We connect through MCP and n8n, which covers hospital and school management systems, Shopify and WooCommerce order feeds, HubSpot, Zoho, Odoo, Google Calendar and WhatsApp. Tell us the system and we confirm the route before you commit." },
    { q: "How long before an agent is taking real calls?", a: "A pilot on a single call type typically reaches live traffic in four to six weeks. Most of that is integration work rather than the agent itself." },
    { q: "What do you need from us to start?", a: "Recordings or a written version of the call as it happens today, access to whichever system holds the answers, and one person who knows the process well enough to argue with the script." },
    { q: "Which voice engine will you use?", a: "Uplift AI for anything a Pakistani caller hears, because its Urdu is the best available. ElevenLabs for English and international callers, Vapi where a real phone number is involved, and self-hosted open-source models where data cannot leave your building." },
    { q: "Can it run on our own servers?", a: "Yes. With open-source models self-hosted on your infrastructure, no recording or transcript reaches a third party and there is no per-request bill. It is the usual choice for hospitals." },
    { q: "Who owns the scripts and the call data?", a: "You do, throughout. On a self-hosted deployment the voice data never reaches us at all." },
    { q: "What if it does not work?", a: "The pilot is scoped so that answer arrives in weeks rather than quarters, and we say so plainly. That is the point of agreeing a number before building anything." },
  ],
};

/**
 * The agent library. Eight agents with real recorded calls, plus the template
 * catalogue. Both are listening experiences.
 */
export const AGENTS_PAGE = {
  eyebrow: "Built, not mocked up",
  heading: ["Hear them ", "handle a real call"],
  lede:
    "Eight agents, each handling a full call in Urdu with a bilingual transcript you can follow line by line. Below them, 52 more templates with the voice and opening line already written.",
  disclosure:
    "Market figures on this site are sourced and public. Per-agent impact figures are modelled targets from published industry benchmarks — pilot success criteria to be proven on your data, not guarantees.",
};

export const CONFIDENTIAL = {
  eyebrow: "If the data cannot leave",
  heading: ["Confidential operations, ", "covered"],
  lede:
    "Most voice AI is a wrapper around somebody else's API — your patients' conversations reach a third party before you hear them. That is a non-starter for a hospital.",
  points: [
    { title: "It can run inside your walls", body: "Open-source speech models self-hosted on your servers or private cloud. Nothing leaves your environment." },
    { title: "You decide what is kept", body: "Retention is a setting, not our policy. Keep everything, keep transcripts only, or redact identifiers. Deletion is real deletion." },
    { title: "It only knows what you show it", body: "Integrations are scoped to the fields a call needs. An appointment agent sees a calendar, not your patient records — and cannot be talked into reading one out." },
    { title: "Every call is on the record", body: "Full transcripts, timestamps and outcomes for anything an auditor might ask about." },
  ],
  cta: "Talk about a self-hosted deployment",
};

export const FOOTER = {
  blurb:
    "Pakistan's first Urdu-first agentic voice agents. They take the call, do the work, and write it back into the systems you already run.",
  columns: [
    {
      title: "Who it's for",
      links: [
        { href: "/healthcare", label: "Healthcare" },
        { href: "/education", label: "Education" },
        { href: "/front-desk", label: "Front desk" },
        { href: "/contact", label: "Other sectors" },
      ],
    },
    {
      title: "See it work",
      links: [
        { href: "/agents", label: "Hear the agents" },
        { href: "/voice-agents/dashboard", label: "Reporting dashboard" },
        { href: "/how-it-works", label: "How it works" },
      ],
    },
  ],
};

export const CONTACT_PAGE = {
  eyebrow: "Start a project",
  heading: ["Tell us the call your team is ", "drowning in"],
  lede:
    "One call type, one department, one number to move. That is how every engagement starts.",
};

// Kept for the reporting-dashboard page, which still uses it.
export const VOICE_AGENTS = {
  dashboardTeaser: {
    title: "Reporting dashboard",
    body: "Every call is transcribed, classified and written back, so the system answering the phone is also the system reporting on it.",
    cta: "Open the dashboard",
  },
};
