import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 2 + 1,
  delay: Math.random() * 0.5,
}))

export default function SuccessAnimation({ size, confidence, onClose }: { size: string; confidence: number; onClose: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onClose, 500)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-mist-900/20 backdrop-blur-sm"
          />

          {/* Success Card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-sm backdrop-blur-2xl bg-mist-100/70 border border-mist-300/40 rounded-3xl p-8 shadow-2xl text-center overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-haze-sky/10 to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-haze-sky/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-haze-cream/10 rounded-full blur-3xl" />

            {/* Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-haze-sky/60"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Content */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15, stiffness: 200 }}
              className="relative z-10"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-haze-sky/20 flex items-center justify-center border border-haze-sky/30">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="hsl(199 55% 82%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <h2 className="text-2xl font-sans text-mist-900 mb-2">Perfect Match!</h2>
              <p className="text-mist-600 text-sm font-sans mb-6">
                We found your ideal size based on your measurements
              </p>

              <div className="inline-flex items-center gap-3 px-6 py-3 bg-mist-200/60 rounded-2xl border border-mist-300/40 mb-6">
                <span className="text-3xl font-sans text-mist-900">{size}</span>
                <div className="w-px h-8 bg-mist-300/40" />
                <div className="text-left">
                  <p className="text-mist-600 text-xs font-sans">Confidence</p>
                  <p className="text-mist-900 font-sans text-sm">{confidence}%</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-3 bg-haze-sky/25 text-mist-900 font-sans rounded-xl hover:bg-haze-sky/40 transition-all border border-haze-sky/30"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
