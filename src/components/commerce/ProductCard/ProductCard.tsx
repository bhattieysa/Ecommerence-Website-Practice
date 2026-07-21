import { cn } from '@/utils/cn';
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

  hoverable = true,

  showCategory = PRODUCT_CARD_DEFAULTS.showCategory,

  showRating = PRODUCT_CARD_DEFAULTS.showRating,

  showOriginalPrice = PRODUCT_CARD_DEFAULTS.showOriginalPrice,

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

  return (
    <article
      className={cn(
        ProductCardVariants({
          orientation,
          radius,
        }),
        hoverable && 'hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={handleProductClick}
        disabled={!onProductClick}
        className={cn(
          'flex w-full flex-col text-left',
          onProductClick &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        <ProductCardImage product={product} />

        <div className={ProductCardContentVariants()}>
          <ProductCardContent
            product={product}
            showCategory={showCategory}
            showRating={showRating}
            showOriginalPrice={showOriginalPrice}
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
