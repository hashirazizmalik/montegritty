/**
 * Seed client records.
 *
 * This file is the floor, not the source of truth. At runtime `lib/store.js`
 * overlays anything saved through the admin panel on top of these, so a client
 * added here always exists even if the key-value store is empty or unreachable.
 *
 * A client owns two things: a voice agent, and a dashboard that reports on it.
 *
 * `metrics` is seeded sample data. Until real call telemetry is wired through,
 * that is what the dashboard shows — and the dashboard says so on screen. Do not
 * quietly drop that notice when the numbers start looking plausible.
 */

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
    accent: '#0C6B54',
    // Anyone with the link can read the dashboard. See the note in
    // app/c/[slug]/page.js before changing this default.
    visibility: 'link',
    metrics: {
      updated: '14 Aug 2026',
      kpis: [
        { label: 'Calls handled', value: '1,284', delta: '+11.2%', dir: 'up' },
        { label: 'Resolved without a human', value: '73.6%', delta: '+4.4 pts', dir: 'up' },
        { label: 'Avg. call length', value: '2:38', delta: '−0:19', dir: 'up' },
        { label: 'Consultations booked', value: '317', delta: '+42', dir: 'up' },
      ],
      hourly: [4, 2, 1, 1, 2, 6, 18, 39, 62, 78, 86, 74, 51, 66, 81, 92, 100, 88, 61, 40, 26, 15, 9, 5],
      outcomes: [
        { label: 'Consultation booked', pct: 24.7, count: 317, color: '#1a7f4b' },
        { label: 'Information given', pct: 48.9, count: 628, color: '#4353b8' },
        { label: 'Passed to a lawyer', pct: 19.2, count: 247, color: '#b58324' },
        { label: 'No contact', pct: 7.2, count: 92, color: '#c84b31' },
      ],
      recent: [
        { t: '16:42', num: '0300-41••••', dur: '3:04', outcome: 'Consultation booked', lang: 'اردو' },
        { t: '16:31', num: '0321-19••••', dur: '1:52', outcome: 'Information given', lang: 'اردو' },
        { t: '16:18', num: '0333-87••••', dur: '4:21', outcome: 'Passed to a lawyer', lang: 'اردو + English' },
        { t: '16:04', num: '0345-62••••', dur: '2:11', outcome: 'Information given', lang: 'English' },
        { t: '15:47', num: '0311-73••••', dur: '0:38', outcome: 'No contact', lang: '—' },
        { t: '15:29', num: '0308-55••••', dur: '2:56', outcome: 'Consultation booked', lang: 'اردو' },
      ],
    },
  },
];

// Outcome labels carry their own colour so a client can have categories that
// mean something to their business rather than ours.
export const OUTCOME_FALLBACK = '#5A6B64';
