# CCT Website — Premium UI Page Prompts (v2)
## 8 Pages · PRD-Level Design Specifications

---

## Global Technical Constraints

```
PROJECT: Existing React 19 + TypeScript + Vite project at cct-react/
STYLING: Custom CSS only in src/index.css — NO Tailwind, NO CSS-in-JS
ANIMATION: CSS transitions + existing Reveal component — NO Framer Motion
ICONS: Emoji/unicode only — NO icon libraries
PACKAGES: react, react-dom only — NO new installs
ROUTING: Hash-based (#/page-name) in src/main.tsx
FILES: Page components in src/pages/PageName.tsx, all styles in src/index.css
RESPONSIVE: Desktop-first, breakpoint at 960px for mobile

CSS VARIABLES:
  --red: #CC0033          --red2: #E8003A         --red-pale: #FDEEF2
  --ink: #0D0905          --ink-warm: #1A0A10     --muted: #6B5C4A
  --bg: #F4EFE6           --bg2: #EDE7DC          --surface: #FFFFFF
  --border: #DDD3C4       --gold: #C98A0A         --gold-lt: #FEF3D7
  --green: #107040        --green-lt: #EDFFF4
  --orange: #C45A00       --orange-lt: #FFF3E0
  --blue: #1D4ED8         --blue-lt: #EFF6FF

FONTS:
  Headings: 'Bricolage Grotesque', weight 800, letter-spacing -0.02em
  Body: 'DM Sans', weight 300-600
  Accent/Italic: 'Instrument Serif', italic

EXISTING COMPONENTS: Reveal (scroll-triggered fade-up), AnimatedCounter (number count-up)
NAMING: CSS classes prefixed per page (e.g. .camp- for campaigns)
TEXT: No trailing full stops on headings, taglines, descriptions, card text
```

---

## Prompt 1 — Campaigns Page

**Route:** `#/campaigns` · **File:** `src/pages/Campaigns.tsx` · **Prefix:** `.camp-`

### Design Direction
Think **charity: water** meets **Kickstarter**. Every card should make you want to contribute. Progress bars are the hero — they create urgency and social proof. The page must answer: "Where does my money go?" in under 3 seconds.

### Layout Specification

```
PAGE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ STICKY NAV (62px height)                        │
│  [● CCT]                    [← Back to Home]    │
├─────────────────────────────────────────────────┤
│ HERO BANNER (padding: 64px 52px, bg: --bg)      │
│  Eyebrow: "Fund a Cause" (10px, --red, uppercase)│
│  Heading: "Every Rupee                          │
│            Changes a Life" (clamp 32-52px)       │
│  Subtitle: 15px, --muted, max-width 520px       │
│  Stats row: [₹2.3Cr Raised] [47 Campaigns] [3.2K Donors] │
├─────────────────────────────────────────────────┤
│ FILTER BAR (sticky below nav, bg: --bg,         │
│             padding: 16px 52px, border-bottom)   │
│  Pills: [All] [Equipment] [Patient Support]     │
│         [Infrastructure] [Emergency]             │
│  Right: City dropdown + Status toggle            │
├─────────────────────────────────────────────────┤
│ GENERAL FUND CARD (full-width, special styling)  │
│  bg: --ink-warm, rounded 22px, padding 36px     │
│  Left: heading + description                     │
│  Right: "Contribute" button                      │
├─────────────────────────────────────────────────┤
│ CAMPAIGN GRID (2-col desktop, 1-col mobile)      │
│  gap: 20px, padding: 0 52px 64px                │
│  Each card: see CARD SPEC below                  │
├─────────────────────────────────────────────────┤
│ FOOTER                                           │
└─────────────────────────────────────────────────┘
```

### Campaign Card Spec
```
CARD (bg: --surface, border: 1px --border, radius: 20px, overflow: hidden)
┌──────────────────────────────┐
│ COVER (height: 180px)        │
│  gradient bg per category     │
│  emoji icon (48px, centered, │
│    opacity 0.2)               │
│  [Category badge] top-left    │
│  [Urgency badge] top-right    │
│    (if urgent: red bg, pulse) │
├──────────────────────────────┤
│ BODY (padding: 22px)         │
│                              │
│ Title (17px, Bricolage, 700) │
│ Institution · City (12px,    │
│   --muted)                   │
│                              │
│ Progress bar (height: 6px,   │
│   radius 3px, gradient       │
│   red→red2)                  │
│ ₹X raised of ₹Y (13px)     │
│   raised amount: bold --ink  │
│   goal: --muted              │
│                              │
│ ┌────────────┬──────────────┐│
│ │🤝 1,240    │ ⏱ 23 days   ││
│ │ donors     │ remaining    ││
│ └────────────┴──────────────┘│
│                              │
│ [    Contribute →    ]       │
│  (full-width, --ink bg,      │
│   radius 14px, 13px,         │
│   uppercase, hover: --red)   │
└──────────────────────────────┘

CATEGORY GRADIENTS:
  Equipment:     linear-gradient(135deg, #1a0a1e, #0a0510)
  Patient Support: linear-gradient(135deg, #1a0610, #080204)
  Infrastructure:  linear-gradient(135deg, #0a1428, #050a18)
  Emergency:     linear-gradient(135deg, #2a0a0a, #0a0204)

CATEGORY BADGES:
  Equipment: 🏥 bg rgba(29,78,216,.15), color --blue
  Patient Support: ❤️ bg rgba(204,0,51,.1), color --red
  Infrastructure: 🏗️ bg rgba(201,138,10,.15), color --gold
  Emergency: 🚨 bg rgba(204,0,51,.2), color --red, + animation pulse

URGENCY BADGE:
  "Urgent": bg --red, color white, font 9px, uppercase, letter-spacing 0.14em
  Pulse animation: box-shadow 0 0 0 0 rgba(204,0,51,.4) expanding to 8px
```

