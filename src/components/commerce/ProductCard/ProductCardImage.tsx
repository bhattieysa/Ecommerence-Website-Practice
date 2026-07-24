import { Badge } from '@/components/badge';
import { ProductImage } from '../ProductImage/ProductImage';

import { cn } from '@/lib/utils/cn';

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
        className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
      />

      {hasBadge(product) && (
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
          <span className="text-sm font-medium text-gray-900">Out of Stock</span>
        </div>
      )}
    </div>
  );
}
