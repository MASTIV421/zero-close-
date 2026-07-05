import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'
import { mockProducts } from '../lib/mockProducts'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const addItem = useStore((s) => s.addItem)
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-text-main)] pt-24">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-8 dark:bg-white/5 dark:border-neon-green/20">
        <motion.div
          className="aspect-[3/4] bg-white/30 rounded-lg overflow-hidden dark:bg-white/10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-sans mb-4 text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">{product.name}</h1>
          <p className="text-2xl text-[var(--color-accent)] font-sans mb-8 dark:text-neon-green">${product.price}</p>

          <p className="text-[var(--color-text-main)]/70 mb-8 leading-relaxed font-sans dark:text-[var(--color-text-main)]/70">
            Premium streetwear with bold design. Made for the modern rebel who doesn't follow trends.
          </p>

          <div className="mb-6">
            <label className="text-sm font-sans mb-3 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">Size</label>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-5 py-2.5 border border-[var(--color-accent)]/30 rounded-full hover:bg-white/20 transition-colors font-sans text-[var(--color-text-main)] dark:border-neon-green/30 dark:hover:bg-neon-green/10"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <label className="text-sm font-sans mb-3 block text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">Color</label>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="px-5 py-2.5 border border-[var(--color-accent)]/30 rounded-full hover:bg-white/20 transition-colors font-sans text-[var(--color-text-main)] dark:border-neon-green/30 dark:hover:bg-neon-green/10"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                selectedSize: product.sizes[0],
                selectedColor: product.colors[0],
              })
            }
            className="w-full py-4 bg-white/30 text-[var(--color-text-main)] font-sans rounded-full hover:bg-white/40 dark:bg-neon-green/20 dark:text-black transition-all"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  )
}