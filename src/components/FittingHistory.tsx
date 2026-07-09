import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

interface FittingEntry {
  id: string
  product_name: string
  recommended_size: string
  confidence: number
  created_at: string
}

export default function FittingHistory() {
  const [history, setHistory] = useState<FittingEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('fitting_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        if (error) throw error
        setHistory(data || [])
      } catch (err) {
        console.error('Failed to fetch fitting history:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/50 font-sans">No fitting history yet. Start using the size recommender!</p>
      </div>
    )
  }

  const maxConfidence = Math.max(...history.map((h) => h.confidence))

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-sans text-white mb-4">Your Fitting Journey</h3>

      {/* Custom Bar Chart */}
      <div className="w-full h-48 flex items-end gap-2">
        {history.slice(0, 8).map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${(entry.confidence / maxConfidence) * 100}%`, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex-1 bg-white/20 rounded-t-lg relative group"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {entry.confidence}%
            </div>
          </motion.div>
        ))}
      </div>

      {/* History List */}
      <div className="space-y-3">
        {history.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
          >
            <div>
              <p className="text-white font-sans text-sm">{entry.product_name}</p>
              <p className="text-white/50 text-xs font-sans">
                {new Date(entry.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-sans text-lg">{entry.recommended_size}</p>
              <p className="text-white/50 text-xs font-sans">{entry.confidence}% match</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
