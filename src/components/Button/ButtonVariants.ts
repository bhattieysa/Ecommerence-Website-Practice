import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base Classes
  [
    'inline-flex items-center justify-center rounded-lg font-medium',
    'transition-colors duration-200',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],

  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',

        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',

        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',

        ghost: 'hover:bg-gray-100',

        destructive: 'bg-red-600 text-white hover:bg-red-700',
      },

      size: {
        sm: 'h-8 px-3 text-sm',

        md: 'h-10 px-4',

        lg: 'h-12 px-6 text-lg',

        icon: 'h-10 w-10 p-0',
      },

      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);
