import type { ElementType } from 'react';

export const TYPOGRAPHY_VARIANTS = {
  display: 'display',

  heading1: 'heading1',
  heading2: 'heading2',
  heading3: 'heading3',
  heading4: 'heading4',
  heading5: 'heading5',
  heading6: 'heading6',

  bodyLarge: 'bodyLarge',
  body: 'body',
  bodySmall: 'bodySmall',

  caption: 'caption',
  overline: 'overline',
} as const;

export type TypographyVariants =
  (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];

export const TYPOGRAPHY_ELEMENTS: Record<TypographyVariants, ElementType> = {
  display: 'h1',

  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',

  bodyLarge: 'p',
  body: 'p',
  bodySmall: 'p',

  caption: 'span',
  overline: 'span',
};

export const TYPOGRAPHY_COLORS = {
  default: 'default',
  muted: 'muted',
  primary: 'primary',
  success: 'success',
  danger: 'danger',
  white: 'white',
} as const;

export type TypographyColor =
  (typeof TYPOGRAPHY_COLORS)[keyof typeof TYPOGRAPHY_COLORS];
