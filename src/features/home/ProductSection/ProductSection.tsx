import { ProductGrid } from '@/components/commerce/ProductGrid/ProductGrid';

import { cn } from '@/lib/utils/cn';

import { ProductSectionHeader } from './ProductSectionHeader';
import type { ProductSectionProps } from './ProductSection.types';
import {
  productSectionContentVariants,
  productSectionGridWrapperVariants,
  productSectionVariants,
} from './ProductSectionVariants';

export function ProductSection({
  title,
  subtitle,
  products,
  action,
  limit,
  gridColumns,
  gridGap,
  cardProps,
  className,
}: ProductSectionProps) {
  const displayedProducts = products.slice(0, limit ?? products.length);
  return (
    <section className={cn(productSectionVariants(), className)}>
      <div className={productSectionContentVariants()}>
        <ProductSectionHeader
          title={title}
          subtitle={subtitle}
          action={action}
        />

        <div className={productSectionGridWrapperVariants()}>
          <ProductGrid
            products={displayedProducts}
            columns={gridColumns}
            gap={gridGap}
            cardProps={cardProps}
          />
        </div>
      </div>
    </section>
  );
}
