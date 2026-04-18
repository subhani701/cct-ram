import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CustomCursor from './components/CustomCursor.tsx'
import Navbar from './components/Navbar.tsx'
import { SiteFooter } from './components/SiteFooter.tsx'
import { PageErrorBoundary } from './components/PageErrorBoundary.tsx'
import App from './App.tsx'
import DonorRegistration from './pages/DonorRegistration.tsx'
import Campaigns from './pages/Campaigns.tsx'
import BloodInventory from './pages/BloodInventory.tsx'
import Events from './pages/Events.tsx'
import DonorWall from './pages/DonorWall.tsx'
import About from './pages/About.tsx'
import Donate from './pages/Donate.tsx'
import GoodWorks from './pages/GoodWorks.tsx'
import Impact from './pages/Impact.tsx'
import Contact from './pages/Contact.tsx'
import { normalizeHash, routesMatch } from './utils/hashRoute.ts'

const NO_NAVBAR_ROUTES = ['#/donate']

export function Router() {
  const [route, setRoute] = useState(() => normalizeHash(window.location.hash))

  useEffect(() => {
    const sync = () => setRoute(normalizeHash(window.location.hash))
    window.addEventListener('hashchange', sync)
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) sync()
    }
    window.addEventListener('pageshow', onPageShow)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  const path = normalizeHash(route).toLowerCase()
  const showNavbar = !NO_NAVBAR_ROUTES.some(r => routesMatch(path, r))

  let Page
  switch (path) {
    case '#/register': Page = DonorRegistration; break
    case '#/campaigns': Page = Campaigns; break
    case '#/blood-inventory': Page = BloodInventory; break
    case '#/events': Page = Events; break
    case '#/donors': Page = DonorWall; break
    case '#/about': Page = About; break
    case '#/donate': Page = Donate; break
    case '#/good-works': Page = GoodWorks; break
    case '#/impact': Page = Impact; break
    case '#/contact': Page = Contact; break
    default: Page = App
  }

  return (
    <>
      <CustomCursor />
      {showNavbar && <Navbar />}
      <PageErrorBoundary key={path}>
        <Page />
      </PageErrorBoundary>
      <SiteFooter />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
