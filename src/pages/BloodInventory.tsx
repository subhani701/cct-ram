import { useState, useMemo } from 'react'

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
type FilterBG = BloodType | 'All'

interface BloodBank {
  name: string
  hospital: string
  city: string
  address: string
  phone: string
  hours: string
  is24x7: boolean
  lastUpdated: string
  stock: Record<BloodType, number>
}

const BLOOD_TYPES: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const CITIES = ['All Cities', 'Hyderabad', 'Vijayawada', 'Tirupati', 'Visakhapatnam']

const BANKS: BloodBank[] = [
  {
    name: 'Red Cross Blood Bank',
    hospital: 'NIMS Hospital',
    city: 'Hyderabad',
    address: 'Punjagutta, Hyderabad, Telangana 500082',
    phone: '+91 40 2355 1234',
    hours: '24/7',
    is24x7: true,
    lastUpdated: '10 minutes ago',
    stock: { 'A+': 45, 'A-': 8, 'B+': 32, 'B-': 3, 'AB+': 18, 'AB-': 5, 'O+': 52, 'O-': 2 },
  },
  {
    name: 'Gandhi Hospital Blood Centre',
    hospital: 'Gandhi Hospital',
    city: 'Hyderabad',
    address: 'Musheerabad, Hyderabad, Telangana 500003',
    phone: '+91 40 2344 5678',
    hours: '8AM-8PM',
    is24x7: false,
    lastUpdated: '25 minutes ago',
    stock: { 'A+': 28, 'A-': 12, 'B+': 15, 'B-': 9, 'AB+': 22, 'AB-': 11, 'O+': 35, 'O-': 7 },
  },
  {
    name: 'NTR Blood Bank',
    hospital: 'Vijayawada Govt Hospital',
    city: 'Vijayawada',
    address: 'Gunadala, Vijayawada, AP 520004',
    phone: '+91 866 257 1234',
    hours: '24/7',
    is24x7: true,
    lastUpdated: '15 minutes ago',
    stock: { 'A+': 60, 'A-': 20, 'B+': 44, 'B-': 16, 'AB+': 38, 'AB-': 14, 'O+': 55, 'O-': 12 },
  },
  {
    name: 'SVR Blood Centre',
    hospital: 'SVR Ruia Hospital',
    city: 'Tirupati',
    address: 'Railway Colony, Tirupati, AP 517501',
    phone: '+91 877 228 5678',
    hours: '9AM-6PM',
    is24x7: false,
    lastUpdated: '30 minutes ago',
    stock: { 'A+': 35, 'A-': 6, 'B+': 28, 'B-': 11, 'AB+': 15, 'AB-': 4, 'O+': 42, 'O-': 9 },
  },
  {
    name: 'KGH Blood Bank',
    hospital: 'King George Hospital',
    city: 'Visakhapatnam',
    address: 'Maharanipeta, Visakhapatnam, AP 530002',
    phone: '+91 891 256 7890',
    hours: '24/7',
    is24x7: true,
    lastUpdated: '5 minutes ago',
    stock: { 'A+': 50, 'A-': 18, 'B+': 40, 'B-': 14, 'AB+': 25, 'AB-': 8, 'O+': 48, 'O-': 6 },
  },
]

function getStatus(units: number): 'critical' | 'low' | 'sufficient' {
  if (units < 10) return 'critical'
  if (units <= 30) return 'low'
  return 'sufficient'
}

const STATUS_LABELS: Record<string, string> = { critical: 'CRITICAL', low: 'LOW', sufficient: 'SUFFICIENT' }

