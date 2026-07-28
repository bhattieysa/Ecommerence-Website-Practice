import { cva } from 'class-variance-authority';

export const categorySectionVariants = cva('w-full');

export const categorySectionContentVariants = cva([
  'flex',
  'flex-col',
  'gap-8',
]);

export const categoryGridVariants = cva(['grid', 'w-full', 'gap-4'], {
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
    'justify-center',

    'rounded-2xl',

    'border',
    'border-border',

    'bg-background',

    'transition-all',
    'duration-300',

    'hover:-translate-y-1',
    'hover:shadow-lg',
  ],
  {
    variants: {
      size: {
        sm: 'p-4 gap-3',
        md: 'p-5 gap-4',
        lg: 'p-6 gap-5',
      },
      variant: {
        filled: ['bg-background', 'border-border'],
        elevated: ['bg-card', 'shadow-sm', 'hover:shadow-lg'],
        outlined: ['bg-transparent', 'border-2'],
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

    'bg-muted',

    'overflow-hidden',

    'transition-transform',
    'duration-300',

    'group-hover:scale-105',
  ],
  {
    variants: {
      size: {
        sm: 'h-12 w-12',
        md: 'h-16 w-16',
        lg: 'h-20 w-20',
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
  'object-contain',
]);

export const categoryContentVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'gap-1',
  'text-center',
]);

export const categoryActionVariants = cva(['mt-auto']);
