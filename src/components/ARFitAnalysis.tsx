import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ARFitAnalysis({ onComplete }: { onComplete: (measurements: { shoulderWidth: number; waistWidth: number }) => void }) {
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    let animationFrame: number

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error('Camera access denied:', err)
      }
    }

    if (isScanning) {
      startCamera()
      let startTime = Date.now()
      const duration = 3000

      const updateProgress = () => {
        const elapsed = Date.now() - startTime
        const currentProgress = Math.min(elapsed / duration, 1)
        setProgress(currentProgress)

        if (currentProgress < 1) {
          animationFrame = requestAnimationFrame(updateProgress)
        } else {
          setIsScanning(false)
          onComplete({
            shoulderWidth: 42 + Math.random() * 8,
            waistWidth: 34 + Math.random() * 10,
          })
        }
      }

      animationFrame = requestAnimationFrame(updateProgress)
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isScanning, onComplete])

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-video bg-black/30 rounded-2xl overflow-hidden border border-white/10">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsScanning(true)}
              className="px-6 py-3 bg-white/20 text-white font-sans rounded-xl hover:bg-white/30 transition-all border border-white/10 backdrop-blur-md"
            >
              Start Body Scan
            </button>
          </div>
        )}

        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto" />
              <p className="text-white/80 font-sans">Analyzing body proportions...</p>
            </div>
          </div>
        )}
      </div>

      {isScanning && (
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/40 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}
    </div>
  )
}
