import { useEffect, useRef, useState } from 'react'

const LASER_COLORS = ['#7A1F2B', '#1B2A4A', '#10371F']

const paths = [
  { id: 1, x1: -10, y1: 0, x2: 110, y2: 100, angle: 45 },
  { id: 2, x1: -10, y1: 100, x2: 110, y2: 0, angle: -45 },
  { id: 3, x1: 0, y1: -10, x2: 100, y2: 110, angle: 45 },
  { id: 4, x1: 100, y1: -10, x2: 0, y2: 110, angle: -45 },
  { id: 5, x1: -10, y1: 50, x2: 110, y2: 50, angle: 0 },
]

export default function GridLaserOverlay() {
  const [scrollY, setScrollY] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const checkMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    checkMotion()
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkMotion)

    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          rafRef.current = null
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', checkMotion)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const scrollOffset = scrollY * 0.05
  const opacity = 0.3 + Math.sin(scrollY * 0.002) * 0.1

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        opacity: prefersReducedMotion ? 0.3 : opacity,
        transform: `translateY(${scrollOffset}px)`,
        transition: prefersReducedMotion ? 'none' : 'transform 0.1s linear',
      }}
    >
      <svg
        className="w-full h-full"
        style={{ filter: 'blur(2px)', mixBlendMode: 'screen' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {paths.map((path, index) => (
            <linearGradient key={path.id} id={`laser-gradient-${path.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={LASER_COLORS[index % LASER_COLORS.length]} stopOpacity="0" />
              <stop offset="50%" stopColor={LASER_COLORS[index % LASER_COLORS.length]} stopOpacity="0.8" />
              <stop offset="100%" stopColor={LASER_COLORS[index % LASER_COLORS.length]} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {paths.map((path, index) => (
          <path
            key={path.id}
            d={`M ${path.x1} ${path.y1} L ${path.x2} ${path.y2}`}
            stroke={`url(#laser-gradient-${path.id})`}
            strokeWidth="0.15"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: '20 80',
              strokeDashoffset: prefersReducedMotion ? 0 : -scrollY * 0.1 * (index % 2 === 0 ? 1 : -1),
              animation: prefersReducedMotion ? 'none' : `laserMove ${3 + index * 0.5}s linear infinite`,
            }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes laserMove {
          0% { stroke-dashoffset: -100; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}
