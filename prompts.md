# CCT Website — Remaining Page Prompts
## 8 Pages · Adapted for existing cct-react project

---

## Tech Stack Constraints (Apply to ALL prompts)

```
TECH STACK (DO NOT CHANGE):
- React 19 + TypeScript + Vite (existing project at cct-react/)
- NO Tailwind — uses custom CSS in src/index.css
- NO Framer Motion — uses CSS transitions + custom Reveal component for scroll animations
- NO lucide-react — uses emoji/unicode for icons
- NO new packages — use only what's installed (react, react-dom)

EXISTING DESIGN SYSTEM:
- CSS Variables: --red:#CC0033, --red2:#E8003A, --red-pale:#FDEEF2, --ink:#0D0905, --ink-warm:#1A0A10, --bg:#F4EFE6, --bg2:#EDE7DC, --muted:#6B5C4A, --border:#DDD3C4, --surface:#FFFFFF, --gold:#C98A0A, --gold-lt:#FEF3D7, --green:#107040, --green-lt:#EDFFF4, --orange:#C45A00, --blue:#1D4ED8
- Fonts: 'Bricolage Grotesque' (headings, font-weight:800), 'DM Sans' (body), 'Instrument Serif' (italic accents)
- Existing components: Reveal (scroll animation), AnimatedCounter (number count-up)
- Naming convention: CSS classes use prefix per page (e.g. .reg- for registration, .camp- for campaigns)
- All styles go in src/index.css (single stylesheet)

ROUTING:
- Hash-based routing in src/main.tsx
- Add new route: #/[page-name] → new page component
- Page files go in src/pages/[PageName].tsx

PAGE STRUCTURE:
- Each page has its own nav (sticky, with CCT logo + "Back to Home" link)
- Each page has a footer (© 2026 Chiranjeevi Charitable Trust · Hyderabad | Built by VoltusWave)
- Mobile-first responsive (breakpoint at 960px)
- All mock data uses Indian context (Telugu names, AP/TS cities, ₹ currency)
- No trailing full stops on UI text (headings, descriptions, taglines)
```

---

## Prompt 1 — Campaign Listing & Detail Page

**Route:** `#/campaigns`
**File:** `src/pages/Campaigns.tsx`
**CSS prefix:** `.camp-`

```
Build a Campaigns page for the CCT website with TWO views toggled via React state:

VIEW 1 — CAMPAIGN LISTING:
- Page header: "Fund a Cause" eyebrow, "Active Campaigns" heading, subtitle "Fund life-saving equipment and patient care across Andhra Pradesh & Telangana"
- Filter pills (horizontally scrollable): All, Equipment, Patient Support, Infrastructure, Emergency. Active filter gets red background
- Campaign grid: 2 columns desktop, 1 column mobile
- Each campaign card:
  • Gradient cover area with category emoji overlay (🏥 Equipment, ❤️ Patient Support, 🏗️ Infrastructure, 🚨 Emergency)
  • Category badge (top-left, colored by type)
  • Urgency badge if applicable ("Urgent" — pulsing red, "Closing Soon" — amber)
  • Title (Bricolage Grotesque)
  • Institution name + city
  • Progress bar (animated on scroll via Reveal component)
  • "₹X raised of ₹Y" with raised amount bold
  • Donor count + days remaining
  • "Contribute" CTA button
- "General Fund" card first, styled distinctly (dark background, gold accents): "Contribute to CCT's General Fund — your donation goes where it's needed most"

MOCK DATA (6 campaigns):
1. "Fund Platelet Separator" — ₹12,40,000/₹18,00,000 — Guntur Blood Bank — Equipment — 23 days
2. "Support 50 Thalassemia Patients Monthly" — ₹3,80,000/₹6,00,000 — NIMS Hyderabad — Patient Support — 45 days
3. "Emergency Blood Storage Unit" — ₹8,90,000/₹10,00,000 — Tirupati Hospital — Emergency — URGENT — 8 days
4. "Blood Bank Refrigeration Upgrade" — ₹5,20,000/₹12,00,000 — Kakinada Govt Hospital — Equipment — 60 days
5. "Mobile Blood Collection Van" — ₹22,00,000/₹25,00,000 — CCT Hyderabad — Infrastructure — 15 days
6. "Thalassemia Ward Renovation" — ₹1,50,000/₹8,00,000 — Visakhapatnam Hospital — Infrastructure — 90 days

VIEW 2 — CAMPAIGN DETAIL (triggered by clicking any card):
- Back button "← All Campaigns"
- Large cover area with category + urgency badges
- Campaign title (large heading)
- Institution details
- Large progress bar with ₹ amounts and percentage
- Donor count + days remaining as stat cards
- Description (2-3 paragraphs of realistic text)
- "Contributors" section: 5 recent donors (name or "Anonymous", amount, time ago)
- Donation section: Preset amount buttons (₹100, ₹500, ₹1,000, ₹2,500, ₹5,000) + custom input + "Donate ₹X" button
- Campaign updates: 2 entries with dates and text
- Share buttons (WhatsApp, X, Copy Link)
```

