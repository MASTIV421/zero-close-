import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import useStore from '../../store/useStore'
import ThemeToggle from '../ui/ThemeToggle'
import NavIcon3D from '../NavIcon3D'
import SearchModal from '../SearchModal'

export default function Header() {
  const { items, setCartOpen } = useStore()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [searchOpen, setSearchOpen] = useState(false)

  const navLinks = [
    { name: 'MEN', to: '/shop' },
    { name: 'WOMEN', to: '/shop' },
    { name: 'COLLECTIONS', to: '/shop' },
    { name: 'SALE', to: '/shop' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4 rounded-2xl backdrop-blur-xl bg-gold/20 border border-gold/30 transition-all duration-500">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/" className="text-2xl font-sans tracking-wider text-black">
          Z
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className="text-sm font-sans text-charcoal hover:text-black transition-colors"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:block p-2 text-charcoal hover:text-black transition-colors"
            aria-label="Search"
          >
            <NavIcon3D type="search" onClick={() => setSearchOpen(true)} />
          </button>

          <button className="p-2 text-charcoal hover:text-black transition-colors">
            <NavIcon3D type="heart" onClick={() => {}} />
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-charcoal hover:text-black transition-colors"
          >
            <NavIcon3D type="cart" onClick={() => setCartOpen(true)} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold/40 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <ThemeToggle />

          <button className="md:hidden p-2 text-charcoal hover:text-black transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
