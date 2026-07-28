import type { ReactNode } from 'react';
import type { Product } from '@/types/product';
export interface ProductSectionProps {
    title: string;
    subtitle?: string;
    products: Product[];
    action?: ReactNode;
    limit?: number;
    className?: string;
}
export interface ProductSectionHeaderProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
    className?: string;
}
