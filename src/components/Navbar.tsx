import { useState, useEffect } from 'react'
import cctLogo from '../assets/cct-logo.png'

const NAV_LINKS = [
  { href: '#/', label: 'Home' },
  { href: '#/events', label: 'Events' },
  { href: '#/good-works', label: 'Good Works' },
  { href: '#/donors', label: 'Leaderboard' },
  { href: '#/campaigns', label: 'Campaigns' },
  { href: '#/impact', label: 'Our Impact' },
  { href: '#/about', label: 'About' },
  { href: '#/contact', label: 'Contact Us' },
]

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [shadow, setShadow] = useState(false)
  const [route, setRoute] = useState(window.location.hash || '#/')

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <nav
      id="topnav"
      className={dark ? 'nav-dark' : ''}
      style={{ boxShadow: shadow ? (dark ? '0 2px 20px rgba(0,0,0,.3)' : '0 2px 20px rgba(13,9,5,.06)') : 'none' }}
    >
      <a href="#/" className="nav-logo">
        <img src={cctLogo} alt="CCT Logo" className="nav-logo-img" />
        <span className="nav-logo-text">
          <span className="nav-logo-title">CCT</span>
          <span className="nav-logo-subtitle">Chiranjeevi Charitable Trust</span>
        </span>
      </a>
      <div className="nav-pill-row">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            className={`npl${route === link.href ? ' on' : ''}`}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="nav-r">
        <a href="#/register" className="npb npb-g" style={{ textDecoration: 'none' }}>
          🩸 Donate Blood
        </a>
        <a href="#/donate" className="npb npb-s" style={{ textDecoration: 'none' }}>
          Contribute →
        </a>
      </div>
    </nav>
  )
}
