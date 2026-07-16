import type { ElementType, HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { TypographyVariants } from '@/components/Typography/TypographyVariants'; // Note: typically lowercase 't' for the function instance

export type TypographyProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof TypographyVariants> & {
    as?: ElementType;
  };
