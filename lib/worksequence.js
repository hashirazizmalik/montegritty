// The scripted call behind the "watch it work" band on the home page.
//
// PLACEHOLDER TRANSCRIPT. These lines are written, not recorded — swap `ur`
// and `en` for a real call when one is captured, and adjust `hold` so each line
// lasts roughly as long as it takes to say. Nothing else needs to change.
//
// The whole point of this sequence is CAUSALITY: a line of speech on the left
// fires a piece of work on the right, at the same moment. That pairing is the
// argument — an agent that only talked would leave the right-hand column empty.
// So when you edit a line, keep its `action` attached to the line that would
// actually trigger it. A line with no `action` is the agent talking; a line
// with one is the agent working.
//
// `hold` is seconds that beat stays on screen before the next one.

export const CALL_META = {
  agent: { name: 'Ayesha', role: 'Clinic receptionist', initials: 'ع' },
  caller: { name: 'Fatima Bibi', role: 'Patient', initials: 'ف' },
  context: 'Outbound · appointment confirmation · Urdu',
};

export const BEATS = [
  {
    who: 'agent',
    hold: 3.4,
    ur: 'السلام علیکم، میں عائشہ بات کر رہی ہوں شفا کلینک سے۔',
    en: 'Hello, this is Ayesha calling from Shifa Clinic.',
  },
  {
    who: 'agent',
    hold: 4.2,
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
    hold: 3.8,
    ur: 'جی، لیکن کل مشکل ہے۔ کوئی اور دن مل سکتا ہے؟',
    en: 'Yes, but tomorrow is difficult. Could I get another day?',
  },
  {
    who: 'agent',
    hold: 4.6,
    ur: 'بالکل۔ ایک لمحہ — میں ڈاکٹر صاحب کا شیڈول دیکھتی ہوں۔',
    en: 'Of course. One moment — let me check the doctor\'s schedule.',
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
    hold: 4.0,
    ur: 'جمعرات صبح گیارہ بجے خالی ہے۔ کیا یہ ٹھیک رہے گا؟',
    en: 'Thursday at 11am is free. Would that work for you?',
  },
  {
    who: 'caller',
    hold: 2.6,
    ur: 'جی، بالکل ٹھیک ہے۔',
    en: 'Yes, that works.',
  },
  {
    who: 'agent',
    hold: 4.4,
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
    hold: 4.2,
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
    'On the left, the call. On the right, what the agent is doing inside your systems while it speaks — reading the record, checking the doctor\'s live schedule, moving the booking and writing the outcome back.',
  disclosure:
    'Illustrative sequence with a scripted transcript. The eight agents on the demos page are real recorded calls.',
};
