import { cva } from 'class-variance-authority';
import { RADIUS } from '@/theme';

export const quantitySelectorVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-between',
    'overflow-hidden',
    'border',
    'border-gray-200',
    'bg-gray-50',
    'rounded-lg',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 gap-3 px-3',
        md: 'h-10 gap-4 px-4',
        lg: 'h-12 gap-5 px-5',
      },
      radius: {
        none: RADIUS.none,
        sm: RADIUS.sm,
        md: RADIUS.inputSm,
        lg: RADIUS.input,
        xl: RADIUS.xl,
        full: RADIUS.badge,
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
    },

    defaultVariants: {
      size: 'md',
      radius: 'lg',
    },
  },
);

export const quantityInputVariants = cva(
  [
    'border-0',
    'bg-transparent',
    'text-center',
    'font-medium',
    'shadow-none',
    'focus-visible:ring-0',
    'focus-visible:ring-offset-0',
    'appearance-none',
    '[&::-webkit-inner-spin-button]:appearance-none',
    '[&::-webkit-outer-spin-button]:appearance-none',
    '[-moz-appearance:textfield]',
  ],
  {
    variants: {
      size: {
        sm: 'w-12 text-sm',
        md: 'w-14 text-base',
        lg: 'w-16 text-lg',
      },
    },

    defaultVariants: {
      size: 'md',
    },
  },
);
