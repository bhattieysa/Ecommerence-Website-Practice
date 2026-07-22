import { cn } from '@/lib/utils/cn';

import { Section } from '@/components/Section';
import { Typography } from '@/components/Typography/Typography';

import { ProductGrid } from '@/components/commerce/ProductGrid/ProductGrid';

import { PRODUCT_SECTION_DEFAULTS } from './ProductSection.constants';

import type { ProductSectionProps } from './ProductSection.types';

import { ProductSectionVariants } from './ ProductSectionVariants';

export function ProductSection({
  title,
  description,

  products,

  actions,

  columns = PRODUCT_SECTION_DEFAULTS.columns,
  gap = PRODUCT_SECTION_DEFAULTS.gap,

  spacing,

  emptyState,

  action,
  viewAll,

  className,

  ...props
}: ProductSectionProps) {
  return (
    <Section
      className={cn(
        ProductSectionVariants({
          spacing,
        }),
        className,
      )}
      {...props}
    >
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <Typography variant="h2">{title}</Typography>

          {description && (
            <Typography variant="body" color="muted">
              {description}
            </Typography>
          )}
        </div>

        <div className="flex items-center gap-3">
          {action}

          {viewAll}
        </div>
      </div>

      <ProductGrid
        products={products}
        actions={actions}
        columns={columns}
        gap={gap}
        emptyState={emptyState}
      />
    </Section>
  );
}
