import type { VariantProps } from 'class-variance-authority';
import { CheckboxVariants } from '@/components/Checkbox/CheckboxVariants';

export interface CheckboxProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof CheckboxVariants> {
  label?: string;
}
