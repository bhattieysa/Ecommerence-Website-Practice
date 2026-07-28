import { cva } from 'class-variance-authority';
import { RADIUS } from '@/theme';
export const ProductCardVariants = cva([
    'group',
    'flex',
    'overflow-hidden',
    'border',
    'border-gray-200',
    'bg-white',
    'text-gray-900',
    'transition-all',
    'duration-300',
    'ease-in-out',
], {
    variants: {
        orientation: {
            vertical: 'flex-col',
            horizontal: 'flex-row',
        },
        radius: {
            none: RADIUS.none,
            sm: RADIUS.sm,
            md: RADIUS.md,
            lg: RADIUS.card,
            xl: RADIUS.cardSm,
        },
    },
    defaultVariants: {
        orientation: 'vertical',
        radius: 'lg',
    },
});
export const ProductCardContentVariants = cva('flex flex-1 flex-col gap-4 p-5');
export const ProductCardFooterVariants = cva('mt-auto flex items-center justify-between pt-4 px-5 pb-5');
