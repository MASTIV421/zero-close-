import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-[var(--color-text-main)]">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    window.location.href = '/login'
    return null
  }

  return <>{children}</>
}
