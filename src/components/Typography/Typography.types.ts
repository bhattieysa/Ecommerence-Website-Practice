import type { VariantProps } from 'class-variance-authority';
import type { PolymorphicWithDefault, TypographyWeight } from '@/types';
import { TypographyVariants } from '@/components/Typography/TypographyVariants';

type TypographyOwnProps = VariantProps<typeof TypographyVariants> & {
  weight?: TypographyWeight;
};

export type TypographyProps = PolymorphicWithDefault<TypographyOwnProps, 'p'>;
