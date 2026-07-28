import { cva } from 'class-variance-authority';
import { RADIUS } from '@/theme';
export const quantitySelectorVariants = cva([
    'inline-flex',
    'items-center',
    'justify-between',
    'overflow-hidden',
    'border',
    'border-gray-300',
    'bg-white',
    'transition-all duration-200 ease-in-out',
    'focus-within:ring-2',
    'focus-within:ring-primary',
    'focus-within:ring-offset-2',
], {
    variants: {
        size: {
            sm: 'h-8 gap-1 px-1',
            md: 'h-10 gap-2 px-2',
            lg: 'h-12 gap-3 px-3',
        },
        radius: {
            none: RADIUS.none,
            sm: RADIUS.sm,
            md: RADIUS.inputSm,
            lg: RADIUS.input,
            xl: RADIUS.xl,
            full: RADIUS.badge,
        },
        disabled: {
            true: 'cursor-not-allowed opacity-50',
            false: '',
        },
    },
    defaultVariants: {
        size: 'md',
        //   disabled: false,
    },
});
export const quantityInputVariants = cva([
    'border-0',
    'bg-transparent',
    'text-center',
    'font-medium',
    'shadow-none',
    'focus-visible:ring-0',
    'focus-visible:ring-offset-0',
    'appearance-none',
    '[&::-webkit-inner-spin-button]:appearance-none',
    '[&::-webkit-outer-spin-button]:appearance-none',
    '[-moz-appearance:textfield]',
], {
    variants: {
        size: {
            sm: 'w-10 text-sm',
            md: 'w-12 text-base',
            lg: 'w-14 text-lg',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
