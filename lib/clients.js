/**
 * Seed client records.
 *
 * This file is the floor, not the source of truth. At runtime `lib/store.js`
 * overlays anything saved through the admin panel on top of these, so a client
 * added here always exists even if the key-value store is empty or unreachable.
 *
 * A client owns two things: a voice agent, and a dashboard that reports on it.
 *
 * Everything under `metrics` is seeded sample data, and the dashboard says so on
 * screen. Do not quietly drop that notice when the numbers start looking
 * plausible — real telemetry gets its own table, it does not get pasted in here.
 */

// Deterministic, so the "sample data" never shifts between renders and a
// screenshot taken today matches one taken tomorrow.
function series(seed, count, base, swing) {
  const out = [];
  let x = seed;
  for (let i = 0; i < count; i += 1) {
    x = (x * 1103515245 + 12345) % 2147483648;
    out.push(Math.round(base + ((x / 2147483648) - 0.5) * swing));
  }
  return out;
}

// A working day: dead overnight, a mid-morning climb, an evening peak.
const SHAPE = [4, 2, 1, 1, 2, 6, 18, 39, 62, 78, 86, 74, 51, 66, 81, 92, 100, 88, 61, 40, 26, 15, 9, 5];

const RANGES = {
  today: {
    label: 'Today',
    axis: ['00:00', '06:00', '12:00', '18:00', '23:00'],
    points: SHAPE,
    kpis: [
      { label: 'Calls handled', value: '96', delta: '+11.2%', dir: 'up', spark: series(7, 12, 60, 50) },
      { label: 'Resolved without a human', value: '73.6%', delta: '+4.4 pts', dir: 'up', spark: series(11, 12, 70, 18) },
      { label: 'Avg. call length', value: '2:38', delta: '−0:19', dir: 'up', spark: series(3, 12, 160, 40) },
      { label: 'Consultations booked', value: '24', delta: '+6', dir: 'up', spark: series(5, 12, 20, 14) },
    ],
    outcomes: [
      { label: 'Consultation booked', pct: 24.7, count: 24, color: '#1a7f4b' },
      { label: 'Information given', pct: 48.9, count: 47, color: '#4353b8' },
      { label: 'Passed to a lawyer', pct: 19.2, count: 18, color: '#b58324' },
      { label: 'No contact', pct: 7.2, count: 7, color: '#c84b31' },
    ],
  },
  week: {
    label: 'Last 7 days',
    axis: ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    points: [72, 41, 38, 94, 88, 100, 83],
    kpis: [
      { label: 'Calls handled', value: '612', delta: '+8.9%', dir: 'up', spark: series(13, 12, 80, 40) },
      { label: 'Resolved without a human', value: '71.8%', delta: '+2.1 pts', dir: 'up', spark: series(17, 12, 68, 16) },
      { label: 'Avg. call length', value: '2:44', delta: '−0:08', dir: 'up', spark: series(19, 12, 165, 30) },
      { label: 'Consultations booked', value: '151', delta: '+19', dir: 'up', spark: series(23, 12, 22, 12) },
    ],
    outcomes: [
      { label: 'Consultation booked', pct: 24.7, count: 151, color: '#1a7f4b' },
      { label: 'Information given', pct: 47.1, count: 288, color: '#4353b8' },
      { label: 'Passed to a lawyer', pct: 20.6, count: 126, color: '#b58324' },
      { label: 'No contact', pct: 7.6, count: 47, color: '#c84b31' },
    ],
  },
  month: {
    label: 'Last 30 days',
    axis: ['1 Jul', '8 Jul', '15 Jul', '22 Jul', '30 Jul'],
    points: series(29, 30, 62, 66).map((v) => Math.max(12, v)),
    kpis: [
      { label: 'Calls handled', value: '1,284', delta: '+11.2%', dir: 'up', spark: series(31, 12, 75, 44) },
      { label: 'Resolved without a human', value: '73.6%', delta: '+4.4 pts', dir: 'up', spark: series(37, 12, 71, 15) },
      { label: 'Avg. call length', value: '2:38', delta: '−0:19', dir: 'up', spark: series(41, 12, 158, 34) },
      { label: 'Consultations booked', value: '317', delta: '+42', dir: 'up', spark: series(43, 12, 24, 13) },
    ],
    outcomes: [
      { label: 'Consultation booked', pct: 24.7, count: 317, color: '#1a7f4b' },
      { label: 'Information given', pct: 48.9, count: 628, color: '#4353b8' },
      { label: 'Passed to a lawyer', pct: 19.2, count: 247, color: '#b58324' },
      { label: 'No contact', pct: 7.2, count: 92, color: '#c84b31' },
    ],
  },
};

