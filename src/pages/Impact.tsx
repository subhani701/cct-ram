import { useMemo } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

const impactStats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M12 2.8c-.7 1.5-2.2 3.6-3.6 5.3C6.8 10 5.6 11.8 5.6 14.2A6.4 6.4 0 0 0 12 20.6a6.4 6.4 0 0 0 6.4-6.4c0-2.4-1.2-4.2-2.8-6.1C14.2 6.4 12.7 4.3 12 2.8Z"
          fill="#ef3b2d"
          stroke="#c72127"
          strokeWidth="1"
        />
      </svg>
    ),
    value: '12,00,000+',
    label: 'Blood Units Collected',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M12 20.2 3.8 12c-2-2.1-1.9-5.4.2-7.4a5 5 0 0 1 7.1 0L12 5.5l.9-.9a5 5 0 0 1 7.1 0c2.1 2 2.2 5.3.2 7.4L12 20.2Z"
          fill="#ef3b2d"
          stroke="#c72127"
          strokeWidth="1"
        />
      </svg>
    ),
    value: '4,700+',
    label: 'Lives Saved',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="8.2" cy="8.2" r="3.1" fill="#2f82f5" />
        <circle cx="15.8" cy="8.2" r="3.1" fill="#2f82f5" />
        <path d="M3.8 18.6c0-2.7 2.2-4.9 4.9-4.9h1.2c2.7 0 4.9 2.2 4.9 4.9" fill="#2f82f5" />
        <path d="M9.2 18.6c0-2.7 2.2-4.9 4.9-4.9h1.2c2.7 0 4.9 2.2 4.9 4.9" fill="#2f82f5" />
      </svg>
    ),
    value: '28,000+',
    label: 'Active Donors',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="#7f1f2b"
          fontFamily="DM Sans, sans-serif"
        >
          ₹
        </text>
      </svg>
    ),
    value: 'Rs.2.3 Cr',
    label: 'Funds Raised',
  },
]

const journey = [
  { year: '1998', text: 'CCT founded by Megastar Chiranjeevi' },
  { year: '2005', text: '1,00,000 blood units milestone' },
  { year: '2012', text: 'First mega blood drive with 5,000 donors in one day' },
  { year: '2018', text: 'Partnership with 50+ hospitals across AP & TS' },
  { year: '2024', text: 'Digital platform launch' },
  { year: '2026', text: '12 lakh units and counting' },
]

const districts = [
  { city: 'Hyderabad', count: 85000, rank: 1, hot: true },
  { city: 'Vijayawada', count: 62000, rank: 2, hot: true },
  { city: 'Visakhapatnam', count: 58000, rank: 3, hot: true },
  { city: 'Guntur', count: 45000, rank: 4, hot: true },
  { city: 'Tirupati', count: 42000, rank: 5, hot: false },
]

const bloodMix = [
  { type: 'O+', pct: 35, color: '#d62839' },
  { type: 'B+', pct: 25, color: '#f0a50b' },
  { type: 'A+', pct: 20, color: '#3f7de0' },
  { type: 'AB+', pct: 8, color: '#7b5bf6' },
  { type: 'O-', pct: 5, color: '#e5485a' },
  { type: 'B-', pct: 3, color: '#f2c23a' },
  { type: 'A-', pct: 3, color: '#5b9bf6' },
  { type: 'AB-', pct: 1, color: '#9f87ff' },
]

const campaignImpact = [
  { icon: '🩺', value: '12', label: 'Equipment Campaigns Completed' },
  { icon: '👨‍👩‍👧', value: '2,500+', label: 'Patients Supported' },
  { icon: '🏥', value: '8', label: 'Blood Banks Upgraded' },
]

const donutStops = (() => {
  let start = 0
  return bloodMix
    .map((item) => {
      const end = start + item.pct
      const stop = `${item.color} ${start}% ${end}%`
      start = end
      return stop
    })
    .join(', ')
})()