export default function BloodInventory() {
  const [bgFilter, setBgFilter] = useState<FilterBG>('All')
  const [cityFilter, setCityFilter] = useState('All Cities')
  const [alertPhone, setAlertPhone] = useState('')
  const [alertBG, setAlertBG] = useState<BloodType>('O+')
  const [alertSubmitted, setAlertSubmitted] = useState(false)

  const filtered = useMemo(() => {
    let banks = BANKS
    if (cityFilter !== 'All Cities') banks = banks.filter(b => b.city === cityFilter)
    return banks
  }, [cityFilter])

  const criticalCount = useMemo(() => {
    let count = 0
    filtered.forEach(b => {
      const types = bgFilter === 'All' ? BLOOD_TYPES : [bgFilter]
      types.forEach(t => { if (b.stock[t] < 10) count++ })
    })
    return count
  }, [filtered, bgFilter])

  const sufficientCount = useMemo(() => {
    let count = 0
    filtered.forEach(b => {
      const types = bgFilter === 'All' ? BLOOD_TYPES : [bgFilter]
      types.forEach(t => { if (b.stock[t] > 30) count++ })
    })
    return count
  }, [filtered, bgFilter])

  const clearFilters = () => { setBgFilter('All'); setCityFilter('All Cities') }
  const hasFilters = bgFilter !== 'All' || cityFilter !== 'All Cities'

  const handleAlertSubmit = () => {
    if (alertPhone.length >= 10) {
      setAlertSubmitted(true)
      setTimeout(() => setAlertSubmitted(false), 4000)
    }
  }

  return (
    <div className="inv-page" style={{ paddingTop: 62 }}>
      {/* Header */}
      <header className="inv-header">
        <h1 className="inv-heading">Blood Bank <span className="inv-heading-accent">Inventory</span></h1>
        <p className="inv-subtitle">Real-time stock levels across CCT partner hospitals</p>
        <div className="inv-sync"><span className="inv-sync-dot" /> 15 min ago</div>
      </header>

      {/* Emergency Banner */}
      <div className="inv-emergency">
        <div className="inv-emergency-inner">
          <span className="inv-emergency-text">
            <span className="inv-emergency-icon">🚨</span>
            Need blood urgently? Call CCT helpline: <strong>1800-425-XXXX</strong>
          </span>
          <a href="tel:1800425XXXX" className="inv-emergency-btn">Call Now</a>
        </div>
      </div>

      {/* Filter Bar (sticky) */}
      <div className="inv-filters">
        <div className="inv-filters-inner">
          <div className="inv-bg-filters">
            <button
              className={`inv-bg-pill ${bgFilter === 'All' ? 'on' : ''}`}
              onClick={() => setBgFilter('All')}
            >All</button>
            {BLOOD_TYPES.map(bt => (
              <button
                key={bt}
                className={`inv-bg-btn ${bgFilter === bt ? 'on' : ''}`}
                onClick={() => setBgFilter(bt)}
              >{bt}</button>
            ))}
          </div>
          <div className="inv-filter-right">
            <select
              className="inv-city-select"
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
            >
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {hasFilters && (
              <button className="inv-clear-link" onClick={clearFilters}>Clear</button>
            )}
          </div>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="inv-summary">
        <div className="inv-summary-card">
          <div className="inv-summary-n">{filtered.length}</div>
          <div className="inv-summary-l">blood banks</div>
        </div>
        <div className="inv-summary-card inv-summary-critical">
          <div className="inv-summary-n">{criticalCount}</div>
          <div className="inv-summary-l">units critical</div>
        </div>
        <div className="inv-summary-card inv-summary-sufficient">
          <div className="inv-summary-n">{sufficientCount}</div>
          <div className="inv-summary-l">units sufficient</div>
        </div>
      </div>

      {/* Blood Bank Cards */}
      <div className="inv-banks">
        {filtered.map((bank, i) => (
          <div className="inv-bank-card" key={i}>
            {/* Top row */}
            <div className="inv-bank-top">
              <div className="inv-bank-title-group">
                <h2 className="inv-bank-name">{bank.name}</h2>
                <span className="inv-bank-hospital">{bank.hospital}</span>
              </div>
              <span className={`inv-bank-hours ${bank.is24x7 ? 'inv-hours-24' : 'inv-hours-day'}`}>
                {bank.hours}
              </span>
            </div>

            {/* Info row */}
            <div className="inv-bank-info">
              <span className="inv-bank-address">📍 {bank.address}</span>
              <a href={`tel:${bank.phone.replace(/\s/g, '')}`} className="inv-bank-phone">📞 {bank.phone}</a>
            </div>

            {/* Blood group grid */}
            <div className="inv-stock-grid">
              {BLOOD_TYPES.map(bt => {
                const units = bank.stock[bt]
                const status = getStatus(units)
                const dimmed = bgFilter !== 'All' && bgFilter !== bt
                return (
                  <div
                    key={bt}
                    className={`inv-stock-cell inv-cell-${status}${dimmed ? ' inv-dimmed' : ''}`}
                  >
                    <span className="inv-stock-type">{bt}</span>
                    <span className="inv-stock-units">{units}</span>
                    <span className="inv-stock-status">{STATUS_LABELS[status]}</span>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="inv-bank-footer">
              <span className="inv-bank-updated">Last updated: {bank.lastUpdated}</span>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(bank.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inv-bank-directions"
              >Get Directions →</a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="inv-empty">
            <p>No blood banks found for the selected filters</p>
            <button className="inv-clear-link" onClick={clearFilters}>Clear filters</button>
          </div>
        )}
      </div>

      {/* Alert CTA */}
      <div className="inv-alert-section">
        <h2 className="inv-alert-title">
          Get notified when {bgFilter !== 'All' ? bgFilter : alertBG} is available
        </h2>
        <div className="inv-alert-form">
          {bgFilter === 'All' && (
            <select className="inv-alert-bg" value={alertBG} onChange={e => setAlertBG(e.target.value as BloodType)}>
              {BLOOD_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
            </select>
          )}
          <div className="inv-alert-phone-wrap">
            <span className="inv-alert-prefix">+91</span>
            <input
              type="tel"
              className="inv-alert-phone"
              placeholder="Phone number"
              value={alertPhone}
              onChange={e => setAlertPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </div>
          <button className="inv-alert-btn" onClick={handleAlertSubmit} disabled={alertPhone.length < 10}>
            Subscribe
          </button>
        </div>
        {alertSubmitted && (
          <div className="inv-alert-success">
            ✓ You'll be notified when {bgFilter !== 'All' ? bgFilter : alertBG} is available near you
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="inv-footer">
        <p>© 2026 CCT · Hyderabad | Built by VoltusWave</p>
      </footer>
    </div>
  )
}
