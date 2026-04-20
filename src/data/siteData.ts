export const TICKER_ITEMS = [
  'Birthday Blood Drive · Apr 20 · Hyderabad',
  'Thalassemia Children Fund · 70% funded',
  'Vijayawada Grand Camp · Apr 22',
  'Mobile Blood Bank · 80% funded',
  'Est. 1997 · 27 years of service',
  'Campus Circuit · 20 colleges · June',
] as const

export type StoryItem = {
  emoji: string
  label: string
  live: boolean
  seen: boolean
}

export const STORIES: StoryItem[] = [
  { emoji: '💛', label: 'Fund Night', live: false, seen: false },
  { emoji: '🌱', label: 'Tree Drive', live: false, seen: true },
  { emoji: '👁️', label: 'Eye Pledge', live: false, seen: false },
  { emoji: '🎭', label: 'Gala Night', live: false, seen: false },
  { emoji: '🍱', label: 'Food Drive', live: false, seen: false },
  { emoji: '🏢', label: 'Corp Camp', live: false, seen: true },
  { emoji: '🌍', label: 'NRI Drive', live: false, seen: false },
  { emoji: '🏥', label: 'Medical Aid', live: false, seen: true },
  { emoji: '📢', label: 'Awareness', live: false, seen: false },
]

export type BloodType = {
  type: string
  note: string
}

export const BLOOD_TYPES: BloodType[] = [
  { type: 'O−', note: 'Universal Donor' },
  { type: 'O+', note: 'Most Common' },
  { type: 'A−', note: 'Rare Type' },
  { type: 'A+', note: 'Very Common' },
  { type: 'B−', note: 'Rare Type' },
  { type: 'B+', note: 'Common' },
  { type: 'AB−', note: 'Rarest Type' },
  { type: 'AB+', note: 'Universal Recipient' },
]

export type Donor = {
  n: string
  t: string
  c: string
  ago: string
  av: string
  col: string
  tc: string
}

export const DONORS: Donor[] = [
  { n: 'Ravi K.', t: 'O+', c: 'Hyderabad', ago: '2h ago', av: 'RK', col: '#FDEEF2', tc: '#CC0033' },
  { n: 'Priya M.', t: 'A+', c: 'Chennai', ago: '3h ago', av: 'PM', col: '#EFF6FF', tc: '#1D4ED8' },
  { n: 'Arjun S.', t: 'B−', c: 'Vijayawada', ago: '4h ago', av: 'AS', col: '#FEF3D7', tc: '#C98A0A' },
  { n: 'Divya T.', t: 'O−', c: 'Tirupati', ago: '5h ago', av: 'DT', col: '#FDEEF2', tc: '#CC0033' },
  { n: 'Kiran R.', t: 'AB+', c: 'Vizag', ago: '6h ago', av: 'KR', col: '#EDFFF4', tc: '#107040' },
  { n: 'Ananya P.', t: 'A−', c: 'Guntur', ago: '7h ago', av: 'AP', col: '#EFF6FF', tc: '#1D4ED8' },
  { n: 'Suresh N.', t: 'B+', c: 'Nellore', ago: '8h ago', av: 'SN', col: '#FEF3D7', tc: '#C98A0A' },
  { n: 'Meena V.', t: 'O+', c: 'Hyderabad', ago: '9h ago', av: 'MV', col: '#FDEEF2', tc: '#CC0033' },
  { n: 'Rahul D.', t: 'A+', c: 'Warangal', ago: '10h ago', av: 'RD', col: '#EFF6FF', tc: '#1D4ED8' },
  { n: 'Lakshmi B.', t: 'AB−', c: 'Karimnagar', ago: '11h ago', av: 'LB', col: '#EDFFF4', tc: '#107040' },
  { n: 'Venkat G.', t: 'O−', c: 'Kurnool', ago: '12h ago', av: 'VG', col: '#FDEEF2', tc: '#CC0033' },
  { n: 'Sita A.', t: 'B+', c: 'Eluru', ago: '13h ago', av: 'SA', col: '#FEF3D7', tc: '#C98A0A' },
  { n: 'Mohan C.', t: 'A−', c: 'Rajahmundry', ago: '14h ago', av: 'MC', col: '#EFF6FF', tc: '#1D4ED8' },
  { n: 'Kavya L.', t: 'O+', c: 'Kadapa', ago: '15h ago', av: 'KL', col: '#FDEEF2', tc: '#CC0033' },
  { n: 'Anil P.', t: 'B−', c: 'Ongole', ago: '16h ago', av: 'AP', col: '#FEF3D7', tc: '#C98A0A' },
  { n: 'Sunita R.', t: 'AB+', c: 'Hyderabad', ago: '17h ago', av: 'SR', col: '#EDFFF4', tc: '#107040' },
]

export type LeaderboardRow = { city: string; units: number; pct: number }

