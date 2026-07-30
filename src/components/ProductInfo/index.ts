import type { VariantProps } from 'class-variance-authority';

import { productInfoVariants } from './ProductInfo.variants';

export interface ProductInfoProps extends VariantProps<
  typeof productInfoVariants
> {
  title: string;

  brand: string;

  price: number;

  originalPrice?: number;

  rating?: number;

  reviewCount?: number;

  stock?: number;

  sku?: string;

  className?: string;
}
