import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('admins')
          .select('id')
          .eq('id', user.id)
          .single()
        setIsAdmin(!!data)
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-[var(--color-text-main)]">Loading...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h1 className="text-2xl font-sans mb-4 text-[var(--color-text-main)]">Access Denied</h1>
          <p className="text-[var(--color-text-main)]/70 mb-6">You don't have permission to access this page.</p>
          <a href="/login" className="px-6 py-3 bg-white/20 text-[var(--color-text-main)] rounded-full hover:bg-white/30 transition-all">
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white/5 border-r border-white/10 dark:bg-white/5 dark:border-neon-green/20">
          <div className="p-6">
            <h2 className="text-xl font-sans text-[var(--color-text-main)] mb-8">Admin Panel</h2>
            <nav className="space-y-2">
              <a
                href="/admin/dashboard"
                className="block px-4 py-2 rounded-lg text-[var(--color-text-main)] hover:bg-white/10 transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/admin/products"
                className="block px-4 py-2 rounded-lg text-[var(--color-text-main)] hover:bg-white/10 transition-colors"
              >
                Products
              </a>
              <a
                href="/admin/products/create"
                className="block px-4 py-2 rounded-lg text-[var(--color-text-main)] hover:bg-white/10 transition-colors"
              >
                Add Product
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
