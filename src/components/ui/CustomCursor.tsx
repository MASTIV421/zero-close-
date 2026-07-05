import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const discoRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const rotation = useRef(0)
  const isMoving = useRef(false)
  const moveTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const cursor = cursorRef.current
    const disco = discoRef.current

    if (!cursor || !disco) return

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

      cursor.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0)`

      if (isMoving.current) {
        rotation.current += 0.8
      } else {
        rotation.current *= 0.95
      }
      disco.style.transform = `rotate(${rotation.current}deg)`

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
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-8 h-8 transition-opacity duration-150"
      style={{ opacity: 1 }}
    >
      <div
        ref={discoRef}
        className="w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #FF3366, #8B5CF6 60%, #06B6D4 90%)',
          boxShadow: '0 0 0 2px rgba(255,51,102,0.4), 0 0 15px rgba(139,92,246,0.3), 0 0 25px rgba(6,182,212,0.2)',
        }}
      />
    </div>
  )
}