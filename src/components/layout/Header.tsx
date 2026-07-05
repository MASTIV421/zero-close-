import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Search, Heart, Menu } from 'lucide-react'
import useStore from '../../store/useStore'
import ThemeToggle from '../ui/ThemeToggle'

export default function Header() {
  const { items, setCartOpen } = useStore()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { name: 'MEN', to: '/shop' },
    { name: 'WOMEN', to: '/shop' },
    { name: 'COLLECTIONS', to: '/shop' },
    { name: 'SALE', to: '/shop' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/10 dark:bg-white/5 dark:border-neon-green/20 transition-all duration-500">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/" className="text-xl font-sans tracking-wider text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">
          Elegance
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm font-sans text-[var(--color-text-main)]/80 hover:text-[var(--color-text-main)] transition-colors dark:text-[var(--color-text-main)]/80 dark:hover:text-[var(--color-text-main)]"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden md:block p-2 text-[var(--color-text-main)]/80 hover:text-[var(--color-text-main)] transition-colors dark:text-[var(--color-text-main)]/80 dark:hover:text-[var(--color-text-main)]">
            <Search size={20} />
          </button>

          <button className="p-2 text-[var(--color-text-main)]/80 hover:text-[var(--color-text-main)] transition-colors dark:text-[var(--color-text-main)]/80 dark:hover:text-[var(--color-text-main)]">
            <Heart size={20} />
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-[var(--color-text-main)]/80 hover:text-[var(--color-text-main)] transition-colors dark:text-[var(--color-text-main)]/80 dark:hover:text-[var(--color-text-main)]"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white/20 text-[var(--color-text-main)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center dark:bg-neon-green/30 dark:text-black">
                {itemCount}
              </span>
            )}
          </button>

          <ThemeToggle />

          <button className="md:hidden p-2 text-[var(--color-text-main)]/80 hover:text-[var(--color-text-main)] transition-colors dark:text-[var(--color-text-main)]/80 dark:hover:text-[var(--color-text-main)]">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}