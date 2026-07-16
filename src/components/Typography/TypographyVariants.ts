import { cva } from 'class-variance-authority';

export const TypographyVariants = cva('', {
  variants: {
    variant: {
      display: 'text-5xl md:text-6xl font-extrabold tracking-tight',

      h1: 'text-4xl md:text-5xl font-bold tracking-tight',

      h2: 'text-3xl md:text-4xl font-bold tracking-tight',

      h3: 'text-2xl font-semibold',

      h4: 'text-xl font-semibold',

      h5: 'text-lg font-semibold',

      h6: 'text-base font-semibold',

      bodyLg: 'text-lg leading-8',

      body: 'text-base leading-7',

      bodySm: 'text-sm leading-6',

      caption: 'text-xs leading-5',

      overline: 'text-xs uppercase tracking-widest font-medium',
    },

    color: {
      default: 'text-gray-900',

      muted: 'text-gray-500',

      primary: 'text-blue-600',

      success: 'text-green-600',

      danger: 'text-red-600',

      white: 'text-white',
    },

    align: {
      left: 'text-left',

      center: 'text-center',

      right: 'text-right',
    },

    weight: {
      normal: 'font-normal',

      medium: 'font-medium',

      semibold: 'font-semibold',

      bold: 'font-bold',

      extrabold: 'font-extrabold',
    },
  },

  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
  },
});
