// Sample data for the dashboard shown on the home page.
//
// This is the English counterpart of lib/dashboard.js, which holds the Urdu
// RTL version at /voice-agents/dashboard. The figures are deliberately the
// SAME underlying day in both — 4,182 calls, a 6pm peak of 441, 78.4%
// self-served — so a visitor who opens the Urdu one is not looking at a
// different business.
//
// Everything is invented, and the panel says so on screen. It is shaped like a
// real Pakistani contact-centre day: dead overnight, a mid-morning climb, a
// lunch dip, and the evening peak between Maghrib and 9pm when people are home
// and answer their phones. Figures stay in Latin digits so tabular-nums can
// align them.
//
// COLOUR. Outcomes are states, not arbitrary categories, so they take the
// status palette rather than a categorical one, and every row is labelled with
// its name and value — status is never signalled by colour alone. The four
// were checked with the palette validator against this surface (#f0ede6):
// lightness, chroma, CVD separation and normal-vision separation all pass.
// Amber sits at 2.88:1 contrast, which is why its row label is mandatory, not
// decorative. Darkening it to clear 3:1 was tried and collapses its separation
// from the green under protanopia — the labels are the better trade.

export const DASH = {
  client: 'Shifa Clinic Network',
  scope: '3 branches · 8 agents · Urdu, English',
  period: 'Today, to 21:00',
};

// One headline number each, with the comparison that makes it mean something.
export const KPIS = [
  { label: 'Calls handled', value: '4,182', delta: '+12.4%', since: 'vs yesterday', dir: 'up' },
  { label: 'Resolved without a human', value: '78.4%', delta: '+3.1 pts', since: 'vs last week', dir: 'up' },
  { label: 'Average handle time', value: '1:47', delta: '−12s', since: 'vs last week', dir: 'up' },
  { label: 'Cost per call', value: 'PKR 12', delta: '−87%', since: 'vs PKR 95 staffed', dir: 'up' },
];

// 24 hourly buckets, midnight → 11pm.
export const HOURLY = [
  35, 19, 13, 8, 6, 11, 32, 82, 150, 226, 270, 248,
  196, 219, 259, 295, 317, 369, 441, 358, 275, 183, 112, 58,
];

export const HOURLY_PEAK_NOTE =
  'Busiest hour is 18:00 — 441 calls. At four minutes a call that is 30 people on the phones at once, before breaks, shift overlap or a single one of them being unavailable.';

export const OUTCOMES = [
  { label: 'Confirmed or resolved', pct: 62.1, count: 2597, tone: 'good' },
  { label: 'Rescheduled', pct: 16.3, count: 682, tone: 'warning' },
  { label: 'Passed to a human', pct: 15.4, count: 644, tone: 'info' },
  { label: 'No answer or cancelled', pct: 6.2, count: 259, tone: 'critical' },
];

export const AGENTS = [
  { name: 'Hassan', role: 'Telecom support', calls: 968, rate: 84 },
  { name: 'Bilal', role: 'COD confirmation', calls: 812, rate: 91 },
  { name: 'Fatima', role: 'Collections', calls: 604, rate: 73 },
  { name: 'Ayesha', role: 'Appointments', calls: 517, rate: 88 },
  { name: 'Zainab', role: 'Public health', calls: 486, rate: 69 },
  { name: 'Sana', role: 'School parents', calls: 361, rate: 86 },
];

// The two numbers a clinic owner actually reports upwards.
export const IMPACT = [
  { value: '1,204', label: 'appointments confirmed', note: 'that would otherwise have been no-shows' },
  { value: '30', label: 'agents not hired', note: 'to cover the 18:00 peak alone' },
  { value: 'PKR 18.4L', label: 'saved this month', note: 'against the staffed cost of the same volume' },
];

export const SECTION = {
  eyebrow: 'Reporting is included',
  heading: ['You also get ', 'the dashboard.'],
  lede:
    'Every call is transcribed, classified and written back as it ends — so the system answering the phone is the system reporting on it.',
  note:
    'Sample data, shaped like a real week. The same dashboard ships with a live deployment, built from the agent’s own transcripts and outcomes.',
  cta: { href: '/voice-agents/dashboard', label: 'See it in Urdu, with a live call feed' },
};
