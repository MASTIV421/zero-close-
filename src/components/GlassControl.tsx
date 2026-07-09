import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'glass-control-settings'
const EDGE_THRESHOLD = 100

export default function GlassControl({
  blur,
  opacity,
  onChange,
}: {
  blur: number
  opacity: number
  onChange: (blur: number, opacity: number) => void
}) {
  const [visible, setVisible] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)

  useEffect(() => {
    const normalized =
      Math.round(((blur / 40) + (opacity - 0.15) / 0.45) / 2 * 100)
    setSliderValue(Math.min(100, Math.max(0, normalized)))
  }, [blur, opacity])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth - e.clientX < EDGE_THRESHOLD) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setSliderValue(value)
    const newBlur = (value / 100) * 40
    const newOpacity = 0.15 + (value / 100) * 0.45
    onChange(newBlur, newOpacity)
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ blur: newBlur, opacity: newOpacity })
      )
    } catch {}
  }

  return (
    <div
      className={`fixed top-1/2 right-5 -translate-y-1/2 z-[60] transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-3 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center gap-2 p-2.5 rounded-full backdrop-blur-xl bg-mist-200/60 shadow-[0_0_30px_rgba(255,255,255,0.06)]">
        <div className="relative h-36 w-1 rounded-full bg-mist-300/40">
          <div
            className="absolute bottom-0 left-0 right-0 bg-haze-sky/60 rounded-full transition-all duration-150"
            style={{ height: `${sliderValue}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full backdrop-blur-md bg-haze-sky/80 shadow-[0_0_12px_rgba(184,218,234,0.3)] transition-all duration-150"
            style={{ bottom: `calc(${sliderValue}% - 7px)` }}
          />
        </div>
      </div>
    </div>
  )
}
