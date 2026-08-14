// Single source of truth for site copy. Edit here, not in components.
//
// POSITIONING — read before editing anything below.
//
// Montegritty builds and runs voice agents for Pakistani organisations, led by
// healthcare. Three things separate us from a self-serve builder like Bayan,
// and every page should be reinforcing at least one of them:
//
//   1. PROOF. Our agents have real recorded calls you can listen to. A gallery
//      of templates nobody has ever deployed is not proof.
//   2. ENGINE-AGNOSTIC. Uplift AI is our primary engine for Urdu because it is
//      the best available; ElevenLabs, Vapi and open-source models are used
//      where they win, and open-source self-hosted where data cannot leave.
//      A competitor welded to one vendor inherits that vendor's roadmap.
//   3. WE RUN IT. We build the agent, wire it into your systems, and stay
//      accountable for a number. A shareable link is not a deployment.
//
// Urdu-first and multilingual. Do NOT claim Pashto as production-ready — it is
// not, and a buyer can disprove it in one phone call.

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
  eyebrow: "Voice AI for Pakistan · Urdu first",
  lines: ["Your patients don't", "read your forms."],
  lastLine: "They'll ",
  lastLineEm: "talk to this.",
  lede:
    "Four in ten Pakistani adults cannot comfortably read a form, a menu or an SMS — but almost all of them will answer a phone. Montegritty builds voice agents that hold the call in Urdu, wires them into the systems you already run, and stays accountable for the number they were hired to move.",
  primary: { href: "/agents", label: "Hear a real call" },
  secondary: { href: "/healthcare", label: "For healthcare" },
  statBig: "8",
  statLabel: "agents you can listen to right now",
};

export const MARQUEE = [
  "Patient Intake",
  "Appointment Reminders",
  "Admissions & Fees",
  "Urdu Voice Agents",
  "Order Confirmation",
  "Self-Hosted Deployment",
  "Call Reporting",
  "Multilingual",
];

/**
 * The three things that make this different from a self-serve builder.
 * Shown high on the home page, because a visitor should know within one screen
 * why they are not just looking at another template gallery.
 */
export const EDGE = {
  eyebrow: "Why us and not a template gallery",
  heading: ["Anyone can generate an agent. ", "Almost nobody runs one."],
  lede:
    "The hard part was never producing a voice. It is producing one that survives a real caller, in a real language, wired to a real system — and then proving what it did.",
  points: [
    {
      n: "01",
      title: "You can hear ours working",
      body:
        "Eight agents, eight full recorded calls in Urdu, with a bilingual transcript you can follow line by line. Not mock-ups, not a template list — conversations, synthesised end to end. Listen before you believe anything else on this page.",
      href: "/agents",
      cta: "Listen to a call",
    },
    {
      n: "02",
      title: "Not locked to one voice vendor",
      body:
        "Uplift AI is our primary engine because it is the best Urdu on the market. But ElevenLabs, Vapi and open-source models are all on the table, chosen per project — and open-source self-hosted when the data cannot leave your building. A product built on a single vendor inherits that vendor's roadmap and outages.",
      href: "/how-it-works#engines",
      cta: "See the engines",
    },
    {
      n: "03",
      title: "We build it and run it",
      body:
        "You get an agent wired into your booking system, your records, your order feed — and a dashboard built from its own calls. Not a link you are left to figure out. We agree one number up front and are accountable for it.",
      href: "/how-it-works",
      cta: "How a project runs",
    },
  ],
};

/**
 * Engine independence. This is the claim a Bayan-style competitor cannot make,
 * so it gets its own section rather than a bullet. Keep it factual: name what
 * each engine is actually for.
 */
export const ENGINES = {
  eyebrow: "The engine layer",
  heading: ["One agent. ", "Whichever engine suits it."],
  lede:
    "Voice AI is assembled from three swappable parts — speech in, reasoning, speech out. We pick each per project instead of taking whatever one vendor happens to offer, which is why a confidential deployment and a public helpline can be the same agent on different rails.",
  items: [
    {
      name: "Uplift AI",
      role: "Primary — Urdu & regional",
      body: "The best Urdu speech on the market, built in Pakistan on native-speaker data. Our default for anything a Pakistani caller will hear.",
      status: "In production",
    },
    {
      name: "ElevenLabs",
      role: "English & multilingual",
      body: "Where an agent serves English-speaking or international callers and the priority is naturalness across accents.",
      status: "In production",
    },
    {
      name: "Vapi",
      role: "Telephony orchestration",
      body: "Call routing, SIP and phone-number provisioning when an agent has to answer a real number rather than a browser.",
      status: "Available",
    },
    {
      name: "Open-source, self-hosted",
      role: "When data cannot leave",
      body: "Whisper and open speech models running on your own hardware. No third party ever receives a recording, and there is no per-request bill.",
      status: "On request",
    },
  ],
  note:
    "Which engine a project uses is a decision we make with you and can revisit later. Nothing about the agent is rewritten when the engine underneath it changes.",
};

