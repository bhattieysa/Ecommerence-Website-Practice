import type { NavbarLink } from './Navbar.types';

export const NAVBAR_DEFAULTS = {
  sticky: false,
  showSearch: true,
} as const;

export const NAVBAR_LINKS: readonly NavbarLink[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    href: '/products',
  },
  {
    label: 'Categories',
    href: '/categories',
  },
  {
    label: 'Deals',
    href: '/deals',
  },
  {
    label: 'Wishlist',
    href: '/wishlist',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const NAVBAR_LABELS = {
  searchPlaceholder: 'Search essentials, groceries and more...',
} as const;

export const APP_BRAND = {
  name: 'MegaMart',
} as const;