---

## Prompt 2 — Blood Bank Inventory Dashboard

**Route:** `#/blood-inventory`
**File:** `src/pages/BloodInventory.tsx`
**CSS prefix:** `.inv-`

```
Build a public Blood Bank Inventory page for the CCT website. This allows anyone — patients, families, hospital staff — to check blood availability across partner blood banks in AP & Telangana.

DESIGN: Clean, clinical, high-trust. This is a LIFE-OR-DEATH screen. Prioritize clarity and speed of information

SECTIONS:

1. Page Header — "Blood Bank Inventory" heading, "Real-time stock levels across CCT partner hospitals" subtitle, "Last synced: 15 minutes ago" with pulse dot

2. Emergency CTA Bar — "Need blood urgently? Call CCT helpline: 1800-XXX-XXXX" prominent red banner

3. Filter Bar:
   - Blood group selector: 8 circular buttons (A+, A−, B+, B−, AB+, AB−, O+, O−) + "All". Selected gets red ring
   - City dropdown: Hyderabad, Vijayawada, Guntur, Tirupati, Visakhapatnam, Kakinada, Warangal
   - Clear Filters button

4. Summary Strip — 3 stat cards: "X blood banks shown", "Y units critical", "Z units sufficient"

5. Blood Bank Cards (main content) — 5 cards, each with:
   • Blood bank name + hospital name
   • Address + city + phone number (tap-to-call on mobile)
   • Operating hours (e.g. "Open 24/7" or "9 AM – 6 PM")
   • 8-cell blood group grid: each cell shows blood type + unit count + status badge
   • Status: Critical (<10 units, red pulse), Low (10-30, amber), Sufficient (>30, green)
   • If blood group filter is active, highlight matching cells, dim others
   • "Last updated" timestamp per bank

MOCK DATA:
a) "Red Cross Blood Bank" — NIMS Hospital, Hyderabad — 24/7 — A+:45, A−:8, B+:32, B−:3, AB+:18, AB−:5, O+:52, O−:2
b) "Gandhi Hospital Blood Centre" — Gandhi Hospital, Hyderabad — 8AM-8PM — A+:28, A−:12, B+:15, B−:9, AB+:22, AB−:11, O+:35, O−:7
c) "NTR Blood Bank" — Vijayawada Govt Hospital — 24/7 — A+:60, A−:20, B+:44, B−:16, AB+:38, AB−:14, O+:55, O−:12
d) "SVR Blood Centre" — SVR Ruia Hospital, Tirupati — 9AM-6PM — various levels
e) "KGH Blood Bank" — King George Hospital, Visakhapatnam — 24/7 — various levels

6. Alert Subscription CTA — "Get notified when [blood type] becomes available near you" with phone input + blood type selector + "Subscribe" button
```

---

## Prompt 3 — Events Page

**Route:** `#/events`
**File:** `src/pages/Events.tsx`
**CSS prefix:** `.evt-`

