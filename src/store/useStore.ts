import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  selectedSize: string
  selectedColor: string
}

type StoreState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
  category: string
  priceRange: [number, number]
  searchQuery: string
  setCategory: (category: string) => void
  setPriceRange: (priceRange: [number, number]) => void
  setSearchQuery: (searchQuery: string) => void
  resetFilters: () => void
  isCartOpen: boolean
  isMobileMenu: boolean
  setCartOpen: (isCartOpen: boolean) => void
  setMobileMenu: (isMobileMenu: boolean) => void
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      category: '',
      priceRange: [0, 1000],
      searchQuery: '',
      setCategory: (category) => set({ category }),
      setPriceRange: (priceRange) => set({ priceRange }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      resetFilters: () => set({ category: '', priceRange: [0, 1000], searchQuery: '' }),
      isCartOpen: false,
      isMobileMenu: false,
      setCartOpen: (isCartOpen) => set({ isCartOpen }),
      setMobileMenu: (isMobileMenu) => set({ isMobileMenu }),
    }),
    {
      name: 'streetwear-storage',
      partialize: (state) => ({
        items: state.items,
        category: state.category,
        priceRange: state.priceRange,
        searchQuery: state.searchQuery,
        isCartOpen: state.isCartOpen,
      }),
    }
  )
)

export default useStore