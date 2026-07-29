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
    'hover:shadow-xl',
  ],
  {
    variants: {
      variant: {
        filled: [
          'bg-gradient-to-br',
          'from-white',
          'to-gray-50',
          'border',
          'border-gray-100',
          'shadow-md',
        ],

        outlined: [
          'border-2',
          'border-gray-200',
          'bg-transparent',
          'hover:border-gray-300',
        ],

        elevated: [
          'bg-white',
          'shadow-lg',
          'hover:shadow-2xl',
          'border',
          'border-gray-100',
        ],
      },

      size: {
        sm: 'p-5 gap-3',
        md: 'p-6 gap-4',
        lg: 'p-8 gap-5',
      },
    },

    defaultVariants: {
      variant: 'elevated',
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

    'bg-gradient-to-br',
    'from-blue-50',
    'to-indigo-100',

    'transition-transform',
    'duration-300',

    'group-hover:scale-110',
    'group-hover:rotate-3',
  ],
  {
    variants: {
      size: {
        sm: 'h-14 w-14',
        md: 'h-16 w-16',
        lg: 'h-20 w-20',
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
