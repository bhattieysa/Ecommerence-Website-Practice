import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-full',
    'font-medium',
    'whitespace-nowrap',
    'transition-colors',
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
        pill: 'rounded-full',

        rounded: 'rounded-md',

        square: 'rounded-none',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: 'pill',
    },
  },
);
