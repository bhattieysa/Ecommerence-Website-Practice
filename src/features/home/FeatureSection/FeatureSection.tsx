import { ProductSectionHeader } from '@/features/home/ProductSection/ProductSectionHeader';

import { cn } from '@/lib/utils/cn';

import { FeatureCard } from './FeatureCard';
import type { FeatureSectionProps } from './FeatureSection.types';
import {
  featureGridVariants,
  featureSectionContentVariants,
  featureSectionVariants,
} from './FeatureSectionVariants';

export function FeatureSection({
  title,
  subtitle,
  features,
  action,
  columns,
  cardProps,
  className,
  ...props
}: FeatureSectionProps) {
  return (
    <section className={cn(featureSectionVariants(), className)} {...props}>
      <div className={featureSectionContentVariants()}>
        {(title || subtitle || action) && (
          <ProductSectionHeader
            title={title ?? ''}
            subtitle={subtitle}
            action={action}
          />
        )}

        <div
          className={featureGridVariants({
            columns,
          })}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} {...cardProps} />
          ))}
        </div>
      </div>
    </section>
  );
}
