import { cva } from 'class-variance-authority';
import { RADIUS } from '@/theme';

export const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'whitespace-nowrap',
    'transition-colors',
    'duration-200',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',

        secondary: 'bg-gray-100 text-gray-900',

        success: 'bg-green-100 text-green-700',

        warning: 'bg-yellow-100 text-yellow-700',

        danger: 'bg-red-100 text-red-700',

        info: 'bg-blue-100 text-blue-700',

        outline: 'border border-gray-300 bg-transparent text-gray-700',

        ghost: 'bg-transparent text-gray-700',

        sale: 'bg-red-600 text-white',
      },

      size: {
        sm: 'px-2 py-0.5 text-xs',

        md: 'px-3 py-1 text-sm',

        lg: 'px-4 py-1.5 text-base',
      },

      shape: {
        pill: RADIUS.badge,

        rounded: RADIUS.md,

        square: RADIUS.none,
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: 'pill',
    },
  },
);
