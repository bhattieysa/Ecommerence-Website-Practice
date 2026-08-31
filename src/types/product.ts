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

export interface Image {
  src: string;
  alt: string;
}
export interface ProductImage {
  thumbnail: Image;
  others?: Image[];
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
  id: string | number;

  sku: string;

  slug: string;

  title: string;

  description?: string;

  brand: string;

  category: ProductCategory;

  image: ProductImage;

  price: number | ProductPrice;
  
  compareAtPrice?: number;

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

  dispatchTime?: string;

  returnsInfo?: string;

  codAvailable?: boolean;
  
  averageRating?: number;
  
  images?: Array<{
    id: number;
    url: string;
    isPrimary: boolean;
  }>;
}
