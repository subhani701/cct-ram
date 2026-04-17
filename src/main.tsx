import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CustomCursor from './components/CustomCursor.tsx'
import Navbar from './components/Navbar.tsx'
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

const NO_NAVBAR_ROUTES = ['#/donate']
const DARK_NAVBAR_ROUTES = ['#/impact']

function Router() {
  const [route, setRoute] = useState(window.location.hash || '#/')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const showNavbar = !NO_NAVBAR_ROUTES.includes(route)
  const darkNavbar = DARK_NAVBAR_ROUTES.includes(route)

  let Page
  switch (route) {
    case '#/register': Page = DonorRegistration; break
    case '#/campaigns': Page = Campaigns; break
    case '#/blood-inventory': Page = BloodInventory; break
    case '#/events': Page = Events; break
    case '#/donors': Page = DonorWall; break
    case '#/about': Page = About; break
    case '#/donate': Page = Donate; break
    case '#/good-works': Page = GoodWorks; break
    case '#/impact': Page = Impact; break
    default: Page = App
  }

  return (
    <>
      <CustomCursor />
      {showNavbar && <Navbar dark={darkNavbar} />}
      <Page />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
