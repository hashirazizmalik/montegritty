// Single source of truth for site copy. Edit here, not in components.

export const CONTACT = {
  phoneDisplay: "0305 5684317",
  // tel: needs international format so the link works from outside Pakistan
  phoneLink: "tel:+923055684317",
  hours: "Mon–Fri · 9–6 PKT",
};

export const UMBRELLAS = [
  {
    id: "development",
    num: "01",
    name: "Development",
    lead: "Systems of record and the software around them.",
    services: [
      {
        name: "Web Development",
        desc: "Performant, accessible marketing sites and web platforms built to hold up under real traffic.",
      },
      {
        name: "Application Development",
        desc: "Cross-platform mobile and desktop applications, from first prototype through store release.",
      },
      {
        name: "ERP Implementation",
        desc: "End-to-end deployment that aligns finance, operations, and supply with a single source of truth.",
      },
      {
        name: "CRM Implementation",
        desc: "Pipeline, service, and relationship systems your revenue teams adopt without friction.",
      },
      {
        name: "Custom Software",
        desc: "Bespoke systems for the processes no off-the-shelf product was ever shaped to handle.",
      },
    ],
  },
  {
    id: "ai-ml",
    num: "02",
    name: "AI & Machine Learning",
    lead: "Models and agents that do measurable work.",
    services: [
      {
        name: "Agentic AI",
        desc: "AI agents that reason, act, and integrate with your stack — autonomy with auditability built in.",
      },
      {
        name: "AI Automation",
        desc: "Intelligent workflow automation that removes manual handoffs and reclaims hours across departments.",
      },
      {
        name: "Custom Model Development",
        desc: "Purpose-built models trained on your data, your domain, and your definition of a correct answer.",
      },
      {
        name: "Computer Vision",
        desc: "Detection, inspection, and tracking pipelines for production floors, logistics, and field operations.",
      },
      {
        name: "Custom Finetuning & Voice Models",
        desc: "Domain-tuned language and speech models that carry your terminology, tone, and compliance rules.",
      },
    ],
  },
  {
    id: "digital-marketing",
    num: "03",
    name: "Digital Marketing",
    lead: "The surface your customers actually meet.",
    services: [
      {
        name: "UI/UX",
        desc: "Research-led interface and experience design that makes complex products feel obvious.",
      },
      {
        name: "Social Media Management",
        desc: "Channel strategy, content calendars, and community management with reporting you can act on.",
      },
      {
        name: "Meta Ads",
        desc: "Facebook and Instagram campaigns built around creative testing, clean attribution, and cost per result.",
      },
    ],
  },
];

/**
 * TESTIMONIALS — DRAFT COPY.
 *
 * The first four are attributed to real, named people at real companies. Get
 * written sign-off from each person before this goes to production, and
 * replace any quote they'd like worded differently.
 *
 * The fifth ("Verento Logistics") is fully fictional — invented for this
 * build with no real company or person behind it, standing in for the Makka
 * Groups slot until that quote is ready. Swap it out (or drop it) once a
 * fifth real testimonial is approved.
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
    company: "Zoue Tech",
    name: "Hamza Abdul Sattar",
    role: "Chief Executive Officer",
    initials: "HS",
    quote:
      "I've worked with a lot of engineering partners and most of them disappear the moment the invoice clears. Montegritty stayed accountable to the outcome, not the handover. They shipped working software early, took hard feedback without ego, and left our team genuinely able to maintain what they built.",
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
  {
    company: "Verento Logistics",
    name: "Sample Client",
    role: "Operations Director — fictional, placeholder entry",
    initials: "VL",
    quote:
      "Four regional depots, four different spreadsheets, and nobody with a single view of what we actually had in stock. Montegritty rebuilt it as one system without stopping the trucks — inventory, routing, and billing all reading from the same source by the time we were done. We haven't lost a shipment to a data mismatch since.",
  },
];

export const PROCESS = [
  {
    phase: "PHASE 01",
    title: "Diagnose",
    body: "We map your processes, data flows, and friction points before a single line of architecture is drawn.",
  },
  {
    phase: "PHASE 02",
    title: "Architect",
    body: "A blueprint tailored to your operation — integrations, governance, and scale designed in from day one.",
  },
  {
    phase: "PHASE 03",
    title: "Build",
    body: "Iterative delivery with your team in the room. You see working systems early and often, never at the end.",
  },
  {
    phase: "PHASE 04",
    title: "Sustain",
    body: "Deployment, adoption, and ongoing partnership. We stay accountable for outcomes, not just handover.",
  },
];

export const VERTICALS = [
  {
    idx: "01",
    title: "Logistics & Supply Chain",
    body: "Replace fragmented spreadsheets with automated routing and real-time visibility to eliminate delays and cut operational overhead.",
    tags: ["Data Engineering", "Automation"],
  },
  {
    idx: "02",
    title: "Mid-Size Manufacturing",
    body: "Connect your shop floor directly to your back office. Unify inventory, production, and financials without enterprise-level bloat.",
    tags: ["ERP", "Computer Vision"],
  },
  {
    idx: "03",
    title: "Financial Services",
    body: "Secure, compliant CRM setups and data pipelines that help your teams manage wealth and close deals with absolute precision.",
    tags: ["Data Pipelines", "CRM"],
  },
  {
    idx: "04",
    title: "Healthcare Operations",
    body: "Strip away manual paperwork and administrative friction so your staff can focus entirely on patient care and facility management.",
    tags: ["Workflow Automation", "ERP"],
  },
];

export const MARQUEE = [
  "ERP Implementation",
  "Agentic AI",
  "Custom Software",
  "Computer Vision",
  "CRM Systems",
  "UI/UX",
  "AI Automation",
  "Meta Ads",
];