export const LEADERBOARD: LeaderboardRow[] = [
  { city: 'Hyderabad', units: 1840, pct: 100 },
  { city: 'Vijayawada', units: 620, pct: 34 },
  { city: 'Visakhapatnam', units: 510, pct: 28 },
  { city: 'Guntur', units: 390, pct: 21 },
  { city: 'Tirupati', units: 310, pct: 17 },
  { city: 'Nellore', units: 240, pct: 13 },
  { city: 'Warangal', units: 180, pct: 10 },
  { city: 'Rajahmundry', units: 140, pct: 8 },
]

export type PastEvent = { d: string; t: string; n: string }

export const PAST_EVENTS: PastEvent[] = [
  { d: 'Apr 20, 2025', t: 'Birthday Blood Drive · HYD', n: '1,400 units' },
  { d: 'Mar 15, 2025', t: 'Vijayawada Fan Camp', n: '580 units' },
  { d: 'Feb 28, 2025', t: 'Valentine Blood Drive', n: '320 units' },
  { d: 'Jan 26, 2025', t: 'Republic Day Camp', n: '410 units' },
  { d: 'Dec 25, 2024', t: 'Christmas Charity Gala', n: '₹8.4L raised' },
  { d: 'Nov 10, 2024', t: 'Diwali Eye Pledge Drive', n: '180 pledges' },
  { d: 'Oct 2, 2024', t: 'Gandhi Jayanti Tree Drive', n: '2,000 trees' },
  { d: 'Sep 8, 2024', t: 'Literacy Day Book Drive', n: '3,200 books' },
  { d: 'Aug 15, 2024', t: 'Independence Day Camp', n: '760 units' },
  { d: 'Jul 28, 2024', t: 'World Hepatitis Day Awareness', n: '12 districts' },
  { d: 'Jun 14, 2024', t: 'World Blood Donor Day', n: '2,100 units' },
  { d: 'May 5, 2024', t: 'Mega Campus Circuit', n: '22 colleges' },
  { d: 'Apr 20, 2024', t: 'Birthday Blood Drive · HYD', n: '1,280 units' },
  { d: 'Mar 8, 2024', t: "Women's Day Health Camp", n: '1,400 women' },
  { d: 'Feb 14, 2024', t: 'Love Saves Lives Drive', n: '490 units' },
  { d: 'Jan 1, 2024', t: "New Year's Blood Camp", n: '240 units' },
]

export type FanEventRow = {
  d: string
  m: string
  n: string
  o: string
  c: string
  t: string
  ch: string
  l: string
  s: 'open' | 'few' | 'full'
  sl: string
}

