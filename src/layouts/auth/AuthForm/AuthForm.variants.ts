import { cva } from 'class-variance-authority';

export const authFormVariants = cva('flex w-full max-w-md flex-col', {
  variants: {
    spacing: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    },
  },

  defaultVariants: {
    spacing: 'md',
  },
});
