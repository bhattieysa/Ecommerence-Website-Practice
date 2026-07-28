import { cn } from '@/lib/utils/cn';

import { ProductCard } from '../ProductCard';

import {
  PRODUCT_GRID_DEFAULTS,
  PRODUCT_GRID_LABELS,
} from './ProductGrid.constants';
import type { ProductGridProps } from './ProductGrid.types';
import { ProductGridVariants } from './ProductGridVariants';

export function ProductGrid({
  products,

  actions,

  cardProps,

  emptyState,

  columns = PRODUCT_GRID_DEFAULTS.columns,

  gap = PRODUCT_GRID_DEFAULTS.gap,

  className,

  ...props
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      emptyState ?? (
        <div className="flex min-h-[240px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">
            {PRODUCT_GRID_LABELS.empty}
          </p>
        </div>
      )
    );
  }

  return (
    <div
      className={cn(
        ProductGridVariants({
          columns,
          gap,
        }),
        className,
      )}
      {...props}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={actions?.onProductClick}
          onAddToCart={actions?.onAddToCart}
          {...cardProps}
        />
      ))}
    </div>
  );
}
