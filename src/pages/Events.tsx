import { useState, useEffect, useMemo } from 'react'
import { Reveal } from '../components/Reveal'

type EventType = 'Blood Drive' | 'Fundraiser' | 'Awareness' | 'Community'
type FilterType = 'All' | EventType

interface EventData {
  id: number
  title: string
  type: EventType
  date: string
  day: string
  monthShort: string
  time: string
  venue: string
  city: string
  slotsTotal: number
  slotsTaken: number
  price?: string
  emoji: string
  description: string[]
}

const TYPE_COLORS: Record<EventType, { bg: string; color: string; gradient: string }> = {
  'Blood Drive': { bg: 'var(--red-pale)', color: 'var(--red)', gradient: 'linear-gradient(135deg, #CC0033 0%, #8B0022 100%)' },
  Fundraiser: { bg: 'var(--gold-lt)', color: 'var(--gold)', gradient: 'linear-gradient(135deg, #C98A0A 0%, #8B6508 100%)' },
  Awareness: { bg: 'var(--blue-lt)', color: 'var(--blue)', gradient: 'linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 100%)' },
  Community: { bg: 'var(--green-lt)', color: 'var(--green)', gradient: 'linear-gradient(135deg, #107040 0%, #065F46 100%)' },
}

const EVENTS: EventData[] = [
  {
    id: 1, title: 'Mega Blood Drive 2026', type: 'Blood Drive',
    date: 'May 15, 2026', day: '15', monthShort: 'MAY',
    time: '8 AM – 6 PM', venue: 'LB Stadium', city: 'Hyderabad',
    slotsTotal: 500, slotsTaken: 358, emoji: '🩸',
    description: [
      'CCT\'s flagship annual blood drive returns to LB Stadium with a goal of 500 donors in a single day. Last year we collected 420 units — this year we\'re aiming higher. The event features health checkups, refreshments, and certificates for all donors',
      'Celebrity appearances, live music, and a donor appreciation ceremony make this more than a blood drive — it\'s a celebration of community spirit. Bring your friends, bring your family, and let\'s set a new record together',
    ],
  },
  {
    id: 2, title: 'Campus Blood Donation Camp', type: 'Blood Drive',
    date: 'May 22, 2026', day: '22', monthShort: 'MAY',
    time: '10 AM – 4 PM', venue: 'JNTU Campus', city: 'Vijayawada',
    slotsTotal: 200, slotsTaken: 45, emoji: '🩸',
    description: [
      'JNTU Vijayawada\'s NSS wing partners with CCT for a campus-wide blood donation camp. Open to students, faculty, and nearby residents. First-time donors get special guidance from our trained counsellors',
      'Refreshments, donor cards, and blood type testing included. Students donating for the first time receive a CCT "First Drop" certificate — perfect for your portfolio of community service',
    ],
  },
  {
    id: 3, title: 'Birthday Celebration Blood Drive', type: 'Blood Drive',
    date: 'Jun 2, 2026', day: '2', monthShort: 'JUN',
    time: 'All Day', venue: 'SVU', city: 'Tirupati',
    slotsTotal: 300, slotsTaken: 200, emoji: '🩸',
    description: [
      'Megastar fans across Tirupati come together for the annual birthday celebration blood drive at Sri Venkateswara University. What better way to celebrate than by saving lives?',
      'The event includes a mega blood donation camp, health awareness stalls, and a film screening. Fan clubs from across Chittoor district participate in this tradition that has saved thousands of lives over the years',
    ],
  },
  {
    id: 4, title: 'Thalassemia Awareness Walk', type: 'Awareness',
    date: 'May 28, 2026', day: '28', monthShort: 'MAY',
    time: '7 AM', venue: 'Tank Bund', city: 'Hyderabad',
    slotsTotal: 500, slotsTaken: 120, emoji: '📢',
    description: [
      'Join hundreds of walkers along Hyderabad\'s iconic Tank Bund to raise awareness about thalassemia — a condition that affects thousands of children in Telangana and AP. Learn how regular blood donation directly supports thalassemia patients',
      'The 5km walk starts at Tank Bund and ends at People\'s Plaza, where doctors from NIMS will give free blood type tests and thalassemia screenings. Families of thalassemia patients will share their stories of hope',
    ],
  },
  {
    id: 5, title: 'Annual Fundraiser Gala', type: 'Fundraiser',
    date: 'Jun 10, 2026', day: '10', monthShort: 'JUN',
    time: '6 PM onwards', venue: 'Marriott', city: 'Hyderabad',
    slotsTotal: 150, slotsTaken: 80, price: '₹2,000/seat',
    emoji: '💰',
    description: [
      'CCT\'s annual fundraiser gala brings together corporate leaders, philanthropists, and celebrities for an evening of impact. Proceeds fund blood bank infrastructure upgrades across rural AP and Telangana',
      'The evening includes dinner, a keynote by Dr Ramesh Chandra on "The Future of Blood Banking in India," a live auction of art donated by local artists, and the announcement of CCT\'s 2027 roadmap. Black tie optional',
    ],
  },
  {
    id: 6, title: 'Community Health Check Camp', type: 'Community',
    date: 'May 30, 2026', day: '30', monthShort: 'MAY',
    time: '9 AM – 1 PM', venue: 'Govt School', city: 'Guntur',
    slotsTotal: 100, slotsTaken: 0, emoji: '🤝',
    description: [
      'Free health check camp for the Guntur community, offering blood pressure screening, blood sugar tests, blood type identification, and basic health consultations. No registration required — walk in anytime between 9 AM and 1 PM',
      'CCT volunteers and doctors from Guntur Govt Hospital collaborate to bring healthcare to underserved neighborhoods. Parents can get their children\'s blood types identified — important information that many families in rural areas don\'t have',
    ],
  },
  {
    id: 7, title: 'Eye Donation Pledge Drive', type: 'Awareness',
    date: 'Jun 5, 2026', day: '5', monthShort: 'JUN',
    time: 'All Day', venue: 'Kurnool Medical College', city: 'Kurnool',
    slotsTotal: 200, slotsTaken: 50, emoji: '📢',
    description: [
      'In partnership with Kurnool Medical College\'s ophthalmology department, CCT is organizing an eye donation awareness and pledge drive. Learn about the gift of sight and how organ donation saves lives beyond blood',
      'Ophthalmologists will give free eye checkups, and pledgers receive an eye donation commitment card. The event features testimonials from corneal transplant recipients and educational materials in Telugu and English',
    ],
  },
  {
    id: 8, title: 'Fan Club Blood Drive Marathon', type: 'Blood Drive',
    date: 'Jun 15, 2026', day: '15', monthShort: 'JUN',
    time: 'All Day', venue: 'Multiple venues', city: 'Multiple cities',
    slotsTotal: 1000, slotsTaken: 0, emoji: '🩸',
    description: [
      'The biggest coordinated blood drive in CCT history — fan clubs across 10 cities simultaneously host blood donation camps. From Hyderabad to Tirupati, Vijayawada to Visakhapatnam, the goal is 1,000 units in one day',
      'Each participating fan club gets a CCT "Blood Champions" trophy. The city that collects the most units wins the "Mega Cup." Live dashboards at each venue show real-time progress across all cities. Be part of history',
    ],
  },
]

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const FILTER_TYPES: FilterType[] = ['All', 'Blood Drive', 'Fundraiser', 'Awareness', 'Community']
const FILTER_CITIES = ['All Cities', 'Hyderabad', 'Vijayawada', 'Tirupati', 'Guntur', 'Kurnool', 'Multiple cities']

