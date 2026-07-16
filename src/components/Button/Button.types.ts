import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/Button/ButtonVariants';

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}
