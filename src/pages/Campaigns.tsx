import { useState, useEffect } from 'react'
import { Reveal } from '../components/Reveal'
import { AnimatedCounter } from '../components/AnimatedCounter'

type Category = 'All' | 'Equipment' | 'Patient Support' | 'Infrastructure' | 'Emergency'

interface Contributor {
  name: string
  amount: string
  time: string
}

interface CampaignUpdate {
  date: string
  text: string
}

interface Campaign {
  id: number
  title: string
  institution: string
  city: string
  category: Exclude<Category, 'All'>
  raised: number
  goal: number
  donors: number
  daysLeft: number
  urgent?: boolean
  closingSoon?: boolean
  emoji: string
  image: string
  description: string[]
  contributors: Contributor[]
  updates: CampaignUpdate[]
}

const CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: 'Fund Platelet Separator',
    institution: 'Guntur Blood Bank',
    city: 'Guntur',
    category: 'Equipment',
    raised: 1240000,
    goal: 1800000,
    donors: 1240,
    daysLeft: 23,
    emoji: '🏥',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    description: [
      'Guntur Blood Bank urgently needs a modern platelet separator to meet growing demand for platelet transfusions. The current equipment is over 15 years old and frequently breaks down, causing delays in critical care for dengue and cancer patients across the district.',
      'A new automated platelet separator will allow the blood bank to process 20+ platelet units daily — triple the current capacity. This directly translates to faster treatment for patients battling leukaemia, dengue haemorrhagic fever, and post-surgical complications.',
      'Your contribution helps bridge the gap between outdated infrastructure and life-saving modern care. Every rupee brings Guntur closer to a fully equipped, 21st-century blood bank.',
    ],
    contributors: [
      { name: 'Rajesh Kumar', amount: '₹5,000', time: '2 hours ago' },
      { name: 'Anonymous', amount: '₹2,500', time: '5 hours ago' },
      { name: 'Padma Devi', amount: '₹1,000', time: '1 day ago' },
      { name: 'Venkat Rao', amount: '₹500', time: '1 day ago' },
      { name: 'Srinivas Reddy', amount: '₹10,000', time: '2 days ago' },
    ],
    updates: [
      { date: 'Apr 10, 2026', text: 'Equipment vendor confirmed — delivery within 2 weeks of full funding. We are 69% there!' },
      { date: 'Mar 28, 2026', text: 'Campaign launched with seed funding of ₹3,00,000 from CCT general fund' },
    ],
  },
  {
    id: 2,
    title: 'Support 50 Thalassemia Patients',
    institution: 'NIMS Hyderabad',
    city: 'Hyderabad',
    category: 'Patient Support',
    raised: 380000,
    goal: 600000,
    donors: 418,
    daysLeft: 45,
    emoji: '❤️',
    image: 'https://images.unsplash.com/photo-1519494080410-f9aa8f52f2c1?auto=format&fit=crop&w=1200&q=80',
    description: [
      'Fifty thalassemia patients at NIMS Hyderabad depend on regular blood transfusions every 2-3 weeks to survive. Many families travel from rural AP and Telangana, spending what little they have on transport and accommodation.',
      'This campaign covers transfusion costs, iron chelation therapy, and basic travel support for these families. Each month of funding means 50 children can continue their treatment without interruption.',
      'Thalassemia is a lifelong condition — but with consistent care, these children can attend school, play, and dream. Your support makes that continuity possible.',
    ],
    contributors: [
      { name: 'Lakshmi Prasad', amount: '₹2,500', time: '3 hours ago' },
      { name: 'Mahesh Babu', amount: '₹5,000', time: '8 hours ago' },
      { name: 'Anonymous', amount: '₹100', time: '1 day ago' },
      { name: 'Divya Sree', amount: '₹1,000', time: '2 days ago' },
      { name: 'Gopal Reddy', amount: '₹500', time: '3 days ago' },
    ],
    updates: [
      { date: 'Apr 12, 2026', text: 'April transfusions completed for all 50 patients. Fund utilization report shared with donors' },
      { date: 'Apr 1, 2026', text: '3 new patients added to the programme after referral from Kurnool district hospital' },
    ],
  },
  {
    id: 3,
    title: 'Emergency Blood Storage Unit',
    institution: 'Tirupati Hospital',
    city: 'Tirupati',
    category: 'Emergency',
    raised: 890000,
    goal: 1000000,
    donors: 2108,
    daysLeft: 8,
    urgent: true,
    emoji: '🚨',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80',
    description: [
      'Tirupati Hospital\'s blood storage facility experienced a critical refrigeration failure last month, putting 200+ units of stored blood at risk. Emergency repairs prevented immediate loss, but the aging infrastructure needs a complete overhaul.',
      'This campaign funds a new walk-in cold storage unit with backup power, temperature monitoring sensors, and automated alerts. The system will safely store up to 500 units — essential during the pilgrimage season when Tirupati sees massive blood demand spikes.',
      'With only 8 days remaining and 89% funded, we are incredibly close. Your contribution today could be the one that pushes us over the finish line.',
    ],
    contributors: [
      { name: 'Anitha Reddy', amount: '₹10,000', time: '30 minutes ago' },
      { name: 'Krishna Murthy', amount: '₹5,000', time: '1 hour ago' },
      { name: 'Anonymous', amount: '₹2,500', time: '3 hours ago' },
      { name: 'Ravi Kumar', amount: '₹1,000', time: '6 hours ago' },
      { name: 'Swathi Naidu', amount: '₹500', time: '1 day ago' },
    ],
    updates: [
      { date: 'Apr 14, 2026', text: 'Crossed ₹8,50,000! Storage unit vendor on standby for immediate installation once funded' },
      { date: 'Apr 8, 2026', text: 'Tirupati Hospital administration approved space allocation for the new storage unit' },
    ],
  },
  {
    id: 4,
    title: 'Blood Bank Refrigeration Upgrade',
    institution: 'Kakinada Govt Hospital',
    city: 'Kakinada',
    category: 'Equipment',
    raised: 520000,
    goal: 1200000,
    donors: 340,
    daysLeft: 60,
    emoji: '🏥',
    image: 'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=1200&q=80',
    description: [
      'Kakinada Government Hospital serves over 2 lakh people across East Godavari district. Their blood bank refrigeration system, installed in 2008, is running on borrowed time with frequent temperature fluctuations that risk contaminating stored blood.',
      'The upgrade will replace all 4 blood storage refrigerators with modern units featuring digital temperature control, power-failure alarms, and IoT-based remote monitoring. This ensures 24/7 compliance with CDSCO storage standards.',
      'Better storage means less blood wastage, fewer emergency shortages, and safer transfusions for patients across the district.',
    ],
    contributors: [
      { name: 'Suresh Varma', amount: '₹2,500', time: '1 day ago' },
      { name: 'Meena Kumari', amount: '₹1,000', time: '2 days ago' },
      { name: 'Anonymous', amount: '₹5,000', time: '3 days ago' },
      { name: 'Anil Prasad', amount: '₹500', time: '4 days ago' },
      { name: 'Deepika Chowdary', amount: '₹100', time: '5 days ago' },
    ],
    updates: [
      { date: 'Apr 5, 2026', text: 'Hospital chief medical officer endorsed the campaign. Procurement process initiated' },
      { date: 'Mar 20, 2026', text: 'Campaign launched. Target: 4 new blood bank refrigerators with IoT monitoring' },
    ],
  },
  {
    id: 5,
    title: 'Mobile Blood Collection Van',
    institution: 'CCT Hyderabad',
    city: 'Hyderabad',
    category: 'Infrastructure',
    raised: 2200000,
    goal: 2500000,
    donors: 3200,
    daysLeft: 15,
    closingSoon: true,
    emoji: '🏗️',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    description: [
      'CCT\'s mobile blood collection van will bring donation camps directly to colleges, offices, and communities across Hyderabad and surrounding districts. No more asking donors to travel — we bring the camp to them.',
      'The fully equipped van includes 4 donation beds, a mini-lab for immediate testing, cold storage, and a registration kiosk. It can conduct camps in locations where permanent infrastructure doesn\'t exist.',
      'With 88% funded and 15 days to go, this van will revolutionize how CCT conducts blood drives — reaching donors who want to give but can\'t always make it to a hospital.',
    ],
    contributors: [
      { name: 'Ramesh Naidu', amount: '₹25,000', time: '1 hour ago' },
      { name: 'Priya Reddy', amount: '₹5,000', time: '4 hours ago' },
      { name: 'Anonymous', amount: '₹10,000', time: '1 day ago' },
      { name: 'Sravani Devi', amount: '₹2,500', time: '1 day ago' },
      { name: 'Rajesh Kumar', amount: '₹1,000', time: '2 days ago' },
    ],
    updates: [
      { date: 'Apr 13, 2026', text: 'Van chassis purchased! Interior fitment begins once full funding is secured' },
      { date: 'Apr 2, 2026', text: 'Crossed ₹20 lakh mark. 634 donors and counting!' },
    ],
  },
  {
    id: 6,
    title: 'Thalassemia Ward Renovation',
    institution: 'KGH Visakhapatnam',
    city: 'Visakhapatnam',
    category: 'Infrastructure',
    raised: 150000,
    goal: 800000,
    donors: 89,
    daysLeft: 90,
    emoji: '🏗️',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80',
    description: [
      'The thalassemia ward at KGH Visakhapatnam treats 120+ patients but operates out of a cramped, poorly ventilated space with outdated beds and no play area for children who spend hours during transfusions.',
      'This renovation will transform the ward into a child-friendly, comfortable space with new beds, proper air conditioning, a small play corner, and a counselling room for families. Because healing is not just medical — it\'s emotional too.',
      'Help us give these brave children a ward that feels less like a hospital and more like a place of hope.',
    ],
    contributors: [
      { name: 'Padma Kumari', amount: '₹1,000', time: '2 days ago' },
      { name: 'Anonymous', amount: '₹500', time: '4 days ago' },
      { name: 'Venkat Rao', amount: '₹2,500', time: '5 days ago' },
      { name: 'Lakshmi Devi', amount: '₹100', time: '1 week ago' },
      { name: 'Srinivas Rao', amount: '₹5,000', time: '1 week ago' },
    ],
    updates: [
      { date: 'Apr 8, 2026', text: 'Architect visit completed. Renovation blueprint finalized for 1,200 sq ft ward space' },
      { date: 'Mar 25, 2026', text: 'Campaign launched after hospital board approval' },
    ],
  },
]

