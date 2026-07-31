import type { Product } from '@/types/product';

export const fashionProducts: Product[] = [
  {
    id: 'fa-001',
    sku: 'NIK-AFM1',
    slug: 'nike-air-force-1',
    title: 'Nike Air Force 1',
    description: 'Classic everyday sneakers.',
    brand: 'Nike',
    category: 'fashion',

    image: {
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        alt: 'Nike Air Force 1',
      },
      others: [],
    },

    price: {
      current: 129,
      original: 149,
      currency: 'USD',
    },

    rating: {
      value: 4.8,
      reviewCount: 4420,
    },

    badge: 'best-seller',

    inStock: true,
    stockQuantity: 72,

    flags: {
      featured: true,
      bestSeller: true,
    },
  },

  {
    id: 'fa-002',
    sku: 'ADS-UB24',
    slug: 'adidas-ultraboost-24',
    title: 'Adidas Ultraboost 24',
    description: 'Comfortable running shoes.',
    brand: 'Adidas',
    category: 'fashion',

    image: {
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f',
        alt: 'Adidas Ultraboost 24',
      },
      others: [],
    },

    price: {
      current: 179,
      original: 210,
      currency: 'USD',
    },

    rating: {
      value: 4.7,
      reviewCount: 1912,
    },

    badge: 'sale',

    inStock: true,
    stockQuantity: 44,

    flags: {
      flashSale: true,
    },
  },

  {
    id: 'fa-003',
    sku: 'LEV-511',
    slug: 'levis-511-jeans',
    title: "Levi's 511 Slim Jeans",
    description: 'Classic slim-fit denim.',
    brand: "Levi's",
    category: 'fashion',

    image: {
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
        alt: "Levi's 511 Jeans",
      },
      others: [],
    },

    price: {
      current: 69,
      currency: 'USD',
    },

    rating: {
      value: 4.6,
      reviewCount: 980,
    },

    inStock: true,
    stockQuantity: 63,

    flags: {
      featured: true,
    },
  },

  {
    id: 'fa-004',
    sku: 'UNI-HDY',
    slug: 'uniqlo-hoodie',
    title: 'Uniqlo Cotton Hoodie',
    description: 'Soft everyday hoodie.',
    brand: 'Uniqlo',
    category: 'fashion',

    image: {
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        alt: 'Uniqlo Hoodie',
      },
      others: [],
    },

    price: {
      current: 49,
      original: 59,
      currency: 'USD',
    },

    rating: {
      value: 4.5,
      reviewCount: 715,
    },

    badge: 'new',

    inStock: true,
    stockQuantity: 81,

    flags: {
      newArrival: true,
    },
  },

  {
    id: 'fa-005',
    sku: 'TIM-CHR',
    slug: 'timex-chronograph-watch',
    title: 'Timex Chronograph Watch',
    description: 'Elegant leather strap watch.',
    brand: 'Timex',
    category: 'fashion',

    image: {
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',
        alt: 'Timex Watch',
      },
      others: [],
    },

    price: {
      current: 159,
      currency: 'USD',
    },

    rating: {
      value: 4.7,
      reviewCount: 1364,
    },

    inStock: true,
    stockQuantity: 18,

    flags: {
      trending: true,
    },
  },
];
