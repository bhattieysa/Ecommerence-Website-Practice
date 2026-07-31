import type { VariantProps } from 'class-variance-authority';

import type { ProductImage } from '@/types/product';

import { productGalleryVariants } from './ProductGallery.variants';

export interface ProductGalleryProps extends VariantProps<
  typeof productGalleryVariants
> {
  productImage: ProductImage;

  defaultImageIndex?: number;

  className?: string;
}