const FILTERS: Category[] = ['All', 'Equipment', 'Patient Support', 'Infrastructure', 'Emergency']

const CATEGORY_COLORS: Record<string, { bg: string; color: string; badge: string }> = {
  Equipment: { bg: 'rgba(59,130,246,.15)', color: '#3B82F6', badge: '🏥' },
  'Patient Support': { bg: 'var(--red-pale)', color: 'var(--red)', badge: '❤️' },
  Infrastructure: { bg: 'var(--gold-lt)', color: 'var(--gold)', badge: '🏗️' },
  Emergency: { bg: 'var(--red-pale)', color: 'var(--red)', badge: '🚨' },
}

const PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000]

function formatINR(n: number): string {
  const s = n.toString()
  if (s.length <= 3) return '₹' + s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return '₹' + formatted + ',' + last3
}

function getPercent(raised: number, goal: number): number {
  return Math.round((raised / goal) * 100)
}

export default function Campaigns() {
  const [filter, setFilter] = useState<Category>('All')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [donateAmount, setDonateAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [selectedId])

  const filtered = filter === 'All' ? CAMPAIGNS : CAMPAIGNS.filter(c => c.category === filter)
  const selected = selectedId !== null ? CAMPAIGNS.find(c => c.id === selectedId) : null
  const effectiveAmount = isCustom ? (parseInt(customAmount) || 0) : (donateAmount || 0)

  const openCampaign = (id: number) => {
    setSelectedId(id)
    setDonateAmount(null)
    setCustomAmount('')
    setIsCustom(false)
  }

  const handleShare = (type: string) => {
    if (!selected) return
    const url = window.location.href
    if (type === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(selected.title + ' — ' + url)}`, '_blank')
    } else if (type === 'x') {
      window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(selected.title)}&url=${encodeURIComponent(url)}`, '_blank')
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  /* ─── DETAIL VIEW ─── */
  if (selected) {
    const pct = getPercent(selected.raised, selected.goal)
    const catColor = CATEGORY_COLORS[selected.category]
    return (
      <div className="camp-page" style={{ paddingTop: 'var(--nav-h)' }}>
        <div className="camp-detail">
          <button className="camp-back-btn" onClick={() => setSelectedId(null)}>← All Campaigns</button>

          <div
            className="camp-detail-cover"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(12, 8, 8, 0.2) 0%, rgba(12, 8, 8, 0.85) 100%), url(${selected.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <span className="camp-detail-emoji">{selected.emoji}</span>
            <div className="camp-detail-badges">
              <span className="camp-cat-badge" style={{ background: catColor.bg, color: catColor.color }}>
                {catColor.badge} {selected.category}
              </span>
              {selected.urgent && <span className="camp-urgency-badge camp-urgent">🚨 Urgent</span>}
              {selected.closingSoon && <span className="camp-urgency-badge camp-closing">Closing Soon</span>}
            </div>
          </div>

          <div className="camp-detail-body">
            <div className="camp-detail-main">
              <h1 className="camp-detail-title">{selected.title}</h1>
              <p className="camp-detail-inst">{selected.emoji} {selected.institution} · {selected.city}</p>

              <div className="camp-detail-progress-wrap">
                <div className="camp-detail-progress-meta">
                  <span className="camp-detail-raised">{formatINR(selected.raised)}</span>
                  <span className="camp-detail-goal">of {formatINR(selected.goal)}</span>
                </div>
                <div className="camp-detail-bar">
                  <div className="camp-detail-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="camp-detail-pct">{pct}% funded</span>
              </div>

              <div className="camp-detail-stats">
                <div className="camp-stat-card">
                  <div className="camp-stat-n">{selected.donors.toLocaleString('en-IN')}</div>
                  <div className="camp-stat-l">Donors</div>
                </div>
                <div className="camp-stat-card">
                  <div className="camp-stat-n">{selected.daysLeft}</div>
                  <div className="camp-stat-l">Days Left</div>
                </div>
              </div>

              <div className="camp-detail-desc">
                {selected.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="camp-detail-section">
                <h3 className="camp-section-title">Campaign Updates</h3>
                <div className="camp-updates">
                  {selected.updates.map((u, i) => (
                    <div key={i} className="camp-update">
                      <span className="camp-update-date">{u.date}</span>
                      <p className="camp-update-text">{u.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="camp-detail-sidebar">
              <div className="camp-donate-card">
                <h3 className="camp-donate-title">Contribute to this Campaign</h3>
                <div className="camp-donate-presets">
                  {PRESET_AMOUNTS.map(a => (
                    <button
                      key={a}
                      className={`camp-donate-preset ${!isCustom && donateAmount === a ? 'on' : ''}`}
                      onClick={() => { setDonateAmount(a); setIsCustom(false); setCustomAmount('') }}
                    >
                      ₹{a.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <div className="camp-donate-custom">
                  <span className="camp-donate-prefix">₹</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    className="camp-donate-input"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setIsCustom(true); setDonateAmount(null) }}
                    min={50}
                  />
                </div>
                <a
                  className={`camp-donate-cta ${effectiveAmount < 50 ? 'disabled' : ''}`}
                  href={effectiveAmount >= 50 ? '#/donate' : undefined}
                  onClick={e => { if (effectiveAmount < 50) e.preventDefault() }}
                >
                  {effectiveAmount >= 50 ? `Donate ${formatINR(effectiveAmount)}` : 'Select an amount'}
                </a>
              </div>

              <div className="camp-sidebar-contributors">
                <h3 className="camp-section-title">Recent Contributors</h3>
                <div className="camp-contributors">
                  {selected.contributors.map((c, i) => (
                    <div key={i} className="camp-contributor">
                      <div className="camp-contributor-avatar">
                        {c.name === 'Anonymous' ? '?' : c.name.split(' ').map(w => w[0]).join('')}
                      </div>
                      <div className="camp-contributor-info">
                        <span className="camp-contributor-name">{c.name}</span>
                        <span className="camp-contributor-time">{c.time}</span>
                      </div>
                      <span className="camp-contributor-amt">{c.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="camp-sidebar-share">
                <h3 className="camp-section-title">Share this Campaign</h3>
                <div className="camp-share-row">
                  <button className="camp-share-btn camp-share-wa" onClick={() => handleShare('whatsapp')}>WhatsApp</button>
                  <button className="camp-share-btn camp-share-x" onClick={() => handleShare('x')}>𝕏 Post</button>
                  <button className="camp-share-btn camp-share-copy" onClick={() => handleShare('copy')}>
                    {copied ? '✓ Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ─── LISTING VIEW ─── */
  return (
    <div className="camp-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <header className="camp-header">
        <Reveal>
          <h1 className="camp-heading">Active <span className="camp-heading-accent">Campaigns</span></h1>
          <p className="camp-subtitle">Empowering lives through essential medical support and impactful awareness initiatives</p>
          <div className="camp-stats-row">
            <div className="camp-hero-stat">
              <AnimatedCounter target={23000000} className="camp-hero-stat-n" />
              <span className="camp-hero-stat-l">Raised</span>
            </div>
            <div className="camp-hero-stat-divider" />
            <div className="camp-hero-stat">
              <AnimatedCounter target={47} className="camp-hero-stat-n" />
              <span className="camp-hero-stat-l">Campaigns</span>
            </div>
            <div className="camp-hero-stat-divider" />
            <div className="camp-hero-stat">
              <AnimatedCounter target={3200} className="camp-hero-stat-n" />
              <span className="camp-hero-stat-l">Donors</span>
            </div>
          </div>
        </Reveal>
      </header>

      <div className="camp-filters-wrap">
        <div className="camp-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`camp-filter ${filter === f ? 'on' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="camp-content">
        <div className="camp-grid">
          {/* General Fund Card */}
          {filter === 'All' && (
            <Reveal className="camp-general-card">
              <div
                className="camp-general-inner"
                onClick={() => { window.location.hash = '#/donate' }}
                style={{
                  cursor: 'pointer',
                  backgroundImage: 'linear-gradient(180deg, rgba(12, 8, 8, 0.55) 0%, rgba(12, 8, 8, 0.86) 100%), url(https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1400&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <span className="camp-general-badge">General Fund</span>
                <span className="camp-general-emoji">💛</span>
                <h2 className="camp-general-title">Contribute to CCT's General Fund</h2>
                <p className="camp-general-desc">Your donation goes where it's needed most — emergency blood procurement, patient support, and infrastructure upgrades across our network</p>
                <button className="camp-general-cta">Contribute Now →</button>
              </div>
            </Reveal>
          )}

          {filtered.map((c, i) => {
            const pct = getPercent(c.raised, c.goal)
            return (
              <Reveal key={c.id} delayClass={i % 2 === 0 ? 'd1' : 'd2'}>
                <div className="camp-card" onClick={() => openCampaign(c.id)}>
                  <div
                    className="camp-card-cover"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(12, 8, 8, 0.2) 0%, rgba(12, 8, 8, 0.82) 100%), url(${c.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <span className="camp-card-emoji">{c.emoji}</span>
                  </div>
                  <div className="camp-card-body">
                    <h3 className="camp-card-title">{c.title}</h3>
                    <p className="camp-card-inst">{c.institution} · {c.city}</p>
                    <div className="camp-card-bar">
                      <div className="camp-card-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="camp-card-amounts">
                      <span className="camp-card-raised">{formatINR(c.raised)} raised</span>
                      <span className="camp-card-goal">of {formatINR(c.goal)}</span>
                    </div>
                    <div className="camp-card-meta">
                      <span>{c.donors.toLocaleString('en-IN')} donors</span>
                      <span>{c.daysLeft} days left</span>
                    </div>
                    <button className="camp-card-cta" onClick={e => { e.stopPropagation(); openCampaign(c.id) }}>
                      Contribute
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}
