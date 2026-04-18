import { useState, useEffect, useRef } from 'react'

type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
type LeaderTab = 'area' | 'individual' | 'fanclub'

interface DonorEntry {
  name: string
  bloodType: string
  /** Hyderabad locality / neighborhood */
  area: string
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
  { name: 'Ravi Kumar', bloodType: 'A+', area: 'Banjara Hills', timeAgo: '2h ago', donationCount: 4, tier: 'Silver' },
  { name: 'Lakshmi Devi', bloodType: 'O+', area: 'Secunderabad', timeAgo: '3h ago', donationCount: 7, tier: 'Gold' },
  { name: 'Venkat Rao', bloodType: 'B+', area: 'Film Nagar', timeAgo: '4h ago', donationCount: 2, tier: 'Bronze' },
  { name: 'Priya Reddy', bloodType: 'AB+', area: 'Jubilee Hills', timeAgo: '5h ago', donationCount: 12, tier: 'Platinum' },
  { name: 'Mahesh B', bloodType: 'A-', area: 'Kukatpally', timeAgo: '6h ago', donationCount: 1, tier: 'Bronze' },
  { name: 'Swathi N', bloodType: 'O-', area: 'Madhapur', timeAgo: '7h ago', donationCount: 3, tier: 'Silver' },
  { name: 'Arjun S', bloodType: 'B-', area: 'Gachibowli', timeAgo: '8h ago', donationCount: 5, tier: 'Gold' },
  { name: 'Divya T', bloodType: 'O+', area: 'Begumpet', timeAgo: '9h ago', donationCount: 2, tier: 'Bronze' },
  { name: 'Kiran R', bloodType: 'A+', area: 'HITEC City', timeAgo: '10h ago', donationCount: 8, tier: 'Silver' },
  { name: 'Ananya P', bloodType: 'AB-', area: 'Somajiguda', timeAgo: '11h ago', donationCount: 1, tier: 'Bronze' },
  { name: 'Srinivas Rao', bloodType: 'O+', area: 'Kondapur', timeAgo: '12h ago', donationCount: 9, tier: 'Platinum' },
  { name: 'Deepika C', bloodType: 'B+', area: 'Ameerpet', timeAgo: '13h ago', donationCount: 3, tier: 'Silver' },
  { name: 'Ramesh N', bloodType: 'A-', area: 'LB Nagar', timeAgo: '14h ago', donationCount: 6, tier: 'Gold' },
  { name: 'Krishna M', bloodType: 'AB+', area: 'Dilsukhnagar', timeAgo: '15h ago', donationCount: 4, tier: 'Silver' },
  { name: 'Bharathi D', bloodType: 'O-', area: 'Uppal', timeAgo: '16h ago', donationCount: 10, tier: 'Platinum' },
  { name: 'Nagarjuna K', bloodType: 'B+', area: 'Miyapur', timeAgo: '17h ago', donationCount: 2, tier: 'Bronze' },
  { name: 'Kavitha R', bloodType: 'A+', area: 'Tolichowki', timeAgo: '18h ago', donationCount: 5, tier: 'Gold' },
  { name: 'Prasad V', bloodType: 'O+', area: 'Nacharam', timeAgo: '19h ago', donationCount: 7, tier: 'Gold' },
  { name: 'Sujatha Rao', bloodType: 'AB-', area: 'Malakpet', timeAgo: '20h ago', donationCount: 3, tier: 'Silver' },
  { name: 'Gopal Reddy', bloodType: 'B-', area: 'Manikonda', timeAgo: '21h ago', donationCount: 11, tier: 'Platinum' },
]

const LIVE_DONORS: DonorEntry[] = [
  { name: 'Padma Kumari', bloodType: 'O+', area: 'Khairatabad', timeAgo: 'Just now', donationCount: 6, tier: 'Gold' },
  { name: 'Anil Prasad', bloodType: 'B+', area: 'Jubilee Hills', timeAgo: 'Just now', donationCount: 3, tier: 'Silver' },
  { name: 'Meena K', bloodType: 'A-', area: 'Secunderabad', timeAgo: 'Just now', donationCount: 1, tier: 'Bronze' },
  { name: 'Suresh V', bloodType: 'AB+', area: 'Gachibowli', timeAgo: 'Just now', donationCount: 8, tier: 'Platinum' },
  { name: 'Rajesh Kumar', bloodType: 'O-', area: 'Madhapur', timeAgo: 'Just now', donationCount: 5, tier: 'Gold' },
]

