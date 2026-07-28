import { cva } from 'class-variance-authority';
import { RADIUS } from '@/theme';

export const ProductCardVariants = cva(
  [
    'group',
    'flex',
    'overflow-hidden',

    'border',
    'border-gray-200',

    'bg-white',
    'text-gray-900',

    'transition-all',
    'duration-300',
    'ease-in-out',
  ],
  {
    variants: {
      orientation: {
        vertical: 'flex-col',
        horizontal: 'flex-row',
      },

      radius: {
        none: RADIUS.none,
        sm: RADIUS.sm,
        md: RADIUS.md,
        lg: RADIUS.card,
        xl: RADIUS.cardSm,
      },

      size: {
        default: 'w-full',
        compact:
          'border-gray-100 bg-gray-50 hover:border-primary hover:shadow-md w-full',
      },
    },

    defaultVariants: {
      orientation: 'vertical',
      radius: 'lg',
      size: 'default',
    },
  },
);

export const ProductCardContentVariants = cva('flex flex-1 flex-col', {
  variants: {
    size: {
      default: 'gap-4 p-5',
      compact: 'gap-1.5 p-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const ProductCardImageVariants = cva('relative overflow-hidden', {
  variants: {
    size: {
      default: 'aspect-square',
      compact: 'aspect-[4/3] bg-white',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const ProductCardFooterVariants = cva(
  'mt-auto flex items-center justify-between pt-4 px-5 pb-5',
);
