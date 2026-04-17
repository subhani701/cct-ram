import { useState, useEffect, useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { AnimatedCounter } from '../components/AnimatedCounter'

const TIMELINE = [
  { year: '1998', text: 'CCT Founded by Megastar Chiranjeevi' },
  { year: '2005', text: '1,00,000 blood units milestone' },
  { year: '2012', text: 'First mega blood drive — 5,000 donors in one day' },
  { year: '2018', text: 'Partnership with 50+ hospitals across AP & TS' },
  { year: '2024', text: 'Digital platform launch' },
  { year: '2026', text: '12 lakh units and counting' },
]

const DISTRICTS = [
  { name: 'Hyderabad', count: 1840 },
  { name: 'Vijayawada', count: 620 },
  { name: 'Tirupati', count: 510 },
  { name: 'Visakhapatnam', count: 390 },
  { name: 'Guntur', count: 310 },
  { name: 'Warangal', count: 240 },
  { name: 'Kakinada', count: 180 },
  { name: 'Kurnool', count: 140 },
  { name: 'Nellore', count: 120 },
  { name: 'Rajahmundry', count: 100 },
  { name: 'Karimnagar', count: 85 },
  { name: 'Khammam', count: 65 },
]

const MONTHLY_DATA = [
  { month: 'Apr', count: 980 },
  { month: 'May', count: 1100 },
  { month: 'Jun', count: 1250 },
  { month: 'Jul', count: 1400 },
  { month: 'Aug', count: 1180 },
  { month: 'Sep', count: 1050 },
  { month: 'Oct', count: 1320 },
  { month: 'Nov', count: 1500 },
  { month: 'Dec', count: 2400 },
  { month: 'Jan', count: 1800 },
  { month: 'Feb', count: 1600 },
  { month: 'Mar', count: 1900 },
]

const BLOOD_DIST = [
  { type: 'O+', pct: 35, color: '#CC0033' },
  { type: 'B+', pct: 25, color: '#E8003A' },
  { type: 'A+', pct: 20, color: '#C98A0A' },
  { type: 'AB+', pct: 8, color: '#107040' },
  { type: 'O-', pct: 5, color: '#C45A00' },
  { type: 'B-', pct: 3, color: '#1D4ED8' },
  { type: 'A-', pct: 3, color: '#6B5C4A' },
  { type: 'AB-', pct: 1, color: '#8E8E8E' },
]

const maxMonthly = Math.max(...MONTHLY_DATA.map(d => d.count))
const maxDistrict = Math.max(...DISTRICTS.map(d => d.count))

export default function Impact() {
  const [barsVisible, setBarsVisible] = useState(false)
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barsRef.current
    if (!el) return
    const ro = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setBarsVisible(true); ro.disconnect() }
    }, { threshold: 0.2 })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // SVG donut
  const donutR = 80
  const donutC = 2 * Math.PI * donutR
  let cumOffset = 0
  const segments = BLOOD_DIST.map(d => {
    const dash = (d.pct / 100) * donutC
    const off = cumOffset
    cumOffset += dash
    return { ...d, dash, off }
  })

  return (
    <div className="imp-page" style={{ paddingTop: 62 }}>
      {/* HERO STATS */}
      <section className="imp-hero">
        <Reveal>
          <span className="imp-eyebrow">Our Impact</span>
          <h1 className="imp-hero-heading">Numbers that matter</h1>
        </Reveal>
        <div className="imp-hero-grid">
          <Reveal delayClass="d1">
            <div className="imp-hero-stat">
              <AnimatedCounter target={1200000} className="imp-hero-num" style={{ background: 'none', WebkitTextFillColor: 'var(--gold)' }} />
              <span className="imp-hero-label">Blood Units Collected</span>
            </div>
          </Reveal>
          <Reveal delayClass="d2">
            <div className="imp-hero-stat">
              <AnimatedCounter target={4700} className="imp-hero-num" style={{ background: 'none', WebkitTextFillColor: 'var(--gold)' }} />
              <span className="imp-hero-label">Lives Saved</span>
            </div>
          </Reveal>
          <Reveal delayClass="d3">
            <div className="imp-hero-stat">
              <AnimatedCounter target={28000} className="imp-hero-num" style={{ background: 'none', WebkitTextFillColor: 'var(--gold)' }} />
              <span className="imp-hero-label">Active Donors</span>
            </div>
          </Reveal>
          <Reveal delayClass="d4">
            <div className="imp-hero-stat">
              <span className="imp-hero-num">&#8377;2.3Cr</span>
              <span className="imp-hero-label">Funds Raised</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="imp-timeline-section">
        <Reveal>
          <h2 className="imp-section-title">Our Journey</h2>
        </Reveal>
        <div className="imp-timeline">
          <div className="imp-tl-line" />
          {TIMELINE.map((item, i) => (
            <Reveal key={item.year} delayClass={(['d1', 'd2', 'd3', 'd4'] as const)[i % 4]}>
              <div className="imp-tl-item">
                <div className="imp-tl-dot" />
                <div className="imp-tl-content">
                  <span className="imp-tl-year">{item.year}</span>
                  <p className="imp-tl-text">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DISTRICT HEATMAP */}
      <section className="imp-district-section">
        <Reveal>
          <h2 className="imp-section-title">Across the States</h2>
        </Reveal>
        <div className="imp-district-grid">
          {DISTRICTS.map((d, i) => {
            const intensity = 0.05 + (d.count / maxDistrict) * 0.20
            return (
              <Reveal key={d.name} delayClass={(['d1', 'd2', 'd3', 'd4'] as const)[i % 4]}>
                <div
                  className="imp-district-card"
                  style={{ background: `rgba(204, 0, 51, ${intensity.toFixed(2)})` }}
                >
                  <span className="imp-district-name">{d.name}</span>
                  <span className="imp-district-count">{d.count.toLocaleString('en-IN')}</span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* BAR CHART */}
      <section className="imp-monthly-section">
        <Reveal>
          <h2 className="imp-section-title">Monthly Donations</h2>
          <p className="imp-monthly-subtitle">Apr 2025 – Mar 2026</p>
        </Reveal>
        <div className="imp-bars" ref={barsRef}>
          {MONTHLY_DATA.map(d => {
            const barH = (d.count / maxMonthly) * 280
            const isMax = d.count === maxMonthly
            return (
              <Reveal key={d.month}>
                <div className="imp-bar-wrap">
                  <div
                    className={`imp-bar ${isMax ? 'imp-bar-gold' : ''}`}
                    style={{ height: barsVisible ? `${barH}px` : '0px' }}
                  />
                  <span className="imp-bar-label">{d.month}</span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* DONUT CHART */}
      <section className="imp-donut-section">
        <Reveal>
          <h2 className="imp-section-title">Blood Type Distribution</h2>
        </Reveal>
        <div className="imp-donut-layout">
          <div className="imp-donut-chart">
            <svg viewBox="0 0 200 200" className="imp-donut-svg">
              {segments.map(seg => (
                <circle
                  key={seg.type}
                  cx="100" cy="100" r={donutR}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="30"
                  strokeDasharray={`${seg.dash} ${donutC - seg.dash}`}
                  strokeDashoffset={-seg.off}
                  transform="rotate(-90 100 100)"
                />
              ))}
            </svg>
            <div className="imp-donut-center">
              <span className="imp-donut-center-big">100%</span>
              <span className="imp-donut-center-small">of donations</span>
            </div>
          </div>
          <div className="imp-donut-legend">
            {BLOOD_DIST.map(d => (
              <div key={d.type} className="imp-legend-item">
                <span className="imp-legend-dot" style={{ background: d.color }} />
                <span className="imp-legend-type">{d.type}</span>
                <span className="imp-legend-pct">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPAIGN IMPACT */}
      <section className="imp-campaign-section">
        <Reveal>
          <p className="imp-campaign-headline">&#8377;2.3 Crore raised across 47 campaigns</p>
        </Reveal>
        <div className="imp-campaign-grid">
          <Reveal delayClass="d1">
            <div className="imp-campaign-card">
              <span className="imp-campaign-num">12</span>
              <span className="imp-campaign-label">Equipment Campaigns Completed</span>
            </div>
          </Reveal>
          <Reveal delayClass="d2">
            <div className="imp-campaign-card">
              <span className="imp-campaign-num">2,500+</span>
              <span className="imp-campaign-label">Patients Supported</span>
            </div>
          </Reveal>
          <Reveal delayClass="d3">
            <div className="imp-campaign-card">
              <span className="imp-campaign-num">8</span>
              <span className="imp-campaign-label">Blood Banks Upgraded</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="imp-cta-section">
        <Reveal>
          <h2 className="imp-cta-title">Be part of the next chapter</h2>
          <div className="imp-cta-btns">
            <a href="#/register" className="imp-cta-primary">Register as Donor &rarr;</a>
            <a href="#/campaigns" className="imp-cta-secondary">View Campaigns &rarr;</a>
          </div>
        </Reveal>
      </section>

      <footer className="imp-footer">
        <p>&copy; 2026 CCT &middot; Hyderabad | Built by VoltusWave</p>
      </footer>
    </div>
  )
}
