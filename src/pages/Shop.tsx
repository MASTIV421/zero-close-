import { motion } from 'framer-motion';
import ProductGrid from '../components/products/ProductGrid';
import GlassLayout from '../components/GlassLayout';

export default function Shop() {
  return (
    <GlassLayout>
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-sans mb-12 text-white tracking-wider"
      >
        All Products
      </motion.h1>
      
      {/* Product Grid */}
      <div className="w-full">
        <ProductGrid />
      </div>
    </GlassLayout>
  );
}