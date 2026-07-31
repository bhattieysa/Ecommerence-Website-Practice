import type { Product } from '@/types/product';

export const electronicsProducts: Product[] = [
  {
    id: 'el-001',
    sku: 'APL-IP16P',
    slug: 'apple-iphone-16-pro',
    title: 'Apple iPhone 16 Pro',
    description:
      'The iPhone 16 Pro Max is Apples flagship smartphone, featuring a lightweight and durable titanium design with the largest-ever 6.9-inch Super Retina XDR display. Powered by the high-performance A18 Pro chip, it delivers exceptional speed, advanced graphics, and stellar energy efficiency for all-day battery life. The device boasts a professional-grade triple camera system—including a 48MP main sensor, a 48MP ultra-wide lens, and a 5x telephoto zoom—alongside support for 4K 120 fps Dolby Vision video recording. Combined with cutting-edge connectivity and a dedicated Camera Control button, it stands as a premier powerhouse for both media consumption and content creation.',
    brand: 'Apple',
    category: 'electronics',

    image: {
      thumbnail: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqx-9L0lMZSwhcrdB8byrEgWqnMNnqYazZU1Pdio4rg&s=10',
        alt: 'Apple iPhone 16 Pro',
      },
      others: [
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqx-9L0lMZSwhcrdB8byrEgWqnMNnqYazZU1Pdio4rg&s=10',
          alt: 'Apple iPhone 16 Pro',
        },
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqx-9L0lMZSwhcrdB8byrEgWqnMNnqYazZU1Pdio4rg&s=10',
          alt: 'Apple iPhone 16 Pro',
        },
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcWUm2jAKSV0w5ig7t7iwFn3AE7qQ8dg9ajjAX4CKguQ&s=10',
          alt: 'Apple iPhone 16 Pro',
        },
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcWUm2jAKSV0w5ig7t7iwFn3AE7qQ8dg9ajjAX4CKguQ&s=10',
          alt: 'Apple iPhone 16 Pro',
        },
      ],
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

    dispatchTime: 'Dispatch in 5 working days',

    returnsInfo: 'Easy returns available',

    codAvailable: true,

    delivery: {
      freeDelivery: true,
      estimatedDate: 'Thu, 20 Aug',
      estimatedDays: 5,
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
      thumbnail: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGbGhein0gJjcZrXfRYOxBexlSxFhZY3anYHmJcoevw&s=10',
        alt: 'Samsung Galaxy S25 Ultra',
      },
      others: [
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGbGhein0gJjcZrXfRYOxBexlSxFhZY3anYHmJcoevw&s=10',
          alt: 'Samsung Galaxy S25 Ultra',
        },
      ],
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
      thumbnail: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zvw8f4r9dm90Naz4PhpbDfO6_wFT1UaE-iulQ0Dv5w&s=10',
        alt: 'MacBook Air M4',
      },
      others: [
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zvw8f4r9dm90Naz4PhpbDfO6_wFT1UaE-iulQ0Dv5w&s=10',
          alt: 'MacBook Air M4',
        },
      ],
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
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        alt: 'Sony WH-1000XM6',
      },
      others: [
        {
          src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
          alt: 'Sony WH-1000XM6',
        },
      ],
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
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
        alt: 'Apple Watch Series 10',
      },
      others: [
        {
          src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
          alt: 'Apple Watch Series 10',
        },
      ],
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

  {
    id: 'el-006',
    sku: 'RME-GT5',
    slug: 'realme-gt-5',
    title: 'Realme GT 5',
    description:
      'Flagship smartphone with 144Hz display and 240W fast charging.',
    brand: 'Realme',
    category: 'electronics',

    image: {
      thumbnail: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zvw8f4r9dm90Naz4PhpbDfO6_wFT1UaE-iulQ0Dv5w&s=10',
        alt: 'Realme GT 5',
      },
      others: [
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zvw8f4r9dm90Naz4PhpbDfO6_wFT1UaE-iulQ0Dv5w&s=10',
          alt: 'Realme GT 5',
        },
      ],
    },

    price: {
      current: 599,
      original: 699,
      currency: 'USD',
    },

    rating: {
      value: 4.6,
      reviewCount: 1245,
    },

    badge: 'sale',

    inStock: true,
    stockQuantity: 42,

    flags: {
      flashSale: true,
      trending: true,
    },

    dispatchTime: 'Dispatch in 3 working days',

    returnsInfo: 'Easy returns available',

    codAvailable: true,

    delivery: {
      freeDelivery: true,
      estimatedDate: 'Fri, 22 Aug',
      estimatedDays: 3,
    },
  },

  {
    id: 'el-007',
    sku: 'XIA-14U',
    slug: 'xiaomi-14-ultra',
    title: 'Xiaomi 14 Ultra',
    description:
      'Premium flagship with Leica camera system and Snapdragon 8 Gen 3.',
    brand: 'Xiaomi',
    category: 'electronics',

    image: {
      thumbnail: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqx-9L0lMZSwhcrdB8byrEgWqnMNnqYazZU1Pdio4rg&s=10',
        alt: 'Xiaomi 14 Ultra',
      },
      others: [
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqx-9L0lMZSwhcrdB8byrEgWqnMNnqYazZU1Pdio4rg&s=10',
          alt: 'Xiaomi 14 Ultra',
        },
      ],
    },

    price: {
      current: 799,
      original: 899,
      currency: 'USD',
    },

    rating: {
      value: 4.7,
      reviewCount: 1892,
    },

    badge: 'featured',

    inStock: true,
    stockQuantity: 28,

    flags: {
      featured: true,
      bestSeller: true,
    },

    dispatchTime: 'Dispatch in 4 working days',

    returnsInfo: 'Easy returns available',

    codAvailable: true,

    delivery: {
      freeDelivery: true,
      estimatedDate: 'Sat, 23 Aug',
      estimatedDays: 4,
    },
  },
];
