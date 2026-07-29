import { cva } from 'class-variance-authority';

export const authDividerVariants = cva('flex items-center w-full', {
  variants: {
    spacing: {
      sm: 'my-4',
      md: 'my-6',
      lg: 'my-8',
    },
  },

  defaultVariants: {
    spacing: 'md',
  },
});