/** Monthly leaderboard: Hyderabad neighborhoods & corridors */
const HYDERABAD_AREA_LEADERS = [
  { area: 'Jubilee Hills', donations: 468, funds: '₹6.8L', rank: 1 },
  { area: 'Gachibowli', donations: 412, funds: '₹5.9L', rank: 2 },
  { area: 'Secunderabad', donations: 395, funds: '₹5.4L', rank: 3 },
  { area: 'Banjara Hills', donations: 356, funds: '₹4.9L', rank: 4 },
  { area: 'Madhapur', donations: 318, funds: '₹4.2L', rank: 5 },
  { area: 'Kukatpally', donations: 289, funds: '₹3.8L', rank: 6 },
  { area: 'HITEC City', donations: 265, funds: '₹3.5L', rank: 7 },
  { area: 'Kondapur', donations: 241, funds: '₹3.1L', rank: 8 },
  { area: 'Dilsukhnagar', donations: 198, funds: '₹2.6L', rank: 9 },
  { area: 'Uppal', donations: 172, funds: '₹2.2L', rank: 10 },
]

const INDIVIDUAL_LEADERS = [
  { name: 'Venkat Rao', tier: 'Platinum' as Tier, credits: 4800, donations: 48, area: 'Film Nagar' },
  { name: 'Mahesh Babu', tier: 'Platinum' as Tier, credits: 4200, donations: 42, area: 'Jubilee Hills' },
  { name: 'Gopal Reddy', tier: 'Platinum' as Tier, credits: 3900, donations: 39, area: 'Banjara Hills' },
  { name: 'Srinivas Rao', tier: 'Platinum' as Tier, credits: 3600, donations: 36, area: 'Gachibowli' },
  { name: 'Anitha Reddy', tier: 'Gold' as Tier, credits: 3200, donations: 32, area: 'Secunderabad' },
  { name: 'Padma Kumari', tier: 'Gold' as Tier, credits: 2800, donations: 28, area: 'Khairatabad' },
  { name: 'Anil Prasad', tier: 'Gold' as Tier, credits: 2400, donations: 24, area: 'Madhapur' },
  { name: 'Suresh Varma', tier: 'Silver' as Tier, credits: 2000, donations: 20, area: 'Kukatpally' },
  { name: 'Rajesh Kumar', tier: 'Silver' as Tier, credits: 1800, donations: 18, area: 'HITEC City' },
  { name: 'Krishna Murthy', tier: 'Silver' as Tier, credits: 1500, donations: 15, area: 'Kondapur' },
]

const FAN_CLUBS = [
  { name: 'Mega Star Fans — Jubilee Hills & Banjara', events: 42, donations: 890, members: 620 },
  { name: 'Mega Star Fans — Gachibowli & HITEC', events: 38, donations: 756, members: 540 },
  { name: 'Chiru Youth Brigade — Secunderabad', events: 35, donations: 612, members: 480 },
  { name: 'Blood Warriors — Madhapur & Kondapur', events: 28, donations: 498, members: 410 },
  { name: 'CCT Volunteers — Kukatpally & Miyapur', events: 25, donations: 445, members: 360 },
  { name: 'Red Drop Society — Dilsukhnagar & LB Nagar', events: 22, donations: 392, members: 310 },
  { name: 'Life Savers Club — Uppal & Nacharam', events: 18, donations: 286, members: 245 },
  { name: 'Mega Star Fans — Old City & Charminar', events: 15, donations: 228, members: 198 },
]

