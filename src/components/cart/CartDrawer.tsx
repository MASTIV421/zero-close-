import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../../store/useStore'

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, removeItem, totalPrice } = useStore()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent z-40"
            onClick={() => setCartOpen(false)}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col backdrop-blur-xl bg-white/5 border-l border-white/10 dark:bg-white/5 dark:border-neon-green/20"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-lg font-sans text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">
                Your Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
              <button onClick={() => setCartOpen(false)} className="p-2 text-[var(--color-text-main)]/50 hover:text-[var(--color-text-main)] transition-colors dark:text-[var(--color-text-main)]/50 dark:hover:text-[var(--color-text-main)]">
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-[var(--color-text-main)]/50 dark:text-[var(--color-text-main)]/50">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 backdrop-blur-md bg-white/5 rounded-lg p-2 dark:bg-white/5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg bg-white/10 dark:bg-white/5"
                      />
                      <div className="flex-1">
                        <h3 className="font-sans text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">{item.name}</h3>
                        <p className="text-sm text-[var(--color-text-main)]/60 dark:text-[var(--color-text-main)]/60">
                          {item.selectedSize} / {item.selectedColor}
                        </p>
                        <p className="text-[var(--color-accent)] font-sans dark:text-neon-green">${item.price} × {item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                        className="text-[var(--color-text-main)]/50 hover:text-[var(--color-text-main)] transition-colors dark:text-[var(--color-text-main)]/50 dark:hover:text-[var(--color-text-main)]"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-sans text-[var(--color-text-main)]/70 dark:text-[var(--color-text-main)]/70">Subtotal</span>
                    <span className="text-2xl font-bold text-[var(--color-accent)] dark:text-neon-green">${totalPrice()}</span>
                  </div>
                  <button className="w-full py-4 bg-white/20 text-[var(--color-text-main)] font-sans rounded-full hover:bg-white/30 dark:bg-neon-green/20 dark:text-black transition-all">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}