import type { VariantProps } from 'class-variance-authority';

import { authDividerVariants } from './AuthDivider.variants';

export interface AuthDividerProps extends VariantProps<
  typeof authDividerVariants
> {
  label?: string;
  className?: string;
}
