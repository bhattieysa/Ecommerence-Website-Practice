import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { marketingLayoutVariants } from '../MarketingLayoutVariants';
export type MarketingLayoutProps = HTMLAttributes<HTMLElement> & VariantProps<typeof marketingLayoutVariants> & {
    showDecoration?: boolean;
};
