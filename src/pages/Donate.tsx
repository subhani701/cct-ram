import { useState, useEffect } from 'react'

type PaymentMethod = 'upi' | 'card' | 'netbanking' | ''

const PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000]
const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank']
const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', currency: 'INR', locale: 'en-IN' },
  { code: '+1', flag: '🇺🇸', currency: 'USD', locale: 'en-US' },
  { code: '+44', flag: '🇬🇧', currency: 'GBP', locale: 'en-GB' },
  { code: '+61', flag: '🇦🇺', currency: 'AUD', locale: 'en-AU' },
  { code: '+971', flag: '🇦🇪', currency: 'AED', locale: 'en-AE' },
  { code: '+65', flag: '🇸🇬', currency: 'SGD', locale: 'en-SG' },
]

function getImpactIcon(amount: number): string {
  if (amount < 500) return '🩸'
  if (amount < 1000) return '💉'
  if (amount < 2500) return '🏥'
  if (amount < 5000) return '❤️'
  return '⭐'
}

function getImpactText(amount: number): string {
  if (amount < 50) return ''
  if (amount < 500) return 'Provide 1 unit of blood storage'
  if (amount < 1000) return 'Fund 1 complete blood transfusion session'
  if (amount < 2500) return `Fund ${Math.floor(amount / 500)} transfusion sessions`
  if (amount < 5000) return `Cover ${Math.floor(amount / 500)} patient treatments`
  return `Fund ${Math.floor(amount / 500)} transfusion sessions`
}

const STEP_LABELS = ['Details', 'Amount', 'Payment']