```
Build an Events page for the CCT website with TWO views toggled via state:

VIEW 1 — EVENT LISTING:
- Page header: "What's Happening" eyebrow, "Events & Blood Drives" heading
- Filter pills: All Types, Blood Drive, Fundraiser, Awareness, Community. City dropdown. Date range: This Month / All Upcoming
- List view: vertical card list grouped by month
- Each event card:
  • Cover area with gradient background + event type emoji
  • Date badge (day + month)
  • Event type badge (color-coded: Blood Drive=red, Fundraiser=gold, Awareness=blue, Community=green)
  • Title, date + time, venue + city
  • Slots status ("142 of 500 slots remaining" with mini progress bar)
  • "Register" button
- "Submit an Event" CTA for fan club organisers

MOCK DATA (8 events):
1. "Mega Blood Drive 2026" — Blood Drive — May 15, 8AM-6PM — LB Stadium, Hyderabad — 358/500 slots
2. "Campus Blood Donation Camp" — Blood Drive — May 22, 10AM-4PM — JNTU Campus, Vijayawada — 45/200
3. "Birthday Celebration Blood Drive" — Blood Drive — Jun 2 — SVU, Tirupati — 200/300
4. "Thalassemia Awareness Walk" — Awareness — May 28, 7AM — Tank Bund, Hyderabad — 120/500
5. "Annual Fundraiser Gala" — Fundraiser — Jun 10, 6PM — Marriott, Hyderabad — 80/150 — ₹2,000/seat
6. "Community Health Check Camp" — Community — May 30, 9AM-1PM — Govt School, Guntur — 0/100
7. "Eye Donation Pledge Drive" — Awareness — Jun 5 — Kurnool Medical College — 50/200
8. "Fan Club Blood Drive Marathon" — Blood Drive — Jun 15 — Multiple cities — 0/1000

VIEW 2 — EVENT DETAIL (triggered by clicking any card):
- Back button
- Large hero area with event type badge
- Event title (large heading), date/time, venue/city
- Slot counter: "X slots remaining of Y" with progress bar
- Description (2 paragraphs of realistic text)
- Registration form (inline): Name, Phone, Blood Type dropdown, "Register" button
- On submit: success state with checkmark + "You're registered!"
- Share buttons (WhatsApp, X, Copy Link)
- "Similar Events" section with 2 other event cards
```

---

## Prompt 4 — Donor Wall & Leaderboards

**Route:** `#/donors`
**File:** `src/pages/DonorWall.tsx`
**CSS prefix:** `.dw2-`

```
Build a Donor Wall & Leaderboards page for the CCT website.

DESIGN: Celebratory, community-driven, warm tones. "Hall of fame" energy

SECTION 1 — DONOR WALL:
- "Wall of Heroes" heading, "Every donation writes a story of hope" subtitle
- Vertical feed of donation entries, each card showing:
  • Donor name (or "Anonymous") + avatar (initials in circle, colored background)
  • Blood type badge (red pill)
  • City
  • Time ago
  • Donation count ("4th donation" with star icon)
  • Tier indicator (Bronze/Silver/Gold/Platinum colored dot)
- Simulate new donation appearing every 8 seconds (push to top of list)
- "Load More" button at bottom

MOCK DATA: 20 entries with Telugu names (Ravi Kumar, Lakshmi Devi, Venkat Rao, Priya Reddy, Mahesh Babu, Swathi Naidu, etc.), various blood types, cities across AP/TS

SECTION 2 — LEADERBOARDS (tab navigation):
- Tabs: City | Individual | Fan Club

- City Leaderboard (default):
  • Monthly ranking with month selector
  • Top 3 as podium (2nd | 1st | 3rd, 1st elevated). Gold/Silver/Bronze styling
  • Remaining cities as ranked list (4th-10th) with rank, city, donations, funds
  • Mock: Hyderabad #1 (1,240 donations, ₹18.5L), Vijayawada #2 (890, ₹12.1L), Tirupati #3 (720, ₹9.8L), +7 more

- Individual Leaderboard:
  • Top donors by credits. Rank, name, tier badge, credits, donations, city
  • Top 3 with special styling
  • Mock: 10 donors with Platinum/Gold/Silver tiers

- Fan Club Leaderboard:
  • Ranked by events hosted + donations facilitated
  • Each: fan club name (e.g. "Mega Star Fans — Tirupati"), events, donations, members
  • Mock: 8 fan clubs
```

---

## Prompt 5 — About CCT

**Route:** `#/about`
**File:** `src/pages/About.tsx`
**CSS prefix:** `.abt-`