export default function Events() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('All')
  const [cityFilter, setCityFilter] = useState('All Cities')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [regName, setRegName] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regBlood, setRegBlood] = useState('')
  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedId])

  const filtered = useMemo(() => {
    let events = EVENTS
    if (typeFilter !== 'All') events = events.filter(e => e.type === typeFilter)
    if (cityFilter !== 'All Cities') events = events.filter(e => e.city === cityFilter)
    return events
  }, [typeFilter, cityFilter])

  const selected = selectedId !== null ? EVENTS.find(e => e.id === selectedId) : null
  const similarEvents = selected ? EVENTS.filter(e => e.type === selected.type && e.id !== selected.id).slice(0, 2) : []

  const openEvent = (id: number) => {
    setSelectedId(id)
    setRegName('')
    setRegPhone('')
    setRegBlood('')
    setRegistered(false)
  }

  const handleRegister = () => {
    if (regName && regPhone.length >= 10) {
      setRegistered(true)
    }
  }

  const handleShare = (type: string) => {
    if (!selected) return
    const url = window.location.href
    if (type === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(selected.title + ' — ' + url)}`, '_blank')
    else if (type === 'x') window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(selected.title)}&url=${encodeURIComponent(url)}`, '_blank')
    else navigator.clipboard.writeText(url)
  }

  /* ─── DETAIL VIEW ─── */
  if (selected) {
    const slotsRemaining = selected.slotsTotal - selected.slotsTaken
    const pct = Math.round((selected.slotsTaken / selected.slotsTotal) * 100)
    const tc = TYPE_COLORS[selected.type]

    return (
      <div className="evt-page" style={{ paddingTop: 62 }}>
        <div className="evt-detail">
          <button className="evt-back-btn" onClick={() => setSelectedId(null)}>← All Events</button>

          <div className="evt-detail-hero" style={{ background: tc.gradient }}>
            <span className="evt-detail-emoji">{selected.emoji}</span>
          </div>

          <div className="evt-detail-layout">
            {/* Left column */}
            <div className="evt-detail-main">
              <h1 className="evt-detail-title">{selected.title}</h1>

              <div className="evt-detail-meta">
                <div className="evt-detail-meta-item">
                  <span className="evt-detail-meta-icon">📅</span>
                  <div>
                    <span className="evt-detail-meta-label">Date & Time</span>
                    <span className="evt-detail-meta-value">{selected.date} · {selected.time}</span>
                  </div>
                </div>
                <div className="evt-detail-meta-item">
                  <span className="evt-detail-meta-icon">📍</span>
                  <div>
                    <span className="evt-detail-meta-label">Venue</span>
                    <span className="evt-detail-meta-value">{selected.venue}, {selected.city}</span>
                  </div>
                </div>
                {selected.price && (
                  <div className="evt-detail-meta-item">
                    <span className="evt-detail-meta-icon">💰</span>
                    <div>
                      <span className="evt-detail-meta-label">Entry</span>
                      <span className="evt-detail-meta-value">{selected.price}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="evt-detail-slots">
                <div className="evt-detail-slots-info">
                  <span className="evt-slots-remaining">{slotsRemaining} slots remaining</span>
                  <span className="evt-slots-total">of {selected.slotsTotal}</span>
                </div>
                <div className="evt-detail-bar">
                  <div className="evt-detail-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="evt-detail-desc">
                {selected.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* Share */}
              <div className="evt-share-section">
                <h3 className="evt-section-title">Share this Event</h3>
                <div className="evt-share-row">
                  <button className="evt-share-btn evt-share-wa" onClick={() => handleShare('whatsapp')}>WhatsApp</button>
                  <button className="evt-share-btn evt-share-x" onClick={() => handleShare('x')}>𝕏 Post</button>
                  <button className="evt-share-btn evt-share-copy" onClick={() => handleShare('copy')}>Copy Link</button>
                </div>
              </div>

              {/* Similar Events */}
              {similarEvents.length > 0 && (
                <div className="evt-similar">
                  <h3 className="evt-section-title">Similar Events</h3>
                  <div className="evt-similar-grid">
                    {similarEvents.map(e => {
                      const stc = TYPE_COLORS[e.type]
                      const sPct = Math.round((e.slotsTaken / e.slotsTotal) * 100)
                      return (
                        <div key={e.id} className="evt-card" onClick={() => openEvent(e.id)}>
                          <div className="evt-card-cover" style={{ background: stc.gradient }}>
                            <div className="evt-card-date-badge">
                              <span className="evt-card-day">{e.day}</span>
                              <span className="evt-card-month">{e.monthShort}</span>
                            </div>
                            <span className="evt-card-emoji">{e.emoji}</span>
                          </div>
                          <div className="evt-card-body">
                            <span className="evt-card-type" style={{ background: stc.bg, color: stc.color }}>{e.type}</span>
                            <h4 className="evt-card-title">{e.title}</h4>
                            <p className="evt-card-info-line">📅 {e.date}</p>
                            <p className="evt-card-info-line">📍 {e.venue}, {e.city}</p>
                            <div className="evt-card-slots">
                              <div className="evt-card-bar">
                                <div className="evt-card-fill" style={{ width: `${sPct}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar — registration */}
            <aside className="evt-detail-sidebar">
              <div className="evt-reg-card">
                <h3 className="evt-reg-heading">Register for this Event</h3>
                {registered ? (
                  <div className="evt-reg-success">
                    <div className="evt-reg-check">✓</div>
                    <h4>You're registered!</h4>
                    <p>We'll send a confirmation to {regPhone}</p>
                  </div>
                ) : (
                  <div className="evt-reg-form">
                    <input className="evt-reg-input" placeholder="Full Name" value={regName} onChange={e => setRegName(e.target.value)} />
                    <div className="evt-reg-phone-wrap">
                      <span className="evt-reg-prefix">+91</span>
                      <input className="evt-reg-input evt-reg-phone" placeholder="Phone number" value={regPhone} onChange={e => setRegPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} />
                    </div>
                    <select className="evt-reg-select" value={regBlood} onChange={e => setRegBlood(e.target.value)}>
                      <option value="">Blood Type (optional)</option>
                      {BLOOD_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                    <button className="evt-reg-btn" onClick={handleRegister} disabled={!regName || regPhone.length < 10}>
                      Register →
                    </button>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        <footer className="evt-footer">
          <p>© 2026 CCT · Hyderabad | Built by VoltusWave</p>
        </footer>
      </div>
    )
  }

  /* ─── LISTING VIEW ─── */
  return (
    <div className="evt-page" style={{ paddingTop: 62 }}>
      <header className="evt-header">
        <Reveal>
          <span className="evt-eyebrow">What's Happening</span>
          <h1 className="evt-heading">Events & <span className="evt-heading-accent">Blood Drives</span></h1>
          <div className="evt-stat-pills">
            <span className="evt-stat-pill">12 Upcoming</span>
            <span className="evt-stat-pill">5 Cities</span>
            <span className="evt-stat-pill">2,400 Slots</span>
          </div>
        </Reveal>
      </header>

      <div className="evt-content">
        <div className="evt-filters">
          <div className="evt-filter-pills">
            {FILTER_TYPES.map(f => (
              <button key={f} className={`evt-filter ${typeFilter === f ? 'on' : ''}`} onClick={() => setTypeFilter(f)}>{f}</button>
            ))}
          </div>
          <select className="evt-city-select" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
            {FILTER_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="evt-cards">
          {filtered.map((e, i) => {
            const tc = TYPE_COLORS[e.type]
            const slotsRemaining = e.slotsTotal - e.slotsTaken
            const pct = Math.round((e.slotsTaken / e.slotsTotal) * 100)
            return (
              <Reveal key={e.id} delayClass={i % 3 === 0 ? 'd1' : i % 3 === 1 ? 'd2' : 'd3'}>
                <div className="evt-card" onClick={() => openEvent(e.id)}>
                  <div className="evt-card-cover" style={{ background: tc.gradient }}>
                    <div className="evt-card-date-badge">
                      <span className="evt-card-day">{e.day}</span>
                      <span className="evt-card-month">{e.monthShort}</span>
                    </div>
                    <span className="evt-card-emoji">{e.emoji}</span>
                  </div>
                  <div className="evt-card-body">
                    <span className="evt-card-type" style={{ background: tc.bg, color: tc.color }}>{e.type}</span>
                    <h3 className="evt-card-title">{e.title}</h3>
                    <p className="evt-card-info-line">📅 {e.date} · {e.time}</p>
                    <p className="evt-card-info-line">📍 {e.venue}, {e.city}</p>
                    {e.price && <p className="evt-card-info-line">💰 {e.price}</p>}
                    <div className="evt-card-slots">
                      <div className="evt-card-slots-text">
                        <span className="evt-card-slots-rem">{slotsRemaining} of {e.slotsTotal} slots</span>
                        <span className="evt-card-slots-pct">{pct}% filled</span>
                      </div>
                      <div className="evt-card-bar">
                        <div className="evt-card-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <button className="evt-card-cta" onClick={ev => { ev.stopPropagation(); openEvent(e.id) }}>Register →</button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="evt-empty"><p>No events match your filters</p></div>
        )}

        <Reveal>
          <div className="evt-submit-cta">
            <h3>Organising a blood drive or community event?</h3>
            <p>Partner with CCT and get support, supplies, and volunteers</p>
            <button className="evt-submit-btn">Submit an Event →</button>
          </div>
        </Reveal>
      </div>

      <footer className="evt-footer">
        <p>© 2026 CCT · Hyderabad | Built by VoltusWave</p>
      </footer>
    </div>
  )
}
