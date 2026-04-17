import { useCallback, useEffect, useMemo, useState } from 'react'

type PaymentModalProps = {
  open: boolean
  onClose: () => void
  initialAmount?: string
  campaignName?: string
}

const PRESET_AMOUNTS = ['100', '500', '1000', '2500', '5000'] as const
const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank'] as const

type PaymentMethod = 'upi' | 'card' | 'netbanking'

export function PaymentModal({ open, onClose, initialAmount, campaignName }: PaymentModalProps) {
  const [step, setStep] = useState(1)

  // Step 1 state
  const [amount, setAmount] = useState(initialAmount || '500')
  const [amtSel, setAmtSel] = useState<string>(initialAmount || '500')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // Step 2 state
  const [payMethod, setPayMethod] = useState<PaymentMethod>('upi')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [bank, setBank] = useState<(typeof BANKS)[number]>(BANKS[0])
  const [paying, setPaying] = useState(false)

  // Step 3 state
  const [txnId, setTxnId] = useState('')

  const campaign = campaignName || 'General Fund'

  // Reset when opened
  useEffect(() => {
    if (open) {
      setStep(1)
      setAmount(initialAmount || '500')
      setAmtSel(initialAmount || '500')
      setName('')
      setPhone('')
      setEmail('')
      setPayMethod('upi')
      setUpiId('')
      setCardNumber('')
      setCardExpiry('')
      setCardCvv('')
      setBank(BANKS[0])
      setPaying(false)
      setTxnId('')
    }
  }, [open, initialAmount])

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const pickAmt = useCallback((val: string) => {
    setAmtSel(val)
    if (val !== 'other') setAmount(val)
  }, [])

  const phoneValid = /^\d{10}$/.test(phone)
  const canContinue = name.trim().length > 0 && phoneValid

  const formattedAmount = useMemo(() => {
    const n = Number(amount)
    if (!n || n <= 0) return '0'
    return n.toLocaleString('en-IN')
  }, [amount])

  const sessions = useMemo(() => {
    const n = Number(amount)
    if (!n || n <= 0) return 0
    return Math.floor(n / 500)
  }, [amount])

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      setTxnId(`TXN-2026-${Math.random().toString(36).slice(2, 7).toUpperCase()}`)
      setStep(3)
    }, 3000)
  }

  const handleBackdropClick = () => {
    if (step !== 3) {
      onClose()
    }
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `I just donated \u20B9${formattedAmount} to ${campaign} via CCT (Chiranjeevi Charitable Trust)! Every contribution counts. Join me: https://cct.org.in`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  if (!open) return null

  return (
    <div className="pm-overlay" onClick={handleBackdropClick}>
      <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="pm-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Progress dots */}
        <div className="pm-dots">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`pm-dot${step === s ? ' active' : ''}${step > s ? ' done' : ''}`} />
          ))}
        </div>

        {/* Step 1 */}
        <div className={`pm-step${step === 1 ? ' pm-step-active' : ''}`}>
          <div className="pm-campaign-label">{campaign}</div>
          <h3 className="pm-title">Choose Amount</h3>

          <div className="pm-amounts">
            {PRESET_AMOUNTS.map((v) => (
              <button
                key={v}
                type="button"
                className={`pm-amt-btn${amtSel === v ? ' sel' : ''}`}
                onClick={() => pickAmt(v)}
              >
                {v === '500' && <span className="pm-popular">Popular</span>}
                {'\u20B9'}{Number(v).toLocaleString('en-IN')}
              </button>
            ))}
            <button
              type="button"
              className={`pm-amt-btn${amtSel === 'other' ? ' sel' : ''}`}
              onClick={() => pickAmt('other')}
            >
              Custom
            </button>
          </div>

          <div className="pm-input-wrap">
            <span className="pm-input-prefix">{'\u20B9'}</span>
            <input
              type="number"
              className="pm-input"
              value={amount}
              placeholder="Enter amount"
              onChange={(e) => {
                setAmount(e.target.value)
                setAmtSel('other')
              }}
            />
          </div>

          <div className="pm-field">
            <label className="pm-label">Full Name *</label>
            <input
              type="text"
              className="pm-input pm-input-full"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="pm-field">
            <label className="pm-label">Phone *</label>
            <div className="pm-input-wrap">
              <span className="pm-input-prefix pm-input-prefix-sm">+91</span>
              <input
                type="tel"
                className="pm-input"
                placeholder="10-digit number"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
          </div>

          <div className="pm-field">
            <label className="pm-label">Email <span className="pm-hint">(For 80G tax certificate)</span></label>
            <input
              type="email"
              className="pm-input pm-input-full"
              placeholder="Optional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="pm-primary-btn"
            disabled={!canContinue}
            onClick={() => setStep(2)}
          >
            Continue to Payment {'\u2192'}
          </button>
        </div>

        {/* Step 2 */}
        <div className={`pm-step${step === 2 ? ' pm-step-active' : ''}`}>
          <button type="button" className="pm-back" onClick={() => setStep(1)}>
            {'\u2190'} Back
          </button>

          <div className="pm-summary">
            <div className="pm-summary-row">
              <span>Amount</span>
              <strong>{'\u20B9'}{formattedAmount}</strong>
            </div>
            <div className="pm-summary-row">
              <span>Campaign</span>
              <span>{campaign}</span>
            </div>
            <div className="pm-summary-row">
              <span>Donor</span>
              <span>{name}</span>
            </div>
          </div>

          <h3 className="pm-title" style={{ marginTop: 20 }}>Payment Method</h3>

          <div className="pm-methods">
            <button
              type="button"
              className={`pm-method-card${payMethod === 'upi' ? ' sel' : ''}`}
              onClick={() => setPayMethod('upi')}
            >
              <div className="pm-method-top">
                <span className="pm-method-icon">📱</span>
                <span className="pm-method-name">UPI</span>
                <span className="pm-rec-badge">Recommended</span>
              </div>
            </button>
            <button
              type="button"
              className={`pm-method-card${payMethod === 'card' ? ' sel' : ''}`}
              onClick={() => setPayMethod('card')}
            >
              <div className="pm-method-top">
                <span className="pm-method-icon">💳</span>
                <span className="pm-method-name">Credit / Debit Card</span>
              </div>
            </button>
            <button
              type="button"
              className={`pm-method-card${payMethod === 'netbanking' ? ' sel' : ''}`}
              onClick={() => setPayMethod('netbanking')}
            >
              <div className="pm-method-top">
                <span className="pm-method-icon">🏦</span>
                <span className="pm-method-name">Net Banking</span>
              </div>
            </button>
          </div>

          {payMethod === 'upi' && (
            <div className="pm-method-fields">
              <div className="pm-field">
                <label className="pm-label">UPI ID</label>
                <input
                  type="text"
                  className="pm-input pm-input-full"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            </div>
          )}

          {payMethod === 'card' && (
            <div className="pm-method-fields">
              <div className="pm-field">
                <label className="pm-label">Card Number</label>
                <input
                  type="text"
                  className="pm-input pm-input-full"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  maxLength={19}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="pm-field-row">
                <div className="pm-field" style={{ flex: 1 }}>
                  <label className="pm-label">Expiry</label>
                  <input
                    type="text"
                    className="pm-input pm-input-full"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    maxLength={5}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                </div>
                <div className="pm-field" style={{ flex: 1 }}>
                  <label className="pm-label">CVV</label>
                  <input
                    type="password"
                    className="pm-input pm-input-full"
                    placeholder="***"
                    value={cardCvv}
                    maxLength={4}
                    onChange={(e) => setCardCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {payMethod === 'netbanking' && (
            <div className="pm-method-fields">
              <div className="pm-field">
                <label className="pm-label">Select Bank</label>
                <select
                  className="pm-select"
                  value={bank}
                  onChange={(e) => setBank(e.target.value as (typeof BANKS)[number])}
                >
                  {BANKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            type="button"
            className={`pm-primary-btn pm-pay-btn${paying ? ' pm-paying' : ''}`}
            onClick={handlePay}
            disabled={paying}
          >
            {paying ? (
              <span className="pm-pulse-text">Processing...</span>
            ) : (
              <>Pay {'\u20B9'}{formattedAmount}</>
            )}
          </button>
        </div>

        {/* Step 3 */}
        <div className={`pm-step${step === 3 ? ' pm-step-active' : ''}`}>
          <div className="pm-success-check">
            <svg className="pm-check-svg" viewBox="0 0 80 80" fill="none">
              <circle className="pm-check-circle" cx="40" cy="40" r="36" stroke="var(--green)" strokeWidth="3" />
              <path className="pm-check-path" d="M24 40L35 51L56 30" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h3 className="pm-success-title">Thank you, {name}!</h3>

          <div className="pm-receipt">
            <div className="pm-receipt-row">
              <span>Amount</span>
              <strong>{'\u20B9'}{formattedAmount}</strong>
            </div>
            <div className="pm-receipt-row">
              <span>Campaign</span>
              <span>{campaign}</span>
            </div>
            <div className="pm-receipt-row">
              <span>Transaction ID</span>
              <span className="pm-txn">{txnId}</span>
            </div>
            <div className="pm-receipt-row">
              <span>Date</span>
              <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="pm-cert-note">
            80G certificate will be emailed within 48 hours
          </div>

          {sessions > 0 && (
            <div className="pm-impact">
              Your {'\u20B9'}{formattedAmount} can fund <strong>{sessions} blood transfusion session{sessions > 1 ? 's' : ''}</strong>
            </div>
          )}

          <div className="pm-success-btns">
            <button type="button" className="pm-wa-btn" onClick={handleWhatsApp}>
              Share on WhatsApp
            </button>
            <button type="button" className="pm-done-btn" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
