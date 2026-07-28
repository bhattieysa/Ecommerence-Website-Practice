import type { ReactNode } from 'react';

import type { Product } from '@/types/product';
import type { ProductGridCardProps } from '@/components/commerce/ProductGrid/ProductGrid.types';
import type { ProductGridColumn, ProductGridGap } from '@/components/commerce/ProductGrid/ProductGrid.constants';

export interface ProductSectionProps {
  title: string;

  subtitle?: string;

  products: Product[];

  action?: ReactNode;

  limit?: number;

  gridColumns?: ProductGridColumn;

  gridGap?: ProductGridGap;

  cardProps?: ProductGridCardProps;

  className?: string;
}

export interface ProductSectionHeaderProps {
  title: string;

  subtitle?: string;

  action?: ReactNode;

  className?: string;
}
