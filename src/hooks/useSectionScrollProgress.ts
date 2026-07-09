import { useEffect, useRef, useState } from 'react'

export function useSectionScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const update = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const sectionHeight = rect.height
      const scrollY = window.scrollY

      const raw = sectionHeight > 0 ? (scrollY - sectionTop) / sectionHeight : 0
      const clamped = Math.max(0, Math.min(1, raw))
      setProgress(clamped)
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [sectionRef])

  return progress
}
