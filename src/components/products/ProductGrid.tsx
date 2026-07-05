import { motion } from 'framer-motion'
import ProductCard from '../ui/ProductCard'
import { mockProducts } from '../../lib/mockProducts'

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl dark:bg-white/5 dark:border-neon-green/20">
      {mockProducts.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}