import { useState, useEffect, useRef } from 'react'

type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
type LeaderTab = 'city' | 'individual' | 'fanclub'

interface DonorEntry {
  name: string
  bloodType: string
  city: string
  timeAgo: string
  donationCount: number
  tier: Tier
}

const TIER_COLORS: Record<Tier, string> = {
  Bronze: '#CD7F32',
  Silver: '#8E8E8E',
  Gold: '#C98A0A',
  Platinum: '#6B7280',
}

const AVATAR_COLORS = ['#FDEEF2', '#EFF6FF', '#FEF3D7', '#EDFFF4', '#FFF3E0']

const DONORS: DonorEntry[] = [
  { name: 'Ravi Kumar', bloodType: 'A+', city: 'Hyderabad', timeAgo: '2h ago', donationCount: 4, tier: 'Silver' },
  { name: 'Lakshmi Devi', bloodType: 'O+', city: 'Vijayawada', timeAgo: '3h ago', donationCount: 7, tier: 'Gold' },
  { name: 'Venkat Rao', bloodType: 'B+', city: 'Tirupati', timeAgo: '4h ago', donationCount: 2, tier: 'Bronze' },
  { name: 'Priya Reddy', bloodType: 'AB+', city: 'Hyderabad', timeAgo: '5h ago', donationCount: 12, tier: 'Platinum' },
  { name: 'Mahesh B', bloodType: 'A-', city: 'Guntur', timeAgo: '6h ago', donationCount: 1, tier: 'Bronze' },
  { name: 'Swathi N', bloodType: 'O-', city: 'Warangal', timeAgo: '7h ago', donationCount: 3, tier: 'Silver' },
  { name: 'Arjun S', bloodType: 'B-', city: 'Kakinada', timeAgo: '8h ago', donationCount: 5, tier: 'Gold' },
  { name: 'Divya T', bloodType: 'O+', city: 'Nellore', timeAgo: '9h ago', donationCount: 2, tier: 'Bronze' },
  { name: 'Kiran R', bloodType: 'A+', city: 'Vizag', timeAgo: '10h ago', donationCount: 8, tier: 'Silver' },
  { name: 'Ananya P', bloodType: 'AB-', city: 'Kurnool', timeAgo: '11h ago', donationCount: 1, tier: 'Bronze' },
  { name: 'Srinivas Rao', bloodType: 'O+', city: 'Hyderabad', timeAgo: '12h ago', donationCount: 9, tier: 'Platinum' },
  { name: 'Deepika C', bloodType: 'B+', city: 'Vijayawada', timeAgo: '13h ago', donationCount: 3, tier: 'Silver' },
  { name: 'Ramesh N', bloodType: 'A-', city: 'Tirupati', timeAgo: '14h ago', donationCount: 6, tier: 'Gold' },
  { name: 'Krishna M', bloodType: 'AB+', city: 'Guntur', timeAgo: '15h ago', donationCount: 4, tier: 'Silver' },
  { name: 'Bharathi D', bloodType: 'O-', city: 'Warangal', timeAgo: '16h ago', donationCount: 10, tier: 'Platinum' },
  { name: 'Nagarjuna K', bloodType: 'B+', city: 'Kakinada', timeAgo: '17h ago', donationCount: 2, tier: 'Bronze' },
  { name: 'Kavitha R', bloodType: 'A+', city: 'Nellore', timeAgo: '18h ago', donationCount: 5, tier: 'Gold' },
  { name: 'Prasad V', bloodType: 'O+', city: 'Vizag', timeAgo: '19h ago', donationCount: 7, tier: 'Gold' },
  { name: 'Sujatha Rao', bloodType: 'AB-', city: 'Kurnool', timeAgo: '20h ago', donationCount: 3, tier: 'Silver' },
  { name: 'Gopal Reddy', bloodType: 'B-', city: 'Hyderabad', timeAgo: '21h ago', donationCount: 11, tier: 'Platinum' },
]

