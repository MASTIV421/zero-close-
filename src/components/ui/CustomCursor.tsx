import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const rotation = useRef(0)
  const isMoving = useRef(false)
  const moveTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      isMoving.current = true
      clearTimeout(moveTimeout.current)
      moveTimeout.current = setTimeout(() => {
        isMoving.current = false
      }, 100)
    }

    const animate = () => {
      const dx = target.current.x - pos.current.x
      const dy = target.current.y - pos.current.y

      pos.current.x += dx * 0.3
      pos.current.y += dy * 0.3

      cursor.style.transform = `translate3d(${pos.current.x - 12}px, ${pos.current.y - 12}px, 0)`

      if (isMoving.current) {
        rotation.current += 0.8
      } else {
        rotation.current *= 0.95
      }

      const star = cursor.querySelector('.star-icon') as HTMLElement | null
      if (star) {
        star.style.transform = `rotate(${rotation.current}deg)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(moveTimeout.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-6 h-6 transition-opacity duration-150"
      style={{ opacity: 1 }}
    >
      <svg
        className="star-icon w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L14.09 8.26L21 9.27L16.5 13.14L17.82 20.02L12 16.77L6.18 20.02L7.5 13.14L3 9.27L9.91 8.26L12 2Z"
          fill="#FFD700"
          stroke="#FFA500"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
