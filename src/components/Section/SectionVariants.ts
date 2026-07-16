import { cva } from 'class-variance-authority';

export const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: '',
      sm: 'py-4',
      md: 'py-8',
      lg: 'py-12',
      xl: 'py-16',
    },
  },

  defaultVariants: {
    spacing: 'lg',
  },
});
