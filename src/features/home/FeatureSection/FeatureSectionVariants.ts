import { cva } from 'class-variance-authority';

export const featureSectionVariants = cva('w-full');

export const featureSectionContentVariants = cva(['flex', 'flex-col', 'gap-8']);

export const featureGridVariants = cva(['grid', 'gap-6'], {
  variants: {
    columns: {
      auto: ['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4'],

      one: 'grid-cols-1',

      two: ['grid-cols-1', 'md:grid-cols-2'],

      four: ['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4'],
    },
  },

  defaultVariants: {
    columns: 'auto',
  },
});

export const featureCardVariants = cva(
  [
    'group',

    'flex',
    'flex-col',
    'items-center',

    'text-center',

    'rounded-2xl',

    'transition-all',
    'duration-300',

    'hover:-translate-y-1',
  ],
  {
    variants: {
      variant: {
        filled: ['bg-background', 'border', 'border-border'],

        outlined: ['border-2', 'border-border'],

        elevated: ['bg-card', 'shadow-sm', 'hover:shadow-lg'],
      },

      size: {
        sm: 'p-5 gap-3',
        md: 'p-6 gap-4',
        lg: 'p-8 gap-5',
      },
    },

    defaultVariants: {
      variant: 'filled',
      size: 'md',
    },
  },
);

export const featureIconVariants = cva(
  [
    'flex',
    'items-center',
    'justify-center',

    'rounded-full',

    'bg-primary/10',
    'text-primary',

    'transition-transform',
    'duration-300',

    'group-hover:scale-110',
  ],
  {
    variants: {
      size: {
        sm: 'h-12 w-12',
        md: 'h-14 w-14',
        lg: 'h-16 w-16',
      },
    },

    defaultVariants: {
      size: 'md',
    },
  },
);

export const featureContentVariants = cva([
  'flex',
  'flex-col',
  'gap-2',
  'items-center',
]);
