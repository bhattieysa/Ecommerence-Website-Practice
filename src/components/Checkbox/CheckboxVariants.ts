import { cva } from 'class-variance-authority';

export const CheckboxVariants = cva(
  // Base Classes
  [
    'h-4 w-4 rounded border-gray-300',
    'text-primary focus:ring-primary',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],

  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },

    defaultVariants: {
      size: 'md',
    },
  },
);
