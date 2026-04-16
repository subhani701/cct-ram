import { useEffect, useRef, type ReactNode } from 'react'

type Delay = '' | 'd1' | 'd2' | 'd3' | 'd4'

export function Reveal({
  children,
  className = '',
  delayClass = '' as Delay,
}: {
  children: ReactNode
  className?: string
  delayClass?: Delay
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('up')
          ro.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className={['rev', delayClass, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
