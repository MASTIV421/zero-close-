import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
      ])

      const totalProducts = productsRes.count || 0
      const totalOrders = ordersRes.count || 0

      setStats({
        totalProducts,
        totalOrders,
        totalRevenue: totalOrders * 120, // Placeholder calculation
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[var(--color-text-main)]">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-sans mb-8 text-[var(--color-text-main)]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 dark:bg-white/5 dark:border-neon-green/20">
          <h3 className="text-sm font-sans text-[var(--color-text-main)]/70 mb-2">Total Products</h3>
          <p className="text-3xl font-sans text-[var(--color-text-main)]">{stats.totalProducts}</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 dark:bg-white/5 dark:border-neon-green/20">
          <h3 className="text-sm font-sans text-[var(--color-text-main)]/70 mb-2">Total Orders</h3>
          <p className="text-3xl font-sans text-[var(--color-text-main)]">{stats.totalOrders}</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 dark:bg-white/5 dark:border-neon-green/20">
          <h3 className="text-sm font-sans text-[var(--color-text-main)]/70 mb-2">Total Revenue</h3>
          <p className="text-3xl font-sans text-[var(--color-text-main)]">${stats.totalRevenue}</p>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 dark:bg-white/5 dark:border-neon-green/20">
        <h2 className="text-xl font-sans mb-4 text-[var(--color-text-main)]">Recent Activity</h2>
        <p className="text-[var(--color-text-main)]/70">No recent activity to show.</p>
      </div>
    </div>
  )
}
