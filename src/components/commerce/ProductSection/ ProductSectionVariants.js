import { cva } from 'class-variance-authority';
import { PRODUCT_SECTION_SPACING } from './ProductSection.constants';
export const ProductSectionVariants = cva('flex flex-col', {
    variants: {
        spacing: {
            sm: PRODUCT_SECTION_SPACING.sm,
            md: PRODUCT_SECTION_SPACING.md,
            lg: PRODUCT_SECTION_SPACING.lg,
        },
    },
    defaultVariants: {
        spacing: 'md',
    },
});
