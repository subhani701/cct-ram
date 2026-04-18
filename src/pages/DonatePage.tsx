import { useState, useEffect } from 'react'

type PaymentMethod = 'upi' | 'card' | 'netbanking' | ''

interface DonorForm {
  fullName: string
  email: string
  phone: string
  pan: string
  wantsUpdates: boolean
}

const PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000]

const IMPACT_MESSAGES: Record<number, string> = {
  100: 'can fund emergency blood supplies',
  500: 'can fund 1 blood transfusion session',
  1000: 'can fund 2 transfusion sessions',
  2500: 'can fund a week of patient care',
  5000: 'can fund 10 transfusion sessions',
}

function getImpactMessage(amount: number): string {
  if (amount >= 5000) return IMPACT_MESSAGES[5000]
  if (amount >= 2500) return IMPACT_MESSAGES[2500]
  if (amount >= 1000) return IMPACT_MESSAGES[1000]
  if (amount >= 500) return IMPACT_MESSAGES[500]
  return IMPACT_MESSAGES[100]
}

const BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Union Bank of India',
  'Canara Bank',
  'Indian Bank',
]

const STEP_LABELS = ['Amount', 'Your Details', 'Payment']

function generateTxnId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let suffix = ''
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)]
  }
  return `TXN-2026-04-16-${suffix}`
}

