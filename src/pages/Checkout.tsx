import { motion } from 'framer-motion'
import type { FormEvent } from 'react'
import useStore from '../store/useStore'

export default function Checkout() {
  const { clearCart, items, totalPrice } = useStore()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    clearCart()
  }

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-text-main)] pt-24">
      <div className="container mx-auto px-6 max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 dark:bg-white/5 dark:border-neon-green/20">
        <motion.h1
          className="text-3xl font-sans mb-12 text-[var(--color-text-main)] dark:text-[var(--color-text-main)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CHECKOUT
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <label className="text-sm font-sans mb-2 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full focus:outline-none font-sans text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
              />
            </div>

            <div>
              <label className="text-sm font-sans mb-2 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full focus:outline-none font-sans text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
              />
            </div>

            <div>
              <label className="text-sm font-sans mb-2 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">Address</label>
              <input
                type="text"
                placeholder="123 Street"
                required
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full focus:outline-none font-sans text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-sans mb-2 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  required
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full focus:outline-none font-sans text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
                />
              </div>
              <div>
                <label className="text-sm font-sans mb-2 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">ZIP Code</label>
                <input
                  type="text"
                  placeholder="10001"
                  required
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full focus:outline-none font-sans text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-sans mb-2 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">Card Number</label>
              <input
                type="text"
                placeholder="**** **** **** ****"
                required
                className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full focus:outline-none font-sans text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-sans mb-2 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  required
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full focus:outline-none font-sans text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
                />
              </div>
              <div>
                <label className="text-sm font-sans mb-2 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">CVV</label>
                <input
                  type="text"
                  placeholder="***"
                  required
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-full focus:outline-none font-sans text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white/20 text-[var(--color-text-main)] font-sans rounded-full hover:bg-white/30 dark:bg-neon-green/20 dark:text-black transition-all"
            >
              Complete Order
            </button>
          </motion.form>

          <motion.div
            className="backdrop-blur-md bg-white/5 rounded-lg p-8 dark:bg-white/5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-sans mb-6 text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">ORDER SUMMARY</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-[var(--color-text-main)] font-sans dark:text-[var(--color-text-main)]">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="text-[var(--color-accent)] dark:text-neon-green">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 dark:border-neon-green/20">
              <div className="flex justify-between font-bold text-lg text-[var(--color-text-main)] font-sans dark:text-[var(--color-text-main)]">
                <span>Total</span>
                <span className="text-[var(--color-accent)] dark:text-neon-green">${totalPrice()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}