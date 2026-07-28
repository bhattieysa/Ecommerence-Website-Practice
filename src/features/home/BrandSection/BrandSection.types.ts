import type { HTMLAttributes, ReactNode } from 'react';

export interface BrandImage {
  src: string;
  alt: string;
}

export interface Brand {
  id: string;

  name: string;

  logo: BrandImage;

  href?: string;
}

export interface BrandCardProps {
  brand: Brand;

  size?: 'sm' | 'md' | 'lg';

  variant?: 'filled' | 'outlined' | 'elevated';

  className?: string;
}

export interface BrandSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;

  subtitle?: string;

  brands: Brand[];

  action?: ReactNode;

  columns?: 'auto' | 'four' | 'five' | 'six';

  limit?: number;

  cardProps?: Pick<BrandCardProps, 'size' | 'variant'>;

  className?: string;
}
