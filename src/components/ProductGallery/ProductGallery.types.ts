import type { VariantProps } from 'class-variance-authority';

import { productGalleryVariants } from './ProductGallery.variants';

export interface ProductGalleryImage {
  id: string | number;
  src: string;
  alt: string;
}

export interface ProductGalleryProps extends VariantProps<
  typeof productGalleryVariants
> {
  images: ProductGalleryImage[];

  defaultImageIndex?: number;

  className?: string;
}
