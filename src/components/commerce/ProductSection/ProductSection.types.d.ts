import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { ProductCardData } from '../ProductCard';
import type { ProductGridActions } from '../ProductGrid/ProductGrid.types';
import { ProductSectionVariants } from './ ProductSectionVariants';
import type { ProductGridColumn, ProductGridGap } from '../ProductGrid/ProductGrid.constants';
export interface ProductSectionProps extends ComponentPropsWithoutRef<'section'>, VariantProps<typeof ProductSectionVariants> {
    title: string;
    description?: string;
    products: readonly ProductCardData[];
    actions?: ProductGridActions;
    columns?: ProductGridColumn;
    gap?: ProductGridGap;
    showViewAll?: boolean;
    viewAll?: ReactNode;
    action?: ReactNode;
    emptyState?: ReactNode;
}
