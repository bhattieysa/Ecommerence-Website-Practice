import { cva } from 'class-variance-authority';

export const containerVariants = cva(
  'mx-auto w-full',

  {
    variants: {
      size: {
        xs: 'max-w-screen-sm',
        sm: 'max-w-screen-md',
        md: 'max-w-screen-lg',
        lg: 'max-w-screen-xl',
        xl: 'max-w-[1280px]',
        '2xl': 'max-w-[1440px]',
        full: 'max-w-full',
      },

      padding: {
        none: '',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
      },
    },

    defaultVariants: {
      size: 'xl',
      padding: 'md',
    },
  },
);

export default containerVariants;