```
Build a full About page for the CCT website.

SECTIONS:

1. Hero — "About CCT" heading, "Chiranjeevi Charitable Trust — turning the love of millions into a force for good" subtitle. Use the chiranjeevi-portrait.png image (in /public folder) in a circular frame

2. Our Story — Timeline of CCT history:
   • 1998: "CCT Founded by Megastar Chiranjeevi"
   • 2005: "1,00,000 blood units milestone"
   • 2012: "First mega blood drive — 5,000 donors in one day"
   • 2018: "Partnership with 50+ hospitals across AP & TS"
   • 2024: "Digital platform launch"
   • 2026: "12 lakh units and counting"
   Vertical timeline with dots and connecting line

3. Trustees — Grid of 6 trustee cards. Each: photo placeholder (initials avatar), name, designation, brief bio (1 line). Mock Indian names and titles

4. Impact Stats — 4 large animated counters: 12L+ Blood Units, 4,700+ Lives Saved, 28,000+ Active Donors, 86 Partner Hospitals (use AnimatedCounter component)

5. Partner Hospitals — Logo placeholder grid showing 8 partner hospital names in bordered cards

6. Contact Section:
   - Address: "CCT Head Office, Film Nagar, Hyderabad, Telangana 500096"
   - Phone: "+91 40 2355 XXXX"
   - Email: "info@cct.org.in"
   - Contact form: Name, Email, Phone, Message, "Send Message" button
   - Social links row
```

---

## Prompt 6 — Donation / Contribution Page

**Route:** `#/donate`
**File:** `src/pages/Donate.tsx`
**CSS prefix:** `.don-`

```
Build a Donation checkout page for the CCT website. This is the PAYMENT flow — must feel secure, trustworthy, frictionless. No login required.

3-STEP FLOW:

STEP 1 — AMOUNT SELECTION:
- Context header: campaign name + mini progress bar (or "General Fund" if no specific campaign)
- Preset amounts: ₹100, ₹500, ₹1,000, ₹2,500, ₹5,000 in a grid. Selected gets red border. ₹500 has "Most Popular" badge
- Custom amount input with ₹ prefix (min ₹50)
- Impact preview: "₹500 can fund 1 blood transfusion session" (updates dynamically)
- "Continue →" button

STEP 2 — DONOR DETAILS:
- Full Name, Email, Phone (+91 prefix), PAN Number (optional — "Required for 80G tax certificate")
- Checkbox: "I'd like to receive impact updates" (default checked)
- Security strip: "🔒 SSL Secured · 📄 80G Cert · 🔓 No Account · 💳 UPI / Card"
- "Proceed to Payment →" button

STEP 3 — PAYMENT METHOD (mock):
- Payment options as selectable cards:
  • UPI (recommended badge) — mock UPI ID input
  • Credit/Debit Card — mock card number, expiry, CVV
  • Net Banking — mock bank dropdown
- Selected method expands to show fields
- Order summary: campaign, amount, name, email
- "Pay ₹X" large CTA

SUCCESS SCREEN:
- Green checkmark, "Thank you, [Name]!"
- Receipt: amount, campaign, transaction ID, date
- "80G certificate will be emailed within 48 hours"
- Share section: WhatsApp, X, Copy Link
- "Back to Home" and "Register as Donor" CTAs
```

---

## Prompt 7 — Good Works Community Feed

**Route:** `#/good-works`
**File:** `src/pages/GoodWorks.tsx`
**CSS prefix:** `.gw-`

