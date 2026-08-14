/**
 * Deep copy for the three vertical pages.
 *
 * Weighted deliberately: healthcare leads because that is where the live
 * institutional work is and where the literacy gap bites hardest. Banking and
 * telecom are absent on purpose — both are already crowded with BPO vendors and
 * we have no edge there.
 *
 * Every figure here is sourced on the home page's market band. Impact numbers
 * are modelled targets, and the pages say so.
 */
export const VERTICAL_PAGES = {
  healthcare: {
    eyebrow: 'Healthcare',
    heading: ['The patients hardest to reach are the ones ', 'least able to read'],
    lede:
      'Clinics, hospitals, labs and diagnostic centres run on phone calls that nobody has time to make. An agent that speaks Urdu makes all of them — confirming, reminding, rescheduling and following up — and reaches the patients an SMS never did.',
    stat: { value: '19–43%', label: 'of outpatient appointments are no-shows' },
    calls: [
      {
        name: 'Appointment confirmation',
        body: 'Calls the day before, confirms in spoken Urdu, reschedules on the spot against live availability, and back-fills the freed slot from the waitlist. Every empty chair is a consultant hour billed to nobody.',
        demo: 'ayesha-clinic',
      },
      {
        name: 'Pre-arrival intake',
        body: 'Collects what reception would otherwise collect at the desk — reason for visit, documents to bring, fasting instructions before bloods — so the patient arrives ready and the queue moves.',
      },
      {
        name: 'Chronic care follow-up',
        body: 'Structured weekly check-ins for diabetes, hypertension and post-discharge care. Captures self-reported readings, screens for red-flag symptoms, and escalates a deteriorating patient to a clinician with a summary.',
        demo: 'saad-chroniccare',
      },
      {
        name: 'Results and recall',
        body: 'Tells patients a report is ready and books the follow-up. It never reads a result aloud — that is a clinician\'s job, and the agent is instructed to say so.',
      },
    ],
    guardrails: [
      'The agent is not a clinician. It never diagnoses, never interprets a result, and never advises on medication.',
      'Anything urgent ends the call with a clear instruction to attend emergency.',
      'Deployable self-hosted, so recordings and transcripts never leave the hospital network.',
      'Every call transcribed and retained on your retention policy, not ours.',
    ],
    close: 'Fill the chair, then prove you filled it.',
  },

  education: {
    eyebrow: 'Education',
    heading: ['Reach the parent, ', 'not the schoolbag'],
    lede:
      'Schools lose weeks of administrative time chasing absences and unpaid fees, and printed circulars sent home in schoolbags never arrive. An agent calls the same evening, in the language the parent speaks, and writes every answer back into the school system.',
    stat: { value: '52.8%', label: 'female literacy nationally — a printed note is not a channel' },
    calls: [
      {
        name: 'Absence follow-up',
        body: 'Calls the evening a child is absent, records the reason, marks medical leave, and flags a pattern before it becomes a dropout rather than after.',
        demo: 'sana-school',
      },
      {
        name: 'Fee reminders',
        body: 'States the amount, the month and the due date, offers the payment options, and captures hardship quietly instead of escalating it. It never discusses arrears with the child.',
      },
      {
        name: 'Admissions enquiries',
        body: 'Handles admission season without three extra people on the phones — criteria, fee structure, test dates — and books campus visits straight into the calendar.',
      },
      {
        name: 'Meetings and notices',
        body: 'Parent-teacher meetings, exam schedules, closures. One call reaches the parent who does not read the WhatsApp group.',
      },
    ],
    guardrails: [
      'Grades, behaviour and comparisons with other students are never discussed on the phone.',
      'Fee conversations are never conducted with or in front of a student.',
      'Written back into your school ERP, so the office is not re-keying anything.',
      'Recordings retained or discarded on your policy.',
    ],
    close: 'Every parent reached, the same evening.',
  },

  'front-desk': {
    eyebrow: 'Front desk',
    heading: ['The call that rings ', 'a thousand times a week'],
    lede:
      'Order confirmations, bookings, enquiries and reminders are all the same shape of problem: a high-volume, repetitive call that a person is too expensive to keep answering and too slow to answer fast enough.',
    stat: { value: '1 in 5', label: 'cash-on-delivery parcels comes back undelivered' },
    calls: [
      {
        name: 'Order confirmation',
        body: 'Calls every cash-on-delivery order minutes after checkout, reads it back, confirms the address and that cash will be ready, and catches hoax orders before they enter the courier network.',
        demo: 'bilal-cod',
      },
      {
        name: 'Lead qualification',
        body: 'Dials an inbound enquiry within a minute of the form, qualifies on budget, financing and timeline, and books only the serious ones into a calendar.',
        demo: 'kamran-leads',
      },
      {
        name: 'Bookings and reservations',
        body: 'Takes and confirms appointments for salons, restaurants and workshops, reconfirms the day before, and releases the slot when nobody answers twice.',
      },
      {
        name: 'Support and status',
        body: 'The five questions that make up most of a support queue — where is my order, what is my balance, is there an outage — answered on the first ring.',
        demo: 'hassan-support',
      },
    ],
    guardrails: [
      'Never pressures anyone into keeping an order or a booking.',
      'Reads prices and totals only from your system, never from memory.',
      'Hands to a human on anything involving a refund, a complaint or an angry caller.',
      'Every outcome written back to your order feed or CRM.',
    ],
    close: 'Answer everything, chase nothing.',
  },
};