const METRICS = {
  updated: '14 Aug 2026, 16:45 PKT',
  defaultRange: 'month',
  ranges: RANGES,

  health: {
    status: 'Healthy',
    uptime: '99.97%',
    avgAnswerMs: 940,
    escalationRate: '19.2%',
    failedCalls: 3,
  },

  languages: [
    { label: 'Urdu', pct: 68.4, color: '#0C6B54' },
    { label: 'Urdu + English', pct: 21.9, color: '#4353b8' },
    { label: 'English', pct: 9.7, color: '#b58324' },
  ],

  // What callers actually rang about, which is the most useful thing an intake
  // agent can tell a firm.
  intents: [
    { label: 'Family & divorce', count: 402, pct: 100 },
    { label: 'Property dispute', count: 311, pct: 77 },
    { label: 'Employment', count: 208, pct: 52 },
    { label: 'Company registration', count: 154, pct: 38 },
    { label: 'Criminal defence', count: 121, pct: 30 },
    { label: 'Something else', count: 88, pct: 22 },
  ],

  peak: { window: '16:00 – 17:00', calls: 100, note: 'Busiest hour. Staffing this hour by hand would take 6 people.' },

  recent: [
    { t: '16:42', num: '0300-41••••', dur: '3:04', outcome: 'Consultation booked', tone: 'good', lang: 'اردو', intent: 'Family & divorce' },
    { t: '16:31', num: '0321-19••••', dur: '1:52', outcome: 'Information given', tone: 'info', lang: 'اردو', intent: 'Property dispute' },
    { t: '16:18', num: '0333-87••••', dur: '4:21', outcome: 'Passed to a lawyer', tone: 'warn', lang: 'اردو + English', intent: 'Employment' },
    { t: '16:04', num: '0345-62••••', dur: '2:11', outcome: 'Information given', tone: 'info', lang: 'English', intent: 'Company registration' },
    { t: '15:47', num: '0311-73••••', dur: '0:38', outcome: 'No contact', tone: 'bad', lang: '—', intent: '—' },
    { t: '15:29', num: '0308-55••••', dur: '2:56', outcome: 'Consultation booked', tone: 'good', lang: 'اردو', intent: 'Family & divorce' },
    { t: '15:12', num: '0347-28••••', dur: '3:38', outcome: 'Passed to a lawyer', tone: 'warn', lang: 'اردو', intent: 'Criminal defence' },
    { t: '14:58', num: '0302-94••••', dur: '1:19', outcome: 'Information given', tone: 'info', lang: 'اردو', intent: 'Property dispute' },
  ],
};

export const DEFAULT_METRICS = METRICS;

export const SEED_CLIENTS = [
  {
    slug: 'shakir',
    name: 'Shakir & Associates',
    contact: 'Shakir Shehzad',
    // Uplift realtime assistant id. Empty until one is assigned in the admin
    // panel; the dashboard copes and shows the agent as not yet connected.
    assistantId: '',
    agentName: 'Legal Intake Desk',
    agentRole: 'First-contact screening for new matters',
    voice: 'family-lawyer',
    language: 'Urdu · English',
    plan: 'Pilot',
    since: 'August 2026',
    visibility: 'link',
    metrics: METRICS,
  },
];

export const OUTCOME_FALLBACK = '#5A6B64';
