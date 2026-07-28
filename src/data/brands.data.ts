export interface BrandImage {
  src: string;
  alt: string;
}

export interface BrandData {
  id: string;

  name: string;

  logo: BrandImage;

  href: string;

  featured?: boolean;
}

export const BRANDS: BrandData[] = [
  {
    id: 'apple',
    name: 'Apple',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      alt: 'Apple',
    },
    href: '/brand/apple',
    featured: true,
  },

  {
    id: 'samsung',
    name: 'Samsung',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
      alt: 'Samsung',
    },
    href: '/brand/samsung',
    featured: true,
  },

  {
    id: 'sony',
    name: 'Sony',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
      alt: 'Sony',
    },
    href: '/brand/sony',
    featured: true,
  },

  {
    id: 'nike',
    name: 'Nike',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      alt: 'Nike',
    },
    href: '/brand/nike',
  },

  {
    id: 'adidas',
    name: 'Adidas',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      alt: 'Adidas',
    },
    href: '/brand/adidas',
  },

  {
    id: 'logitech',
    name: 'Logitech',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Logitech_logo.svg',
      alt: 'Logitech',
    },
    href: '/brand/logitech',
  },

  {
    id: 'lg',
    name: 'LG',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg',
      alt: 'LG',
    },
    href: '/brand/lg',
  },

  {
    id: 'philips',
    name: 'Philips',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Philips_logo.svg',
      alt: 'Philips',
    },
    href: '/brand/philips',
  },

  {
    id: 'lenovo',
    name: 'Lenovo',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
      alt: 'Lenovo',
    },
    href: '/brand/lenovo',
  },

  {
    id: 'asus',
    name: 'ASUS',
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
      alt: 'ASUS',
    },
    href: '/brand/asus',
  },
];
