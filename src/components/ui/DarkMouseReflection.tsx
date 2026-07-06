import { useEffect, useRef } from 'react'

export default function DarkMouseReflection() {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(57, 255, 20, 0.08), transparent 40%)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <div ref={elRef} className="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-200 hidden dark:block" />
}