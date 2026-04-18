import { useState } from 'react'
import { motion } from 'framer-motion'

const inquiryReasons = [
  { value: '', label: 'Reason for message' },
  { value: 'general', label: 'General inquiry' },
  { value: 'donation', label: 'Donations' },
  { value: 'volunteer', label: 'Volunteering' },
  { value: 'partnership', label: 'Partnership / sponsorship' },
  { value: 'media', label: 'Media / press' },
  { value: 'other', label: 'Other' },
] as const

const contactInfoItems = [
  {
    title: 'Head Office',
    value: 'Plot No. 123, Road No. 10, Jubilee Hills, Hyderabad, Telangana 500033',
    icon: 'HQ',
  },
  {
    title: 'Emergency Helpline',
    value: '+91 1800 123 4567 / 24/7 (Toll Free)',
    icon: '24',
  },
  {
    title: 'Email Us',
    value: 'help@ccttrust.org',
    icon: '@',
  },
  {
    title: 'Office Hours',
    value: 'Mon - Sat: 9:00 AM - 6:00 PM',
    icon: 'OH',
  },
]

const socialLinks = [
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/CCT/',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png',
  },
  {
    key: 'x',
    label: 'X',
    href: 'https://x.com/CCT_Offl/status/2044803021176271038',
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/chiranjeevicharitabletrust/',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@ChiranjeeviCharitableTrust',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png',
  },
]

const sparkles = [
  { top: '8%', left: '14%', delay: 0.2, dur: 7.8 },
  { top: '14%', left: '77%', delay: 0.8, dur: 8.6 },
  { top: '32%', left: '52%', delay: 1.5, dur: 7.2 },
  { top: '48%', left: '11%', delay: 0.3, dur: 9.1 },
  { top: '58%', left: '86%', delay: 1.9, dur: 8.4 },
  { top: '74%', left: '36%', delay: 1.1, dur: 7.6 },
  { top: '86%', left: '67%', delay: 0.6, dur: 9.4 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export default function Contact() {
  const [reason, setReason] = useState('')

  return (
    <section className="contact-page">
      <div className="contact-bg-layer contact-bg-layer-a" />
      <div className="contact-bg-layer contact-bg-layer-b" />
      <div className="contact-bg-grid" />
      {sparkles.map((s, i) => (
        <motion.span
          key={`${s.top}-${s.left}-${i}`}
          className="contact-sparkle"
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0.25, 0.95, 0.35], scale: [0.8, 1.2, 0.9], y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="contact-wrap">
        <motion.div
          className="contact-heading"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Have questions or want to get involved? We would love to hear from you.
          </motion.p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-form-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>Send us a Message</h2>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <motion.div className="contact-row" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.16, duration: 0.42 }}>
                <motion.input type="text" placeholder="Full Name" aria-label="Full Name" whileFocus={{ y: -2, boxShadow: '0 0 0 2px rgba(204,0,51,.14)' }} />
                <motion.input type="tel" placeholder="Phone Number" aria-label="Phone Number" whileFocus={{ y: -2, boxShadow: '0 0 0 2px rgba(204,0,51,.14)' }} />
              </motion.div>
              <motion.input type="email" placeholder="Email Address" aria-label="Email Address" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.22, duration: 0.42 }} whileFocus={{ y: -2, boxShadow: '0 0 0 2px rgba(204,0,51,.14)' }} />
              <motion.select
                className={reason ? undefined : 'contact-reason-empty'}
                aria-label="Reason for message"
                name="reason"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: 0.28, duration: 0.42 }}
                whileFocus={{ y: -2, boxShadow: '0 0 0 2px rgba(204,0,51,.14)' }}
              >
                {inquiryReasons.map((opt) => (
                  <option key={opt.value || 'placeholder'} value={opt.value} disabled={opt.value === ''}>
                    {opt.label}
                  </option>
                ))}
              </motion.select>
              <motion.textarea placeholder="Your Message" aria-label="Your Message" rows={4} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.34, duration: 0.42 }} whileFocus={{ y: -2, boxShadow: '0 0 0 2px rgba(204,0,51,.14)' }} />
              <motion.button type="submit" whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="contact-info-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contact-info-head">
              <h2>Reach Out Instantly</h2>
              <p>We are here to support, answer, and guide you.</p>
            </div>

            {contactInfoItems.map((item, index) => (
              <motion.div
                key={item.title}
                className="contact-info-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, duration: 0.35, ease: 'easeOut' }}
              >
                <span className="contact-info-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div className="contact-info-copy">
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="contact-follow">
              <h3>Follow Us</h3>
              <div className="contact-socials" aria-label="social links">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`contact-social-link${social.key === 'x' ? ' contact-social-link-x' : ''}`}
                    aria-label={social.label}
                    whileHover={{ y: -2, scale: 1.06 }}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <img src={social.src} alt={social.label} />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              className="contact-map"
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.55, ease: 'easeOut' }}
            >
              <iframe
                title="CCT Trust Office Location"
                src="https://maps.google.com/maps?q=Jubilee%20Hills%20Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
