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
    <div className="min-h-screen text-mist-900 pt-24">
      <div className="container mx-auto px-6 max-w-4xl backdrop-blur-xl bg-mist-100/70 border border-haze-sky/30 rounded-2xl p-8">
        <motion.h1
          className="text-3xl font-sans mb-12 text-mist-900"
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
              <label className="text-sm font-sans mb-2 block text-mist-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-haze-sky/30 rounded-full focus:outline-none font-sans text-mist-900"
              />
            </div>

            <div>
              <label className="text-sm font-sans mb-2 block text-mist-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-haze-sky/30 rounded-full focus:outline-none font-sans text-mist-900"
              />
            </div>

            <div>
              <label className="text-sm font-sans mb-2 block text-mist-700">Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Street"
                required
                className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-haze-sky/30 rounded-full focus:outline-none font-sans text-mist-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-sans mb-2 block text-mist-700">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="New York"
                  required
                  className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-haze-sky/30 rounded-full focus:outline-none font-sans text-mist-900"
                />
              </div>
              <div>
                <label className="text-sm font-sans mb-2 block text-mist-700">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  placeholder="10001"
                  required
                  className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-haze-sky/30 rounded-full focus:outline-none font-sans text-mist-900"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-sans mb-2 block text-mist-700">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="**** **** **** ****"
                required
                className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-haze-sky/30 rounded-full focus:outline-none font-sans text-mist-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-sans mb-2 block text-mist-700">Expiry</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  required
                  className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-haze-sky/30 rounded-full focus:outline-none font-sans text-mist-900"
                />
              </div>
              <div>
                <label className="text-sm font-sans mb-2 block text-mist-700">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="***"
                  required
                  className="w-full px-4 py-3 backdrop-blur-md bg-mist-200/60 border border-haze-sky/30 rounded-full focus:outline-none font-sans text-mist-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-haze-sky/25 text-mist-900 font-sans rounded-full hover:bg-haze-sky/40 transition-all border border-haze-sky/30"
            >
              Complete Order
            </button>
          </motion.form>

          <motion.div
            className="backdrop-blur-md bg-mist-200/60 rounded-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-sans mb-6 text-mist-900">ORDER SUMMARY</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-mist-700 font-sans">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="text-haze-skyDeep">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-haze-sky/20 pt-4">
              <div className="flex justify-between font-bold text-lg text-mist-900 font-sans">
                <span>Total</span>
                <span className="text-haze-skyDeep">${totalPrice()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}