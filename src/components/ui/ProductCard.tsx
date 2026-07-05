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
      <div className="rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg flex flex-col gap-3 dark:bg-white/5 dark:border-neon-green/20 transition-all duration-300">
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-sans text-lg text-[var(--color-text-main)] dark:text-[var(--color-text-main)]">{product.name}</h3>
          <p className="text-sm text-[var(--color-text-main)]/60 dark:text-[var(--color-text-main)]/60">${product.price}</p>
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
            className="w-full backdrop-blur-md bg-white/20 text-[var(--color-text-main)] px-4 py-2 rounded font-sans border border-white/10 dark:bg-neon-green/20 dark:text-black dark:border-neon-green/30 hover:dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}