import type { VariantProps } from 'class-variance-authority';

import type { Product } from '@/types/product';

import { productInfoVariants } from './ProductInfo.variants';

export interface ProductInfoProps extends VariantProps<
  typeof productInfoVariants
> {
  product: Product;

  quantity?: number;

  onQuantityChange?: (quantity: number) => void;

  onAddToCart?: (quantity: number) => void;

  onBuyNow?: (quantity: number) => void;

  onWishlist?: () => void;

  className?: string;
}
