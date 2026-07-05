import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-white/10 border-t border-white/10 dark:bg-white/5 dark:border-neon-green/20 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-sans mb-6 text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">Elegance</h3>
            <p className="text-sm text-[var(--color-text-main)]/70 leading-relaxed max-w-xs font-sans dark:text-[var(--color-text-main)]/70">
              Timeless pieces crafted for the modern connoisseur.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-sans mb-4 text-[var(--color-accent)] dark:text-neon-green">SHOP</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-[var(--color-text-main)]/70 hover:text-[var(--color-text-main)] transition-colors font-sans dark:text-[var(--color-text-main)]/70 dark:hover:text-[var(--color-text-main)]">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-[var(--color-text-main)]/70 hover:text-[var(--color-text-main)] transition-colors font-sans dark:text-[var(--color-text-main)]/70 dark:hover:text-[var(--color-text-main)]">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-sans mb-4 text-[var(--color-accent)] dark:text-neon-green">SUPPORT</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-[var(--color-text-main)]/70 hover:text-[var(--color-text-main)] transition-colors font-sans dark:text-[var(--color-text-main)]/70 dark:hover:text-[var(--color-text-main)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-[var(--color-text-main)]/70 hover:text-[var(--color-text-main)] transition-colors font-sans dark:text-[var(--color-text-main)]/70 dark:hover:text-[var(--color-text-main)]">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-sans mb-4 text-[var(--color-accent)] dark:text-neon-green">NEWSLETTER</h4>
            <p className="text-sm text-[var(--color-text-main)]/70 mb-4 font-sans dark:text-[var(--color-text-main)]/70">Join for exclusive drops.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 backdrop-blur-md bg-white/20 border border-white/20 rounded-full text-sm focus:outline-none font-sans dark:bg-white/10 dark:border-neon-green/30"
              />
              <button className="px-4 py-2 backdrop-blur-md bg-white/30 text-[var(--color-text-main)] text-sm font-medium rounded-full hover:bg-white/40 dark:bg-neon-green/20 dark:text-black transition-all font-sans">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-text-main)]/50 font-sans dark:border-neon-green/20 dark:text-[var(--color-text-main)]/50">
          <p>© 2026 Elegance. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="text-[var(--color-text-main)]/50 hover:text-[var(--color-text-main)]/70 transition-colors font-sans dark:text-[var(--color-text-main)]/50 dark:hover:text-[var(--color-text-main)]/70">Privacy</Link>
            <Link to="/" className="text-[var(--color-text-main)]/50 hover:text-[var(--color-text-main)]/70 transition-colors font-sans dark:text-[var(--color-text-main)]/50 dark:hover:text-[var(--color-text-main)]/70">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}