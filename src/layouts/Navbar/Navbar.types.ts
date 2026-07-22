import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { NavbarVariants } from './NavbarVariants';

export interface NavbarLink {
  label: string;

  href?: string;

  onClick?: () => void;

  disabled?: boolean;

  external?: boolean;
}

export interface NavbarProps
  extends
    ComponentPropsWithoutRef<'header'>,
    VariantProps<typeof NavbarVariants> {
  left?: ReactNode;

  center?: ReactNode;

  right?: ReactNode;
}
