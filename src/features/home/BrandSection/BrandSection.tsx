import { ProductSectionHeader } from '@/features/home/ProductSection/ProductSectionHeader';

import { cn } from '@/lib/utils/cn';

import { BrandCard } from './BrandCard';
import type { BrandSectionProps } from './BrandSection.types';
import {
  brandGridVariants,
  brandSectionContentVariants,
  brandSectionVariants,
} from './BrandSectionVariants';

export function BrandSection({
  title,
  subtitle,
  brands,
  action,
  limit,
  columns,
  cardProps,
  className,
  ...props
}: BrandSectionProps) {
  const displayedBrands = brands.slice(0, limit ?? brands.length);

  return (
    <section className={cn(brandSectionVariants(), className)} {...props}>
      <div className={brandSectionContentVariants()}>
        {(title || subtitle || action) && (
          <ProductSectionHeader
            title={title ?? ''}
            subtitle={subtitle}
            action={action}
          />
        )}

        <div
          className={brandGridVariants({
            columns,
          })}
        >
          {displayedBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} {...cardProps} />
          ))}
        </div>
      </div>
    </section>
  );
}