### Campaign Detail View Spec
```
DETAIL VIEW (replaces listing, CSS fade transition)
┌──────────────────────────────────────────────┐
│ [← All Campaigns] (back button, --muted)      │
├──────────────────────────────────────────────┤
│ HERO COVER (height: 280px, radius 22px)       │
│  gradient bg, category emoji (72px, 0.15)     │
│  badges overlaid bottom-left                  │
├──────────────────────────────────────────────┤
│ TWO-COLUMN LAYOUT (7fr 3fr, gap 40px)         │
│                                              │
│ LEFT COLUMN:                                  │
│  Title (clamp 28-42px, Bricolage 800)         │
│  Institution row: 🏥 name · city (14px)      │
│                                              │
│  PROGRESS SECTION (bg: --bg, radius 16px,    │
│    padding 24px, margin 24px 0)               │
│    Progress bar (8px height)                  │
│    ₹ amounts row (flex space-between)         │
│    Stat pills: [1,240 donors] [23 days left] │
│                                              │
│  DESCRIPTION (16px, --muted, line-height 1.85,│
│    2-3 paragraphs, max-width 600px)           │
│                                              │
│  UPDATES SECTION                              │
│    "Campaign Updates" subheading              │
│    2 update cards (date + text)               │
│                                              │
│ RIGHT COLUMN (sticky, top: 80px):             │
│  DONATION CARD (bg: --surface, border,        │
│    radius 20px, padding 28px)                 │
│    "Make a Donation" heading (17px)           │
│    Amount grid (3-col): ₹100 ₹500 ₹1K       │
│                         ₹2.5K ₹5K Custom     │
│    Amount buttons:                            │
│      default: bg --bg, border --border        │
│      selected: bg --red-pale, border --red,   │
│        color --red, scale 1.03                │
│    Custom input: ₹ prefix + number field      │
│    [Donate ₹X →] button                      │
│      bg: gradient(--red, --red2)              │
│      full-width, 16px, padding 16px           │
│      box-shadow: 0 4px 24px rgba(204,0,51,.2)│
│    Trust strip: 🔒 SSL · 📄 80G · 💳 UPI    │
│                                              │
│  CONTRIBUTORS (bg: --bg, radius 16px, p 20px)│
│    "Recent Contributors" heading              │
│    5 rows: avatar · name · ₹amount · time    │
│                                              │
│  SHARE ROW                                    │
│    WhatsApp · X · Copy Link buttons           │
│                                              │
│ MOBILE: single column, donation card          │
│   becomes sticky bottom bar                   │
└──────────────────────────────────────────────┘
```

### Mock Data
```
CAMPAIGNS:
1. title: "Fund Platelet Separator"
   institution: "Guntur Blood Bank", city: "Guntur, AP"
   category: "Equipment", raised: 1240000, goal: 1800000, days: 23, donors: 1240

2. title: "Support 50 Thalassemia Patients Monthly"
   institution: "NIMS Hospital", city: "Hyderabad, TS"
   category: "Patient Support", raised: 380000, goal: 600000, days: 45, donors: 418

3. title: "Emergency Blood Storage Unit"
   institution: "Tirupati Govt Hospital", city: "Tirupati, AP"
   category: "Emergency", urgent: true, raised: 890000, goal: 1000000, days: 8, donors: 2108

4. title: "Blood Bank Refrigeration Upgrade"
   institution: "Kakinada Govt Hospital", city: "Kakinada, AP"
   category: "Equipment", raised: 520000, goal: 1200000, days: 60, donors: 340

5. title: "Mobile Blood Collection Van"
   institution: "CCT Central", city: "Hyderabad, TS"
   category: "Infrastructure", raised: 2200000, goal: 2500000, days: 15, donors: 3200

6. title: "Thalassemia Ward Renovation"
   institution: "KGH Hospital", city: "Visakhapatnam, AP"
   category: "Infrastructure", raised: 150000, goal: 800000, days: 90, donors: 89

CONTRIBUTORS (for detail view):
  "Ravi K." ₹5,000 2h ago | "Anonymous" ₹1,000 4h ago | "Priya M." ₹2,500 6h ago
  "Venkat G." ₹500 8h ago | "Lakshmi D." ₹10,000 12h ago
```

---

## Prompt 2 — Blood Bank Inventory

**Route:** `#/blood-inventory` · **File:** `src/pages/BloodInventory.tsx` · **Prefix:** `.inv-`

### Design Direction
Think **hospital dashboard** meets **flight status board**. Clinical precision, not decorative. Every pixel earns its place. Critical status must be visible from 3 feet away. Red = danger, amber = caution, green = okay. High contrast, large text for stock counts, zero ambiguity.

### Layout Specification
```
PAGE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ STICKY NAV                                       │
├─────────────────────────────────────────────────┤
│ HEADER (padding: 48px 52px 24px)                 │
│  "Blood Bank Inventory" (clamp 28-44px)          │
│  "Real-time stock levels across CCT partner      │
│   hospitals" (15px, --muted)                     │
│  Sync indicator: [● green dot] "15 min ago"      │
├─────────────────────────────────────────────────┤
│ EMERGENCY BAR (bg: --red, radius 14px,           │
│   margin 0 52px, padding 16px 24px)              │
│  "🚨 Need blood urgently?"                      │
│  "Call CCT helpline: 1800-425-XXXX"             │
│  Right: [Call Now] button (white, radius 30px)   │
├─────────────────────────────────────────────────┤
│ FILTER BAR (sticky, bg: --bg, padding 20px 52px) │
│  Blood type pills: 8 circles (44px diameter)     │
│    default: bg --surface, border --border         │
│    selected: bg --red-pale, border --red          │
│    + [All] text pill                             │
│  City dropdown (right)                           │
│  [Clear Filters] text link                       │
├─────────────────────────────────────────────────┤
│ SUMMARY STRIP (flex row, gap 14px, pad 0 52px)   │
│  3 stat cards (bg: --surface, border, rad 14px,  │
│    padding 16px 20px)                            │
│  "5 blood banks" · "12 units critical" ·         │
│  "384 units sufficient"                          │
├─────────────────────────────────────────────────┤
│ BLOOD BANK CARDS (stack, gap 16px, pad 0 52px)   │
│  See CARD SPEC below                             │
├─────────────────────────────────────────────────┤
│ ALERT CTA (bg: --bg2, radius 20px, margin 40px)  │
│  "Get notified when [type] is available"         │
│  Phone input + type selector + Subscribe btn     │
├─────────────────────────────────────────────────┤
│ FOOTER                                           │
└─────────────────────────────────────────────────┘
```

### Blood Bank Card Spec
```
CARD (bg: --surface, border: 1.5px --border, radius: 20px, padding: 28px)
┌──────────────────────────────────────────────────┐
│ TOP ROW (flex space-between, align-items center)  │
│  Left:                                           │
│    Bank name (18px, Bricolage, 700)              │
│    Hospital name (13px, --muted)                 │
│  Right:                                          │
│    Hours badge: "24/7" or "9AM-6PM"              │
│      (10px, uppercase, bg --green-lt or --bg2,    │
│       radius 8px, padding 4px 10px)              │
├──────────────────────────────────────────────────┤
│ INFO ROW (flex, gap 24px, margin 12px 0 20px,    │
│   font 13px, color --muted)                      │
│  📍 Address, City                                │
│  📞 Phone (tel: link, color --red on hover)      │
├──────────────────────────────────────────────────┤
│ BLOOD GROUP GRID (4-col desktop, 2-col mobile)    │
│  gap: 8px                                        │
│                                                  │
│  EACH CELL (radius 12px, padding 14px, centered) │
│    Blood type label (14px, Bricolage, 700)       │
│    Unit count (24px, Bricolage, 800)             │
│    Status text (10px, uppercase, 0.1em spacing)  │
│                                                  │
│    CRITICAL (<10): bg rgba(204,0,51,.08),        │
│      border 1.5px rgba(204,0,51,.2),             │
│      count color --red, label "CRITICAL" --red   │
│      + subtle pulse animation on border          │
│                                                  │
│    LOW (10-30): bg rgba(196,90,0,.06),           │
│      border 1.5px rgba(196,90,0,.15),            │
│      count color --orange, label "LOW"           │
│                                                  │
│    SUFFICIENT (>30): bg rgba(16,112,64,.06),     │
│      border 1.5px rgba(16,112,64,.15),           │
│      count color --green, label "OK"             │
│                                                  │
│    DIMMED (when filter active, not matching):     │
│      opacity 0.3, filter grayscale(1)            │
├──────────────────────────────────────────────────┤
│ FOOTER ROW (flex space-between, 11px, --muted)    │
│  "Last updated: 15 Apr, 2:30 PM"                │
│  "Get Directions →" link (color --red)           │
└──────────────────────────────────────────────────┘
```

