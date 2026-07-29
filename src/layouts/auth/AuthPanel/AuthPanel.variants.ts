import { cva } from 'class-variance-authority';

export const authPanelVariants = cva(
  [
    'relative',
    'flex',
    'h-full',
    'flex-col',
    'justify-center',
    'overflow-hidden',
    'p-8',
    'text-white',
  ],
  {
    variants: {
      theme: {
        primary: 'bg-gradient-to-br from-primary via-primary to-primary/80',

        success:
          'bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600',

        dark: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black',
      },

      align: {
        center: 'items-center text-center',
        start: 'items-start text-left',
      },
    },

    defaultVariants: {
      theme: 'primary',
      align: 'center',
    },
  },
);
