import { cva } from 'class-variance-authority';
import { LAYOUT } from '@/theme/layout';

export const containerVariants = cva('mx-auto w-full px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      hero: LAYOUT.hero,
      default: LAYOUT.default,
      content: LAYOUT.content,
      narrow: LAYOUT.narrow,
      full: LAYOUT.full,
    },
  },

  defaultVariants: {
    size: 'default',
  },
});
