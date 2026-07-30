export type Currency = 'USD';

export type ProductCategory =
  | 'electronics'
  | 'fashion'
  | 'grocery'
  | 'beauty'
  | 'home'
  | 'kitchen'
  | 'sports'
  | 'gaming'
  | 'accessories'
  | 'books';

export type ProductBadge =
  'sale' | 'new' | 'hot' | 'featured' | 'best-seller' | 'limited';

export interface ProductPrice {
  current: number;
  original?: number;
  currency: Currency;
}

export interface ProductRating {
  value: number;
  reviewCount: number;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductLogo {
  src: string;
  alt: string;
}

export interface ProductFlags {
  featured?: boolean;
  flashSale?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  trending?: boolean;
}

export interface ProductDelivery {
  freeDelivery: boolean;
  estimatedDate: string;
  estimatedDays?: number;
}

export interface ProductDeliveryOption {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ProductServices {
  replacement: string;
  warranty?: string;
  securePayment: boolean;
  originalProduct: boolean;
}

export interface Product {
  id: string;

  sku: string;

  slug: string;

  title: string;

  description?: string;

  brand: string;

  category: ProductCategory;

  image: ProductImage;

  price: ProductPrice;

  rating: ProductRating;

  badge?: ProductBadge;

  inStock: boolean;

  stockQuantity: number;

  flags: ProductFlags;

  logo?: ProductLogo;

  href?: string;

  reviewCount?: number;

  delivery?: ProductDelivery;

  services?: ProductServices;

  deliveryOptions?: ProductDeliveryOption[];
}
