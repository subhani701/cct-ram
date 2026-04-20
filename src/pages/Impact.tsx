import '../impact-tw.css'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Heart,
  Droplet,
  Users,
  IndianRupee,
  Building2,
  Stethoscope,
  ArrowRight,
} from 'lucide-react'

const PAGE_CONTAINER = 'mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-10'
const SECTION_PADDING = 'py-16 md:py-20 lg:py-24'
const SECTION_HEADER = 'mb-10 text-center md:mb-14'

function navigateToPage(page: string) {
  const routes: Record<string, string> = {
    register: '#/register',
    campaigns: '#/campaigns',
  }
  window.location.hash = routes[page] ?? `#/${page}`
}

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (startOnView && !isInView) return
    if (hasStarted.current) return
    hasStarted.current = true

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(end * easeOut))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#F59E0B] opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

type HeroStat = {
  value: number
  label: string
  suffix: string
  prefix?: string
  isRupee?: boolean
  icon: typeof Droplet
}

function HeroStatCard({ stat, index }: { stat: HeroStat; index: number }) {
  const { count, ref } = useCountUp(stat.value, 2000)
  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#F59E0B]/25 via-transparent to-[#DC2626]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#EADFCC] bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFCF7_100%)] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-colors hover:border-[#F59E0B]/45 md:p-6 lg:p-8">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
        <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-[#F59E0B]/6" />
        <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full border border-[#F3E5CF]" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
          className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-[#F59E0B]/25 bg-[#F59E0B]/10 shadow-sm"
        >
          <Icon className="h-6 w-6 text-[#DC2626]" />
        </motion.div>

        <div
          className={`mb-2 font-serif font-bold leading-[0.95] tracking-tight text-[#1E3A5F] ${
            stat.isRupee ? 'text-4xl md:text-5xl lg:text-6xl' : 'whitespace-nowrap text-4xl md:text-5xl lg:text-[56px]'
          }`}
        >
          {stat.prefix && <span>{stat.prefix}</span>}
          {stat.isRupee ? (
            <span>{(count / 10000000).toFixed(1)} Cr</span>
          ) : (
            <span>{count.toLocaleString('en-IN')}</span>
          )}
          {stat.suffix && <span>{stat.suffix}</span>}
        </div>
        <p className="text-base text-[#6B7280] md:text-lg">{stat.label}</p>
      </div>
    </motion.div>
  )
}

function HeroStatsSection() {
  const stats: HeroStat[] = [
    { value: 1200000, label: 'Blood Units Collected', suffix: '', icon: Droplet },
    { value: 4700, label: 'Lives Saved', suffix: '+', icon: Heart },
    { value: 28000, label: 'Active Donors', suffix: '+', icon: Users },
    {
      value: 23000000,
      label: 'Funds Raised',
      prefix: 'Rs.',
      suffix: '',
      isRupee: true,
      icon: IndianRupee,
    },
  ]

  return (
    <section className="relative flex min-h-[76vh] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#FFF7ED_0%,#FFF9F2_45%,#FFFDF9_100%)] pb-16 pt-14 md:pb-24 md:pt-20 lg:pb-28">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,58,95,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.2) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#DC2626]/10 blur-3xl" />
      <div className="absolute -right-16 top-1/3 h-[22rem] w-[22rem] rounded-full bg-[#F59E0B]/12 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-[18rem] w-[18rem] rounded-full bg-[#1E3A5F]/8 blur-3xl" />
      <FloatingParticles />

      <div className={`relative z-10 ${PAGE_CONTAINER}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center md:mb-14 lg:mb-16"
        >
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-[#1A1A1A] md:text-6xl lg:text-7xl">
            Our <span className="italic text-[#F59E0B]">Impact</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6B7280] md:text-xl">
            Three decades of saving lives across Andhra Pradesh and Telangana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <HeroStatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const milestones = [
    { year: '1998', event: 'CCT Founded by Megastar Chiranjeevi' },
    { year: '2005', event: '1,00,000 blood units milestone' },
    { year: '2012', event: 'First mega blood drive — 5,000 donors in one day' },
    { year: '2018', event: 'Partnership with 50+ hospitals across AP & TS' },
    { year: '2024', event: 'Digital platform launch' },
    { year: '2026', event: '12 lakh units and counting' },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section className={`relative overflow-hidden border-t border-[#E8DED0]/60 bg-[#FFFDF9]/40 ${SECTION_PADDING}`}>
      <div className={PAGE_CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={SECTION_HEADER}
        >
          <h2 className="mb-5 font-serif text-3xl font-bold text-[#1A1A1A] md:text-5xl">
            Our <span className="text-[#F59E0B]">Journey</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#6B7280] md:text-lg">
            Key milestones in our mission to save lives
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          <div className="-mx-2 overflow-x-auto px-2 pb-8 pt-2 scrollbar-hide sm:-mx-0 sm:px-0 md:pb-10">
            <div className="relative min-w-[920px] md:min-w-0">
              {/* Line through vertical center of marker (h-5 = 20px) */}
              <div className="absolute left-0 right-0 top-[9px] h-0.5 bg-[#E6DCCB]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#DC2626]"
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </div>

              <div className="relative flex justify-between">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    className="flex w-[9.5rem] flex-col items-center sm:w-40 md:w-[11.5rem]"
                  >
                    <motion.div
                      className="relative z-10 h-5 w-5 rounded-full border-[5px] border-[#F59E0B] bg-white"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#F59E0B]"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </motion.div>

                    <span className="mt-5 font-serif text-2xl font-bold text-[#F59E0B] md:mt-7">
                      {milestone.year}
                    </span>

                    <p className="mt-2.5 max-w-[11rem] text-center text-sm leading-snug text-[#6B7280] md:mt-3.5 md:text-[0.9375rem] md:leading-relaxed">
                      {milestone.event}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DonationHeatmapSection() {
  const [visibleCount, setVisibleCount] = useState(5)
  const districts = [
    { name: 'Hyderabad', donations: 85000, color: '#DC2626' },
    { name: 'Vijayawada', donations: 62000, color: '#DC2626' },
    { name: 'Visakhapatnam', donations: 58000, color: '#EF4444' },
    { name: 'Guntur', donations: 45000, color: '#EF4444' },
    { name: 'Tirupati', donations: 42000, color: '#F87171' },
    { name: 'Warangal', donations: 38000, color: '#F87171' },
    { name: 'Kakinada', donations: 32000, color: '#FCA5A5' },
    { name: 'Nellore', donations: 28000, color: '#FCA5A5' },
    { name: 'Kurnool', donations: 25000, color: '#FECACA' },
    { name: 'Rajahmundry', donations: 22000, color: '#FECACA' },
    { name: 'Kadapa', donations: 18000, color: '#FEE2E2' },
    { name: 'Anantapur', donations: 15000, color: '#FEE2E2' },
  ]
  const sortedDistricts = [...districts].sort((a, b) => b.donations - a.donations)
  const maxDonations = sortedDistricts[0]?.donations ?? 1
  const hotspotDistricts = sortedDistricts.slice(0, 4)
  const visibleDistricts = sortedDistricts.slice(0, visibleCount)
  const hasMore = visibleCount < sortedDistricts.length

  return (
    <section className={`relative border-t border-[#E8DED0]/60 ${SECTION_PADDING}`}>
      <div className={PAGE_CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={SECTION_HEADER}
        >
          <h2 className="mb-5 font-serif text-3xl font-bold text-[#1A1A1A] md:text-5xl">
            Donation <span className="text-[#DC2626]">Heatmap</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#6B7280] md:text-lg">
            Blood donation density across AP & Telangana districts
          </p>
        </motion.div>

        <div className="rounded-3xl border border-[#E8DED0] bg-white p-5 shadow-lg shadow-black/5 md:p-7 lg:p-8">
          <div className="grid gap-7 lg:grid-cols-[1.65fr_1fr] lg:gap-10 xl:gap-12">
            <div className="min-w-0 space-y-3.5 md:space-y-4">
              {visibleDistricts.map((district, index) => {
                const width = Math.max(10, Math.round((district.donations / maxDonations) * 100))
                return (
                  <motion.div
                    key={district.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="rounded-xl border border-[#EFE5D6] bg-[#FFFDF9] p-3 md:p-3.5"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FEE2E2] text-xs font-bold text-[#DC2626]">
                          #{index + 1}
                        </span>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{district.name}</p>
                      </div>
                      <p className="text-sm font-bold text-[#DC2626]">
                        {district.donations.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#F5EDE0]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.04 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: district.color }}
                      />
                    </div>
                  </motion.div>
                )
              })}

              {hasMore && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisibleCount(prev => Math.min(prev + 4, sortedDistricts.length))}
                  className="mt-3 w-full rounded-xl border border-[#E8DED0] bg-white py-3 text-sm font-semibold text-[#1E3A5F] transition-colors hover:border-[#DC2626] hover:text-[#DC2626]"
                >
                  Load More Details
                </motion.button>
              )}
            </div>

            <div className="grid min-w-0 gap-3.5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4">
              {hotspotDistricts.map((district, index) => (
                <motion.div
                  key={district.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-xl border border-[#E8DED0] bg-[#FFF7ED] p-3.5 md:p-[1.125rem]"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280]">Top Hotspot</p>
                  <p className="mt-1.5 font-serif text-2xl font-bold text-[#1A1A1A]">{district.name}</p>
                  <p className="mt-1.5 font-semibold text-[#DC2626]">
                    {district.donations.toLocaleString('en-IN')} donations
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 border-t border-[#F0E6D8] pt-8 md:mt-10 md:gap-[1.125rem] md:pt-10">
          <span className="text-sm font-medium text-[#6B7280]">Low</span>
          <div className="flex gap-1.5">
            {['#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626'].map(color => (
              <div key={color} className="h-4 w-8 rounded shadow-sm" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span className="text-sm font-medium text-[#6B7280]">High</span>
        </div>
      </div>
    </section>
  )
}

function BloodTypeDistributionSection() {
  const bloodTypes = [
    { type: 'O+', percentage: 35, color: '#DC2626' },
    { type: 'B+', percentage: 25, color: '#F59E0B' },
    { type: 'A+', percentage: 20, color: '#3B82F6' },
    { type: 'AB+', percentage: 8, color: '#8B5CF6' },
    { type: 'O-', percentage: 5, color: '#EF4444' },
    { type: 'B-', percentage: 3, color: '#FBBF24' },
    { type: 'A-', percentage: 3, color: '#60A5FA' },
    { type: 'AB-', percentage: 1, color: '#A78BFA' },
  ]

  const [hoveredType, setHoveredType] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const radius = 80
  const circumference = 2 * Math.PI * radius
  let accumulatedOffset = 0

  return (
    <section className={`relative border-t border-[#E8DED0]/60 ${SECTION_PADDING}`}>
      <div className={PAGE_CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={SECTION_HEADER}
        >
          <h2 className="mb-5 font-serif text-3xl font-bold text-[#1A1A1A] md:text-5xl">
            Blood Type <span className="text-[#DC2626]">Distribution</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#6B7280] md:text-lg">
            Breakdown of donations by blood type
          </p>
        </motion.div>

        <div
          ref={ref}
          className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-16"
        >
          <div className="relative shrink-0">
            <svg width="280" height="280" viewBox="0 0 200 200">
              {bloodTypes.map((blood, index) => {
                const strokeLength = (blood.percentage / 100) * circumference
                const currentOffset = accumulatedOffset
                accumulatedOffset += strokeLength

                const isHovered = hoveredType === blood.type

                return (
                  <motion.circle
                    key={blood.type}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={blood.color}
                    strokeWidth={isHovered ? 28 : 24}
                    strokeDasharray={`${strokeLength} ${circumference}`}
                    strokeDashoffset={-currentOffset}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={isInView ? { strokeDashoffset: -currentOffset } : { strokeDashoffset: circumference }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                    onMouseEnter={() => setHoveredType(blood.type)}
                    onMouseLeave={() => setHoveredType(null)}
                    style={{
                      cursor: 'pointer',
                      transformOrigin: 'center',
                      transform: 'rotate(-90deg)',
                    }}
                  />
                )
              })}
              <text
                x="100"
                y="95"
                textAnchor="middle"
                className="fill-[#1A1A1A] font-serif text-2xl font-bold"
              >
                {hoveredType || 'All'}
              </text>
              <text x="100" y="115" textAnchor="middle" className="fill-[#6B7280] text-sm">
                {hoveredType ? `${bloodTypes.find(b => b.type === hoveredType)?.percentage}%` : 'Types'}
              </text>
            </svg>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-x-6 gap-y-2.5 md:max-w-lg md:gap-x-8 md:gap-y-3">
            {bloodTypes.map((blood, index) => (
              <motion.div
                key={blood.type}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onMouseEnter={() => setHoveredType(blood.type)}
                onMouseLeave={() => setHoveredType(null)}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl px-2 py-2 transition-colors md:px-2.5 md:py-2.5 ${
                  hoveredType === blood.type ? 'border border-[#E8DED0] bg-white shadow-sm' : ''
                }`}
              >
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: blood.color }} />
                <span className="font-semibold text-[#1A1A1A]">{blood.type}</span>
                <span className="text-[#6B7280]">{blood.percentage}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CampaignImpactSection() {
  const highlights = [
    { icon: Stethoscope, value: '12', label: 'Equipment Campaigns Completed', color: '#DC2626' },
    { icon: Users, value: '2,500+', label: 'Patients Supported', color: '#F59E0B' },
    { icon: Building2, value: '8', label: 'Blood Banks Upgraded', color: '#3B82F6' },
  ]

  return (
    <section className={`relative border-t border-[#E8DED0]/60 ${SECTION_PADDING}`}>
      <div className={PAGE_CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={SECTION_HEADER}
        >
          <h2 className="mb-5 font-serif text-3xl font-bold text-[#1A1A1A] md:text-5xl">
            Campaign <span className="text-[#F59E0B]">Impact</span>
          </h2>
          <p className="text-lg font-semibold leading-relaxed text-[#F59E0B] md:text-xl">
            Rs.2.3 Crore raised across 47 campaigns
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-7">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                className="rounded-3xl border border-[#E8DED0] bg-white p-7 text-center shadow-lg shadow-black/5 transition-colors hover:border-[#F59E0B]/40"
              >
                <motion.div
                  className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${item.color}20` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="h-8 w-8" style={{ color: item.color }} />
                </motion.div>
                <div className="mb-2 font-serif text-4xl font-bold text-[#1A1A1A]">{item.value}</div>
                <p className="text-[#6B7280]">{item.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-[#E8DED0]/60 py-16 md:py-20 lg:py-24">
      <div className="absolute left-1/4 top-1/2 h-96 w-96 rounded-full bg-[#DC2626]/20 blur-3xl" />
      <div className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-[#F59E0B]/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 font-serif text-4xl font-bold text-[#1A1A1A] md:mb-6 md:text-6xl"
        >
          Be part of the <span className="text-[#F59E0B]">next chapter</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-7 max-w-2xl text-lg text-[#6B7280] md:mb-9"
        >
          Join thousands of heroes who have made a difference. Your contribution can save lives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col justify-center gap-3.5 sm:flex-row sm:gap-4"
        >
          <motion.button
            type="button"
            onClick={() => navigateToPage('register')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-xl bg-[#DC2626] px-6 py-2.5 text-sm font-semibold text-white"
          >
            <motion.div
              className="absolute inset-0 z-0 bg-gradient-to-r from-[#DC2626] to-[#F59E0B]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Droplet className="h-5 w-5" />
              Donate Blood
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigateToPage('campaigns')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-xl border-2 border-[#F59E0B] bg-transparent px-6 py-2.5 text-sm font-semibold text-[#F59E0B]"
          >
            <motion.div
              className="absolute inset-0 z-0 bg-[#F59E0B]"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors group-hover:text-white">
              <Heart className="h-5 w-5" />
              Start a Campaign
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default function Impact() {
  return (
    <div className="min-h-screen bg-[#FFF7ED]" style={{ paddingTop: 'var(--nav-h)' }}>
      <HeroStatsSection />
      <TimelineSection />
      <DonationHeatmapSection />
      <BloodTypeDistributionSection />
      <CampaignImpactSection />
      <CTASection />
    </div>
  )
}
