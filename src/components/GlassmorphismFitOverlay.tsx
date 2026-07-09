import { motion } from 'framer-motion'

type FitZone = {
  id: string
  label: string
  top: string
  left: string
  width: string
  height: string
  status: 'tight' | 'perfect' | 'loose'
}

const fitColors = {
  tight: 'hsla(0, 45%, 62%, 0.35)',
  perfect: 'hsla(140, 35%, 55%, 0.35)',
  loose: 'hsla(199, 55%, 74%, 0.35)',
}

const fitBorderColors = {
  tight: 'hsla(0, 45%, 62%, 0.8)',
  perfect: 'hsla(140, 35%, 55%, 0.8)',
  loose: 'hsla(199, 55%, 74%, 0.8)',
}

export default function GlassmorphismFitOverlay({
  productImage,
  zones,
}: {
  productImage: string
  zones: FitZone[]
}) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative rounded-2xl overflow-hidden border border-mist-300/40">
        <img src={productImage} alt="Product" className="w-full h-[500px] object-cover" />

        {zones.map((zone) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: zones.indexOf(zone) * 0.1 }}
            className="absolute backdrop-blur-md border rounded-xl flex items-center justify-center"
            style={{
              top: zone.top,
              left: zone.left,
              width: zone.width,
              height: zone.height,
              backgroundColor: fitColors[zone.status],
              borderColor: fitBorderColors[zone.status],
            }}
          >
            <span className="text-xs font-sans text-mist-900 px-2 py-1 bg-mist-100/80 rounded-lg backdrop-blur-sm">
              {zone.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {(['tight', 'perfect', 'loose'] as const).map((status) => (
          <div key={status} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fitBorderColors[status] }} />
            <span className="text-xs text-mist-700 font-sans capitalize">{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
