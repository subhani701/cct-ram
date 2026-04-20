import cctLogo from '../assets/cct-logo.png'

export function SiteFooter() {
  const socialIcons = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/CCT/',
      src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png',
    },
    {
      label: 'X',
      href: 'https://x.com/CCT_Offl/status/2044803021176271038',
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/chiranjeevicharitabletrust/',
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@ChiranjeeviCharitableTrust',
      src: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png',
    },
  ]

  return (
    <footer>
      <div className="fg">
        <div className="fb-brand">
          <a href="#/" className="nav-logo">
            <img src={cctLogo} alt="CCT Logo" className="nav-logo-img" />
            <span className="nav-logo-text">
              <span className="nav-logo-title">CCT</span>
              <span className="nav-logo-subtitle">Chiranjeevi Charitable Trust</span>
            </span>
          </a>
          <p className="fb-desc">Turning the love of millions into a force for good</p>
          <div className="fb-soc">
            {socialIcons.map((social) => (
              <a
                key={social.label}
                className={`fsc${social.label === 'X' ? ' fsc-x' : ''}`}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                <img src={social.src} alt={social.label} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h5>Donate</h5>
          <ul>
            <li><a href="#/campaigns">Campaigns</a></li>
            <li><a href="#/donate">General Fund</a></li>
            <li><a href="#/blood-inventory">Blood Inventory</a></li>
          </ul>
        </div>
        <div>
          <h5>Community</h5>
          <ul>
            <li><a href="#/good-works">Stories</a></li>
            <li><a href="#/good-works">Share Story</a></li>
            <li><a href="#/donors">Leaderboard</a></li>
          </ul>
        </div>
        <div>
          <h5>Trust</h5>
          <ul>
            <li><a href="#/about">About CCT</a></li>
            <li><a href="#/impact">Our Impact</a></li>
            <li><a href="#/about">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="fb-bot">
        <span>Copyright © 2026 ChiranjeeviCharitableTrust - All Rights Reserved.</span>
      </div>
    </footer>
  )
}
