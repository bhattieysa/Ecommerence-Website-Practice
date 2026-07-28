export const groceryProducts = [
    {
        id: 'gr-001',
        sku: 'ORG-HNY',
        slug: 'organic-raw-honey',
        title: 'Organic Raw Honey',
        description: '100% pure natural honey.',
        brand: 'Nature Valley',
        category: 'grocery',
        image: {
            src: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38',
            alt: 'Organic Raw Honey',
        },
        price: {
            current: 14,
            original: 18,
            currency: 'USD',
        },
        rating: {
            value: 4.8,
            reviewCount: 824,
        },
        badge: 'featured',
        inStock: true,
        stockQuantity: 140,
        flags: {
            featured: true,
            bestSeller: true,
        },
    },
    {
        id: 'gr-002',
        sku: 'ALM-MILK',
        slug: 'almond-milk',
        title: 'Organic Almond Milk',
        description: 'Unsweetened almond milk.',
        brand: 'Silk',
        category: 'grocery',
        image: {
            src: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
            alt: 'Almond Milk',
        },
        price: {
            current: 5,
            original: 7,
            currency: 'USD',
        },
        rating: {
            value: 4.6,
            reviewCount: 560,
        },
        badge: 'sale',
        inStock: true,
        stockQuantity: 90,
        flags: {
            flashSale: true,
        },
    },
    {
        id: 'gr-003',
        sku: 'COF-ARB',
        slug: 'premium-coffee-beans',
        title: 'Premium Coffee Beans',
        description: 'Arabica whole bean coffee.',
        brand: 'Star Roast',
        category: 'grocery',
        image: {
            src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
            alt: 'Coffee Beans',
        },
        price: {
            current: 18,
            currency: 'USD',
        },
        rating: {
            value: 4.9,
            reviewCount: 1320,
        },
        inStock: true,
        stockQuantity: 65,
        flags: {
            bestSeller: true,
        },
    },
    {
        id: 'gr-004',
        sku: 'PST-ITA',
        slug: 'italian-pasta',
        title: 'Italian Pasta',
        description: 'Authentic durum wheat pasta.',
        brand: 'Barilla',
        category: 'grocery',
        image: {
            src: 'https://images.unsplash.com/photo-1551462147-37885acc36f1',
            alt: 'Italian Pasta',
        },
        price: {
            current: 4,
            currency: 'USD',
        },
        rating: {
            value: 4.5,
            reviewCount: 440,
        },
        inStock: true,
        stockQuantity: 180,
        flags: {
            featured: true,
        },
    },
    {
        id: 'gr-005',
        sku: 'OLV-OIL',
        slug: 'extra-virgin-olive-oil',
        title: 'Extra Virgin Olive Oil',
        description: 'Cold pressed olive oil.',
        brand: 'Bertolli',
        category: 'grocery',
        image: {
            src: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
            alt: 'Olive Oil',
        },
        price: {
            current: 16,
            original: 20,
            currency: 'USD',
        },
        rating: {
            value: 4.7,
            reviewCount: 612,
        },
        badge: 'hot',
        inStock: true,
        stockQuantity: 72,
        flags: {
            trending: true,
        },
    },
];