### Mock Data
```
BLOOD BANKS:
a) name: "Red Cross Blood Bank", hospital: "NIMS Hospital", city: "Hyderabad"
   hours: "24/7", phone: "+91 40 2345 6789", address: "Punjagutta, Hyderabad"
   stock: { "A+":45, "A-":8, "B+":32, "B-":3, "AB+":18, "AB-":5, "O+":52, "O-":2 }

b) name: "Gandhi Hospital Blood Centre", hospital: "Gandhi Hospital", city: "Hyderabad"
   hours: "8AM–8PM", phone: "+91 40 2765 4321"
   stock: { "A+":28, "A-":12, "B+":15, "B-":9, "AB+":22, "AB-":11, "O+":35, "O-":7 }

c) name: "NTR Blood Bank", hospital: "Vijayawada Govt Hospital", city: "Vijayawada"
   hours: "24/7", phone: "+91 866 257 1234"
   stock: { "A+":60, "A-":20, "B+":44, "B-":16, "AB+":38, "AB-":14, "O+":55, "O-":12 }

d) name: "SVR Blood Centre", hospital: "SVR Ruia Hospital", city: "Tirupati"
   hours: "9AM–6PM", phone: "+91 877 225 6789"
   stock: { "A+":35, "A-":6, "B+":28, "B-":11, "AB+":15, "AB-":4, "O+":42, "O-":9 }

e) name: "KGH Blood Bank", hospital: "King George Hospital", city: "Visakhapatnam"
   hours: "24/7", phone: "+91 891 256 7890"
   stock: { "A+":50, "A-":18, "B+":40, "B-":14, "AB+":25, "AB-":8, "O+":48, "O-":6 }
```

---

## Prompt 3 — Events Page

**Route:** `#/events` · **File:** `src/pages/Events.tsx` · **Prefix:** `.evt-`

### Design Direction
Think **Eventbrite** meets **Apple Events page**. Clean, visual, scannable. Each event card should feel like a mini poster. The registration flow must feel effortless — name, phone, blood type, done. Calendar dots give a bird's-eye view. Filter by type first, city second.

### Layout Specification
```
PAGE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ STICKY NAV                                       │
├─────────────────────────────────────────────────┤
│ HEADER (padding: 64px 52px 32px, bg: --bg)       │
│  "What's Happening" eyebrow (--red)              │
│  "Events & Blood Drives" (clamp 32-52px)         │
│  3 stat pills: [12 Upcoming] [5 Cities]          │
│                 [2,400 Slots Open]                │
├─────────────────────────────────────────────────┤
│ FILTER BAR (sticky, bg: --bg, z-index 400)       │
│  Type pills + City dropdown + Date range toggle  │
├─────────────────────────────────────────────────┤
│ EVENT LIST (gap 16px, padding 0 52px)            │
│  Month group label: "May 2026" (12px, --muted)   │
│  Cards: see CARD SPEC                            │
├─────────────────────────────────────────────────┤
│ SUBMIT EVENT CTA (bg: --bg2, radius 20px)        │
│  "Organising an event? Add it here"             │
│  [Submit Event →] button                         │
├─────────────────────────────────────────────────┤
│ FOOTER                                           │
└─────────────────────────────────────────────────┘
```

### Event Card Spec
```
CARD (bg: --surface, border, radius 20px, overflow hidden)
HORIZONTAL LAYOUT on desktop (grid: 200px 1fr), VERTICAL on mobile

┌────────────┬─────────────────────────────────────┐
│ LEFT:      │ RIGHT (padding: 22px 24px):          │
│ COVER      │                                     │
│ (200px w,  │ Type badge: "🩸 Blood Drive"        │
│  full h)   │   (10px, uppercase, colored by type) │
│  gradient  │                                     │
│  bg        │ Title (18px, Bricolage, 700)         │
│  + emoji   │ 📅 May 15, 2026 · 8AM–6PM          │
│  (40px,    │ 📍 LB Stadium, Hyderabad            │
│  0.15 op)  │   (13px, --muted)                   │
│            │                                     │
│ DATE BADGE │ SLOT BAR:                            │
│ (absolute  │  "142 of 500 slots remaining"       │
│  top-left, │  mini progress bar (4px, radius 2px) │
│  bg blur,  │  color: >50% --green, <30% --orange, │
│  white)    │         <10% --red pulse             │
│  DD (22px) │                                     │
│  MMM (9px) │ [Register →] button (right-aligned)  │
│            │   bg: --ink, hover: --red             │
└────────────┴─────────────────────────────────────┘

TYPE COLORS:
  Blood Drive: cover gradient #1a0610→#080204, badge bg --red-pale, color --red
  Fundraiser:  cover gradient #1a1000→#0a0800, badge bg --gold-lt, color --gold
  Awareness:   cover gradient #001428→#00080f, badge bg --blue-lt, color --blue
  Community:   cover gradient #012a10→#001508, badge bg --green-lt, color --green
```

### Event Detail View Spec
```
DETAIL (replaces list, fade transition):
┌──────────────────────────────────────────────────┐
│ [← All Events] back link                         │
├──────────────────────────────────────────────────┤
│ HERO COVER (height: 300px, radius 22px,          │
│   gradient bg, emoji 72px at 0.1 opacity)        │
│  Date badge (large), type badge bottom-left      │
├──────────────────────────────────────────────────┤
│ TWO-COLUMN (7fr 3fr, gap 40px)                   │
│                                                  │
│ LEFT:                                            │
│  Title (clamp 28-42px)                           │
│  Info row: 📅 date/time · 📍 venue/city         │
│  Slot counter card (bg --bg, radius 16px):       │
│    "142 slots remaining of 500"                  │
│    progress bar (8px)                            │
│    percentage text                               │
│  Description (2 paragraphs, 15px, --muted)       │
│  Share buttons                                   │
│  "Similar Events" (2 cards)                      │
│                                                  │
│ RIGHT (sticky):                                  │
│  REGISTRATION CARD (bg --surface, border,        │
│    radius 20px, padding 28px)                    │
│    "Register for this Event" heading             │
│    Fields: Name, Phone (+91), Blood Type dropdown│
│    [Register →] submit button                    │
│    Success state: ✓ "You're registered!"         │
│      + event details summary                     │
│                                                  │
│ MOBILE: single column, reg card at bottom        │
└──────────────────────────────────────────────────┘
```

