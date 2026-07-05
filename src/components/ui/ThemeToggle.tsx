import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark
    setIsDark(initialIsDark)
    updateTheme(initialIsDark)
  }, [])

  const updateTheme = (dark: boolean) => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    updateTheme(newIsDark)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-neon-green" />
      ) : (
        <Moon size={20} className="text-dark" />
      )}
    </button>
  )
}