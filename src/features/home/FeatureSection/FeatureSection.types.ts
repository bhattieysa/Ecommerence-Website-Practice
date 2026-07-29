import type { HTMLAttributes, ReactNode } from 'react';

export interface Feature {
  id: string;

  icon: ReactNode;

  title: string;

  description: string;

  color?: string;

  href?: string;
}

export interface FeatureCardProps {
  feature: Feature;

  size?: 'sm' | 'md' | 'lg';

  variant?: 'filled' | 'outlined' | 'elevated';

  className?: string;
}

export interface FeatureSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;

  subtitle?: string;

  features: Feature[];

  action?: ReactNode;

  columns?: 'auto' | 'one' | 'two' | 'four';

  cardProps?: Pick<FeatureCardProps, 'size' | 'variant'>;

  className?: string;
}
