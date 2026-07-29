import { cva } from 'class-variance-authority';

export const socialLoginVariants = cva('grid w-full gap-3', {
  variants: {
    columns: {
      one: 'grid-cols-1',
      two: 'grid-cols-2',
      three: 'grid-cols-3',
    },
  },

  defaultVariants: {
    columns: 'one',
  },
});
