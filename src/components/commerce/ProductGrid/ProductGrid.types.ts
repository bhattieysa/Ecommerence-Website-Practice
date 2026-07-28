import type { ComponentPropsWithoutRef } from 'react';

import type { VariantProps } from 'class-variance-authority';

import type { ProductCardData, ProductCardProps } from '../ProductCard';

import { ProductGridVariants } from './ProductGridVariants';

export interface ProductGridCardProps
  extends Pick<
    ProductCardProps,
    | 'size'
    | 'radius'
    | 'showCategory'
    | 'showRating'
    | 'showOriginalPrice'
    | 'showSavings'
    | 'showAddToCart'
    | 'hoverable'
  > {}

export interface ProductGridActions {
  onProductClick?: (product: ProductCardData) => void;

  onAddToCart?: (product: ProductCardData) => void;
}

export interface ProductGridProps
  extends
    ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof ProductGridVariants> {
  products: readonly ProductCardData[];

  actions?: ProductGridActions;

  cardProps?: ProductGridCardProps;

  emptyState?: React.ReactNode;
}
