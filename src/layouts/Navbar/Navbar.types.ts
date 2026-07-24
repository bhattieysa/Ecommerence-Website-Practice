import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { NavbarVariants } from './NavbarVariants';

import type { IconName } from '@/components/IconButton/IconButton.constants';

export interface NavbarLink {
  label: string;

  href?: string;

  onClick?: () => void;

  disabled?: boolean;

  external?: boolean;

  icon?: IconName;
}

export interface NavbarProps
  extends
    ComponentPropsWithoutRef<'header'>,
    VariantProps<typeof NavbarVariants> {
  left?: ReactNode;

  center?: ReactNode;

  right?: ReactNode;
}
