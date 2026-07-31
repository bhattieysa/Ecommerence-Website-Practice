export interface Promotion {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;

  image: string;

  badge?: string;
  badgeVariant?: 'sale' | 'iphone' | 'realme' | 'xiaomi';

  buttonText: string;
  href: string;

  variant?: 'sale' | 'electronics' | 'fashion' | 'gaming' | 'dark';
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'iphone-promo',
    slug: 'iphone-promo',
    badge: 'IPHONE',
    badgeVariant: 'iphone',
    title: 'UP to 80% OFF',
    subtitle: 'Apple',
    description: 'Experience the latest iPhone with amazing discounts',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGbGhein0gJjcZrXfRYOxBexlSxFhZY3anYHmJcoevw&s=10',
    buttonText: 'Shop Now',
    href: '/products/apple-iphone-16-pro',
    variant: 'dark',
  },
  {
    id: 'realme-promo',
    slug: 'realme-promo',
    badge: 'REALME',
    badgeVariant: 'realme',
    title: 'UP to 80% OFF',
    subtitle: 'realme',
    description: 'Get the best deals on Realme smartphones',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zvw8f4r9dm90Naz4PhpbDfO6_wFT1UaE-iulQ0Dv5w&s=10',
    buttonText: 'Shop Now',
    href: '/products/realme-gt-5',
    variant: 'sale',
  },
  {
    id: 'xiaomi-promo',
    slug: 'xiaomi-promo',
    badge: 'XIAOMI',
    badgeVariant: 'xiaomi',
    title: 'UP to 80% OFF',
    subtitle: 'Xiaomi',
    description: 'Discover Xiaomi phones at unbeatable prices',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqx-9L0lMZSwhcrdB8byrEgWqnMNnqYazZU1Pdio4rg&s=10',
    buttonText: 'Shop Now',
    href: '/products/xiaomi-14-ultra',
    variant: 'electronics',
  },
];
