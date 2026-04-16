import { useState, useEffect } from 'react'

interface DonorForm {
  fullName: string
  email: string
  phone: string
  pan: string
  impactUpdates: boolean
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | ''

const PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000]

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank']

function getImpactText(amount: number): string {
  if (amount <= 0) return ''
  if (amount < 500) return 'covers basic supplies for 1 transfusion'
  if (amount < 1000) return 'funds 1 complete blood transfusion session'
  if (amount < 2500) return `funds ${Math.floor(amount / 500)} transfusion sessions`
  if (amount < 5000) return `funds ${Math.floor(amount / 500)} transfusion sessions`
  return `funds ${Math.floor(amount / 500)} transfusion sessions`
}

function getImpactForPreset(amount: number): string {
  switch (amount) {
    case 100: return 'covers basic supplies for 1 transfusion'
    case 500: return 'funds 1 complete blood transfusion session'
    case 1000: return 'funds 2 transfusion sessions'
    case 2500: return 'funds 5 transfusion sessions'
    case 5000: return 'funds 10 transfusion sessions'
    default: return getImpactText(amount)
  }
}

function formatAmount(n: number): string {
  return n.toLocaleString('en-IN')
}

const STEP_LABELS = ['Amount', 'Details', 'Payment']

export default function ContributePage() {
  const [step, setStep] = useState(1)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [form, setForm] = useState<DonorForm>({
    fullName: '',
    email: '',
    phone: '',
    pan: '',
    impactUpdates: true,
  })
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
  const [txnId] = useState(() => {
    const rand = Math.floor(10000 + Math.random() * 90000)
    return `TXN-2026-04-16-${rand}`
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const effectiveAmount = isCustom ? (parseInt(customAmount) || 0) : (selectedAmount || 0)
  const impactText = isCustom
    ? getImpactText(parseInt(customAmount) || 0)
    : (selectedAmount ? getImpactForPreset(selectedAmount) : '')

  const set = <K extends keyof DonorForm>(key: K, val: DonorForm[K]) => {
    setForm(prev => ({ ...prev, [key]: val }))
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

  const selectPreset = (amount: number) => {
    setSelectedAmount(amount)
    setIsCustom(false)
    setCustomAmount('')
  }

  const handleCustomInput = (val: string) => {
    const cleaned = val.replace(/\D/g, '')
    setCustomAmount(cleaned)
    setIsCustom(true)
    setSelectedAmount(null)
  }

  const canProceed1 = effectiveAmount > 0
  const canProceed2 = form.fullName.trim() && form.email.trim() && form.phone.length >= 10
  const canPay = paymentMethod !== '' && (
    (paymentMethod === 'upi' && upiId.includes('@')) ||
    (paymentMethod === 'card' && cardNumber.length >= 16 && cardExpiry.length >= 5 && cardCvv.length >= 3) ||
    (paymentMethod === 'netbanking' && selectedBank !== '')
  )

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 3000)
  }

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'copy') => {
    const text = `I just contributed ₹${formatAmount(effectiveAmount)} to the Thalassemia Children's Fund via CCT. Every rupee saves a life. Join me!`
    const url = window.location.href
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    } else {
      navigator.clipboard.writeText(text + ' ' + url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16)
    return cleaned.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4)
    if (cleaned.length > 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2)
    return cleaned
  }

  if (success) {
    return (
      <div className="don-page">
        <nav className="don-nav">
          <a href="#/" className="nav-logo">
            <div className="ldot" />
            CCT
          </a>
          <a href="#/" className="don-back-link">Back to Home</a>
        </nav>
        <div className="don-success">
          <div className="don-success-icon">&#10003;</div>
          <h1 className="don-success-title">
            Thank you, <span className="don-success-name">{form.fullName.split(' ')[0]}</span>!
            <br />Your contribution makes a difference
          </h1>

          <div className="don-receipt">
            <div className="don-receipt-header">Donation Receipt</div>
            <div className="don-receipt-grid">
              <div className="don-receipt-item">
                <span className="don-receipt-label">Amount</span>
                <span className="don-receipt-value don-receipt-amount">₹{formatAmount(effectiveAmount)}</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Campaign</span>
                <span className="don-receipt-value">Thalassemia Children's Fund</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Transaction ID</span>
                <span className="don-receipt-value">{txnId}</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Date</span>
                <span className="don-receipt-value">16 April 2026</span>
              </div>
            </div>
          </div>

          {form.pan && (
            <div className="don-tax-note">
              <span className="don-tax-icon">📄</span>
              Your 80G certificate will be emailed to <strong>{form.email}</strong> within 48 hours
            </div>
          )}

          <div className="don-impact-final">
            <span className="don-impact-final-icon">💛</span>
            Your ₹{formatAmount(effectiveAmount)} {impactText}
          </div>

          <div className="don-share-section">
            <div className="don-share-title">Spread the word</div>
            <div className="don-share-btns">
              <button type="button" className="don-share-btn don-share-wa" onClick={() => handleShare('whatsapp')}>
                WhatsApp
              </button>
              <button type="button" className="don-share-btn don-share-tw" onClick={() => handleShare('twitter')}>
                X (Twitter)
              </button>
              <button type="button" className="don-share-btn don-share-cp" onClick={() => handleShare('copy')}>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="don-success-actions">
            <a href="#/" className="don-btn don-btn-primary">Explore More Campaigns</a>
            <a href="#/register" className="don-btn don-btn-back">Register as Blood Donor</a>
          </div>
        </div>
        <footer className="don-footer">
          <div className="don-footer-inner">
            <span>&copy; 2026 Chiranjeevi Charitable Trust &middot; Hyderabad</span>
            <span>Built by <strong>VoltusWave</strong></span>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="don-page">
      <nav className="don-nav">
        <a href="#/" className="nav-logo">
          <div className="ldot" />
          CCT
        </a>
        <a href="#/" className="don-back-link">Back to Home</a>
      </nav>

      {/* Progress Bar */}
      <div className="don-progress">
        <div className="don-progress-inner">
          {[1, 2, 3].map(s => (
            <div key={s} className="don-step-group">
              <div className={`don-step-dot${step >= s ? ' active' : ''}${step > s ? ' done' : ''}`}>
                {step > s ? '\u2713' : s}
              </div>
              <span className={`don-step-label${step >= s ? ' active' : ''}`}>
                {STEP_LABELS[s - 1]}
              </span>
            </div>
          ))}
          <div className="don-progress-line">
            <div className="don-progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="don-container">
        <div className={`don-step-content${transitioning ? (slideDir === 'next' ? ' don-slide-out-left' : ' don-slide-out-right') : ' don-slide-in'}`}>

          {/* STEP 1 — Amount Selection */}
          {step === 1 && (
            <div className="don-card">
              {/* Campaign Context Header */}
              <div className="don-campaign-header">
                <div className="don-campaign-badge">Featured Campaign</div>
                <div className="don-campaign-name">Thalassemia Children's Fund</div>
                <div className="don-campaign-bar-meta">
                  <span className="don-campaign-raised">₹8,40,000 raised</span>
                  <span className="don-campaign-goal">Goal: ₹12,00,000</span>
                </div>
                <div className="don-campaign-bar">
                  <div className="don-campaign-fill" style={{ width: '70%' }} />
                </div>
              </div>

              <div className="don-card-header">
                <div className="don-card-eyebrow">Step 1 of 3</div>
                <h2 className="don-card-title">Choose Your Amount</h2>
                <p className="don-card-desc">Every contribution helps save a child's life</p>
              </div>

              <div className="don-amounts-grid">
                {PRESET_AMOUNTS.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    className={`don-amt-btn${selectedAmount === amt && !isCustom ? ' selected' : ''}`}
                    onClick={() => selectPreset(amt)}
                  >
                    <span className="don-amt-value">₹{formatAmount(amt)}</span>
                    {amt === 500 && <span className="don-amt-badge">Most Popular</span>}
                  </button>
                ))}
              </div>

              <div className="don-custom-wrap">
                <label className="don-custom-label">Or enter a custom amount</label>
                <div className="don-custom-input-wrap">
                  <span className="don-custom-prefix">₹</span>
                  <input
                    type="text"
                    className="don-custom-input"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={e => handleCustomInput(e.target.value)}
                    inputMode="numeric"
                  />
                </div>
              </div>

              {effectiveAmount > 0 && impactText && (
                <div className="don-impact-preview">
                  <span className="don-impact-icon">💛</span>
                  <span>Your ₹{formatAmount(effectiveAmount)} <strong>{impactText}</strong></span>
                </div>
              )}

              <div className="don-actions">
                <div />
                <button
                  type="button"
                  className={`don-btn don-btn-primary${!canProceed1 ? ' disabled' : ''}`}
                  disabled={!canProceed1}
                  onClick={() => goStep(2)}
                >
                  Continue &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Donor Details */}
          {step === 2 && (
            <div className="don-card">
              <div className="don-card-header">
                <div className="don-card-eyebrow">Step 2 of 3</div>
                <h2 className="don-card-title">Your Details</h2>
                <p className="don-card-desc">No account needed. We just need a few details</p>
              </div>

              <div className="don-form-grid">
                <div className="don-field don-field-full">
                  <label className="don-label">Full Name <span className="don-req">*</span></label>
                  <input
                    type="text"
                    className="don-input"
                    placeholder="e.g. Ramesh Kumar"
                    value={form.fullName}
                    onChange={e => set('fullName', e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="don-field">
                  <label className="don-label">Email Address <span className="don-req">*</span></label>
                  <input
                    type="email"
                    className="don-input"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                </div>

                <div className="don-field">
                  <label className="don-label">Phone Number <span className="don-req">*</span></label>
                  <div className="don-phone-wrap">
                    <span className="don-phone-prefix">
                      <span className="don-phone-flag">{'\u{1F1EE}\u{1F1F3}'}</span> +91
                    </span>
                    <input
                      type="tel"
                      className="don-input don-input-phone"
                      placeholder="98765 43210"
                      maxLength={10}
                      value={form.phone}
                      onChange={e => set('phone', e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>

                <div className="don-field don-field-full">
                  <label className="don-label">PAN Number <span className="don-optional">(optional)</span></label>
                  <input
                    type="text"
                    className="don-input"
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    value={form.pan}
                    onChange={e => set('pan', e.target.value.toUpperCase())}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <span className="don-hint">Required for 80G tax certificate. Your PAN is encrypted and secure</span>
                </div>
              </div>

              <label className="don-checkbox-row">
                <input
                  type="checkbox"
                  className="don-checkbox"
                  checked={form.impactUpdates}
                  onChange={e => set('impactUpdates', e.target.checked)}
                />
                <span className="don-checkbox-label">I'd like to receive impact updates about this campaign</span>
              </label>

              <div className="don-security-strip">
                <span>&#128274; 256-bit encrypted</span>
                <span className="don-security-dot">&middot;</span>
                <span>PCI-DSS compliant</span>
                <span className="don-security-dot">&middot;</span>
                <span>Your data is safe</span>
              </div>

              <div className="don-actions">
                <button type="button" className="don-btn don-btn-back" onClick={() => goStep(1)}>
                  Back
                </button>
                <button
                  type="button"
                  className={`don-btn don-btn-primary${!canProceed2 ? ' disabled' : ''}`}
                  disabled={!canProceed2}
                  onClick={() => goStep(3)}
                >
                  Proceed to Payment &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Payment Method */}
          {step === 3 && !processing && (
            <div className="don-payment-layout">
              {/* Order Summary — shown first on mobile */}
              <div className="don-order-summary don-order-mobile">
                <div className="don-order-title">Order Summary</div>
                <div className="don-order-items">
                  <div className="don-order-row">
                    <span className="don-order-label">Campaign</span>
                    <span className="don-order-value">Thalassemia Children's Fund</span>
                  </div>
                  <div className="don-order-row">
                    <span className="don-order-label">Amount</span>
                    <span className="don-order-value don-order-amount">₹{formatAmount(effectiveAmount)}</span>
                  </div>
                  <div className="don-order-row">
                    <span className="don-order-label">Donor</span>
                    <span className="don-order-value">{form.fullName}</span>
                  </div>
                  <div className="don-order-row">
                    <span className="don-order-label">Email</span>
                    <span className="don-order-value">{form.email}</span>
                  </div>
                </div>
              </div>

              <div className="don-payment-left">
                <div className="don-card">
                  <div className="don-card-header">
                    <div className="don-card-eyebrow">Step 3 of 3</div>
                    <h2 className="don-card-title">Choose Payment Method</h2>
                  </div>

                  {/* UPI */}
                  <div
                    className={`don-pay-option${paymentMethod === 'upi' ? ' selected' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="don-pay-option-header">
                      <div className="don-pay-radio">
                        <div className={`don-pay-radio-inner${paymentMethod === 'upi' ? ' checked' : ''}`} />
                      </div>
                      <span className="don-pay-option-title">UPI</span>
                      <span className="don-pay-recommended">Recommended</span>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="don-pay-option-body">
                        <div className="don-field">
                          <label className="don-label">UPI ID</label>
                          <input
                            type="text"
                            className="don-input"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={e => setUpiId(e.target.value)}
                            onClick={e => e.stopPropagation()}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`don-pay-option${paymentMethod === 'card' ? ' selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="don-pay-option-header">
                      <div className="don-pay-radio">
                        <div className={`don-pay-radio-inner${paymentMethod === 'card' ? ' checked' : ''}`} />
                      </div>
                      <span className="don-pay-option-title">Credit / Debit Card</span>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="don-pay-option-body">
                        <div className="don-field don-field-full">
                          <label className="don-label">Card Number</label>
                          <input
                            type="text"
                            className="don-input"
                            placeholder="1234 5678 9012 3456"
                            value={formatCardNumber(cardNumber)}
                            onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            onClick={e => e.stopPropagation()}
                            maxLength={19}
                          />
                        </div>
                        <div className="don-pay-card-row">
                          <div className="don-field">
                            <label className="don-label">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              className="don-input"
                              placeholder="MM/YY"
                              value={formatExpiry(cardExpiry)}
                              onChange={e => setCardExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              onClick={e => e.stopPropagation()}
                              maxLength={5}
                            />
                          </div>
                          <div className="don-field">
                            <label className="don-label">CVV</label>
                            <input
                              type="password"
                              className="don-input"
                              placeholder="***"
                              value={cardCvv}
                              onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              onClick={e => e.stopPropagation()}
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Net Banking */}
                  <div
                    className={`don-pay-option${paymentMethod === 'netbanking' ? ' selected' : ''}`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <div className="don-pay-option-header">
                      <div className="don-pay-radio">
                        <div className={`don-pay-radio-inner${paymentMethod === 'netbanking' ? ' checked' : ''}`} />
                      </div>
                      <span className="don-pay-option-title">Net Banking</span>
                    </div>
                    {paymentMethod === 'netbanking' && (
                      <div className="don-pay-option-body">
                        <div className="don-field">
                          <label className="don-label">Select Bank</label>
                          <select
                            className="don-select"
                            value={selectedBank}
                            onChange={e => setSelectedBank(e.target.value)}
                            onClick={e => e.stopPropagation()}
                          >
                            <option value="">Choose your bank</option>
                            {BANKS.map(b => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="don-actions" style={{ borderTop: 'none', paddingTop: 16 }}>
                    <button type="button" className="don-btn don-btn-back" onClick={() => goStep(2)}>
                      Back
                    </button>
                    <button
                      type="button"
                      className={`don-btn don-btn-submit${!canPay ? ' disabled' : ''}`}
                      disabled={!canPay}
                      onClick={handlePay}
                    >
                      Pay ₹{formatAmount(effectiveAmount)}
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary — Desktop sidebar */}
              <div className="don-order-summary don-order-desktop">
                <div className="don-order-title">Order Summary</div>
                <div className="don-order-items">
                  <div className="don-order-row">
                    <span className="don-order-label">Campaign</span>
                    <span className="don-order-value">Thalassemia Children's Fund</span>
                  </div>
                  <div className="don-order-row don-order-row-total">
                    <span className="don-order-label">Amount</span>
                    <span className="don-order-value don-order-amount">₹{formatAmount(effectiveAmount)}</span>
                  </div>
                  <div className="don-order-row">
                    <span className="don-order-label">Donor</span>
                    <span className="don-order-value">{form.fullName}</span>
                  </div>
                  <div className="don-order-row">
                    <span className="don-order-label">Email</span>
                    <span className="don-order-value">{form.email}</span>
                  </div>
                </div>
                <div className="don-order-impact">
                  <span className="don-impact-icon">💛</span>
                  {impactText}
                </div>
              </div>
            </div>
          )}

          {/* Processing Animation */}
          {step === 3 && processing && (
            <div className="don-processing">
              <div className="don-processing-spinner" />
              <div className="don-processing-text">Processing your payment...</div>
              <div className="don-processing-sub">Please do not close this window</div>
            </div>
          )}
        </div>
      </div>

      <footer className="don-footer">
        <div className="don-footer-inner">
          <span>&copy; 2026 Chiranjeevi Charitable Trust &middot; Hyderabad</span>
          <span>Built by <strong>VoltusWave</strong></span>
        </div>
      </footer>
    </div>
  )
}
