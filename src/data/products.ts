import type { ProductCardData } from '@/components/commerce/ProductCard';

export const products: ProductCardData[] = [
  {
    id: 1,
    title: 'Apple AirPods Pro (2nd Generation)',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600',
    category: 'Electronics',
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 1420,
    badge: '20% OFF',
    inStock: true,
  },
  {
    id: 2,
    title: 'Nike Air Max 270',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    category: 'Shoes',
    price: 180,
    rating: 4.6,
    reviewCount: 890,
    badge: 'New',
    inStock: true,
  },
  {
    id: 3,
    title: 'Minimalist Leather Backpack',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
    category: 'Accessories',
    price: 120,
    originalPrice: 160,
    rating: 4.4,
    reviewCount: 315,
    badge: 'Sale',
    inStock: false,
  },
];
