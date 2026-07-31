import { Link } from 'react-router-dom';

import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import type { CategoryCardProps } from './CategorySection.types';
import {
  categoryCardVariants,
  categoryContentVariants,
  categoryImageVariants,
  categoryImageWrapperVariants,
} from './CategorySectionVariants';

export function CategoryCard({
  category,
  size,
  variant,
  className,
}: CategoryCardProps) {
  const { name, image, productCount, slug } = category;

  return (
    <Link
      to={`/categories/${slug}`}
      className={cn(
        categoryCardVariants({
          size,
          variant,
        }),
        className,
      )}
      aria-label={`Browse ${name} category`}
    >
      <div className={categoryImageWrapperVariants({ size })}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={categoryImageVariants()}
        />
      </div>

      <div className={categoryContentVariants()}>
        <Typography variant="heading5" className="line-clamp-1">
          {name}
        </Typography>

        <Typography variant="caption" className="text-muted-foreground">
          {productCount} {productCount === 1 ? 'Product' : 'Products'}
        </Typography>
      </div>
    </Link>
  );
}
