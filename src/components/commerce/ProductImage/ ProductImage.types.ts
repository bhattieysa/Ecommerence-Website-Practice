import type { ImgHTMLAttributes , ReactNode} from 'react';

import type { VariantProps } from 'class-variance-authority';

import { ProductImageVariants } from '@/components/commerce/ProductImage/ProductImageVariants';

export interface ProductImageProps
  extends
    Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'src'>,
    VariantProps<typeof ProductImageVariants> {
  src: string | null;

  alt: string;

  fallbackSrc?: string;

  fallback?: ReactNode;

  priority?: boolean;

}
