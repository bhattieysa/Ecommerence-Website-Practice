import type { VariantProps } from 'class-variance-authority';
import { ButtonVariants } from '@/components/Button/ButtonVariants';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
    isLoading?: boolean;
}
