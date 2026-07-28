export interface Promotion {
  id: string;
  title: string;
  subtitle?: string;
  description: string;

  image: string;

  badge?: string;

  buttonText: string;
  href: string;

  background: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'summer-sale',

    badge: '50% OFF',

    title: 'Summer Sale',

    subtitle: 'Limited Time Offer',

    description: 'Save up to 50% on selected electronics and accessories.',

    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',

    buttonText: 'Shop Now',

    href: '/shop',

    background: 'from-blue-600 via-blue-500 to-cyan-500',
  },

  {
    id: 'fashion-week',

    badge: 'NEW',

    title: 'Fashion Week',

    subtitle: 'Trending Collection',

    description: 'Discover the latest arrivals from premium fashion brands.',

    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',

    buttonText: 'Explore',

    href: '/shop/fashion',

    background: 'from-pink-600 via-rose-500 to-orange-400',
  },

  {
    id: 'gaming-deals',

    badge: 'HOT',

    title: 'Gaming Deals',

    subtitle: 'Weekend Specials',

    description: 'Exclusive discounts on gaming consoles and accessories.',

    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8',

    buttonText: 'View Deals',

    href: '/shop/gaming',

    background: 'from-purple-700 via-indigo-600 to-blue-600',
  },
];
