import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatedCounter } from './components/AnimatedCounter'
import { Reveal } from './components/Reveal'
import {
  BLOOD_URGENCY,
  DONORS,
  FAN_EVENTS,
  type EventFilter,
  type FedEmojiFilter,
  PAST_EVENTS,
  STORIES,
  TICKER_ITEMS,
} from './data/siteData'


function useCustomCursor() {
  const curRef = useRef<HTMLDivElement>(null)
  const curRRef = useRef<HTMLDivElement>(null)
  const mx = useRef(0)
  const my = useRef(0)
  const rx = useRef(0)
  const ry = useRef(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      const cur = curRef.current
      if (cur) {
        cur.style.left = `${e.clientX}px`
        cur.style.top = `${e.clientY}px`
      }
    }
    document.addEventListener('mousemove', onMove)
    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.1
      ry.current += (my.current - ry.current) * 0.1
      const ring = curRRef.current
      if (ring) {
        ring.style.left = `${rx.current}px`
        ring.style.top = `${ry.current}px`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return { curRef, curRRef }
}

function formatHeartCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

type WorkDef = {
  feat?: boolean
  wt: 'fund' | 'blood' | 'community'
  imgBg: string
  emoji: string
  imgFontSize?: string
  chips: { cls: string; t: string }[]
  title: string
  body: string
  wavBg: string
  wavColor: string
  wav: string
  by: string
  hearts: number
}

const WORKS: WorkDef[] = [
  {
    wt: 'fund',
    imgBg: 'linear-gradient(135deg,#FEF3D7,#FFE49A)',
    emoji: '💛',
    imgFontSize: '72px',
    chips: [
      { cls: 'wch wch-g', t: 'Fund Raised' },
      { cls: 'wch wch-k', t: 'Hyderabad' },
    ],
    title: '₹12 Lakhs for Thalassemia Kids — In One Month',
    body: 'Mega Fans HYD crowdfunded ₹12 lakhs covering 6 months of treatment for 18 thalassemia children. Started as a WhatsApp group. Became a movement',
    wavBg: 'var(--gold-lt)',
    wavColor: 'var(--gold)',
    wav: 'MF',
    by: 'Mega Fans HYD · 820 contributors',
    hearts: 2400,
  },
  {
    wt: 'blood',
    imgBg: 'var(--red-pale)',
    emoji: '🩸',
    chips: [
      { cls: 'wch wch-r', t: 'Blood Drive' },
      { cls: 'wch wch-k', t: 'Vijayawada' },
    ],
    title: '500 Units. One Birthday. One City',
    body: "Fans organised a city-wide drive on Chiranjeevi garu's birthday. 500+ units across 3 hospitals in one day",
    wavBg: 'var(--red-pale)',
    wavColor: 'var(--red)',
    wav: 'RK',
    by: 'Raju K.',
    hearts: 1200,
  },
  {
    wt: 'community',
    imgBg: 'var(--green-lt)',
    emoji: '🌱',
    chips: [
      { cls: 'wch wch-gr', t: 'Community' },
      { cls: 'wch wch-k', t: 'Tirupati' },
    ],
    title: '1,000 Trees. 5 Villages. Zero Fuss',
    body: 'Fan club members from Tirupati planted trees across drought-prone Chittoor villages. In memory. In hope',
    wavBg: 'var(--green-lt)',
    wavColor: 'var(--green)',
    wav: 'SV',
    by: 'SVF Club',
    hearts: 876,
  },
  {
    wt: 'blood',
    imgBg: 'var(--blue-lt)',
    emoji: '👁️',
    chips: [
      { cls: 'wch wch-b', t: 'Eye Pledge' },
      { cls: 'wch wch-k', t: 'AP-wide' },
    ],
    title: '200 Eye Pledges in 48 Hours',
    body: 'A WhatsApp campaign went viral. 200 new pledges registered. 48 hours. Pure momentum',
    wavBg: 'var(--blue-lt)',
    wavColor: 'var(--blue)',
    wav: 'PK',
    by: 'Prasad K.',
    hearts: 3100,
  },
  {
    wt: 'fund',
    imgBg: 'var(--green-lt)',
    emoji: '🏥',
    chips: [
      { cls: 'wch wch-gr', t: 'Medical Aid' },
      { cls: 'wch wch-k', t: 'Nellore' },
    ],
    title: 'Surgery Funded in 72 Hours',
    body: 'Fans funded cardiac surgery for a 9-year-old girl after a heartfelt forum post. 72 hours, ₹4.2 lakhs',
    wavBg: 'var(--green-lt)',
    wavColor: 'var(--green)',
    wav: 'NF',
    by: 'Nellore Fans',
    hearts: 5600,
  },
  {
    wt: 'community',
    imgBg: 'var(--red-pale)',
    emoji: '🍱',
    chips: [
      { cls: 'wch wch-r', t: 'Food Drive' },
      { cls: 'wch wch-k', t: 'Guntur' },
    ],
    title: '10,000 Meals. Flood Relief. 8 Days',
    body: 'Community kitchen set up overnight when floods hit Guntur. 10,000 hot meals. No headlines needed',
    wavBg: 'var(--red-pale)',
    wavColor: 'var(--red)',
    wav: 'GF',
    by: 'Guntur Fans',
    hearts: 4200,
  },
]

function WorkCard({
  w,
  worksFilter,
}: {
  w: WorkDef
  worksFilter: 'all' | 'fund' | 'blood' | 'community'
}) {
  const [liked, setLiked] = useState(false)
  const [hearts, setHearts] = useState(w.hearts)
  const visible = worksFilter === 'all' || worksFilter === w.wt

  const toggle = () => {
    setLiked((L) => {
      const next = !L
      setHearts((h) => h + Number(next) - Number(L))
      return next
    })
  }

  return (
    <div
      className={`wc${w.feat ? ' wc-feat' : ''}`}
      data-wt={w.wt}
      style={{ display: visible ? '' : 'none' }}
    >
      <div
        className="wc-img"
        style={{
          background: w.imgBg,
          ...(w.imgFontSize ? { fontSize: w.imgFontSize } : {}),
        }}
      >
        {w.emoji}
      </div>
      <div className="wc-body">
        <div className="wchips">
          {w.chips.map((c) => (
            <span key={c.t} className={c.cls}>
              {c.t}
            </span>
          ))}
        </div>
        <div className="wc-title">{w.title}</div>
        <p>{w.body}</p>
        <div className="wc-foot">
          <div className="wby">
            <div className="wav" style={{ background: w.wavBg, color: w.wavColor }}>
              {w.wav}
            </div>
            {w.by}
          </div>
          <button type="button" className={`whrt${liked ? ' on' : ''}`} onClick={toggle}>
            <span className="whi">❤️</span> <span>{formatHeartCount(hearts)}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  useCustomCursor()
  const eventsRef = useRef<HTMLElement>(null)
  const campaignsRef = useRef<HTMLElement>(null)
  const worksRef = useRef<HTMLElement>(null)
  const urgRef = useRef<HTMLElement>(null)

  const [, setNavShadow] = useState(false)
  const [dockShow, setDockShow] = useState(false)
  const [dockDismissed, setDockDismissed] = useState(false)
  const [eventFilter, setEventFilter] = useState<EventFilter>('all')
  const [worksFilter, setWorksFilter] = useState<'all' | 'fund' | 'blood' | 'community'>('all')
  const [fedQuery, setFedQuery] = useState('')
  const [fedEmoji, setFedEmoji] = useState<FedEmojiFilter>('all')
  const [fedShow, setFedShow] = useState(12)
  const [urgBars, setUrgBars] = useState(false)
  const [dpAmt, setDpAmt] = useState('100')
  const [amtSel, setAmtSel] = useState<string>('100')

  const fedFiltered = (() => {
    let rows = [...FAN_EVENTS]
    if (fedEmoji !== 'all') rows = rows.filter((e) => e.t === fedEmoji)
    if (fedQuery.trim()) {
      const q = fedQuery.toLowerCase()
      rows = rows.filter(
        (e) =>
          e.n.toLowerCase().includes(q) ||
          e.c.toLowerCase().includes(q) ||
          e.o.toLowerCase().includes(q) ||
          e.l.toLowerCase().includes(q),
      )
    }
    return rows
  })()

  const fedRows = fedFiltered.slice(0, fedShow)

  const scrollTo = useCallback((el: HTMLElement | null) => {
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setNavShadow(y > 10)
      setDockShow(y > window.innerHeight * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const root = urgRef.current
    if (!root) return
    const ro = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setUrgBars(true), 200)
          ro.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    ro.observe(root)
    return () => ro.disconnect()
  }, [])

  const pickAmt = (val: string) => {
    setAmtSel(val)
    if (val !== 'other') setDpAmt(val)
  }

  const setFedFilter = (emoji: FedEmojiFilter) => {
    setFedEmoji(emoji)
    setFedQuery('')
    setFedShow(12)
  }

  const onFedSearch = (q: string) => {
    setFedQuery(q)
    setFedEmoji('all')
    setFedShow(12)
  }

  return (
    <>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {TICKER_ITEMS.map((t) => (
            <span key={t} className="ti">
              {t}
            </span>
          ))}
          {TICKER_ITEMS.map((t) => (
            <span key={`${t}-dup`} className="ti">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="hero">
        <div className="hero-red">
          <div className="hero-kicker">
            <span className="hero-kicker-name">Chiranjeevi Charitable Trust</span>
            <span className="hero-kicker-est">Est. 1997</span>
          </div>
          <div className="hbig">
            DROP
            <br />
            GIVE
            <br />
            <span className="scr">Live</span>
          </div>
          <div className="hero-red-foot">
            <div className="hrstats">
              <div className="hrst">
                <div className="n">12L+</div>
                <div className="l">Units</div>
              </div>
              <div className="hrst">
                <div className="n">4.7K</div>
                <div className="l">Lives</div>
              </div>
              <div className="hrst">
                <div className="n">28K</div>
                <div className="l">Donors</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-cream">
          <div className="hc-chip">Megastar · Fan Community · Impact Platform</div>
          <div className="hc-mid">
            <div className="hc-sub">
              Millions of fans
              <br />
              <strong>One mission</strong>
              <br />
              Infinite lives changed
            </div>
            <p className="hc-desc">
              You don&apos;t need a cape to be a hero. One pint of blood. One rupee. One story shared. The Chiranjeevi
              Charitable Trust turns love into action — across blood donation, community giving, and a legacy of care
            </p>
            <div className="hc-btns">
              <a href="#/donate" className="btn-ink" style={{ textDecoration: 'none' }}>
                Support a Cause
              </a>
              <button type="button" className="btn-brd" onClick={() => scrollTo(worksRef.current)}>
                See Stories
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="stories-section">
        <div className="stories-row" id="storiesRow">
          {STORIES.map((s) => (
            <div key={s.label} className="story-item">
              <div className={`story-ring${s.seen ? ' seen' : ''}`}>
                <div className="story-inner">{s.emoji}</div>
              </div>
              <div className="story-label">{s.label}</div>
              {s.live ? <div className="story-live-badge">LIVE</div> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="bento">
        <Reveal delayClass="d1">
          <div className="bt bt-hero">
            <div className="bt-accent" />
            <span className="bt-icon">🩸</span>
            <AnimatedCounter
              target={1200000}
              className="bt-num"
              style={{ background: 'none', WebkitTextFillColor: '#fff' }}
            />
            <div className="bt-lbl" style={{ color: 'rgba(255,255,255,.55)' }}>Blood Units Collected</div>
          </div>
        </Reveal>
        <Reveal delayClass="d2">
          <div className="bt">
            <span className="bt-icon">❤️</span>
            <AnimatedCounter target={4700} className="bt-num" />
            <div className="bt-lbl">Lives Saved</div>
          </div>
        </Reveal>
        <Reveal delayClass="d3">
          <div className="bt">
            <span className="bt-icon">👥</span>
            <AnimatedCounter target={28000} className="bt-num" />
            <div className="bt-lbl">Active Donors</div>
          </div>
        </Reveal>
        <Reveal delayClass="d4">
          <div className="bt">
            <span className="bt-icon">🏥</span>
            <AnimatedCounter target={86} className="bt-num" />
            <div className="bt-lbl">Partner Hospitals</div>
          </div>
        </Reveal>
        <Reveal delayClass="d1">
          <div className="bt">
            <span className="bt-icon">🏅</span>
            <AnimatedCounter target={320} className="bt-num" />
            <div className="bt-lbl">Campaigns Funded</div>
          </div>
        </Reveal>
        <Reveal delayClass="d2">
          <div className="bt">
            <span className="bt-icon">🌍</span>
            <AnimatedCounter target={14} className="bt-num" />
            <div className="bt-lbl">Districts Covered</div>
          </div>
        </Reveal>
        <Reveal delayClass="d3">
          <div className="bt">
            <span className="bt-icon">🎓</span>
            <AnimatedCounter target={450} className="bt-num" />
            <div className="bt-lbl">Campus Drives</div>
          </div>
        </Reveal>
        <Reveal delayClass="d4">
          <div className="bt">
            <span className="bt-icon">💰</span>
            <div className="bt-num">₹2.4Cr</div>
            <div className="bt-lbl">Funds Raised</div>
          </div>
        </Reveal>
      </div>

      <section className="urgency-section rev up" id="urgency" ref={urgRef}>
        <div className="s-hrow">
          <div>
            <div className="s-ey">Blood Bank · Live Status</div>
            <h2 className="s-h">
              Right Now, <span className="sr">We Need…</span>
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'var(--muted)',
                marginTop: 10,
                maxWidth: 500,
                lineHeight: 1.75,
              }}
            >
              Live blood inventory status across CCT partner hospitals. If your type is critical — this is the moment to
              step up
            </p>
          </div>
          <a href="#/register" className="btn-ink" style={{ flexShrink: 0, textDecoration: 'none' }}>
            Register as Donor &rarr;
          </a>
        </div>
        <div className="urgency-grid" id="urgGrid">
          {BLOOD_URGENCY.map((b) => (
            <div key={b.type} className={`ub status-${b.status} rev up`}>
              <div className="ub-corner" />
              <div className="ub-type">{b.type}</div>
              <div className="ub-bar-bg">
                <div className="ub-bar-fill" style={{ width: urgBars ? `${b.pct}%` : '0%' }} data-pct={b.pct} />
              </div>
              <div className="ub-status">{b.label}</div>
              <div className="ub-units">{b.units}</div>
            </div>
          ))}
        </div>
        <div className="urgency-cta-row">
          <div className="urgency-note">Updated every 6 hours from CCT partner hospitals across AP &amp; Telangana</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--red)',
                  display: 'inline-block',
                }}
              />{' '}
              Critical
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--orange)',
                  display: 'inline-block',
                }}
              />{' '}
              Low
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--green)',
                  display: 'inline-block',
                }}
              />{' '}
              Sufficient
            </span>
          </div>
        </div>
      </section>

      <section className="events-section" id="events" ref={eventsRef}>
        <Reveal>
          <div className="s-hrow">
            <div>
              <div className="s-ey">What&apos;s Happening</div>
              <h2 className="s-h">
                Events &amp; <span className="sr">Blood Drives</span>
              </h2>
            </div>
            <div className="frow">
              {(
                [
                  ['all', 'All'],
                  ['blood', '🩸 Blood'],
                  ['fund', '💛 Fundraisers'],
                  ['awareness', '📢 Awareness'],
                  ['community', '🌱 Community'],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  className={`fb${eventFilter === k ? ' on' : ''}`}
                  onClick={() => setEventFilter(k)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="evscroll" id="evScroll">
            {[
              {
                et: 'blood' as const,
                bg: 'var(--red)',
                emoji: '🩸',
                dd: '20',
                badge: 'Mega Event',
                type: '🩸 Flagship Blood Drive',
                title: "Megastar's Birthday Grand Drive 2026",
                desc: '5 simultaneous donation centres across Hyderabad. Last year: 1,400 units. Bring your crew, your office, your family',
                loc: '5 Venues · Hyderabad',
                spots: '⚡ 142 slots remaining',
                btn: 'Register Free',
              },
              {
                et: 'blood' as const,
                bg: 'linear-gradient(135deg,#1A0610,#080204)',
                emoji: '🏥',
                dd: '22',
                badge: 'Vijayawada',
                type: '🩸 City Blood Drive',
                title: 'Vijayawada Fan Club Grand Camp',
                desc: "Krishna district fan network's biggest annual camp. Target: 600 units across 3 hospitals in a single day",
                loc: 'Vijayawada, AP',
                spots: '⚡ 210 slots open',
                btn: 'Register',
              },
              {
                et: 'fund' as const,
                bg: 'linear-gradient(135deg,#5C3A00,#2A1505)',
                emoji: '🎭',
                dd: '28',
                badge: 'Fundraiser',
                type: '💛 Charity Gala',
                title: 'Film Screening & Fundraiser Gala',
                desc: 'Exclusive one-night event. Special screening + live auction. All proceeds go to the Platelet Separator campaign',
                loc: 'Prasads IMAX, HYD',
                spots: null,
                btn: 'Get Tickets',
              },
              {
                et: 'awareness' as const,
                bg: 'linear-gradient(135deg,#001428,#00080F)',
                emoji: '👁️',
                dd: '4',
                dm: 'May',
                badge: 'Awareness',
                type: '📢 Eye Pledge Drive',
                title: 'Walk for Sight — Eye Donation Drive',
                desc: '2km awareness walk through Jubilee Hills. Pledge your eyes on the spot. Bring your family',
                loc: 'Jubilee Hills, HYD',
                spots: null,
                btn: 'Join Walk',
              },
              {
                et: 'blood' as const,
                bg: 'linear-gradient(135deg,#160020,#090010)',
                emoji: '🎓',
                dd: '7',
                dm: 'Jun',
                badge: 'Youth Drive',
                type: '🩸 Campus Circuit',
                title: '20 Campuses · One Week',
                desc: 'CCT teams hitting 20 engineering and medical colleges across Hyderabad. First-time donors especially welcome',
                loc: '20 Campuses · HYD',
                spots: '⚡ Open registrations',
                btn: 'Register Campus',
              },
              {
                et: 'fund' as const,
                bg: 'linear-gradient(135deg,#0A1428,#050A18)',
                emoji: '🌍',
                dd: '1',
                dm: 'Jun',
                badge: 'NRI',
                type: '💛 NRI Fundraiser',
                title: 'Telugu Diaspora Giving Night — USA',
                desc: 'Virtual fundraiser for Telugu fans across the US. All proceeds fund the Thalassemia Treatment Campaign',
                loc: 'Virtual · US Timezones',
                spots: null,
                btn: 'Join Online',
              },
              {
                et: 'community' as const,
                bg: 'linear-gradient(135deg,#012A10,#001508)',
                emoji: '🌱',
                dd: '18',
                dm: 'May',
                badge: 'Community',
                type: '🌱 Fan Tree Drive',
                title: 'Green Hyderabad — 5,000 Trees',
                desc: '500 fans. 5,000 saplings. Multiple wards. CCT fan clubs greening Hyderabad one neighbourhood at a time',
                loc: 'Multiple Wards, HYD',
                spots: null,
                btn: 'Volunteer',
              },
              {
                et: 'blood' as const,
                bg: 'linear-gradient(135deg,#1A1000,#0A0800)',
                emoji: '🏃',
                dd: '15',
                dm: 'Jun',
                badge: 'Tirupati',
                type: '📢 Awareness Run',
                title: '5K Run for Blood Awareness',
                desc: 'Annual charity run. Open to all ages. T-shirt + certificate for all finishers. Bring the family',
                loc: 'Tirupati, AP',
                spots: null,
                btn: 'Register ₹99',
              },
              {
                et: 'fund' as const,
                bg: 'linear-gradient(135deg,#140A1A,#0A0510)',
                emoji: '🎬',
                dd: '29',
                dm: 'Jun',
                badge: 'Chennai',
                type: '💛 Charity Auction',
                title: 'Chennai Mega Fans — Memorabilia Auction',
                desc: 'Rare Chiranjeevi memorabilia auction by Chennai fans. All proceeds go to the Mobile Blood Bank fund',
                loc: 'Chennai, TN',
                spots: null,
                btn: 'Bid Online',
              },
            ].map((ev) => (
              <div
                key={ev.title}
                className="evc"
                data-et={ev.et}
                style={{ display: eventFilter === 'all' || eventFilter === ev.et ? '' : 'none' }}
              >
                <div className="evc-img" style={{ background: ev.bg }}>
                  <div className="evc-bg-emoji">{ev.emoji}</div>
                  <div className="evc-db">
                    <div className="dd">{ev.dd}</div>
                    <div className="dm">{ev.dm ?? 'Apr'}</div>
                  </div>
                  <div className="evc-badge">{ev.badge}</div>
                </div>
                <div className="evc-body">
                  <div className="evc-type">{ev.type}</div>
                  <div className="evc-title">{ev.title}</div>
                  <p className="evc-desc">{ev.desc}</p>
                  <div className="evc-foot">
                    <div>
                      <div className="evc-loc">{ev.loc}</div>
                      {ev.spots ? <div className="evc-spots">{ev.spots}</div> : null}
                    </div>
                    <button type="button" className="evc-rsvp">
                      {ev.btn}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="past-events rev up" style={{ padding: 0, marginTop: 40 }}>
          <div className="past-label-row">
            <div className="past-label">Already happened — in his name</div>
            <div className="past-line" />
            <div className="past-label" style={{ whiteSpace: 'nowrap' }}>
              Scroll for more →
            </div>
          </div>
          <div className="past-scroll" id="pastScroll">
            {PAST_EVENTS.map((p) => (
              <div key={p.d + p.t} className="past-pill">
                <div className="past-pill-date">{p.d}</div>
                <div className="past-pill-text">{p.t}</div>
                <div className="past-pill-count">{p.n}</div>
              </div>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="fed-wrap">
            <div className="fed-title-row">
              <div>
                <div className="s-ey" style={{ marginBottom: 6 }}>
                  Across the Country
                </div>
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    fontSize: 'clamp(18px,2.2vw,26px)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Fan Events{' '}
                  <span
                    style={{
                      fontFamily: "'Instrument Serif',serif",
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: 'var(--muted)',
                    }}
                  >
                    in his name
                  </span>
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 5 }}>
                  Hundreds of fan clubs. Every event listed. Search by city or type
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="fed-search-wrap">
                  <input
                    className="fed-search"
                    id="fedQ"
                    type="text"
                    placeholder="Search city or type…"
                    value={fedQuery}
                    onChange={(e) => onFedSearch(e.target.value)}
                  />
                </div>
                {(['all', '🩸', '💛', '🌱', '📢'] as const).map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`fb${fedEmoji === emoji ? ' on' : ''}`}
                    onClick={() => setFedFilter(emoji)}
                  >
                    {emoji === 'all' ? 'All' : emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="fed-table" id="fedTable">
              <div className="fed-hdr">
                <div>Date</div>
                <div>Event</div>
                <div>City</div>
                <div>Type</div>
                <div>Status</div>
                <div>Action</div>
              </div>
              {fedRows.map((e) => (
                <div key={`${e.d}-${e.m}-${e.n}`} className="fed-row">
                  <div>
                    <div className="fdb">
                      <div className="fd">{e.d}</div>
                      <div className="fm">{e.m}</div>
                    </div>
                  </div>
                  <div>
                    <div className="fen">
                      {e.n}
                      <div className="feo">{e.o}</div>
                    </div>
                  </div>
                  <div className="fcity">📍 {e.c}</div>
                  <div>
                    <span className={`fchip ${e.ch}`}>
                      {e.t} {e.l}
                    </span>
                  </div>
                  <div className={`fst ${e.s === 'open' ? 'fst-open' : e.s === 'few' ? 'fst-few' : 'fst-full'}`}>{e.sl}</div>
                  <div className="fact">
                    <a href="#/events">Details →</a>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 16,
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              {fedFiltered.length > fedShow ? (
                <button type="button" className="fed-more-btn" id="fedMore" onClick={() => setFedShow((n) => Math.min(n + 12, fedFiltered.length))}>
                  Show More ↓
                </button>
              ) : (
                <span />
              )}
              <div
                style={{
                  background: 'var(--bg2)',
                  borderRadius: 14,
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                  🗓️ <strong style={{ color: 'var(--ink)' }}>Organising an event in his name?</strong> Add it — no approval needed
                </span>
                <button
                  type="button"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '9px 18px',
                    borderRadius: 18,
                    background: 'var(--ink)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    transition: 'all .2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Add Your Event →
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="megastar" id="about">
        <Reveal className="mega-l">
            <div className="mega-bg">MEGA</div>
            <div className="mega-ey">The Man Behind the Mission</div>
            <h2 className="mega-h">
              More than a
              <br />
              <span className="mg">Megastar</span>
            </h2>
            <p className="mega-desc">
              For over two decades, Chiranjeevi has channelled the love of millions into one of India&apos;s most impactful
              charitable movements — blood banks, eye donation, community health, and a digital platform that extends his
              legacy to every fan
            </p>
            <div className="mega-quote">
              &quot;The true measure of a hero is not on screen — it is in the lives they touch off it&quot;
            </div>
            <div className="mega-stats">
              <div className="mst">
                <div className="n">27+</div>
                <div className="l">Years of Service</div>
              </div>
              <div className="mst-divider" />
              <div className="mst">
                <div className="n">12L+</div>
                <div className="l">Blood Units</div>
              </div>
              <div className="mst-divider" />
              <div className="mst">
                <div className="n">4.7K+</div>
                <div className="l">Lives Saved</div>
              </div>
            </div>
        </Reveal>
        <div className="mega-r">
          <div className="mega-r-inner">
            <div className="mega-ring mega-ring-1" />
            <div className="mega-ring mega-ring-2" />
            <div className="mega-ring mega-ring-3" />
            <div className="mega-img-wrap">
              <img src="/chiranjeevi-portrait.png" alt="Megastar Chiranjeevi" className="mega-portrait" />
            </div>
            <div className="mega-name-tag">Megastar Chiranjeevi</div>
          </div>
        </div>
      </div>

      <section className="works-section" id="works" ref={worksRef}>
        <Reveal>
          <div className="s-hrow">
            <div>
              <div className="s-ey">Fan Community</div>
              <h2 className="s-h">
                Good Work Done
                <br />
                <span className="sr">in His Name</span>
              </h2>
            </div>
            <div className="frow">
              {(['all', 'blood', 'fund', 'community'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`fb${worksFilter === k ? ' on' : ''}`}
                  onClick={() => setWorksFilter(k)}
                >
                  {k === 'all' ? 'All' : k === 'blood' ? '🩸 Blood' : k === 'fund' ? '💛 Fund' : '🌱 Community'}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="wmason" id="wGrid">
            {WORKS.map((w) => (
              <WorkCard key={w.title} w={w} worksFilter={worksFilter} />
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="share-bar">
            <div>
              <h4>Did something good in his name?</h4>
              <p>Tag it here. No account. No signup. Just your story</p>
              <div className="no-trk">No tracking · No binding · No account needed</div>
            </div>
            <div className="sbtns">
              <a href="#/good-works" className="sbtn sbtn-w" style={{ textDecoration: 'none' }}>
                Share Your Story →
              </a>
              <a href="#/good-works" className="sbtn sbtn-gh" style={{ textDecoration: 'none' }}>
                Browse All Stories
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="donor-wall" id="dwall">
        <div className="dw-header">
          <div>
            <div className="s-ey">Recent Donations</div>
            <h2 className="s-h">
              The <span className="sr">Donor Wall</span>
            </h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>Every donor recognised. Every drop counted</p>
          </div>
          <a href="#/register" className="btn-ink" style={{ flexShrink: 0, textDecoration: 'none' }}>
            Register as Donor &rarr;
          </a>
        </div>
        <div className="dw-marquee-wrap" id="dwWrap">
          <div className="dw-marquee">
            {[...DONORS.slice(0, 8), ...DONORS.slice(0, 8)].map((d, i) => (
              <div key={`${d.n}-${i}`} className="dw-card">
                <div className="dw-av" style={{ background: d.col, color: d.tc }}>
                  {d.av}
                </div>
                <div className="dw-name">{d.n}</div>
                <div className="dw-type">{d.t}</div>
                <div className="dw-city">{d.c}</div>
                <div className="dw-time">{d.ago}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 10 }} />
          <div className="dw-marquee rev">
            {[...DONORS.slice(8), ...DONORS.slice(8)].map((d, i) => (
              <div key={`${d.n}-r-${i}`} className="dw-card">
                <div className="dw-av" style={{ background: d.col, color: d.tc }}>
                  {d.av}
                </div>
                <div className="dw-name">{d.n}</div>
                <div className="dw-type">{d.t}</div>
                <div className="dw-city">{d.c}</div>
                <div className="dw-time">{d.ago}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="campaigns-section" id="campaigns" ref={campaignsRef}>
        <Reveal>
          <div className="s-hrow">
            <div>
              <div className="s-ey">Fund a Cause</div>
              <h2 className="s-h">
                Every Rupee
                <br />
                <span className="sr">Changes a Life</span>
              </h2>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="camp-grid">
            <div className="cc">
              <div className="cu cu-star">★ Featured</div>
              <div className="cc-title">Thalassemia Children&apos;s Fund</div>
              <p className="cc-desc">Monthly transfusions for 24 children. Every ₹500 = one session for one child</p>
              <div className="cc-pm">
                <span className="r">₹8,40,000 raised</span>
                <span className="g">Goal ₹12,00,000</span>
              </div>
              <div className="cc-bar">
                <div className="cc-fill" style={{ width: '70%' }} />
              </div>
              <div className="cc-foot">
                <div className="cc-donors">
                  🤝 <strong>1,240</strong> donors
                </div>
                <a href="#/donate" className="cc-cta" style={{ textDecoration: 'none' }}>
                  Donate ₹500+
                </a>
              </div>
            </div>
            <div className="cc">
              <div className="cu cu-hot">⚡ Urgent</div>
              <div className="cc-title">Platelet Separator — Guntur</div>
              <p className="cc-desc">Cancer patients need platelet transfusions. A new separator costs ₹18 lakhs</p>
              <div className="cc-pm">
                <span className="r">₹5,40,000 raised</span>
                <span className="g">Goal ₹18,00,000</span>
              </div>
              <div className="cc-bar">
                <div className="cc-fill" style={{ width: '30%' }} />
              </div>
              <div className="cc-foot">
                <div className="cc-donors">
                  🤝 <strong>418</strong> donors
                </div>
                <a href="#/donate" className="cc-cta" style={{ textDecoration: 'none' }}>
                  Donate Now
                </a>
              </div>
            </div>
            <div className="cc">
              <div className="cu cu-go">✓ Active</div>
              <div className="cc-title">Mobile Blood Bank — Rural AP</div>
              <p className="cc-desc">A mobile van bringing camps to villages in Krishna and Guntur districts monthly</p>
              <div className="cc-pm">
                <span className="r">₹11,20,000 raised</span>
                <span className="g">Goal ₹14,00,000</span>
              </div>
              <div className="cc-bar">
                <div className="cc-fill" style={{ width: '80%' }} />
              </div>
              <div className="cc-foot">
                <div className="cc-donors">
                  🤝 <strong>2,108</strong> donors
                </div>
                <a href="#/donate" className="cc-cta" style={{ textDecoration: 'none' }}>
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="dp">
            <div className="dp-l">
              <div className="s-ey" style={{ marginBottom: 12 }}>
                General Fund
              </div>
              <h3>
                Let CCT put your
                <br />
                money where it
                <br />
                <em>matters most</em>
              </h3>
              <p>Every rupee directed to blood drives, patient support, and community health. 80G cert issued automatically</p>
              <div className="dpc-list">
                <div className="dpc">
                  <div className="dpc-i">
                    <div className="dpc-n">Thalassemia Fund</div>
                    <div className="dpc-bg">
                      <div className="dpc-f" style={{ width: '70%' }} />
                    </div>
                  </div>
                  <div className="dpc-pct">70%</div>
                </div>
                <div className="dpc">
                  <div className="dpc-i">
                    <div className="dpc-n">Platelet Separator — Guntur</div>
                    <div className="dpc-bg">
                      <div className="dpc-f" style={{ width: '30%' }} />
                    </div>
                  </div>
                  <div className="dpc-pct">30%</div>
                </div>
                <div className="dpc">
                  <div className="dpc-i">
                    <div className="dpc-n">Mobile Blood Bank — Rural AP</div>
                    <div className="dpc-bg">
                      <div className="dpc-f" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div className="dpc-pct">80%</div>
                </div>
              </div>
            </div>
            <div className="dp-r">
              <h4>Make a Donation</h4>
              <div className="dsub">Choose or enter your amount</div>
              <div className="amts">
                {(['100', '500', '1000', '2500', '5000', 'other'] as const).map((v) => (
                  <button key={v} type="button" className={`abt${amtSel === v ? ' sel' : ''}`} onClick={() => pickAmt(v)}>
                    {v === '100' ? '₹100' : v === '500' ? '₹500' : v === '1000' ? '₹1K' : v === '2500' ? '₹2.5K' : v === '5000' ? '₹5K' : 'Custom'}
                  </button>
                ))}
              </div>
              <div className="inp-w">
                <span>₹</span>
                <input
                  type="number"
                  id="dpAmt"
                  value={dpAmt}
                  placeholder="100"
                  onChange={(e) => setDpAmt(e.target.value)}
                />
              </div>
              <a href="#/donate" className="dp-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                Donate Securely →
              </a>
              <div className="trust-r">
                <span className="trb">🔒 SSL Secured</span>
                <span className="trb">📄 80G Cert</span>
                <span className="trb">🔓 No Account</span>
                <span className="trb">💳 UPI / Card</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {!dockDismissed ? (
        <div className={`fdock${dockShow ? ' show' : ''}`} id="fdock">
          <a href="#/register" className="fdock-btn fdock-blood" style={{ textDecoration: 'none' }}>
            Donate Blood
          </a>
          <div className="fdock-div" />
          <a href="#/donate" className="fdock-btn fdock-money" style={{ textDecoration: 'none' }}>
            💛 Contribute
          </a>
          <div className="fdock-div" />
          <button type="button" className="fdock-close" onClick={() => setDockDismissed(true)}>
            ✕
          </button>
        </div>
      ) : null}
    </>
  )
}
