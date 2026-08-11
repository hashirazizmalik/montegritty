// GENERATED FILE — do not edit by hand.
// Source: tools/voice-agents/{agents,translations}.py + timings.json
// Regenerate: cd tools/voice-agents && python3 export_js.py
//
// Each agent carries its full bilingual transcript and the start time of
// every turn, measured from the generated audio — that's what lets the
// transcript on the site seek and highlight in sync.

export const AGENTS = [
  {
    "id": "hassan-support",
    "name": "Hassan",
    "role": "Tier-1 Customer Support",
    "vertical": "Telecom & Internet Service Providers",
    "voice": "broadband-support",
    "peerVoice": "nazimabad-boy",
    "tagline": "Handles the 70% of calls that are the same five questions.",
    "problem": "ISPs and telcos in Pakistan drown in repetitive Tier-1 volume: outage checks, bill queries, package changes, router resets. Agents cost PKR 60k–120k/month, turnover runs above 40%, and peak-hour queues push customers to churn.",
    "solution": "Hassan answers every inbound call instantly in Urdu, English or code-mixed speech. He authenticates the caller, checks live outage and billing systems through tools, resolves what he can, and hands the rest to a human with a full transcript attached.",
    "kpis": [
      {
        "label": "Call deflection",
        "value": "70–85%",
        "note": "of Tier-1 volume never reaches a human"
      },
      {
        "label": "Answer time",
        "value": "< 2 sec",
        "note": "no hold music, no queue, 24/7"
      },
      {
        "label": "Cost per call",
        "value": "~PKR 12",
        "note": "vs ~PKR 95 fully-loaded human cost"
      }
    ],
    "integrations": [
      "Asterisk / FreePBX / Twilio SIP",
      "CRM (Zoho, Salesforce, custom)",
      "Billing & OSS APIs",
      "WhatsApp Business API",
      "Zendesk / Freshdesk"
    ],
    "pricing": {
      "setup": "PKR 450,000",
      "monthly": "PKR 180,000",
      "included": "10,000 min/mo",
      "overage": "PKR 14 / min"
    },
    "greeting": "السلام علیکم، میں حسن بات کر رہا ہوں سائبر نیٹ کسٹمر سپورٹ سے۔ میں آپ کی کیا مدد کر سکتا ہوں؟",
    "duration": 55.27,
    "call": "/voice/hassan-support_call.mp3",
    "greetingAudio": "/voice/hassan-support_greeting.mp3",
    "portrait": "/agents/hassan-support.webp",
    "thumb": "/agents/hassan-support-thumb.webp",
    "turns": [
      {
        "who": "peer",
        "ur": "ہیلو؟ بھائی میرا انٹرنیٹ صبح سے بند پڑا ہے۔ راؤٹر پر بس لال بتی جل رہی ہے۔",
        "en": "Hello? My internet has been down since morning. There's just a red light on the router.",
        "at": 0.0
      },
      {
        "who": "agent",
        "ur": "السلام علیکم، میں حسن بات کر رہا ہوں سائبر نیٹ کسٹمر سپورٹ سے۔ آپ کی پریشانی میں سمجھ گیا ہوں۔ آپ کا اکاؤنٹ نمبر تین، چار، دو، نو ہے، درست؟",
        "en": "Assalam-o-alaikum, this is Hassan from CyberNet customer support. I understand the problem. Your account number is three, four, two, nine — is that correct?",
        "at": 6.8
      },
      {
        "who": "peer",
        "ur": "جی ہاں، بالکل درست ہے۔",
        "en": "Yes, that's right.",
        "at": 17.1
      },
      {
        "who": "agent",
        "ur": "شکریہ۔ میں نے ابھی آپ کے علاقے کا لائیو سٹیٹس دیکھا ہے۔ ڈیفنس فیز فور میں فائبر کیبل کٹ گئی تھی، مرمت کا کام جاری ہے اور شام چھ بجے تک بحالی متوقع ہے۔",
        "en": "Thank you. I've just checked the live status for your area. A fibre cable was cut in DHA Phase Four; repair work is under way and service is expected back by six this evening.",
        "at": 20.12
      },
      {
        "who": "peer",
        "ur": "یار، سارا دن ضائع ہو گیا۔",
        "en": "Come on, the whole day is wasted.",
        "at": 31.15
      },
      {
        "who": "agent",
        "ur": "بالکل درست کہہ رہے ہیں، معذرت خواہ ہوں۔ میں نے دو کام کر دیے ہیں۔ پہلا، آپ کے نمبر پر الرٹ لگا دیا ہے، سروس بحال ہوتے ہی آپ کو ایس ایم ایس موصول ہو جائے گا۔ دوسرا، آپ کے اگلے بل میں ایک دن کا کریڈٹ ایڈجسٹ کر دیا ہے۔",
        "en": "You're absolutely right, and I apologise. I've done two things. First, I've set an alert on your number — you'll get an SMS the moment service is restored. Second, I've adjusted a one-day credit onto your next bill.",
        "at": 34.53
      },
      {
        "who": "peer",
        "ur": "اچھا، یہ ٹھیک ہے۔ شکریہ۔",
        "en": "Alright, that's fine. Thank you.",
        "at": 47.45
      },
      {
        "who": "agent",
        "ur": "آپ کا شکریہ۔ کوئی اور مدد درکار ہو تو بلا جھجک رابطہ کیجیے۔ اللہ حافظ۔",
        "en": "Thank you. If you need anything else, don't hesitate to call. Allah hafiz.",
        "at": 50.46
      }
    ]
  },
  {
    "id": "ayesha-clinic",
    "name": "Ayesha",
    "role": "Appointment & No-Show Desk",
    "vertical": "Hospitals, Clinics & Diagnostic Labs",
    "voice": "helpdesk-agent",
    "peerVoice": "punjabi-masi",
    "tagline": "Fills the empty chair. Confirms, reschedules and preps every patient.",
    "problem": "Outpatient no-show rates run 19–43%. Every empty slot is a consultant hour billed to nobody. Front-desk staff cannot call 400 patients a day, and SMS reminders are useless to the ~37% of adults who cannot read them.",
    "solution": "Ayesha calls every patient the day before, confirms in spoken Urdu, reschedules on the spot against live calendar availability, delivers prep instructions (fasting, reports, documents), and back-fills cancelled slots from the waitlist automatically.",
    "kpis": [
      {
        "label": "No-show reduction",
        "value": "38%",
        "note": "measured against SMS-only baseline"
      },
      {
        "label": "Slot recovery",
        "value": "+11 hrs",
        "note": "consultant hours reclaimed per week"
      },
      {
        "label": "Reach",
        "value": "100%",
        "note": "works for non-literate patients — voice, not text"
      }
    ],
    "integrations": [
      "HMS / EMR (Oladoc, Marham, custom)",
      "Google & Outlook Calendar",
      "WhatsApp confirmations",
      "SMS gateway fallback",
      "Lab LIS systems"
    ],
    "pricing": {
      "setup": "PKR 300,000",
      "monthly": "PKR 95,000",
      "included": "6,000 calls/mo",
      "overage": "PKR 18 / call"
    },
    "greeting": "السلام علیکم، میں عائشہ بول رہی ہوں شفا کلینک سے۔ آپ کی اپائنٹمنٹ کے سلسلے میں رابطہ کر رہی ہوں۔",
    "duration": 59.09,
    "call": "/voice/ayesha-clinic_call.mp3",
    "greetingAudio": "/voice/ayesha-clinic_greeting.mp3",
    "portrait": "/agents/ayesha-clinic.webp",
    "thumb": "/agents/ayesha-clinic-thumb.webp",
    "turns": [
      {
        "who": "agent",
        "ur": "السلام علیکم، میں عائشہ بول رہی ہوں شفا کلینک سے۔ کیا میری بات محترمہ ثمینہ صاحبہ سے ہو رہی ہے؟",
        "en": "Assalam-o-alaikum, this is Ayesha from Shifa Clinic. Am I speaking with Mrs. Samina?",
        "at": 0.0
      },
      {
        "who": "peer",
        "ur": "جی بیٹا، ثمینہ بات کر رہی ہوں۔",
        "en": "Yes beta, this is Samina.",
        "at": 6.75
      },
      {
        "who": "agent",
        "ur": "جی، آپ کی کل صبح گیارہ بجے ڈاکٹر فرحان کے ساتھ اپائنٹمنٹ ہے۔ میں صرف تصدیق کرنا چاہتی تھی کہ آپ تشریف لا رہی ہیں؟",
        "en": "You have an appointment with Dr. Farhan tomorrow at eleven in the morning. I just wanted to confirm you'll be coming.",
        "at": 9.97
      },
      {
        "who": "peer",
        "ur": "ہائے بیٹا، کل تو بہت مشکل ہے۔ گھر میں مہمان آ رہے ہیں۔ کوئی اور دن ہو سکتا ہے؟",
        "en": "Oh beta, tomorrow is very difficult. We have guests coming. Could it be another day?",
        "at": 16.65
      },
      {
        "who": "agent",
        "ur": "جی بالکل، کوئی مسئلہ نہیں۔ میں ابھی دیکھتی ہوں۔ جمعرات کو دوپہر ساڑھے تین بجے ڈاکٹر صاحب کے پاس وقت خالی ہے۔ کیا میں وہ آپ کے لیے محفوظ کر دوں؟",
        "en": "Of course, no problem at all. Let me check — Dr. Farhan has an opening on Thursday at half past three in the afternoon. Shall I hold that for you?",
        "at": 23.37
      },
      {
        "who": "peer",
        "ur": "ہاں ہاں، جمعرات ٹھیک ہے۔",
        "en": "Yes yes, Thursday is fine.",
        "at": 32.63
      },
      {
        "who": "agent",
        "ur": "بہت بہتر۔ آپ کی اپائنٹمنٹ جمعرات، ساڑھے تین بجے کنفرم ہو گئی ہے۔ ایک ضروری بات: ڈاکٹر صاحب نے خون کا ٹیسٹ بھی لکھا ہے، اس لیے آنے سے آٹھ گھنٹے پہلے کچھ نہ کھائیں، صرف پانی پی سکتی ہیں۔",
        "en": "Excellent. Your appointment is confirmed for Thursday at three thirty. One important note: the doctor has also ordered a blood test, so please don't eat anything for eight hours before — water is fine.",
        "at": 35.41
      },
      {
        "who": "peer",
        "ur": "اچھا، یاد رکھوں گی۔",
        "en": "Alright, I'll remember.",
        "at": 46.99
      },
      {
        "who": "agent",
        "ur": "جی، اور میں تمام تفصیل آپ کے واٹس ایپ پر بھی بھیج رہی ہوں۔ بدھ کی شام یاد دہانی کے لیے دوبارہ کال کروں گی۔ اللہ آپ کو صحت دے، اللہ حافظ۔",
        "en": "I'm also sending all the details to your WhatsApp. I'll call again on Wednesday evening as a reminder. May Allah give you good health — Allah hafiz.",
        "at": 49.82
      }
    ]
  },
  {
    "id": "bilal-cod",
    "name": "Bilal",
    "role": "COD Order Confirmation",
    "vertical": "E-commerce & Q-commerce",
    "voice": "shopkeeper",
    "peerVoice": "college-girl",
    "tagline": "Kills fake orders before the courier ever picks up the parcel.",
    "problem": "Over 80% of Pakistani online orders are Cash on Delivery, and 18–20% nationally — up to 30–45% for weak stores — come back as Return-to-Origin. Every RTO burns two-way freight, packaging and locked-up inventory on a sale that never happened.",
    "solution": "Bilal calls every COD order within minutes of checkout. He reads the order back, verifies the address, confirms the buyer will have cash ready, and flags dead numbers and hoax orders before they enter the courier network. Confirmed orders get a WhatsApp receipt.",
    "kpis": [
      {
        "label": "RTO reduction",
        "value": "42%",
        "note": "typical drop in return-to-origin rate"
      },
      {
        "label": "Time to confirm",
        "value": "< 5 min",
        "note": "from checkout to verified order"
      },
      {
        "label": "Payback",
        "value": "~3 weeks",
        "note": "one avoided RTO pays for ~30 calls"
      }
    ],
    "integrations": [
      "Shopify / WooCommerce / Daraz",
      "TCS, Leopards, M&P, Trax, PostEx",
      "WhatsApp Business API",
      "Google Sheets / Airtable",
      "Custom order APIs"
    ],
    "pricing": {
      "setup": "PKR 150,000",
      "monthly": "PKR 60,000",
      "included": "8,000 calls/mo",
      "overage": "PKR 9 / call"
    },
    "greeting": "السلام علیکم! میں بلال بات کر رہا ہوں سٹائل باکس آن لائن سٹور سے، آپ کے آرڈر کی تصدیق کے لیے۔",
    "duration": 61.84,
    "call": "/voice/bilal-cod_call.mp3",
    "greetingAudio": "/voice/bilal-cod_greeting.mp3",
    "portrait": "/agents/bilal-cod.webp",
    "thumb": "/agents/bilal-cod-thumb.webp",
    "turns": [
      {
        "who": "agent",
        "ur": "السلام علیکم! میں بلال بات کر رہا ہوں سٹائل باکس آن لائن سٹور سے۔ آپ نے آج ہماری ویب سائٹ پر ایک آرڈر دیا تھا، اسی کی تصدیق کرنی تھی۔",
        "en": "Assalam-o-alaikum! This is Bilal from StyleBox online store. You placed an order on our website today — I'm calling to confirm it.",
        "at": 0.0
      },
      {
        "who": "peer",
        "ur": "جی جی، کالی ہوڈی والا آرڈر۔",
        "en": "Yes yes, the black hoodie order.",
        "at": 9.26
      },
      {
        "who": "agent",
        "ur": "بالکل درست۔ بلیک ہوڈی، سائز میڈیم، ایک عدد۔ کل رقم تین ہزار چار سو روپے، کیش آن ڈیلیوری۔ کیا میں یہ آرڈر کنفرم کر دوں؟",
        "en": "That's right. Black hoodie, size medium, quantity one. Total three thousand four hundred rupees, cash on delivery. Shall I confirm this order?",
        "at": 12.98
      },
      {
        "who": "peer",
        "ur": "جی ہاں، کنفرم کر دیں۔",
        "en": "Yes, please confirm it.",
        "at": 23.05
      },
      {
        "who": "agent",
        "ur": "شکریہ۔ ڈیلیوری ایڈریس ہے: فلیٹ نمبر بارہ، الف بلاک، گلشن اقبال بلاک تیرہ، کراچی۔ کیا یہ درست ہے؟",
        "en": "Thank you. The delivery address is Flat number twelve, Block A, Gulshan-e-Iqbal Block Thirteen, Karachi. Is that correct?",
        "at": 25.67
      },
      {
        "who": "peer",
        "ur": "ہاں بالکل، بس گیٹ نمبر دو سے آنا ہوگا۔",
        "en": "Yes, exactly — but you'll have to come through Gate number two.",
        "at": 36.31
      },
      {
        "who": "agent",
        "ur": "نوٹ کر لیا، گیٹ نمبر دو۔ رائیڈر کو یہ ہدایت پہنچا دی جائے گی۔ آپ کا آرڈر کنفرم ہو گیا ہے، دو سے تین کاروباری دن میں پہنچ جائے گا۔",
        "en": "Noted, Gate number two. I'll pass that instruction to the rider. Your order is confirmed and will arrive within two to three working days.",
        "at": 41.34
      },
      {
        "who": "peer",
        "ur": "ٹھیک ہے، شکریہ۔",
        "en": "Alright, thank you.",
        "at": 50.75
      },
      {
        "who": "agent",
        "ur": "برائے مہربانی ڈیلیوری کے وقت تین ہزار چار سو روپے تیار رکھیے گا۔ ٹریکنگ نمبر ابھی آپ کے واٹس ایپ پر آ رہا ہے۔ خریداری کا شکریہ، اللہ حافظ!",
        "en": "Please keep three thousand four hundred rupees ready at the time of delivery. Your tracking number is coming through on WhatsApp now. Thank you for shopping with us — Allah hafiz!",
        "at": 53.03
      }
    ]
  },
  {
    "id": "fatima-collections",
    "name": "Fatima",
    "role": "Payment Reminder & Soft Collections",
    "vertical": "Banks, Microfinance & Lending",
    "voice": "sindhi-professional",
    "peerVoice": "mohalla-patriarch",
    "tagline": "Every borrower called, every month — politely, compliantly, on record.",
    "problem": "Microfinance and consumer-lending books live or die on collection efficiency. Field recovery officers are expensive and cover a handful of borrowers a day; aggressive third-party collectors create regulatory and reputational risk that regulators now punish.",
    "solution": "Fatima calls the whole portfolio on a schedule — pre-due nudge, due-date reminder, graduated post-due follow-up. She offers digital payment rails, captures promise-to-pay dates, routes hardship cases to restructuring, and records every call for audit.",
    "kpis": [
      {
        "label": "Collection efficiency",
        "value": "+9 pts",
        "note": "on 1–30 day delinquency buckets"
      },
      {
        "label": "Cost per contact",
        "value": "PKR 11",
        "note": "vs PKR 400+ for a field visit"
      },
      {
        "label": "Compliance",
        "value": "100%",
        "note": "scripted, recorded, tone-controlled, fully auditable"
      }
    ],
    "integrations": [
      "Core banking / LMS",
      "Easypaisa, JazzCash, Raast payment links",
      "Credit bureau reporting",
      "Collections CRM",
      "IVR & SMS gateways"
    ],
    "pricing": {
      "setup": "PKR 600,000",
      "monthly": "PKR 250,000",
      "included": "25,000 calls/mo",
      "overage": "PKR 8 / call"
    },
    "greeting": "السلام علیکم، میں فاطمہ بول رہی ہوں اخوت مائیکرو فنانس کی جانب سے، ایک یاد دہانی کے لیے۔",
    "duration": 80.2,
    "call": "/voice/fatima-collections_call.mp3",
    "greetingAudio": "/voice/fatima-collections_greeting.mp3",
    "portrait": "/agents/fatima-collections.webp",
    "thumb": "/agents/fatima-collections-thumb.webp",
    "turns": [
      {
        "who": "agent",
        "ur": "السلام علیکم، میں فاطمہ بول رہی ہوں اخوت مائیکرو فنانس کی جانب سے۔ کیا میری بات جناب رمضان صاحب سے ہو رہی ہے؟",
        "en": "Assalam-o-alaikum, this is Fatima calling on behalf of Akhuwat Microfinance. Am I speaking with Mr. Ramzan?",
        "at": 0.0
      },
      {
        "who": "peer",
        "ur": "ہاں بھئی، رمضان بول رہا ہوں۔ بولو کیا بات ہے۔",
        "en": "Yes, Ramzan speaking. Go ahead, what is it?",
        "at": 9.15
      },
      {
        "who": "agent",
        "ur": "سر، یہ صرف ایک یاد دہانی کال ہے، کوئی پریشانی والی بات نہیں۔ آپ کی ماہانہ قسط سات ہزار پانچ سو روپے پندرہ تاریخ کو واجب الادا ہے، یعنی آج سے تین دن بعد۔",
        "en": "Sir, this is only a reminder call, nothing to worry about. Your monthly instalment of seven thousand five hundred rupees is due on the fifteenth — that's three days from today.",
        "at": 13.58
      },
      {
        "who": "peer",
        "ur": "دیکھو بیٹی، اس مہینے تھوڑی تنگی چل رہی ہے۔ دکان پر کام ہلکا ہے۔",
        "en": "Look beti, money is a bit tight this month. Business at the shop is slow.",
        "at": 26.68
      },
      {
        "who": "agent",
        "ur": "میں آپ کی بات سمجھ سکتی ہوں سر، اور آپ کا ریکارڈ اب تک بہت اچھا رہا ہے۔ آپ کے پاس دو آسان راستے ہیں۔ پہلا، آپ ایزی پیسہ یا جاز کیش سے گھر بیٹھے ادائیگی کر سکتے ہیں، برانچ آنے کی ضرورت نہیں۔",
        "en": "I understand, sir, and your record with us has been excellent so far. You have two easy options. First, you can pay from home through Easypaisa or JazzCash — no need to visit a branch.",
        "at": 32.54
      },
      {
        "who": "peer",
        "ur": "اور دوسرا؟",
        "en": "And the second?",
        "at": 47.41
      },
      {
        "who": "agent",
        "ur": "دوسرا یہ کہ اگر آپ چاہیں تو میں آپ کی درخواست ری شیڈولنگ کے لیے آگے بھیج دوں۔ ہمارا ریکوری افسر کل آپ سے رابطہ کر کے آسان اقساط طے کر لے گا۔",
        "en": "The second is that, if you prefer, I can forward a rescheduling request for you. Our recovery officer will contact you tomorrow and agree easier instalments.",
        "at": 49.04
      },
      {
        "who": "peer",
        "ur": "ہاں، وہ دوسرا والا کر دو۔ بات ہو جائے گی۔",
        "en": "Yes, do that second one. We'll talk it over.",
        "at": 60.47
      },
      {
        "who": "agent",
        "ur": "جی بہتر، میں نے آپ کی درخواست ابھی درج کر دی ہے۔ ایک گزارش: بروقت ادائیگی سے آپ کی کریڈٹ ہسٹری مضبوط رہتی ہے اور اگلا قرض زیادہ آسانی سے اور بڑی رقم میں ملتا ہے۔ وقت دینے کا شکریہ، اللہ حافظ۔",
        "en": "Certainly, I've logged your request now. One request: paying on time keeps your credit history strong, which means the next loan comes faster and larger. Thank you for your time — Allah hafiz.",
        "at": 64.89
      }
    ]
  },
  {
    "id": "saad-chroniccare",
    "name": "Dr. Saad",
    "role": "Chronic Care Adherence Coach",
    "vertical": "Pharma, Insurance & Disease Management",
    "voice": "diabetologist",
    "peerVoice": "pashtun-pensioner",
    "tagline": "Weekly check-ins that keep 33 million diabetics on their medicine.",
    "problem": "Pakistan has one of the highest diabetes prevalence rates on earth, and medication adherence collapses after the first month. Nobody follows up. Complications — amputations, renal failure, cardiac events — then land on insurers and families at catastrophic cost.",
    "solution": "Dr. Saad runs structured weekly voice check-ins: captures self-reported readings, screens for red-flag symptoms, reinforces the regimen, sets medication reminders, and escalates deteriorating patients to a human clinician with a full structured summary.",
    "kpis": [
      {
        "label": "Adherence lift",
        "value": "+31%",
        "note": "vs unsupported control cohort"
      },
      {
        "label": "Escalations caught",
        "value": "1 in 14",
        "note": "patients routed to a clinician early"
      },
      {
        "label": "Cost per patient",
        "value": "PKR 220",
        "note": "per month of continuous coaching"
      }
    ],
    "integrations": [
      "Patient registries & EMR",
      "Wearables and glucometer apps",
      "Insurance claims platforms",
      "Clinician escalation dashboard",
      "WhatsApp"
    ],
    "pricing": {
      "setup": "PKR 800,000",
      "monthly": "PKR 320,000",
      "included": "1,500 patients",
      "overage": "PKR 220 / patient / mo"
    },
    "greeting": "السلام علیکم، میں ڈاکٹر سعد بول رہا ہوں شوگر کیئر پروگرام سے۔ یہ آپ کی ہفتہ وار فالو اپ کال ہے۔",
    "duration": 70.09,
    "call": "/voice/saad-chroniccare_call.mp3",
    "greetingAudio": "/voice/saad-chroniccare_greeting.mp3",
    "portrait": "/agents/saad-chroniccare.webp",
    "thumb": "/agents/saad-chroniccare-thumb.webp",
    "turns": [
      {
        "who": "agent",
        "ur": "السلام علیکم، میں ڈاکٹر سعد بول رہا ہوں شوگر کیئر پروگرام سے۔ یہ آپ کی ہفتہ وار فالو اپ کال ہے۔ اس ہفتے آپ کا شوگر لیول کیسا رہا؟",
        "en": "Assalam-o-alaikum, this is Dr. Saad from the Sugar Care programme. This is your weekly follow-up call. How have your sugar levels been this week?",
        "at": 0.0
      },
      {
        "who": "peer",
        "ur": "ڈاکٹر صاحب، صبح ناشتے سے پہلے ایک سو ساٹھ آیا تھا۔",
        "en": "Doctor sahib, it was one hundred and sixty in the morning before breakfast.",
        "at": 8.5
      },
      {
        "who": "agent",
        "ur": "ٹھیک ہے، شکریہ کہ آپ نے ناپا۔ لیکن یہ ہدف سے کچھ زیادہ ہے۔ ہمیں اسے ایک سو تیس سے نیچے لانا ہے۔ ایک بات بتائیے، کیا آپ میٹفارمن روزانہ دو بار، کھانے کے فوراً بعد لے رہے ہیں؟",
        "en": "Alright, and thank you for measuring. But that's somewhat above target — we need to bring it below one hundred and thirty. Tell me one thing: are you taking Metformin twice daily, right after meals?",
        "at": 13.53
      },
      {
        "who": "peer",
        "ur": "صبح والی تو لے لیتا ہوں، مگر رات والی اکثر بھول جاتا ہوں۔",
        "en": "I take the morning one, but I often forget the night dose.",
        "at": 24.9
      },
      {
        "who": "agent",
        "ur": "بس یہی سب سے بڑی وجہ ہے۔ رات کی خوراک چھوٹنے سے صبح کا لیول بڑھ جاتا ہے۔ میں آج سے آپ کے لیے روزانہ رات نو بجے یاد دہانی لگا رہا ہوں۔",
        "en": "That is exactly the main cause. Missing the night dose pushes the morning reading up. From today I'm setting a daily reminder for you at nine at night.",
        "at": 30.76
      },
      {
        "who": "peer",
        "ur": "اچھا، وہ اچھا رہے گا۔",
        "en": "Good, that will help.",
        "at": 40.15
      },
      {
        "who": "agent",
        "ur": "دو اور گزارشات ہیں۔ پہلی، روزانہ تیس منٹ کی تیز چہل قدمی، شام کے وقت۔ دوسری، سفید چاول اور میٹھی چائے کی مقدار آدھی کر دیجیے۔",
        "en": "Two more requests. First, thirty minutes of brisk walking daily, in the evening. Second, halve your portions of white rice and sweetened tea.",
        "at": 43.9
      },
      {
        "who": "peer",
        "ur": "کوشش کروں گا ڈاکٹر صاحب۔",
        "en": "I'll try, doctor sahib.",
        "at": 53.75
      },
      {
        "who": "agent",
        "ur": "بہت اچھا۔ اور اگر شوگر دو سو سے اوپر چلا جائے، یا آپ کو چکر آئیں، نظر دھندلی ہو، یا پاؤں میں سن پن محسوس ہو، تو انتظار مت کیجیے گا، فوراً ہمیں کال کیجیے۔ اگلے ہفتے اسی دن دوبارہ رابطہ کروں گا۔ اپنا خیال رکھیے گا۔",
        "en": "Very good. And if your sugar goes above two hundred, or you feel dizzy, your vision blurs, or your feet go numb — don't wait, call us immediately. I'll be in touch again next week, same day. Take care of yourself.",
        "at": 56.09
      }
    ]
  },
  {
    "id": "sana-school",
    "name": "Miss Sana",
    "role": "Parent Engagement Desk",
    "vertical": "Schools & Education Networks",
    "voice": "montessori-teacher",
    "peerVoice": "punjabi-manager",
    "tagline": "Attendance, fees and PTMs — every parent reached, same evening.",
    "problem": "Private school chains lose weeks of admin time chasing parents over absences and unpaid fees. Fee defaults compound quietly, absenteeism goes unnoticed until a child has dropped out, and printed circulars sent home in schoolbags never arrive.",
    "solution": "Miss Sana calls parents the same evening a child is absent, logs the reason, and folds in fee reminders, PTM invitations and exam schedules — in the language the parent actually speaks. Every response is written straight back into the school ERP.",
    "kpis": [
      {
        "label": "Fee collection",
        "value": "+18%",
        "note": "on-time collection within the due window"
      },
      {
        "label": "Absence follow-up",
        "value": "same day",
        "note": "vs 4–9 days manually"
      },
      {
        "label": "Admin hours saved",
        "value": "60 hrs/mo",
        "note": "per campus of ~800 students"
      }
    ],
    "integrations": [
      "School ERP / SIS",
      "Fee & voucher systems (1Bill, 1Link)",
      "WhatsApp broadcast",
      "Biometric attendance",
      "SMS gateway"
    ],
    "pricing": {
      "setup": "PKR 120,000",
      "monthly": "PKR 45,000",
      "included": "1 campus, 4,000 calls/mo",
      "overage": "PKR 10 / call"
    },
    "greeting": "السلام علیکم، میں مس ثناء بول رہی ہوں دی سٹی گرامر سکول سے، احمد کے حوالے سے بات کرنی تھی۔",
    "duration": 76.96,
    "call": "/voice/sana-school_call.mp3",
    "greetingAudio": "/voice/sana-school_greeting.mp3",
    "portrait": "/agents/sana-school.webp",
    "thumb": "/agents/sana-school-thumb.webp",
    "turns": [
      {
        "who": "agent",
        "ur": "السلام علیکم، میں مس ثناء بول رہی ہوں دی سٹی گرامر سکول سے۔ کیا احمد کے والد صاحب بات کر رہے ہیں؟",
        "en": "Assalam-o-alaikum, this is Miss Sana from The City Grammar School. Am I speaking with Ahmed's father?",
        "at": 0.0
      },
      {
        "who": "peer",
        "ur": "جی جی، میں ہی ہوں۔ فرمائیے۔",
        "en": "Yes, speaking. Please go ahead.",
        "at": 9.21
      },
      {
        "who": "agent",
        "ur": "سر، احمد اس ہفتے تین دن سکول نہیں آیا۔ ہم صرف یہ جاننا چاہتے تھے کہ سب خیریت ہے؟",
        "en": "Sir, Ahmed has been absent for three days this week. We just wanted to check that everything is alright.",
        "at": 12.51
      },
      {
        "who": "peer",
        "ur": "جی، اسے تیز بخار ہو گیا تھا۔ اب کافی بہتر ہے، پیر سے آ جائے گا۔",
        "en": "Yes, he had a high fever. He's much better now, he'll be back from Monday.",
        "at": 21.9
      },
      {
        "who": "agent",
        "ur": "اللہ اسے مکمل صحت دے۔ میں نے تینوں دن میڈیکل لیو کے طور پر درج کر دیے ہیں، حاضری متاثر نہیں ہوگی۔ اگر ڈاکٹر کا پرچہ ہو تو احمد کے ہاتھ بھجوا دیجیے گا۔",
        "en": "May Allah grant him full health. I've marked all three days as medical leave, so his attendance won't be affected. If you have a doctor's note, please send it in with Ahmed.",
        "at": 28.31
      },
      {
        "who": "peer",
        "ur": "ٹھیک ہے، بھجوا دوں گا۔",
        "en": "Alright, I'll send it.",
        "at": 40.99
      },
      {
        "who": "agent",
        "ur": "شکریہ۔ دو مختصر باتیں اور۔ پہلی، پیر کے دن پیرنٹ ٹیچر میٹنگ ہے، صبح دس سے ایک بجے تک۔ احمد کی ریاضی کی استانی آپ سے خاص طور پر ملنا چاہتی ہیں۔",
        "en": "Thank you. Two brief things more. First, the parent-teacher meeting is on Monday, from ten in the morning to one. Ahmed's mathematics teacher particularly wants to meet you.",
        "at": 43.3
      },
      {
        "who": "peer",
        "ur": "اچھا، میں آ جاؤں گا۔ اور دوسری بات؟",
        "en": "Alright, I'll come. And the second thing?",
        "at": 57.33
      },
      {
        "who": "agent",
        "ur": "دوسری یہ کہ اگست کی فیس پندرہ تاریخ تک جمع کروا دیجیے گا تاکہ لیٹ فیس سے بچت رہے۔ چیلان کی تصویر ابھی آپ کے واٹس ایپ پر بھیج رہی ہوں۔ وقت دینے کا شکریہ، اللہ حافظ۔",
        "en": "The second is that August fees should be deposited by the fifteenth to avoid the late fee. I'm sending a picture of the challan to your WhatsApp now. Thank you for your time — Allah hafiz.",
        "at": 61.99
      }
    ]
  },
  {
    "id": "kamran-leads",
    "name": "Kamran",
    "role": "Inbound Lead Qualification",
    "vertical": "Real Estate, Auto & High-Ticket Sales",
    "voice": "punjabi-manager",
    "peerVoice": "karachi-romeo",
    "tagline": "Calls every lead in 60 seconds, books only the serious ones.",
    "problem": "Property and auto dealers buy leads at PKR 800–3,000 each, then let them rot for a day before anyone calls. Sales staff burn their best hours on tyre-kickers while genuinely ready buyers go cold or call a competitor who picked up first.",
    "solution": "Kamran dials within a minute of form submission, qualifies on budget, financing, timeline and location, books site visits straight into the sales calendar, and hands the rep a scored, summarised lead. Unqualified leads get nurtured, not discarded.",
    "kpis": [
      {
        "label": "Speed to lead",
        "value": "< 60 sec",
        "note": "vs a 4–24 hour industry norm"
      },
      {
        "label": "Qualified rate",
        "value": "3.4×",
        "note": "more site visits booked per 100 leads"
      },
      {
        "label": "Rep time saved",
        "value": "22 hrs/mo",
        "note": "per sales representative"
      }
    ],
    "integrations": [
      "Meta & Google Lead Ads",
      "Zameen.com / PakWheels feeds",
      "HubSpot / Zoho / Salesforce",
      "Calendar booking",
      "WhatsApp follow-up"
    ],
    "pricing": {
      "setup": "PKR 200,000",
      "monthly": "PKR 110,000",
      "included": "5,000 leads/mo",
      "overage": "PKR 22 / lead"
    },
    "greeting": "السلام علیکم، میں کامران بات کر رہا ہوں سکائی لائن پراپرٹیز سے، آپ کی انکوائری کے سلسلے میں۔",
    "duration": 77.79,
    "call": "/voice/kamran-leads_call.mp3",
    "greetingAudio": "/voice/kamran-leads_greeting.mp3",
    "portrait": "/agents/kamran-leads.webp",
    "thumb": "/agents/kamran-leads-thumb.webp",
    "turns": [
      {
        "who": "agent",
        "ur": "السلام علیکم، میں کامران بات کر رہا ہوں سکائی لائن پراپرٹیز سے۔ آپ نے ابھی ہماری ویب سائٹ پر بحریہ ٹاؤن میں پانچ مرلہ گھر کے بارے میں معلومات مانگی تھیں۔",
        "en": "Assalam-o-alaikum, this is Kamran from Skyline Properties. You just requested information on our website about a five marla house in Bahria Town.",
        "at": 0.0
      },
      {
        "who": "peer",
        "ur": "ارے واہ، بہت جلدی کال آ گئی۔ جی ہاں، میں ابھی دیکھ ہی رہا تھا۔",
        "en": "Wow, that was a fast call. Yes, I was literally just looking at it.",
        "at": 10.02
      },
      {
        "who": "agent",
        "ur": "جی، ہم فوراً رابطہ کرتے ہیں۔ اگر اجازت ہو تو دو تین سوال پوچھ لوں، تاکہ آپ کا وقت ضائع کیے بغیر بالکل درست آپشن دکھا سکوں۔",
        "en": "Yes, we get back right away. If you'll permit me, let me ask two or three questions so I can show you exactly the right option without wasting your time.",
        "at": 16.35
      },
      {
        "who": "peer",
        "ur": "جی بالکل، پوچھیں۔",
        "en": "Sure, go ahead.",
        "at": 25.68
      },
      {
        "who": "agent",
        "ur": "آپ کا بجٹ تقریباً کس رینج میں ہے؟",
        "en": "Roughly what range is your budget in?",
        "at": 27.81
      },
      {
        "who": "peer",
        "ur": "دیکھیں، ڈیڑھ سے دو کروڑ کے درمیان سوچ رہا ہوں۔",
        "en": "I'm thinking somewhere between fifteen and twenty million.",
        "at": 30.96
      },
      {
        "who": "agent",
        "ur": "سمجھ گیا، یہ بہت مناسب رینج ہے۔ اور خریداری مکمل کیش پر ہوگی یا بینک فنانسنگ کے ساتھ؟",
        "en": "Understood — that's a very workable range. And will this be an all-cash purchase, or with bank financing?",
        "at": 35.69
      },
      {
        "who": "peer",
        "ur": "کچھ حصہ فنانسنگ سے لینا پڑے گا۔",
        "en": "I'll need to take some of it as financing.",
        "at": 42.78
      },
      {
        "who": "agent",
        "ur": "کوئی مسئلہ نہیں، ہمارا بینک ڈیسک مکمل کاغذی کارروائی میں مدد کرتا ہے۔ آپ کے بجٹ میں اس وقت سیکٹر سی میں تین یونٹ دستیاب ہیں، دو مکمل تیار اور ایک گرے سٹرکچر۔ کیا میں ہفتے کی صبح گیارہ بجے آپ کا سائٹ وزٹ رکھ دوں؟",
        "en": "No problem, our bank desk handles the entire paperwork with you. In your budget there are currently three units available in Sector C — two fully finished and one grey structure. Shall I book a site visit for Saturday at eleven in the morning?",
        "at": 46.66
      },
      {
        "who": "peer",
        "ur": "جی ہاں، ہفتہ ٹھیک رہے گا۔",
        "en": "Yes, Saturday works.",
        "at": 60.18
      },
      {
        "who": "agent",
        "ur": "شاندار۔ سائٹ وزٹ ہفتہ، صبح گیارہ بجے کنفرم۔ لوکیشن پن، تینوں یونٹس کی تصاویر اور قیمتیں ابھی آپ کے واٹس ایپ پر بھیج رہا ہوں۔ ہمارے سیلز مینیجر عثمان صاحب آپ کو وہیں ملیں گے۔ شکریہ، اللہ حافظ۔",
        "en": "Excellent. Site visit confirmed for Saturday at eleven. I'm sending the location pin, photos of all three units and their prices to your WhatsApp now. Our sales manager Usman will meet you there. Thank you — Allah hafiz.",
        "at": 63.22
      }
    ]
  },
  {
    "id": "zainab-outreach",
    "name": "Zainab",
    "role": "Rural Public-Service Outreach",
    "vertical": "Government, Donors & NGOs",
    "voice": "pashtun-woman",
    "peerVoice": "balochi-seamstress",
    "tagline": "Reaches the 37% of adults that every SMS campaign misses.",
    "problem": "Immunisation drives, cash-transfer enrolment and health campaigns are pushed out over SMS and posters — both of which fail the third of Pakistani adults who cannot read, and the rural women who are hardest to reach and most in need of the message.",
    "solution": "Zainab calls households in warm, regionally-accented Urdu, checks eligibility conversationally, answers objections and rumours, names the exact date and location of the nearest camp, and reports structured coverage data back to the programme dashboard.",
    "kpis": [
      {
        "label": "Camp turnout",
        "value": "+27%",
        "note": "vs SMS-and-poster campaigns"
      },
      {
        "label": "Reach per rupee",
        "value": "9×",
        "note": "cheaper than door-to-door LHW visits"
      },
      {
        "label": "Data captured",
        "value": "structured",
        "note": "eligibility and refusal reasons, per household"
      }
    ],
    "integrations": [
      "DHIS2 & EPI registries",
      "BISP / Ehsaas beneficiary databases",
      "NADRA verification APIs",
      "Donor M&E dashboards",
      "Bulk telephony"
    ],
    "pricing": {
      "setup": "PKR 350,000",
      "monthly": "PKR 140,000",
      "included": "40,000 calls/mo",
      "overage": "PKR 5 / call"
    },
    "greeting": "السلام علیکم بہن، میں زینب بول رہی ہوں محکمہ صحت کے حفاظتی ٹیکہ جات پروگرام سے۔",
    "duration": 89.71,
    "call": "/voice/zainab-outreach_call.mp3",
    "greetingAudio": "/voice/zainab-outreach_greeting.mp3",
    "portrait": "/agents/zainab-outreach.webp",
    "thumb": "/agents/zainab-outreach-thumb.webp",
    "turns": [
      {
        "who": "agent",
        "ur": "السلام علیکم بہن! میں زینب بول رہی ہوں محکمہ صحت کے حفاظتی ٹیکہ جات پروگرام سے۔ کیا آپ کے گھر میں کوئی بچہ دو سال سے چھوٹا ہے؟",
        "en": "Assalam-o-alaikum, sister! This is Zainab from the Health Department's immunisation programme. Is there any child under two years old in your home?",
        "at": 0.0
      },
      {
        "who": "peer",
        "ur": "جی ہاں، میری بیٹی ہے، نو مہینے کی۔",
        "en": "Yes, I have a daughter, nine months old.",
        "at": 12.31
      },
      {
        "who": "agent",
        "ur": "ماشاءاللہ، اللہ اسے لمبی عمر دے۔ بہن، ٹھیک نو مہینے کی عمر پر خسرہ کا پہلا ٹیکہ لگتا ہے۔ کیا وہ لگ چکا ہے؟",
        "en": "Mashallah, may Allah give her a long life. Sister, at exactly nine months the first measles vaccine is due. Has she had it?",
        "at": 17.24
      },
      {
        "who": "peer",
        "ur": "نہیں ابھی نہیں لگوایا۔ لوگ کہتے ہیں اس سے بچے کو بخار ہو جاتا ہے۔",
        "en": "No, not yet. People say it gives the child a fever.",
        "at": 29.11
      },
      {
        "who": "agent",
        "ur": "بہن، آپ کا فکرمند ہونا بالکل ٹھیک ہے۔ ہلکا سا بخار ایک دو دن رہ سکتا ہے، یہ نشانی ہے کہ ٹیکہ اپنا کام کر رہا ہے۔ لیکن خسرہ بذاتِ خود بہت خطرناک بیماری ہے، اس سے بچے کی بینائی اور جان تک جا سکتی ہے۔ ٹیکہ اسی سے بچاتا ہے۔",
        "en": "Sister, it's completely right of you to be concerned. A mild fever can last a day or two — that's a sign the vaccine is doing its work. But measles itself is a very dangerous disease; it can take a child's eyesight, even their life. The vaccine is what protects against that.",
        "at": 34.99
      },
      {
        "who": "peer",
        "ur": "اچھا۔ اور یہ لگوانا کہاں ہے؟",
        "en": "I see. And where do we get it done?",
        "at": 53.68
      },
      {
        "who": "agent",
        "ur": "یہ ٹیکہ بالکل مفت ہے، ایک روپیہ نہیں لگتا۔ اس جمعرات کو آپ کے گاؤں کے بنیادی مرکزِ صحت میں ہماری ٹیم صبح نو بجے سے دوپہر ایک بجے تک موجود ہوگی۔ بس بچی کا ویکسینیشن کارڈ ساتھ لے آئیے گا۔",
        "en": "The vaccine is completely free — not a single rupee. This Thursday our team will be at your village's Basic Health Unit from nine in the morning until one in the afternoon. Just bring the child's vaccination card with you.",
        "at": 57.64
      },
      {
        "who": "peer",
        "ur": "ٹھیک ہے بہن، لے آؤں گی۔",
        "en": "Alright sister, I'll bring her.",
        "at": 74.57
      },
      {
        "who": "agent",
        "ur": "بہت شکریہ۔ میں بدھ کی شام آپ کو یاد دہانی کا پیغام بھجوا دوں گی۔ اللہ آپ کی بیٹی کو صحت اور تندرستی دے۔ اللہ حافظ۔",
        "en": "Thank you so much. I'll send you a reminder message on Wednesday evening. May Allah keep your daughter healthy and well. Allah hafiz.",
        "at": 78.03
      }
    ]
  }
];

export function getAgent(id) {
  return AGENTS.find((a) => a.id === id) || null;
}
