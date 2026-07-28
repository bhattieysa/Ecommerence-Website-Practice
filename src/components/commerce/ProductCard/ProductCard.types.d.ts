import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { ProductCardVariants } from '@/components/commerce/ProductCard/ProductCardVariants';
import type { Product } from '@/types/product';
export interface ProductCardData extends Product {
}
export interface ProductCardProps extends Omit<ComponentPropsWithoutRef<'article'>, 'children'>, VariantProps<typeof ProductCardVariants> {
    product: ProductCardData;
    hoverable?: boolean;
    showCategory?: boolean;
    showRating?: boolean;
    showOriginalPrice?: boolean;
    showAddToCart?: boolean;
    onProductClick?: (product: ProductCardData) => void;
    onAddToCart?: (product: ProductCardData) => void;
    footer?: ReactNode;
}
