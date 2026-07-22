import type { ComponentPropsWithoutRef } from 'react';

import type { VariantProps } from 'class-variance-authority';

import type { ProductCardData } from '../ProductCard';

import { ProductGridVariants } from './ProductGridVariants';

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

  emptyState?: React.ReactNode;
}
