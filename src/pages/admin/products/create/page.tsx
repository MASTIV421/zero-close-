import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../../lib/supabase'

export default function CreateProduct() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    sizes: '',
    colors: '',
    category: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.from('products').insert([
        {
          name: formData.name,
          price: parseFloat(formData.price),
          image: formData.image,
          sizes: formData.sizes.split(',').map(s => s.trim()),
          colors: formData.colors.split(',').map(c => c.trim()),
          category: formData.category,
          description: formData.description,
        },
      ]).select().single()

      if (error) throw error
      navigate('/admin/products')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-sans mb-8 text-[var(--color-text-main)]">Add New Product</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Image URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
            />
          </div>

          <div>
            <label className="block text-sm font-sans mb-2 text-[var(--color-text-main)]">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-[var(--color-text-main)]"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white/20 text-[var(--color-text-main)] rounded-full hover:bg-white/30 transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 border border-white/20 text-[var(--color-text-main)] rounded-full hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
