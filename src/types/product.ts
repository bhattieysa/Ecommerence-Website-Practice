export interface Product {
  id: string;
  title: string;
  description?: string;

  image: string;

  price: number;

  originalPrice?: number;

  rating: number;

  reviewCount: number;

  badge?: string;

  category?: string;

  inStock?: boolean;
}
