import type { HTMLAttributes, ReactNode } from 'react';

export interface PromoBannerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'title'
> {
  badge?: ReactNode;
  badgeVariant?: 'sale' | 'iphone' | 'realme' | 'xiaomi';

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
    | 'default'
    | 'gradient'
    | 'dark'
    | 'sale'
    | 'electronics'
    | 'fashion'
    | 'gaming';

  rounded?: 'none' | 'md' | 'lg' | 'xl';

  showDecoration?: boolean;

  className?: string;
}