/**
 * Language honesty. Urdu is production. Everything else is stated at its real
 * status — a buyer tests this in one call, so overclaiming costs more than it buys.
 */
export const LANGUAGES = {
  eyebrow: "Languages",
  heading: ["Urdu first. ", "Honestly labelled."],
  lede:
    "Every voice AI company in this market lists a language roadmap. Here is ours with the status attached, because you will find out the truth on your first call anyway.",
  rows: [
    { name: "Urdu", status: "In production", note: "Native script and Roman Urdu, including the English code-mixing real callers actually use." },
    { name: "English", status: "In production", note: "Full support alongside Urdu, so one agent can serve both without switching numbers." },
    { name: "Urdu + English mixed", status: "In production", note: "The way most Pakistani business calls are actually conducted, handled as one language rather than a failure case." },
    { name: "Pashto, Punjabi, Sindhi", status: "On request", note: "Available where a project justifies the tuning work. We will tell you plainly what quality to expect before you commit." },
  ],
};

/**
 * VERTICALS — three, with weight. Healthcare leads because that is where the
 * live institutional work is and where the literacy gap bites hardest.
 * Banking and telecom are deliberately absent: both are already crowded with
 * BPO vendors and we have no edge there.
 */
export const VERTICALS = [
  {
    slug: "healthcare",
    idx: "01",
    title: "Healthcare",
    lead: "Clinics, hospitals, labs and diagnostics",
    short: "Appointment confirmation, pre-arrival intake and follow-up, in the language the patient speaks.",
    body:
      "Between a fifth and two fifths of outpatient appointments are no-shows, and every empty slot is a consultant hour billed to nobody. The patients hardest to reach are the ones least able to read an SMS reminder. An agent that calls, confirms, reschedules against live availability and delivers fasting instructions in spoken Urdu reaches all of them.",
    tags: ["Appointments", "Patient intake", "Follow-up"],
  },
  {
    slug: "education",
    idx: "02",
    title: "Education",
    lead: "Schools, colleges and training networks",
    short: "Admissions enquiries, fee reminders and absence follow-up — reaching the parent, not the schoolbag.",
    body:
      "Campuses lose weeks of admin time chasing parents over absences and unpaid fees, and printed circulars sent home in schoolbags never arrive. An agent calls the same evening a child is absent, logs the reason, folds in the fee reminder, and writes every response back into the school system.",
    tags: ["Admissions", "Fees", "Attendance"],
  },
  {
    slug: "front-desk",
    idx: "03",
    title: "Front desk",
    lead: "The businesses that live on the phone",
    short: "Order confirmation, bookings, enquiries and reminders for the desks that never stop ringing.",
    body:
      "Cash on delivery is most of Pakistani e-commerce and return-to-origin is the tax on it. Property leads go cold in an afternoon. Salon and restaurant bookings arrive at the worst possible moment. These are all the same shape of problem: a high-volume, repetitive call that a person is too expensive to keep answering.",
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
    "This is not a bet on a trend. It is arithmetic about a country where almost everyone can answer a phone and four in ten adults cannot comfortably read the message you sent them instead.",
  stats: [
    { value: "60.7%", body: "national literacy. In Khyber Pakhtunkhwa it is 51.1%, and female literacy nationally is 52.8%." },
    { value: "82.6%", body: "mobile penetration, with smartphone usage at 71.6%. Connectivity has outrun literacy." },
    { value: "37.8%", body: "annual growth in healthcare voice AI globally — the fastest-growing vertical in the category." },
    { value: "80%+", body: "of Pakistani online orders are cash on delivery, and roughly one parcel in five comes back undelivered." },
  ],
  close:
    "Every call these agents make is already being made today — badly, expensively, and only to a fraction of the list. That makes this a cost-and-coverage argument rather than a new-behaviour one, which is the easier case to win.",
  sources: [
    { label: "Pakistan Bureau of Statistics, 2023 census", href: "https://www.dawn.com/news/2007104" },
    { label: "Digital 2026: Pakistan (DataReportal)", href: "https://datareportal.com/reports/digital-2026-pakistan" },
    { label: "Healthcare voice AI market (Grand View Research)", href: "https://www.grandviewresearch.com/" },
    { label: "Reducing COD returns (DHL Pakistan)", href: "https://www.dhl.com/discover/en-pk/e-commerce-advice/e-commerce-best-practice/subscription-marketing/how-pakistani-e-commerce-sellers-can-reduce-cod-returns" },
  ],
};

export const PROCESS = [
  { phase: "PHASE 01", title: "Listen", body: "We sit with the calls you already make — recordings, scripts, the reasons people ring — and pick the one where an agent moves a number you care about." },
  { phase: "PHASE 02", title: "Script", body: "We write the conversation with the people who currently have it, choose the voice and the engine, and agree what the agent must never say or decide on its own." },
  { phase: "PHASE 03", title: "Wire", body: "The agent is connected to the systems holding the answers, then run against real traffic in a limited pilot with a human always one transfer away." },
  { phase: "PHASE 04", title: "Prove", body: "We measure against the number we agreed at the start. If it moves, we scale the volume. If it does not, we change the agent or tell you plainly." },
];

export const PROCESS_PAGE = {
  eyebrow: "How it works",
  heading: ["Start with one call, ", "not a platform"],
  lede:
    "Nobody should buy a voice programme off a slide deck. Every engagement starts as a narrow pilot on a single call type, measured against a number agreed before we build anything.",
  pilot: {
    title: "What a pilot looks like",
    points: [
      "One call type, one department, roughly six weeks",
      "A single success metric agreed up front — no-show rate, collection rate, return rate, calls answered",
      "A human always one transfer away, from the first call to the last",
      "Full recordings and transcripts, so you audit the agent rather than trust it",
      "You keep the scripts and the call data whether or not we continue",
    ],
  },
  faq: [
    { q: "How long before an agent is taking real calls?", a: "A pilot on a single call type typically reaches live traffic in four to six weeks, most of which is integration work rather than the agent itself." },
    { q: "What do you need from us to start?", a: "Recordings or a written version of the call as it happens today, access to whichever system holds the answers, and one person who knows the process well enough to argue with the script." },
    { q: "Which voice engine will you use?", a: "Uplift AI for anything a Pakistani caller will hear, because its Urdu is the best available. ElevenLabs for English and international callers, Vapi where a real phone number is involved, and self-hosted open-source models where the data cannot leave your building. We decide it with you and it can be changed later." },
    { q: "Can it run on our own servers?", a: "Yes. With open-source models self-hosted on your infrastructure, no recording or transcript ever reaches a third party and there is no per-request bill. It is the usual choice for hospitals and anyone holding patient records." },
    { q: "Who owns the scripts and the call data?", a: "You do, throughout. On a self-hosted deployment the voice data never reaches us at all." },
    { q: "What if it does not work?", a: "The pilot is scoped so that answer arrives in weeks rather than quarters, and we say so plainly. That is the point of agreeing a number before building anything." },
  ],
};

/**
 * The agent library. Eight agents with real recorded calls, plus the template
 * catalogue. Both are listening experiences — there is no live-call surface on
 * this site any more.
 */
export const AGENTS_PAGE = {
  eyebrow: "Built, not mocked up",
  heading: ["Hear them ", "handle a real call"],
  lede:
    "Eight agents we have built, each handling a full call in Urdu with a bilingual transcript you can follow line by line. Beneath them, the template library: fifty-two more briefs with the voice, the opening line and the rules already written.",
  disclosure:
    "Market figures on this site are sourced and public. Per-agent impact figures are modelled targets built from published industry benchmarks — treat them as pilot success criteria to be proven on your data, not as guarantees.",
};

export const CONFIDENTIAL = {
  eyebrow: "If the data cannot leave",
  heading: ["Confidential operations, ", "covered"],
  lede:
    "Most voice AI is a wrapper around somebody else's API, which means your patients' conversations travel to a third party before you hear them. That is a non-starter for a hospital — so it is not how we deploy for one.",
  points: [
    { title: "It can run entirely inside your walls", body: "Open-source speech models self-hosted on your own servers or private cloud. Recordings and transcripts never leave your environment, and there is no per-request call to anyone else's API." },
    { title: "You decide what is kept", body: "Retention is a setting, not our policy. Keep every recording for audit, keep transcripts but discard audio, or redact identifiers before anything is written down. Deletion is real deletion." },
    { title: "The agent only knows what you show it", body: "Integrations are scoped to the fields a call actually needs. An appointment agent can see a calendar; it cannot see your patient records, and it cannot be talked into reading one out." },
    { title: "Every call is on the record", body: "Full transcripts, timestamps and outcomes for anything an auditor might ask about — including what the agent said, not just what it did." },
  ],
  cta: "Talk about a self-hosted deployment",
};

export const FOOTER = {
  blurb:
    "Voice agents for Pakistani organisations — built, wired into your systems, and reported on. Urdu first, multilingual, and never locked to a single voice vendor.",
  columns: [
    {
      title: "Who it's for",
      links: [
        { href: "/healthcare", label: "Healthcare" },
        { href: "/education", label: "Education" },
        { href: "/front-desk", label: "Front desk" },
        { href: "/industries", label: "Other sectors" },
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
    "One call type, one department, one number to move. That is how every engagement starts — and the fastest way to find out whether a voice agent is worth your money is to scope a pilot on the call you already hate making.",
};

// Kept for the reporting-dashboard page, which still uses it.
export const VOICE_AGENTS = {
  dashboardTeaser: {
    title: "Reporting dashboard",
    body: "Every call an agent handles is transcribed, classified and written back, so the system answering the phone is also the system reporting on it.",
    cta: "Open the dashboard",
  },
};