export const FAN_EVENTS: FanEventRow[] = [
  { d: '20', m: 'Apr', n: 'Birthday Blood Drive — HITEC City', o: 'CCT Official', c: 'Hyderabad, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '21', m: 'Apr', n: 'Donor Appreciation Camp', o: 'Film Nagar Mega Fans', c: 'Hyderabad, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '22', m: 'Apr', n: 'Birthday Celebration Blood Camp', o: 'Begumpet Fan Club', c: 'Hyderabad, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '22', m: 'Apr', n: 'Annual Blood Donation Drive', o: 'Vijayawada Mega Fans', c: 'Vijayawada, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '23', m: 'Apr', n: 'Free Health Check + Blood Drive', o: 'Nellore Fan Association', c: 'Nellore, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'few', sl: 'Few Spots' },
  { d: '23', m: 'Apr', n: 'Birthday Blanket Distribution', o: 'Kurnool Fans', c: 'Kurnool, AP', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Volunteer' },
  { d: '24', m: 'Apr', n: 'Thalassemia Awareness Drive', o: 'KIMS Hospital Partnership', c: 'Secunderabad, TS', t: '📢', ch: 'fc-a', l: 'Awareness', s: 'open', sl: 'Open' },
  { d: '25', m: 'Apr', n: 'Mega Fans Blood Camp', o: 'Guntur District Club', c: 'Guntur, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '26', m: 'Apr', n: 'Free Meal Drive — Railway Station', o: 'Tirupati Mega Fans', c: 'Tirupati, AP', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Volunteer' },
  { d: '27', m: 'Apr', n: 'Chiranjeevi Birthday Fundraiser', o: 'Chennai Tamil Fans', c: 'Chennai, TN', t: '💛', ch: 'fc-f', l: 'Fundraiser', s: 'open', sl: 'Buy Tickets' },
  { d: '28', m: 'Apr', n: 'Book Donation — Govt Schools', o: 'Kadapa Mega Fans', c: 'Kadapa, AP', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Volunteer' },
  { d: '29', m: 'Apr', n: 'Blood Donation + Eye Pledge Camp', o: 'Ongole Fan Club', c: 'Ongole, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '30', m: 'Apr', n: 'NRI Virtual Fundraiser', o: 'USA Telugu Fans', c: 'Virtual · US', t: '💛', ch: 'fc-f', l: 'Fundraiser', s: 'open', sl: 'Register' },
  { d: '1', m: 'May', n: 'Free Eye Check Camp', o: 'Kakinada Fans', c: 'Kakinada, AP', t: '📢', ch: 'fc-a', l: 'Awareness', s: 'open', sl: 'Open' },
  { d: '2', m: 'May', n: 'Clothing Distribution Drive', o: 'Warangal Mega Fans', c: 'Warangal, TS', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Donate' },
  { d: '3', m: 'May', n: 'Blood Camp — RTO Office', o: 'Vizag Fan Club', c: 'Visakhapatnam, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Walk In' },
  { d: '4', m: 'May', n: 'Walk for Sight — Eye Pledge Drive', o: 'CCT Official', c: 'Hyderabad, AP', t: '📢', ch: 'fc-a', l: 'Awareness', s: 'open', sl: 'Join Walk' },
  { d: '5', m: 'May', n: 'Mega Birthday Food Drive', o: 'Rajahmundry Fans', c: 'Rajahmundry, AP', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Volunteer' },
  { d: '6', m: 'May', n: 'Scholarship Fund Raiser', o: 'Karimnagar Fan Club', c: 'Karimnagar, TS', t: '💛', ch: 'fc-f', l: 'Fundraiser', s: 'open', sl: 'Donate' },
  { d: '8', m: 'May', n: 'Free Blood Group Check Camp', o: 'Nalgonda Fans', c: 'Nalgonda, TS', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Walk In' },
  { d: '10', m: 'May', n: 'TechPark Corporate Blood Camp', o: 'CCT Official', c: 'Hyderabad, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Register' },
  { d: '12', m: 'May', n: 'UK Fans Fundraiser Gala', o: 'UK Telugu Diaspora', c: 'London, UK', t: '💛', ch: 'fc-f', l: 'Fundraiser', s: 'open', sl: 'Register' },
  { d: '14', m: 'May', n: 'Village Blood Drive — 5 Villages', o: 'Prakasam District Club', c: 'Ongole dist., AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '15', m: 'May', n: '5K Run for Blood Awareness', o: 'Tirupati Running Club', c: 'Tirupati, AP', t: '📢', ch: 'fc-a', l: 'Awareness', s: 'open', sl: '₹99 Entry' },
  { d: '16', m: 'May', n: 'Mega Fans Plantation Drive', o: 'Nizamabad Fans', c: 'Nizamabad, TS', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Volunteer' },
  { d: '17', m: 'May', n: 'Blood Drive — Degree Colleges', o: 'Bhimavaram Fan Club', c: 'Bhimavaram, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '18', m: 'May', n: 'Green Hyderabad — 5,000 Trees', o: 'CCT Official', c: 'Hyderabad, AP', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Volunteer' },
  { d: '19', m: 'May', n: 'Flood Relief Fund Drive', o: 'Khammam Mega Fans', c: 'Khammam, TS', t: '💛', ch: 'fc-f', l: 'Fundraiser', s: 'open', sl: 'Donate' },
  { d: '22', m: 'May', n: 'Orphanage Visit + Gift Distribution', o: 'Vizag South Fans', c: 'Visakhapatnam, AP', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Volunteer' },
  { d: '25', m: 'May', n: 'Vijayawada Grand Blood Camp', o: 'CCT Official', c: 'Vijayawada, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Register' },
  { d: '29', m: 'May', n: 'Australia NRI Blood Pledge Drive', o: 'Sydney Telugu Fans', c: 'Sydney, AUS', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Register' },
  { d: '1', m: 'Jun', n: 'Telugu Diaspora Giving Night', o: 'CCT Official · US', c: 'Virtual · US', t: '💛', ch: 'fc-f', l: 'Fundraiser', s: 'open', sl: 'Register' },
  { d: '3', m: 'Jun', n: 'Blood Drive — IT Companies', o: 'Madhapur Fan Club', c: 'Hyderabad, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Open' },
  { d: '7', m: 'Jun', n: 'Campus Circuit — 20 Colleges', o: 'CCT Official', c: 'Hyderabad, AP', t: '🩸', ch: 'fc-b', l: 'Blood Drive', s: 'open', sl: 'Register Campus' },
  { d: '10', m: 'Jun', n: 'Mid-Year Donor Recognition Night', o: 'CCT Official', c: 'Hyderabad, AP', t: '💛', ch: 'fc-f', l: 'Fundraiser', s: 'open', sl: 'RSVP' },
  { d: '15', m: 'Jun', n: '5K Run for Blood Awareness', o: 'CCT Tirupati', c: 'Tirupati, AP', t: '📢', ch: 'fc-a', l: 'Awareness', s: 'open', sl: '₹99 Entry' },
  { d: '22', m: 'Jun', n: 'Monthly Hospital Meal — Guntur', o: 'Guntur Fans', c: 'Guntur, AP', t: '🌱', ch: 'fc-c', l: 'Community', s: 'open', sl: 'Volunteer' },
  { d: '29', m: 'Jun', n: 'Chennai Mega Fans Charity Auction', o: 'Chennai Fan Association', c: 'Chennai, TN', t: '💛', ch: 'fc-f', l: 'Fundraiser', s: 'open', sl: 'Bid Online' },
]

export type EventFilter = 'all' | 'blood' | 'fund' | 'awareness' | 'community'
export type WorksFilter = 'all' | 'blood' | 'fund' | 'community'
export type FedEmojiFilter = 'all' | '🩸' | '💛' | '🌱' | '📢'
