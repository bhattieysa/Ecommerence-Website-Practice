import { Badge } from '@/components/badge';
import { ProductImage } from '../ProductImage/ProductImage';

import { cn } from '@/lib/utils/cn';

import type { ProductCardData } from './ProductCard.types';
import type { ProductCardProps } from './ProductCard.types';
import {
  getDiscountPercentage,
  hasBadge,
  isInStock,
} from '@/components/commerce/ProductCard/ProductCard.utils';
import { ProductCardImageVariants } from './ProductCardVariants';

interface ProductCardImageProps {
  product: ProductCardData;
  size?: ProductCardProps['size'];
  className?: string;
}

export function ProductCardImage({
  product,
  size,
  className,
}: ProductCardImageProps) {
  const available = isInStock(product);
  const isCompact = size === 'compact';
  const discountPercentage = getDiscountPercentage(
    product.price.current,
    product.price.original,
  );

  return (
    <div
      className={cn(ProductCardImageVariants({ size }), className)}
    >
      <ProductImage
        src={product.image.src}
        alt={product.title}
        className={cn(
          'h-full w-full transition-all duration-300 ease-in-out group-hover:scale-105',
          isCompact ? 'object-contain p-3' : 'object-cover',
        )}
      />

      {isCompact && discountPercentage > 0 && (
        <Badge
          variant="primary"
          size="sm"
          shape="rounded"
          className="absolute right-2 top-2"
        >
          {discountPercentage}% OFF
        </Badge>
      )}

      {!isCompact && hasBadge(product) && (
        <Badge className="absolute left-3 top-3">{product.badge}</Badge>
      )}

      {!available && (
        <div
          className={cn(
            'absolute inset-0',
            'flex items-center justify-center',
            'bg-white/70',
          )}
        >
          <span className="text-sm font-medium text-gray-900">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
}
