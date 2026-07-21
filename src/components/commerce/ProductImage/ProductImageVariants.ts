import { cva } from 'class-variance-authority';

export const ProductImageVariants = cva(
  [
    'relative',
    'overflow-hidden',

    'flex',
    'items-center',
    'justify-center',

    'bg-muted',

    'select-none',

    'shrink-0',

    'isolate',

    'transition-colors',
  ],
  {
    variants: {
      aspectRatio: {
        square: 'aspect-square',

        portrait: 'aspect-[3/4]',

        landscape: 'aspect-[4/3]',

        auto: '',
      },

      objectFit: {
        cover: '',

        contain: '',

        fill: '',
      },

      radius: {
        none: 'rounded-none',

        sm: 'rounded-sm',

        md: 'rounded-md',

        lg: 'rounded-lg',

        xl: 'rounded-xl',

        full: 'rounded-full',
      },
    },

    defaultVariants: {
      aspectRatio: 'square',

      objectFit: 'cover',

      radius: 'lg',
    },
  },
);