export default function Impact() {
  const reduceMotion = useReducedMotion()

  const easeSoft = [0.22, 1, 0.36, 1] as const
  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: easeSoft } },
      }

  const popIn: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, scale: 0.94, y: 10 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.48, ease: easeSoft } },
      }

  const staggerContainer = useMemo(
    () =>
      ({
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0.03 : 0.1,
            delayChildren: reduceMotion ? 0 : 0.04,
          },
        },
      }) satisfies Variants,
    [reduceMotion],
  )

  const timelineItem: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSoft } },
      }

  const headingWord: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: easeSoft },
        },
      }

  return (
    <motion.div
      className="impact-flow-page"
      style={{ paddingTop: 'var(--nav-h)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.45 }}
    >
      <motion.section className="impact-flow-section impact-flow-top" initial="hidden" animate="show">
        <motion.div className="impact-flow-head" variants={staggerContainer}>
          <h1>
            <motion.span className="impact-flow-head-plain" variants={headingWord} style={{ display: 'inline-block' }}>
              Our 
            </motion.span>{' '}
            <motion.span variants={headingWord} style={{ display: 'inline-block' }}>
              <span>Impact</span>
            </motion.span>
          </h1>
          <motion.p variants={fadeUp}>
            Empowering communities for three decades by saving lives across Andhra Pradesh and Telangana
          </motion.p>
        </motion.div>
        <motion.div
          className="impact-flow-stat-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {impactStats.map((item, index) => (
            <motion.article
              key={item.label}
              className="impact-flow-card impact-flow-stat-card"
              variants={popIn}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -4, 0],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 3.2,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: index * 0.12,
                    }
              }
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              <div className="impact-flow-icon">{item.icon}</div>
              <h3 className="impact-flow-stat-value">{item.value}</h3>
              <p className="impact-flow-stat-label">{item.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="impact-flow-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="impact-flow-head" variants={fadeUp}>
          <h2>
            Our <span>Journey</span>
          </h2>
          <p>Celebrating key milestones in our enduring mission to save lives</p>
        </motion.div>
        <motion.div className="impact-flow-timeline-wrap" variants={fadeUp}>
          <div className="impact-flow-timeline-line">
            <motion.div
              className="impact-flow-timeline-line-progress"
              initial={reduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 1 }}
              whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.85 }}
              transition={{ duration: reduceMotion ? 0.2 : 1.2, ease: easeSoft }}
              style={{ transformOrigin: 'left center' }}
            />
          </div>
          <motion.div className="impact-flow-timeline-grid" variants={staggerContainer}>
            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                className="impact-flow-timeline-item"
                variants={timelineItem}
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <motion.div
                  className="impact-flow-dot"
                  animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 1.9,
                    ease: 'easeInOut',
                    repeat: reduceMotion ? 0 : Infinity,
                    delay: index * 0.14,
                  }}
                />
                <div className="impact-flow-year">{item.year}</div>
                <div className="impact-flow-year-text">{item.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="impact-flow-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="impact-flow-head" variants={fadeUp}>
          <h2>
            Donation <span>Heatmap</span>
          </h2>
          <p>Mapping blood donation trends through our overall donor activity</p>
        </motion.div>
        <motion.div className="impact-flow-heatmap" variants={fadeUp}>
          <motion.div className="impact-flow-bars" variants={staggerContainer}>
            {districts.map((item) => (
              <motion.div key={item.city} className="impact-flow-row" variants={timelineItem}>
                <div className="impact-flow-row-top">
                  <strong>
                    #{item.rank} {item.city}
                  </strong>
                  <span>{item.count.toLocaleString()}</span>
                </div>
                <div className="impact-flow-track">
                  <motion.div
                    className="impact-flow-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.count / districts[0].count) * 100}%` }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: easeSoft }}
                  />
                </div>
              </motion.div>
            ))}
            <motion.button
              type="button"
              className="impact-flow-more-btn"
              whileHover={reduceMotion ? undefined : { y: -1, scale: 1.01 }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            >
              Load More Details
            </motion.button>
          </motion.div>
        </motion.div>
        
      </motion.section>

      <motion.section
        className="impact-flow-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="impact-flow-head" variants={fadeUp}>
          <h2>
            Blood Type Distribution
          </h2>
          <p>Presenting a clear breakdown of donations by blood type</p>
        </motion.div>
        <motion.div className="impact-flow-blood-layout" variants={staggerContainer}>
          <motion.div
            className="impact-flow-donut"
            style={{ background: `conic-gradient(${donutStops})` }}
            variants={popIn}
            whileHover={reduceMotion ? undefined : { rotate: 7, scale: 1.02 }}
            transition={{ duration: 0.45, ease: easeSoft }}
          >
            <div className="impact-flow-donut-inner">
              <strong>All</strong>
              <span>Types</span>
            </div>
          </motion.div>
          <motion.div className="impact-flow-legend" variants={staggerContainer}>
            {bloodMix.map((item) => (
              <motion.div key={item.type} className="impact-flow-legend-item" variants={timelineItem}>
                <span style={{ background: item.color }} />
                <label>{item.type}</label>
                <b>{item.pct}%</b>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="impact-flow-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="impact-flow-head" variants={fadeUp}>
          <h2>
            Campaign Impact
          </h2>
          <p>Empowering critical care with Rs.2.3 Crore raised across 47 campaigns</p>
        </motion.div>
        <motion.div className="impact-flow-campaign-grid" variants={staggerContainer}>
          {campaignImpact.map((item) => (
            <motion.article
              key={item.label}
              className="impact-flow-card impact-flow-campaign-card"
              variants={popIn}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              <div className="impact-flow-icon">{item.icon}</div>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="impact-flow-section impact-flow-cta"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 variants={fadeUp}>
          Be part of the <span>next chapter</span>
        </motion.h2>
        <motion.p variants={fadeUp}>
          Join thousands of heroes creating impact. Your contribution helps save lives.
        </motion.p>
        <motion.div className="impact-flow-cta-actions" variants={staggerContainer}>
          <motion.a
            href="#/register"
            variants={popIn}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            Donate Blood
          </motion.a>
          <motion.a
            href="#/campaigns"
            variants={popIn}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            Start a Campaign
          </motion.a>
        </motion.div>
      </motion.section>
    </motion.div>
  )
}
