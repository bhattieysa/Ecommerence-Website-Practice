import { cva } from 'class-variance-authority';

export const categorySectionVariants = cva('w-full');

export const categorySectionContentVariants = cva([
  'flex',
  'flex-col',
  'gap-8',
]);

export const categoryGridVariants = cva(['grid', 'w-full', 'gap-6'], {
  variants: {
    variant: {
      filled: ['bg-background', 'border-border'],
      elevated: ['bg-card', 'shadow-sm', 'hover:shadow-lg'],
      outlined: ['bg-transparent', 'border-2'],
    },
    size: {
      sm: 'p-4 gap-3',
      md: 'p-5 gap-4',
      lg: 'p-6 gap-5',
    },
    columns: {
      auto: 'grid-cols-auto',
      two: 'grid-cols-2',
      four: 'grid-cols-2 sm:grid-cols-4',
      six: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6',
      eight: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

export const categoryCardVariants = cva(
  [
    'group',

    'flex',
    'flex-col',
    'items-center',
    'justify-between',

    'bg-transparent',

    'transition-all',
    'duration-300',

    'hover:-translate-y-1',
  ],
  {
    variants: {
      size: {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4',
      },
      variant: {
        filled: [],
        elevated: [],
        outlined: [],
      },
    },

    defaultVariants: {
      size: 'md',
      variant: 'filled',
    },
  },
);

export const categoryImageWrapperVariants = cva(
  [
    'flex',
    'items-center',
    'justify-center',

    'rounded-full',

    'border',
    'border-gray-300',

    'bg-white',

    'overflow-hidden',

    'transition-all',
    'duration-300',

    'group-hover:scale-105',
    'group-hover:border-blue-300',
  ],
  {
    variants: {
      size: {
        sm: 'h-22 w-22',
        md: 'h-38 w-38',
        lg: 'h-54 w-54',
      },
    },

    defaultVariants: {
      size: 'md',
    },
  },
);

export const categoryImageVariants = cva([
  'h-full',
  'w-full',
  'object-cover',
]);

export const categoryContentVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'gap-1',
  'text-center',
]);

export const categoryActionVariants = cva(['mt-auto']);
