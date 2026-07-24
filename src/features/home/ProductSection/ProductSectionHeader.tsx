import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import type { ProductSectionHeaderProps } from './ProductSection.types';
import {
  productSectionActionVariants,
  productSectionHeaderVariants,
  productSectionHeadingVariants,
} from './ProductSectionVariants';

export function ProductSectionHeader({
  title,
  subtitle,
  action,
  className,
}: ProductSectionHeaderProps) {
  return (
    <header className={cn(productSectionHeaderVariants(), className)}>
      <div className={productSectionHeadingVariants()}>
        <Typography variant="heading2">{title}</Typography>

        {subtitle && (
          <Typography variant="body" className="text-muted-foreground">
            {subtitle}
          </Typography>
        )}
      </div>

      <div className={productSectionActionVariants()}>{action}</div>
    </header>
  );
}
