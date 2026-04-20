import { useEffect, useRef, useState, type CSSProperties } from 'react'

function formatN(v: number) {
  if (v >= 100000) return `${(v / 100000).toFixed(1).replace(/\.0$/, '')}L+`
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K+`
  return String(Math.round(v))
}

export function AnimatedCounter({
  target,
  className,
  style,
  formatter,
}: {
  target: number
  className?: string
  style?: CSSProperties
  formatter?: (value: number) => string
}) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let intervalId: number | undefined
    const ro = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        ro.disconnect()
        const dur = 2000
        const fps = 16
        const step = target / (dur / fps)
        let c = 0
        intervalId = window.setInterval(() => {
          c += step
          if (c >= target) {
            c = target
            if (intervalId) window.clearInterval(intervalId)
          }
          setV(Math.round(c))
        }, fps)
      },
      { threshold: 0.5 },
    )
    ro.observe(el)
    return () => {
      ro.disconnect()
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [target])

  return (
    <div ref={ref} className={className} style={style}>
      {formatter ? formatter(v) : formatN(v)}
    </div>
  )
}
