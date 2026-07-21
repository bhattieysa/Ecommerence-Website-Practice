import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { productCardVariants } from '@/components/commerce/ProductCard/ProductCardVariants';

/**
 * UI model consumed by ProductCard.
 * Keep this independent from the backend Product model.
 */
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
    VariantProps<typeof productCardVariants> {
  /**
   * Product displayed by the card.
   */
  product: ProductCardData;

  /**
   * Enables hover effects.
   */
  hoverable?: boolean;

  /**
   * Controls optional sections.
   */
  showCategory?: boolean;

  showRating?: boolean;

  showOriginalPrice?: boolean;

  showAddToCart?: boolean;

  /**
   * Event callbacks.
   */
  onProductClick?: (product: ProductCardData) => void;

  onAddToCart?: (product: ProductCardData) => void;

  /**
   * Optional footer override.
   */
  footer?: ReactNode;
}
