import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { ProductCardVariants } from '@/components/commerce/ProductCard/ProductCardVariants';

export interface ProductCardData {
  id: string | number;

  title: string;

  image: string;

  category?: string;

  price: number;

  originalPrice?: number;

  rating?: number;

  reviewCount?: number;

  badge?: string;

  inStock?: boolean;
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

  showAddToCart?: boolean;

  onProductClick?: (product: ProductCardData) => void;

  onAddToCart?: (product: ProductCardData) => void;

  footer?: ReactNode;
}
