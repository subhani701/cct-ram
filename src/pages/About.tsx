import { useMemo } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { AnimatedCounter } from '../components/AnimatedCounter'

interface Trustee {
  name: string
  designation: string
  bio: string
  /** Professional headshot (square crop, displayed in a circle). */
  photoSrc: string
}

const TIMELINE = [
  { year: '1998', text: 'CCT Founded by Megastar Chiranjeevi' },
  { year: '2005', text: '1,00,000 blood units milestone' },
  { year: '2012', text: 'First mega blood drive — 5,000 donors in one day' },
  { year: '2018', text: 'Partnership with 50+ hospitals across AP & TS' },
  { year: '2024', text: 'Digital platform launch' },
  { year: '2026', text: '12 lakh units and counting' },
]

const TRUSTEES: Trustee[] = [
  {
    name: 'Konidela Chiranjeevi',
    designation: 'Founder',
    bio: 'Megastar and visionary philanthropist who founded CCT to save lives through blood donation',
    photoSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&w=240&h=240&fit=crop&q=80',
  },
  {
    name: 'Dr Priya Ranjan',
    designation: 'Medical Director',
    bio: 'Leading hematologist with 20+ years in transfusion medicine and blood banking',
    photoSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&w=240&h=240&fit=crop&q=80',
  },
  {
    name: 'Srinivas Reddy K',
    designation: 'COO',
    bio: 'Operations expert driving CCT logistics and donor coordination across two states',
    photoSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&w=240&h=240&fit=crop&q=80',
  },
  {
    name: 'Lakshmi Narasimha Rao',
    designation: 'Treasurer',
    bio: 'Chartered accountant ensuring transparent financial stewardship of all donations',
    photoSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=240&h=240&fit=crop&q=80',
  },
  {
    name: 'Dr Anjali Mehta',
    designation: 'Partnerships',
    bio: 'Building bridges between CCT and hospitals, corporates and government bodies',
    photoSrc: '/trustees/anjali-mehta.jpg',
  },
  {
    name: 'Venkat Subramaniam',
    designation: 'Technology',
    bio: 'Architect of CCT digital platform modernising donor registration and tracking',
    photoSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=240&h=240&fit=crop&q=80',
  },
]

const HOSPITALS = [
  { name: 'NIMS', href: 'https://nims.edu.in/NIMSWP/' },
  { name: 'Gandhi', href: 'https://www.gandhihospital.telangana.gov.in/index.htm' },
  { name: 'NTR Blood Bank', href: 'https://ntrtrust.org/blood-centers/' },
  { name: 'SVR Ruia', href: 'https://tirupati.ap.gov.in/public-utility/sri-venkateswara-ramnarayan-ruia-government-general-hospital-ruia-hospital/' },
  { name: 'KGH Vizag', href: 'https://en.wikipedia.org/wiki/King_George_Hospital,_Visakhapatnam' },
  { name: 'Guntur Govt', href: 'https://guntur.ap.gov.in/public-utility-category/hospitals/' },
  { name: 'KIMS Hyderabad', href: 'https://www.kimshospitals.com/' },
  { name: 'Apollo Blood Bank', href: 'https://bloodlinks.in/details_bank?id=744' },
]

const STATS = [
  { target: 1200000, label: 'Blood Units Collected', icon: '🩸', suffix: '' },
  { target: 4700, label: 'Lives Impacted', icon: '♡', suffix: '+' },
  { target: 28000, label: 'Active Donors', icon: '⚕', suffix: '+' },
  { target: 23000000, label: 'Funds Raised', icon: '₹', suffix: '' },
]

const easeSoft = [0.22, 1, 0.36, 1] as const

const formatIndian = (num: number) => {
  const sign = num < 0 ? '-' : ''
  const n = Math.abs(Math.round(num))
  const s = String(n)
  if (s.length <= 3) return `${sign}${s}`
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return `${sign}${rest},${last3}`
}

