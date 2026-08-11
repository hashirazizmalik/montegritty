// Dashboard examples shown on the home page.
//
// The point of this section is narrow: a buyer should learn that reporting
// comes WITH the agent, not as a later project. So these are deliberately
// small previews with plausible sample data — enough to prove the thing exists
// and is built from the agent's own transcripts, with a link through to the
// full Urdu dashboard for anyone who wants to poke at it.
//
// Figures are illustrative sample data, and the section says so on screen.

export const DASHBOARDS = [
  {
    id: 'operations',
    name: 'Operations',
    sub: 'What happened on the phones today',
    body:
      'Live call volume, outcome mix and per-agent performance, rebuilt from every call as it ends. This is the one shipped in Urdu — open it and watch the feed arrive.',
    href: '/voice-agents/dashboard',
    linkLabel: 'Open the live example',
    kpis: [
      { label: 'Calls today', value: '4,182', delta: '+12.4%', dir: 'up' },
      { label: 'Self-served', value: '78.4%', delta: '+3.1 pts', dir: 'up' },
      { label: 'Avg. handle time', value: '1:47', delta: '−0:12', dir: 'up' },
    ],
    // Hourly shape — a quiet night, a mid-morning climb, an evening peak.
    bars: [8, 5, 3, 2, 3, 9, 22, 41, 58, 71, 79, 68, 55, 61, 72, 83, 91, 100, 88, 67, 45, 28, 16, 9],
    barsLabel: 'Calls by hour',
  },
  {
    id: 'campaigns',
    name: 'Outbound campaigns',
    sub: 'Whether the calling is working',
    body:
      'For teams running lists — order confirmations, reminders, collections. Contact rate, conversion and cost per successful outcome, broken down by list, hour and voice.',
    href: '/contact',
    linkLabel: 'Ask for this one',
    kpis: [
      { label: 'Contact rate', value: '71.3%', delta: '+5.8 pts', dir: 'up' },
      { label: 'Confirmed', value: '2,597', delta: '+318', dir: 'up' },
      { label: 'Cost / outcome', value: 'PKR 14', delta: '−PKR 6', dir: 'up' },
    ],
    bars: [34, 52, 61, 58, 73, 88, 95, 100, 84, 76, 62, 49, 58, 71, 83, 90, 78, 64, 52, 41, 33, 25, 18, 12],
    barsLabel: 'Answered vs attempted',
  },
  {
    id: 'quality',
    name: 'Quality & compliance',
    sub: 'What the agent actually said',
    body:
      'Every call transcribed, scored against your script and retained for audit. Escalations, flagged phrases and sentiment, with the recording one click away — built for regulated operations.',
    href: '/contact',
    linkLabel: 'Ask for this one',
    kpis: [
      { label: 'Script adherence', value: '96.2%', delta: '+1.4 pts', dir: 'up' },
      { label: 'Escalated', value: '644', delta: '−87', dir: 'up' },
      { label: 'Flagged for review', value: '11', delta: '−4', dir: 'up' },
    ],
    bars: [92, 94, 93, 96, 95, 97, 96, 98, 97, 96, 99, 97, 96, 98, 97, 99, 98, 96, 97, 99, 98, 97, 99, 98],
    barsLabel: 'Adherence by hour',
  },
];

export const DASHBOARD_NOTE =
  'Sample data. Every dashboard is built from the agent’s own transcripts and outcomes, so the system answering the phone is the system reporting on it.';
