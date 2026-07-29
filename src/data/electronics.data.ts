import type { Product } from '@/types/product';

export const electronicsProducts: Product[] = [
  {
    id: 'el-001',
    sku: 'APL-IP16P',
    slug: 'apple-iphone-16-pro',
    title: 'Apple iPhone 16 Pro',
    description: '6.3-inch Super Retina XDR display with A18 Pro chip.',
    brand: 'Apple',
    category: 'electronics',

    image: {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqx-9L0lMZSwhcrdB8byrEgWqnMNnqYazZU1Pdio4rg&s=10',
      alt: 'Apple iPhone 16 Pro',
    },

    price: {
      current: 999,
      original: 1099,
      currency: 'USD',
    },

    rating: {
      value: 4.9,
      reviewCount: 3521,
    },

    badge: 'featured',

    inStock: true,
    stockQuantity: 35,

    flags: {
      featured: true,
      bestSeller: true,
      trending: true,
    },
  },

  {
    id: 'el-002',
    sku: 'SMS-S25U',
    slug: 'samsung-galaxy-s25-ultra',
    title: 'Samsung Galaxy S25 Ultra',
    description: 'Premium Android flagship with AI features.',
    brand: 'Samsung',
    category: 'electronics',

    image: {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGbGhein0gJjcZrXfRYOxBexlSxFhZY3anYHmJcoevw&s=10',
      alt: 'Samsung Galaxy S25 Ultra',
    },

    price: {
      current: 1099,
      original: 1199,
      currency: 'USD',
    },

    rating: {
      value: 4.8,
      reviewCount: 2815,
    },

    badge: 'new',

    inStock: true,
    stockQuantity: 24,

    flags: {
      featured: true,
      newArrival: true,
      trending: true,
    },
  },

  {
    id: 'el-003',
    sku: 'APL-MBA-M4',
    slug: 'macbook-air-m4',
    title: 'MacBook Air M4',
    description: 'Lightweight laptop powered by i M4.',
    brand: 'Apple',
    category: 'electronics',

    image: {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zvw8f4r9dm90Naz4PhpbDfO6_wFT1UaE-iulQ0Dv5w&s=10',
      alt: 'MacBook Air M4',
    },

    price: {
      current: 1299,
      original: 1399,
      currency: 'USD',
    },

    rating: {
      value: 4.9,
      reviewCount: 1822,
    },

    inStock: true,
    stockQuantity: 14,

    flags: {
      featured: true,
      bestSeller: true,
    },
  },

  {
    id: 'el-004',
    sku: 'SON-WH1000',
    slug: 'sony-wh1000xm6',
    title: 'Sony WH-1000XM6',
    description: 'Industry-leading wireless noise cancelling headphones.',
    brand: 'Sony',
    category: 'electronics',

    image: {
      src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      alt: 'Sony WH-1000XM6',
    },

    price: {
      current: 399,
      original: 449,
      currency: 'USD',
    },

    rating: {
      value: 4.8,
      reviewCount: 2114,
    },

    badge: 'sale',

    inStock: true,
    stockQuantity: 51,

    flags: {
      flashSale: true,
      featured: true,
    },
  },

  {
    id: 'el-005',
    sku: 'APL-AWS10',
    slug: 'apple-watch-series-10',
    title: 'Apple Watch Series 10',
    description: 'Advanced health and fitness smartwatch.',
    brand: 'Apple',
    category: 'electronics',

    image: {
      src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      alt: 'Apple Watch Series 10',
    },

    price: {
      current: 429,
      currency: 'USD',
    },

    rating: {
      value: 4.7,
      reviewCount: 1660,
    },

    inStock: true,
    stockQuantity: 29,

    flags: {
      bestSeller: true,
    },
  },
];