export default function About() {
  const reduceMotion = useReducedMotion()

  const heroVariants = useMemo(() => {
    if (reduceMotion) {
      return {
        item: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } } satisfies Variants,
        portrait: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } } satisfies Variants,
        leftStagger: {
          hidden: {},
          show: { transition: { staggerChildren: 0.04 } },
        } satisfies Variants,
      }
    }
    return {
      item: {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeSoft } },
      } satisfies Variants,
      portrait: {
        hidden: { opacity: 0, scale: 0.94 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.65, ease: easeSoft, delay: 0.2 },
        },
      } satisfies Variants,
      leftStagger: {
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
      } satisfies Variants,
    }
  }, [reduceMotion])

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSoft } } }

  const statContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0.05 : 0.09, delayChildren: reduceMotion ? 0 : 0.08 } },
  }

  const statItem: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: easeSoft } } }

  const tlContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0.06 : 0.11, delayChildren: reduceMotion ? 0 : 0.12 } },
  }

  const tlLine: Variants = reduceMotion
    ? { hidden: { scaleX: 1 }, show: { scaleX: 1 } }
    : {
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.9, ease: easeSoft } },
      }

  const tlItem: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeSoft } },
      }

  return (
    <div className="abt-page" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* HERO */}
      <motion.section
        className="abt-hero"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: easeSoft }}
      >
        <div className="abt-hero-stack">
          <div className="abt-hero-grid">
            <motion.div
              className="abt-hero-left"
              variants={heroVariants.leftStagger}
              initial="hidden"
              animate="show"
            >
              <motion.span className="abt-hero-eyebrow" variants={heroVariants.item}>
                About CCT
              </motion.span>
              <motion.h1 className="abt-hero-heading" variants={heroVariants.item}>
                Turning the love of millions into a force for good
              </motion.h1>
              <motion.p className="gw-subtitle" variants={heroVariants.item}>
                Chiranjeevi Charitable Trust has been at the forefront of humanitarian service in India since 1998,
                mobilising fans, families and communities to ensure no life is lost for want of care, compassion or
                resources.
              </motion.p>
              <motion.div className="abt-hero-ctas" variants={heroVariants.item}>
                <motion.a
                  href="#/impact"
                  className="abt-hero-btn abt-hero-btn-primary"
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  Our Impact
                </motion.a>
                <motion.a
                  href="#/contact"
                  className="abt-hero-btn abt-hero-btn-outline"
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  Contact Us
                </motion.a>
              </motion.div>
            </motion.div>
            <motion.div
              className="abt-hero-right"
              variants={heroVariants.portrait}
              initial="hidden"
              animate="show"
            >
              <motion.div
                className="abt-hero-portrait-wrap"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              >
                <img
                  src="/chiranjeevi-portrait.png"
                  alt="Megastar Chiranjeevi"
                  className="abt-hero-portrait"
                />
              </motion.div>
              <span className="abt-hero-name-tag megastar-gold-shine">Megastar Chiranjeevi</span>
            </motion.div>
          </div>
          <motion.div
            className="abt-stats-row"
            variants={statContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {STATS.map(s => (
              <motion.div className="abt-stat" key={s.label} variants={statItem}>
                <span className="abt-stat-icon" aria-hidden="true">
                  {s.icon}
                </span>
                <div className="abt-stat-value-row">
                  <AnimatedCounter target={s.target} className="abt-stat-num" formatter={formatIndian} />
                  {s.suffix && <span className="abt-stat-suffix">{s.suffix}</span>}
                </div>
                <span className="abt-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* TIMELINE */}
      <section className="abt-timeline-section">
        <motion.h2
          className="abt-section-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          Our Journey
        </motion.h2>
        <motion.div
          className="abt-timeline"
          variants={tlContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="abt-tl-shell">
            <motion.div
              className="abt-tl-rail"
              variants={tlLine}
              style={{ transformOrigin: '0% 50%' }}
              aria-hidden
            />
            <div className="abt-tl-nodes">
              {TIMELINE.map(item => (
                <motion.article className="abt-tl-node" key={item.year} variants={tlItem}>
                  <span className="abt-tl-year">{item.year}</span>
                  <div className="abt-tl-marker">
                    <motion.span
                      className="abt-tl-dot"
                      initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
                      whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    />
                  </div>
                  <p className="abt-tl-text">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRUSTEES */}
      <section className="abt-trustees">
        <motion.h2
          className="abt-section-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          Board of Trustees
        </motion.h2>
        <motion.div
          className="abt-trustees-grid"
          variants={statContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {TRUSTEES.map(t => (
            <motion.div
              className="abt-trustee-card"
              key={t.name}
              variants={statItem}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -5, boxShadow: '0 14px 40px rgba(13,9,5,.1)' }
              }
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            >
              <motion.div
                className="abt-trustee-avatar"
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              >
                <img src={t.photoSrc} alt="" width={80} height={80} loading="lazy" decoding="async" />
              </motion.div>
              <h4 className="abt-trustee-name">{t.name}</h4>
              <span className="abt-trustee-role">{t.designation}</span>
              <p className="abt-trustee-bio">{t.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PARTNERS */}
      <section className="abt-partners">
        <motion.h2
          className="abt-section-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          Partner Hospitals
        </motion.h2>
        <motion.div
          className="abt-partners-grid"
          variants={statContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {HOSPITALS.map((hospital, index) => (
            <motion.a
              className="abt-partner-card"
              key={hospital.name}
              href={hospital.href}
              target="_blank"
              rel="noreferrer"
              variants={statItem}
              initial={reduceMotion ? undefined : { opacity: 0, y: 22, scale: 0.96 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={
                reduceMotion
                  ? { duration: 0.2 }
                  : { duration: 0.45, delay: index * 0.05, ease: easeSoft }
              }
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -7,
                      scale: 1.02,
                      borderColor: 'rgba(204,0,51,.42)',
                      boxShadow: '0 16px 36px rgba(204,0,51,.16)',
                    }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              <motion.span
                className="abt-partner-glow"
                aria-hidden="true"
                animate={reduceMotion ? undefined : { opacity: [0.18, 0.42, 0.2], scale: [1, 1.08, 1] }}
                transition={{
                  duration: 3.2,
                  delay: index * 0.08,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="abt-partner-name">{hospital.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </section>

    </div>
  )
}
