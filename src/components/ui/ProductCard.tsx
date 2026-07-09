import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

type ProductCardProps = {
  product: {
    id: string
    name: string
    price: number
    image: string
    sizes: string[]
    colors: string[]
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useStore((s) => s.addItem)

  return (
    <motion.div className="group cursor-pointer" whileHover={{ y: -3 }}>
      <div className="rounded-lg backdrop-blur-xl bg-mist-100/60 border border-mist-300/40 shadow-lg flex flex-col gap-3 transition-all duration-300 relative overflow-hidden">
        {/* Accent bar */}
        <div className="absolute left-0 top-4 bottom-4 w-1 bg-haze-sky rounded-r-full" />

        <div className="overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-sans text-lg text-mist-900">{product.name}</h3>
          <p className="text-sm text-haze-skyDeep font-medium">${product.price}</p>
        </div>

        <div className="px-4 pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                selectedSize: product.sizes[0] || 'M',
                selectedColor: product.colors[0] || 'Black',
              })
            }
            className="w-full backdrop-blur-md bg-haze-sky/20 text-mist-900 px-4 py-2 rounded font-sans border border-haze-sky/30 hover:bg-haze-sky/30 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}