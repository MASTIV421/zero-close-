import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mockProducts } from '../lib/mockProducts'
import ProductCard from '../components/ui/ProductCard'

export default function Home() {
  const gradientColors = ['#FDFBF7', '#4A6B5D', '#0D0E15']

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-text-main)]">
      <section className="relative h-[70vh] md:h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`,
              `linear-gradient(225deg, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`,
              `linear-gradient(315deg, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`,
            ],
          }}
          transition={{
            duration: 15,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-24">
          <motion.h1
            className="text-5xl md:text-7xl font-sans mb-6 text-[var(--color-text-main)] dark:text-[var(--color-text-main)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Elegance Collection
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[var(--color-text-main)]/80 mb-8 max-w-2xl font-sans dark:text-[var(--color-text-main)]/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Timeless pieces crafted for the modern connoisseur.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <Link to="/shop">
              <button className="px-10 py-4 backdrop-blur-md bg-white/15 text-[var(--color-text-main)] font-sans rounded-full hover:bg-white/25 dark:bg-neon-green/15 dark:text-black transition-all">
                Explore Collection
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="backdrop-blur-md bg-transparent py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-sans text-[var(--color-text-main)]">NEW ARRIVALS</h2>
            <Link to="/shop" className="text-sm font-sans text-[var(--color-accent)] hover:text-[var(--color-text-main)] transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="backdrop-blur-md bg-transparent py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-sans text-[var(--color-text-main)]">FEATURED</h2>
            <Link to="/shop" className="text-sm font-sans text-[var(--color-accent)] hover:text-[var(--color-text-main)] transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.slice(4, 8).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}