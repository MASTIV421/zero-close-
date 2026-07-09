import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-ivory/60 border-t border-gold/20 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-sans mb-6 text-black">Elegance</h3>
            <p className="text-sm text-steel leading-relaxed max-w-xs font-sans">
              Timeless pieces crafted for the modern connoisseur.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-sans mb-4 text-gold">SHOP</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-steel hover:text-black transition-colors font-sans">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-steel hover:text-black transition-colors font-sans">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-sans mb-4 text-gold">SUPPORT</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-steel hover:text-black transition-colors font-sans">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-steel hover:text-black transition-colors font-sans">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-sans mb-4 text-gold">NEWSLETTER</h4>
            <p className="text-sm text-steel mb-4 font-sans">Join for exclusive drops.</p>
            <div className="flex gap-2">
              <input
                type="email"
                name="newsletterEmail"
                placeholder="Email address"
                className="flex-1 px-4 py-2 backdrop-blur-md bg-pearl/60 border border-gold/30 rounded-full text-sm focus:outline-none font-sans"
              />
              <button className="px-4 py-2 backdrop-blur-md bg-gold/25 text-black text-sm font-medium rounded-full hover:bg-gold/40 transition-all border border-gold/30 font-sans">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-steel font-sans">
          <p>© 2026 Elegance. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="text-steel hover:text-black transition-colors font-sans">Privacy</Link>
            <Link to="/" className="text-steel hover:text-black transition-colors font-sans">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}