import { cn } from '@/lib/utils/cn';
import { useCallback } from 'react';
import { PRODUCT_CARD_DEFAULTS } from './ProductCard.constants';
import type { ProductCardProps } from './ProductCard.types';
import {
  ProductCardVariants,
  ProductCardContentVariants,
} from './ProductCardVariants';

import { ProductCardImage } from './ProductCardImage';
import { ProductCardContent } from './ProductCardContent';
import { ProductCardFooter } from './ProductCardFooter';

export function ProductCard({
  product,

  orientation,

  radius,

  size,

  hoverable = true,

  showCategory = PRODUCT_CARD_DEFAULTS.showCategory,

  showRating = PRODUCT_CARD_DEFAULTS.showRating,

  showOriginalPrice = PRODUCT_CARD_DEFAULTS.showOriginalPrice,

  showSavings = false,

  showAddToCart = PRODUCT_CARD_DEFAULTS.showAddToCart,

  onProductClick,

  onAddToCart,

  footer,

  className,

  ...props
}: ProductCardProps) {
  const handleProductClick = useCallback(() => {
    onProductClick?.(product);
  }, [onProductClick, product]);

  const isCompact = size === 'compact';

  return (
    <article
      className={cn(
        ProductCardVariants({
          orientation,
          radius,
          size,
        }),
        hoverable && !isCompact && 'hover:-translate-y-1 shadow-sm hover:shadow-lg',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={handleProductClick}
        disabled={!onProductClick}
        className={cn(
          'flex w-full flex-1 flex-col text-left',
          onProductClick &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        <ProductCardImage product={product} size={size} />

        <div className={ProductCardContentVariants({ size })}>
          <ProductCardContent
            product={product}
            size={size}
            showCategory={showCategory}
            showRating={showRating}
            showOriginalPrice={showOriginalPrice}
            showSavings={showSavings}
          />
        </div>
      </button>

      {footer ??
        (showAddToCart && (
          <div onClick={(event) => event.stopPropagation()}>
            <ProductCardFooter product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
    </article>
  );
}
