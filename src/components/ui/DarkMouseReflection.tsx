import { useEffect, useState } from 'react'

export default function DarkMouseReflection() {
  const [style, setStyle] = useState({})

  useEffect(() => {
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setStyle({
          background: `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(57, 255, 20, 0.08), transparent 40%)`,
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-200 hidden dark:block"
      style={style}
    />
  )
}