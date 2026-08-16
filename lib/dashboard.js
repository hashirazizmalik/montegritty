// Sample data for the Urdu operations dashboard demo.
//
// Everything here is invented but shaped like a real Pakistani contact-centre
// day: dead overnight, a mid-morning climb, a lunch dip, and the evening peak
// between Maghrib and 9pm when people are home and answer their phones.
//
// Labels are Urdu; figures stay in Latin digits, which is what Pakistani
// operations software actually uses and what tabular-nums can align.

export const DASH_META = {
  title: 'وائس ایجنٹ آپریشنز ڈیش بورڈ',
  subtitle: 'نمونہ ڈیٹا — آٹھوں ایجنٹس کی مشترکہ کارکردگی، آج کے دن کی',
  live: 'لائیو',
};

export const DASH_KPIS = [
  { label: 'آج کی کل کالز', value: '4,182', delta: '+12.4% vs yesterday', dir: 'up' },
  { label: 'بغیر انسان کے حل ہوئیں', value: '78.4%', delta: '+3.1 pts', dir: 'up' },
  { label: 'اوسط دورانیۂ کال', value: '1:47', delta: '−0:12 shorter', dir: 'up' },
  // "PKR" rather than the ₨ glyph — Fraunces has no rupee sign, and the agent
  // pages price in PKR too.
  { label: 'اس ماہ کی بچت', value: 'PKR 18.4L', delta: '+9.2% vs July', dir: 'up' },
];

// 24 hourly buckets, midnight → 11pm.
export const DASH_HOURLY = [
  35, 19, 13, 8, 6, 11, 32, 82, 150, 226, 270, 248,
  196, 219, 259, 295, 317, 369, 441, 358, 275, 183, 112, 58,
];

export const DASH_HOURLY_NOTE =
  'سب سے زیادہ رَش شام 6 سے 7 بجے — 441 کالز۔ اسی ایک گھنٹے میں 30 انسانی ایجنٹس درکار ہوتے۔';

// Outcomes are states, not arbitrary categories, so they carry status colours —
// and every row is labelled, so colour is never the only cue.
export const DASH_OUTCOMES = [
  { label: 'کنفرم / حل شدہ', pct: 62.1, count: 2597, color: '#1a7f4b' },
  { label: 'دوبارہ شیڈول', pct: 16.3, count: 682, color: '#b58324' },
  { label: 'انسانی ایجنٹ کو منتقل', pct: 15.4, count: 644, color: '#4353b8' },
  { label: 'منسوخ / رابطہ نہ ہوا', pct: 6.2, count: 259, color: '#c84b31' },
];

export const DASH_AGENTS = [
  { name: 'حسن', role: 'Telecom support', calls: 968, rate: 84 },
  { name: 'بلال', role: 'COD confirmation', calls: 812, rate: 91 },
  { name: 'فاطمہ', role: 'Collections', calls: 604, rate: 73 },
  { name: 'عائشہ', role: 'Appointments', calls: 517, rate: 88 },
  { name: 'زینب', role: 'Public health', calls: 486, rate: 69 },
  { name: 'مس ثناء', role: 'School parents', calls: 361, rate: 86 },
  { name: 'کامران', role: 'Lead qualification', calls: 268, rate: 64 },
  { name: 'ڈاکٹر سعد', role: 'Chronic care', calls: 166, rate: 79 },
];

export const OUTCOME_STYLES = {
  confirmed: { label: 'کنفرم شدہ', color: '#1a7f4b' },
  rescheduled: { label: 'دوبارہ شیڈول', color: '#b58324' },
  escalated: { label: 'انسان کو منتقل', color: '#4353b8' },
  cancelled: { label: 'منسوخ', color: '#c84b31' },
};

export const DASH_FEED_HEADERS = ['وقت', 'ایجنٹ', 'نمبر', 'دورانیہ', 'نتیجہ', 'زبان'];

// Seeded so server and client render identically on first paint — new rows are
// only ever appended in the browser, after hydration.
export const DASH_FEED_SEED = [
  { t: '18:42:09', agent: 'حسن', num: '0300-41••••', dur: '2:14', outcome: 'confirmed', lang: 'اردو' },
  { t: '18:41:55', agent: 'بلال', num: '0333-87••••', dur: '1:08', outcome: 'confirmed', lang: 'اردو' },
  { t: '18:41:31', agent: 'فاطمہ', num: '0321-19••••', dur: '3:02', outcome: 'rescheduled', lang: 'اردو' },
  { t: '18:41:12', agent: 'عائشہ', num: '0345-62••••', dur: '1:47', outcome: 'confirmed', lang: 'اردو' },
  { t: '18:40:48', agent: 'حسن', num: '0311-73••••', dur: '4:26', outcome: 'escalated', lang: 'اردو + English' },
  { t: '18:40:19', agent: 'زینب', num: '0308-55••••', dur: '2:51', outcome: 'confirmed', lang: 'اردو' },
  { t: '18:39:57', agent: 'بلال', num: '0347-28••••', dur: '0:41', outcome: 'cancelled', lang: 'اردو' },
  { t: '18:39:33', agent: 'کامران', num: '0302-94••••', dur: '3:38', outcome: 'confirmed', lang: 'اردو + English' },
];

// Pools the client ticker draws from to fabricate the next call.
export const FEED_POOL = {
  agents: ['حسن', 'بلال', 'فاطمہ', 'عائشہ', 'زینب', 'مس ثناء', 'کامران', 'ڈاکٹر سعد'],
  prefixes: ['0300', '0301', '0308', '0311', '0321', '0333', '0345', '0347'],
  // Weighted to match the outcome mix above.
  outcomes: [
    'confirmed', 'confirmed', 'confirmed', 'confirmed', 'confirmed', 'confirmed',
    'rescheduled', 'rescheduled',
    'escalated', 'escalated',
    'cancelled',
  ],
  langs: ['اردو', 'اردو', 'اردو', 'اردو + English', 'پشتو'],
};

export const DASH_DISCLOSURE =
  'Sample data. This is the same dashboard shape we ship with a live deployment — every row is written from the agent’s own transcript and outcome, so the system answering the phone is also the system reporting on it.';
