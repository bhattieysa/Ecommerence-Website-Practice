import { Badge } from '@/components/badge';
import { ProductImage } from '../ProductImage/ProductImage';

import { cn } from '@/utils/cn';

import type { ProductCardData } from './ProductCard.types';
import {
  hasBadge,
  isInStock,
} from '@/components/commerce/ProductCard/ProductCard.utils';

interface ProductCardImageProps {
  product: ProductCardData;

  className?: string;
}

export function ProductCardImage({
  product,
  className,
}: ProductCardImageProps) {
  const available = isInStock(product);

  return (
    <div className={cn('relative overflow-hidden', 'aspect-square', className)}>
      <ProductImage
        src={product.image}
        alt={product.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {hasBadge(product) && (
        <Badge className="absolute left-3 top-3">{product.badge}</Badge>
      )}

      {!available && (
        <div
          className={cn(
            'absolute inset-0',
            'flex items-center justify-center',
            'bg-background/70',
          )}
        >
          <span className="text-sm font-medium">Out of Stock</span>
        </div>
      )}
    </div>
  );
}
