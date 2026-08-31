import { ProductSectionHeader } from '@/features/home/ProductSection/ProductSectionHeader';

import { cn } from '@/lib/utils/cn';

import { CategoryCard } from './CategoryCard';
import type { CategorySectionProps } from './CategorySection.types';
import {
  categoryGridVariants,
  categorySectionContentVariants,
  categorySectionVariants,
} from './CategorySectionVariants';

export function CategorySection({
  title,
  subtitle,
  categories,
  action,
  limit,
  columns,
  categoryCardSize,
  categoryCardVariant,
  className,
}: CategorySectionProps) {
  const categoriesArray = Array.isArray(categories) ? categories : [];
  const displayedCategories = categoriesArray.slice(
    0,
    limit ?? categoriesArray.length,
  );

  return (
    <section className={cn(categorySectionVariants(), className)}>
      <div className={categorySectionContentVariants()}>
        <ProductSectionHeader
          title={title}
          subtitle={subtitle}
          action={action}
        />

        <div
          className={categoryGridVariants({
            columns,
          })}
        >
          {displayedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              size={categoryCardSize}
              variant={categoryCardVariant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
