import { cva } from 'class-variance-authority';
import { RADIUS } from '@/theme';
export const inputVariants = cva([
    'flex w-full border transition-all duration-200 ease-in-out',
    'outline-none',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'placeholder:text-gray-400',
    'focus-visible:ring-2',
    'focus-visible:ring-primary',
], {
    variants: {
        variant: {
            outlined: 'border-gray-300 bg-white',
            filled: 'border-transparent bg-gray-100',
            flushed: 'rounded-none border-x-0 border-t-0 border-b',
        },
        size: {
            sm: `${RADIUS.input} h-9 px-3 text-sm`,
            md: `${RADIUS.input} h-11 px-4 text-base`,
            lg: `${RADIUS.input} h-12 px-5 text-lg`,
        },
        hasError: {
            true: 'border-red-500 focus-visible:ring-red-500',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'outlined',
        size: 'md',
        hasError: false,
    },
});
