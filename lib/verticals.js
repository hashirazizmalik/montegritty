/**
 * Deep copy for the three vertical pages.
 *
 * Weighted deliberately: healthcare leads because that is where the live
 * institutional work is and where the literacy gap bites hardest. Banking and
 * telecom are absent on purpose — both are already crowded with BPO vendors.
 *
 * Every `body` describes an ACTION the agent takes, not a topic it can discuss.
 * If a call description could equally describe a recorded message, rewrite it.
 *
 * `faq` renders as question-led H3s with a direct answer first, and is emitted
 * as FAQPage structured data. Keep answers to 40–60 words: that is the length
 * search and answer engines lift verbatim.
 *
 * Figures are sourced on the home page's market band. Impact numbers are
 * modelled targets, and the pages say so.
 */
export const VERTICAL_PAGES = {
  healthcare: {
    eyebrow: 'Healthcare',
    heading: ['The patients hardest to reach are the ones ', 'least able to read'],
    lede:
      'An agent that speaks Urdu calls the patient, confirms the appointment, rebooks it against live availability and updates the record — without anyone at the desk touching it.',
    stat: { value: '19–43%', label: 'of outpatient appointments are no-shows' },
    calls: [
      {
        name: 'Appointment confirmation',
        body: 'Calls the day before, confirms in spoken Urdu, and reschedules on the spot against live availability — then back-fills the freed slot from the waitlist.',
        demo: 'ayesha-clinic',
      },
      {
        name: 'Pre-arrival intake',
        body: 'Collects what reception would collect at the desk — reason for visit, documents to bring, fasting instructions — and files it before the patient arrives.',
      },
      {
        name: 'Chronic care follow-up',
        body: 'Weekly check-ins for diabetes, hypertension and post-discharge care. Captures self-reported readings and escalates a deteriorating patient to a clinician with a summary.',
        demo: 'saad-chroniccare',
      },
      {
        name: 'Results and recall',
        body: 'Tells patients a report is ready and books the follow-up. It never reads a result aloud — that is a clinician\'s job, and the agent says so.',
      },
    ],
    guardrails: [
      'The agent is not a clinician. It never diagnoses, interprets a result, or advises on medication.',
      'Anything urgent ends the call with a clear instruction to attend emergency.',
      'Deployable self-hosted, so recordings never leave the hospital network.',
      'Every call transcribed and retained on your policy, not ours.',
    ],
    faq: [
      {
        q: 'How do you reduce patient no-shows?',
        a: 'The agent calls every booked patient the day before, confirms in spoken Urdu, and reschedules immediately if they cannot attend. The freed slot is offered to the waitlist on the same call cycle. Reaching patients by voice works where SMS reminders fail, because it does not require the patient to read.',
      },
      {
        q: 'Can an AI agent book and cancel appointments in our system?',
        a: 'Yes. The agent reads live availability from your hospital or clinic management system during the call, books or moves the appointment, and writes the outcome back before hanging up. It is not taking a message for reception to process later.',
      },
      {
        q: 'Is it safe to use a voice agent with patient data?',
        a: 'It can be deployed entirely on your own servers using self-hosted open-source speech models, so no recording or transcript reaches a third party. Integrations are scoped to the specific fields a call needs — an appointment agent sees a calendar, never a patient record.',
      },
    ],
    close: 'Fill the chair, then prove you filled it.',
  },

  education: {
    eyebrow: 'Education',
    heading: ['Reach the parent, ', 'not the schoolbag'],
    lede:
      'The agent calls the same evening a child is absent, records the reason in the parent\'s own language, folds in the fee reminder, and writes both into your school system.',
    stat: { value: '52.8%', label: 'female literacy nationally — a printed note is not a channel' },
    calls: [
      {
        name: 'Absence follow-up',
        body: 'Calls the evening a child is absent, records the reason, marks medical leave, and flags a pattern before it becomes a dropout.',
        demo: 'sana-school',
      },
      {
        name: 'Fee reminders',
        body: 'States the amount, month and due date, offers the payment options, and logs hardship quietly instead of escalating it. Never discusses arrears with the child.',
      },
      {
        name: 'Admissions enquiries',
        body: 'Handles admission season without three extra people on the phones, and books campus visits straight into the calendar.',
      },
      {
        name: 'Meetings and notices',
        body: 'Parent-teacher meetings, exam schedules, closures. One call reaches the parent who does not read the WhatsApp group.',
      },
    ],
    guardrails: [
      'Grades, behaviour and comparisons with other students are never discussed on the phone.',
      'Fee conversations are never conducted with or in front of a student.',
      'Written back into your school ERP, so the office re-keys nothing.',
      'Recordings retained or discarded on your policy.',
    ],
    faq: [
      {
        q: 'Can a voice agent update our school management system?',
        a: 'Yes. The absence reason, fee response and any callback request are written directly into your school ERP during the call. The office sees the record already updated rather than a list of calls somebody still has to type up.',
      },
      {
        q: 'What happens if the parent cannot read or write?',
        a: 'Nothing changes. The entire exchange is spoken Urdu, so literacy is never required at any point. This is the reason voice works in Pakistani schools where printed circulars and SMS reminders do not reach a large share of parents.',
      },
      {
        q: 'Will it chase parents aggressively over fees?',
        a: 'No. The agent states the amount, month and due date once, offers the payment options, and logs the response. It never pressures, never repeats within the same day, and never discusses money with or in front of a student.',
      },
    ],
    close: 'Every parent reached, the same evening.',
  },

  'front-desk': {
    eyebrow: 'Front desk',
    heading: ['The call that rings ', 'a thousand times a week'],
    lede:
      'Order confirmations, bookings and enquiries are the same shape of problem: high-volume, repetitive calls a person is too expensive to keep answering. The agent answers them and updates the order.',
    stat: { value: '1 in 5', label: 'cash-on-delivery parcels comes back undelivered' },
    calls: [
      {
        name: 'Order confirmation',
        body: 'Calls every COD order minutes after checkout, reads it back, confirms the address and that cash will be ready — then flags hoax orders before they enter the courier network.',
        demo: 'bilal-cod',
      },
      {
        name: 'Lead qualification',
        body: 'Dials an inbound enquiry within a minute of the form, qualifies on budget and timeline, and books only the serious ones into a calendar.',
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
      'Hands to a human on any refund, complaint or angry caller.',
      'Every outcome written back to your order feed or CRM.',
    ],
    faq: [
      {
        q: 'What is a COD confirmation call and does it reduce RTO?',
        a: 'It is a call placed minutes after a cash-on-delivery order, confirming the item, address and that cash will be ready on delivery. It catches wrong addresses and hoax orders before the parcel enters the courier network, which is where most return-to-origin cost is created.',
      },
      {
        q: 'Can the agent update our Shopify or WooCommerce orders?',
        a: 'Yes. It reads the order during the call and writes the outcome — confirmed, cancelled, address corrected, reschedule requested — straight back to your store or order feed. Your fulfilment team works from an updated list, not a call log.',
      },
      {
        q: 'How fast does it call a new lead?',
        a: 'Within about a minute of the form being submitted, at any hour. Speed is the whole point: a property or vehicle enquiry in Pakistan typically goes cold within an afternoon, and the first business to call back usually wins the conversation.',
      },
    ],
    close: 'Answer everything, chase nothing.',
  },
};