### Mock Data
```
EVENTS:
1. title: "Mega Blood Drive 2026", type: "blood", date: "May 15, 2026", time: "8AM–6PM"
   venue: "LB Stadium", city: "Hyderabad", slots: 500, filled: 358
2. title: "Campus Blood Donation Camp", type: "blood", date: "May 22", time: "10AM–4PM"
   venue: "JNTU Campus", city: "Vijayawada", slots: 200, filled: 45
3. title: "Birthday Celebration Blood Drive", type: "blood", date: "Jun 2"
   venue: "Sri Venkateswara University", city: "Tirupati", slots: 300, filled: 200
4. title: "Thalassemia Awareness Walk", type: "awareness", date: "May 28", time: "7AM"
   venue: "Tank Bund", city: "Hyderabad", slots: 500, filled: 120
5. title: "Annual Fundraiser Gala", type: "fundraiser", date: "Jun 10", time: "6PM"
   venue: "Marriott", city: "Hyderabad", slots: 150, filled: 80, price: "₹2,000/seat"
6. title: "Community Health Check Camp", type: "community", date: "May 30", time: "9AM–1PM"
   venue: "Government School", city: "Guntur", slots: 100, filled: 0
7. title: "Eye Donation Pledge Drive", type: "awareness", date: "Jun 5"
   venue: "Kurnool Medical College", city: "Kurnool", slots: 200, filled: 50
8. title: "Fan Club Blood Drive Marathon", type: "blood", date: "Jun 15"
   venue: "Multiple cities", city: "AP & TS", slots: 1000, filled: 0
```

---

## Prompt 4 — Donor Wall & Leaderboards

**Route:** `#/donors` · **File:** `src/pages/DonorWall.tsx` · **Prefix:** `.dw2-`

