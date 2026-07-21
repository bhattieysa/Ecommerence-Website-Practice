import type { InputHTMLAttributes, ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { inputVariants } from '@/components/Input/InputVariants';

export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  loading?: boolean;
}
