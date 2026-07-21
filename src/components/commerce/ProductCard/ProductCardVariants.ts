import { cva } from 'class-variance-authority';

export const ProductCardVariants = cva(
  [
    'group',
    'flex',
    'overflow-hidden',

    'border',
    'border-border',

    'bg-card',
    'text-card-foreground',

    'transition-all',
    'duration-300',
  ],
  {
    variants: {
      orientation: {
        vertical: 'flex-col',
        horizontal: 'flex-row',
      },

      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },

    defaultVariants: {
      orientation: 'vertical',
      radius: 'lg',
    },
  },
);
export const ProductCardContentVariants = cva('flex flex-1 flex-col gap-3 p-4');

export const ProductCardFooterVariants = cva(
  'mt-auto flex items-center justify-between pt-4',
);
