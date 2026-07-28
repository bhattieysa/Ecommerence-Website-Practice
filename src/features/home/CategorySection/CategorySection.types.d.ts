import type { ReactNode } from 'react';
import type { Category } from '@/types/category';
export interface CategoryCardProps {
    category: Category;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'filled' | 'outlined' | 'elevated';
    className?: string;
}
export interface CategorySectionProps {
    title: string;
    subtitle?: string;
    categories: Category[];
    action?: ReactNode;
    limit?: number;
    columns?: 'auto' | 'two' | 'four' | 'six' | 'eight';
    categoryCardSize?: 'sm' | 'md' | 'lg';
    categoryCardVariant?: 'filled' | 'outlined' | 'elevated';
    className?: string;
}
