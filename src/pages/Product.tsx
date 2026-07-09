import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useStore from '../store/useStore'
import { mockProducts } from '../lib/mockProducts'
import SizeRecommender from '../components/SizeRecommender'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const addItem = useStore((s) => s.addItem)
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]
  const [showSizeRecommender, setShowSizeRecommender] = useState(false)

  return (
    <div className="min-h-screen text-black pt-24">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 backdrop-blur-xl bg-ivory/70 border border-gold/30 rounded-2xl p-8">
        <motion.div
          className="aspect-[3/4] bg-pearl/60 rounded-lg overflow-hidden"
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
          <h1 className="text-4xl font-sans mb-4 text-black">{product.name}</h1>
          <p className="text-2xl text-gold font-sans mb-8">${product.price}</p>

          <p className="text-steel mb-8 leading-relaxed font-sans">
            Premium streetwear with bold design. Made for the modern rebel who doesn't follow trends.
          </p>

          <div className="mb-6">
            <label className="text-sm font-sans mb-3 block text-charcoal">Size</label>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-5 py-2.5 border border-gold/40 rounded-full hover:bg-gold/15 transition-colors font-sans text-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <label className="text-sm font-sans mb-3 block text-charcoal">Color</label>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="px-5 py-2.5 border border-gold/40 rounded-full hover:bg-gold/15 transition-colors font-sans text-black"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowSizeRecommender(true)}
            className="w-full py-4 bg-gold/25 text-black font-sans rounded-full hover:bg-gold/40 transition-all border border-gold/40 mb-3"
          >
            Find My Size
          </button>
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
            className="w-full py-4 bg-gold/30 text-black font-sans rounded-full hover:bg-gold/50 transition-all border border-gold/40"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      {showSizeRecommender && (
        <SizeRecommender
          productSizes={product.sizes}
          productName={product.name}
          productImage={product.image}
          onClose={() => setShowSizeRecommender(false)}
        />
      )}
    </div>
  )
}