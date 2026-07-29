import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import { DropdownVariants } from './DropdownVariants';

export interface DropdownProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof DropdownVariants> {
  label: string;
  isActive?: boolean;
  onActiveChange?: (isActive: boolean) => void;
}
