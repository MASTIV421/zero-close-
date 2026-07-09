import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mockProducts } from '../lib/mockProducts'
import ProductCard from '../components/ui/ProductCard'
import CloudSky from '../components/CloudSky'

export default function Home() {
  return (
    <div className="min-h-screen text-black">
      {/* Elegance Collection Hero Section - FIRST */}
      <section className="relative h-[70vh] md:h-screen overflow-hidden">
        <CloudSky />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory/30" />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-24">
          <motion.h1
            className="text-5xl md:text-7xl font-sans mb-6 text-black drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Elegance Collection
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-steel mb-8 max-w-2xl font-sans drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Timeless pieces crafted for the modern connoisseur.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <Link to="/shop">
              <button className="px-10 py-4 backdrop-blur-md bg-gold/25 text-black font-sans rounded-full hover:bg-gold/40 transition-all border border-gold/40 shadow-lg">
                Explore Collection
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-sans text-black">NEW ARRIVALS</h2>
            <Link to="/shop" className="text-sm font-sans text-gold hover:text-black transition-colors">
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

      {/* Featured */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-sans text-black">FEATURED</h2>
            <Link to="/shop" className="text-sm font-sans text-gold hover:text-black transition-colors">
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

      {/* ZERO AGANCE Section - LAST */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
        <CloudSky />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '100vh' }}>
          <div className="container mx-auto px-6 py-24 text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-sans mb-6 text-black drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ZERO AGANCE
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-steel mb-12 font-sans tracking-widest drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Collection
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  )
}
