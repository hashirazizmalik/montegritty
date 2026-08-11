// The voice roster we are willing to put in front of a client.
//
// Uplift's full catalogue is 82 voices and much of it is deliberately theatrical
// — comedy aunties, street vendors, horror narrators, lovesick teenagers. Those
// exist for entertainment work and are actively harmful on a business call: a
// customer who hears a caricature answer the phone assumes the company is a
// joke. This file is the allowlist. Nothing outside it should ever be assigned
// to a template, offered by the studio builder, or accepted by the API.
//
// Selection rules:
//   - Every voice must sound like a competent adult doing a job.
//   - Female voices are professional registers only — no teenager, socialite,
//     gossip or "intimate late-night" characters.
//   - Regional variety is kept, because reach in Pakistan depends on it, but
//     always through a dignified register rather than a comic one.

export const VOICES = [
  // ---------------------------------------------------------------- female
  { id: 'helpdesk-agent', gender: 'female', label: 'Patient, empathetic — general support' },
  { id: 'sindhi-professional', gender: 'female', label: 'Composed, contemporary — admin & finance' },
  { id: 'bengali-businesswoman', gender: 'female', label: 'Assured professional — sales & advisory' },
  { id: 'memon-organizer', gender: 'female', label: 'Capable and warm — operations & scheduling' },
  { id: 'paediatrician', gender: 'female', label: 'Warm, authoritative — healthcare' },
  { id: 'family-lawyer', gender: 'female', label: 'Authoritative advocate — legal' },
  { id: 'montessori-teacher', gender: 'female', label: 'Warm but firm — education' },
  { id: 'pashtun-woman', gender: 'female', label: 'Pragmatic community voice — field outreach' },
  { id: 'news-anchor', gender: 'female', label: 'Sharp, broadcast-ready — announcements' },
  { id: 'news-reader', gender: 'female', label: 'Measured newsreader — bulletins' },
  { id: 'female-narrator', gender: 'female', label: 'Balanced documentary narration' },
  { id: 'dha-hostess', gender: 'female', label: 'Polished and composed — hospitality' },

  // ------------------------------------------------------------------ male
  { id: 'broadband-support', gender: 'male', label: 'Polished, methodical — technical support' },
  { id: 'sindhi-networker', gender: 'male', label: 'Friendly and clear — general service' },
  { id: 'punjabi-manager', gender: 'male', label: 'Steady mid-career — sales & management' },
  { id: 'wholesale-trader', gender: 'male', label: 'Steady professional — trade & logistics' },
  { id: 'memon-trader', gender: 'male', label: 'Methodical — orders & stock' },
  { id: 'shopkeeper', gender: 'male', label: 'Friendly and warm — retail & orders' },
  { id: 'diabetologist', gender: 'male', label: 'Educational clinician — healthcare' },
  { id: 'defense-advocate', gender: 'male', label: 'Methodical, precise — legal & verification' },
  { id: 'stock-analyst', gender: 'male', label: 'Measured, financial' },
  { id: 'urdu-professor', gender: 'male', label: 'Erudite academic — teaching' },
  { id: 'podcast-host', gender: 'male', label: 'Reflective, unhurried — long conversations' },
  { id: 'crisp-storyteller', gender: 'male', label: 'Contemplative narrator — storytelling' },
  { id: 'male-narrator', gender: 'male', label: 'Authoritative documentary narration' },
  { id: 'senior-anchor', gender: 'male', label: 'Balanced news delivery' },
  { id: 'prime-time-anchor', gender: 'male', label: 'Broadcast news anchor' },
  { id: 'seerah-scholar', gender: 'male', label: 'Scholarly authority — religious education' },
];

export const DEFAULT_VOICE = 'helpdesk-agent';

const IDS = new Set(VOICES.map((v) => v.id));

/** True only for voices on the allowlist above. */
export const isApprovedVoice = (id) => IDS.has(id);

/** Falls back to the default rather than letting an unvetted voice through. */
export const safeVoice = (id) => (IDS.has(id) ? id : DEFAULT_VOICE);

export const voiceLabel = (id) => VOICES.find((v) => v.id === id)?.label || '';

/** The menu the studio builder chooses from, as plain text for its prompt. */
export const voiceMenuText = () =>
  VOICES.map((v) => `${v.id} (${v.gender}) — ${v.label}`).join('\n');
