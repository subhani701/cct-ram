import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null)
  const curRRef = useRef<HTMLDivElement>(null)
  const mx = useRef(0)
  const my = useRef(0)
  const rx = useRef(0)
  const ry = useRef(0)
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      const cur = curRef.current
      if (cur) {
        cur.style.left = `${e.clientX}px`
        cur.style.top = `${e.clientY}px`
      }
    }
    document.addEventListener('mousemove', onMove)
    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.1
      ry.current += (my.current - ry.current) * 0.1
      const ring = curRRef.current
      if (ring) {
        ring.style.left = `${rx.current}px`
        ring.style.top = `${ry.current}px`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div id="cur" ref={curRef} />
      <div id="curR" ref={curRRef} />
    </>
  )
}
