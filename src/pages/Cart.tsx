import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import useStore from '../store/useStore'

export default function Cart() {
  const { items, removeItem, totalPrice, clearCart } = useStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-transparent text-[var(--color-text-main)] pt-24 flex items-center justify-center">
        <motion.div
          className="text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 dark:bg-white/5 dark:border-neon-green/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-sans mb-6 text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">YOUR CART IS EMPTY</h1>
          <Link to="/shop">
            <button className="px-8 py-3 bg-white/20 text-[var(--color-text-main)] font-sans rounded-full hover:bg-white/30 dark:bg-neon-green/20 dark:text-black transition-all">
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-text-main)] pt-24">
      <div className="container mx-auto px-6 max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 dark:bg-white/5 dark:border-neon-green/20">
        <motion.h1
          className="text-3xl font-sans mb-12 text-[var(--color-text-main)] dark:text-[var(--color-text-main)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          YOUR CART
        </motion.h1>

        <div className="space-y-6">
          {items.map((item) => (
            <motion.div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-6 backdrop-blur-md bg-white/5 p-6 rounded-lg dark:bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg bg-white/10 dark:bg-white/5"
              />
              <div className="flex-1">
                <h3 className="font-sans text-lg text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">{item.name}</h3>
                <p className="text-sm text-[var(--color-text-main)]/60 dark:text-[var(--color-text-main)]/60">
                  {item.selectedSize} / {item.selectedColor}
                </p>
                <p className="text-[var(--color-accent)] font-sans dark:text-neon-green">${item.price} × {item.quantity}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-[var(--color-text-main)]/50 hover:text-[var(--color-text-main)] transition-colors dark:text-[var(--color-text-main)]/50 dark:hover:text-[var(--color-text-main)]"
              >
                <X size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-2xl font-sans mb-6 text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">
            Total: <span className="text-[var(--color-accent)] dark:text-neon-green">${totalPrice()}</span>
          </p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={clearCart}
              className="px-6 py-2 text-[var(--color-text-main)]/50 hover:text-[var(--color-text-main)] transition-colors font-sans dark:text-[var(--color-text-main)]/50 dark:hover:text-[var(--color-text-main)]"
            >
              Clear Cart
            </button>
            <Link to="/checkout">
              <button className="px-8 py-3 bg-white/20 text-[var(--color-text-main)] font-sans rounded-full hover:bg-white/30 dark:bg-neon-green/20 dark:text-black transition-all">
                Checkout
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}