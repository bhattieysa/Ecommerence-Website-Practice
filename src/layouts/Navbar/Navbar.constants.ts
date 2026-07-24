import type { NavbarLink } from './Navbar.types';

export const NAVBAR_DEFAULTS = {
  sticky: false,
  showSearch: true,
} as const;

export const NAVBAR_LINKS: readonly NavbarLink[] = [
  {
    label: 'Home',
    href: '/',
    icon: 'home',
  },
  {
    label: 'Products',
    href: '/products',
    icon: 'package',
  },
  {
    label: 'Categories',
    href: '/categories',
    icon: 'categories',
  },
  {
    label: 'Deals',
    href: '/deals',
    icon: 'deals',
  },
  {
    label: 'Wishlist',
    href: '/wishlist',
    icon: 'wishlist',
  },
  {
    label: 'About',
    href: '/about',
    icon: 'about',
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: 'contact',
  },
];

export const NAVBAR_LABELS = {
  searchPlaceholder: 'Search essentials, groceries and more...',
} as const;

export const APP_BRAND = {
  name: 'MegaMart',
} as const;