const MONTHS = [
  'January 2026', 'February 2026', 'March 2026', 'April 2026',
  'May 2026', 'June 2026', 'July 2026', 'August 2026',
  'September 2026', 'October 2026', 'November 2026', 'December 2026',
]

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean)
  const letters = parts.map(w => w[0]!).join('')
  return (letters.slice(0, 2) || '?').toUpperCase()
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
  const [leaderTab, setLeaderTab] = useState<LeaderTab>('area')
  const [monthIdx, setMonthIdx] = useState(3) // April 2026
  const liveIdx = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (liveIdx.current >= LIVE_DONORS.length) {
        clearInterval(interval)
        return
      }
      const next = LIVE_DONORS[liveIdx.current]
      liveIdx.current += 1
      setLiveFeed(prev => [next, ...prev])
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const allDonors = [...liveFeed, ...DONORS]
  const visibleDonors = allDonors.slice(0, visibleCount)

  const prevMonth = () => setMonthIdx(i => Math.max(0, i - 1))
  const nextMonth = () => setMonthIdx(i => Math.min(MONTHS.length - 1, i + 1))

  return (
    <div className="dw2-page" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* ── HEADER ── */}
      <header className="dw2-hero">
        <span className="dw2-eyebrow">Community Recognition</span>
        <h1 className="dw2-heading">Wall of <span className="dw2-heading-accent">Heroes</span></h1>
        <p className="dw2-subtitle">Every donation writes a story of hope</p>
      </header>

      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <div className="dw2-main">
        {/* LEFT — DONOR FEED */}
        <section className="dw2-feed-col">
          <div className="dw2-feed">
            {visibleDonors.map((d, i) => {
              const isNew = i < liveFeed.length
              const ci = Math.abs(d.name.charCodeAt(0) || 0) % AVATAR_COLORS.length
              const avatarBg = AVATAR_COLORS[ci]
              const avatarTxt = getAvatarTextColor(avatarBg)
              return (
                <div
                  key={`${d.name}|${d.bloodType}|${d.timeAgo}|${d.area}|${i}`}
                  className={`dw2-donor-card${isNew ? ' dw2-new' : ''}`}
                >
                  <div className="dw2-donor-avatar" style={{ background: avatarBg, color: avatarTxt }}>
                    {getInitials(d.name)}
                  </div>
                  <div className="dw2-donor-info">
                    <div className="dw2-donor-top">
                      <span className="dw2-donor-name">{d.name}</span>
                      <span className="dw2-donor-city">📍 {d.area}</span>
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
            {(['area', 'individual', 'fanclub'] as LeaderTab[]).map(tab => (
              <button
                key={tab}
                className={`dw2-tab${leaderTab === tab ? ' dw2-tab-active' : ''}`}
                onClick={() => setLeaderTab(tab)}
              >
                {tab === 'area' ? 'Area' : tab === 'individual' ? 'Individual' : 'Fan Club'}
              </button>
            ))}
          </div>

          {/* ── HYDERABAD AREAS TAB ── */}
          {leaderTab === 'area' && (
            <div className="dw2-city-board">
              <div className="dw2-month-selector">
                <button className="dw2-month-btn" onClick={prevMonth} disabled={monthIdx === 0}>←</button>
                <span className="dw2-month-label">{MONTHS[monthIdx]}</span>
                <button className="dw2-month-btn" onClick={nextMonth} disabled={monthIdx === MONTHS.length - 1}>→</button>
              </div>
              <p className="dw2-area-hint">Top neighborhoods · Greater Hyderabad</p>

              <div className="dw2-podium">
                {/* 2nd place */}
                <div className="dw2-podium-block dw2-podium-2">
                  <div className="dw2-podium-medal">🥈</div>
                  <div className="dw2-podium-city">{HYDERABAD_AREA_LEADERS[1].area}</div>
                  <div className="dw2-podium-count">{HYDERABAD_AREA_LEADERS[1].donations.toLocaleString('en-IN')}</div>
                </div>
                {/* 1st place */}
                <div className="dw2-podium-block dw2-podium-1">
                  <div className="dw2-podium-medal">🥇</div>
                  <div className="dw2-podium-city">{HYDERABAD_AREA_LEADERS[0].area}</div>
                  <div className="dw2-podium-count">{HYDERABAD_AREA_LEADERS[0].donations.toLocaleString('en-IN')}</div>
                </div>
                {/* 3rd place */}
                <div className="dw2-podium-block dw2-podium-3">
                  <div className="dw2-podium-medal">🥉</div>
                  <div className="dw2-podium-city">{HYDERABAD_AREA_LEADERS[2].area}</div>
                  <div className="dw2-podium-count">{HYDERABAD_AREA_LEADERS[2].donations.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="dw2-rank-list">
                {HYDERABAD_AREA_LEADERS.slice(3).map(c => (
                  <div key={c.rank} className="dw2-rank-row">
                    <span className="dw2-rank-num">{c.rank}</span>
                    <span className="dw2-rank-name">{c.area}</span>
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
                      <span className="dw2-top3-city">📍 {d.area}</span>
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
                    <span className="dw2-rank-funds">{d.donations} donations · {d.area}</span>
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
    </div>
  )
}
