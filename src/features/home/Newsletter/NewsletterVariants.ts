import { cva } from 'class-variance-authority';

export const newsletterFormVariants = cva(['flex', 'gap-3', 'w-full'], {
  variants: {
    layout: {
      horizontal: ['flex-col', 'sm:flex-row', 'sm:items-center'],

      vertical: ['flex-col'],
    },
  },

  defaultVariants: {
    layout: 'horizontal',
  },
});

export const newsletterInputWrapperVariants = cva(['flex-1']);
