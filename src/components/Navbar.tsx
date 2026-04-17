import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#/', label: 'Home' },
  { href: '#/events', label: 'Events' },
  { href: '#/good-works', label: 'Good Works' },
  { href: '#/donors', label: 'Leaderboard' },
  { href: '#/campaigns', label: 'Campaigns' },
  { href: '#/blood-inventory', label: 'Blood Bank' },
  { href: '#/impact', label: 'Our Impact' },
  { href: '#/about', label: 'About' },
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
        <div className="ldot" />
        CCT
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
