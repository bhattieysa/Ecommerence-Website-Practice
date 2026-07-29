import { cva } from 'class-variance-authority';

export const DropdownVariants = cva(
  // Base Classes
  [
    'inline-flex items-center justify-between gap-3 font-medium',
    'transition-all duration-200 ease-in-out',
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
          'bg-primary text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
      isActive: {
        true: 'bg-primary text-white',
        false: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
    },

    compoundVariants: [
      {
        size: 'sm',
        class: `rounded-full h-9 px-4`,
      },
      {
        size: 'md',
        class: `rounded-full h-10 px-5`,
      },
      {
        size: 'lg',
        class: `rounded-full h-12 px-6`,
      },
    ],

    defaultVariants: {
      size: 'md',
      isActive: false,
    },
  },
);
