import { cva } from 'class-variance-authority';
import { SPACING } from '@/theme';

export const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: SPACING.none,
      compact: SPACING.compact,
      default: SPACING.default,
      large: SPACING.large,
      hero: SPACING.hero,
    },
  },

  defaultVariants: {
    spacing: 'default',
  },
});