```
Build a Good Works community feed page for the CCT website. Public feed of community-submitted stories celebrating blood drives, fundraising milestones, and volunteer achievements.

DESIGN: Warm, social, user-generated content feel. Masonry grid on desktop, single column on mobile

SECTIONS:

1. Header — "Good Works" heading, "Stories of impact from the CCT community" subtitle, "Share Your Story" CTA button

2. Filter pills: All, Blood Drives, Fundraisers, Volunteering, Milestones

3. Story Cards (masonry layout):
   Each card:
   - Gradient cover area (random warm tones per card)
   - Story text (max 500 chars)
   - Submitted by: name + organization
   - Date
   - Like button with count (heart, toggles liked state)
   - "✓ Verified by CCT" badge

MOCK DATA (8 stories):
a) "352 units collected at Tirupati birthday drive!" — Mega Star Fans Tirupati — 2 days ago — 234 likes
b) "Campus drive at JNTU reached 200 donors for the first time!" — JNTU Blood Drive Team — 5 days ago — 189
c) "Surgery funded in 72 hours! Thanks to 47 donors" — Dr Anand, Guntur Hospital — 1 week ago — 412
d) "15 first-time donors at Kakinada chapter event" — CCT Kakinada Chapter — 3 days ago — 98
e) "₹5 lakh raised for platelet separator in 10 days" — NIMS Hyderabad — 2 weeks ago — 567
f) "Blood type awareness camp at Warangal school" — Warangal Youth Club — 4 days ago — 76
g) "Our 100th blood drive! Grateful to every donor" — CCT Vijayawada — 1 week ago — 321
h) "Emergency O- arranged within 2 hours through CCT" — Sunita K, Hyderabad — 6 days ago — 445

4. Story Submission Modal (triggered by "Share Your Story"):
   - Fields: Name, Organization (optional), Story Text (textarea, 500 char limit with counter), Photo Upload placeholder
   - "No account required" reassurance
   - "Submit for Review" button
   - Success message on submit

5. "Load More" button
```

---

## Prompt 8 — Our Impact / Stats Page

**Route:** `#/impact`
**File:** `src/pages/Impact.tsx`
**CSS prefix:** `.imp-`

```
Build an "Our Impact" stats page for the CCT website. Data visualization showcase of CCT's lifetime achievements. This should be VISUALLY STUNNING — the page people screenshot and share.

DESIGN: Use --ink-warm (#1A0A10) dark background. Numbers in gold (--gold). Accents in red (--red). "Annual report meets infographic"

SECTIONS:

1. Hero Stats (full viewport height):
   - 4 massive animated counters in a 2x2 grid (stack on mobile):
     • "12,00,000+" — Blood Units Collected
     • "4,700+" — Lives Saved
     • "28,000+" — Active Donors
     • "₹2.3 Crore" — Funds Raised
   - Each in Bricolage Grotesque, gold color, very large (48px mobile, 72px desktop)
   - Use AnimatedCounter component

2. Timeline — "Our Journey"
   - Vertical timeline with key milestones:
     • 1998: "CCT Founded by Megastar Chiranjeevi"
     • 2005: "1,00,000 blood units milestone"
     • 2012: "First mega blood drive — 5,000 donors in one day"
     • 2018: "Partnership with 50+ hospitals across AP & TS"
     • 2024: "Digital platform launch"
     • 2026: "12 lakh units and counting"
   - Timeline dots and connecting line using CSS

3. District Heatmap (simplified):
   - 12 district cards with color intensity based on donation volume
   - Darker = more donations. Hover: shows district name + count
   - Staggered entrance animation via Reveal

4. Monthly Trends (CSS bar chart):
   - 12 bars (Apr 2025 – Mar 2026), grow upward when scrolled into view
   - Each bar labeled with count. Highest month in gold
   - Data: range 800-2,400/month

5. Blood Type Distribution (CSS donut chart):
   - SVG donut with 8 segments
   - Mock: O+ 35%, B+ 25%, A+ 20%, AB+ 8%, O- 5%, B- 3%, A- 3%, AB- 1%

6. Campaign Impact:
   - "₹2.3 Crore raised across 47 campaigns"
   - 3 cards: "12 Equipment Campaigns", "2,500+ Patients Supported", "8 Blood Banks Upgraded"

7. CTA — "Be part of the next chapter" with "Register as Donor" and "View Campaigns" buttons
```

---

## Execution Order

Build in this order for best results:

1. **Campaigns** (#/campaigns) — core conversion page
2. **Blood Inventory** (#/blood-inventory) — life-saving utility
3. **Events** (#/events) — engagement driver
4. **Donor Wall** (#/donors) — community showcase
5. **About CCT** (#/about) — trust builder
6. **Donation Flow** (#/donate) — payment page
7. **Good Works** (#/good-works) — UGC feed
8. **Our Impact** (#/impact) — data showcase

After each page, register its route in `src/main.tsx` and wire up any navigation links from the home page or other pages.