const LIVE_DONORS: DonorEntry[] = [
  { name: 'Padma Kumari', bloodType: 'O+', city: 'Hyderabad', timeAgo: 'Just now', donationCount: 6, tier: 'Gold' },
  { name: 'Anil Prasad', bloodType: 'B+', city: 'Vijayawada', timeAgo: 'Just now', donationCount: 3, tier: 'Silver' },
  { name: 'Meena K', bloodType: 'A-', city: 'Tirupati', timeAgo: 'Just now', donationCount: 1, tier: 'Bronze' },
  { name: 'Suresh V', bloodType: 'AB+', city: 'Guntur', timeAgo: 'Just now', donationCount: 8, tier: 'Platinum' },
  { name: 'Rajesh Kumar', bloodType: 'O-', city: 'Warangal', timeAgo: 'Just now', donationCount: 5, tier: 'Gold' },
]

const CITY_LEADERS = [
  { city: 'Hyderabad', donations: 1240, funds: '₹18.5L', rank: 1 },
  { city: 'Vijayawada', donations: 890, funds: '₹12.1L', rank: 2 },
  { city: 'Tirupati', donations: 720, funds: '₹9.8L', rank: 3 },
  { city: 'Guntur', donations: 580, funds: '₹7.2L', rank: 4 },
  { city: 'Visakhapatnam', donations: 520, funds: '₹6.8L', rank: 5 },
  { city: 'Warangal', donations: 340, funds: '₹4.5L', rank: 6 },
  { city: 'Kakinada', donations: 280, funds: '₹3.6L', rank: 7 },
  { city: 'Nellore', donations: 210, funds: '₹2.8L', rank: 8 },
  { city: 'Kurnool', donations: 180, funds: '₹2.2L', rank: 9 },
  { city: 'Rajahmundry', donations: 150, funds: '₹1.9L', rank: 10 },
]

const INDIVIDUAL_LEADERS = [
  { name: 'Venkat Rao', tier: 'Platinum' as Tier, credits: 4800, donations: 48, city: 'Guntur' },
  { name: 'Mahesh Babu', tier: 'Platinum' as Tier, credits: 4200, donations: 42, city: 'Hyderabad' },
  { name: 'Gopal Reddy', tier: 'Platinum' as Tier, credits: 3900, donations: 39, city: 'Hyderabad' },
  { name: 'Srinivas Rao', tier: 'Platinum' as Tier, credits: 3600, donations: 36, city: 'Hyderabad' },
  { name: 'Anitha Reddy', tier: 'Gold' as Tier, credits: 3200, donations: 32, city: 'Tirupati' },
  { name: 'Padma Kumari', tier: 'Gold' as Tier, credits: 2800, donations: 28, city: 'Kurnool' },
  { name: 'Anil Prasad', tier: 'Gold' as Tier, credits: 2400, donations: 24, city: 'Kakinada' },
  { name: 'Suresh Varma', tier: 'Silver' as Tier, credits: 2000, donations: 20, city: 'Warangal' },
  { name: 'Rajesh Kumar', tier: 'Silver' as Tier, credits: 1800, donations: 18, city: 'Visakhapatnam' },
  { name: 'Krishna Murthy', tier: 'Silver' as Tier, credits: 1500, donations: 15, city: 'Hyderabad' },
]

const FAN_CLUBS = [
  { name: 'Mega Star Fans — Hyderabad', events: 42, donations: 3200, members: 1800 },
  { name: 'Mega Star Fans — Tirupati', events: 38, donations: 2800, members: 1500 },
  { name: 'Mega Star Fans — Vijayawada', events: 35, donations: 2400, members: 1200 },
  { name: 'Chiru Youth Brigade — Guntur', events: 28, donations: 1900, members: 950 },
  { name: 'Blood Warriors — Visakhapatnam', events: 25, donations: 1600, members: 800 },
  { name: 'CCT Volunteers — Warangal', events: 20, donations: 1200, members: 600 },
  { name: 'Red Drop Society — Kakinada', events: 18, donations: 980, members: 450 },
  { name: 'Life Savers Club — Nellore', events: 15, donations: 750, members: 380 },
]

const MONTHS = [
  'January 2026', 'February 2026', 'March 2026', 'April 2026',
  'May 2026', 'June 2026', 'July 2026', 'August 2026',
  'September 2026', 'October 2026', 'November 2026', 'December 2026',
]

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2)
}

function getOrdinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function getAvatarTextColor(bg: string) {
  // Dark text for light avatar backgrounds
  const darkBgs = ['#FDEEF2', '#EFF6FF', '#FEF3D7', '#EDFFF4', '#FFF3E0']
  return darkBgs.includes(bg) ? '#0D0905' : '#fff'
}