### Design Direction
Think **GitHub contribution graph** meets **Olympic podium**. The Donor Wall is a living, breathing social proof engine — names appearing in real-time. The leaderboard is competitive but warm — cities, individuals, and fan clubs battling for the top spot. Gold (#C98A0A) is the accent here, not red.

### Layout Specification
```
PAGE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ STICKY NAV                                       │
├─────────────────────────────────────────────────┤
│ HEADER (padding 64px 52px 40px)                  │
│  "Our Heroes" eyebrow (--gold)                   │
│  "Wall of Heroes" (clamp 36-56px)                │
│  "Every donation writes a story of hope" (15px)  │
├─────────────────────────────────────────────────┤
│ TWO-COLUMN LAYOUT (5fr 4fr, gap 40px)            │
│                                                  │
│ LEFT — DONOR FEED:                               │
│  Live indicator: "● Live" (green dot + text)     │
│  Feed of donation cards (gap 10px)               │
│                                                  │
│  DONATION CARD (bg: --surface, border,           │
│    radius 16px, padding 16px 20px):              │
│  ┌─────────────────────────────────────┐         │
│  │ [Avatar]  Name        [Blood Badge] │         │
│  │  (40px    Ravi Kumar      A+        │         │
│  │   circle  📍 Hyderabad   (red pill) │         │
│  │   initials,                         │         │
│  │   colored  "4th donation ★"         │         │
│  │   bg)      2 hours ago              │         │
│  │           Tier: ● Silver            │         │
│  └─────────────────────────────────────┘         │
│                                                  │
│  New entries push in from top every 8s           │
│  [Load More] button at bottom                    │
│                                                  │
│ RIGHT — LEADERBOARD:                             │
│  Tab bar: [City] [Individual] [Fan Club]         │
│    active tab: border-bottom 2px --red           │
│                                                  │
│  CITY TAB (default):                             │
│    Month selector: [←] April 2026 [→]           │
│    PODIUM (flex, align-items flex-end):           │
│    ┌────┐┌────────┐┌────┐                        │
│    │ 🥈 ││  🥇    ││ 🥉 │                        │
│    │ VJA ││  HYD   ││ TPT│                        │
│    │ 890 ││ 1,240  ││ 720│                        │
│    │80px ││ 120px  ││70px│  (height = rank)      │
│    └────┘└────────┘└────┘                        │
│    Podium bars: gold/silver/bronze gradients      │
│                                                  │
│    Ranked list (4th-10th):                       │
│    Each: rank# · city · donations · ₹ funds     │
│                                                  │
│  INDIVIDUAL TAB:                                 │
│    Top 3 with card styling (gold border for #1)  │
│    List: rank, name, tier badge, credits, city   │
│                                                  │
│  FAN CLUB TAB:                                   │
│    Each: club name, events hosted, donations,    │
│    member count. Top 3 highlighted               │
│                                                  │
│ MOBILE: single column, feed above leaderboard    │
└──────────────────────────────────────────────────┘

TIER COLORS:
  Bronze:   #CD7F32, bg rgba(205,127,50,.1)
  Silver:   #8E8E8E, bg rgba(142,142,142,.1)
  Gold:     #C98A0A, bg rgba(201,138,10,.1)
  Platinum: #6B7280, bg rgba(107,114,128,.1)

AVATAR COLORS (rotate): #FDEEF2, #EFF6FF, #FEF3D7, #EDFFF4, #FFF3E0
```

### Mock Data
```
DONORS (20 entries):
Ravi Kumar A+ Hyderabad 2h ago 4th Silver | Lakshmi Devi O+ Vijayawada 3h ago 7th Gold
Venkat Rao B+ Tirupati 4h ago 2nd Bronze | Priya Reddy AB+ Hyderabad 5h ago 12th Platinum
Mahesh B A- Guntur 6h ago 1st Bronze | Swathi N O- Warangal 7h ago 3rd Silver
Arjun S B- Kakinada 8h ago 5th Gold | Divya T O+ Nellore 9h ago 2nd Bronze
Kiran R A+ Vizag 10h ago 8th Silver | Ananya P AB- Kurnool 11h ago 1st Bronze
Suresh N B+ Rajahmundry 12h ago 6th Gold | Meena V O+ Hyderabad 13h ago 15th Platinum
Rahul D A+ Warangal 14h ago 3rd Silver | Sunita K B+ Vijayawada 15h ago 9th Gold
Mohan C A- Tirupati 16h ago 2nd Bronze | Kavya L O+ Guntur 17h ago 4th Silver
Anil P B- Nellore 18h ago 1st Bronze | Sita A O- Hyderabad 19h ago 11th Gold
Ramesh G A+ Kakinada 20h ago 5th Silver | Deepa R AB+ Vizag 21h ago 3rd Bronze

CITY LEADERBOARD:
1. Hyderabad 1,240 ₹18.5L | 2. Vijayawada 890 ₹12.1L | 3. Tirupati 720 ₹9.8L
4. Visakhapatnam 610 ₹8.2L | 5. Guntur 480 ₹6.5L | 6. Warangal 350 ₹4.8L
7. Kakinada 290 ₹3.9L | 8. Kurnool 210 ₹2.8L | 9. Nellore 180 ₹2.4L
10. Rajahmundry 140 ₹1.9L

FAN CLUBS:
1. "Mega Star Fans — Hyderabad" 42 events 3,200 donations 1,800 members
2. "CCT Vijayawada Chapter" 28 events 1,900 donations 950 members
3. "Mega Star Fans — Tirupati" 22 events 1,400 donations 720 members
4-8: Guntur, Vizag, Warangal, Kakinada, Kurnool chapters
```

---

## Prompt 5 — About CCT

**Route:** `#/about` · **File:** `src/pages/About.tsx` · **Prefix:** `.abt-`

### Design Direction
Think **Apple "About" page** meets **NGO annual report**. Story-driven, emotional, trust-building. The timeline is the centerpiece — it tells a 28-year story of impact. Trustees grid adds institutional credibility. The portrait of Chiranjeevi anchors the emotional appeal. Contact section must feel accessible, not corporate.

### Layout Specification
```
PAGE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ STICKY NAV                                       │
├─────────────────────────────────────────────────┤
│ HERO (bg: --ink-warm, padding 80px 52px,         │
│   min-height 480px, two-column 5fr 4fr)          │
│                                                  │
│  LEFT:                                           │
│   "About CCT" eyebrow (--red, 10px)              │
│   "Turning the love of millions into a force     │
│    for good" (clamp 32-48px, white, Bricolage)   │
│   Description (15px, rgba(255,255,255,.5),       │
│     max-width 460px, line-height 1.85)           │
│   2 CTA buttons: [Our Impact] [Contact Us]       │
│                                                  │
│  RIGHT (flex center):                            │
│   Circular portrait (240px, border 3px           │
│     rgba(204,0,51,.3), box-shadow red glow)      │
│   "Megastar Chiranjeevi" name tag below          │
│                                                  │
│  MOBILE: single col, image above text            │
├─────────────────────────────────────────────────┤
│ STATS STRIP (bg: --bg, padding 48px 52px)        │
│  4 counters in row: 27+ Years · 12L+ Units ·    │
│  4.7K+ Lives · 86 Hospitals                     │
│  (AnimatedCounter, Bricolage 36px, --ink)        │
│  Labels: 11px --muted, uppercase                 │
├─────────────────────────────────────────────────┤
│ TIMELINE (bg: --surface, padding 64px 52px)      │
│  "Our Journey" heading                           │
│                                                  │
│  VERTICAL TIMELINE (max-width 700px, centered)   │
│  Left line: 2px --border, absolute               │
│  Each milestone:                                 │
│    Dot (12px circle, bg --red, on the line)      │
│    Year (16px, Bricolage, 800, --red)            │
│    Text (14px, --ink)                            │
│    Alternating left/right on desktop              │
│    All left-aligned on mobile                    │
│  6 milestones: 1998, 2005, 2012, 2018, 2024, 2026│
├─────────────────────────────────────────────────┤
│ TRUSTEES (bg: --bg, padding 64px 52px)           │
│  "Board of Trustees" heading                     │
│  3-col grid (2-col mobile), gap 20px             │
│  Each card (bg: --surface, border, radius 20px,  │
│    padding 28px, text-align center):             │
│    Avatar circle (64px, bg --bg2, initials)      │
│    Name (16px, Bricolage, 700)                   │
│    Designation (12px, --red)                     │
│    Bio line (13px, --muted)                      │
├─────────────────────────────────────────────────┤
│ PARTNERS (bg: --surface, padding 56px 52px)      │
│  "Partner Hospitals" heading                     │
│  4-col logo grid (2-col mobile)                  │
│  Each: bordered card, hospital name centered     │
├─────────────────────────────────────────────────┤
│ CONTACT (bg: --bg2, padding 64px 52px)           │
│  Two-column (1fr 1fr, gap 48px)                  │
│                                                  │
│  LEFT:                                           │
│   "Get in Touch" heading                         │
│   Address block with 📍 icon                     │
│   Phone with 📞 icon (tap-to-call)              │
│   Email with ✉️ icon (mailto link)              │
│   Social row: 4 icon circles                     │
│                                                  │
│  RIGHT:                                          │
│   Contact form card (bg: --surface, radius 20px, │
│     padding 32px)                                │
│   Fields: Name, Email, Phone, Message (textarea) │
│   [Send Message →] button                        │
│   Success state on submit                        │
│                                                  │
│  MOBILE: single column                           │
├─────────────────────────────────────────────────┤
│ FOOTER                                           │
└─────────────────────────────────────────────────┘
```

### Mock Data
```
TRUSTEES:
1. "Konidela Chiranjeevi" — Founder & Chairman — "Actor, philanthropist, and visionary behind CCT"
2. "Dr Priya Ranjan" — Medical Director — "30 years in transfusion medicine and blood banking"
3. "Srinivas Reddy K" — Chief Operating Officer — "Former IAS officer, public health specialist"
4. "Lakshmi Narasimha Rao" — Treasurer — "Chartered accountant and financial governance expert"
5. "Dr Anjali Mehta" — Head of Partnerships — "Built CCT's 86-hospital partner network"
6. "Venkat Subramaniam" — Technology Lead — "Leading CCT's digital transformation"

PARTNERS:
NIMS Hospital · Gandhi Hospital · NTR Blood Bank · SVR Ruia Hospital
KGH Visakhapatnam · Guntur Govt Hospital · KIMS Hyderabad · Apollo Blood Bank
```

---

## Prompt 6 — Donation / Payment Page

**Route:** `#/donate` · **File:** `src/pages/Donate.tsx` · **Prefix:** `.don-`

### Design Direction
Think **Stripe Checkout** meets **Razorpay payment page**. This is where money moves — every element must scream TRUST and SECURITY. The layout is split: left side tells you WHY (impact), right side handles HOW (payment). No distractions, no navigation clutter. The amount selection must feel tangible — show what each amount buys. The payment form must feel bank-grade secure. Green for success, subtle animations, zero friction.

### Layout Specification
```
CRITICAL: This page has NO regular nav or footer.
Minimal chrome — just the payment flow.

PAGE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ MINIMAL TOP BAR (height 56px, bg --surface,      │
│   border-bottom, padding 0 40px)                 │
│  Left: [● CCT] logo (small)                     │
│  Center: 🔒 "Secure Donation" (12px, --muted)   │
│  Right: [✕ Close] → goes back to previous page  │
├─────────────────────────────────────────────────┤
│                                                  │
│ SPLIT LAYOUT (grid: 5fr 4fr, min-height          │
│   calc(100vh - 56px))                            │
│                                                  │
│ ┌─────────────────┬───────────────────────┐      │
│ │ LEFT PANEL      │ RIGHT PANEL           │      │
│ │ (bg: --bg,      │ (bg: --surface,       │      │
│ │  padding 56px)  │  padding 56px,        │      │
│ │                 │  border-left)          │      │
│ │ See LEFT SPEC   │ See RIGHT SPEC        │      │
│ │                 │                       │      │
│ └─────────────────┴───────────────────────┘      │
│                                                  │
│ MOBILE: single column, left panel content        │
│   collapses to a campaign summary bar,           │
│   right panel becomes full-width                 │
└─────────────────────────────────────────────────┘
```

### Left Panel Spec
```
LEFT PANEL — "WHY" (context & impact):

CAMPAIGN CONTEXT:
  Campaign name (20px, Bricolage, 700)
  Institution + city (13px, --muted)
  Progress bar (6px, gradient red→red2)
  "₹12,40,000 raised of ₹18,00,000" (14px)
  "1,240 donors · 23 days left" (12px, --muted)

  OR if General Fund:
  "General Fund" (gold badge)
  "Your donation goes where it's needed most"

─── divider (1px --border, margin 32px 0) ───

IMPACT PREVIEW (dynamic, updates with amount):
  "Your ₹[amount] can"
  Large impact icon + text:
    ₹100: "🩸 Provide 1 unit of blood storage"
    ₹500: "💉 Fund 1 blood transfusion session"
    ₹1,000: "🏥 Support 2 transfusion sessions"
    ₹2,500: "❤️ Cover 5 patient treatments"
    ₹5,000: "⭐ Fund 10 transfusion sessions"
  
  Impact card (bg: --surface, border, radius 16px,
    padding 20px):
    Icon (32px) + amount + impact text
    Subtle entrance animation when amount changes

─── divider ───

TRUST SIGNALS:
  3 rows, each with icon + text:
    🔒 "256-bit SSL encrypted payment"
    📄 "80G tax certificate within 48 hours"
    ✓  "100% goes to the cause — zero admin fees"
  (13px, --muted, line-height 1.75)

RECENT DONORS:
  "Others who contributed"
  3 mini entries:
    "Ravi K. contributed ₹5,000 · 2h ago"
    "Anonymous contributed ₹1,000 · 4h ago"
    "Priya M. contributed ₹2,500 · 6h ago"
  (12px, --muted)
```

### Right Panel Spec
```
RIGHT PANEL — "HOW" (payment steps):

3-STEP FLOW with step indicator at top:
  ① Amount → ② Details → ③ Payment
  Dots connected by line, filled progressively

═══════════════════════════════════════════

STEP 1 — AMOUNT:

"Choose Amount" heading (18px, Bricolage)

AMOUNT GRID (3 columns, gap 10px):
┌──────────┐┌──────────┐┌──────────┐
│   ₹100   ││   ₹500   ││  ₹1,000  │
│          ││ POPULAR  ││          │
└──────────┘└──────────┘└──────────┘
┌──────────┐┌──────────┐┌──────────┐
│  ₹2,500  ││  ₹5,000  ││  Custom  │
└──────────┘└──────────┘└──────────┘

Each button:
  default: bg --bg, border 1.5px --border,
    radius 12px, padding 18px 12px, text-align center
    amount: 18px Bricolage 700
  hover: border-color --muted
  selected: bg --red-pale, border 2px --red,
    color --red, transform scale(1.03),
    box-shadow 0 0 0 3px rgba(204,0,51,.1)

"Most Popular" badge on ₹500:
  absolute top-right, bg --gold, color white,
  font 8px, uppercase, radius 4px, padding 2px 6px

Custom input:
  ₹ prefix + number field (same style as reg form)
  "Minimum ₹50" hint below

[Continue →] button (full-width, bg --red,
  14px, padding 16px, radius 14px)
  disabled state if no amount selected

═══════════════════════════════════════════

STEP 2 — YOUR DETAILS:

"Your Details" heading
"No account needed" subtitle (13px, --muted)

Fields (same input styling as registration):
  Full Name *
  Email Address *
  Phone Number * (+91 prefix with flag)
  PAN Number (optional)
    Info tooltip: ℹ️ "Required for 80G certificate.
      Your PAN is encrypted and never shared"
    (tooltip: bg --ink, color white, radius 8px,
     padding 8px 12px, font 12px, max-width 240px)

☑️ "Send me impact updates" (default checked)
  Checkbox: custom, 20px, --red when checked

SECURITY STRIP (margin 20px 0):
  bg: --bg, radius 12px, padding 12px 16px
  "🔒 256-bit encrypted · PCI-DSS compliant ·
   Your data is safe"
  (11px, --muted, centered)

[Proceed to Payment →] button

═══════════════════════════════════════════

STEP 3 — PAYMENT:

"Payment Method" heading

METHOD CARDS (stack, gap 10px):
Each card: bg --surface, border 1.5px --border,
  radius 14px, padding 18px 20px, cursor pointer

┌────────────────────────────────────────┐
│ ○ UPI                    RECOMMENDED   │
│   ┌─────────────────────────────────┐  │
│   │ (expanded when selected)        │  │
│   │ UPI ID: [____________@upi]     │  │
│   │ or scan QR (placeholder)        │  │
│   └─────────────────────────────────┘  │
├────────────────────────────────────────┤
│ ○ Credit / Debit Card                  │
│   ┌─────────────────────────────────┐  │
│   │ Card Number [________________]  │  │
│   │ Expiry [MM/YY]  CVV [___]      │  │
│   └─────────────────────────────────┘  │
├────────────────────────────────────────┤
│ ○ Net Banking                          │
│   ┌─────────────────────────────────┐  │
│   │ Bank: [Select bank ▼]          │  │
│   └─────────────────────────────────┘  │
└────────────────────────────────────────┘

Selected card: border 2px --red, bg --red-pale(subtle)
Radio: custom, 18px, --red fill when selected
"RECOMMENDED" badge: bg --green, white, 8px,
  uppercase, radius 4px

ORDER SUMMARY (bg: --bg, radius 14px, padding 20px):
  Campaign: "Fund Platelet Separator"
  Amount: ₹5,000 (18px, Bricolage, 700)
  Name: Ravi Kumar
  Email: ravi@email.com
  ─── line ───
  Total: ₹5,000 (20px, Bricolage, 800, --red)

[Pay ₹5,000 →] button
  bg: linear-gradient(135deg, --red, --red2)
  font 16px, padding 18px, radius 14px
  box-shadow: 0 6px 28px rgba(204,0,51,.25)
  hover: translateY(-2px), shadow intensifies

═══════════════════════════════════════════

SUCCESS SCREEN (replaces split layout):

Full-width, centered, max-width 520px, padding 80px

┌─────────────────────────────────────┐
│         ✓ (green circle, 80px,     │
│           animated entrance)        │
│                                     │
│  "Thank you, Ravi!"                │
│  (28px, Bricolage, 800)            │
│                                     │
│  "Your contribution of ₹5,000      │
│   makes a real difference"         │
│  (15px, --muted)                   │
│                                     │
│  RECEIPT CARD (bg: --bg, radius     │
│    16px, padding 24px):            │
│    Amount: ₹5,000                  │
│    Campaign: Fund Platelet Sep.    │
│    Transaction: TXN-2026-04-17-8847│
│    Date: 17 Apr 2026               │
│    80G Status: "Certificate will   │
│      be emailed within 48 hours"   │
│                                     │
│  SHARE SECTION:                     │
│    "Spread the word"               │
│    [WhatsApp] [X] [Copy Link]      │
│                                     │
│  CTA ROW:                          │
│    [Back to Home] [Register as     │
│     Donor →]                       │
└─────────────────────────────────────┘
```

---

## Prompt 7 — Good Works Feed

**Route:** `#/good-works` · **File:** `src/pages/GoodWorks.tsx` · **Prefix:** `.gw-`

### Design Direction
Think **Pinterest** meets **Instagram stories**. Warm, visual, community-driven. Masonry layout gives visual variety. Each card feels like a polaroid — a snapshot of impact. The submission modal makes anyone feel welcome to contribute. Verified badge adds trust. Like button creates engagement.

### Layout Specification
```
PAGE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ STICKY NAV                                       │
├─────────────────────────────────────────────────┤
│ HEADER (padding 64px 52px 32px, text-align center)│
│  "Community" eyebrow (--red)                     │
│  "Good Works" (clamp 36-56px, Bricolage)         │
│  "Stories of impact from the CCT community"      │
│    (16px, --muted, max-width 440px, centered)    │
│  [Share Your Story →] button (--red bg,          │
│    margin-top 20px)                              │
├─────────────────────────────────────────────────┤
│ FILTER PILLS (centered, gap 8px)                 │
│  [All] [🩸 Blood Drives] [💛 Fundraisers]       │
│  [🌱 Volunteering] [🏅 Milestones]              │
├─────────────────────────────────────────────────┤
│ MASONRY GRID (3-col desktop, 2-col tablet,       │
│   1-col mobile, gap 16px, padding 0 52px)        │
│  CSS columns for masonry effect                  │
│  Each card: see CARD SPEC                        │
├─────────────────────────────────────────────────┤
│ [Load More Stories ↓] button (centered)          │
├─────────────────────────────────────────────────┤
│ FOOTER                                           │
└─────────────────────────────────────────────────┘
```

### Story Card Spec
```
CARD (bg: --surface, border, radius 18px,
  overflow hidden, break-inside avoid,
  margin-bottom 16px):

┌──────────────────────────────┐
│ COVER (height varies:        │
│   140px / 170px / 200px      │
│   random per card)           │
│  Random warm gradient:       │
│   #FEF3D7→#FFE49A or        │
│   #FDEEF2→#F5C6D0 or        │
│   #EDFFF4→#C6F0D8 or        │
│   #EFF6FF→#C6D8F5           │
│  Category emoji (40px,       │
│    centered, opacity 0.3)    │
├──────────────────────────────┤
│ BODY (padding: 18px 20px)    │
│                              │
│ "✓ Verified by CCT" badge   │
│   (9px, --green, bg          │
│    --green-lt, radius 6px,   │
│    inline, margin-bottom 10px)│
│                              │
│ Story text (14px, --ink,     │
│   line-height 1.7,           │
│   max 4 lines, overflow      │
│   ellipsis or "read more")   │
│                              │
│ ─── line (1px --border) ───  │
│                              │
│ Author row:                  │
│  Name (13px, 600, --ink)     │
│  Organization (12px, --muted)│
│  Date (11px, --muted)        │
│                              │
│ Action row (flex between):   │
│  ❤️ Like btn + count         │
│    default: --muted          │
│    liked: --red, scale pulse │
│  Share icon (--muted)        │
└──────────────────────────────┘
```

### Submission Modal Spec
```
MODAL (overlay bg rgba(13,9,5,.6),
  backdrop-filter blur(8px)):

CARD (bg: --surface, radius 24px,
  max-width 520px, centered,
  padding 36px, margin 20px):

  [✕] close (top-right, 32px circle,
    bg --bg, hover: bg --bg2)

  "Share Your Story" heading (22px)
  "No account needed" subtitle (13px, --muted)

  Fields:
    Your Name * (reg-input style)
    Organization (optional)
    Story * (textarea, height 140px,
      max 500 chars)
      Live counter: "342/500" bottom-right
      (--muted, turns --red at 480+)
    Photo (upload placeholder area,
      dashed border, 80px height,
      "📷 Add a photo" centered)

  [Submit for Review →] button
    (full-width, --red bg)

  Success state replaces form:
    ✓ icon + "Story submitted!"
    "It will appear after review by CCT"
    [Close] button
```

### Mock Data
```
STORIES:
a) text: "352 units collected at our Tirupati birthday drive! 400+ donors showed up"
   by: "Mega Star Fans Tirupati", cat: "blood", ago: "2 days ago", likes: 234
b) text: "Campus drive at JNTU reached 200 donors for the first time!"
   by: "JNTU Blood Drive Team", cat: "blood", ago: "5 days ago", likes: 189
c) text: "Surgery funded in 72 hours! Thanks to 47 donors on CCT"
   by: "Dr Anand, Guntur Hospital", cat: "fundraiser", ago: "1 week ago", likes: 412
d) text: "15 first-time donors at our Kakinada chapter event"
   by: "CCT Kakinada Chapter", cat: "volunteering", ago: "3 days ago", likes: 98
e) text: "₹5 lakh raised for platelet separator in just 10 days"
   by: "NIMS Hyderabad", cat: "milestone", ago: "2 weeks ago", likes: 567
f) text: "Organized blood type awareness camp at Warangal school"
   by: "Warangal Youth Club", cat: "volunteering", ago: "4 days ago", likes: 76
g) text: "Our 100th blood drive! Grateful to every single donor"
   by: "CCT Vijayawada", cat: "milestone", ago: "1 week ago", likes: 321
h) text: "Emergency O- arranged within 2 hours through CCT platform"
   by: "Sunita K, Hyderabad", cat: "blood", ago: "6 days ago", likes: 445
```

---

## Prompt 8 — Our Impact Page

**Route:** `#/impact` · **File:** `src/pages/Impact.tsx` · **Prefix:** `.imp-`

### Design Direction
Think **Stripe annual report** meets **Apple keynote data slides**. This is the ONLY dark-themed page on the site. Deep warm maroon background (--ink-warm), gold numbers, red accents. Every section is a "wow" moment. Numbers should be massive and animated. Charts built with pure CSS/SVG. This is the page people screenshot and share on social media.

### Layout Specification
```
PAGE (bg: --ink-warm, color: white throughout)

PAGE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ MINIMAL NAV (bg transparent, border-bottom       │
│   rgba(255,255,255,.06))                         │
│  [● CCT] (white) · · · [← Back to Home] (white)│
├─────────────────────────────────────────────────┤
│ HERO STATS (min-height: 100vh, flex center)      │
│  "Our Impact" eyebrow (--red, 10px)              │
│  "Numbers that matter" heading (clamp 36-60px,   │
│    white, Bricolage)                             │
│                                                  │
│  STATS GRID (2×2 desktop, 1-col mobile,          │
│    gap 32px, max-width 700px, centered)          │
│                                                  │
│  Each stat:                                      │
│    bg rgba(255,255,255,.03)                       │
│    border 1px rgba(255,255,255,.06)               │
│    radius 20px, padding 36px, text-align center  │
│                                                  │
│    Number: clamp(42px, 7vw, 72px)                │
│      Bricolage 800, color --gold                 │
│      AnimatedCounter component                   │
│    Label: 11px, rgba(255,255,255,.4),            │
│      uppercase, 0.14em spacing                   │
│                                                  │
│  Stats: 12,00,000+ Blood Units | 4,700+ Lives   │
│         28,000+ Donors | ₹2.3 Crore Raised      │
├─────────────────────────────────────────────────┤
│ TIMELINE (padding 80px 52px)                     │
│  "Our Journey" heading (white)                   │
│  Vertical timeline, centered, max-width 600px   │
│                                                  │
│  Line: 2px rgba(255,255,255,.08), absolute left  │
│  Dots: 14px circle, bg --red, on the line        │
│  Year: 16px Bricolage 800, --gold                │
│  Text: 14px, rgba(255,255,255,.55)               │
│                                                  │
│  6 milestones: 1998, 2005, 2012, 2018, 2024, 2026│
├─────────────────────────────────────────────────┤
│ DISTRICT HEATMAP (padding 80px 52px)             │
│  "Across the States" heading                     │
│  4×3 grid of district cells, gap 8px             │
│                                                  │
│  Each cell: radius 12px, padding 20px,           │
│    text-align center                             │
│    District name (13px, white)                   │
│    Count (16px, Bricolage 700)                   │
│    bg intensity: opacity 0.05 → 0.25             │
│      based on donation volume                    │
│    color: --red tints                            │
│    hover: transform scale(1.05) + brighter bg    │
│                                                  │
│  Districts: Hyderabad, Vijayawada, Tirupati,     │
│    Visakhapatnam, Guntur, Warangal, Kakinada,    │
│    Kurnool, Nellore, Rajahmundry, Karimnagar,    │
│    Khammam                                       │
├─────────────────────────────────────────────────┤
│ BAR CHART (padding 80px 52px)                    │
│  "Monthly Donations" heading                     │
│  "Apr 2025 – Mar 2026"                          │
│                                                  │
│  12 bars, flex row, align-items flex-end,        │
│    height 300px, gap 8px                         │
│                                                  │
│  Each bar:                                       │
│    width: flex 1                                 │
│    height: proportional to value (max = 300px)   │
│    bg: rgba(204,0,51,.6)                         │
│    highest month: bg --gold                      │
│    radius: 6px 6px 0 0                          │
│    hover: opacity 1, show count tooltip          │
│    transition: height 0.6s ease-out              │
│      (triggered by Reveal component)             │
│                                                  │
│  X-axis: month labels (10px, white,.4)           │
│  Count on hover: tooltip above bar               │
│                                                  │
│  Data: Apr:980 May:1100 Jun:1250 Jul:1400        │
│    Aug:1180 Sep:1050 Oct:1320 Nov:1500           │
│    Dec:2400(peak) Jan:1800 Feb:1600 Mar:1900    │
├─────────────────────────────────────────────────┤
│ DONUT CHART (padding 80px 52px)                  │
│  "Blood Type Distribution" heading               │
│                                                  │
│  SVG donut (viewBox 0 0 200 200, centered)       │
│    Outer circle: r=80, stroke-width 30           │
│    8 segments using stroke-dasharray/offset       │
│    Colors: each blood type gets a unique shade   │
│    O+ 35% B+ 25% A+ 20% AB+ 8%                 │
│    O- 5% B- 3% A- 3% AB- 1%                    │
│                                                  │
│  Legend: 2×4 grid beside the chart               │
│    Each: colored dot + type + percentage         │
│                                                  │
│  Center text: "100%" large, "of donations" small │
├─────────────────────────────────────────────────┤
│ CAMPAIGN IMPACT (padding 80px 52px)              │
│  "₹2.3 Crore raised across 47 campaigns"        │
│    (20px, --gold)                                │
│  3 cards (flex row, gap 20px):                   │
│    "12 Equipment Campaigns"                      │
│    "2,500+ Patients Supported"                   │
│    "8 Blood Banks Upgraded"                      │
│    (bg rgba(255,255,255,.04), border             │
│     rgba(255,255,255,.06), radius 16px, p 28px)  │
├─────────────────────────────────────────────────┤
│ CTA (padding 80px 52px, text-align center)       │
│  "Be part of the next chapter" (28px, white)     │
│  [Register as Donor] [View Campaigns]            │
│   buttons (first --red, second outline white)    │
├─────────────────────────────────────────────────┤
│ FOOTER (adapted for dark bg)                     │
│  text: rgba(255,255,255,.3)                      │
│  border-top: rgba(255,255,255,.06)               │
└─────────────────────────────────────────────────┘
```

---

## Execution Order

```
Priority 1 (Core pages):
  1. Campaigns (#/campaigns) — revenue page
  2. Donate (#/donate) — payment conversion
  3. Blood Inventory (#/blood-inventory) — life-saving utility

Priority 2 (Engagement pages):
  4. Events (#/events) — user acquisition
  5. Donor Wall (#/donors) — social proof

Priority 3 (Content pages):
  6. About (#/about) — trust & credibility
  7. Good Works (#/good-works) — community engagement
  8. Impact (#/impact) — data showcase
```

After building each page:
1. Register route in `src/main.tsx`
2. Wire navigation links from home page and other pages
3. Test at 1440px, 960px, and 375px viewports
