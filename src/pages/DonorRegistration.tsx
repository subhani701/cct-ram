import { useState, useEffect, useRef, useCallback } from 'react'

type Gender = 'male' | 'female' | 'other' | ''
type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | ''
type StateOption = 'Andhra Pradesh' | 'Telangana' | 'Other' | ''

interface FormData {
  phone: string
  otp: string[]
  otpVerified: boolean
  fullName: string
  dob: string
  gender: Gender
  bloodType: BloodType
  email: string
  city: string
  district: string
  state: StateOption
  pinCode: string
}

const CITIES = [
  'Hyderabad', 'Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati',
  'Nellore', 'Warangal', 'Kakinada', 'Kurnool', 'Rajahmundry',
]

const DISTRICTS: Record<string, string[]> = {
  'Hyderabad': ['Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri'],
  'Vijayawada': ['Krishna', 'NTR'],
  'Visakhapatnam': ['Visakhapatnam', 'Anakapalli'],
  'Guntur': ['Guntur', 'Palnadu'],
  'Tirupati': ['Tirupati', 'Chittoor'],
  'Nellore': ['Sri Potti Sriramulu Nellore'],
  'Warangal': ['Warangal', 'Hanamkonda'],
  'Kakinada': ['Kakinada', 'East Godavari'],
  'Kurnool': ['Kurnool', 'Nandyal'],
  'Rajahmundry': ['East Godavari', 'West Godavari'],
}

const BLOOD_TYPES: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const STEP_LABELS = ['Verify Phone', 'Personal Details', 'Location', 'Confirm']

const initialForm: FormData = {
  phone: '',
  otp: ['', '', '', '', '', ''],
  otpVerified: false,
  fullName: '',
  dob: '',
  gender: '',
  bloodType: '',
  email: '',
  city: '',
  district: '',
  state: '',
  pinCode: '',
}

