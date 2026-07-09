import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import useStore from '../store/useStore'

export default function Cart() {
  const { items, removeItem, totalPrice, clearCart } = useStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen text-black pt-24 flex items-center justify-center">
        <motion.div
          className="text-center backdrop-blur-xl bg-ivory/70 border border-gold/30 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-sans mb-6 text-black">YOUR CART IS EMPTY</h1>
          <Link to="/shop">
            <button className="px-8 py-3 bg-gold/25 text-black font-sans rounded-full hover:bg-gold/40 transition-all border border-gold/30">
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-black pt-24">
      <div className="container mx-auto px-6 max-w-4xl backdrop-blur-xl bg-ivory/70 border border-gold/30 rounded-2xl p-8">
        <motion.h1
          className="text-3xl font-sans mb-12 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          YOUR CART
        </motion.h1>

        <div className="space-y-6">
          {items.map((item) => (
            <motion.div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-6 backdrop-blur-md bg-pearl/60 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg bg-graphite/40"
              />
              <div className="flex-1">
                <h3 className="font-sans text-lg text-black">{item.name}</h3>
                <p className="text-sm text-steel">
                  {item.selectedSize} / {item.selectedColor}
                </p>
                <p className="text-gold font-sans">${item.price} × {item.quantity}</p>
              </div>
              <button
                onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                className="text-steel hover:text-black transition-colors"
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
          <p className="text-2xl font-sans mb-6 text-black">
            Total: <span className="text-gold">${totalPrice()}</span>
          </p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={clearCart}
              className="px-6 py-2 text-steel hover:text-black transition-colors font-sans"
            >
              Clear Cart
            </button>
            <Link to="/checkout">
              <button className="px-8 py-3 bg-gold/25 text-black font-sans rounded-full hover:bg-gold/40 transition-all border border-gold/30">
                Checkout
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}