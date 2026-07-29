import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, BadgeDollarSign, Headphones } from 'lucide-react';

import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import type { FeatureCardProps } from './FeatureSection.types';
import {
  featureCardVariants,
  featureContentVariants,
  featureIconVariants,
} from './FeatureSectionVariants';

const iconMap = {
  truck: Truck,
  'shield-check': ShieldCheck,
  'badge-dollar-sign': BadgeDollarSign,
  headphones: Headphones,
};

export function FeatureCard({
  feature,
  size,
  variant,
  className,
}: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Truck;

  const content = (
    <>
      <div className={cn(featureIconVariants({ size }), feature.color)}>
        <IconComponent className="h-6 w-6" />
      </div>

      <div className={featureContentVariants()}>
        <Typography variant="heading5" className="font-semibold">
          {feature.title}
        </Typography>

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
