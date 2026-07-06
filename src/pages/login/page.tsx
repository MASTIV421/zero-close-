import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = '/admin/dashboard'
      }
    })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      window.location.href = '/admin/dashboard'
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 dark:bg-white/5 dark:border-neon-green/20">
          <h1 className="text-3xl font-sans mb-2 text-center text-[var(--color-text-main)]">Admin Login</h1>
          <p className="text-sm text-[var(--color-text-main)]/70 text-center mb-8">
            Sign in to access the admin panel
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white/20 text-[var(--color-text-main)] rounded-full hover:bg-white/30 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-text-main)] transition-colors">
              Back to Store
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
