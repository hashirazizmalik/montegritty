// The call behind the "watch it work" band on the home page.
//
// ---------------------------------------------------------------------------
// THE VOICE
//
// Each line names the file that speaks it, in public/voice/at-work/. The
// section plays them in order and advances when each file ends, so the pacing
// comes from the recordings themselves. `hold` is the silent fallback only, and
// is kept in step with the real durations so the two modes pace alike.
//
// REPLACING A LINE. Drop the new file in at the same path, then:
//   - trim silence off both ends. The section advances the instant a file
//     ends, so trailing silence shows up as the transcript freezing mid-call;
//     one of the original recordings had 0.9s of it.
//   - level-match it against the others (loudnorm I=-16) and encode mono
//     22.05k, matching the rest of the site's audio.
//   - update `ur` and `en` if the wording changed, and `hold` to the new
//     duration. A transcript that disagrees with the audio is worse than none.
// ---------------------------------------------------------------------------
//
// The whole point of this sequence is CAUSALITY: a line of speech on the left
// fires a piece of work on the right, at the same moment. That pairing is the
// argument — an agent that only talked would leave the right-hand column empty.
// So when you edit a line, keep its `action` attached to the line that would
// actually trigger it. A line with no `action` is the agent talking; a line
// with one is the agent working.

/**
 * Flip to true once all eight files are in public/voice/at-work/.
 *
 * While false the band runs silently on the `hold` timings, which is why the
 * page is never broken between recordings. While true it plays the real audio
 * and waits for each file to finish, so a missing file would stall the
 * sequence — hence the switch rather than guessing from the filenames.
 */
export const VOICED = true;

export const CALL_META = {
  agent: { name: 'Ayesha', role: 'Clinic receptionist', initials: 'ع' },
  caller: { name: 'Fatima Bibi', role: 'Patient', initials: 'ف' },
  context: 'Outbound · appointment confirmation · Urdu',
};

export const BEATS = [
  {
    who: 'agent',
    audio: '/voice/at-work/01-agent.mp3',
    hold: 3.9,
    ur: 'السلام علیکم، میں عائشہ بات کر رہی ہوں شفا کلینک سے۔',
    en: 'Hello, this is Ayesha calling from Shifa Clinic.',
  },
  {
    who: 'agent',
    audio: '/voice/at-work/02-agent.mp3',
    hold: 5.0,
    ur: 'آپ کی کل ڈاکٹر فرحان کے ساتھ اپائنٹمنٹ ہے۔ کیا آپ آ رہی ہیں؟',
    en: 'You have an appointment tomorrow with Dr. Farhan. Will you be attending?',
    action: {
      id: 'lookup',
      mode: 'read',
      system: 'Clinic HMS',
      label: 'Patient record',
      note: 'Pulled before the question was asked',
      fields: [
        ['Patient', 'Fatima Bibi'],
        ['MR number', 'MR-40928'],
        ['Booked', 'Wed 09:30 · Dr. Farhan'],
        ['Last visit', '14 Feb 2026'],
      ],
    },
  },
  {
    who: 'caller',
    audio: '/voice/at-work/03-caller.mp3',
    hold: 5.2,
    ur: 'جی، لیکن کل مشکل ہے۔ کوئی اور دن مل سکتا ہے؟',
    en: 'Yes, but tomorrow is difficult. Could I get another day?',
  },
  {
    who: 'agent',
    audio: '/voice/at-work/04-agent.mp3',
    hold: 5.9,
    ur: 'بالکل۔ ایک لمحہ، میں ڈاکٹر صاحب کا شیڈول دیکھتی ہوں۔',
    en: 'Of course. One moment, let me check the doctor\'s schedule.',
    action: {
      id: 'schedule',
      mode: 'read',
      system: 'Doctor scheduling',
      label: "Dr. Farhan's availability",
      note: 'Live, not a cached copy',
      schedule: {
        days: ['Wed', 'Thu', 'Fri'],
        times: ['09:30', '11:00', '14:00', '16:30'],
        // one entry per time row, per day column
        slots: [
          ['booked', 'booked', 'booked'],
          ['booked', 'target', 'booked'],
          ['booked', 'booked', 'booked'],
          ['booked', 'booked', 'held'],
        ],
      },
    },
  },
  {
    who: 'agent',
    audio: '/voice/at-work/05-agent.mp3',
    hold: 5.4,
    ur: 'جمعرات صبح گیارہ بجے خالی ہے۔ کیا یہ ٹھیک رہے گا؟',
    en: 'Thursday at 11am is free. Would that work for you?',
  },
  {
    who: 'caller',
    audio: '/voice/at-work/06-caller.mp3',
    hold: 1.5,
    ur: 'جی، بالکل ٹھیک ہے۔',
    en: 'Yes, that works.',
  },
  {
    who: 'agent',
    audio: '/voice/at-work/07-agent.mp3',
    hold: 5.2,
    ur: 'ہو گیا۔ جمعرات گیارہ بجے آپ کی اپائنٹمنٹ محفوظ کر دی ہے۔',
    en: "Done. I've moved your appointment to Thursday at 11.",
    action: {
      id: 'book',
      mode: 'write',
      system: 'Clinic HMS',
      label: 'Appointment moved',
      note: 'Old slot released to the waitlist',
      fields: [
        ['Cancelled', 'Wed 09:30'],
        ['Booked', 'Thu 11:00'],
        ['Slot freed', 'Offered to waitlist'],
      ],
    },
  },
  {
    who: 'agent',
    audio: '/voice/at-work/08-agent.mp3',
    hold: 4.1,
    ur: 'آپ کو تصدیقی پیغام بھیج دیا ہے۔ شکریہ!',
    en: "I've sent you a confirmation message. Thank you!",
    action: {
      id: 'record',
      mode: 'write',
      system: 'Clinic HMS · WhatsApp',
      label: 'Outcome written back',
      note: 'Before the caller hung up',
      fields: [
        ['Call outcome', 'Rescheduled'],
        ['Transcript', 'Attached to record'],
        ['Confirmation', 'Sent on WhatsApp'],
      ],
    },
  },
];

// Shown once the sequence completes, before it loops.
export const CALL_SUMMARY = {
  headline: 'Call ended',
  stats: [
    { value: '4', label: 'system actions' },
    { value: '2', label: 'systems touched' },
    { value: '0', label: 'staff involved' },
  ],
  note: 'Nothing was left for the front desk to type up afterwards.',
};

export const SECTION = {
  eyebrow: 'Watch it work',
  heading: ['It is not answering the phone. ', 'It is doing the job.'],
  lede:
    'The call on the left. What it is doing inside your systems on the right, at the same moment.',
  // Say exactly what this is. The voices are ours and the words are really
  // being spoken, but the call was scripted rather than overheard, and the
  // panel on the right illustrates the integration work rather than replaying
  // a log from a live deployment. Claiming either of those would be the kind
  // of overstatement the rest of the site is careful to avoid.
  disclosure:
    'A scripted call, voiced by our own agent. The systems panel illustrates the integration work an agent does during a call; it is not a log from a live deployment. The eight agents on the demos page are full recorded calls.',
};
