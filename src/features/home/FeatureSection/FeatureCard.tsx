import { Link } from 'react-router-dom';

import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import type { FeatureCardProps } from './FeatureSection.types';
import {
  featureCardVariants,
  featureContentVariants,
  featureIconVariants,
} from './FeatureSectionVariants';

export function FeatureCard({
  feature,
  size,
  variant,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      <div className={featureIconVariants({ size })}>{feature.icon}</div>

      <div className={featureContentVariants()}>
        <Typography variant="heading5">{feature.title}</Typography>

        <Typography variant="caption" className="text-muted-foreground">
          {feature.description}
        </Typography>
      </div>
    </>
  );

  if (feature.href) {
    return (
      <Link
        to={feature.href}
        className={cn(
          featureCardVariants({
            size,
            variant,
          }),
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={cn(
        featureCardVariants({
          size,
          variant,
        }),
        className,
      )}
    >
      {content}
    </article>
  );
}
