import { Typography } from '@/components/Typography';
import { Rating } from '@/components/commerce/Rating';
import { Price } from '@/components/commerce/Price';

import { COMMERCE_CONFIG } from '@/config/commerce';
import { formatMoney } from '@/lib/money';

import type { ProductCardData } from '@/components/commerce/ProductCard/ProductCard.types';
import type { ProductCardProps } from '@/components/commerce/ProductCard/ProductCard.types';
import {
  hasDiscount,
  hasRating,
} from '@/components/commerce/ProductCard/ProductCard.utils';

import { cn } from '@/lib/utils/cn';

interface ProductCardContentProps {
  product: ProductCardData;
  size?: ProductCardProps['size'];
  showCategory?: boolean;
  showRating?: boolean;
  showOriginalPrice?: boolean;
  showSavings?: boolean;
  className?: string;
}

export function ProductCardContent({
  product,
  size,
  showCategory = true,
  showRating = true,
  showOriginalPrice = true,
  showSavings = false,
  className,
}: ProductCardContentProps) {
  const isCompact = size === 'compact';
  const currentPrice = product.price.current;
  const originalPrice = product.price.original;
  const productHasRating = hasRating(
    product.rating?.value,
    product.rating?.reviewCount,
  );
  const productHasDiscount = hasDiscount(currentPrice, originalPrice);
  const savingsAmount =
    productHasDiscount && originalPrice
      ? originalPrice - currentPrice
      : 0;

  return (
    <div className={cn('flex flex-col', isCompact ? 'gap-1' : 'gap-2', className)}>
      {showCategory && product.category && !isCompact && (
        <Typography variant="overline" color="muted">
          {product.category}
        </Typography>
      )}

      <Typography
        variant={isCompact ? 'bodySm' : 'h4'}
        className={cn(
          'line-clamp-2',
          !isCompact &&
            'transition-colors duration-200 group-hover:text-primary',
        )}
      >
        {product.title}
      </Typography>

      {showRating && productHasRating && !isCompact && (
        <Rating
          value={product.rating.value}
          reviewCount={product.rating.reviewCount}
        />
      )}

      <Price
        value={currentPrice}
        originalValue={
          showOriginalPrice && productHasDiscount ? originalPrice : undefined
        }
        currency={product.price.currency}
        showDiscount={!isCompact}
        className={isCompact ? 'gap-1.5' : undefined}
      />

      {showSavings && savingsAmount > 0 && (
        <Typography variant="caption" className="font-medium text-green-600">
          Save -{' '}
          {formatMoney(
            savingsAmount,
            product.price.currency ?? COMMERCE_CONFIG.currency,
          )}
        </Typography>
      )}
    </div>
  );
}
