import { useState } from 'react'
import { supabase } from '../../lib/supabase'

interface ProductFormProps {
  product?: any | null
  onClose: () => void
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price?.toString() || '',
    image: product?.image || '',
    sizes: product?.sizes?.join(', ') || '',
    colors: product?.colors?.join(', ') || '',
    category: product?.category || '',
    description: product?.description || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        sizes: formData.sizes.split(',').map((s: string) => s.trim()),
        colors: formData.colors.split(',').map((c: string) => c.trim()),
        category: formData.category,
        description: formData.description,
      }

      if (product?.id) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert([productData])
        if (error) throw error
      }

      onClose()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto dark:bg-white/5 dark:border-neon-green/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-sans text-[var(--color-text-main)]">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-main)]/50 hover:text-[var(--color-text-main)] transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Image URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Sizes (comma separated)</label>
            <input
              type="text"
              required
              placeholder="S, M, L, XL"
              value={formData.sizes}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Colors (comma separated)</label>
            <input
              type="text"
              required
              placeholder="Red, Blue, Black"
              value={formData.colors}
              onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)] dark:bg-white/5 dark:border-neon-green/30"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white/20 text-[var(--color-text-main)] rounded-full hover:bg-white/30 transition-all disabled:opacity-50 dark:bg-neon-green/20 dark:text-black"
            >
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-white/20 text-[var(--color-text-main)] rounded-full hover:bg-white/10 transition-all dark:border-neon-green/30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}