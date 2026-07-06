interface ProductTableProps {
  products: any[]
  onEdit: (product: any) => void
  onDelete: (id: string) => void
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center dark:bg-white/5 dark:border-neon-green/20">
        <p className="text-[var(--color-text-main)]/70">No products found. Create your first product!</p>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden dark:bg-white/5 dark:border-neon-green/20">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-sans text-[var(--color-text-main)]/70">Product</th>
              <th className="text-left px-6 py-4 text-sm font-sans text-[var(--color-text-main)]/70">Category</th>
              <th className="text-left px-6 py-4 text-sm font-sans text-[var(--color-text-main)]/70">Price</th>
              <th className="text-left px-6 py-4 text-sm font-sans text-[var(--color-text-main)]/70">Sizes</th>
              <th className="text-left px-6 py-4 text-sm font-sans text-[var(--color-text-main)]/70">Colors</th>
              <th className="text-right px-6 py-4 text-sm font-sans text-[var(--color-text-main)]/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg bg-white/10"
                    />
                    <div>
                      <p className="font-sans text-[var(--color-text-main)]">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[var(--color-text-main)]/70">
                  {product.category || '-'}
                </td>
                <td className="px-6 py-4 text-sm font-sans text-[var(--color-text-main)]">
                  ${product.price}
                </td>
                <td className="px-6 py-4 text-sm text-[var(--color-text-main)]/70">
                  {product.sizes?.join(', ') || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-[var(--color-text-main)]/70">
                  {product.colors?.join(', ') || '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onEdit(product)}
                      className="px-3 py-1 text-sm bg-white/10 text-[var(--color-text-main)] rounded hover:bg-white/20 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="px-3 py-1 text-sm bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
