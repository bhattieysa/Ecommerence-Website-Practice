import { cva } from 'class-variance-authority';

export const marketingLayoutVariants = cva(
  [
    'group',
    'relative',
    'overflow-hidden',

    'grid',
    'grid-cols-1',
    'items-center',
    'gap-8',

    'w-full',

    'transition-all',
    'duration-300',

    'lg:grid-cols-[1.2fr_0.8fr]',
  ],
  {
    variants: {
      variant: {
        default: ['border', 'border-border', 'bg-card'],

        gradient: [
          'bg-gradient-to-r',
          'from-primary',
          'via-primary/90',
          'to-primary/80',
          'text-primary-foreground',
        ],

        Featured: ['bg-gray-800', 'text-white'],

        BestSeller: ['bg-yellow-100', 'text-gray-900'],

        Premium: ['bg-orange-100', 'text-gray-900'],

        fashion: [
          'bg-gradient-to-r',
          'from-pink-600',
          'via-rose-500',
          'to-orange-400',
          'text-white',
        ],

        gaming: [
          'bg-gradient-to-r',
          'from-violet-700',
          'via-fuchsia-700',
          'to-cyan-500',
          'text-white',
        ],
      },

      size: {
        sm: 'min-h-[180px] p-6',
        md: 'min-h-[200px] p-8 lg:p-10',
        lg: 'min-h-[240px] p-10 lg:p-14',
      },

      rounded: {
        none: 'rounded-none',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        xl: 'rounded-3xl',
      },

      imagePosition: {
        right: '',
        left: 'lg:[&>*:first-child]:order-2',
      },

      alignment: {
        left: '',
        center: '',
      },
    },

    defaultVariants: {
      variant: 'gradient',
      size: 'md',
      rounded: 'xl',
      imagePosition: 'right',
      alignment: 'left',
    },
  },
);

export const marketingLayoutContentVariants = cva([
  'relative',
  'z-10',

  'flex',
  'flex-col',
  'justify-center',

  'gap-5',
]);

export const marketingLayoutHeadingVariants = cva([
  'flex',
  'flex-col',
  'gap-3',
]);

export const marketingLayoutImageContainerVariants = cva([
  'relative',
  'z-10',

  'flex',
  'items-center',
  'justify-center',
]);

export const marketingLayoutImageVariants = cva(
  [
    'w-full',

    'object-contain',

    'transition-transform',
    'duration-500',

    'group-hover:scale-105',
  ],
  {
    variants: {
      maxWidth: {
        sm: 'max-w-[360px]',
        md: 'max-w-[420px]',
      },
    },
    defaultVariants: {
      maxWidth: 'md',
    },
  },
);
