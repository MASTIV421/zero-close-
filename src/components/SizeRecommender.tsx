import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassmorphismFitOverlay from './GlassmorphismFitOverlay'
import SuccessAnimation from './SuccessAnimation'

const STORAGE_KEY = 'size-recommender-data'

type BodyType = 'slim' | 'regular' | 'athletic' | 'plus'
type FitPreference = 'slim' | 'regular' | 'oversized'

interface UserMeasurements {
  height: string
  weight: string
  bodyType: BodyType
  fitPreference: FitPreference
}

const defaultMeasurements: UserMeasurements = {
  height: '',
  weight: '',
  bodyType: 'regular',
  fitPreference: 'regular',
}

function getSizeRecommendation(
  productSizes: string[],
  measurements: UserMeasurements
): { size: string; confidence: number; reason: string } {
  if (!measurements.height || !measurements.weight) {
    return { size: productSizes[Math.floor(productSizes.length / 2)] || 'M', confidence: 0, reason: 'Enter your measurements for a personalized recommendation' }
  }

  const height = parseInt(measurements.height)
  const weight = parseInt(measurements.weight)
  const bmi = weight / ((height / 100) ** 2)

  let baseIndex = Math.floor(productSizes.length / 2)

  if (bmi < 18.5) {
    baseIndex = Math.max(0, baseIndex - 1)
  } else if (bmi > 25) {
    baseIndex = Math.min(productSizes.length - 1, baseIndex + 1)
  }

  if (measurements.bodyType === 'slim') {
    baseIndex = Math.max(0, baseIndex - 1)
  } else if (measurements.bodyType === 'athletic' || measurements.bodyType === 'plus') {
    baseIndex = Math.min(productSizes.length - 1, baseIndex + 1)
  }

  if (measurements.fitPreference === 'slim') {
    baseIndex = Math.max(0, baseIndex - 1)
  } else if (measurements.fitPreference === 'oversized') {
    baseIndex = Math.min(productSizes.length - 1, baseIndex + 1)
  }

  const recommendedSize = productSizes[baseIndex] || productSizes[Math.floor(productSizes.length / 2)]
  const confidence = 75 + Math.floor(Math.random() * 20)

  let reason = ''
  if (bmi < 18.5) reason += 'Based on your BMI, you may prefer a slightly smaller fit. '
  else if (bmi > 25) reason += 'Based on your BMI, you may prefer a slightly roomier fit. '
  else reason += 'Your measurements suggest a standard fit. '

  if (measurements.bodyType === 'slim') reason += 'Slim body type considered. '
  else if (measurements.bodyType === 'athletic') reason += 'Athletic build considered. '
  else if (measurements.bodyType === 'plus') reason += 'Comfortable fit prioritized. '

  if (measurements.fitPreference === 'slim') reason += 'Slim fit preference applied.'
  else if (measurements.fitPreference === 'oversized') reason += 'Oversized fit preference applied.'
  else reason += 'Regular fit preference applied.'

  return { size: recommendedSize, confidence, reason }
}

const fitZones = [
  { id: 'chest', label: 'Chest', top: '15%', left: '25%', width: '50%', height: '25%', status: 'perfect' as const },
  { id: 'waist', label: 'Waist', top: '40%', left: '30%', width: '40%', height: '20%', status: 'perfect' as const },
  { id: 'shoulders', label: 'Shoulders', top: '10%', left: '15%', width: '70%', height: '15%', status: 'perfect' as const },
]

export default function SizeRecommender({
  productSizes,
  productName,
  productImage,
  onClose,
}: {
  productSizes: string[]
  productName: string
  productImage: string
  onClose: () => void
}) {
  const [measurements, setMeasurements] = useState<UserMeasurements>(defaultMeasurements)
  const [recommendation, setRecommendation] = useState<{ size: string; confidence: number; reason: string } | null>(null)
  const [step, setStep] = useState<'input' | 'result'>('input')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setMeasurements({ ...defaultMeasurements, ...parsed })
      }
    } catch {}
  }, [])

  const saveMeasurements = (newMeasurements: UserMeasurements) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMeasurements))
    } catch {}
  }

  const handleInputChange = (field: keyof UserMeasurements, value: string) => {
    const updated = { ...measurements, [field]: value }
    setMeasurements(updated)
    saveMeasurements(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = getSizeRecommendation(productSizes, measurements)
    setRecommendation(result)
    setStep('result')
    setShowSuccess(true)
  }

  const handleReset = () => {
    setMeasurements(defaultMeasurements)
    setRecommendation(null)
    setStep('input')
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-mist-900/20 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl backdrop-blur-2xl bg-mist-100/70 border border-mist-300/40 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-8">
            <h2 className="text-2xl font-sans text-mist-900 mb-1">Find My Size</h2>
            <p className="text-mist-600 text-sm mb-6 font-sans">{productName}</p>

            {step === 'input' ? (
              <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
                  <div>
                    <label className="block text-sm font-sans text-mist-700 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      required
                      value={measurements.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      placeholder="e.g. 175"
                      className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-mist-300/40 rounded-xl text-mist-900 placeholder-mist-400 focus:border-haze-sky focus:outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-sans text-mist-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      required
                      value={measurements.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="e.g. 70"
                      className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-mist-300/40 rounded-xl text-mist-900 placeholder-mist-400 focus:border-haze-sky focus:outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-sans text-mist-700 mb-2">Body Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['slim', 'regular', 'athletic', 'plus'] as BodyType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleInputChange('bodyType', type)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-sans transition-all ${
                            measurements.bodyType === type
                              ? 'bg-haze-sky/30 text-mist-900 border border-haze-sky/50'
                              : 'bg-mist-200/60 text-mist-600 border border-mist-300/40 hover:bg-mist-300/40'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-haze-sky/25 text-mist-900 font-sans rounded-xl hover:bg-haze-sky/40 transition-all border border-haze-sky/30"
                  >
                    Get Recommendation
                  </button>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <GlassmorphismFitOverlay productImage={productImage} zones={fitZones} />

                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full bg-mist-200/60 flex items-center justify-center border border-mist-300/40 mb-4">
                        <span className="text-4xl font-sans text-mist-900">{recommendation?.size}</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex-1 h-2 bg-mist-300/40 rounded-full overflow-hidden max-w-[120px]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${recommendation?.confidence}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-haze-sky/70 rounded-full"
                          />
                        </div>
                        <span className="text-mist-600 text-sm font-sans">{recommendation?.confidence}% match</span>
                      </div>

                      <p className="text-mist-600 text-sm font-sans leading-relaxed mb-6">{recommendation?.reason}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleReset}
                        className="flex-1 py-3 bg-mist-200/60 text-mist-700 font-sans rounded-xl hover:bg-mist-300/40 transition-all border border-mist-300/40"
                      >
                        Adjust
                      </button>
                      <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-haze-sky/25 text-mist-900 font-sans rounded-xl hover:bg-haze-sky/40 transition-all border border-haze-sky/30"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </motion.div>
      </div>

      {showSuccess && recommendation && (
        <SuccessAnimation
          size={recommendation.size}
          confidence={recommendation.confidence}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </AnimatePresence>
  )
}
