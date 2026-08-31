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

const FEATURES = [
  {
    id: 'free-shipping',
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
    color: 'text-blue-600',
  },
  {
    id: 'secure-payment',
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: '100% secure payment',
    color: 'text-green-600',
  },
  {
    id: 'best-prices',
    icon: BadgeDollarSign,
    title: 'Best Prices',
    description: 'Quality at lowest prices',
    color: 'text-orange-600',
  },
  {
    id: '24-7-support',
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team',
    color: 'text-purple-600',
  },
];

export function FeatureCard({
  feature,
  size,
  variant,
  className,
}: FeatureCardProps) {
  const IconComponent = feature.icon;

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

export { FEATURES };
