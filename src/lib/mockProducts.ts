export type Product = {
  id: string
  name: string
  price: number
  image: string
  sizes: string[]
  colors: string[]
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cotton Crew Neck Tee',
    price: 45,
    image: 'https://images.unsplash.com/photo-1529376665391-8e3aafcd2d13?w=600',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
  },
  {
    id: '2',
    name: 'Tailored Chino Trousers',
    price: 85,
    image: 'https://images.unsplash.com/photo-1475179593347-30016c6c5c8c?w=600',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Navy', 'Olive'],
  },
  {
    id: '3',
    name: 'Cashmere Knit Cardigan',
    price: 185,
    image: 'https://images.unsplash.com/photo-1544021556-6d1087f6d6b4?w=600',
    sizes: ['M', 'L', 'XL'],
    colors: ['Cream', 'Gray', 'Black'],
  },
  {
    id: '4',
    name: 'Slim Fit Oxford Shirt',
    price: 75,
    image: 'https://images.unsplash.com/photo-1598033100184-77c0f50f8f5e?w=600',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink'],
  },
  {
    id: '5',
    name: 'Wool Blend Overcoat',
    price: 295,
    image: 'https://images.unsplash.com/photo-1536910659063-7b4d6e5e6c6b?w=600',
    sizes: ['M', 'L', 'XL'],
    colors: ['Camel', 'Charcoal', 'Navy'],
  },
  {
    id: '6',
    name: 'Premium Denim Jeans',
    price: 125,
    image: 'https://images.unsplash.com/photo-1542272604-69d9bf900429?w=600',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Classic Blue', 'Black', 'Light Wash'],
  },
]