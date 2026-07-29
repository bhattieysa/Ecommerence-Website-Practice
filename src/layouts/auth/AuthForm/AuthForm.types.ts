import type { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { authFormVariants } from './AuthForm.variants';

export interface AuthFormProps extends VariantProps<typeof authFormVariants> {
  title: string;
  subtitle?: string;

  socialLogin?: ReactNode;

  children: ReactNode;

  footer?: ReactNode;

  className?: string;
}
