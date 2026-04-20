import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatedCounter } from './components/AnimatedCounter'
import { Reveal } from './components/Reveal'
import {
  BLOOD_TYPES,
  DONORS,
  FAN_EVENTS,
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
    title: '500 Units · One Birthday · One City',
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
    title: '1,000 Trees · 5 Villages · Zero Fuss',
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
    title: '10,000 Meals · Flood Relief · 8 Days',
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

  const [, setNavShadow] = useState(false)
  const [dockShow, setDockShow] = useState(false)
  const [dockDismissed, setDockDismissed] = useState(false)
  const [worksFilter, setWorksFilter] = useState<'all' | 'fund' | 'blood' | 'community'>('all')
  const [fedQuery, setFedQuery] = useState('')
  const [fedEmoji, setFedEmoji] = useState<FedEmojiFilter>('all')
  const [fedShow, setFedShow] = useState(12)

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
          <div className="hero-brand">
            <span className="hero-est-badge">EST. 1997</span>
            <div className="hero-wordmark">
              <h1 className="hero-name">Chiranjeevi</h1>
              <div className="hero-sub">Charitable Trust · CCT</div>
            </div>
            <div className="hero-divider" />
          </div>
          <div className="hero-tagline">
            <div className="htline"><span className="hv">Fund</span> <span className="hc">a cause</span></div>
            <div className="htline"><span className="hv">Drop</span> <span className="hc">a pint</span></div>
            <div className="htline"><span className="hv">Save</span> <span className="hc">a life</span></div>
          </div>
          <div className="hero-stats">
            <div className="hs-item">
              <div className="hs-n">12+</div>
              <div className="hs-l">Units</div>
            </div>
            <div className="hs-item">
              <div className="hs-n">4.7K</div>
              <div className="hs-l">Lives</div>
            </div>
            <div className="hs-item">
              <div className="hs-n">28K</div>
              <div className="hs-l">Donors</div>
            </div>
          </div>
          <div className="hero-foot" />
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
          <div className="bt">
            <span className="bt-icon">🩸</span>
            <AnimatedCounter target={1200000} className="bt-num" />
            <div className="bt-lbl">Blood Units Collected</div>
          </div>
        </Reveal>
        <Reveal delayClass="d2">
          <div className="bt">
            <span className="bt-icon">❤️</span>
            <AnimatedCounter target={4700} className="bt-num" />
            <div className="bt-lbl">Lives Impacted</div>
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

      <section className="urgency-section rev up" id="urgency">
        <div className="s-hrow">
          <div>
            <div className="s-ey">Blood Donation</div>
            <h2 className="s-h">
              Every Type <span className="sr">Every Drop</span>
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
              Blood comes in eight types, and every one of them saves lives. CCT collects across all groups at partner
              hospitals in AP &amp; Telangana — your donation matters, no matter your type
            </p>
          </div>
          <a href="#/register" className="btn-ink" style={{ flexShrink: 0, textDecoration: 'none' }}>
            Register as Donor &rarr;
          </a>
        </div>
        <div className="urgency-grid" id="urgGrid">
          {BLOOD_TYPES.map((b) => (
            <div key={b.type} className="ub rev up">
              <span className="ub-deco" aria-hidden="true" />
              <div className="ub-type">{b.type}</div>
              <div className="ub-note">{b.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="events-section" id="events" ref={eventsRef}>
        <div className="past-events rev up">
          <Reveal>
            <div className="s-hrow">
              <div>
                <div className="s-ey">In His Name</div>
                <h2 className="s-h">
                  Already <span className="sr">Happened</span>
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="past-scroll" id="pastScroll">
            <div className="past-track" aria-hidden="false">
              {PAST_EVENTS.map((p) => (
                <div key={`a-${p.d}-${p.t}`} className="past-pill">
                  <div className="past-pill-date">{p.d}</div>
                  <div className="past-pill-text">{p.t}</div>
                  <div className="past-pill-count">{p.n}</div>
                </div>
              ))}
              {PAST_EVENTS.map((p) => (
                <div key={`b-${p.d}-${p.t}`} className="past-pill" aria-hidden="true">
                  <div className="past-pill-date">{p.d}</div>
                  <div className="past-pill-text">{p.t}</div>
                  <div className="past-pill-count">{p.n}</div>
                </div>
              ))}
            </div>
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
                  Fan Campaigns{' '}
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
                  Hundreds of fan clubs · Every campaign listed · Search by city or type
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
                <div>Campaign</div>
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
                    <a href="#/campaigns">Details →</a>
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
                  🤝 <strong style={{ color: 'var(--ink)' }}>Planning a drive or fundraiser in his name?</strong> We&apos;d love to partner with you
                </span>
                <a
                  href="#/contact"
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
                    textDecoration: 'none',
                  }}
                >
                  Get in Touch →
                </a>
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
                <div className="l">Lives Impacted</div>
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
                Impact Stories
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
            {WORKS.slice(0, 3).map((w) => (
              <WorkCard key={w.title} w={w} worksFilter={worksFilter} />
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="share-bar">
            <div>
              <h4>Led an initiative in his name?</h4>
              <p>Share your story and help inspire the next community effort</p>
              <div className="no-trk">Every story reviewed · Published with credit to your fan club</div>
            </div>
            <div className="sbtns">
              <a
                href="#/good-works"
                className="sbtn sbtn-w"
                style={{ textDecoration: 'none' }}
                onClick={() => sessionStorage.setItem('cct:open-share', '1')}
              >
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
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>Every donor recognised · Every drop counted</p>
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
              <div className="cu cu-star">★ Priority Cause</div>
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
                  Donate Now
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
