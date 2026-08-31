import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { ProductCardVariants } from '@/components/commerce/ProductCard/ProductCardVariants';

export interface ProductCardData {
  id: number;
  sku: string;
  slug: string;
  title: string;
  description?: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  stock: number;
  status: string;
  featured: boolean;
  flashSale: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  trending: boolean;
  averageRating: number;
  reviewCount: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  images?: Array<{
    id: number;
    url: string;
    isPrimary: boolean;
  }>;
}

export interface ProductCardProps
  extends
    Omit<ComponentPropsWithoutRef<'article'>, 'children'>,
    VariantProps<typeof ProductCardVariants> {
  product: ProductCardData;

  hoverable?: boolean;

  showCategory?: boolean;

  showRating?: boolean;

  showOriginalPrice?: boolean;

  showSavings?: boolean;

  showAddToCart?: boolean;

  onProductClick?: (product: ProductCardData) => void;

  onAddToCart?: (product: ProductCardData) => void;

  footer?: ReactNode;
}