export default function DonorRegistration() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next')

  // OTP state
  const [otpSent, setOtpSent] = useState(false)
  const [otpSending, setOtpSending] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [otpError, setOtpError] = useState('')
  const [otpVerifying, setOtpVerifying] = useState(false)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer <= 0) return
    const id = setInterval(() => setOtpTimer(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [otpTimer])

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) => {
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

  // Mock send OTP
  const sendOtp = useCallback(() => {
    setOtpSending(true)
    setOtpError('')
    setTimeout(() => {
      setOtpSending(false)
      setOtpSent(true)
      setOtpTimer(30)
      set('otp', ['', '', '', '', '', ''])
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
    }, 1200)
  }, [])

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1)
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...form.otp]
    newOtp[index] = value
    set('otp', newOtp)
    setOtpError('')

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !form.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    const newOtp = [...form.otp]
    for (let i = 0; i < 6; i++) {
      newOtp[i] = text[i] || ''
    }
    set('otp', newOtp)
    const focusIdx = Math.min(text.length, 5)
    otpRefs.current[focusIdx]?.focus()
  }

  // Mock verify OTP
  const verifyOtp = () => {
    const code = form.otp.join('')
    if (code.length < 6) {
      setOtpError('Please enter all 6 digits')
      return
    }
    setOtpVerifying(true)
    setOtpError('')
    setTimeout(() => {
      setOtpVerifying(false)
      set('otpVerified', true)
      setTimeout(() => goStep(2), 800)
    }, 1000)
  }

  const maskedPhone = form.phone ? `+91 ${form.phone.slice(0, 2)}XXX XXX${form.phone.slice(-2)}` : ''

  const canProceed2 = form.fullName.trim() && form.dob && form.gender && form.bloodType
  const canProceed3 = form.city && form.state && form.pinCode.length >= 6

  if (submitted) {
    return (
      <div className="reg-page" style={{ paddingTop: 'var(--nav-h)' }}>
        <div className="reg-success">
          <div className="reg-success-icon">&#10003;</div>
          <h1 className="reg-success-title">
            Welcome to the CCT family,<br />
            <span className="reg-success-name">{form.fullName.split(' ')[0]}!</span>
          </h1>
          <p className="reg-success-desc">
            Your registration is complete. You are now part of a community that has saved over 4,700 lives.
            We will notify you about upcoming blood drives
          </p>
          <div className="reg-success-details">
            <div className="reg-sd-item">
              <span className="reg-sd-label">Donor ID</span>
              <span className="reg-sd-value">CCT-{Math.floor(10000 + Math.random() * 90000)}</span>
            </div>
            <div className="reg-sd-item">
              <span className="reg-sd-label">Blood Type</span>
              <span className="reg-sd-value reg-sd-blood">{form.bloodType}</span>
            </div>
            <div className="reg-sd-item">
              <span className="reg-sd-label">City</span>
              <span className="reg-sd-value">{form.city}</span>
            </div>
          </div>
          <div className="reg-success-actions">
            <a href="#/" className="reg-btn reg-btn-primary">Back to Home</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="reg-page" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Progress Bar */}
      <div className="reg-progress">
        <div className="reg-progress-inner">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="reg-step-group">
              <div className={`reg-step-dot${step >= s ? ' active' : ''}${step > s ? ' done' : ''}`}>
                {step > s ? '\u2713' : s}
              </div>
              <span className={`reg-step-label${step >= s ? ' active' : ''}`}>
                {STEP_LABELS[s - 1]}
              </span>
            </div>
          ))}
          <div className="reg-progress-line">
            <div className="reg-progress-fill" style={{ width: `${((step - 1) / 3) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="reg-container">
        <div className={`reg-step-content${transitioning ? (slideDir === 'next' ? ' reg-slide-out-left' : ' reg-slide-out-right') : ' reg-slide-in'}`}>

          {/* STEP 1 — Phone Verification */}
          {step === 1 && (
            <div className="reg-card">
              <div className="reg-card-header">
                <div className="reg-card-eyebrow">Step 1 of 4</div>
                <h2 className="reg-card-title">Join 28,000+ Blood Donors</h2>
                <p className="reg-card-desc">It takes 2 minutes to register. Your blood can save 3 lives</p>
              </div>

              {!otpSent ? (
                <div className="reg-otp-section">
                  <div className="reg-field reg-field-full">
                    <label className="reg-label">Mobile Number <span className="reg-req">*</span></label>
                    <div className="reg-phone-wrap">
                      <span className="reg-phone-prefix">
                        <span className="reg-phone-flag">🇮🇳</span> +91
                      </span>
                      <input
                        type="tel"
                        className="reg-input reg-input-phone"
                        placeholder="98765 43210"
                        maxLength={10}
                        value={form.phone}
                        onChange={e => set('phone', e.target.value.replace(/\D/g, ''))}
                        autoFocus
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`reg-btn reg-btn-primary reg-btn-full${form.phone.length < 10 || otpSending ? ' disabled' : ''}`}
                    disabled={form.phone.length < 10 || otpSending}
                    onClick={sendOtp}
                  >
                    {otpSending ? (
                      <span className="reg-spinner" />
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </div>
              ) : !form.otpVerified ? (
                <div className="reg-otp-section">
                  <div className="reg-otp-sent-msg">
                    OTP sent to <strong>{maskedPhone}</strong>
                  </div>

                  <div className="reg-field reg-field-full">
                    <label className="reg-label">Enter 6-digit OTP</label>
                    <div className="reg-otp-boxes" onPaste={handleOtpPaste}>
                      {form.otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={el => { otpRefs.current[i] = el }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className={`reg-otp-input${otpError ? ' error' : ''}`}
                          value={digit}
                          onChange={e => handleOtpChange(i, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(i, e)}
                          autoFocus={i === 0}
                        />
                      ))}
                    </div>
                    {otpError && <div className="reg-otp-error">{otpError}</div>}
                  </div>

                  <div className="reg-otp-timer">
                    {otpTimer > 0 ? (
                      <span className="reg-otp-countdown">Resend OTP in 00:{String(otpTimer).padStart(2, '0')}</span>
                    ) : (
                      <button type="button" className="reg-otp-resend" onClick={sendOtp}>
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    className={`reg-btn reg-btn-primary reg-btn-full${form.otp.join('').length < 6 || otpVerifying ? ' disabled' : ''}`}
                    disabled={form.otp.join('').length < 6 || otpVerifying}
                    onClick={verifyOtp}
                  >
                    {otpVerifying ? (
                      <span className="reg-spinner" />
                    ) : (
                      'Verify & Continue'
                    )}
                  </button>

                  <button
                    type="button"
                    className="reg-otp-change"
                    onClick={() => { setOtpSent(false); setOtpError(''); set('otp', ['', '', '', '', '', '']) }}
                  >
                    Change number
                  </button>
                </div>
              ) : (
                <div className="reg-otp-section">
                  <div className="reg-otp-verified">
                    <span className="reg-otp-verified-icon">&#10003;</span>
                    <span>Phone verified — +91 {form.phone}</span>
                  </div>
                  <button
                    type="button"
                    className="reg-btn reg-btn-primary reg-btn-full"
                    onClick={() => goStep(2)}
                  >
                    Continue →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 — Personal Details */}
          {step === 2 && (
            <div className="reg-card">
              <div className="reg-card-header">
                <div className="reg-card-eyebrow">Step 2 of 4</div>
                <h2 className="reg-card-title">Personal Details</h2>
                <p className="reg-card-desc">Tell us about yourself</p>
              </div>

              <div className="reg-form-grid">
                <div className="reg-field reg-field-full">
                  <label className="reg-label">Full Name <span className="reg-req">*</span></label>
                  <input
                    type="text"
                    className="reg-input"
                    placeholder="e.g. Ramesh Kumar"
                    value={form.fullName}
                    onChange={e => set('fullName', e.target.value)}
                  />
                </div>

                <div className="reg-field">
                  <label className="reg-label">Date of Birth <span className="reg-req">*</span></label>
                  <input
                    type="date"
                    className="reg-input"
                    value={form.dob}
                    onChange={e => set('dob', e.target.value)}
                  />
                </div>

                <div className="reg-field">
                  <label className="reg-label">Email <span className="reg-optional">(optional)</span></label>
                  <input
                    type="email"
                    className="reg-input"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                  <span className="reg-hint">For 80G certificates</span>
                </div>

                <div className="reg-field reg-field-full">
                  <label className="reg-label">Gender <span className="reg-req">*</span></label>
                  <div className="reg-pill-row">
                    {(['male', 'female', 'other'] as const).map(g => (
                      <button
                        key={g}
                        type="button"
                        className={`reg-pill${form.gender === g ? ' active' : ''}`}
                        onClick={() => set('gender', g)}
                      >
                        {g === 'male' ? 'Male' : g === 'female' ? 'Female' : 'Other'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="reg-field reg-field-full">
                  <label className="reg-label">Blood Type <span className="reg-req">*</span></label>
                  <div className="reg-blood-row">
                    {BLOOD_TYPES.map(bt => (
                      <button
                        key={bt}
                        type="button"
                        className={`reg-blood-btn${form.bloodType === bt ? ' active' : ''}`}
                        onClick={() => set('bloodType', bt)}
                      >
                        {bt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="reg-actions">
                <button type="button" className="reg-btn reg-btn-back" onClick={() => goStep(1)}>
                  Back
                </button>
                <button
                  type="button"
                  className={`reg-btn reg-btn-primary${!canProceed2 ? ' disabled' : ''}`}
                  disabled={!canProceed2}
                  onClick={() => goStep(3)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Location */}
          {step === 3 && (
            <div className="reg-card">
              <div className="reg-card-header">
                <div className="reg-card-eyebrow">Step 3 of 4</div>
                <h2 className="reg-card-title">Location Details</h2>
                <p className="reg-card-desc">Help us find drives near you</p>
              </div>

              <div className="reg-form-grid">
                <div className="reg-field">
                  <label className="reg-label">State <span className="reg-req">*</span></label>
                  <div className="reg-pill-row">
                    {(['Andhra Pradesh', 'Telangana', 'Other'] as const).map(s => (
                      <button
                        key={s}
                        type="button"
                        className={`reg-pill${form.state === s ? ' active' : ''}`}
                        onClick={() => { set('state', s); set('city', ''); set('district', '') }}
                      >
                        {s === 'Andhra Pradesh' ? 'AP' : s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="reg-field">
                  <label className="reg-label">City <span className="reg-req">*</span></label>
                  <select
                    className="reg-select"
                    value={form.city}
                    onChange={e => { set('city', e.target.value); set('district', '') }}
                  >
                    <option value="">Select city</option>
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="reg-field">
                  <label className="reg-label">District</label>
                  <select
                    className="reg-select"
                    value={form.district}
                    onChange={e => set('district', e.target.value)}
                    disabled={!form.city}
                  >
                    <option value="">Select district</option>
                    {(DISTRICTS[form.city] || []).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="reg-field">
                  <label className="reg-label">Pin Code <span className="reg-req">*</span></label>
                  <input
                    type="text"
                    className="reg-input"
                    placeholder="500001"
                    maxLength={6}
                    value={form.pinCode}
                    onChange={e => set('pinCode', e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              <div className="reg-actions">
                <button type="button" className="reg-btn reg-btn-back" onClick={() => goStep(2)}>
                  Back
                </button>
                <button
                  type="button"
                  className={`reg-btn reg-btn-primary${!canProceed3 ? ' disabled' : ''}`}
                  disabled={!canProceed3}
                  onClick={() => goStep(4)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Confirm */}
          {step === 4 && (
            <div className="reg-card">
              <div className="reg-card-header">
                <div className="reg-card-eyebrow">Step 4 of 4</div>
                <h2 className="reg-card-title">Confirm & Register</h2>
                <p className="reg-card-desc">Review your details and join the CCT donor family</p>
              </div>

              <div className="reg-summary">
                <h3 className="reg-summary-title">Your Details</h3>
                <div className="reg-summary-grid">
                  <div className="reg-summary-item">
                    <span className="reg-summary-label">Name</span>
                    <span className="reg-summary-value">{form.fullName}</span>
                  </div>
                  <div className="reg-summary-item">
                    <span className="reg-summary-label">Phone</span>
                    <span className="reg-summary-value">+91 {form.phone} <span className="reg-verified-badge">Verified</span></span>
                  </div>
                  <div className="reg-summary-item">
                    <span className="reg-summary-label">Date of Birth</span>
                    <span className="reg-summary-value">{form.dob ? new Date(form.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</span>
                  </div>
                  <div className="reg-summary-item">
                    <span className="reg-summary-label">Gender</span>
                    <span className="reg-summary-value" style={{ textTransform: 'capitalize' }}>{form.gender}</span>
                  </div>
                  <div className="reg-summary-item">
                    <span className="reg-summary-label">Blood Type</span>
                    <span className="reg-summary-value reg-summary-blood">{form.bloodType}</span>
                  </div>
                  <div className="reg-summary-item">
                    <span className="reg-summary-label">Location</span>
                    <span className="reg-summary-value">{form.city}{form.district ? `, ${form.district}` : ''}, {form.state}</span>
                  </div>
                  {form.email && (
                    <div className="reg-summary-item">
                      <span className="reg-summary-label">Email</span>
                      <span className="reg-summary-value">{form.email}</span>
                    </div>
                  )}
                  <div className="reg-summary-item">
                    <span className="reg-summary-label">Pin Code</span>
                    <span className="reg-summary-value">{form.pinCode}</span>
                  </div>
                </div>
              </div>

              <div className="reg-actions">
                <button type="button" className="reg-btn reg-btn-back" onClick={() => goStep(3)}>
                  Back
                </button>
                <button type="button" className="reg-btn reg-btn-submit" onClick={() => setSubmitted(true)}>
                  Complete Registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
