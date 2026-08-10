"""
Montegritty Voice Agents — product catalogue.

Eight sellable Urdu voice agents built on Uplift AI Orator.
Each agent has: a persona, an Uplift voiceId, a counterpart ("customer") voice
so demos are real two-sided conversations, and a scripted call.
"""

AGENTS = [
    # ------------------------------------------------------------------ 01
    {
        "id": "hassan-support",
        "name": "Hassan",
        "role": "Tier-1 Customer Support",
        "vertical": "Telecom & Internet Service Providers",
        "voice": "broadband-support",
        "peer_voice": "nazimabad-boy",
        "tagline": "Handles the 70% of calls that are the same five questions.",
        "problem": (
            "ISPs and telcos in Pakistan drown in repetitive Tier-1 volume: outage checks, "
            "bill queries, package changes, router resets. Agents cost PKR 60k–120k/month, "
            "turnover runs above 40%, and peak-hour queues push customers to churn."
        ),
        "solution": (
            "Hassan answers every inbound call instantly in Urdu, English or code-mixed speech. "
            "He authenticates the caller, checks live outage and billing systems through tools, "
            "resolves what he can, and hands the rest to a human with a full transcript attached."
        ),
        "kpis": [
            ("Call deflection", "70–85%", "of Tier-1 volume never reaches a human"),
            ("Answer time", "< 2 sec", "no hold music, no queue, 24/7"),
            ("Cost per call", "~PKR 12", "vs ~PKR 95 fully-loaded human cost"),
        ],
        "integrations": ["Asterisk / FreePBX / Twilio SIP", "CRM (Zoho, Salesforce, custom)",
                         "Billing & OSS APIs", "WhatsApp Business API", "Zendesk / Freshdesk"],
        "pricing": {"setup": "PKR 450,000", "monthly": "PKR 180,000", "included": "10,000 min/mo",
                    "overage": "PKR 14 / min"},
        "greeting": "السلام علیکم، میں حسن بات کر رہا ہوں سائبر نیٹ کسٹمر سپورٹ سے۔ میں آپ کی کیا مدد کر سکتا ہوں؟",
        "script": [
            ("peer", "ہیلو؟ بھائی میرا انٹرنیٹ صبح سے بند پڑا ہے۔ راؤٹر پر بس لال بتی جل رہی ہے۔"),
            ("agent", "السلام علیکم، میں حسن بات کر رہا ہوں سائبر نیٹ کسٹمر سپورٹ سے۔ آپ کی پریشانی میں سمجھ گیا ہوں۔ آپ کا اکاؤنٹ نمبر تین، چار، دو، نو ہے، درست؟"),
            ("peer", "جی ہاں، بالکل درست ہے۔"),
            ("agent", "شکریہ۔ میں نے ابھی آپ کے علاقے کا لائیو سٹیٹس دیکھا ہے۔ ڈیفنس فیز فور میں فائبر کیبل کٹ گئی تھی، مرمت کا کام جاری ہے اور شام چھ بجے تک بحالی متوقع ہے۔"),
            ("peer", "یار، سارا دن ضائع ہو گیا۔"),
            ("agent", "بالکل درست کہہ رہے ہیں، معذرت خواہ ہوں۔ میں نے دو کام کر دیے ہیں۔ پہلا، آپ کے نمبر پر الرٹ لگا دیا ہے، سروس بحال ہوتے ہی آپ کو ایس ایم ایس موصول ہو جائے گا۔ دوسرا، آپ کے اگلے بل میں ایک دن کا کریڈٹ ایڈجسٹ کر دیا ہے۔"),
            ("peer", "اچھا، یہ ٹھیک ہے۔ شکریہ۔"),
            ("agent", "آپ کا شکریہ۔ کوئی اور مدد درکار ہو تو بلا جھجک رابطہ کیجیے۔ اللہ حافظ۔"),
        ],
    },
    # ------------------------------------------------------------------ 02
    {
        "id": "ayesha-clinic",
        "name": "Ayesha",
        "role": "Appointment & No-Show Desk",
        "vertical": "Hospitals, Clinics & Diagnostic Labs",
        "voice": "helpdesk-agent",
        "peer_voice": "punjabi-masi",
        "tagline": "Fills the empty chair. Confirms, reschedules and preps every patient.",
        "problem": (
            "Outpatient no-show rates run 19–43%. Every empty slot is a consultant hour billed to "
            "nobody. Front-desk staff cannot call 400 patients a day, and SMS reminders are useless "
            "to the ~37% of adults who cannot read them."
        ),
        "solution": (
            "Ayesha calls every patient the day before, confirms in spoken Urdu, reschedules on the "
            "spot against live calendar availability, delivers prep instructions (fasting, reports, "
            "documents), and back-fills cancelled slots from the waitlist automatically."
        ),
        "kpis": [
            ("No-show reduction", "38%", "measured against SMS-only baseline"),
            ("Slot recovery", "+11 hrs", "consultant hours reclaimed per week"),
            ("Reach", "100%", "works for non-literate patients — voice, not text"),
        ],
        "integrations": ["HMS / EMR (Oladoc, Marham, custom)", "Google & Outlook Calendar",
                         "WhatsApp confirmations", "SMS gateway fallback", "Lab LIS systems"],
        "pricing": {"setup": "PKR 300,000", "monthly": "PKR 95,000", "included": "6,000 calls/mo",
                    "overage": "PKR 18 / call"},
        "greeting": "السلام علیکم، میں عائشہ بول رہی ہوں شفا کلینک سے۔ آپ کی اپائنٹمنٹ کے سلسلے میں رابطہ کر رہی ہوں۔",
        "script": [
            ("agent", "السلام علیکم، میں عائشہ بول رہی ہوں شفا کلینک سے۔ کیا میری بات محترمہ ثمینہ صاحبہ سے ہو رہی ہے؟"),
            ("peer", "جی بیٹا، ثمینہ بات کر رہی ہوں۔"),
            ("agent", "جی، آپ کی کل صبح گیارہ بجے ڈاکٹر فرحان کے ساتھ اپائنٹمنٹ ہے۔ میں صرف تصدیق کرنا چاہتی تھی کہ آپ تشریف لا رہی ہیں؟"),
            ("peer", "ہائے بیٹا، کل تو بہت مشکل ہے۔ گھر میں مہمان آ رہے ہیں۔ کوئی اور دن ہو سکتا ہے؟"),
            ("agent", "جی بالکل، کوئی مسئلہ نہیں۔ میں ابھی دیکھتی ہوں۔ جمعرات کو دوپہر ساڑھے تین بجے ڈاکٹر صاحب کے پاس وقت خالی ہے۔ کیا میں وہ آپ کے لیے محفوظ کر دوں؟"),
            ("peer", "ہاں ہاں، جمعرات ٹھیک ہے۔"),
            ("agent", "بہت بہتر۔ آپ کی اپائنٹمنٹ جمعرات، ساڑھے تین بجے کنفرم ہو گئی ہے۔ ایک ضروری بات: ڈاکٹر صاحب نے خون کا ٹیسٹ بھی لکھا ہے، اس لیے آنے سے آٹھ گھنٹے پہلے کچھ نہ کھائیں، صرف پانی پی سکتی ہیں۔"),
            ("peer", "اچھا، یاد رکھوں گی۔"),
            ("agent", "جی، اور میں تمام تفصیل آپ کے واٹس ایپ پر بھی بھیج رہی ہوں۔ بدھ کی شام یاد دہانی کے لیے دوبارہ کال کروں گی۔ اللہ آپ کو صحت دے، اللہ حافظ۔"),
        ],
    },
    # ------------------------------------------------------------------ 03
    {
        "id": "bilal-cod",
        "name": "Bilal",
        "role": "COD Order Confirmation",
        "vertical": "E-commerce & Q-commerce",
        "voice": "shopkeeper",
        "peer_voice": "college-girl",
        "tagline": "Kills fake orders before the courier ever picks up the parcel.",
        "problem": (
            "Over 80% of Pakistani online orders are Cash on Delivery, and 18–20% nationally — up to "
            "30–45% for weak stores — come back as Return-to-Origin. Every RTO burns two-way freight, "
            "packaging and locked-up inventory on a sale that never happened."
        ),
        "solution": (
            "Bilal calls every COD order within minutes of checkout. He reads the order back, verifies "
            "the address, confirms the buyer will have cash ready, and flags dead numbers and hoax "
            "orders before they enter the courier network. Confirmed orders get a WhatsApp receipt."
        ),
        "kpis": [
            ("RTO reduction", "42%", "typical drop in return-to-origin rate"),
            ("Time to confirm", "< 5 min", "from checkout to verified order"),
            ("Payback", "~3 weeks", "one avoided RTO pays for ~30 calls"),
        ],
        "integrations": ["Shopify / WooCommerce / Daraz", "TCS, Leopards, M&P, Trax, PostEx",
                         "WhatsApp Business API", "Google Sheets / Airtable", "Custom order APIs"],
        "pricing": {"setup": "PKR 150,000", "monthly": "PKR 60,000", "included": "8,000 calls/mo",
                    "overage": "PKR 9 / call"},
        "greeting": "السلام علیکم! میں بلال بات کر رہا ہوں سٹائل باکس آن لائن سٹور سے، آپ کے آرڈر کی تصدیق کے لیے۔",
        "script": [
            ("agent", "السلام علیکم! میں بلال بات کر رہا ہوں سٹائل باکس آن لائن سٹور سے۔ آپ نے آج ہماری ویب سائٹ پر ایک آرڈر دیا تھا، اسی کی تصدیق کرنی تھی۔"),
            ("peer", "جی جی، کالی ہوڈی والا آرڈر۔"),
            ("agent", "بالکل درست۔ بلیک ہوڈی، سائز میڈیم، ایک عدد۔ کل رقم تین ہزار چار سو روپے، کیش آن ڈیلیوری۔ کیا میں یہ آرڈر کنفرم کر دوں؟"),
            ("peer", "جی ہاں، کنفرم کر دیں۔"),
            ("agent", "شکریہ۔ ڈیلیوری ایڈریس ہے: فلیٹ نمبر بارہ، الف بلاک، گلشن اقبال بلاک تیرہ، کراچی۔ کیا یہ درست ہے؟"),
            ("peer", "ہاں بالکل، بس گیٹ نمبر دو سے آنا ہوگا۔"),
            ("agent", "نوٹ کر لیا، گیٹ نمبر دو۔ رائیڈر کو یہ ہدایت پہنچا دی جائے گی۔ آپ کا آرڈر کنفرم ہو گیا ہے، دو سے تین کاروباری دن میں پہنچ جائے گا۔"),
            ("peer", "ٹھیک ہے، شکریہ۔"),
            ("agent", "برائے مہربانی ڈیلیوری کے وقت تین ہزار چار سو روپے تیار رکھیے گا۔ ٹریکنگ نمبر ابھی آپ کے واٹس ایپ پر آ رہا ہے۔ خریداری کا شکریہ، اللہ حافظ!"),
        ],
    },
    # ------------------------------------------------------------------ 04
    {
        "id": "fatima-collections",
        "name": "Fatima",
        "role": "Payment Reminder & Soft Collections",
        "vertical": "Banks, Microfinance & Lending",
        "voice": "sindhi-professional",
        "peer_voice": "mohalla-patriarch",
        "tagline": "Every borrower called, every month — politely, compliantly, on record.",
        "problem": (
            "Microfinance and consumer-lending books live or die on collection efficiency. Field "
            "recovery officers are expensive and cover a handful of borrowers a day; aggressive "
            "third-party collectors create regulatory and reputational risk that regulators now punish."
        ),
        "solution": (
            "Fatima calls the whole portfolio on a schedule — pre-due nudge, due-date reminder, "
            "graduated post-due follow-up. She offers digital payment rails, captures promise-to-pay "
            "dates, routes hardship cases to restructuring, and records every call for audit."
        ),
        "kpis": [
            ("Collection efficiency", "+9 pts", "on 1–30 day delinquency buckets"),
            ("Cost per contact", "PKR 11", "vs PKR 400+ for a field visit"),
            ("Compliance", "100%", "scripted, recorded, tone-controlled, fully auditable"),
        ],
        "integrations": ["Core banking / LMS", "Easypaisa, JazzCash, Raast payment links",
                         "Credit bureau reporting", "Collections CRM", "IVR & SMS gateways"],
        "pricing": {"setup": "PKR 600,000", "monthly": "PKR 250,000", "included": "25,000 calls/mo",
                    "overage": "PKR 8 / call"},
        "greeting": "السلام علیکم، میں فاطمہ بول رہی ہوں اخوت مائیکرو فنانس کی جانب سے، ایک یاد دہانی کے لیے۔",
        "script": [
            ("agent", "السلام علیکم، میں فاطمہ بول رہی ہوں اخوت مائیکرو فنانس کی جانب سے۔ کیا میری بات جناب رمضان صاحب سے ہو رہی ہے؟"),
            ("peer", "ہاں بھئی، رمضان بول رہا ہوں۔ بولو کیا بات ہے۔"),
            ("agent", "سر، یہ صرف ایک یاد دہانی کال ہے، کوئی پریشانی والی بات نہیں۔ آپ کی ماہانہ قسط سات ہزار پانچ سو روپے پندرہ تاریخ کو واجب الادا ہے، یعنی آج سے تین دن بعد۔"),
            ("peer", "دیکھو بیٹی، اس مہینے تھوڑی تنگی چل رہی ہے۔ دکان پر کام ہلکا ہے۔"),
            ("agent", "میں آپ کی بات سمجھ سکتی ہوں سر، اور آپ کا ریکارڈ اب تک بہت اچھا رہا ہے۔ آپ کے پاس دو آسان راستے ہیں۔ پہلا، آپ ایزی پیسہ یا جاز کیش سے گھر بیٹھے ادائیگی کر سکتے ہیں، برانچ آنے کی ضرورت نہیں۔"),
            ("peer", "اور دوسرا؟"),
            ("agent", "دوسرا یہ کہ اگر آپ چاہیں تو میں آپ کی درخواست ری شیڈولنگ کے لیے آگے بھیج دوں۔ ہمارا ریکوری افسر کل آپ سے رابطہ کر کے آسان اقساط طے کر لے گا۔"),
            ("peer", "ہاں، وہ دوسرا والا کر دو۔ بات ہو جائے گی۔"),
            ("agent", "جی بہتر، میں نے آپ کی درخواست ابھی درج کر دی ہے۔ ایک گزارش: بروقت ادائیگی سے آپ کی کریڈٹ ہسٹری مضبوط رہتی ہے اور اگلا قرض زیادہ آسانی سے اور بڑی رقم میں ملتا ہے۔ وقت دینے کا شکریہ، اللہ حافظ۔"),
        ],
    },
    # ------------------------------------------------------------------ 05
    {
        "id": "saad-chroniccare",
        "name": "Dr. Saad",
        "role": "Chronic Care Adherence Coach",
        "vertical": "Pharma, Insurance & Disease Management",
        "voice": "diabetologist",
        "peer_voice": "pashtun-pensioner",
        "tagline": "Weekly check-ins that keep 33 million diabetics on their medicine.",
        "problem": (
            "Pakistan has one of the highest diabetes prevalence rates on earth, and medication "
            "adherence collapses after the first month. Nobody follows up. Complications — amputations, "
            "renal failure, cardiac events — then land on insurers and families at catastrophic cost."
        ),
        "solution": (
            "Dr. Saad runs structured weekly voice check-ins: captures self-reported readings, screens "
            "for red-flag symptoms, reinforces the regimen, sets medication reminders, and escalates "
            "deteriorating patients to a human clinician with a full structured summary."
        ),
        "kpis": [
            ("Adherence lift", "+31%", "vs unsupported control cohort"),
            ("Escalations caught", "1 in 14", "patients routed to a clinician early"),
            ("Cost per patient", "PKR 220", "per month of continuous coaching"),
        ],
        "integrations": ["Patient registries & EMR", "Wearables and glucometer apps",
                         "Insurance claims platforms", "Clinician escalation dashboard", "WhatsApp"],
        "pricing": {"setup": "PKR 800,000", "monthly": "PKR 320,000", "included": "1,500 patients",
                    "overage": "PKR 220 / patient / mo"},
        "greeting": "السلام علیکم، میں ڈاکٹر سعد بول رہا ہوں شوگر کیئر پروگرام سے۔ یہ آپ کی ہفتہ وار فالو اپ کال ہے۔",
        "script": [
            ("agent", "السلام علیکم، میں ڈاکٹر سعد بول رہا ہوں شوگر کیئر پروگرام سے۔ یہ آپ کی ہفتہ وار فالو اپ کال ہے۔ اس ہفتے آپ کا شوگر لیول کیسا رہا؟"),
            ("peer", "ڈاکٹر صاحب، صبح ناشتے سے پہلے ایک سو ساٹھ آیا تھا۔"),
            ("agent", "ٹھیک ہے، شکریہ کہ آپ نے ناپا۔ لیکن یہ ہدف سے کچھ زیادہ ہے۔ ہمیں اسے ایک سو تیس سے نیچے لانا ہے۔ ایک بات بتائیے، کیا آپ میٹفارمن روزانہ دو بار، کھانے کے فوراً بعد لے رہے ہیں؟"),
            ("peer", "صبح والی تو لے لیتا ہوں، مگر رات والی اکثر بھول جاتا ہوں۔"),
            ("agent", "بس یہی سب سے بڑی وجہ ہے۔ رات کی خوراک چھوٹنے سے صبح کا لیول بڑھ جاتا ہے۔ میں آج سے آپ کے لیے روزانہ رات نو بجے یاد دہانی لگا رہا ہوں۔"),
            ("peer", "اچھا، وہ اچھا رہے گا۔"),
            ("agent", "دو اور گزارشات ہیں۔ پہلی، روزانہ تیس منٹ کی تیز چہل قدمی، شام کے وقت۔ دوسری، سفید چاول اور میٹھی چائے کی مقدار آدھی کر دیجیے۔"),
            ("peer", "کوشش کروں گا ڈاکٹر صاحب۔"),
            ("agent", "بہت اچھا۔ اور اگر شوگر دو سو سے اوپر چلا جائے، یا آپ کو چکر آئیں، نظر دھندلی ہو، یا پاؤں میں سن پن محسوس ہو، تو انتظار مت کیجیے گا، فوراً ہمیں کال کیجیے۔ اگلے ہفتے اسی دن دوبارہ رابطہ کروں گا۔ اپنا خیال رکھیے گا۔"),
        ],
    },
    # ------------------------------------------------------------------ 06
    {
        "id": "sana-school",
        "name": "Miss Sana",
        "role": "Parent Engagement Desk",
        "vertical": "Schools & Education Networks",
        "voice": "montessori-teacher",
        "peer_voice": "punjabi-manager",
        "tagline": "Attendance, fees and PTMs — every parent reached, same evening.",
        "problem": (
            "Private school chains lose weeks of admin time chasing parents over absences and unpaid "
            "fees. Fee defaults compound quietly, absenteeism goes unnoticed until a child has dropped "
            "out, and printed circulars sent home in schoolbags never arrive."
        ),
        "solution": (
            "Miss Sana calls parents the same evening a child is absent, logs the reason, and folds in "
            "fee reminders, PTM invitations and exam schedules — in the language the parent actually "
            "speaks. Every response is written straight back into the school ERP."
        ),
        "kpis": [
            ("Fee collection", "+18%", "on-time collection within the due window"),
            ("Absence follow-up", "same day", "vs 4–9 days manually"),
            ("Admin hours saved", "60 hrs/mo", "per campus of ~800 students"),
        ],
        "integrations": ["School ERP / SIS", "Fee & voucher systems (1Bill, 1Link)",
                         "WhatsApp broadcast", "Biometric attendance", "SMS gateway"],
        "pricing": {"setup": "PKR 120,000", "monthly": "PKR 45,000", "included": "1 campus, 4,000 calls/mo",
                    "overage": "PKR 10 / call"},
        "greeting": "السلام علیکم، میں مس ثناء بول رہی ہوں دی سٹی گرامر سکول سے، احمد کے حوالے سے بات کرنی تھی۔",
        "script": [
            ("agent", "السلام علیکم، میں مس ثناء بول رہی ہوں دی سٹی گرامر سکول سے۔ کیا احمد کے والد صاحب بات کر رہے ہیں؟"),
            ("peer", "جی جی، میں ہی ہوں۔ فرمائیے۔"),
            ("agent", "سر، احمد اس ہفتے تین دن سکول نہیں آیا۔ ہم صرف یہ جاننا چاہتے تھے کہ سب خیریت ہے؟"),
            ("peer", "جی، اسے تیز بخار ہو گیا تھا۔ اب کافی بہتر ہے، پیر سے آ جائے گا۔"),
            ("agent", "اللہ اسے مکمل صحت دے۔ میں نے تینوں دن میڈیکل لیو کے طور پر درج کر دیے ہیں، حاضری متاثر نہیں ہوگی۔ اگر ڈاکٹر کا پرچہ ہو تو احمد کے ہاتھ بھجوا دیجیے گا۔"),
            ("peer", "ٹھیک ہے، بھجوا دوں گا۔"),
            ("agent", "شکریہ۔ دو مختصر باتیں اور۔ پہلی، پیر کے دن پیرنٹ ٹیچر میٹنگ ہے، صبح دس سے ایک بجے تک۔ احمد کی ریاضی کی استانی آپ سے خاص طور پر ملنا چاہتی ہیں۔"),
            ("peer", "اچھا، میں آ جاؤں گا۔ اور دوسری بات؟"),
            ("agent", "دوسری یہ کہ اگست کی فیس پندرہ تاریخ تک جمع کروا دیجیے گا تاکہ لیٹ فیس سے بچت رہے۔ چیلان کی تصویر ابھی آپ کے واٹس ایپ پر بھیج رہی ہوں۔ وقت دینے کا شکریہ، اللہ حافظ۔"),
        ],
    },
    # ------------------------------------------------------------------ 07
    {
        "id": "kamran-leads",
        "name": "Kamran",
        "role": "Inbound Lead Qualification",
        "vertical": "Real Estate, Auto & High-Ticket Sales",
        "voice": "punjabi-manager",
        "peer_voice": "karachi-romeo",
        "tagline": "Calls every lead in 60 seconds, books only the serious ones.",
        "problem": (
            "Property and auto dealers buy leads at PKR 800–3,000 each, then let them rot for a day "
            "before anyone calls. Sales staff burn their best hours on tyre-kickers while genuinely "
            "ready buyers go cold or call a competitor who picked up first."
        ),
        "solution": (
            "Kamran dials within a minute of form submission, qualifies on budget, financing, timeline "
            "and location, books site visits straight into the sales calendar, and hands the rep a "
            "scored, summarised lead. Unqualified leads get nurtured, not discarded."
        ),
        "kpis": [
            ("Speed to lead", "< 60 sec", "vs a 4–24 hour industry norm"),
            ("Qualified rate", "3.4×", "more site visits booked per 100 leads"),
            ("Rep time saved", "22 hrs/mo", "per sales representative"),
        ],
        "integrations": ["Meta & Google Lead Ads", "Zameen.com / PakWheels feeds",
                         "HubSpot / Zoho / Salesforce", "Calendar booking", "WhatsApp follow-up"],
        "pricing": {"setup": "PKR 200,000", "monthly": "PKR 110,000", "included": "5,000 leads/mo",
                    "overage": "PKR 22 / lead"},
        "greeting": "السلام علیکم، میں کامران بات کر رہا ہوں سکائی لائن پراپرٹیز سے، آپ کی انکوائری کے سلسلے میں۔",
        "script": [
            ("agent", "السلام علیکم، میں کامران بات کر رہا ہوں سکائی لائن پراپرٹیز سے۔ آپ نے ابھی ہماری ویب سائٹ پر بحریہ ٹاؤن میں پانچ مرلہ گھر کے بارے میں معلومات مانگی تھیں۔"),
            ("peer", "ارے واہ، بہت جلدی کال آ گئی۔ جی ہاں، میں ابھی دیکھ ہی رہا تھا۔"),
            ("agent", "جی، ہم فوراً رابطہ کرتے ہیں۔ اگر اجازت ہو تو دو تین سوال پوچھ لوں، تاکہ آپ کا وقت ضائع کیے بغیر بالکل درست آپشن دکھا سکوں۔"),
            ("peer", "جی بالکل، پوچھیں۔"),
            ("agent", "آپ کا بجٹ تقریباً کس رینج میں ہے؟"),
            ("peer", "دیکھیں، ڈیڑھ سے دو کروڑ کے درمیان سوچ رہا ہوں۔"),
            ("agent", "سمجھ گیا، یہ بہت مناسب رینج ہے۔ اور خریداری مکمل کیش پر ہوگی یا بینک فنانسنگ کے ساتھ؟"),
            ("peer", "کچھ حصہ فنانسنگ سے لینا پڑے گا۔"),
            ("agent", "کوئی مسئلہ نہیں، ہمارا بینک ڈیسک مکمل کاغذی کارروائی میں مدد کرتا ہے۔ آپ کے بجٹ میں اس وقت سیکٹر سی میں تین یونٹ دستیاب ہیں، دو مکمل تیار اور ایک گرے سٹرکچر۔ کیا میں ہفتے کی صبح گیارہ بجے آپ کا سائٹ وزٹ رکھ دوں؟"),
            ("peer", "جی ہاں، ہفتہ ٹھیک رہے گا۔"),
            ("agent", "شاندار۔ سائٹ وزٹ ہفتہ، صبح گیارہ بجے کنفرم۔ لوکیشن پن، تینوں یونٹس کی تصاویر اور قیمتیں ابھی آپ کے واٹس ایپ پر بھیج رہا ہوں۔ ہمارے سیلز مینیجر عثمان صاحب آپ کو وہیں ملیں گے۔ شکریہ، اللہ حافظ۔"),
        ],
    },
    # ------------------------------------------------------------------ 08
    {
        "id": "zainab-outreach",
        "name": "Zainab",
        "role": "Rural Public-Service Outreach",
        "vertical": "Government, Donors & NGOs",
        "voice": "punjabi-masi",
        "peer_voice": "balochi-seamstress",
        "tagline": "Reaches the 37% of adults that every SMS campaign misses.",
        "problem": (
            "Immunisation drives, cash-transfer enrolment and health campaigns are pushed out over SMS "
            "and posters — both of which fail the third of Pakistani adults who cannot read, and the "
            "rural women who are hardest to reach and most in need of the message."
        ),
        "solution": (
            "Zainab calls households in warm, regionally-accented Urdu, checks eligibility "
            "conversationally, answers objections and rumours, names the exact date and location of "
            "the nearest camp, and reports structured coverage data back to the programme dashboard."
        ),
        "kpis": [
            ("Camp turnout", "+27%", "vs SMS-and-poster campaigns"),
            ("Reach per rupee", "9×", "cheaper than door-to-door LHW visits"),
            ("Data captured", "structured", "eligibility and refusal reasons, per household"),
        ],
        "integrations": ["DHIS2 & EPI registries", "BISP / Ehsaas beneficiary databases",
                         "NADRA verification APIs", "Donor M&E dashboards", "Bulk telephony"],
        "pricing": {"setup": "PKR 350,000", "monthly": "PKR 140,000", "included": "40,000 calls/mo",
                    "overage": "PKR 5 / call"},
        "greeting": "السلام علیکم بہن، میں زینب بول رہی ہوں محکمہ صحت کے حفاظتی ٹیکہ جات پروگرام سے۔",
        "script": [
            ("agent", "السلام علیکم بہن! میں زینب بول رہی ہوں محکمہ صحت کے حفاظتی ٹیکہ جات پروگرام سے۔ کیا آپ کے گھر میں کوئی بچہ دو سال سے چھوٹا ہے؟"),
            ("peer", "جی ہاں، میری بیٹی ہے، نو مہینے کی۔"),
            ("agent", "ماشاءاللہ، اللہ اسے لمبی عمر دے۔ بہن، ٹھیک نو مہینے کی عمر پر خسرہ کا پہلا ٹیکہ لگتا ہے۔ کیا وہ لگ چکا ہے؟"),
            ("peer", "نہیں ابھی نہیں لگوایا۔ لوگ کہتے ہیں اس سے بچے کو بخار ہو جاتا ہے۔"),
            ("agent", "بہن، آپ کا فکرمند ہونا بالکل ٹھیک ہے۔ ہلکا سا بخار ایک دو دن رہ سکتا ہے، یہ نشانی ہے کہ ٹیکہ اپنا کام کر رہا ہے۔ لیکن خسرہ بذاتِ خود بہت خطرناک بیماری ہے، اس سے بچے کی بینائی اور جان تک جا سکتی ہے۔ ٹیکہ اسی سے بچاتا ہے۔"),
            ("peer", "اچھا۔ اور یہ لگوانا کہاں ہے؟"),
            ("agent", "یہ ٹیکہ بالکل مفت ہے، ایک روپیہ نہیں لگتا۔ اس جمعرات کو آپ کے گاؤں کے بنیادی مرکزِ صحت میں ہماری ٹیم صبح نو بجے سے دوپہر ایک بجے تک موجود ہوگی۔ بس بچی کا ویکسینیشن کارڈ ساتھ لے آئیے گا۔"),
            ("peer", "ٹھیک ہے بہن، لے آؤں گی۔"),
            ("agent", "بہت شکریہ۔ میں بدھ کی شام آپ کو یاد دہانی کا پیغام بھجوا دوں گی۔ اللہ آپ کی بیٹی کو صحت اور تندرستی دے۔ اللہ حافظ۔"),
        ],
    },
]