export default function DonorWall() {
  const [visibleCount, setVisibleCount] = useState(10)
  const [liveFeed, setLiveFeed] = useState<DonorEntry[]>([])
  const [leaderTab, setLeaderTab] = useState<LeaderTab>('city')
  const [monthIdx, setMonthIdx] = useState(3) // April 2026
  const liveIdx = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (liveIdx.current < LIVE_DONORS.length) {
        setLiveFeed(prev => [LIVE_DONORS[liveIdx.current], ...prev])
        liveIdx.current++
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const allDonors = [...liveFeed, ...DONORS]
  const visibleDonors = allDonors.slice(0, visibleCount)

  const prevMonth = () => setMonthIdx(i => Math.max(0, i - 1))
  const nextMonth = () => setMonthIdx(i => Math.min(MONTHS.length - 1, i + 1))

  return (
    <div className="dw2-page" style={{ paddingTop: 62 }}>
      {/* ── HEADER ── */}
      <header className="dw2-hero">
        <span className="dw2-eyebrow">Our Heroes</span>
        <h1 className="dw2-heading">Wall of <span className="dw2-heading-accent">Heroes</span></h1>
        <p className="dw2-subtitle">Every donation writes a story of hope</p>
      </header>

      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <div className="dw2-main">
        {/* LEFT — DONOR FEED */}
        <section className="dw2-feed-col">
          <div className="dw2-live-indicator">
            <span className="dw2-live-dot" />
            <span className="dw2-live-text">Live</span>
          </div>

          <div className="dw2-feed">
            {visibleDonors.map((d, i) => {
              const isNew = i < liveFeed.length
              const avatarBg = AVATAR_COLORS[d.name.charCodeAt(0) % AVATAR_COLORS.length]
              const avatarTxt = getAvatarTextColor(avatarBg)
              return (
                <div key={`${d.name}-${i}`} className={`dw2-donor-card${isNew ? ' dw2-new' : ''}`}>
                  <div className="dw2-donor-avatar" style={{ background: avatarBg, color: avatarTxt }}>
                    {getInitials(d.name)}
                  </div>
                  <div className="dw2-donor-info">
                    <div className="dw2-donor-top">
                      <span className="dw2-donor-name">{d.name}</span>
                      <span className="dw2-donor-city">📍 {d.city}</span>
                    </div>
                    <div className="dw2-donor-bottom">
                      <span className="dw2-blood-badge">{d.bloodType}</span>
                      <span className="dw2-donation-count">{getOrdinal(d.donationCount)} donation ★</span>
                      <span className="dw2-donor-time">{d.timeAgo}</span>
                    </div>
                  </div>
                  <div className="dw2-donor-right">
                    <span className="dw2-tier-dot" style={{ background: TIER_COLORS[d.tier] }} title={d.tier} />
                  </div>
                </div>
              )
            })}
          </div>

          {visibleCount < allDonors.length && (
            <div className="dw2-load-more-wrap">
              <button className="dw2-load-more" onClick={() => setVisibleCount(v => v + 10)}>
                Load More
              </button>
            </div>
          )}
        </section>

        {/* RIGHT — LEADERBOARD */}
        <section className="dw2-leader-col">
          <div className="dw2-leader-tabs">
            {(['city', 'individual', 'fanclub'] as LeaderTab[]).map(tab => (
              <button
                key={tab}
                className={`dw2-tab${leaderTab === tab ? ' dw2-tab-active' : ''}`}
                onClick={() => setLeaderTab(tab)}
              >
                {tab === 'city' ? 'City' : tab === 'individual' ? 'Individual' : 'Fan Club'}
              </button>
            ))}
          </div>

          {/* ── CITY TAB ── */}
          {leaderTab === 'city' && (
            <div className="dw2-city-board">
              <div className="dw2-month-selector">
                <button className="dw2-month-btn" onClick={prevMonth} disabled={monthIdx === 0}>←</button>
                <span className="dw2-month-label">{MONTHS[monthIdx]}</span>
                <button className="dw2-month-btn" onClick={nextMonth} disabled={monthIdx === MONTHS.length - 1}>→</button>
              </div>

              <div className="dw2-podium">
                {/* 2nd place */}
                <div className="dw2-podium-block dw2-podium-2">
                  <div className="dw2-podium-medal">🥈</div>
                  <div className="dw2-podium-city">{CITY_LEADERS[1].city}</div>
                  <div className="dw2-podium-count">{CITY_LEADERS[1].donations.toLocaleString('en-IN')}</div>
                </div>
                {/* 1st place */}
                <div className="dw2-podium-block dw2-podium-1">
                  <div className="dw2-podium-medal">🥇</div>
                  <div className="dw2-podium-city">{CITY_LEADERS[0].city}</div>
                  <div className="dw2-podium-count">{CITY_LEADERS[0].donations.toLocaleString('en-IN')}</div>
                </div>
                {/* 3rd place */}
                <div className="dw2-podium-block dw2-podium-3">
                  <div className="dw2-podium-medal">🥉</div>
                  <div className="dw2-podium-city">{CITY_LEADERS[2].city}</div>
                  <div className="dw2-podium-count">{CITY_LEADERS[2].donations.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="dw2-rank-list">
                {CITY_LEADERS.slice(3).map(c => (
                  <div key={c.rank} className="dw2-rank-row">
                    <span className="dw2-rank-num">{c.rank}</span>
                    <span className="dw2-rank-name">{c.city}</span>
                    <span className="dw2-rank-stat">{c.donations.toLocaleString('en-IN')} donations</span>
                    <span className="dw2-rank-funds">{c.funds}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── INDIVIDUAL TAB ── */}
          {leaderTab === 'individual' && (
            <div className="dw2-individual-board">
              <div className="dw2-top3-grid">
                {INDIVIDUAL_LEADERS.slice(0, 3).map((d, i) => {
                  const medals = ['🥇', '🥈', '🥉']
                  const borderColors = ['#C98A0A', '#8E8E8E', '#CD7F32']
                  const avatarBg = AVATAR_COLORS[i % AVATAR_COLORS.length]
                  return (
                    <div
                      key={d.name}
                      className={`dw2-top3-card${i === 0 ? ' dw2-top3-gold' : ''}`}
                      style={{ borderColor: borderColors[i] }}
                    >
                      <span className="dw2-top3-medal">{medals[i]}</span>
                      <div className="dw2-top3-avatar" style={{ background: avatarBg, color: getAvatarTextColor(avatarBg) }}>
                        {getInitials(d.name)}
                      </div>
                      <h4 className="dw2-top3-name">{d.name}</h4>
                      <span className="dw2-top3-tier" style={{ color: TIER_COLORS[d.tier] }}>{d.tier}</span>
                      <div className="dw2-top3-stats">
                        <span>{d.credits.toLocaleString('en-IN')} credits</span>
                        <span>{d.donations} donations</span>
                      </div>
                      <span className="dw2-top3-city">📍 {d.city}</span>
                    </div>
                  )
                })}
              </div>

              <div className="dw2-rank-list">
                {INDIVIDUAL_LEADERS.slice(3).map((d, i) => (
                  <div key={d.name} className="dw2-rank-row">
                    <span className="dw2-rank-num">{i + 4}</span>
                    <span className="dw2-rank-name">{d.name}</span>
                    <span className="dw2-rank-tier" style={{ color: TIER_COLORS[d.tier] }}>{d.tier}</span>
                    <span className="dw2-rank-stat">{d.credits.toLocaleString('en-IN')} credits</span>
                    <span className="dw2-rank-funds">{d.donations} donations · {d.city}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FAN CLUB TAB ── */}
          {leaderTab === 'fanclub' && (
            <div className="dw2-fanclub-board">
              {FAN_CLUBS.map((fc, i) => (
                <div key={fc.name} className={`dw2-fc-card${i < 3 ? ' dw2-fc-highlight' : ''}`}>
                  <div className="dw2-fc-rank">{i + 1}</div>
                  <div className="dw2-fc-info">
                    <h4 className="dw2-fc-name">{fc.name}</h4>
                    <div className="dw2-fc-stats">
                      <span>🎪 {fc.events} events</span>
                      <span>🩸 {fc.donations.toLocaleString('en-IN')} donations</span>
                      <span>👥 {fc.members.toLocaleString('en-IN')} members</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="dw2-footer">
        <p>© 2026 CCT · Hyderabad | Built by VoltusWave</p>
      </footer>
    </div>
  )
}
