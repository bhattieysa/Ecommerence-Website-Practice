import { Typography } from '@/components/Typography';
import { Rating } from '@/components/commerce/Rating';
import { Price } from '@/components/commerce/Price';

import type { ProductCardData } from '@/components/commerce/ProductCard/ProductCard.types';
import {
  hasRating,
  hasDiscount,
} from '@/components/commerce/ProductCard/ProductCard.utils';

import { cn } from '@/lib/utils/cn';

interface ProductCardContentProps {
  product: ProductCardData;

  showCategory?: boolean;

  showRating?: boolean;

  showOriginalPrice?: boolean;

  className?: string;
}

export function ProductCardContent({
  product,

  showCategory = true,

  showRating = true,

  showOriginalPrice = true,

  className,
}: ProductCardContentProps) {
  const productHasRating = hasRating(product.rating, product.reviewCount);

  const productHasDiscount = hasDiscount(product.price, product.originalPrice);

  return (
    <div className={cn('flex', 'flex-col', 'gap-2', className)}>
      {showCategory && product.category && (
        <Typography
          variant="overline"
          color="muted"
        >
          {product.category}
        </Typography>
      )}

      <Typography
        variant="h4"
        className="
          line-clamp-2
          transition-colors
          duration-200
          group-hover:text-primary
        "
      >
        {product.title}
      </Typography>

      {showRating && productHasRating && (
        <Rating value={product.rating ?? 0} reviewCount={product.reviewCount} />
      )}

      <Price
        value={product.price}
        originalValue={
          showOriginalPrice && productHasDiscount
            ? product.originalPrice
            : undefined
        }
      />
    </div>
  );
}
