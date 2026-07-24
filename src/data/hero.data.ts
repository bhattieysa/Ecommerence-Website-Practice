import type { HeroProps } from '@/features/home/Hero/Hero.types';
import watchImage from '@/assets/images/hero/watch.png';
import earbudsImage from '@/assets/images/hero/earbuds.png';
import laptopImage from '@/assets/images/hero/laptop.png';

export const HERO_SLIDES: HeroProps[] = [
  {
    id: 'smart-watch',
    badge: 'Best Deal Online',
    title: 'SMART WEARABLE',
    subtitle: 'UP TO 80% OFF',
    description: 'Discover premium  wearables designed for everyday life.',
    image: watchImage,
    imageAlt: 'Smart Watch',
  },
  {
    id: 'wireless-earbuds',
    badge: 'Latest Collection',
    title: 'WIRELESS AUDIO',
    subtitle: 'UP TO 60% OFF',
    description: 'Experience immersive sound with our newest earbuds.',
    image: earbudsImage,
    imageAlt: 'Wireless Earbuds',
  },
  {
    id: 'gaming-laptop',
    badge: 'Trending Now',
    title: 'ULTRA PERFORMANCE',
    subtitle: 'SAVE 40%',
    description: 'Powerful laptops built for work and gaming.',
    image: laptopImage,
    imageAlt: 'Gaming Laptop',
  },
];
