import type { HTMLAttributes, ReactNode } from 'react';

export interface PromoBannerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'title'
> {
  badge?: ReactNode;
  badgeVariant?: 'Featured' | 'BestSeller' | 'Premium';

  title: ReactNode;

  subtitle?: ReactNode;

  description?: ReactNode;

  image?: string;

  imageAlt?: string;

  primaryAction?: ReactNode;

  secondaryAction?: ReactNode;

  imagePosition?: 'left' | 'right';

  alignment?: 'left' | 'center';

  size?: 'sm' | 'md' | 'lg';

  variant?:
   'Featured' | 'BestSeller' | 'Premium';

  rounded?: 'none' | 'md' | 'lg' | 'xl';

  showDecoration?: boolean;

  className?: string;
}
