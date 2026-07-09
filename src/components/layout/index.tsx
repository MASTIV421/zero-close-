import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from '../cart/CartDrawer'
import MouseReflection from '../ui/MouseReflection'
import DarkMouseReflection from '../ui/DarkMouseReflection'
import GlassControl from '../GlassControl'
import CloudSky from '../CloudSky'
import GridLaserOverlay from '../GridLaserOverlay'

const STORAGE_KEY = 'glass-control-settings'
const DEFAULT_BLUR = 20
const DEFAULT_OPACITY = 0.35

export default function Layout() {
  const [blur, setBlur] = useState(DEFAULT_BLUR)
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (typeof parsed.blur === 'number') setBlur(parsed.blur)
        if (typeof parsed.opacity === 'number') setOpacity(parsed.opacity)
      }
    } catch {}
    setLoaded(true)
  }, [])

  const handleGlassChange = (newBlur: number, newOpacity: number) => {
    setBlur(newBlur)
    setOpacity(newOpacity)
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #FFFFFF 100%)' }}>
      {/* Cloud Sky Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <CloudSky />
      </div>

      {/* Grid Laser Overlay */}
      <GridLaserOverlay />

      {/* Glass Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(255, 255, 255, ${opacity * 0.5})`,
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <MouseReflection />
        <DarkMouseReflection />
        <Header />
        <CartDrawer />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Glass Control */}
      {loaded && (
        <GlassControl blur={blur} opacity={opacity} onChange={handleGlassChange} />
      )}
    </div>
  )
}
