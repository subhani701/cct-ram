import { useState } from 'react'
import { AnimatedCounter } from '../components/AnimatedCounter'

interface Trustee {
  name: string
  designation: string
  bio: string
  initials: string
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
  { name: 'Konidela Chiranjeevi', designation: 'Founder', bio: 'Megastar and visionary philanthropist who founded CCT to save lives through blood donation', initials: 'KC' },
  { name: 'Dr Priya Ranjan', designation: 'Medical Director', bio: 'Leading hematologist with 20+ years in transfusion medicine and blood banking', initials: 'PR' },
  { name: 'Srinivas Reddy K', designation: 'COO', bio: 'Operations expert driving CCT logistics and donor coordination across two states', initials: 'SR' },
  { name: 'Lakshmi Narasimha Rao', designation: 'Treasurer', bio: 'Chartered accountant ensuring transparent financial stewardship of all donations', initials: 'LN' },
  { name: 'Dr Anjali Mehta', designation: 'Partnerships', bio: 'Building bridges between CCT and hospitals, corporates and government bodies', initials: 'AM' },
  { name: 'Venkat Subramaniam', designation: 'Technology', bio: 'Architect of CCT digital platform modernising donor registration and tracking', initials: 'VS' },
]

const HOSPITALS = [
  'NIMS', 'Gandhi', 'NTR Blood Bank', 'SVR Ruia',
  'KGH Vizag', 'Guntur Govt', 'KIMS Hyderabad', 'Apollo Blood Bank',
]

const STATS = [
  { target: 27, label: 'Years', suffix: '+' },
  { target: 1200000, label: 'Units', suffix: '' },
  { target: 4700, label: 'Lives', suffix: '' },
  { target: 86, label: 'Hospitals', suffix: '' },
]

export default function About() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSubmitted(true)
      setTimeout(() => {
        setContactSubmitted(false)
        setContactForm({ name: '', email: '', phone: '', message: '' })
      }, 4000)
    }
  }

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('abt-contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="abt-page" style={{ paddingTop: 62 }}>
      {/* HERO */}
      <section className="abt-hero">
        <div className="abt-hero-grid">
          <div className="abt-hero-left">
            <span className="abt-hero-eyebrow">About CCT</span>
            <h1 className="abt-hero-heading">Turning the love of millions into a force for good</h1>
            <p className="abt-hero-desc">
              Chiranjeevi Charitable Trust has been at the forefront of voluntary blood donation in India since 1998, mobilising fans, families and communities to ensure no life is lost for want of blood
            </p>
            <div className="abt-hero-ctas">
              <a href="#/impact" className="abt-hero-btn abt-hero-btn-primary">Our Impact &rarr;</a>
              <button onClick={scrollToContact} className="abt-hero-btn abt-hero-btn-outline">Contact Us</button>
            </div>
          </div>
          <div className="abt-hero-right">
            <div className="abt-hero-portrait-wrap">
              <img
                src="/chiranjeevi-portrait.png"
                alt="Megastar Chiranjeevi"
                className="abt-hero-portrait"
              />
            </div>
            <span className="abt-hero-name-tag">Megastar Chiranjeevi</span>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="abt-stats">
        <div className="abt-stats-row">
          {STATS.map(s => (
            <div className="abt-stat" key={s.label}>
              <div className="abt-stat-value-row">
                <AnimatedCounter target={s.target} className="abt-stat-num" />
                {s.suffix && <span className="abt-stat-suffix">{s.suffix}</span>}
              </div>
              <span className="abt-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="abt-timeline-section">
        <h2 className="abt-section-heading">Our Journey</h2>
        <div className="abt-timeline">
          <div className="abt-tl-line" />
          {TIMELINE.map(item => (
            <div className="abt-tl-item" key={item.year}>
              <div className="abt-tl-dot" />
              <div className="abt-tl-body">
                <span className="abt-tl-year">{item.year}</span>
                <p className="abt-tl-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTEES */}
      <section className="abt-trustees">
        <h2 className="abt-section-heading">Board of Trustees</h2>
        <div className="abt-trustees-grid">
          {TRUSTEES.map(t => (
            <div className="abt-trustee-card" key={t.name}>
              <div className="abt-trustee-avatar">{t.initials}</div>
              <h4 className="abt-trustee-name">{t.name}</h4>
              <span className="abt-trustee-role">{t.designation}</span>
              <p className="abt-trustee-bio">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="abt-partners">
        <h2 className="abt-section-heading">Partner Hospitals</h2>
        <div className="abt-partners-grid">
          {HOSPITALS.map(h => (
            <div className="abt-partner-card" key={h}>
              <span className="abt-partner-name">{h}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="abt-contact" id="abt-contact">
        <div className="abt-contact-grid">
          <div className="abt-contact-info">
            <h2 className="abt-section-heading" style={{ textAlign: 'left' }}>Get in Touch</h2>
            <div className="abt-contact-details">
              <p className="abt-contact-line">&#128205; CCT Head Office, Film Nagar, Hyderabad, Telangana 500096</p>
              <p className="abt-contact-line">&#128222; <a href="tel:+914023550000">+91 40 2355 0000</a></p>
              <p className="abt-contact-line">&#9993;&#65039; <a href="mailto:info@cct.org.in">info@cct.org.in</a></p>
            </div>
            <div className="abt-social-row">
              <span className="abt-social-circle" aria-label="Facebook">f</span>
              <span className="abt-social-circle" aria-label="Twitter">𝕏</span>
              <span className="abt-social-circle" aria-label="Instagram">📸</span>
              <span className="abt-social-circle" aria-label="YouTube">▶</span>
            </div>
          </div>
          <div className="abt-contact-form-card">
            {contactSubmitted ? (
              <div className="abt-contact-success">
                <span className="abt-contact-check">&check;</span>
                <h4>Message sent!</h4>
                <p>We'll get back to you within 24 hours</p>
              </div>
            ) : (
              <div className="abt-contact-form">
                <input
                  className="abt-input"
                  placeholder="Full Name"
                  value={contactForm.name}
                  onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                />
                <input
                  className="abt-input"
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                />
                <input
                  className="abt-input"
                  type="tel"
                  placeholder="Phone (optional)"
                  value={contactForm.phone}
                  onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                />
                <textarea
                  className="abt-textarea"
                  placeholder="Your message"
                  rows={4}
                  value={contactForm.message}
                  onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                />
                <button
                  className="abt-submit-btn"
                  onClick={handleContactSubmit}
                  disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                >
                  Send Message &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="abt-footer">
        <p>&copy; 2026 CCT &middot; Hyderabad | Built by VoltusWave</p>
      </footer>
    </div>
  )
}