export default function Donate() {
  const [step, setStep] = useState(1)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' })
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next')
  const [copied, setCopied] = useState(false)
  const [txnId] = useState(() => `TXN-2026-04-17-${Math.floor(10000 + Math.random() * 90000)}`)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])

  const effectiveAmount = isCustom ? (parseInt(customAmount) || 0) : (selectedAmount || 0)
  const impactText = getImpactText(effectiveAmount)
  const selectedCountry = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0]

  const formatAmount = (n: number): string => {
    return new Intl.NumberFormat(selectedCountry.locale, {
      style: 'currency',
      currency: selectedCountry.currency,
      maximumFractionDigits: 0,
    }).format(n)
  }

  const goStep = (target: number) => {
    setSlideDir(target > step ? 'next' : 'prev')
    setTransitioning(true)
    setTimeout(() => {
      setStep(target)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setTransitioning(false), 30)
    }, 250)
  }

  const isStep2Valid = form.fullName.length >= 2 && /\S+@\S+\.\S+/.test(form.email) && /^\d{6,15}$/.test(form.phone)

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2500)
  }

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /* ─── SUCCESS SCREEN ─── */
  if (success) {
    return (
      <div className="don-page don-page-success">
        <nav className="don-topbar">
          <a href="#/" className="don-topbar-logo"><span className="ldot" /> CCT</a>
        </nav>
        <div className="don-success-wrap">
          <div className="don-success-check">✓</div>
          <h1 className="don-success-title">Thank you, {form.fullName.split(' ')[0]}!</h1>
          <p className="don-success-sub">Your contribution of {formatAmount(effectiveAmount)} makes a real difference</p>

          <div className="don-receipt-card">
            <div className="don-receipt-header">Receipt</div>
            <div className="don-receipt-grid">
              <div className="don-receipt-item">
                <span className="don-receipt-label">Amount</span>
                <span className="don-receipt-val don-receipt-amount">{formatAmount(effectiveAmount)}</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Campaign</span>
                <span className="don-receipt-val">General Fund</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Transaction ID</span>
                <span className="don-receipt-val">{txnId}</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Date</span>
                <span className="don-receipt-val">17 Apr 2026</span>
              </div>
            </div>
          </div>

          <div className="don-success-share">
            <div className="don-success-share-label">Spread the word</div>
            <div className="don-success-share-row">
              <button className="don-share-btn don-share-wa" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`I just donated ${formatAmount(effectiveAmount)} to CCT! Join me →`)}`, '_blank')}>WhatsApp</button>
              <button className="don-share-btn don-share-x" onClick={() => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`I just donated to @CCTrust! Every rupee saves lives`)}`, '_blank')}>𝕏 Post</button>
              <button className="don-share-btn don-share-copy" onClick={handleShareCopy}>{copied ? '✓ Copied' : 'Copy Link'}</button>
            </div>
          </div>

          <div className="don-success-ctas">
            <a href="#/" className="don-btn don-btn-outline">Back to Home</a>
            <a href="#/register" className="don-btn don-btn-red">Register as Donor →</a>
          </div>
        </div>
      </div>
    )
  }

  /* ─── MAIN DONATION FLOW ─── */
  return (
    <div className="don-page">
      {/* Minimal top bar */}
      <nav className="don-topbar">
        <a href="#/" className="don-topbar-logo"><span className="ldot" /> CCT</a>
        <span className="don-topbar-secure">🔒 Secure Donation</span>
        <a href="#/" className="don-topbar-close" title="Close">✕</a>
      </nav>

      {/* Split layout */}
      <div className="don-split">

        {/* LEFT PANEL — Context & Impact */}
        <div className="don-left">
          <div className="don-left-inner">
            {/* Campaign context */}
            <div className="don-context">
              <span className="don-context-badge">General Fund</span>
              <h2 className="don-context-title">Chiranjeevi Charitable Trust</h2>
              <p className="don-context-desc">Your donation goes where it's needed most — blood drives, patient support, and community health</p>
              <div className="don-context-bar-wrap">
                <div className="don-context-bar-meta">
                  <span>{formatAmount(1480000)} raised</span>
                  <span>Goal: {formatAmount(2400000)}</span>
                </div>
              </div>
              <div className="don-context-donors">🤝 3,240 donors · 142 days left</div>
            </div>

            <div className="don-left-divider" />

            {/* Dynamic impact */}
            {effectiveAmount >= 50 && (
              <div className="don-impact-card">
                <div className="don-impact-eyebrow">Your impact</div>
                <div className="don-impact-row">
                  <span className="don-impact-icon">{getImpactIcon(effectiveAmount)}</span>
                  <div>
                    <div className="don-impact-amount">{formatAmount(effectiveAmount)}</div>
                    <div className="don-impact-text">{impactText}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="don-left-divider" />

            {/* Recent donors */}
            <div className="don-recent">
              <div className="don-recent-title">Others who contributed</div>
              <div className="don-recent-list">
                <div className="don-recent-item">
                  <span className="don-recent-av" style={{ background: '#FDEEF2', color: '#CC0033' }}>RK</span>
                  <span className="don-recent-text">Ravi K. contributed ₹5,000</span>
                  <span className="don-recent-ago">2h ago</span>
                </div>
                <div className="don-recent-item">
                  <span className="don-recent-av" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>AN</span>
                  <span className="don-recent-text">Anonymous contributed ₹1,000</span>
                  <span className="don-recent-ago">4h ago</span>
                </div>
                <div className="don-recent-item">
                  <span className="don-recent-av" style={{ background: '#FEF3D7', color: '#C98A0A' }}>PM</span>
                  <span className="don-recent-text">Priya M. contributed ₹2,500</span>
                  <span className="don-recent-ago">6h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Payment Steps */}
        <div className="don-right">
          <div className="don-right-inner">
            {/* Step indicator */}
            <div className="don-steps">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className={`don-step-item${step > i + 1 ? ' done' : ''}${step === i + 1 ? ' active' : ''}`}>
                  <div className="don-step-dot">{step > i + 1 ? '✓' : i + 1}</div>
                  <span className="don-step-text">{label}</span>
                </div>
              ))}
              <div className="don-step-line">
                <div className="don-step-line-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
              </div>
            </div>

            <div className={`don-form-area${transitioning ? ` don-slide-${slideDir}` : ''}`}>
              {/* STEP 1 — DETAILS */}
              {step === 1 && (
                <div className="don-form-step">
                  <h2 className="don-form-heading">Your Details</h2>

                  <div className="don-fields">
                    <div className="don-field">
                      <label className="don-label">Full Name <span className="don-req">*</span></label>
                      <input className="don-input" placeholder="e.g. Ramesh Kumar" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                    </div>
                    <div className="don-field">
                      <label className="don-label">Email Address <span className="don-req">*</span></label>
                      <input className="don-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div className="don-field">
                      <label className="don-label">Phone Number <span className="don-req">*</span></label>
                      <div className="don-phone-wrap">
                        <select
                          className="don-country-select"
                          value={countryCode}
                          onChange={e => setCountryCode(e.target.value)}
                          aria-label="Country code"
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input className="don-input don-phone-input" placeholder="Phone number" maxLength={15} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 15) }))} />
                      </div>
                    </div>
                  </div>

                  <div className="don-btn-row">
                    <button type="button" className={`don-btn don-btn-red${!isStep2Valid ? ' disabled' : ''}`} disabled={!isStep2Valid} onClick={() => goStep(2)}>Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 2 — AMOUNT */}
              {step === 2 && (
                <div className="don-form-step">
                  <h2 className="don-form-heading">Choose Amount</h2>

                  <div className="don-amount-grid">
                    {PRESET_AMOUNTS.map(a => (
                      <button
                        key={a}
                        type="button"
                        className={`don-amount-btn${!isCustom && selectedAmount === a ? ' selected' : ''}`}
                        onClick={() => { setSelectedAmount(a); setIsCustom(false); setCustomAmount('') }}
                      >
                        <span className="don-amount-val">{formatAmount(a)}</span>
                        {a === 500 && <span className="don-amount-popular">Popular</span>}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`don-amount-btn${isCustom ? ' selected' : ''}`}
                      onClick={() => setIsCustom(true)}
                    >
                      <span className="don-amount-val">Custom</span>
                    </button>
                  </div>

                  {isCustom && (
                    <div className="don-custom-wrap">
                      <input
                        type="number"
                        className="don-custom-input"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={e => setCustomAmount(e.target.value)}
                        min={50}
                        autoFocus
                      />
                    </div>
                  )}
                  {isCustom && <div className="don-custom-hint">Minimum ₹50</div>}

                  <div className="don-btn-row">
                    <button type="button" className="don-btn don-btn-back" onClick={() => goStep(1)}>← Back</button>
                    <button
                      type="button"
                      className={`don-btn don-btn-red${effectiveAmount < 50 ? ' disabled' : ''}`}
                      disabled={effectiveAmount < 50}
                      onClick={() => goStep(3)}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 — PAYMENT */}
              {step === 3 && (
                <div className="don-form-step">
                  <h2 className="don-form-heading">Payment Method</h2>

                  <div className="don-pay-options">
                    {/* UPI */}
                    <div className={`don-pay-card${paymentMethod === 'upi' ? ' selected' : ''}`} onClick={() => setPaymentMethod('upi')}>
                      <div className="don-pay-card-head">
                        <span className="don-pay-radio">{paymentMethod === 'upi' ? '●' : '○'}</span>
                        <span className="don-pay-name">UPI</span>
                        <span className="don-pay-rec">Recommended</span>
                      </div>
                      {paymentMethod === 'upi' && (
                        <div className="don-pay-fields">
                          <input className="don-input" placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} onClick={e => e.stopPropagation()} />
                        </div>
                      )}
                    </div>

                    {/* Card */}
                    <div className={`don-pay-card${paymentMethod === 'card' ? ' selected' : ''}`} onClick={() => setPaymentMethod('card')}>
                      <div className="don-pay-card-head">
                        <span className="don-pay-radio">{paymentMethod === 'card' ? '●' : '○'}</span>
                        <span className="don-pay-name">Credit / Debit Card</span>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="don-pay-fields" onClick={e => e.stopPropagation()}>
                          <input className="don-input" placeholder="Card number" value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))} />
                          <div className="don-card-row">
                            <input className="don-input" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value.slice(0, 5))} />
                            <input className="don-input" placeholder="CVV" type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Net Banking */}
                    <div className={`don-pay-card${paymentMethod === 'netbanking' ? ' selected' : ''}`} onClick={() => setPaymentMethod('netbanking')}>
                      <div className="don-pay-card-head">
                        <span className="don-pay-radio">{paymentMethod === 'netbanking' ? '●' : '○'}</span>
                        <span className="don-pay-name">Net Banking</span>
                      </div>
                      {paymentMethod === 'netbanking' && (
                        <div className="don-pay-fields" onClick={e => e.stopPropagation()}>
                          <select className="don-select" value={selectedBank} onChange={e => setSelectedBank(e.target.value)}>
                            <option value="">Select your bank</option>
                            {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order summary */}
                  <div className="don-order">
                    <div className="don-order-title">Order Summary</div>
                    <div className="don-order-row"><span>Campaign</span><span>General Fund</span></div>
                    <div className="don-order-row"><span>Amount</span><span>{formatAmount(effectiveAmount)}</span></div>
                    <div className="don-order-row"><span>Name</span><span>{form.fullName}</span></div>
                    <div className="don-order-row"><span>Email</span><span>{form.email}</span></div>
                    <div className="don-order-divider" />
                    <div className="don-order-row don-order-total"><span>Total</span><span>{formatAmount(effectiveAmount)}</span></div>
                  </div>

                  <div className="don-btn-row">
                    <button type="button" className="don-btn don-btn-back" onClick={() => goStep(2)}>← Back</button>
                    <button
                      type="button"
                      className={`don-btn don-btn-pay${!paymentMethod || processing ? ' disabled' : ''}`}
                      disabled={!paymentMethod || processing}
                      onClick={handlePay}
                    >
                      {processing ? <span className="don-spinner" /> : `Pay ${formatAmount(effectiveAmount)} →`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
