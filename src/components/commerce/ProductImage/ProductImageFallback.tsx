import { ImageOff } from 'lucide-react';

import { Typography } from '@/components/Typography/Typography';

import { PRODUCT_IMAGE_FALLBACK_ALT } from '@/components/commerce/ProductImage/ProductImage.constants';

interface ProductImageFallbackProps {
  alt?: string;
}

export function ProductImageFallback({
  alt = PRODUCT_IMAGE_FALLBACK_ALT,
}: ProductImageFallbackProps) {
  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        gap-2
        bg-muted
        text-muted-foreground
      "
      role="img"
      aria-label={alt}
    >
      <ImageOff className="h-8 w-8 opacity-70" />

      <Typography variant="bodySm" className="text-center">
        {alt}
      </Typography>
    </div>
  );
}
