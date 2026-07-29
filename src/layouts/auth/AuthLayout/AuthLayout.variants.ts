import { cva } from 'class-variance-authority';

export const authLayoutVariants = cva(
  [
    'grid',
    'overflow-hidden',
    'rounded-3xl',
    'bg-background',
    'shadow-2xl',
    'border',
    'min-h-[680px]',
  ],
  {
    variants: {
      layout: {
        split: 'lg:grid-cols-[40%_60%]',
        equal: 'lg:grid-cols-2',
      },
    },

    defaultVariants: {
      layout: 'split',
    },
  },
);