export default function DonatePage() {
  const [step, setStep] = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next')

  // Step 1
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  // Step 2
  const [form, setForm] = useState<DonorForm>({
    fullName: '',
    email: '',
    phone: '',
    pan: '',
    wantsUpdates: true,
  })

  // Step 3
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [selectedBank, setSelectedBank] = useState('')

  // Processing & success
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [txnId, setTxnId] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const amount = isCustom ? (parseInt(customAmount) || 0) : (selectedPreset || 0)

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

  const handlePresetClick = (val: number) => {
    setSelectedPreset(val)
    setIsCustom(false)
    setCustomAmount('')
  }

  const handleCustomFocus = () => {
    setIsCustom(true)
    setSelectedPreset(null)
  }

  const handleCustomChange = (val: string) => {
    const num = val.replace(/\D/g, '')
    setCustomAmount(num)
    setIsCustom(true)
    setSelectedPreset(null)
  }

  const formatAmount = (n: number) => {
    return new Intl.NumberFormat('en-IN').format(n)
  }

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const canProceed1 = amount >= 50
  const canProceed2 = form.fullName.trim().length > 0 && form.email.includes('@') && form.phone.length === 10

  const canPay = (() => {
    if (!paymentMethod) return false
    if (paymentMethod === 'upi') return upiId.includes('@')
    if (paymentMethod === 'card') return cardNumber.replace(/\s/g, '').length >= 12 && cardExpiry.length >= 4 && cardCvv.length >= 3
    if (paymentMethod === 'netbanking') return selectedBank !== ''
    return false
  })()

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setTxnId(generateTxnId())
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://cct.org.in/donate').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const text = `I just donated to the Chiranjeevi Charitable Trust! Join me in supporting the Platelet Separator campaign. Every rupee counts. Donate here: https://cct.org.in/donate`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  // Processing overlay
  if (processing) {
    return (
      <div className="don-page">
        <nav className="don-nav">
          <a href="#/" className="nav-logo">
            <div className="ldot" />
            CCT
          </a>
          <a href="#/" className="don-back-link">Back to Home</a>
        </nav>
        <div className="don-processing">
          <div className="don-processing-spinner" />
          <h2 className="don-processing-title">Processing your donation...</h2>
          <p className="don-processing-desc">Please do not close this window</p>
        </div>
      </div>
    )
  }

  // Success screen
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
            Thank you, {form.fullName.split(' ')[0]}!<br />
            <span className="don-success-accent">Your contribution makes a difference</span>
          </h1>
          <p className="don-success-desc">
            Your generous donation of <strong>{'\u20B9'}{formatAmount(amount)}</strong> will directly support
            the Platelet Separator campaign and help save lives.
          </p>

          <div className="don-receipt">
            <div className="don-receipt-title">Donation Receipt</div>
            <div className="don-receipt-grid">
              <div className="don-receipt-item">
                <span className="don-receipt-label">Amount</span>
                <span className="don-receipt-value don-receipt-amount">{'\u20B9'}{formatAmount(amount)}</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Campaign</span>
                <span className="don-receipt-value">Fund Platelet Separator</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Transaction ID</span>
                <span className="don-receipt-value">{txnId}</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Date</span>
                <span className="don-receipt-value">16 Apr 2026</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Donor</span>
                <span className="don-receipt-value">{form.fullName}</span>
              </div>
              <div className="don-receipt-item">
                <span className="don-receipt-label">Email</span>
                <span className="don-receipt-value">{form.email}</span>
              </div>
            </div>
          </div>

          {form.pan && (
            <div className="don-cert-notice">
              Your 80G tax certificate will be emailed to <strong>{form.email}</strong> within 48 hours
            </div>
          )}

          <div className="don-impact-badge-lg">
            {'\u20B9'}{formatAmount(amount)} {getImpactMessage(amount)}
          </div>

          <div className="don-share-section">
            <div className="don-share-title">Spread the word</div>
            <div className="don-share-btns">
              <button type="button" className="don-share-btn don-share-wa" onClick={handleWhatsAppShare}>
                WhatsApp
              </button>
              <button type="button" className="don-share-btn don-share-copy" onClick={handleCopyLink}>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="don-success-actions">
            <a href="#/" className="don-btn don-btn-primary">Back to Home</a>
            <a href="#/" className="don-btn don-btn-back" onClick={() => {
              const el = document.getElementById('campaigns')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}>Explore More Campaigns</a>
          </div>
        </div>
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

          {/* STEP 1 -- Campaign & Amount */}
          {step === 1 && (
            <div className="don-card">
              {/* Campaign context bar */}
              <div className="don-campaign-bar">
                <div className="don-campaign-info">
                  <span className="don-campaign-badge">Active Campaign</span>
                  <span className="don-campaign-name">Fund Platelet Separator</span>
                </div>
                <div className="don-campaign-progress-row">
                  <span className="don-campaign-raised">{'\u20B9'}12.4L of {'\u20B9'}18L raised</span>
                </div>
                <div className="don-campaign-bar-bg">
                  <div className="don-campaign-bar-fill" style={{ width: '68.9%' }} />
                </div>
              </div>

              <div className="don-card-header">
                <div className="don-card-eyebrow">Step 1 of 3</div>
                <h2 className="don-card-title">Choose Your Amount</h2>
                <p className="don-card-desc">Every contribution brings us closer to saving lives</p>
              </div>

              <div className="don-amount-grid">
                {PRESET_AMOUNTS.map(val => (
                  <button
                    key={val}
                    type="button"
                    className={`don-amount-btn${selectedPreset === val && !isCustom ? ' active' : ''}`}
                    onClick={() => handlePresetClick(val)}
                  >
                    <span className="don-amount-val">{'\u20B9'}{formatAmount(val)}</span>
                    {val === 500 && <span className="don-amount-popular">Most Popular</span>}
                  </button>
                ))}
              </div>

              <div className="don-custom-wrap">
                <label className="don-label">Or enter a custom amount</label>
                <div className="don-custom-input-wrap">
                  <span className="don-custom-prefix">{'\u20B9'}</span>
                  <input
                    type="text"
                    className="don-input don-input-custom"
                    placeholder="Enter amount (min. 50)"
                    value={customAmount}
                    onFocus={handleCustomFocus}
                    onChange={e => handleCustomChange(e.target.value)}
                  />
                </div>
                {isCustom && customAmount && parseInt(customAmount) < 50 && (
                  <div className="don-amount-error">Minimum donation amount is {'\u20B9'}50</div>
                )}
              </div>

              {amount >= 50 && (
                <div className="don-impact">
                  <span className="don-impact-icon">&#10084;</span>
                  <span className="don-impact-text">
                    <strong>{'\u20B9'}{formatAmount(amount)}</strong> {getImpactMessage(amount)}
                  </span>
                </div>
              )}

              <div className="don-actions don-actions-single">
                <button
                  type="button"
                  className={`don-btn don-btn-primary don-btn-full${!canProceed1 ? ' disabled' : ''}`}
                  disabled={!canProceed1}
                  onClick={() => goStep(2)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 -- Donor Details */}
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
                    <span className="don-phone-prefix">+91</span>
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
                  />
                  <span className="don-hint">Required for 80G tax certificate. Your PAN is encrypted and secure</span>
                </div>
              </div>

              <label className="don-checkbox-wrap">
                <input
                  type="checkbox"
                  className="don-checkbox"
                  checked={form.wantsUpdates}
                  onChange={e => set('wantsUpdates', e.target.checked)}
                />
                <span className="don-checkbox-custom" />
                <span className="don-checkbox-label">I'd like to receive impact updates about this campaign</span>
              </label>

              <div className="don-security-strip">
                <span className="don-security-icon">&#128274;</span>
                <span className="don-security-text">256-bit encrypted &middot; Your data is safe</span>
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
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 -- Payment Method */}
          {step === 3 && (
            <div className="don-payment-layout">
              <div className="don-card don-card-payment">
                <div className="don-card-header">
                  <div className="don-card-eyebrow">Step 3 of 3</div>
                  <h2 className="don-card-title">Choose Payment Method</h2>
                </div>

                {/* UPI */}
                <div
                  className={`don-pay-option${paymentMethod === 'upi' ? ' active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="don-pay-option-head">
                    <div className={`don-radio${paymentMethod === 'upi' ? ' checked' : ''}`} />
                    <span className="don-pay-option-label">UPI</span>
                    <span className="don-pay-recommended">Recommended</span>
                  </div>
                  {paymentMethod === 'upi' && (
                    <div className="don-pay-option-body">
                      <div className="don-field don-field-full">
                        <label className="don-label">UPI ID</label>
                        <input
                          type="text"
                          className="don-input"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card */}
                <div
                  className={`don-pay-option${paymentMethod === 'card' ? ' active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="don-pay-option-head">
                    <div className={`don-radio${paymentMethod === 'card' ? ' checked' : ''}`} />
                    <span className="don-pay-option-label">Credit / Debit Card</span>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="don-pay-option-body" onClick={e => e.stopPropagation()}>
                      <div className="don-field don-field-full">
                        <label className="don-label">Card Number</label>
                        <input
                          type="text"
                          className="don-input"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                          autoFocus
                        />
                      </div>
                      <div className="don-card-row">
                        <div className="don-field">
                          <label className="don-label">Expiry</label>
                          <input
                            type="text"
                            className="don-input"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={e => {
                              let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                              if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2)
                              setCardExpiry(v)
                            }}
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
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Net Banking */}
                <div
                  className={`don-pay-option${paymentMethod === 'netbanking' ? ' active' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <div className="don-pay-option-head">
                    <div className={`don-radio${paymentMethod === 'netbanking' ? ' checked' : ''}`} />
                    <span className="don-pay-option-label">Net Banking</span>
                  </div>
                  {paymentMethod === 'netbanking' && (
                    <div className="don-pay-option-body" onClick={e => e.stopPropagation()}>
                      <div className="don-field don-field-full">
                        <label className="don-label">Select Bank</label>
                        <select
                          className="don-select"
                          value={selectedBank}
                          onChange={e => setSelectedBank(e.target.value)}
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

                <div className="don-actions don-actions-single">
                  <button type="button" className="don-btn don-btn-back" onClick={() => goStep(2)}>
                    Back
                  </button>
                  <button
                    type="button"
                    className={`don-btn don-btn-submit${!canPay ? ' disabled' : ''}`}
                    disabled={!canPay}
                    onClick={handlePay}
                  >
                    Pay {'\u20B9'}{formatAmount(amount)}
                  </button>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="don-order-summary">
                <div className="don-order-title">Order Summary</div>
                <div className="don-order-items">
                  <div className="don-order-row">
                    <span className="don-order-label">Campaign</span>
                    <span className="don-order-value">Fund Platelet Separator</span>
                  </div>
                  <div className="don-order-row">
                    <span className="don-order-label">Donor</span>
                    <span className="don-order-value">{form.fullName}</span>
                  </div>
                  <div className="don-order-row">
                    <span className="don-order-label">Email</span>
                    <span className="don-order-value">{form.email}</span>
                  </div>
                  <div className="don-order-divider" />
                  <div className="don-order-row don-order-total">
                    <span className="don-order-label">Total</span>
                    <span className="don-order-value">{'\u20B9'}{formatAmount(amount)}</span>
                  </div>
                </div>
                <div className="don-order-trust">
                  <span>&#128274;</span> Secure, encrypted payment
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
