import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from './BadgeVariants';

export interface BadgeProps
  extends
    Omit<ComponentPropsWithoutRef<'span'>, 'children'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  children?: ReactNode;
}
