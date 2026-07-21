import { cva } from 'class-variance-authority';

export const TypographyVariants = cva('', {
  variants: {
    variant: {
      display: 'text-display font-extrabold tracking-tight',

      h1: 'text-4xl md:text-5xl font-bold tracking-tight',

      h2: 'text-3xl md:text-4xl font-bold tracking-tight',

      h3: 'text-2xl font-semibold',

      h4: 'text-xl font-semibold',

      h5: 'text-lg font-semibold',

      h6: 'text-base font-semibold',

      bodyLg: 'text-lg leading-relaxed',

      body: 'text-base leading-relaxed',

      bodySm: 'text-sm leading-relaxed',

      caption: 'text-xs',

      overline: 'text-xs uppercase tracking-widest font-medium',

      heading1: 'text-4xl md:text-5xl font-bold tracking-tight',

      heading2: 'text-3xl md:text-4xl font-bold tracking-tight',

      heading3: 'text-2xl font-semibold',

      heading4: 'text-xl font-semibold',

      heading5: 'text-lg font-semibold',

      heading6: 'text-base font-semibold',

      bodyLarge: 'text-lg leading-relaxed',

      bodySmallAlias: 'text-sm leading-relaxed',
    },

    weight: {
      light: 'font-light',

      normal: 'font-normal',

      medium: 'font-medium',

      semibold: 'font-semibold',

      bold: 'font-bold',

      extrabold: 'font-extrabold',

      black: 'font-black',
    },
    
    color: {
      default: 'text-text',

      muted: 'text-text-muted',

      primary: 'text-primary',

      success: 'text-success',

      danger: 'text-danger',

      white: 'text-white',
    },

    align: {
      start: 'text-start',

      center: 'text-center',

      end: 'text-end',
    },

    truncate: {
      true: 'truncate',
    },

    lineClamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
    },
  },

  defaultVariants: {
    variant: 'body',

    color: 'default',

    align: 'start',
  },
});
